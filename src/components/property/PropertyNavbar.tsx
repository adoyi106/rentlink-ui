"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Heart, Home, Share2 } from "@/components/icons";

export default function PropertyNavbar() {
  const [saved, setSaved] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Back */}
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg p-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:p-0"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Back to results</span>
        </Link>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600">
            <Home className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-gray-900 sm:text-lg">Rentlink</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-4">
          <button className="flex items-center gap-1.5 rounded-lg p-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:rounded-none sm:p-0">
            <Share2 className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className={`flex items-center gap-1.5 rounded-lg p-2 text-sm transition-colors hover:bg-gray-50 sm:rounded-none sm:p-0 ${
              saved ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Heart className={`h-4 w-4 shrink-0 transition-all ${saved ? "fill-red-500" : ""}`} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
