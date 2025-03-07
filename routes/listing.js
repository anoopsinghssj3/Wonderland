const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/warpAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ dest: "uploads/"});

// all listings , added listing
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'), validateListing,
        wrapAsync(listingController.addedListing));

//add new in listing
router.get("/new", isLoggedIn, listingController.newListingForm);

//show route,update, delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,
        validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit route
router.get("/:id/edit", isLoggedIn,
    isOwner, wrapAsync(listingController.editListing));

module.exports = router;