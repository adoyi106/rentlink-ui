import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Pencil } from "@/components/icons";
import { cn } from "@/lib/utils";

type Status = "Occupied" | "Vacant";

interface PropertyRow {
  img: string;
  address: string;
  sub: string;
  price: string;
  due?: string;
  status: Status;
}

const properties: PropertyRow[] = [
  {
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80",
    address: "42 Victoria Island, VI",
    sub: "Studio · Sarah M.",
    price: "₦1,850,000/yr",
    due: "Due Mar 1",
    status: "Occupied",
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    address: "18 Wuse 2, Abuja",
    sub: "2-bed · James K.",
    price: "₦2,400,000/yr",
    due: "Due Mar 5",
    status: "Occupied",
  },
  {
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    address: "5 Ikoyi, Lagos",
    sub: "1-bed · Vacant",
    price: "₦2,100,000/yr",
    status: "Vacant",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80",
    address: "Penthouse, Maitama",
    sub: "3-bed · Emma T.",
    price: "₦4,200,000/yr",
    due: "Due Mar 10",
    status: "Occupied",
  },
];

const statusStyle: Record<Status, string> = {
  Occupied: "text-green-600 bg-green-50",
  Vacant: "text-orange-500 bg-orange-50",
};

export default function PropertiesPanel() {
  return (
    <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Properties</h2>
        <Link
          href="/landlord/properties"
          className="flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {properties.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <Image src={p.img} alt={p.address} fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-gray-900">{p.address}</p>
                <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[p.status])}>
                  {p.status}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-gray-400">
                {p.sub} · {p.price}{p.due ? ` · ${p.due}` : ""}
              </p>
            </div>
            <button className="shrink-0 p-1 text-gray-300 hover:text-gray-500">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
