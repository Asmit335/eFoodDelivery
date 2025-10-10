const ProductM = require("../../model/productModel");
const ReviewM = require("../../model/reviewModel");

// Create a review
exports.createReview = async (req, res) => {
  //user id after login
  const userId = req.user.id;
  //product id after clicking to product
  const productId = req.params.id;

  const { rating, message } = req.body;

  // Validate input
  if (!productId || !rating || !message) {
    return res.status(400).json({
      message: "Please provide all required fields: rating and message.",
    });
  }

  // Check if product exists
  const productExists = await ProductM.findById(productId);
  if (!productExists) {
    return res.status(404).json({
      message: "Product not found.",
    });
  }

  //  prevent duplicate review by same user
  const alreadyReviewed = await ReviewM.findOne({ userId, productId });
  if (alreadyReviewed) {
    return res.status(400).json({
      message: "You have already reviewed this product.",
    });
  }

  // Create review
  const review = await ReviewM.create({
    userId,
    productId,
    rating,
    message,
  });

  return res.status(201).json({
    message: "Review added successfully.",
    data: review,
  });
};

// Get all reviews for a product
exports.getProductReview = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      message: "Please provide a product ID.",
    });
  }

  const productExists = await ProductM.findById(productId);
  if (!productExists) {
    return res.status(404).json({
      message: "Product not found.",
    });
  }

  const reviews = await ReviewM.find({ productId }).populate("userId");

  return res.status(200).json({
    message: "Reviews fetched successfully.",
    data: reviews,
  });
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  if (!reviewId) {
    return res.status(400).json({
      message: "Please provide a review ID.",
    });
  }

  const review = await ReviewM.findById(reviewId);
  if (!review) {
    return res.status(404).json({
      message: "Review not found.",
    });
  }

  await ReviewM.findByIdAndDelete(reviewId);

  return res.status(200).json({
    message: "Review deleted successfully.",
  });
};
