const express = require("express");

const authController = require("../../controllers/authController");

const reviewController = require("../../controllers/reviewController");

const router = express.Router();
router.get("/allReviews", reviewController.getAllReviews);
// put the email in the headers in the react api
router.post(
  "/createReview",
  authController.protectedRoute,
  reviewController.createReview
);
module.exports = router;
