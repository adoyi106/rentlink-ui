import Link from "next/link";
import { CheckCircle2, TrendingUp, XCircle } from "@/components/icons";
import { cn } from "@/lib/utils";

type PayStatus = "Received" | "Late";

interface Payment {
  name: string;
  date: string;
  amount: string;
  status: PayStatus;
}

const payments: Payment[] = [
  { name: "Sarah M.", date: "Feb 1, 2025", amount: "₦1,850,000", status: "Received" },
  { name: "James K.", date: "Feb 5, 2025", amount: "₦2,400,000", status: "Received" },
  { name: "Emma T.", date: "Feb 10, 2025", amount: "₦4,200,000", status: "Received" },
  { name: "Amir P.", date: "Feb 12, 2025", amount: "₦1,650,000", status: "Late" },
];

export default function PaymentsPanel() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 lg:w-72 lg:shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Payments</h2>
        <Link href="/landlord/payments" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {payments.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            {p.status === "Received" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-red-400" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-400">{p.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{p.amount}</p>
              <p className={cn("text-xs font-medium", p.status === "Received" ? "text-green-500" : "text-red-400")}>
                {p.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-blue-600 p-4">
        <p className="text-sm text-blue-200">Monthly revenue</p>
        <p className="mt-1 text-2xl font-bold text-white">₦38,400,000</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-blue-200">
          <TrendingUp className="h-3.5 w-3.5" />
          +12% vs last month
        </div>
      </div>
    </div>
  );
}
