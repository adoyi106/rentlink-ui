"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, Heart, LayoutGrid, List, Users2 } from "@/components/icons";
import { cn } from "@/lib/utils";
import { properties, getLongTermProperties, getShortStayProperties, type BadgeColor } from "@/lib/data/properties";

type Mode = "long-term" | "short-stay";

const badgeStyles: Record<BadgeColor, string> = {
  green: "bg-green-500 text-white",
  gray: "bg-white/90 text-gray-800",
  blue: "bg-blue-600 text-white",
};

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating"];

interface Props {
  mode: Mode;
}

export default function PropertyGrid({ mode }: Props) {
  const [sort, setSort] = useState("Recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);

  const isStay = mode === "short-stay";
  const listing = isStay ? getShortStayProperties() : getLongTermProperties();
  const count = listing.length;

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Results header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isStay ? "Short stays in Nigeria" : "Properties in Nigeria"}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {isStay
              ? `${count} places to stay`
              : `${count} verified listings found`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm sm:flex-none">
            <span className="hidden text-gray-500 sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-transparent font-medium text-gray-700 outline-none sm:w-auto"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="flex shrink-0 rounded-lg border border-gray-200 bg-white">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex items-center justify-center rounded-l-lg p-2 transition-colors",
                view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-50"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center justify-center rounded-r-lg p-2 transition-colors",
                view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-50"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property cards */}
      <div
        className={cn(
          "mt-6 gap-5",
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col"
        )}
      >
        {listing.map((property) => (
          <Link
            key={property.id}
            href={`/property/${property.id}`}
            className={cn(
              "group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md",
              view === "list" && "flex"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden",
                view === "grid" ? "h-52 w-full" : "h-48 w-64 shrink-0"
              )}
            >
              <Image
                src={property.img}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              {property.badge && (
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
                    badgeStyles[property.badgeColor ?? "gray"]
                  )}
                >
                  {property.badge}
                </span>
              )}
              <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-red-50"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    favorites.includes(property.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  )}
                />
              </button>

              {/* Bottom pill — different for short-stay vs long-term */}
              {isStay && property.instantBook ? (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white">
                  Instant book
                </div>
              ) : !isStay ? (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Verified landlord
                </div>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="h-3 w-3" />
                {property.location} {property.postcode}
              </div>
              <h3 className="mt-1.5 font-semibold text-gray-900">{property.title}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5" />
                  {property.beds} bed
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" />
                  {property.baths} bath
                </span>
                {isStay && property.maxGuests ? (
                  <span className="flex items-center gap-1">
                    <Users2 className="h-3.5 w-3.5" />
                    {property.maxGuests} guests
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Square className="h-3.5 w-3.5" />
                    {property.sqft} sqft
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-base font-bold text-gray-900">
                  ₦{property.price.toLocaleString("en-NG")}
                  <span className="text-sm font-normal text-gray-400">
                    {isStay ? "/night" : "/year"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium text-gray-700">{property.rating}</span>
                  <span className="text-gray-400">({property.reviews})</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
