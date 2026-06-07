import DashboardShell from "@/components/dashboard/shared/DashboardShell";
import LandlordSidebar from "@/components/dashboard/landlord/LandlordSidebar";

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      sidebar={<LandlordSidebar />}
      initials="DM"
      notifications={3}
    >
      {children}
    </DashboardShell>
  );
}
