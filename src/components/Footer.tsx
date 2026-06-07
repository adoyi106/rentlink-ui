import Link from "next/link";
import { Globe, Home } from "@/components/icons";

const columns = [
  {
    heading: "Tenants",
    links: [
      { label: "Search properties", href: "#" },
      { label: "How it works", href: "#" },
    ],
  },
  {
    heading: "Landlords",
    links: [
      { label: "List property", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-14 text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Rentlink</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            The modern way to rent. No agents. No fees. Just homes.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-4 text-sm font-semibold text-white">{col.heading}</h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-gray-800 px-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Rentlink, Inc.</span>
          <span aria-hidden>·</span>
          <Link href="#" className="hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Sitemap</Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-300">
          <button className="flex items-center gap-1.5 hover:text-white">
            <Globe className="h-4 w-4" />
            English (NG)
          </button>
          <button className="flex items-center gap-1.5 hover:text-white">
            <span className="font-semibold">₦</span>
            NGN
          </button>
        </div>
      </div>
    </footer>
  );
}
