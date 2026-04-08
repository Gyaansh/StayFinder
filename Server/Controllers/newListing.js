// import mongoose from "mongoose";
import Listing from "../Models/listingSchema.js";
// import validSchema from "../Models/Validator.js";
async function newListing(req, res) {
  try {
    // validSchema.validate(req.body);
    let { title, description, URL, price, location, country, owner } = req.body;
    let newListing = new Listing({
      title: title,
      description: description,
      URL: URL,
      price: price,
      location: location,
      country: country,
      owner: owner,
    });
    const savedListing = await newListing.save();

    res.status(201).json({
      message: "Listing created successfully",
      listing: savedListing,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Failed to create listing",
      error: err.message,
    });
  }
}
export default newListing;
