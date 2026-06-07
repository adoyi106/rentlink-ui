import { Building2, Users, TrendingUp, Bell } from "@/components/icons";

const stats = [
  {
    label: "Total properties",
    value: "12",
    sub: "+2 this month",
    icon: Building2,
    iconColor: "text-gray-400",
  },
  {
    label: "Active tenants",
    value: "18",
    sub: "All payments current",
    icon: Users,
    iconColor: "text-green-400",
  },
  {
    label: "Rent received",
    value: "₦38,400,000",
    sub: "This month",
    icon: TrendingUp,
    iconColor: "text-blue-400",
  },
  {
    label: "Pending applications",
    value: "7",
    sub: "Awaiting review",
    icon: Bell,
    iconColor: "text-yellow-400",
  },
];

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
  );
}
