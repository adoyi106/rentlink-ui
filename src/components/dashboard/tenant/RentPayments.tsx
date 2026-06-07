"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Clock, CreditCard, Download, Lock, Plus, TrendingUp } from "@/components/icons";
import { cn } from "@/lib/utils";

type PaymentStatus = "Upcoming" | "Paid";

interface PaymentRow {
  month: string;
  detail: string;
  amount: string;
  status: PaymentStatus;
}

const paymentHistory: PaymentRow[] = [
  { month: "March 2025", detail: "Due Mar 1, 2025", amount: "₦1,850,000", status: "Upcoming" },
  { month: "February 2025", detail: "Paid Feb 1, 2025 · Ref: DL-2025-02-001", amount: "₦1,850,000", status: "Paid" },
  { month: "January 2025", detail: "Paid Jan 1, 2025 · Ref: DL-2025-01-001", amount: "₦1,850,000", status: "Paid" },
  { month: "December 2024", detail: "Paid Dec 1, 2024 · Ref: DL-2024-12-001", amount: "₦1,850,000", status: "Paid" },
  { month: "November 2024", detail: "Paid Nov 1, 2024 · Ref: DL-2024-11-001", amount: "₦1,850,000", status: "Paid" },
  { month: "October 2024", detail: "Paid Oct 1, 2024 · Ref: DL-2024-10-001", amount: "₦1,850,000", status: "Paid" },
];

const stats = [
  { label: "Total paid", value: "₦20,350,000", sub: "Since Oct 2024", icon: TrendingUp, iconColor: "text-green-400" },
  { label: "On-time rate", value: "100%", sub: "All payments on time", icon: CheckCircle2, iconColor: "text-gray-400" },
  { label: "Next payment", value: "₦1,850,000", sub: "Due Mar 1, 2025", icon: Calendar, iconColor: "text-orange-400" },
];

export default function RentPayments() {
  const [autoPay, setAutoPay] = useState(true);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rent Payments</h1>
        <p className="mt-1 text-sm text-gray-500">
          42 Victoria Island, VI — ₦1,850,000/year
        </p>
      </div>

      {/* Next payment banner */}
      <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-blue-600 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium text-blue-200">Next payment due</p>
          <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">₦1,850,000</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-blue-200">
            <Calendar className="h-4 w-4" />
            March 2025 · Due 1 March 2025 ·{" "}
            <span className="font-semibold text-white">7 days remaining</span>
          </div>
        </div>
        <div className="sm:text-right">
          <button className="w-full rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto">
            Pay ₦1,850,000 now
          </button>
          <div className="mt-2 flex items-center gap-1 text-xs text-blue-200 sm:justify-end">
            <Lock className="h-3 w-3" />
            Secure encrypted payment
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row">
        {/* Payment history */}
        <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Payment history</h2>
            <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50">
              <Download className="h-3.5 w-3.5" />
              Export all
            </button>
          </div>

          <div className="mt-4 flex flex-col divide-y divide-gray-50">
            {paymentHistory.map((row, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="shrink-0">
                  {row.status === "Paid" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Clock className="h-6 w-6 text-orange-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{row.month}</p>
                  <p className="truncate text-xs text-gray-400">{row.detail}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-gray-900">{row.amount}</p>
                  {row.status === "Upcoming" ? (
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                        Upcoming
                      </span>
                      <button className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                        Pay
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                        Paid
                      </span>
                      <button className="rounded-xl border border-gray-200 p-1.5 text-gray-400 hover:text-gray-600">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex w-full flex-col gap-4 lg:w-64 lg:shrink-0">
          {/* Payment methods */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Payment methods</h2>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-3">
                <div className="flex h-8 w-12 items-center justify-center rounded-md bg-blue-700 text-xs font-bold text-white">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Visa ···· 4242</p>
                  <p className="text-xs text-gray-400">Expires 12/27</p>
                </div>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                  Default
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                <div className="flex h-8 w-12 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white">
                  MC
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Mastercard ···· 8888</p>
                  <p className="text-xs text-gray-400">Expires 08/26</p>
                </div>
              </div>
              <button className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-200 py-2.5 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500">
                <Plus className="h-4 w-4" />
                Add payment method
              </button>
            </div>
          </div>

          {/* Payment security */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Payment security</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {["256-bit encryption", "PCI DSS compliant", "Fraud protection"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Auto-pay */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Auto-pay</h2>
              <button
                onClick={() => setAutoPay((v) => !v)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  autoPay ? "bg-blue-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    autoPay ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Automatically pay your rent on the 1st of each month using your default payment method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
