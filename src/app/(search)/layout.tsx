import SearchNavbar from "@/components/SearchNavbar";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchNavbar />
      {children}
    </div>
  );
}
