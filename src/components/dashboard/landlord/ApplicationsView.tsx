"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Eye, MessageSquare, Search, SlidersHorizontal, XCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

type AppStatus = "Pending" | "Approved" | "Declined";

interface Applicant {
  initials: string;
  name: string;
  age: number;
  job: string;
  income: string;
  credit: "Excellent" | "Good";
  references: number;
  docsComplete: boolean;
  appliedDate: string;
  status: AppStatus;
  propertyImg: string;
  propertyName: string;
}

const applicants: Applicant[] = [
  {
    initials: "EC",
    name: "Emily Chen",
    age: 28,
    job: "Software Engineer at Meta",
    income: "₦19,000,000/yr",
    credit: "Excellent",
    references: 2,
    docsComplete: true,
    appliedDate: "Feb 20, 2025",
    status: "Pending",
    propertyImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
    propertyName: "42 Victoria Island...",
  },
  {
    initials: "MW",
    name: "Marcus Webb",
    age: 34,
    job: "Investment Banker at Goldman Sachs",
    income: "₦36,000,000/yr",
    credit: "Excellent",
    references: 3,
    docsComplete: true,
    appliedDate: "Feb 18, 2025",
    status: "Pending",
    propertyImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80",
    propertyName: "Penthouse, Maitama...",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    age: 25,
    job: "Junior Designer at Figma",
    income: "₦8,400,000/yr",
    credit: "Good",
    references: 2,
    docsComplete: true,
    appliedDate: "Feb 16, 2025",
    status: "Approved",
    propertyImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
    propertyName: "42 Victoria Island...",
  },
  {
    initials: "TR",
    name: "Tom Reynolds",
    age: 31,
    job: "Freelance Developer",
    income: "₦13,000,000/yr",
    credit: "Good",
    references: 1,
    docsComplete: false,
    appliedDate: "Feb 14, 2025",
    status: "Declined",
    propertyImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    propertyName: "18 Wuse 2, Abuja",
  },
];

const tabs = [
  { label: "All", value: "All" as const },
  { label: "Pending", value: "Pending" as const },
  { label: "Approved", value: "Approved" as const },
  { label: "Declined", value: "Declined" as const },
] as const;

type TabValue = "All" | AppStatus;

const creditStyle = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
};

const statusConfig = {
  Pending: { label: "Awaiting review", className: "bg-yellow-100 text-yellow-700" },
  Approved: { label: "Approved", className: "bg-green-100 text-green-700" },
  Declined: { label: "Declined", className: "bg-red-100 text-red-500" },
};

export default function ApplicationsView() {
  const [activeTab, setActiveTab] = useState<TabValue>("All");

  const counts: Record<TabValue, number> = {
    All: applicants.length,
    Pending: applicants.filter((a) => a.status === "Pending").length,
    Approved: applicants.filter((a) => a.status === "Approved").length,
    Declined: applicants.filter((a) => a.status === "Declined").length,
  };

  const filtered =
    activeTab === "All" ? applicants : applicants.filter((a) => a.status === activeTab);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            {counts.Pending} pending · {counts.All} total
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 sm:flex-none">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:w-44"
            />
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === value
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            {label}
            <span
              className={cn(
                "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold",
                activeTab === value ? "bg-white text-blue-600" : "bg-gray-100 text-gray-500"
              )}
            >
              {counts[value]}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map((a, i) => {
          const sc = statusConfig[a.status];
          const isPending = a.status === "Pending";
          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border bg-white p-4 sm:p-5",
                isPending ? "border-yellow-200" : "border-gray-100"
              )}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 sm:h-12 sm:w-12">
                  {a.initials}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-gray-900">{a.name}</span>
                        <span className="text-sm text-gray-400">Age {a.age}</span>
                        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                          <CheckCircle2 className="h-3 w-3" /> ID Verified
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 truncate">{a.job}</p>
                    </div>
                    {/* Property thumbnail — desktop only */}
                    <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                      <div className="relative h-12 w-20 overflow-hidden rounded-xl">
                        <Image src={a.propertyImg} alt={a.propertyName} fill className="object-cover" sizes="80px" />
                      </div>
                      <p className="text-xs text-gray-400">Applying for</p>
                      <p className="text-xs font-medium text-gray-700">{a.propertyName}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                    <span>Income: <span className="font-medium text-gray-700">{a.income}</span></span>
                    <span>
                      Credit:{" "}
                      <span className={cn("rounded-full px-2 py-0.5 font-medium", creditStyle[a.credit])}>
                        {a.credit}
                      </span>
                    </span>
                    <span>Refs: <span className="font-medium text-gray-700">{a.references}</span></span>
                    <span className={cn("font-medium", a.docsComplete ? "text-green-600" : "text-orange-500")}>
                      Docs: {a.docsComplete ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex flex-col gap-3 border-t border-gray-50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-full px-3 py-1 text-xs font-medium", sc.className)}>
                    {sc.label}
                  </span>
                  <span className="text-xs text-gray-400">Applied {a.appliedDate}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <Eye className="h-3.5 w-3.5" /> View profile
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </button>
                  {isPending && (
                    <>
                      <button className="flex items-center gap-1.5 rounded-xl bg-green-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 rounded-xl bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600">
                        <XCircle className="h-3.5 w-3.5" /> Decline
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
