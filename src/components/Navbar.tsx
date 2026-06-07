"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Find Homes", href: "/search" },
  { label: "List Property", href: "#" },
  { label: "How it works", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Rentlink</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop auth buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#">Log in</Link>
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
              asChild
            >
              <Link href="#">Sign up</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Rentlink</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col px-6 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3 pb-8">
              <Button variant="outline" className="w-full py-6 text-base" asChild>
                <Link href="#" onClick={() => setMenuOpen(false)}>Log in</Link>
              </Button>
              <Button
                className="w-full rounded-xl bg-blue-600 py-6 text-base text-white hover:bg-blue-700"
                asChild
              >
                <Link href="#" onClick={() => setMenuOpen(false)}>Sign up — it&apos;s free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
