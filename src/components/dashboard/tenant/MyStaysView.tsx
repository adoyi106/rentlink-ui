"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Search,
  Shield,
  Star,
  XCircle,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type StayStatus = "Upcoming" | "Active" | "Completed" | "Cancelled";
type TabFilter = "All" | StayStatus;

interface Stay {
  ref: string;
  propertyName: string;
  propertyImg: string;
  location: string;
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPaid: string;
  status: StayStatus;
  hostName: string;
  hostInitials: string;
  hostVerified: boolean;
}

const stays: Stay[] = [
  {
    ref: "STY-2025-001",
    propertyName: "Beachfront Suite, Victoria Island",
    propertyImg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    location: "Victoria Island, Lagos",
    pricePerNight: 95_000,
    checkIn: "Mar 15, 2025",
    checkOut: "Mar 18, 2025",
    nights: 3,
    guests: 2,
    totalPaid: "₦285,000",
    status: "Upcoming",
    hostName: "David Mitchell",
    hostInitials: "DM",
    hostVerified: true,
  },
  {
    ref: "STY-2025-002",
    propertyName: "Luxury Villa, Banana Island",
    propertyImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    location: "Banana Island, Lagos",
    pricePerNight: 350_000,
    checkIn: "Mar 1, 2025",
    checkOut: "Mar 5, 2025",
    nights: 4,
    guests: 6,
    totalPaid: "₦1,400,000",
    status: "Completed",
    hostName: "Akin Adeyemi",
    hostInitials: "AA",
    hostVerified: true,
  },
  {
    ref: "STY-2025-003",
    propertyName: "Modern Studio, Wuse 2",
    propertyImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    location: "Wuse 2, Abuja",
    pricePerNight: 45_000,
    checkIn: "Feb 20, 2025",
    checkOut: "Feb 23, 2025",
    nights: 3,
    guests: 1,
    totalPaid: "₦135,000",
    status: "Completed",
    hostName: "Yemi Okafor",
    hostInitials: "YO",
    hostVerified: true,
  },
  {
    ref: "STY-2025-004",
    propertyName: "Cosy Retreat, Lekki Phase 1",
    propertyImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    location: "Lekki Phase 1, Lagos",
    pricePerNight: 75_000,
    checkIn: "Jan 10, 2025",
    checkOut: "Jan 12, 2025",
    nights: 2,
    guests: 2,
    totalPaid: "₦150,000",
    status: "Cancelled",
    hostName: "Funmi Bello",
    hostInitials: "FB",
    hostVerified: false,
  },
];

const tabs: TabFilter[] = ["All", "Upcoming", "Active", "Completed", "Cancelled"];

const statusConfig: Record<StayStatus, { label: string; cardBorder: string; badgeClass: string; icon: React.ElementType }> = {
  Upcoming: { label: "Upcoming", cardBorder: "border-yellow-200", badgeClass: "bg-yellow-50 text-yellow-700", icon: Clock },
  Active: { label: "Active", cardBorder: "border-green-200", badgeClass: "bg-green-50 text-green-600", icon: CheckCircle2 },
  Completed: { label: "Completed", cardBorder: "border-gray-100", badgeClass: "bg-gray-50 text-gray-600", icon: CheckCircle2 },
  Cancelled: { label: "Cancelled", cardBorder: "border-gray-100", badgeClass: "bg-red-50 text-red-500", icon: XCircle },
};

export default function MyStaysView() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");

  const counts: Record<TabFilter, number> = {
    All: stays.length,
    Upcoming: stays.filter((s) => s.status === "Upcoming").length,
    Active: stays.filter((s) => s.status === "Active").length,
    Completed: stays.filter((s) => s.status === "Completed").length,
    Cancelled: stays.filter((s) => s.status === "Cancelled").length,
  };

  const filtered = activeTab === "All" ? stays : stays.filter((s) => s.status === activeTab);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Stays</h1>
          <p className="mt-1 text-sm text-gray-500">
            {counts.All} stays · {counts.Upcoming} upcoming
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Search stays..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-48"
          />
        </div>
      </div>

      {/* Tab filters — flex-wrap for 5 tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            {tab}
            <span
              className={cn(
                "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold",
                activeTab === tab ? "bg-white text-blue-600" : "bg-gray-100 text-gray-500"
              )}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Stay cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map((stay) => {
          const sc = statusConfig[stay.status];
          const StatusIcon = sc.icon;
          const isUpcoming = stay.status === "Upcoming";
          const isCompleted = stay.status === "Completed";

          return (
            <div
              key={stay.ref}
              className={cn("rounded-2xl border bg-white p-4 sm:p-5", sc.cardBorder)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Property image */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
                  <Image
                    src={stay.propertyImg}
                    alt={stay.propertyName}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">{stay.propertyName}</h3>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{stay.location}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-blue-600">
                        ₦{stay.pricePerNight.toLocaleString("en-NG")}/night
                      </p>
                    </div>

                    {/* Host chip — desktop only */}
                    <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 sm:flex">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {stay.hostInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{stay.hostName}</p>
                        {stay.hostVerified ? (
                          <span className="flex items-center gap-0.5 text-[10px] font-medium text-green-600">
                            <Shield className="h-2.5 w-2.5" /> Verified host
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400">Unverified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stay meta */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {stay.checkIn} → {stay.checkOut}
                    </span>
                    <span>{stay.nights} nights · {stay.guests} guests</span>
                    <span className="font-semibold text-gray-700">{stay.totalPaid} total</span>
                    {/* Host name — mobile only */}
                    <span className="flex items-center gap-1 font-medium text-gray-600 sm:hidden">
                      {stay.hostVerified && <Shield className="h-3 w-3 text-green-500" />}
                      {stay.hostName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-4 flex flex-col gap-3 border-t border-gray-50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", sc.badgeClass)}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {sc.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {stay.nights} {stay.nights === 1 ? "night" : "nights"} · Ref: {stay.ref}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {isUpcoming && (
                    <>
                      <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Message host
                      </button>
                      <button className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50">
                        <XCircle className="h-3.5 w-3.5" />
                        Cancel booking
                      </button>
                    </>
                  )}
                  {stay.status === "Active" && (
                    <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Message host
                    </button>
                  )}
                  {isCompleted && (
                    <>
                      <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                        <Star className="h-3.5 w-3.5" />
                        Leave review
                      </button>
                      <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                        Book again
                      </button>
                    </>
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
