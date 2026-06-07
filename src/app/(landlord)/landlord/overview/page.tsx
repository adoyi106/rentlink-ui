import OverviewStats from "@/components/dashboard/landlord/OverviewStats";
import PropertiesPanel from "@/components/dashboard/landlord/PropertiesPanel";
import PaymentsPanel from "@/components/dashboard/landlord/PaymentsPanel";

export default function LandlordOverviewPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning, David 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your properties today.
        </p>
      </div>
      <div className="mt-6">
        <OverviewStats />
      </div>
      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <PropertiesPanel />
        <PaymentsPanel />
      </div>
    </div>
  );
}
