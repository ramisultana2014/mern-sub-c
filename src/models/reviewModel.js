const mongoose = require("mongoose");
const User = require("./usersModel");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    review: {
      type: String,
      maxlength: 20,
    },
    rating: {
      type: Number,
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

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "userId", select: "email name" });
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
