import React, { useState } from "react";

type Review = {
  reviewer: string;
  timestamp: string;
  content: string;
  rating: number; // Add rating field
};

const dummyReviews = [
  {
    reviewer: "John Doe",
    timestamp: new Date().toISOString(),
    content: "Great tutor! Very knowledgeable and helpful.",
    rating: 5,
  },
  {
    reviewer: "Jane Smith",
    timestamp: new Date().toISOString(),
    content: "The sessions were well-structured and engaging.",
    rating: 4,
  },
  // Add more dummy reviews as needed
];

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(1); // Rating state
  const [showMore, setShowMore] = useState(reviews.length > 0 ? true : false);

  // Load more reviews functionality
  const handleLoadMore = () => {
    // Assuming you fetch more reviews from API
    // Here we just simulate loading more reviews by slicing the array
    const moreReviews = dummyReviews.slice(reviews.length, reviews.length + 2);
    setReviews([...reviews, ...moreReviews]);
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([
        ...reviews,
        {
          reviewer: "Anonymous", // Replace with the logged-in user's name if available
          timestamp: new Date().toISOString(),
          content: newReview.trim(),
          rating: rating, // Add rating to the new review
        },
      ]);
      setNewReview("");
      setRating(1); // Reset rating after adding review
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className={`pb-4 ${
                reviews.length - 1 === index ? "" : "border-b"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-x-4">
                  <p className="font-semibold m-0">{review.reviewer}</p>
                  {/* Star Rating */}
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        &#9733;
                      </span> // Star rating
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.timestamp).toLocaleDateString()}
                </p>
              </div>

              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Load More Button */}
      {showMore && (
        <button
          onClick={handleLoadMore}
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Load More
        </button>
      )}

      {/* Add Review Form */}
      <div className="mt-6">
        <textarea
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
        />
        <div className="flex items-center mt-2">
          <label className="mr-2">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-${
                rating >= star ? "yellow-500" : "gray-300"
              }`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button
          onClick={handleAddReview}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};
