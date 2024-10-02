const express = require("express");

const productController = require("../../controllers/productController");

const authController = require("../../controllers/authController");

// iwill send the user email (which i save with redux)in frontend each time  calling a url with protectedRoute
const router = express.Router();
router.use(authController.protectedRoute);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(authController.restrictTo, productController.createProduct);
router
  .route("/:title")
  .get(productController.getOneProduct)
  .patch(authController.restrictTo, productController.updateProduct)
  .delete(authController.restrictTo, productController.deleteProduct);

module.exports = router;
