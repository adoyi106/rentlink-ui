import Image from "next/image";
import Link from "next/link";
import { Banknote, CheckCircle2, ChevronRight, Flag, TrendingUp, Users, XCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total users", value: "45,821", change: "+12.3% vs last month", icon: Users, iconColor: "text-gray-400" },
  { label: "Active listings", value: "12,447", change: "+8.1% vs last month", icon: TrendingUp, iconColor: "text-green-400" },
  { label: "Total transactions", value: "₦2.4B", change: "+18.7% vs last month", icon: Banknote, iconColor: "text-gray-400" },
  { label: "Platform revenue", value: "₦128M", change: "+9.4% vs last month", icon: TrendingUp, iconColor: "text-yellow-400" },
  { label: "Short-stay revenue", value: "₦18.4M", change: "+31.2% vs last month", icon: TrendingUp, iconColor: "text-blue-400" },
];

const registrations = [
  { initials: "EC", name: "Emily Chen", role: "Tenant", joined: "Today, 09:14", status: "Verified" as const },
  { initials: "MW", name: "Marcus Webb", role: "Landlord", joined: "Today, 08:52", status: "Pending" as const },
  { initials: "PS", name: "Priya Sharma", role: "Tenant", joined: "Yesterday", status: "Verified" as const },
  { initials: "TR", name: "Tom Reynolds", role: "Landlord", joined: "Yesterday", status: "Flagged" as const },
];

const pendingListings = [
  { img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80", address: "22 Victoria Island, VI", sub: "2-bed flat", lister: "Alex B.", ago: "2h ago" },
  { img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80", address: "8 Wuse 2, Abuja", sub: "Studio", lister: "Yemi Okafor", ago: "5h ago" },
  { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80", address: "101 Lekki Phase 1", sub: "3-bed house", lister: "Sam Knight", ago: "1d ago" },
];

const todaysPayments = [
  { name: "Sarah C.", location: "Victoria Island · 10:30 AM", amount: "₦1,850,000", status: "completed" as const },
  { name: "James K.", location: "Wuse 2 · 09:15 AM", amount: "₦2,400,000", status: "completed" as const },
  { name: "Emma T.", location: "Maitama · 08:45 AM", amount: "₦4,200,000", status: "completed" as const },
  { name: "Amir P.", location: "GRA PH · Yesterday", amount: "₦1,650,000", status: "failed" as const },
];

const health = [
  { label: "API uptime", value: "99.98%", color: "text-green-500" },
  { label: "Payment success", value: "99.2%", color: "text-green-500" },
  { label: "Support tickets", value: "12 open", color: "text-orange-500" },
  { label: "Fraud alerts", value: "0 today", color: "text-green-500" },
];

export default function AdminOverview() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Platform health · March 13, 2025</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-green-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row">
        {/* Left column */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Recent registrations */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent registrations</h2>
              <Link href="/admin/users" className="flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700">
                Manage users <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {registrations.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                    {r.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role} · Joined {r.joined}</p>
                  </div>
                  {r.status === "Verified" && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                  {r.status === "Pending" && (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-600">
                        Pending
                      </span>
                      <button className="rounded-xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                        Review
                      </button>
                    </div>
                  )}
                  {r.status === "Flagged" && (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-500">
                        <Flag className="h-3 w-3" /> Flagged
                      </span>
                      <button className="rounded-xl border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50">
                        Investigate
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Listings pending approval */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-900">Listings pending approval</h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-white">
                  12
                </span>
              </div>
              <Link href="/admin/listings" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {pendingListings.map((l, i) => (
                <div key={i} className="flex flex-wrap items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                    <Image src={l.img} alt={l.address} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{l.address}</p>
                    <p className="truncate text-xs text-gray-400">
                      {l.sub} · Listed by <span className="font-medium">{l.lister}</span> · {l.ago}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="flex items-center gap-1 rounded-xl bg-green-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button className="flex items-center gap-1 rounded-xl bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600">
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex w-full flex-col gap-4 lg:w-64 lg:shrink-0">
          {/* Today's payments */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Today&apos;s payments</h2>
              <span className="text-xs text-gray-400">Mar 13</span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {todaysPayments.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  {p.status === "completed" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="truncate text-xs text-gray-400">{p.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{p.amount}</p>
                    <p className={cn("text-xs font-medium", p.status === "completed" ? "text-green-500" : "text-red-400")}>
                      {p.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
              <span className="text-sm text-gray-500">Today&apos;s total</span>
              <span className="text-sm font-bold text-gray-900">₦10,100,000</span>
            </div>
          </div>

          {/* Platform health */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Platform health</h2>
            <div className="mt-3 flex flex-col gap-2.5">
              {health.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{h.label}</span>
                  <span className={cn("font-semibold", h.color)}>{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
