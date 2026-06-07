interface BookingCardProps {
  price: number;
  availableFrom: string;
  minTenancy: string;
  deposit: number;
}

export default function BookingCard({
  price,
  availableFrom,
  minTenancy,
  deposit,
}: BookingCardProps) {
  return (
    <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">
          ₦{price.toLocaleString("en-NG")}
        </span>
        <span className="text-gray-400">/year</span>
      </div>

      <div className="mt-5 space-y-3 divide-y divide-gray-100">
        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-500">Available from</span>
          <span className="font-medium text-gray-900">{availableFrom}</span>
        </div>
        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-500">Min. tenancy</span>
          <span className="font-medium text-gray-900">{minTenancy}</span>
        </div>
        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-500">Deposit</span>
          <span className="font-medium text-gray-900">
            ₦{deposit.toLocaleString("en-NG")}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-500">Agent fees</span>
          <span className="font-semibold text-green-600">None — ₦0</span>
        </div>
      </div>

      <button className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700">
        Apply now
      </button>
      <button className="mt-3 w-full rounded-xl border border-gray-200 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
        Message landlord
      </button>
    </div>
  );
}
