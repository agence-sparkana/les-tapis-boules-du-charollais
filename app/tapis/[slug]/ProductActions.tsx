"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getSessionId } from "@/lib/session";
import { getExpiresAt } from "@/lib/utils";
import ReservationCountdown from "@/components/ReservationCountdown";
import type { Tapis } from "@/lib/types";

interface ProductActionsProps {
  tapis: Tapis;
}

export default function ProductActions({ tapis }: ProductActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const router = useRouter();

  const handleReserve = async () => {
    if (tapis.statut !== "disponible") return;

    setLoading(true);
    setError(null);

    try {
      const sessionId = getSessionId();

      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: tapis._id,
          sessionId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      const data = await res.json();

      // Ajouter au panier local
      addItem({
        _id: tapis._id,
        name: tapis.name,
        slug: tapis.slug.current,
        prix: tapis.prix,
        diametre: tapis.diametre,
        photo: "/hero-tapis.jpg",
        reservedAt: data.reservedAt,
        expiresAt: getExpiresAt(data.reservedAt),
      });

      router.push("/panier");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  if (tapis.statut === "vendu") {
    return (
      <div className="space-y-3">
        <button
          disabled
          className="w-full py-3 px-6 bg-beige-dark text-text-muted font-medium rounded-lg cursor-not-allowed text-sm"
        >
          Vendu
        </button>
        <p className="text-xs text-text-muted text-center">
          Ce tapis a trouvé son foyer. Un nouveau sera bientôt créé.
        </p>
      </div>
    );
  }

  if (tapis.statut === "réservé") {
    return (
      <div className="space-y-3">
        <button
          disabled
          className="w-full py-3 px-6 bg-orange/20 text-orange font-medium rounded-lg cursor-not-allowed text-sm"
        >
          Réservé
          {tapis.reservedAt && (
            <>
              {" "}— expire dans{" "}
              <ReservationCountdown reservedAt={tapis.reservedAt} />
            </>
          )}
        </button>
        <p className="text-xs text-text-muted text-center">
          Ce tapis est actuellement réservé. Il redeviendra disponible si la
          réservation expire.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleReserve}
        disabled={loading}
        className="w-full py-3 px-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? "Réservation en cours..." : "Réserver 48h — paiement par virement"}
      </button>
      {error && (
        <p className="text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
