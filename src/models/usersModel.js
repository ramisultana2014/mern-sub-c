const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

// eslint-disable-next-line no-unused-vars
const Order = require("./ordersModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please tell us ur name"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      select: false, //hide it from the output(response )
    },
    passwordConfirm: {
      type: String,
      required: true,
      validator: function (value) {
        return value === this.password;
      },
      message: "password are not the same",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  }
);
userSchema.virtual("userOrders", {
  ref: "Order", //order is the Order collection
  localField: "_id",
  foreignField: "userId", //the name of field in Order // each order have the id of the user who create it
  //so we go to Order and gather all the Orders that have the same userId, localField let us compare the localField _id in user with the id stored in Order as userId
  //then go to getUserProfile or getAllUsersByAdmin
});
userSchema.pre("save", async function (next) {
  const user = this;
  //this point to current document = user , pre"save"" run when use user.save() in routers  patch or post, it work befor saving document to database and befor res.send
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    user.passwordConfirm = undefined;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
