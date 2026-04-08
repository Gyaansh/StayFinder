import Listing from "../Models/listingSchema.js";
import Review from "../Models/reviewSchema.js";

export default async function addReview(req, res) {
  try {
    // Extract listing ID from route parameters
    const { id } = req.params;
    // Extract review data from the request body
    const { content, rating, createdBy } = req.body;

    // Verify that the target listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // Create and save the new review document
    const newReview = new Review({ content, rating, createdBy });
    await newReview.save();

    // Associate the new review with the listing
    listing.reviews.push(newReview._id);
    await listing.save();

    res.status(201).json({ message: "Review added successfully", data: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
