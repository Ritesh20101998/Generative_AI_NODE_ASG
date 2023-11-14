const Review = require('../models/review.model');
const Product = require('../models/product.model');

// Controller for creating a review for a product
const addReviewToProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = new Review(req.body);
    product.reviews.push(review);
    await review.save();
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a review' });
  }
};

// Controller for deleting a review by ID
const deleteReviewById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.remove();
    await product.save();

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the review' });
  }
};

// Controller for virtual population of reviews for a product
const getReviewsForProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('reviews');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

module.exports = {
  addReviewToProduct,
  deleteReviewById,
  getReviewsForProduct,
};
