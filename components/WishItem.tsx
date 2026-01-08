"use client";

import React from "react";

export interface WishItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
}

export default function WishItem({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: WishItemProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4 w-full">
      <img
        src={image ? `/${image}` : "/product_placeholder.jpg"}
        alt={title}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">₹{price}</p>

        {stockAvailabillity > 0 ? (
          <span className="text-xs text-green-600">In stock</span>
        ) : (
          <span className="text-xs text-red-600">Out of stock</span>
        )}
      </div>

      <a
        href={`/product/${slug}`}
        className="text-sm text-blue-600 hover:underline"
      >
        View
      </a>
    </div>
  );
}

