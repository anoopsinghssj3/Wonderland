const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
    .then(() => console.log("connection successful......")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderland');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: 'my home',
//         description: "this is my lovely home",
//         image: "",
//         price: 4654,
//         location: 'rewa, mp',
//         country: 'India'
//     });
//     await sampleListing.save()
//         .then(res => console.log(res))
//         .catch(res => console.log(res));
//     console.log("sample saved");
//     res.send("success test");
// })

//all listings
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//add new in listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//listing after add 
app.post("/listings", async (req, res) => {
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})

//update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

//delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


app.listen(3000, () => {
    console.log("server running : 3000");
});