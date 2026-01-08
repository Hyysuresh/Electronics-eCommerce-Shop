import React from "react";

interface SingleReviewProps {
  review: {
    id?: string;
    user?: string;
    rating?: number;
    comment?: string;
    createdAt?: string;
  };
}

export default function SingleReview({ review }: SingleReviewProps) {
  return (
    <div className="border-b border-gray-200 py-4 w-full">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">
          {review.user || "Anonymous"}
        </h4>
        <span className="text-xs text-gray-500">
          {review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>

      <div className="flex items-center gap-1 my-1">
        {Array.from({ length: review.rating || 0 }).map((_, i) => (
          <span key={i} className="text-yellow-500">★</span>
        ))}
      </div>

      <p className="text-sm text-gray-700">
        {review.comment || "No review text provided."}
      </p>
    </div>
  );
}
