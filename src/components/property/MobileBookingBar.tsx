"use client";

import { Heart } from "@/components/icons";
import { useState } from "react";

interface Props {
  price: number;
  isStay: boolean;
  rating: number;
  reviews: number;
}

export default function MobileBookingBar({ price, isStay, rating, reviews }: Props) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-900">
            ₦{price.toLocaleString("en-NG")}
            <span className="text-sm font-normal text-gray-500">/{isStay ? "night" : "year"}</span>
          </p>
          <p className="text-xs text-gray-400">
            ★ {rating} · {reviews} reviews
          </p>
        </div>

        <button
          onClick={() => setSaved((s) => !s)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            saved
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-gray-200 bg-white text-gray-400 hover:text-gray-600"
          }`}
        >
          <Heart className={`h-5 w-5 ${saved ? "fill-red-500" : ""}`} />
        </button>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          {isStay ? "Check dates" : "Apply now"}
        </button>
      </div>
    </div>
  );
}
