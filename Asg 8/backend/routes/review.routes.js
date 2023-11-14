const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/review.controller');

// Route for creating a review for a product
reviewRouter.post('/:productId/reviews', reviewController.addReviewToProduct);

// Route for deleting a review by ID
reviewRouter.delete('/:productId/reviews/:reviewId', reviewController.deleteReviewById);

// Route for virtual population of reviews for a product
reviewRouter.get('/:productId/reviews', reviewController.getReviewsForProduct);

module.exports = reviewRouter;
