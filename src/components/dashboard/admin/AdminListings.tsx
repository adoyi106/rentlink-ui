"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, Eye, Flag, Search, XCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

type ListingStatus = "Pending" | "Live" | "Flagged" | "Rejected";
type TabFilter = "Pending" | "Flagged" | "All listings" | "Rejected";

interface Listing {
  img: string;
  address: string;
  sub: string;
  price: string;
  lister: string;
  submitted: string;
  views?: number;
  status: ListingStatus;
  tags?: string[];
  isShortStay?: boolean;
}

const listings: Listing[] = [
  { img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80", address: "22 Victoria Island, VI", sub: "2-bed flat", price: "₦2,200,000/yr", lister: "Alex Barnes", submitted: "2h ago", status: "Pending" },
  { img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80", address: "8 Wuse 2, Abuja", sub: "Studio", price: "₦1,400,000/yr", lister: "Yemi Okafor", submitted: "5h ago", status: "Pending", tags: ["Landlord unverified"] },
  { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80", address: "101 Lekki Phase 1", sub: "3-bed house", price: "₦3,100,000/yr", lister: "Sam Knight", submitted: "1d ago", status: "Pending" },
  { img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80", address: "42 Victoria Island, VI", sub: "Studio", price: "₦1,850,000/yr", lister: "David Mitchell", submitted: "Jan 15, 2025", views: 284, status: "Live" },
  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80", address: "18 Wuse 2, Abuja", sub: "2-bed", price: "₦2,400,000/yr", lister: "David Mitchell", submitted: "Dec 1, 2024", views: 198, status: "Live" },
  { img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80", address: "Beachfront Suite, VI", sub: "2-bed suite", price: "₦95,000/night", lister: "Akin Adeyemi", submitted: "3h ago", status: "Pending", isShortStay: true },
  { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80", address: "Cosy Retreat, Lekki Phase 1", sub: "2-bed apartment", price: "₦75,000/night", lister: "Funmi Bello", submitted: "1d ago", status: "Live", views: 62, isShortStay: true },
];

const tabs: TabFilter[] = ["Pending", "Flagged", "All listings", "Rejected"];

const statusStyle: Record<ListingStatus, { label: string; className: string }> = {
  Pending: { label: "Pending review", className: "bg-yellow-100 text-yellow-600" },
  Live: { label: "Live", className: "bg-green-100 text-green-600" },
  Flagged: { label: "Flagged", className: "bg-red-100 text-red-500" },
  Rejected: { label: "Rejected", className: "bg-gray-100 text-gray-500" },
};

const counts = {
  Pending: listings.filter((l) => l.status === "Pending").length,
  Flagged: listings.filter((l) => l.status === "Flagged").length,
  "All listings": listings.length,
  Rejected: listings.filter((l) => l.status === "Rejected").length,
};

export default function AdminListings() {
  const [activeTab, setActiveTab] = useState<TabFilter>("Pending");

  const filtered = listings.filter((l) => {
    if (activeTab === "Pending") return l.status === "Pending";
    if (activeTab === "Flagged") return l.status === "Flagged";
    if (activeTab === "Rejected") return l.status === "Rejected";
    return true;
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Listing Moderation</h1>
        <p className="mt-1 text-sm text-gray-500">12,447 total listings · 12 pending approval</p>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { value: "12", label: "Pending approval", icon: Clock, iconColor: "text-yellow-400" },
          { value: "12,430", label: "Live listings", icon: CheckCircle2, iconColor: "text-green-400" },
          { value: "5", label: "Flagged", icon: Flag, iconColor: "text-red-400" },
          { value: "28", label: "Rejected (30d)", icon: XCircle, iconColor: "text-gray-400" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <Icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
              <p className="mt-1 text-sm text-gray-400">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
        {/* Tabs + search — stack on mobile */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                {tab}
                {counts[tab] > 0 && (
                  <span className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold",
                    activeTab === tab ? "bg-white text-blue-600" : "bg-gray-100 text-gray-500"
                  )}>
                    {counts[tab]}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-40"
            />
          </div>
        </div>

        {/* Listing cards */}
        <div className="mt-4 flex flex-col gap-3">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">No listings in this category.</p>
          )}
          {filtered.map((l, i) => {
            const sc = statusStyle[l.status];
            const isPending = l.status === "Pending";
            const isLive = l.status === "Live";
            return (
              <div key={i} className="rounded-2xl border border-gray-100 p-4">
                {/* Top: image + info */}
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={l.img} alt={l.address} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="font-medium text-gray-900">{l.address}</p>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", sc.className)}>
                        {sc.label}
                      </span>
                      {l.isShortStay && (
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                          Short stay
                        </span>
                      )}
                      {l.tags?.map((tag) => (
                        <span key={tag} className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {l.sub} · {l.price}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Listed by <span className="font-medium text-gray-600">{l.lister}</span> · {l.submitted}
                      {l.views !== undefined && <> · 👁 {l.views} views</>}
                    </p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-3">
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </button>
                  {isPending && (
                    <>
                      <button className="flex items-center gap-1.5 rounded-xl bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 rounded-xl bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600">
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  )}
                  {isLive && (
                    <button className="flex items-center gap-1.5 rounded-xl border border-orange-200 px-3 py-1.5 text-sm font-medium text-orange-500 hover:bg-orange-50">
                      <Flag className="h-3.5 w-3.5" /> Flag
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
