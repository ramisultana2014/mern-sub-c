const Review = require("../src/models/reviewModel");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: "success",
      data: { reviews },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createReview = async (req, res) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax

    const newReview = await Review.create({
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({
      status: "Order created successfully",
      data: { review: newReview },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
