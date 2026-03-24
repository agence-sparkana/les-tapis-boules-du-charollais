"use client";

import { useState } from "react";
import Image from "next/image";

interface TapisGalleryProps {
  photos: string[];
  name: string;
}

export default function TapisGallery({ photos, name }: TapisGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  function handleThumbnailClick(index: number) {
    if (index === activeIndex) return;
    setFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFading(false);
    }, 150);
  }

  return (
    <div>
      {/* Photo principale */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{ borderRadius: 12, background: "#D9CCBB" }}
      >
        <Image
          src={photos[activeIndex]}
          alt={`${name} - vue ${activeIndex + 1}`}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Miniatures */}
      <div className="flex gap-3 mt-4">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => handleThumbnailClick(i)}
            className="relative w-20 h-20 overflow-hidden transition-colors duration-200"
            style={{
              borderRadius: 8,
              border:
                i === activeIndex
                  ? "2px solid #7A4E2D"
                  : "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (i !== activeIndex) {
                e.currentTarget.style.borderColor = "#7A4E2D";
              }
            }}
            onMouseLeave={(e) => {
              if (i !== activeIndex) {
                e.currentTarget.style.borderColor = "transparent";
              }
            }}
          >
            <Image
              src={src}
              alt={`${name} - miniature ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
