import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

type BadgeColor = "green" | "gray" | "blue";

interface Property {
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  badge?: string;
  badgeColor?: BadgeColor;
}

const properties: Property[] = [
  {
    badge: "New",
    badgeColor: "green",
    title: "Modern Studio in Shoreditch",
    location: "Shoreditch, London",
    beds: 1,
    baths: 1,
    sqft: 450,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    badge: "Popular",
    badgeColor: "gray",
    title: "Bright 2-Bed in Hackney",
    location: "Hackney, London",
    beds: 2,
    baths: 1,
    sqft: 780,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    title: "Industrial Loft, Bermondsey",
    location: "Bermondsey, London",
    beds: 1,
    baths: 1,
    sqft: 650,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    badge: "Premium",
    badgeColor: "blue",
    title: "Penthouse in Canary Wharf",
    location: "Canary Wharf, London",
    beds: 3,
    baths: 2,
    sqft: 1200,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
];

const badgeStyles: Record<BadgeColor, string> = {
  green: "bg-green-500 text-white",
  gray: "bg-white/90 text-gray-800",
  blue: "bg-blue-600 text-white",
};

export default function FeaturedProperties() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured properties</h2>
            <p className="mt-2 text-gray-500">Handpicked verified listings from trusted landlords</p>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={property.img}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {property.badge && (
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
                      badgeStyles[property.badgeColor ?? "gray"]
                    )}
                  >
                    {property.badge}
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="h-3 w-3" />
                  {property.location}
                </div>
                <h3 className="mt-1.5 font-semibold text-gray-900">{property.title}</h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {property.beds} bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {property.baths} bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-3.5 w-3.5" />
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
