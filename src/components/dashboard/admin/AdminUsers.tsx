"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Eye, Flag, Mail, Search, XCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

type UserStatus = "Verified" | "Pending KYC" | "Flagged";
type UserRole = "Tenant" | "Landlord";
type TabFilter = "All" | "Tenants" | "Landlords" | "Flagged";

interface User {
  initials: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  properties: number;
  totalPayments: string;
  status: UserStatus;
}

const users: User[] = [
  { initials: "EC", name: "Emily Chen", email: "emily.c@email.com", role: "Tenant", joined: "Mar 12, 2025", properties: 0, totalPayments: "₦5,550,000", status: "Verified" },
  { initials: "MW", name: "Marcus Webb", email: "mwebb@email.com", role: "Landlord", joined: "Mar 11, 2025", properties: 4, totalPayments: "₦28,400,000", status: "Pending KYC" },
  { initials: "DM", name: "David Mitchell", email: "dmitchell@email.com", role: "Landlord", joined: "Jan 3, 2020", properties: 12, totalPayments: "₦461,000,000", status: "Verified" },
  { initials: "PS", name: "Priya Sharma", email: "priya.s@email.com", role: "Tenant", joined: "Mar 8, 2025", properties: 0, totalPayments: "₦3,700,000", status: "Verified" },
  { initials: "TR", name: "Tom Reynolds", email: "tom.r@email.com", role: "Landlord", joined: "Feb 14, 2025", properties: 2, totalPayments: "₦15,600,000", status: "Flagged" },
  { initials: "AP", name: "Amir Patel", email: "amir.p@email.com", role: "Tenant", joined: "Oct 22, 2024", properties: 0, totalPayments: "₦9,250,000", status: "Verified" },
];

const tabs: TabFilter[] = ["All", "Tenants", "Landlords", "Flagged"];

const roleStyle: Record<UserRole, string> = {
  Tenant: "bg-pink-100 text-pink-600",
  Landlord: "bg-blue-100 text-blue-600",
};

const statusConfig: Record<UserStatus, { label: string; className: string; icon: React.ElementType }> = {
  Verified: { label: "Verified", className: "text-green-600", icon: CheckCircle2 },
  "Pending KYC": { label: "Pending KYC", className: "text-orange-500", icon: Clock },
  Flagged: { label: "Flagged", className: "text-red-500", icon: Flag },
};

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");

  const filtered = users.filter((u) => {
    if (activeTab === "Tenants") return u.role === "Tenant";
    if (activeTab === "Landlords") return u.role === "Landlord";
    if (activeTab === "Flagged") return u.status === "Flagged";
    return true;
  });

  const flaggedCount = users.filter((u) => u.status === "Flagged").length;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">{users.length.toLocaleString()} total users</p>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { value: "45,821", label: "Total" },
          { value: "4", label: "Verified" },
          { value: "1", label: "Pending KYC" },
          { value: "1", label: "Flagged" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-1 text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
        {/* Filter bar — stacks on mobile */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <select className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600 outline-none sm:flex-none">
              <option>Role: All</option>
              <option>Tenant</option>
              <option>Landlord</option>
            </select>
            <select className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600 outline-none sm:flex-none">
              <option>Status: All</option>
              <option>Verified</option>
              <option>Pending KYC</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
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
              {tab === "Flagged" && (
                <span className={cn("flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-bold",
                  activeTab === tab ? "bg-white text-blue-600" : "bg-red-100 text-red-500"
                )}>
                  {flaggedCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile: cards */}
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          {filtered.map((u, i) => {
            const sc = statusConfig[u.status];
            const StatusIcon = sc.icon;
            return (
              <div key={i} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                      {u.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{u.name}</p>
                      <p className="truncate text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-medium", roleStyle[u.role])}>
                    {u.role}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-gray-500">
                  <span>Joined: <span className="font-medium text-gray-700">{u.joined}</span></span>
                  <span>Properties: <span className="font-medium text-gray-700">{u.properties}</span></span>
                  <span className="col-span-2">Payments: <span className="font-medium text-gray-700">{u.totalPayments}</span></span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                  <span className={cn("flex items-center gap-1 text-xs font-medium", sc.className)}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {sc.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-gray-600">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-gray-600">
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                    {u.status === "Pending KYC" && (
                      <button className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
                        Verify
                      </button>
                    )}
                    {u.status === "Flagged" && (
                      <button className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50">
                        <XCircle className="h-3.5 w-3.5" /> Suspend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: table */}
        <div className="mt-4 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                {["User", "Role", "Joined", "Properties", "Total Payments", "Status", "Actions"].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u, i) => {
                const sc = statusConfig[u.status];
                const StatusIcon = sc.icon;
                return (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                          {u.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", roleStyle[u.role])}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-sm text-gray-600">{u.joined}</td>
                    <td className="py-3.5 text-sm text-gray-600">{u.properties}</td>
                    <td className="py-3.5 text-sm font-medium text-gray-900">{u.totalPayments}</td>
                    <td className="py-3.5">
                      <span className={cn("flex items-center gap-1 text-xs font-medium", sc.className)}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-gray-600">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-gray-600">
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                        {u.status === "Pending KYC" && (
                          <button className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
                            Verify
                          </button>
                        )}
                        {u.status === "Flagged" && (
                          <button className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50">
                            <XCircle className="h-3.5 w-3.5" /> Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
