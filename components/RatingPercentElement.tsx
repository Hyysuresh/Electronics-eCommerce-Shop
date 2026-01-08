import React from "react";

interface RatingPercentElementProps {
  rating: number; // 1 to 5
  percent: number; // 0 to 100
}

export default function RatingPercentElement({
  rating,
  percent,
}: RatingPercentElementProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-sm w-8">{rating}★</span>

      <div className="flex-1 bg-gray-200 h-2 rounded">
        <div
          className="bg-yellow-500 h-2 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>

      <span className="text-sm w-10 text-right">{percent}%</span>
    </div>
  );
}
