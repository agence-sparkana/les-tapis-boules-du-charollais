"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!imageRef.current) return;
      const scrollY = window.scrollY;
      const offset = Math.min(scrollY * 0.15, 20);
      imageRef.current.style.transform = `translateY(-${offset}px)`;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Gauche — texte */}
          <div>
            <p className="text-sm font-medium text-laine tracking-wide uppercase mb-4">
              Tissé à la main en Bourgogne
            </p>
            <h1 className="font-display text-marron text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Des tapis en laine,
              <br />
              faits de mille boules.
            </h1>
            <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-lg">
              Chaque pièce est unique — jamais reproduite à l&apos;identique.
              De la laine brute cardée aux boules feutrées assemblées une à une,
              chaque tapis raconte une histoire.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/collection/naturelle"
                className="inline-flex items-center justify-center px-6 py-3 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors text-sm"
              >
                Découvrir la collection
              </Link>
              <Link
                href="/savoir-faire"
                className="inline-flex items-center justify-center px-6 py-3 border border-beige-dark text-terre font-medium rounded-lg hover:bg-beige-mid transition-colors text-sm"
              >
                Notre savoir-faire
              </Link>
            </div>

            {/* Info-box réservation 48h */}
            <div className="mt-8 p-4 bg-beige-mid rounded-xl border border-beige-dark">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-orange"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-marron">
                    Réservation 48h
                  </p>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Chaque tapis est une pièce unique. Quand vous l&apos;ajoutez
                    au panier, il est réservé 48h rien que pour vous. Pas de
                    mauvaise surprise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Droite — photo arrondie avec parallax */}
          <div className="relative flex items-center justify-center">
            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{
                width: 480,
                height: 480,
                maxWidth: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 12,
                transition: "transform 0.1s linear",
              }}
            >
              <Image
                src="/hero-tapis.jpg"
                alt="Tapis rond en boules de laine feutrée, vue de dessus sur parquet"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            {/* Badge overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
              <p className="text-xs font-medium text-terre whitespace-nowrap">
                Laine cardée feutrée 100% Bourgogne
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
