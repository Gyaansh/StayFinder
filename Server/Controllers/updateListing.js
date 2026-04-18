import Listing from "../Models/listingSchema.js";
import processListingImages from "../Utils/processListingImages.js";

async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;
    const keepImageIds = JSON.parse(req.body.keepImageIds || "[]");
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const keptImages = listing.images.filter((image) =>
      keepImageIds.includes(image.public_id),
    );
    const uploadedImages = await processListingImages(req.files);
    const nextImages = [...keptImages, ...uploadedImages];

    if (nextImages.length === 0) {
      return res.status(400).json({
        message: "Please keep or upload at least one image",
      });
    }

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;
    listing.images = nextImages;

    const updatedListing = await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update listing",
      error: err.message,
    });
  }
}
export default updateListing;
