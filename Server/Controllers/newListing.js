import Listing from "../Models/listingSchema.js";
import processListingImages from "../Utils/processListingImages.js";

async function newListing(req, res) {
  try {
    const imageUrls = await processListingImages(req.files);

    if (imageUrls.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    let { title, description, price, location, country, owner } = req.body;
    let newListing = new Listing({
      title: title,
      description: description,
      images: imageUrls,
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
