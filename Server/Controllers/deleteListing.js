import Listing from "../Models/listingSchema.js";
import ExpressError from "../Utils/ExpressError.js";
import deleteCloudinaryImages from "../Utils/deleteCloudinaryImages.js";

async function deleteListing(req, res) {
  const { id } = req.params;
  if (!id) return new ExpressError(400, "Id not found");
  const deleted = await Listing.findByIdAndDelete(id);
  if (deleted){
    if (deleted.images && deleted.images.length > 0) {
      deleteCloudinaryImages(deleted.images.map(img => img.public_id));
    }
    return res.status(200).json({ message: "Listing deleted successfully" });
  } else {
    res.status(403).json({
        message : "Listing not found"
    })
  }
    
}
export default deleteListing;
