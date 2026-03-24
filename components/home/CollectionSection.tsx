"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Tapis } from "@/lib/types";

interface CollectionSectionProps {
  tapis: Tapis[];
}

export default function CollectionSection({ tapis }: CollectionSectionProps) {
  const [activeTab, setActiveTab] = useState<"naturelle" | "teintee">("naturelle");

  const filtered = tapis.filter((t) => t.collection === activeTab);

  return (
    <section className="bg-beige py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre + onglets */}
        <div className="text-center mb-10">
          <h2 className="font-display text-marron text-2xl sm:text-3xl font-bold">
            Nos créations
          </h2>
          <p className="text-text-muted mt-2 text-sm">
            Chaque tapis est une pièce unique, fabriquée entièrement à la main.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("naturelle")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "naturelle"
                ? "bg-terre text-white"
                : "bg-beige-mid text-text-muted hover:bg-beige-dark"
            }`}
          >
            Collection naturelle
          </button>
          <button
            onClick={() => setActiveTab("teintee")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "teintee"
                ? "bg-terre text-white"
                : "bg-beige-mid text-text-muted hover:bg-beige-dark"
            }`}
          >
            Collection teintée
          </button>
        </div>

        {/* Grille produits */}
        {activeTab === "naturelle" ? (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((t, i) => (
                <div
                  key={t._id}
                  style={{
                    animation: "fadeInUp 0.5s ease forwards",
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <ProductCard tapis={t} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted py-12">
              Les tapis arrivent bientôt...
            </p>
          )
        ) : (
          <div className="text-center py-16 bg-beige-mid rounded-2xl border border-beige-dark">
            <p className="font-display text-marron text-xl font-semibold">
              Bientôt disponible
            </p>
            <p className="text-text-muted mt-2 text-sm max-w-md mx-auto">
              La collection teintée est en cours de création.
              Des tapis aux couleurs vibrantes, toujours en laine feutrée 100%
              Bourgogne.
            </p>
          </div>
        )}

        {/* Lien vers toute la collection */}
        {activeTab === "naturelle" && filtered.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/collection/naturelle"
              className="inline-flex items-center gap-2 text-sm font-medium text-terre hover:text-terre-light transition-colors"
            >
              Voir toute la collection
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
