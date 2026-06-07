"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "@/components/icons";
import { cn } from "@/lib/utils";

type Mode = "long-term" | "short-stay";

const LT_PRICE_MIN = 500_000;
const LT_PRICE_MAX = 50_000_000;
const ST_PRICE_MIN = 10_000;
const ST_PRICE_MAX = 500_000;

const bedroomOptions = ["Any", "St", "1", "2", "3+"];
const guestOptions = ["1", "2", "3", "4", "5", "6+"];
const propertyTypes = ["Flat / Apartment", "House", "Studio", "Room"];
const ltAmenityOptions = ["Parking", "Garden", "Gym", "Concierge", "Pets allowed", "Furnished", "Balcony", "EV Charging"];
const stAmenityOptions = ["WiFi", "Pool", "Kitchen", "Air conditioning", "Gym", "Netflix", "Parking", "Balcony"];
const ratingOptions = ["Any rating", "4+ stars", "4.5+ stars", "5 stars only"];

interface Props {
  mode: Mode;
}

export default function FiltersPanel({ mode }: Props) {
  const isStay = mode === "short-stay";
  const [showMobile, setShowMobile] = useState(false);

  const [ltMinPrice, setLtMinPrice] = useState(LT_PRICE_MIN);
  const [ltMaxPrice, setLtMaxPrice] = useState(10_000_000);
  const [stMinPrice, setStMinPrice] = useState(ST_PRICE_MIN);
  const [stMaxPrice, setStMaxPrice] = useState(200_000);
  const [bedroom, setBedroom] = useState("Any");
  const [guests, setGuests] = useState("1");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Flat / Apartment", "Studio"]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rating, setRating] = useState("Any rating");

  const ltMinPct = ((ltMinPrice - LT_PRICE_MIN) / (LT_PRICE_MAX - LT_PRICE_MIN)) * 100;
  const ltMaxPct = ((ltMaxPrice - LT_PRICE_MIN) / (LT_PRICE_MAX - LT_PRICE_MIN)) * 100;
  const stMinPct = ((stMinPrice - ST_PRICE_MIN) / (ST_PRICE_MAX - ST_PRICE_MIN)) * 100;
  const stMaxPct = ((stMaxPrice - ST_PRICE_MIN) / (ST_PRICE_MAX - ST_PRICE_MIN)) * 100;

  function toggleType(type: string) {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  }
  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) => prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]);
  }
  function reset() {
    setLtMinPrice(LT_PRICE_MIN); setLtMaxPrice(LT_PRICE_MAX);
    setStMinPrice(ST_PRICE_MIN); setStMaxPrice(ST_PRICE_MAX);
    setBedroom("Any"); setGuests("1"); setCheckIn(""); setCheckOut("");
    setSelectedTypes([]); setSelectedAmenities([]); setRating("Any rating");
  }

  const amenityOptions = isStay ? stAmenityOptions : ltAmenityOptions;

  const filterBody = (
    <div className="space-y-6 divide-y divide-gray-100">
      {/* Price */}
      {!isStay && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Annual rent</h3>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">Min</span>
              <span className="font-medium text-gray-800">₦{ltMinPrice.toLocaleString("en-NG")}</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-xs text-gray-400">Max</span>
              <span className="font-medium text-gray-800">₦{ltMaxPrice.toLocaleString("en-NG")}</span>
            </div>
          </div>
          <div className="relative mt-4 h-5">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full"
              style={{ background: `linear-gradient(to right, #e5e7eb ${ltMinPct}%, #2563eb ${ltMinPct}%, #2563eb ${ltMaxPct}%, #e5e7eb ${ltMaxPct}%)` }} />
            <input type="range" min={LT_PRICE_MIN} max={LT_PRICE_MAX} step={500_000} value={ltMinPrice}
              onChange={(e) => { const v = Number(e.target.value); if (v < ltMaxPrice) setLtMinPrice(v); }}
              className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" />
            <input type="range" min={LT_PRICE_MIN} max={LT_PRICE_MAX} step={500_000} value={ltMaxPrice}
              onChange={(e) => { const v = Number(e.target.value); if (v > ltMinPrice) setLtMaxPrice(v); }}
              className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" />
          </div>
        </div>
      )}
      {isStay && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Price per night</h3>
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">Min</span>
              <span className="font-medium text-gray-800">₦{stMinPrice.toLocaleString("en-NG")}</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-xs text-gray-400">Max</span>
              <span className="font-medium text-gray-800">₦{stMaxPrice.toLocaleString("en-NG")}</span>
            </div>
          </div>
          <div className="relative mt-4 h-5">
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full"
              style={{ background: `linear-gradient(to right, #e5e7eb ${stMinPct}%, #2563eb ${stMinPct}%, #2563eb ${stMaxPct}%, #e5e7eb ${stMaxPct}%)` }} />
            <input type="range" min={ST_PRICE_MIN} max={ST_PRICE_MAX} step={5_000} value={stMinPrice}
              onChange={(e) => { const v = Number(e.target.value); if (v < stMaxPrice) setStMinPrice(v); }}
              className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" />
            <input type="range" min={ST_PRICE_MIN} max={ST_PRICE_MAX} step={5_000} value={stMaxPrice}
              onChange={(e) => { const v = Number(e.target.value); if (v > stMinPrice) setStMaxPrice(v); }}
              className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" />
          </div>
        </div>
      )}

      {/* Dates — short-stay */}
      {isStay && (
        <div className="pt-5">
          <h3 className="text-sm font-semibold text-gray-900">Dates</h3>
          <div className="mt-3 flex flex-col gap-2">
            <div>
              <label className="text-xs text-gray-400">Check-in</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Check-out</label>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400" />
            </div>
          </div>
        </div>
      )}

      {/* Bedrooms / Guests */}
      {!isStay && (
        <div className="pt-5">
          <h3 className="text-sm font-semibold text-gray-900">Bedrooms</h3>
          <div className="mt-3 flex gap-2">
            {bedroomOptions.map((opt) => (
              <button key={opt} onClick={() => setBedroom(opt)}
                className={cn("flex h-8 min-w-[2.5rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
                  bedroom === opt ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
      {isStay && (
        <div className="pt-5">
          <h3 className="text-sm font-semibold text-gray-900">Guests</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {guestOptions.map((opt) => (
              <button key={opt} onClick={() => setGuests(opt)}
                className={cn("flex h-8 min-w-[2.5rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
                  guests === opt ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Property type */}
      <div className="pt-5">
        <h3 className="text-sm font-semibold text-gray-900">Property type</h3>
        <div className="mt-3 space-y-2.5">
          {propertyTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)}
                className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="pt-5">
        <h3 className="text-sm font-semibold text-gray-900">Amenities</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {amenityOptions.map((amenity) => (
            <button key={amenity} onClick={() => toggleAmenity(amenity)}
              className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                selectedAmenities.includes(amenity)
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50")}>
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="pt-5">
        <h3 className="text-sm font-semibold text-gray-900">
          {isStay ? "Property rating" : "Landlord rating"}
        </h3>
        <div className="mt-3 space-y-2.5">
          {ratingOptions.map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-3">
              <input type="radio" name="rating" checked={rating === option} onChange={() => setRating(option)}
                className="h-4 w-4 accent-blue-600" />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: trigger button (floating) */}
      <button
        className="fixed bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
        onClick={() => setShowMobile(true)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {/* Mobile: full-screen drawer */}
      {showMobile && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>
            <div className="flex items-center gap-3">
              <button onClick={reset} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Reset all
              </button>
              <button onClick={() => setShowMobile(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {filterBody}
          </div>
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={() => setShowMobile(false)}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Show results
            </button>
          </div>
        </div>
      )}

      {/* Desktop: sidebar panel */}
      <aside className="hidden w-72 shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
          <button onClick={reset} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Reset all
          </button>
        </div>
        <div className="mt-6">
          {filterBody}
        </div>
        <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          Apply filters
        </button>
      </aside>
    </>
  );
}
