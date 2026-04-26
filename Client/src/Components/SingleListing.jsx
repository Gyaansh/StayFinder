import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import getUsername from "../Utils/getUsername";
import Reviews from "./Reviews";
import SingleListingSkeleton from "./SingleListingSkeleton";
const SingleListing = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const fetchListing = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/${id}`);
      const data = await res.json();
      const owner = data.data.owner.username;
      const images = data.data.images || [];
      setListing({ ...data.data, images: images, owner: owner });
      setActiveImage((prev) => prev || images[0]?.url || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    async function getOwner() {
      if (!listing) return;
      let userData = await getUsername();
      if (listing.owner === userData) {
        setIsOwner(true);
      }
    }
    getOwner();
  }, [listing]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  if (loading) {
    return <SingleListingSkeleton />;
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Sorry, No listing found with id ' {id} '
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-orange-50 pt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE GALLERY */}
          <div>
            <img
              src={activeImage}
              alt="main"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
            />

            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {listing.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  onClick={() => setActiveImage(img.url)}
                  alt="preview"
                  className={`h-24 w-36 object-cover rounded-xl cursor-pointer border-2 transition
      ${
        activeImage === img.url
          ? "border-orange-600"
          : "border-orange-300 hover:border-orange-500"
      }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <h1 className="text-3xl font-bold text-orange-700">
              {listing.title}
            </h1>
            {isOwner && (
              <Link
                to={`/listing/edit/${id}`}
                state={{ mode: "edit" }}
                className="absolute right-10 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-100"
              >
                Edit
              </Link>
            )}

            <div className="flex items-center text-gray-600 mt-2">
              <span className="material-symbols-outlined">location_on</span>
              <span>{listing.location}</span>
            </div>

            <div className="cursor-pointer mt-5 flex items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-md ring-1 ring-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-400 text-lg font-bold text-white">
                {listing.owner.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm text-gray-500">Listing Owner</p>
                <p className="text-lg font-semibold text-gray-800">
                  {listing.owner}
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {listing.description}
            </p>

            <div className="mt-6 text-2xl font-semibold text-orange-600">
              ₹{listing.price}
              <span className="text-base text-gray-500"> / night</span>
            </div>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#ea580c",
                marginTop: "24px",
                paddingY: "14px",
                fontSize: "16px",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#c2410c",
                },
              }}
            >
              Book Now
            </Button>

            <p className="text-xs text-center text-gray-400 mt-2">
              Booking coming soon
            </p>
          </div>
        </div>
        {/* REVIEWS SECTION */}
        <div className="max-w-6xl mx-auto mt-10">
          <Reviews
            listingId={listing._id}
            reviews={listing.reviews}
            onReviewAdded={fetchListing}
          />
        </div>
      </div>
    </>
  );
};

export default SingleListing;
