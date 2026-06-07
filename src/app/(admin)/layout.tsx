import AdminShell from "@/components/dashboard/shared/AdminShell";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell
      sidebar={<AdminSidebar />}
      notifications={5}
    >
      {children}
    </AdminShell>
  );
}
