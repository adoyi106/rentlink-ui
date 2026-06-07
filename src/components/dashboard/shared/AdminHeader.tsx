import { Bell, CheckCircle2 } from "@/components/icons";

interface AdminHeaderProps {
  notifications?: number;
}

export default function AdminHeader({ notifications = 0 }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-end gap-3 border-b border-gray-100 bg-white px-6 py-3">
      <span className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        All systems operational
      </span>
      <div className="relative">
        <Bell className="h-5 w-5 text-gray-500" />
        {notifications > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
            {notifications}
          </span>
        )}
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
        AD
      </div>
    </header>
  );
}
