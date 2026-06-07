import { Bell } from "@/components/icons";

interface DashboardHeaderProps {
  initials: string;
  notifications?: number;
}

export default function DashboardHeader({
  initials,
  notifications = 0,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-end gap-3 border-b border-gray-100 bg-white px-6 py-3">
      <div className="relative">
        <Bell className="h-5 w-5 text-gray-500" />
        {notifications > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
            {notifications}
          </span>
        )}
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {initials}
      </div>
    </header>
  );
}
