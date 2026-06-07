import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  MapPin,
  MessageSquare,
  XCircle,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type AppStatus = "Approved" | "Under review" | "Unsuccessful";

interface Application {
  img: string;
  address: string;
  sub: string;
  price: string;
  applied: string;
  status: AppStatus;
}

const applications: Application[] = [
  {
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
    address: "42 Victoria Island, VI",
    sub: "Studio",
    price: "₦1,850,000/yr",
    applied: "Applied Feb 20, 2025",
    status: "Approved",
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    address: "18 Wuse 2, Abuja",
    sub: "2-bed flat",
    price: "₦2,400,000/yr",
    applied: "Applied Feb 18, 2025",
    status: "Under review",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80",
    address: "Penthouse, Maitama",
    sub: "3-bed",
    price: "₦4,200,000/yr",
    applied: "Applied Feb 15, 2025",
    status: "Unsuccessful",
  },
];

const statusConfig: Record<AppStatus, { label: string; className: string; icon: React.ElementType }> = {
  Approved: { label: "Approved", className: "bg-green-50 text-green-600", icon: CheckCircle2 },
  "Under review": { label: "Under review", className: "bg-orange-50 text-orange-500", icon: Clock },
  Unsuccessful: { label: "Unsuccessful", className: "bg-red-50 text-red-500", icon: XCircle },
};

const notifications = [
  {
    icon: CheckCircle2,
    iconClass: "text-green-500 bg-green-50",
    text: "Your application for 42 Victoria Island has been approved!",
    time: "2h ago",
  },
  {
    icon: CreditCard,
    iconClass: "text-blue-500 bg-blue-50",
    text: "Rent payment of ₦1,850,000 confirmed for February 2025",
    time: "1d ago",
  },
];

export default function TenantOverview() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your tenancy at 42 Victoria Island is active.
        </p>
      </div>

      {/* Active tenancy card */}
      <div className="mt-6 flex flex-col gap-5 overflow-hidden rounded-2xl bg-blue-700 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-300">Active tenancy</p>
          <h2 className="mt-1 text-2xl font-bold text-white">42 Victoria Island, VI</h2>
          <div className="mt-1 flex items-center gap-1 text-sm text-blue-200">
            <MapPin className="h-3.5 w-3.5" />
            Victoria Island, Lagos
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-blue-300">Annual rent</p>
              <p className="mt-0.5 text-base font-bold text-white">₦1,850,000</p>
            </div>
            <div>
              <p className="text-xs text-blue-300">Lease ends</p>
              <p className="mt-0.5 text-base font-bold text-white">Mar 31, 2026</p>
            </div>
            <div>
              <p className="text-xs text-blue-300">Landlord</p>
              <p className="mt-0.5 truncate text-base font-bold text-white">David Mitchell</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tenant/payments"
              className="whitespace-nowrap rounded-full border-2 border-white bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Pay rent now
            </Link>
            <button className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white/50 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
              <MessageSquare className="h-4 w-4 shrink-0" />
              Message landlord
            </button>
          </div>
        </div>

        <div className="relative h-36 w-full overflow-hidden rounded-2xl opacity-90 sm:ml-8 sm:w-48 sm:shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80"
            alt="42 Victoria Island"
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row">
        {/* Left column */}
        <div className="flex flex-1 flex-col gap-4">
          {/* My Applications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">My Applications</h2>
              <Link
                href="/tenant/applications"
                className="flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 flex flex-col divide-y divide-gray-50">
              {applications.map((app, i) => {
                const sc = statusConfig[app.status];
                const StatusIcon = sc.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={app.img}
                        alt={app.address}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{app.address}</p>
                      <p className="text-xs text-gray-400">
                        {app.sub} · {app.price}
                      </p>
                      <p className="text-xs text-gray-400">{app.applied}</p>
                    </div>
                    <span
                      className={cn(
                        "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                        sc.className
                      )}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {sc.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rent Payments preview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Rent Payments</h2>
              <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600">
                <Download className="h-3.5 w-3.5" />
                Download all
              </button>
            </div>

            <div className="mt-4 flex flex-col divide-y divide-gray-50">
              {[
                { month: "March 2025", due: "Due Mar 1, 2025", amount: "₦1,850,000", upcoming: true },
                { month: "February 2025", due: "Paid Feb 1, 2025", amount: "₦1,850,000", upcoming: false },
                { month: "January 2025", due: "Paid Jan 1, 2025", amount: "₦1,850,000", upcoming: false },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="shrink-0">
                    {row.upcoming ? (
                      <Calendar className="h-6 w-6 text-orange-400" />
                    ) : (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{row.month}</p>
                    <p className="text-xs text-gray-400">{row.due}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <p className="text-sm font-semibold text-gray-900">{row.amount}</p>
                    {row.upcoming ? (
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-500">
                          Upcoming
                        </span>
                        <button className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                          Pay
                        </button>
                      </div>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600">
                        Paid
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex w-full flex-col gap-4 lg:w-72 lg:shrink-0">
          {/* Next payment */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Next payment</h2>
            <div className="mt-3 rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-500">Due in 7 days</p>
              <p className="mt-1 text-3xl font-bold text-blue-700">₦1,850,000</p>
              <p className="mt-0.5 text-xs text-blue-400">March 2025 rent</p>
            </div>
            <Link
              href="/tenant/payments"
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Pay rent — ₦1,850,000
            </Link>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Notifications</h2>
              <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                2 new
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {notifications.map((n, i) => {
                const Icon = n.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full", n.iconClass)}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs leading-relaxed text-gray-700">{n.text}</p>
                      <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
