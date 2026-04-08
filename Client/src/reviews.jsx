import { useEffect, useState } from "react";
import { Button, Rating, TextField } from "@mui/material";
import { showError } from "./Utils/ToastBar";
import getUserId from "./Utils/getUserId";

export default function Reviews({ listingId, reviews = [], onReviewAdded }) {
  
  const [rating, setRating] = useState(0);
  const [createdBy, setCreatedBy] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validates the form inputs before attempting to submit the review
  const isFormValid = () => {
    const newErrors = {};
    if (!rating) newErrors.rating = "Rating is required";
    if (!content.trim()) newErrors.content = "Comment is required";
    if (content.length < 10)
      newErrors.content = "Comment must be at least 10 characters long";
    if (content.length > 500)
      newErrors.content = "Comment must be at most 500 characters long";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(()=>{
    let madeBy = '';
    async function userInfo(){
      madeBy = await getUserId();
      setCreatedBy(madeBy);
      console.log(madeBy);
    }
    userInfo().then(()=>{
      console.log(madeBy);
    })
  })


  // Handles the submission of a new review to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stop early if form validation fails
    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/listing/${listingId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, content, createdBy }),
      });
      const data = await res.json();
      if (!res.ok) {
        showError(data.message);
        throw new Error("Failed to submit review");
      }
      setContent("");
      setRating(0);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-orange-700 mb-6">
        Reviews & Ratings
      </h2>

      {/* List Existing Reviews */}
      <div className="mb-8 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div
              key={rev._id || index}
              className="p-4 border border-orange-100 rounded-xl bg-orange-50/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Rating
                    value={rev.rating}
                    readOnly
                    size="small"
                    sx={{ color: "#ea580c" }}
                  />
                  <span className="text-xs text-gray-400">
                    {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                {/* 👇 Made by */}
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  by {reviews.createdBy || "Anonymous"}
                </span>
              </div>

              <p className="text-gray-700">{rev.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {/* Add Review Form */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Leave a Review
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Your Rating</p>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
              sx={{ color: "#ea580c" }}
            />
            {error && <p className="text-red-500 text-sm">{error["rating"]}</p>}
          </div>

          <TextField
            label="Your Comment"
            multiline
            rows={4}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            color="warning"
          />

          {error && <p className="text-red-500 text-sm">{error["content"]}</p>}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#ea580c",
              paddingY: "10px",
              fontSize: "15px",
              borderRadius: "8px",
              width: "fit-content",
              "&:hover": {
                backgroundColor: "#c2410c",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
}
