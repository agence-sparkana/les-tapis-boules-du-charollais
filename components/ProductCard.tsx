"use client";

import Link from "next/link";
import Image from "next/image";
import ReservationCountdown from "./ReservationCountdown";
import { formatPrice, getTimeRemaining, getExpiresAt } from "@/lib/utils";
import type { Tapis } from "@/lib/types";

interface ProductCardProps {
  tapis: Tapis;
  index?: number;
}

export default function ProductCard({ tapis, index = 0 }: ProductCardProps) {
  const countdown =
    tapis.statut === "réservé" && tapis.reservedAt
      ? getTimeRemaining(getExpiresAt(tapis.reservedAt)).text
      : undefined;

  const statusLabel =
    tapis.statut === "disponible"
      ? "Disponible"
      : tapis.statut === "réservé"
      ? `Réservé${countdown ? ` — ${countdown}` : " 48h"}`
      : "Vendu";

  return (
    <Link
      href={`/tapis/${tapis.slug.current}`}
      className="group block rounded-2xl bg-white"
      style={{
        boxShadow: "0 4px 20px rgba(61, 32, 16, 0.08)",
        transition:
          "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 20px 60px rgba(61, 32, 16, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 4px 20px rgba(61, 32, 16, 0.08)";
      }}
    >
      {/* Conteneur photo */}
      <div className="relative overflow-hidden" style={{ borderRadius: 12, aspectRatio: "1 / 1", background: "#D9CCBB" }}>
        {tapis.photos && tapis.photos.length > 0 ? (
          <Image
            src="/hero-tapis.jpg"
            alt={tapis.name}
            fill
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <Image
            src="/hero-tapis.jpg"
            alt={tapis.name}
            fill
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Badge statut — centré en bas, slide-up au hover */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            transform: "translateX(-50%) translateY(8px)",
            opacity: 0.85,
          }}
          onMouseEnter={() => {}}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap"
            style={{
              background: "rgba(61, 32, 16, 0.75)",
              borderRadius: 20,
              backdropFilter: "blur(4px)",
            }}
          >
            {tapis.statut === "réservé" && (
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            )}
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-4 text-center">
        <h3 className="font-display text-marron text-base font-medium group-hover:text-terre transition-colors duration-300">
          {tapis.name}
        </h3>
        <p className="text-sm text-text-muted mt-1">Ø {tapis.diametre} cm</p>
        <p className="text-lg font-display text-terre font-semibold mt-1">
          {formatPrice(tapis.prix)}
        </p>
        {tapis.statut === "réservé" && tapis.reservedAt && (
          <div className="mt-1 text-xs text-orange">
            Expire dans <ReservationCountdown reservedAt={tapis.reservedAt} />
          </div>
        )}
      </div>
    </Link>
  );
}
