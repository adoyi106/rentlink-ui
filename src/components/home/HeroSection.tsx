"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, BedDouble, Search, ChevronDown, Calendar, Users2 } from "@/components/icons";
import { Button } from "@/components/ui/button";

type Mode = "long-term" | "short-stay";

const popularCities = ["Lagos", "Abuja", "Port Harcourt", "Kano"];

export default function HeroSection() {
  const [mode, setMode] = useState<Mode>("long-term");

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
        alt="Modern apartment building exterior"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-5 flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5" />
          No agent fees. Direct from landlords.
        </div>

        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Find your perfect home,
          <br />
          <span className="text-blue-400">without the middleman</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm text-white/80 sm:text-base">
          Connect directly with landlords. Pay rent securely. Save thousands in agent fees.
        </p>

        {/* Mode toggle */}
        <div className="mt-6 flex rounded-full bg-white/20 p-1 backdrop-blur-sm">
          <button
            onClick={() => setMode("long-term")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
              mode === "long-term"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            Long-term rental
          </button>
          <button
            onClick={() => setMode("short-stay")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
              mode === "short-stay"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            Short stay
          </button>
        </div>

        {/* Long-term search bar */}
        {mode === "long-term" && (
          <div className="mt-4 w-full max-w-2xl rounded-2xl bg-white p-2 shadow-xl">
            {/* Mobile: stacked layout */}
            <div className="flex flex-col gap-1 sm:hidden">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 bg-gray-50">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <input
                  type="text"
                  placeholder="City, neighbourhood..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="flex gap-1">
                <div className="relative flex flex-1 items-center gap-1 rounded-xl bg-gray-50 px-3 py-2.5">
                  <BedDouble className="h-4 w-4 shrink-0 text-gray-400" />
                  <select className="w-full appearance-none bg-transparent text-sm text-gray-700 outline-none" defaultValue="">
                    <option value="" disabled>Bedrooms</option>
                    <option>Studio</option><option>1 bed</option><option>2 beds</option><option>3+ beds</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
                </div>
                <div className="relative flex flex-1 items-center gap-1 rounded-xl bg-gray-50 px-3 py-2.5">
                  <span className="text-sm font-medium text-gray-400">₦</span>
                  <select className="w-full appearance-none bg-transparent text-sm text-gray-700 outline-none" defaultValue="">
                    <option value="" disabled>Max price</option>
                    <option>₦800,000/year</option><option>₦2,000,000/year</option>
                    <option>₦5,000,000/year</option><option>₦10,000,000/year</option>
                    <option>₦25,000,000/year</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
              <Button
                className="w-full gap-1.5 rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
                onClick={() => { window.location.href = "/search"; }}
              >
                <Search className="h-4 w-4" /> Search
              </Button>
            </div>

            {/* Desktop: inline row */}
            <div className="hidden items-center sm:flex">
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <input
                  type="text"
                  placeholder="City, neighbourhood, or postcode..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="relative flex items-center gap-1 px-3">
                <BedDouble className="h-4 w-4 shrink-0 text-gray-400" />
                <select className="appearance-none bg-transparent py-1 pl-1 pr-5 text-sm text-gray-700 outline-none" defaultValue="">
                  <option value="" disabled>Any bedrooms</option>
                  <option>Studio</option><option>1 bed</option><option>2 beds</option><option>3+ beds</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="relative flex items-center gap-1 px-3">
                <span className="text-sm font-medium text-gray-400">₦</span>
                <select className="appearance-none bg-transparent py-1 pl-1 pr-5 text-sm text-gray-700 outline-none" defaultValue="">
                  <option value="" disabled>Max price</option>
                  <option>₦800,000/year</option><option>₦2,000,000/year</option>
                  <option>₦5,000,000/year</option><option>₦10,000,000/year</option>
                  <option>₦25,000,000/year</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
              </div>
              <Button
                className="ml-1 gap-1.5 rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
                onClick={() => { window.location.href = "/search"; }}
              >
                <Search className="h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        )}

        {/* Short-stay search bar */}
        {mode === "short-stay" && (
          <div className="mt-4 w-full max-w-2xl rounded-2xl bg-white p-2 shadow-xl">
            {/* Mobile: stacked */}
            <div className="flex flex-col gap-1 sm:hidden">
              <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <input type="text" placeholder="Where are you going?" className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" />
              </div>
              <div className="flex gap-1">
                <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2.5">
                  <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                  <input type="date" className="w-full bg-transparent text-xs text-gray-700 outline-none" />
                </div>
                <div className="flex flex-1 items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2.5">
                  <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                  <input type="date" className="w-full bg-transparent text-xs text-gray-700 outline-none" />
                </div>
              </div>
              <div className="relative flex items-center gap-1 rounded-xl bg-gray-50 px-3 py-2.5">
                <Users2 className="h-4 w-4 shrink-0 text-gray-400" />
                <select className="w-full appearance-none bg-transparent text-sm text-gray-700 outline-none" defaultValue="1">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
              </div>
              <Button className="w-full gap-1.5 rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700" onClick={() => { window.location.href = "/search?type=stays"; }}>
                <Search className="h-4 w-4" /> Search stays
              </Button>
            </div>

            {/* Desktop: inline row */}
            <div className="hidden items-center sm:flex">
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <input type="text" placeholder="Where are you going?" className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5 px-3">
                <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                <input type="date" className="w-28 bg-transparent text-sm text-gray-700 outline-none" />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5 px-3">
                <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                <input type="date" className="w-28 bg-transparent text-sm text-gray-700 outline-none" />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="relative flex items-center gap-1 px-3">
                <Users2 className="h-4 w-4 shrink-0 text-gray-400" />
                <select className="appearance-none bg-transparent py-1 pl-1 pr-5 text-sm text-gray-700 outline-none" defaultValue="1">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-gray-400" />
              </div>
              <Button className="ml-1 gap-1.5 rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700" onClick={() => { window.location.href = "/search?type=stays"; }}>
                <Search className="h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80 sm:gap-3">
          <span>Popular:</span>
          {popularCities.map((city) => (
            <button key={city} className="transition-colors hover:text-white">
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
