const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.postReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log("newReview", newReview);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted ");
    res.redirect(`/listings/${id}`);
}