import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: {
    required: true,
    type: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    validate: {
      validator: (arr) => {
        if (arr.length > 15) return false;
        return true;
      },
      message: "Too many photos",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price Too Low"],
  },
  location: {
    required: true,
    type: String,
  },
  country: {
    type: String,
    default: "India",
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
