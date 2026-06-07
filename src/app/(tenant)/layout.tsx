import DashboardShell from "@/components/dashboard/shared/DashboardShell";
import TenantSidebar from "@/components/dashboard/tenant/TenantSidebar";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      sidebar={<TenantSidebar />}
      initials="SC"
      notifications={2}
    >
      {children}
    </DashboardShell>
  );
}
