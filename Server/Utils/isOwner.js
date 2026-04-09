import ExpressError from "./ExpressError.js";
import jwt from "jsonwebtoken";
import Listing from "../Models/listingSchema.js";

async function isOwner(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new ExpressError(401, "Not authenticated"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    // 🔐 REAL ownership check
    if (!listing.owner.equals(req.user.id)) {
      return next(new ExpressError(403, "You are not the owner"));
    }

    next();

  } catch (err) {
    next(new ExpressError(401, "Unauthorized"));
  }
}

export default isOwner;