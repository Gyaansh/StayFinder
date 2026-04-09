import Listing from "../Models/listingSchema.js";
export default async function getListingByid(req, res) {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "createdBy", select: "username" },
      })
      .populate("owner");

    if (!id) {
      return res.ok.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({
      message: "ok",
      data: listing,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
