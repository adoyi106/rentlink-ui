"use client";

import { useState } from "react";
import { Calendar, Lock, MessageSquare, Users2 } from "@/components/icons";

interface Props {
  nightlyPrice: number;
  maxGuests?: number;
  rating: number;
  reviews: number;
  checkInTime?: string;
  checkOutTime?: string;
}

const CLEANING_FEE = 15_000;
const SERVICE_FEE_RATE = 0.12;

export default function StayBookingCard({
  nightlyPrice,
  maxGuests = 4,
  rating,
  reviews,
  checkInTime = "14:00",
  checkOutTime = "11:00",
}: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 0;

  const subtotal = nightlyPrice * nights;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const total = subtotal + CLEANING_FEE + serviceFee;
  const hasSelection = nights > 0;

  return (
    <div className="sticky top-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {/* Price + rating */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            ₦{nightlyPrice.toLocaleString("en-NG")}
          </span>
          <span className="ml-1 text-sm text-gray-400">/night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">★</span>
          <span className="font-medium text-gray-700">{rating}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>
      </div>

      {/* Date + guest inputs */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500">Check-in</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
            <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Check-out</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
            <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-gray-500">Guests</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
            <Users2 className="h-4 w-4 shrink-0 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price breakdown — only when dates are selected */}
      {hasSelection && (
        <div className="mt-5 space-y-2.5 rounded-xl bg-gray-50 p-4 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <span>₦{nightlyPrice.toLocaleString("en-NG")} × {nights} {nights === 1 ? "night" : "nights"}</span>
            <span>₦{subtotal.toLocaleString("en-NG")}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>Cleaning fee</span>
            <span>₦{CLEANING_FEE.toLocaleString("en-NG")}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>Service fee (12%)</span>
            <span>₦{serviceFee.toLocaleString("en-NG")}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 font-semibold text-gray-900">
            <span>Total</span>
            <span>₦{total.toLocaleString("en-NG")}</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <button className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
        {hasSelection
          ? `Book now — ₦${total.toLocaleString("en-NG")}`
          : "Check availability"}
      </button>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
        <MessageSquare className="h-4 w-4" />
        Message host
      </button>

      {/* Check-in / check-out times */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
        <span>Check-in from {checkInTime}</span>
        <span>·</span>
        <span>Check-out by {checkOutTime}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Lock className="h-3 w-3" />
        Secure, encrypted payment
      </div>
    </div>
  );
}
