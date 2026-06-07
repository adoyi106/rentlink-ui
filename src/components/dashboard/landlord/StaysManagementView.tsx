"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MessageSquare } from "@/components/icons";
import { cn } from "@/lib/utils";

type BookingStatus = "Upcoming" | "Active" | "Completed" | "Cancelled";
type TabFilter = "All" | BookingStatus;

interface StayBooking {
  id: string;
  guestName: string;
  guestInitials: string;
  propertyName: string;
  propertyImg: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  amountTotal: string;
  status: BookingStatus;
}

const bookings: StayBooking[] = [
  {
    id: "STY-001",
    guestName: "Amara Okafor",
    guestInitials: "AO",
    propertyName: "Beachfront Suite, Victoria Island",
    propertyImg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80",
    checkIn: "Mar 15, 2025",
    checkOut: "Mar 18, 2025",
    nights: 3,
    guests: 2,
    amountTotal: "₦285,000",
    status: "Upcoming",
  },
  {
    id: "STY-002",
    guestName: "Chidi Eze",
    guestInitials: "CE",
    propertyName: "Cosy Retreat, Lekki Phase 1",
    propertyImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    checkIn: "Mar 13, 2025",
    checkOut: "Mar 16, 2025",
    nights: 3,
    guests: 3,
    amountTotal: "₦225,000",
    status: "Active",
  },
  {
    id: "STY-003",
    guestName: "Ngozi Adeyemi",
    guestInitials: "NA",
    propertyName: "Beachfront Suite, Victoria Island",
    propertyImg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80",
    checkIn: "Mar 5, 2025",
    checkOut: "Mar 10, 2025",
    nights: 5,
    guests: 4,
    amountTotal: "₦475,000",
    status: "Completed",
  },
  {
    id: "STY-004",
    guestName: "Bola Taiwo",
    guestInitials: "BT",
    propertyName: "Cosy Retreat, Lekki Phase 1",
    propertyImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    checkIn: "Feb 28, 2025",
    checkOut: "Mar 2, 2025",
    nights: 2,
    guests: 2,
    amountTotal: "₦150,000",
    status: "Cancelled",
  },
];

const tabs: TabFilter[] = ["All", "Upcoming", "Active", "Completed", "Cancelled"];

const statusStyle: Record<BookingStatus, { label: string; pillClass: string; borderClass: string }> = {
  Upcoming: { label: "Upcoming", pillClass: "bg-yellow-100 text-yellow-700", borderClass: "border-yellow-100" },
  Active: { label: "Active", pillClass: "bg-green-100 text-green-700", borderClass: "border-green-200" },
  Completed: { label: "Completed", pillClass: "bg-gray-100 text-gray-600", borderClass: "border-gray-100" },
  Cancelled: { label: "Cancelled", pillClass: "bg-red-100 text-red-500", borderClass: "border-red-100" },
};

const statCards = [
  { label: "Upcoming bookings", value: "3", sub: "next 30 days", color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Active stays", value: "1", sub: "guests in residence", color: "text-green-600", bg: "bg-green-50" },
  { label: "Revenue this month", value: "₦510,000", sub: "+22% vs last month", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Occupancy rate", value: "72%", sub: "last 30 days", color: "text-purple-600", bg: "bg-purple-50" },
];

export default function StaysManagementView() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");

  const upcoming = bookings.filter((b) => b.status === "Upcoming").length;
  const filtered = activeTab === "All" ? bookings : bookings.filter((b) => b.status === activeTab);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Short Stay Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          {upcoming} upcoming {upcoming === 1 ? "arrival" : "arrivals"} · {bookings.length} total bookings
        </p>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className={cn("inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold", s.bg, s.color)}>
              {s.value}
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">{s.label}</p>
            <p className="mt-0.5 text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map((booking) => {
          const sc = statusStyle[booking.status];
          return (
            <div
              key={booking.id}
              className={cn("rounded-2xl border bg-white p-4", sc.borderClass)}
            >
              {/* Top: property image + content */}
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={booking.propertyImg}
                    alt={booking.propertyName}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {/* Guest + amount row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {booking.guestInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{booking.guestName}</p>
                        <p className="text-xs text-gray-400">
                          {booking.guests} guests · {booking.nights} nights
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 font-bold text-gray-900">{booking.amountTotal}</p>
                  </div>
                  {/* Property name */}
                  <p className="mt-1 truncate text-xs text-gray-400">{booking.propertyName}</p>
                  {/* Date row */}
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                    {booking.checkIn} → {booking.checkOut}
                  </div>
                </div>
              </div>

              {/* Footer: status + actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-50 pt-3">
                <span className={cn("rounded-full px-3 py-1 text-xs font-medium", sc.pillClass)}>
                  {sc.label}
                </span>
                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                    View details
                  </button>
                  {booking.status === "Upcoming" && (
                    <button className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Message guest
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
