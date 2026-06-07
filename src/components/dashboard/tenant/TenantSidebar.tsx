"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, CreditCard, FileText, Home, LayoutGrid, Users } from "@/components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/tenant/overview", icon: LayoutGrid },
  { label: "My Applications", href: "/tenant/applications", icon: FileText },
  { label: "My Stays", href: "/tenant/stays", icon: Calendar },
  { label: "Payments", href: "/tenant/payments", icon: CreditCard },
  { label: "Notifications", href: "/tenant/notifications", icon: Bell, badge: 2 },
  { label: "Profile", href: "/tenant/profile", icon: Users },
];

export default function TenantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <Home className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold text-gray-900">Rentlink</span>
      </div>

      <div className="mx-3 mb-4 flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          SC
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">Sarah Chen</p>
          <p className="text-xs text-gray-500">Tenant</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge !== undefined && (
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold",
                    active ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"
                  )}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
