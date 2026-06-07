import Image from "next/image";
import { Check, Shield } from "@/components/icons";

const benefits = [
  {
    title: "Zero agent fees",
    desc: "Save thousands per year by renting directly from landlords.",
  },
  {
    title: "Verified landlords",
    desc: "All landlords are ID-verified and property-checked.",
  },
  {
    title: "Secure payments",
    desc: "Pay rent through our encrypted, protected payment system.",
  },
  {
    title: "Direct communication",
    desc: "Message your landlord directly, anytime.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Why choose Rentlink?
          </h2>
          <ul className="mt-8 space-y-6">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Check className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{benefit.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative h-[440px] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80"
              alt="Bright modern apartment with city view"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="absolute -bottom-4 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Landlord verified</p>
              <p className="text-xs text-gray-500">Identity &amp; property checked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
