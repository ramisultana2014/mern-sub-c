const crypto = require("crypto");

const Order = require("../src/models/ordersModel");

function generateOrderID(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(charactersLength); //we create random number less than 36
    result += characters.charAt(randomIndex);
  }

  return result;
}
exports.createOrder = async (req, res) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const orderId = generateOrderID(6);
    const newOrder = await Order.create({
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...req.body,
      userId: req.user._id,
      orderId,
    });
    res.status(201).json({
      status: "Order created successfully",
      data: { order: newOrder },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getOrder = async (req, res) => {
  //console.log(req.params.orderId);
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    let message;
    if (!order) {
      message = "no order found";
      return res.status(200).json({
        status: "success",
        data: { message },
      });
    }
    const timeRemainig = order.getRemainingTime();
    if (timeRemainig > 0) {
      message = `Time remaining until the order arrives: ${timeRemainig} minutes`;
    } else {
      message = "The order should have already arrived.";
    }
    res.status(200).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.allOrdersByAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.orderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $match: { orderPrice: { $gte: 10 } },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          numOrders: { $sum: 1 },
          totalSell: { $sum: "$orderPrice" },
          minOrder: { $min: "$orderPrice" },
          maxOrder: { $max: "$orderPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
