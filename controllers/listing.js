const Listing = require("../models/listing.js");
const path = require("path");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listings/index.ejs", { allListings });
}

module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    // here .populate(listing model> key)
    const listing = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist ");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.addedListing = async (req, res) => {
    console.log("added listing:", req.file);
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    console.log("iamge:", newListing.image);
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated;");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted;");
    res.redirect("/listings");
}