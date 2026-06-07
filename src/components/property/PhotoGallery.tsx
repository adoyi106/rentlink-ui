"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "@/components/icons";

interface PhotoGalleryProps {
  images: string[];
  title: string;
}

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filled = images.length >= 5 ? images : [
    ...images,
    ...Array(Math.max(0, 5 - images.length)).fill(images[0]),
  ];

  const [main, tl, tr, bl, br] = filled;

  function prev() {
    setLightbox((n) => (n === null ? null : (n - 1 + images.length) % images.length));
  }
  function next() {
    setLightbox((n) => (n === null ? null : (n + 1) % images.length));
  }

  return (
    <>
      {/* Gallery grid */}
      <div className="relative grid h-[260px] grid-cols-[3fr_2fr] grid-rows-2 gap-[3px] overflow-hidden rounded-2xl sm:h-[360px] lg:h-[460px]">
        {/* Main image — spans 2 rows */}
        <button
          className="relative row-span-2 overflow-hidden"
          onClick={() => setLightbox(0)}
        >
          <Image src={main} alt={title} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="60vw" priority />
        </button>

        {/* Top-right */}
        <button className="relative overflow-hidden" onClick={() => setLightbox(1)}>
          <Image src={tl} alt={`${title} — 2`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="30vw" />
        </button>

        {/* Bottom-right — split into two */}
        <div className="grid grid-cols-2 gap-[3px]">
          <button className="relative overflow-hidden" onClick={() => setLightbox(2)}>
            <Image src={tr} alt={`${title} — 3`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="15vw" />
          </button>
          <button className="relative overflow-hidden" onClick={() => setLightbox(3)}>
            <Image src={bl} alt={`${title} — 4`} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="15vw" />
          </button>
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => setLightbox(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border-2 border-white bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Show all {images.length} photos
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            {lightbox + 1} / {images.length}
          </span>

          {/* Prev */}
          <button
            className="absolute left-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <div
            className="relative mx-20 h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={`${title} — photo ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`relative h-14 w-20 overflow-hidden rounded-lg transition-all ${
                  i === lightbox ? "ring-2 ring-white ring-offset-1 ring-offset-black" : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
