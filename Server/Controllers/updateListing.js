import Listing from "../Models/listingSchema.js";
async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const { title, description, URL, price, location, country } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        URL,
        price,
        location,
        country
      },
      { new: true, runValidators: true }
    );

    if (!updatedListing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    res.status(200).json({
      success : true,
      message: "Listing updated successfully",
      listing: updatedListing
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success : false,
      message: "Failed to update listing",
      error: err.message
    });
  }
}
export default updateListing;