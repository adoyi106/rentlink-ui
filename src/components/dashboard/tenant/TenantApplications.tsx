"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  MessageSquare,
  Search,
  Shield,
  Square,
  XCircle,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type AppStatus = "Approved" | "Under review" | "Unsuccessful";
type TabFilter = "All" | AppStatus;

interface Application {
  propertyImg: string;
  address: string;
  location: string;
  type: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  landlord: string;
  landlordInitials: string;
  landlordVerified: boolean;
  appliedDate: string;
  ref: string;
  status: AppStatus;
  feedback?: string;
}

const applications: Application[] = [
  {
    propertyImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    address: "42 Victoria Island, VI",
    location: "Victoria Island, Lagos",
    type: "Studio",
    price: "₦1,850,000/yr",
    beds: 1,
    baths: 1,
    sqft: 450,
    landlord: "David Mitchell",
    landlordInitials: "DM",
    landlordVerified: true,
    appliedDate: "Feb 20, 2025",
    ref: "APP-2025-001",
    status: "Approved",
    feedback: "Your application has been approved. Please proceed to sign the lease.",
  },
  {
    propertyImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    address: "18 Wuse 2, Abuja",
    location: "Wuse 2, Abuja",
    type: "2-bed flat",
    price: "₦2,400,000/yr",
    beds: 2,
    baths: 1,
    sqft: 780,
    landlord: "James Oke",
    landlordInitials: "JO",
    landlordVerified: true,
    appliedDate: "Feb 18, 2025",
    ref: "APP-2025-002",
    status: "Under review",
    feedback: "Your application is being reviewed by the landlord.",
  },
  {
    propertyImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    address: "Penthouse, Maitama",
    location: "Maitama, Abuja",
    type: "3-bed penthouse",
    price: "₦4,200,000/yr",
    beds: 3,
    baths: 2,
    sqft: 1200,
    landlord: "Emma Obi",
    landlordInitials: "EO",
    landlordVerified: true,
    appliedDate: "Feb 15, 2025",
    ref: "APP-2025-003",
    status: "Unsuccessful",
    feedback: "Unfortunately the landlord has selected another applicant for this property.",
  },
  {
    propertyImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    address: "5 Ikoyi, Lagos",
    location: "Ikoyi, Lagos",
    type: "1-bed flat",
    price: "₦2,100,000/yr",
    beds: 1,
    baths: 1,
    sqft: 620,
    landlord: "Tunde Bello",
    landlordInitials: "TB",
    landlordVerified: false,
    appliedDate: "Feb 10, 2025",
    ref: "APP-2025-004",
    status: "Under review",
  },
];

const tabs: TabFilter[] = ["All", "Approved", "Under review", "Unsuccessful"];

const statusConfig: Record<AppStatus, { label: string; cardBorder: string; badgeClass: string; icon: React.ElementType }> = {
  Approved: {
    label: "Approved",
    cardBorder: "border-green-200",
    badgeClass: "bg-green-50 text-green-600",
    icon: CheckCircle2,
  },
  "Under review": {
    label: "Under review",
    cardBorder: "border-yellow-200",
    badgeClass: "bg-yellow-50 text-yellow-600",
    icon: Clock,
  },
  Unsuccessful: {
    label: "Unsuccessful",
    cardBorder: "border-gray-100",
    badgeClass: "bg-red-50 text-red-500",
    icon: XCircle,
  },
};

export default function TenantApplications() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");

  const counts: Record<TabFilter, number> = {
    All: applications.length,
    Approved: applications.filter((a) => a.status === "Approved").length,
    "Under review": applications.filter((a) => a.status === "Under review").length,
    Unsuccessful: applications.filter((a) => a.status === "Unsuccessful").length,
  };

  const filtered =
    activeTab === "All" ? applications : applications.filter((a) => a.status === activeTab);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            {counts["Under review"]} under review · {counts.All} total
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-48"
          />
        </div>
      </div>

      {/* Tab filters */}
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

      {/* Application cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map((app, i) => {
          const sc = statusConfig[app.status];
          const StatusIcon = sc.icon;
          const isApproved = app.status === "Approved";
          const isUnderReview = app.status === "Under review";

          return (
            <div
              key={i}
              className={cn("rounded-2xl border bg-white p-4 sm:p-5", sc.cardBorder)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Property image */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
                  <Image
                    src={app.propertyImg}
                    alt={app.address}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Property details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">{app.address}</h3>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{app.location}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-blue-600">{app.price}</p>
                    </div>

                    {/* Landlord chip — desktop only */}
                    <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 sm:flex">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {app.landlordInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">{app.landlord}</p>
                        {app.landlordVerified ? (
                          <span className="flex items-center gap-0.5 text-[10px] font-medium text-green-600">
                            <Shield className="h-2.5 w-2.5" /> Verified landlord
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-400">Unverified</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Property specs */}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" /> {app.beds} bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" /> {app.baths} bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="h-3.5 w-3.5" /> {app.sqft} sqft
                    </span>
                    {/* Landlord name — mobile only */}
                    <span className="flex items-center gap-1 font-medium text-gray-600 sm:hidden">
                      {app.landlordVerified && <Shield className="h-3 w-3 text-green-500" />}
                      {app.landlord}
                    </span>
                  </div>

                  {/* Feedback message */}
                  {app.feedback && (
                    <p className={cn(
                      "mt-2 rounded-lg px-3 py-2 text-xs",
                      isApproved ? "bg-green-50 text-green-700" :
                      isUnderReview ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-600"
                    )}>
                      {app.feedback}
                    </p>
                  )}
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
                    Applied {app.appliedDate} · Ref: {app.ref}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <Eye className="h-3.5 w-3.5" /> View property
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </button>
                  {isApproved && (
                    <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Sign lease
                    </button>
                  )}
                  {isUnderReview && (
                    <button className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50">
                      <XCircle className="h-3.5 w-3.5" /> Withdraw
                    </button>
                  )}
                  {app.status === "Unsuccessful" && (
                    <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                      <Search className="h-3.5 w-3.5" /> Search similar
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
