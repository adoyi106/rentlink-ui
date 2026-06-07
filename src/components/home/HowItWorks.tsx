import { Search, Home, Shield, type LucideIcon } from "@/components/icons";

interface Step {
  n: number;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    n: 1,
    icon: Search,
    title: "Search",
    desc: "Browse thousands of verified properties directly from landlords.",
  },
  {
    n: 2,
    icon: Home,
    title: "Apply",
    desc: "Submit your application with documents in minutes.",
  },
  {
    n: 3,
    icon: Shield,
    title: "Move in",
    desc: "Pay rent securely through our platform. No agents.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">How Rentlink works</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          A simple, transparent renting process — from search to signed lease, all in one place.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                    <Icon className="h-9 w-9 text-blue-600" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-gray-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
