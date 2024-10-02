const mongoose = require("mongoose");

const { differenceInMinutes } = require("date-fns");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phoneNumber: String,
    address: String,
    orderPrice: Number,
    orderId: String,
    totalSandwichQuant: Number,
    position: String,
    cart: [
      {
        sandwichName: String,
        sandwichDetails: String,
        sandwichQuantity: Number,
        sandwichPrice: Number,
        sandwichTotalPrice: Number,
      },
    ],
  },
  {
    timestamps: true, //that will add tow( fields created at, update at)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // eslint-disable-next-line prettier/prettier
  }
);
orderSchema.virtual("deleviryTime").get(function () {
  return this.totalSandwichQuant * 15;
});
// orderSchema.pre(/^find/, function (next) {
//   this.populate({ path: "userId", select: "email" });
// });
orderSchema.methods.getRemainingTime = function () {
  const createdAt = new Date(this.createdAt);
  const currentTime = new Date();
  const timePassed = differenceInMinutes(currentTime, createdAt);
  const delevirytime = this.deleviryTime;
  const timeRemainig = delevirytime - timePassed;
  return timeRemainig;
};
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
