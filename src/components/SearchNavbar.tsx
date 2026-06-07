import Link from "next/link";
import { Search, X, Home } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function SearchNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-lg font-semibold text-gray-900 sm:inline">Rentlink</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 shadow-sm sm:px-4">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            defaultValue="Lagos, Nigeria"
            className="w-full min-w-0 flex-1 bg-transparent px-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:px-3"
          />
          <button className="hidden shrink-0 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 sm:block">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700 sm:px-5"
            asChild
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
