import PropertyNavbar from "@/components/property/PropertyNavbar";

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PropertyNavbar />
      {children}
    </div>
  );
}
