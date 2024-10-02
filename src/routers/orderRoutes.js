const express = require("express");

const authController = require("../../controllers/authController");

const orderController = require("../../controllers/orderController");

const router = express.Router();
//every time i must put the email in the headers in react api
router.use(authController.protectedRoute);
router.post("/createorder", orderController.createOrder);
router.get(
  "/allOrdersByAdmin",
  authController.restrictTo,
  // eslint-disable-next-line prettier/prettier
  orderController.allOrdersByAdmin
);
router.get(
  "/ordersStats",
  authController.restrictTo,
  // eslint-disable-next-line prettier/prettier
  orderController.orderStats
);
router.get("/orderstatus/:orderId", orderController.getOrder);
module.exports = router;
