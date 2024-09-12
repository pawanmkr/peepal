import { getLoggedInUser } from "../../../utils/user";
import {
    addReview,
    getReviewsByProfessional,
    Review,
} from "../../../api/review";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface ReviewProps {
    professionalId: string;
}
const LIMIT = 5;

export const Reviews = ({ professionalId }: ReviewProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReviews();
    }, [professionalId, offset]);

    // Fetch reviews function
    const fetchReviews = async () => {
        setLoading(true);
        setError("");

        getReviewsByProfessional(professionalId, offset, LIMIT).then(
            ([data, errorMessage]) => {
                setLoading(false);
                if (errorMessage) {
                    setError(errorMessage);
                    return;
                }
                setReviews((prevReviews) => [
                    ...prevReviews,
                    ...(data?.reviews || []),
                ]);
                setTotalReviews(data?.total || 0);
                setShowMore(data?.reviews.length === LIMIT);
            }
        );
    };

    const handleLoadMore = async () => {
        setOffset((prevOffset) => prevOffset + LIMIT);
    };

    const handleAddReview = () => {
        const userId = getLoggedInUser()?.id as string;
        if (!userId) {
            setError("You must be logged in to add a review.");
            return;
        }
        setError(""); // Reset error state
        addReview({
            rating,
            comment: newReview,
            userId,
            professionalId,
        }).then(([data, errorMessage]) => {
            if (errorMessage) {
                setError(errorMessage);
                return;
            }
            setReviews((prevReviews) => [...prevReviews, data as Review]);
            setNewReview("");
            setRating(1);
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>

            {/* Show loader when loading */}
            {loading && (
                <div className="flex justify-center items-center py-4">
                    <Loader className="animate-spin w-6 h-6 text-gray-600" />
                </div>
            )}

            {/* Error handling */}
            {error.length > 0 && <p className="text-red-500 mb-4">{error}</p>}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length > 0
                    ? reviews.map((review, index) => (
                          <div
                              key={index}
                              className={`pb-4 ${
                                  reviews.length - 1 === index ? "" : "border-b"
                              }`}
                          >
                              <div className="flex items-center justify-between mb-2">
                                  <div className="flex gap-x-4">
                                      <p className="font-semibold m-0">
                                          {review.userId}
                                      </p>
                                      {/* Star Rating */}
                                      <div className="flex items-center mb-2">
                                          {[...Array(review.rating)].map(
                                              (_, i) => (
                                                  <span
                                                      key={i}
                                                      className="text-yellow-500"
                                                  >
                                                      &#9733;
                                                  </span>
                                              )
                                          )}
                                          {[...Array(5 - review.rating)].map(
                                              (_, i) => (
                                                  <span
                                                      key={i}
                                                      className="text-gray-300"
                                                  >
                                                      &#9733;
                                                  </span>
                                              )
                                          )}
                                      </div>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                      {new Date(
                                          review.createdAt
                                      ).toLocaleDateString()}
                                  </p>
                              </div>

                              <p>{review.comment}</p>
                          </div>
                      ))
                    : !loading && (
                          <p className="text-gray-500">No reviews yet.</p>
                      )}
            </div>

            {/* Load More Button */}
            {showMore && !loading && (
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
