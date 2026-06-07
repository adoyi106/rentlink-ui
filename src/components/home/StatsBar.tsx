const stats = [
  { value: "50,000+", label: "Active listings" },
  { value: "120,000+", label: "Happy tenants" },
  { value: "₦0", label: "Agent fees" },
  { value: "4.9★", label: "Average rating" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-gray-100 bg-white py-10">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-bold text-blue-600">{stat.value}</span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
