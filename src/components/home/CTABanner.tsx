import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Ready to rent smarter?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Join 120,000+ tenants who&apos;ve ditched the agents.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#"
            className="rounded-full border-2 border-white bg-white px-8 py-3.5 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Find a home
          </Link>
          <Link
            href="#"
            className="rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            List your property
          </Link>
        </div>
      </div>
    </section>
  );
}
