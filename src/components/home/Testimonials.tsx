const reviews = [
  {
    initials: "SM",
    name: "Sarah M.",
    role: "Tenant",
    quote: "Found my dream flat in 3 days. No agent fees saved me over £2,000!",
  },
  {
    initials: "JK",
    name: "James K.",
    role: "Landlord",
    quote: "Managing all my properties from one dashboard is a game changer.",
  },
  {
    initials: "PS",
    name: "Priya S.",
    role: "Tenant",
    quote: "The direct communication with landlords made renting so much easier.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">What people say</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm"
            >
              <div className="flex gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-lg">★</span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-blue-700">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
