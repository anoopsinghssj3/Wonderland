const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/warpAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//reviews post route
router.post("/", isLoggedIn, validateReview,
    wrapAsync(reviewController.postReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.deleteReview))

module.exports = router;