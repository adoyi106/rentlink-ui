import { notFound } from "next/navigation";
import { BedDouble, Bath, Square, Users2 } from "@/components/icons";
import { getPropertyById, isShortStay, properties } from "@/lib/data/properties";
import PhotoGallery from "@/components/property/PhotoGallery";
import BookingCard from "@/components/property/BookingCard";
import StayBookingCard from "@/components/property/StayBookingCard";
import MobileBookingBar from "@/components/property/MobileBookingBar";

export function generateStaticParams() {
  return properties.map((p) => ({ id: String(p.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyById(Number(id));

  if (!property) notFound();

  const paragraphs = (property.description ?? "").split("\n\n");

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:py-8 lg:pb-8">
      <PhotoGallery
        images={property.gallery ?? [property.img]}
        title={property.title}
      />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
          <p className="mt-1 text-gray-500">
            {property.location} · {property.postcode}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-gray-800">{property.rating}</span>
            <span className="text-gray-500">({property.reviews} reviews)</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-gray-400" />
              {property.beds} Bedroom{property.beds > 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-gray-400" />
              {property.baths} Bathroom{property.baths > 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-2">
              <Square className="h-4 w-4 text-gray-400" />
              {property.sqft} sqft
            </span>
            {isShortStay(property) && property.maxGuests ? (
              <span className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-gray-400" />
                {property.maxGuests} guests max
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Available now
              </span>
            )}
          </div>

          <hr className="my-6 border-gray-100" />

          <h2 className="text-lg font-bold text-gray-900">About this property</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-600">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            Show more →
          </button>
        </div>

        {isShortStay(property) ? (
          <StayBookingCard
            nightlyPrice={property.price}
            maxGuests={property.maxGuests}
            rating={property.rating}
            reviews={property.reviews}
            checkInTime={property.checkInTime}
            checkOutTime={property.checkOutTime}
          />
        ) : (
          <BookingCard
            price={property.price}
            availableFrom={property.availableFrom ?? "Immediately"}
            minTenancy={property.minTenancy ?? "12 months"}
            deposit={property.deposit ?? property.price * 2}
          />
        )}
      </div>

      <MobileBookingBar
        price={property.price}
        isStay={isShortStay(property)}
        rating={property.rating}
        reviews={property.reviews}
      />
    </main>
  );
}
