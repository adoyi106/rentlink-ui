"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Banknote,
  BarChart2,
  Bell,
  FileText,
  Flag,
  Home,
  Settings,
  Shield,
  Users,
} from "@/components/icons";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Overview", href: "/admin/overview", icon: BarChart2 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Listings", href: "/admin/listings", icon: FileText, badge: 12 },
  { label: "Transactions", href: "/admin/transactions", icon: Banknote },
  { label: "Moderation", href: "/admin/moderation", icon: Shield, badge: 5 },
];

const systemNav = [
  { label: "Alerts", href: "/admin/alerts", icon: AlertTriangle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function NavItem({
  label,
  href,
  icon: Icon,
  badge,
  active,
}: {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold",
            active ? "bg-white text-blue-600" : "bg-white/20 text-white"
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col bg-gray-900">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <Home className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-base font-bold text-white">Rentlink</span>
          <span className="ml-1.5 text-xs text-gray-400">Admin</span>
        </div>
      </div>

      <div className="mx-3 mb-4 flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          AD
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Admin User</p>
          <p className="text-xs text-gray-400">Super admin</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col px-3">
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Main
        </p>
        <div className="flex flex-col gap-0.5">
          {mainNav.map(({ label, href, icon, badge }) => (
            <NavItem key={href} label={label} href={href} icon={icon} badge={badge} active={pathname === href} />
          ))}
        </div>

        <p className="mb-1 mt-6 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          System
        </p>
        <div className="flex flex-col gap-0.5">
          {systemNav.map(({ label, href, icon }) => (
            <NavItem key={href} label={label} href={href} icon={icon} active={pathname === href} />
          ))}
        </div>
      </nav>
    </aside>
  );
}
