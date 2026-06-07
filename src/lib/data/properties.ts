export type BadgeColor = "green" | "gray" | "blue";
export type PropertyType = "long-term" | "short-stay";

export interface Property {
  id: number;
  title: string;
  location: string;
  postcode: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  badge?: string;
  badgeColor?: BadgeColor;
  description?: string;
  availableFrom?: string;
  minTenancy?: string;
  deposit?: number;
  gallery?: string[];
  type?: PropertyType;
  maxGuests?: number;
  amenities?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  instantBook?: boolean;
}

export const properties: Property[] = [
  {
    id: 1,
    badge: "New",
    badgeColor: "green",
    title: "Modern Studio in Victoria Island",
    location: "Victoria Island, Lagos",
    postcode: "Lagos",
    beds: 1,
    baths: 1,
    sqft: 520,
    price: 2_500_000,
    rating: 4.9,
    reviews: 24,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    description:
      "A beautifully presented, recently renovated studio apartment in the heart of Victoria Island. The property features floor-to-ceiling windows with stunning city views, a modern open-plan kitchen, and a stylish bathroom with underfloor heating.\n\nLocated just 5 minutes walk from Adeola Odeku Street, with excellent transport links across Lagos. The area is surrounded by great restaurants, cafés, and cultural venues.",
    availableFrom: "Immediately",
    minTenancy: "12 months",
    deposit: 5_000_000,
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 2,
    badge: "Popular",
    badgeColor: "gray",
    title: "Bright 2-Bed in Wuse 2",
    location: "Wuse 2, Abuja",
    postcode: "FCT",
    beds: 2,
    baths: 1,
    sqft: 780,
    price: 4_200_000,
    rating: 4.8,
    reviews: 18,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description:
      "A bright and spacious 2-bedroom apartment in the prestigious Wuse 2 district of Abuja. Features a modern kitchen, large living area, and private balcony with views of the city.\n\nConveniently located near major banks, shopping centres, and top restaurants. Easy access to major roads and the city centre.",
    availableFrom: "Immediately",
    minTenancy: "12 months",
    deposit: 8_400_000,
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 3,
    title: "Spacious Loft, GRA Port Harcourt",
    location: "GRA Phase 2, Port Harcourt",
    postcode: "Rivers",
    beds: 1,
    baths: 1,
    sqft: 650,
    price: 3_500_000,
    rating: 4.7,
    reviews: 31,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    description:
      "A unique and characterful loft-style apartment in the serene GRA Phase 2, Port Harcourt. High ceilings, exposed brick-style walls, and large windows make this a one-of-a-kind home.\n\nSituated in a quiet, secure estate with 24-hour security. Close to shopping malls, hospitals, and international schools.",
    availableFrom: "1st of next month",
    minTenancy: "12 months",
    deposit: 7_000_000,
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 4,
    badge: "Premium",
    badgeColor: "blue",
    title: "Luxury Penthouse, Ikoyi",
    location: "Ikoyi, Lagos",
    postcode: "Lagos",
    beds: 3,
    baths: 2,
    sqft: 1200,
    price: 18_000_000,
    rating: 5,
    reviews: 12,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    description:
      "An exceptional penthouse apartment on the top floor of a prestigious tower in Ikoyi, Lagos. Three spacious bedrooms, two bathrooms, a chef's kitchen, and a wraparound terrace with panoramic ocean and city views.\n\nFull concierge service, swimming pool, gym, and private parking included. Direct from landlord — zero agent fees.",
    availableFrom: "Immediately",
    minTenancy: "12 months",
    deposit: 36_000_000,
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 5,
    title: "Cosy 1-Bed in Yaba",
    location: "Yaba, Lagos",
    postcode: "Lagos",
    beds: 1,
    baths: 1,
    sqft: 490,
    price: 1_800_000,
    rating: 4.6,
    reviews: 29,
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    description:
      "A cosy and well-maintained 1-bedroom apartment in vibrant Yaba, Lagos. Bright and airy with modern furnishings, tiled floors, and a compact but functional kitchen.\n\nPerfect for young professionals. Walking distance to tech hubs, universities, and great local dining. Reliable water and electricity supply.",
    availableFrom: "Immediately",
    minTenancy: "12 months",
    deposit: 3_600_000,
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    ],
  },
  {
    id: 6,
    title: "3-Bed Family Home, Maitama",
    location: "Maitama, Abuja",
    postcode: "FCT",
    beds: 3,
    baths: 2,
    sqft: 1050,
    price: 8_500_000,
    rating: 4.8,
    reviews: 8,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description:
      "A spacious 3-bedroom family home in the exclusive Maitama district of Abuja. Features a large living room, modern fitted kitchen, en-suite master bedroom, and a private garden.\n\nSituated in a quiet, tree-lined street with 24-hour estate security. Near top international schools, embassies, and Abuja's finest dining.",
    availableFrom: "Immediately",
    minTenancy: "12 months",
    deposit: 17_000_000,
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 7,
    type: "short-stay",
    badge: "Superhost",
    badgeColor: "blue",
    title: "Beachfront Suite, Victoria Island",
    location: "Victoria Island, Lagos",
    postcode: "Lagos",
    beds: 2,
    baths: 2,
    sqft: 680,
    price: 95_000,
    rating: 4.9,
    reviews: 87,
    maxGuests: 4,
    instantBook: true,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: ["WiFi", "Pool", "Air conditioning", "Kitchen", "Parking"],
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    description: "A stunning beachfront suite steps from Bar Beach on Victoria Island. Wake up to ocean views, enjoy the pool deck, and walk to the best restaurants and nightlife Lagos has to offer.\n\nIdeal for couples or small families. Fully air-conditioned with high-speed WiFi, a fully equipped kitchen, and secure parking.",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 8,
    type: "short-stay",
    title: "Modern Studio, Wuse 2",
    location: "Wuse 2, Abuja",
    postcode: "FCT",
    beds: 1,
    baths: 1,
    sqft: 380,
    price: 45_000,
    rating: 4.7,
    reviews: 52,
    maxGuests: 2,
    instantBook: true,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Netflix"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description: "A sleek, modern studio in the heart of Wuse 2, Abuja's most sought-after district. Close to embassies, top restaurants, and business centres.\n\nPerfect for solo travellers and couples. Comes with a smart TV, Netflix, high-speed WiFi, and a fully stocked kitchen.",
    gallery: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    ],
  },
  {
    id: 9,
    type: "short-stay",
    badge: "Premium",
    badgeColor: "blue",
    title: "Luxury Villa, Banana Island",
    location: "Banana Island, Lagos",
    postcode: "Lagos",
    beds: 4,
    baths: 4,
    sqft: 2800,
    price: 350_000,
    rating: 5,
    reviews: 34,
    maxGuests: 8,
    instantBook: false,
    checkInTime: "15:00",
    checkOutTime: "12:00",
    amenities: ["WiFi", "Pool", "Air conditioning", "Kitchen", "Gym", "Parking", "Netflix"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    description: "An extraordinary 4-bedroom villa on exclusive Banana Island — Lagos's most prestigious address. A private pool, landscaped garden, and a dedicated house manager come standard.\n\nHost corporate retreats, family reunions, or simply enjoy the finest short-stay experience in Nigeria.",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    ],
  },
  {
    id: 10,
    type: "short-stay",
    badge: "New",
    badgeColor: "green",
    title: "Cosy Retreat, Lekki Phase 1",
    location: "Lekki Phase 1, Lagos",
    postcode: "Lagos",
    beds: 2,
    baths: 1,
    sqft: 540,
    price: 75_000,
    rating: 4.8,
    reviews: 19,
    maxGuests: 4,
    instantBook: true,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Parking"],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    description: "A warm and inviting 2-bedroom retreat tucked in a quiet estate in Lekki Phase 1. Perfect for a relaxed Lagos getaway with easy access to beaches and shopping.\n\nInstant book available. Equipped kitchen, fast WiFi, and free parking.",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    ],
  },
  {
    id: 11,
    type: "short-stay",
    title: "City Apartment, Maitama",
    location: "Maitama, Abuja",
    postcode: "FCT",
    beds: 2,
    baths: 2,
    sqft: 620,
    price: 65_000,
    rating: 4.6,
    reviews: 41,
    maxGuests: 4,
    instantBook: true,
    checkInTime: "14:00",
    checkOutTime: "11:00",
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Gym"],
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    description: "A well-appointed 2-bedroom apartment in Maitama, Abuja's diplomatic quarter. Secure estate, 24-hour power, and close to major government and business districts.\n\nGreat for business travellers and families visiting the FCT.",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
  },
  {
    id: 12,
    type: "short-stay",
    title: "Riverside Cabin, GRA Port Harcourt",
    location: "GRA Phase 1, Port Harcourt",
    postcode: "Rivers",
    beds: 1,
    baths: 1,
    sqft: 320,
    price: 55_000,
    rating: 4.7,
    reviews: 28,
    maxGuests: 2,
    instantBook: false,
    checkInTime: "15:00",
    checkOutTime: "10:00",
    amenities: ["WiFi", "Air conditioning", "Kitchen"],
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    description: "A charming riverside cabin in the serene GRA Phase 1, Port Harcourt. Ideal for couples looking for a peaceful escape with beautiful views and easy access to PH's best spots.\n\nQuiet, secure, and fully self-contained.",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    ],
  },
];

export function getPropertyById(id: number): Property | undefined {
  return properties.find((p) => p.id === id);
}

export const isShortStay = (p: Property) => p.type === "short-stay";
export const getShortStayProperties = () => properties.filter(isShortStay);
export const getLongTermProperties = () => properties.filter((p) => !isShortStay(p));
