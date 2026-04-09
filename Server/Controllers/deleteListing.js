import Listing from "../Models/listingSchema.js";
import ExpressError from "../Utils/ExpressError.js";

async function deleteListing(req, res) {
  const { id } = req.params;
  if (!id) return new ExpressError(400, "Id not found");
  const deleted = await Listing.findByIdAndDelete(id);
  if (deleted){
    return res.status(204).json();
  } else {
    res.status(403).json({
        message : "Listing not found"
    })
  }
    
}
export default deleteListing;
