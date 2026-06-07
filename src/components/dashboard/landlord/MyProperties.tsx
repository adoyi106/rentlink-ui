"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Pencil, Plus, Trash2, Upload } from "@/components/icons";

type Bedroom = "Studio" | "1" | "2" | "3" | "4+";

interface Listing {
  img: string;
  address: string;
  sub: string;
  price: string;
  views: number;
  applications: number;
  rating: number;
  active: boolean;
}

const listings: Listing[] = [
  {
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
    address: "42 Victoria Island, VI",
    sub: "Studio",
    price: "₦1,850,000/yr",
    views: 284,
    applications: 3,
    rating: 4.9,
    active: true,
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    address: "18 Wuse 2, Abuja",
    sub: "2-bed",
    price: "₦2,400,000/yr",
    views: 195,
    applications: 2,
    rating: 4.7,
    active: true,
  },
  {
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    address: "5 Ikoyi, Lagos",
    sub: "1-bed",
    price: "₦2,100,000/yr",
    views: 312,
    applications: 0,
    rating: 4.8,
    active: false,
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80",
    address: "Penthouse, Maitama",
    sub: "3-bed",
    price: "₦4,200,000/yr",
    views: 520,
    applications: 2,
    rating: 5.0,
    active: true,
  },
];

const bedrooms: Bedroom[] = ["Studio", "1", "2", "3", "4+"];
const uploadedImgs = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",
];

type ListingType = "long-term" | "short-stay";

export default function MyProperties() {
  const [selectedBed, setSelectedBed] = useState<Bedroom>("1");
  const [listingType, setListingType] = useState<ListingType>("long-term");

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="mt-1 text-sm text-gray-500">4 listings · 3 active</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto">
          <Plus className="h-4 w-4 shrink-0" /> Add new listing
        </button>
      </div>

      {/* Draft listing form */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">New listing draft</p>
              <p className="text-xs text-gray-400">Complete all sections before publishing</p>
            </div>
          </div>
          <span className="self-start rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-500 sm:self-auto">
            Draft — not published
          </span>
        </div>

        {/* Listing type toggle */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Listing Type
          </label>
          <div className="mt-2 flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() => setListingType("long-term")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                listingType === "long-term"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Long-term rental
            </button>
            <button
              type="button"
              onClick={() => setListingType("short-stay")}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                listingType === "short-stay"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Short stay
            </button>
          </div>
          {listingType === "short-stay" && (
            <p className="mt-1.5 text-xs text-gray-400">
              Guests will book by night. You set a nightly rate and optional minimum stay.
            </p>
          )}
          {listingType === "long-term" && (
            <p className="mt-1.5 text-xs text-gray-400">
              Tenants apply to rent for a fixed term — typically 1 year.
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Property Address
            </label>
            <input
              type="text"
              placeholder="e.g. 15 Adeola Odeku, Victoria Island"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Property Type
            </label>
            <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400">
              <option>Flat / Apartment</option>
              <option>House / Duplex</option>
              <option>Studio</option>
              <option>Bungalow</option>
              <option>Terrace</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {listingType === "short-stay" ? "Nightly Rate (₦)" : "Annual Rent (₦)"}
            </label>
            <input
              type="number"
              defaultValue={listingType === "short-stay" ? 75000 : 2000000}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>
          {listingType === "short-stay" ? (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Max Guests
              </label>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                ))}
              </select>
            </div>
          ) : null}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Bedrooms
            </label>
            <div className="mt-2 flex gap-2">
              {bedrooms.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBed(b)}
                  className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-colors ${
                    selectedBed === b
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Photos
          </label>
          <div className="mt-2 flex flex-wrap gap-3">
            <div className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 sm:h-32 sm:w-32">
              <Upload className="h-5 w-5" />
              <span className="text-xs">Add photo</span>
            </div>
            {uploadedImgs.map((src, i) => (
              <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl sm:h-32 sm:w-32">
                <Image src={src} alt="Property photo" fill className="object-cover" sizes="128px" />
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-gray-700 shadow-sm">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Save draft
          </button>
          <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Publish listing
          </button>
        </div>
      </div>

      {/* All listings */}
      <div className="mt-8">
        <h2 className="font-semibold text-gray-900">All listings</h2>
        <div className="mt-3 flex flex-col gap-3">
          {listings.map((l, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={l.img} alt={l.address} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-gray-900">{l.address}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${l.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {l.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">{l.sub} · {l.price}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
                    <span>👁 {l.views} views</span>
                    <span className="font-medium text-blue-600">{l.applications} applications</span>
                    <span>★ {l.rating}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:text-gray-600">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="rounded-xl border border-gray-200 p-2 text-red-300 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
