"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice, getTimeRemaining } from "@/lib/utils";
import ReservationCountdown from "@/components/ReservationCountdown";
import { useState } from "react";

export default function PanierPage() {
  const { item, removeItem, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  const handleCommander = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    if (!clientForm.nom || !clientForm.email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reserver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tapisId: item._id,
          clientNom: clientForm.nom,
          clientEmail: clientForm.email,
          clientTel: clientForm.telephone,
          clientAdresse: clientForm.adresse,
        }),
      });

      if (res.status === 409) {
        setError("Ce tapis vient d'être réservé par quelqu'un d'autre.");
        removeItem();
        return;
      }

      if (!res.ok) throw new Error("Erreur serveur");

      const data = await res.json();

      // Stocker les infos de commande pour la page de confirmation
      sessionStorage.setItem(
        `commande_${item._id}`,
        JSON.stringify({
          tapisName: data.tapisName || item.name,
          tapisPrix: data.tapisPrix || item.prix,
          diametre: item.diametre,
          photo: item.photo,
          reservedUntil: data.reservedUntil,
          clientNom: clientForm.nom,
          clientEmail: clientForm.email,
        })
      );

      clearCart();
      router.push(`/commande/${item._id}`);
    } catch {
      setError("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold">
          Votre panier est vide
        </h1>
        <p className="text-text-muted mt-3">
          Parcourez la collection pour trouver votre tapis.
        </p>
        <Link
          href="/collection/naturelle"
          className="inline-flex items-center px-6 py-3 mt-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors text-sm"
        >
          Voir la collection
        </Link>
      </div>
    );
  }

  const remaining = getTimeRemaining(item.expiresAt);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold mb-8">
        Votre panier
      </h1>

      {/* Produit */}
      <div className="bg-white rounded-2xl border border-beige-dark p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden shrink-0" style={{ borderRadius: 12 }}>
            <Image src={item.photo} alt={item.name} fill className="object-cover" sizes="128px" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-marron font-semibold text-base sm:text-lg truncate">
              {item.name}
            </h2>
            <p className="text-sm text-text-muted mt-1">Ø {item.diametre} cm</p>
            <p className="text-lg font-display text-terre font-bold mt-2">
              {formatPrice(item.prix)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-orange bg-orange/10 px-2 py-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Réservé — expire dans <ReservationCountdown reservedAt={item.reservedAt} />
              </span>
            </div>
          </div>
          <button onClick={removeItem} className="shrink-0 text-text-muted hover:text-red-500 transition-colors self-start" aria-label="Retirer du panier">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Formulaire de commande */}
      <form onSubmit={handleCommander} className="mt-8 bg-white rounded-2xl border border-beige-dark p-6 space-y-6">
        <h2 className="font-display text-marron font-semibold text-lg">
          Réserver ce tapis — payer par virement
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Nom complet *</label>
            <input
              type="text"
              required
              value={clientForm.nom}
              onChange={(e) => setClientForm({ ...clientForm, nom: e.target.value })}
              className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
              placeholder="Marie Dupont"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Email *</label>
            <input
              type="email"
              required
              value={clientForm.email}
              onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
              placeholder="marie@exemple.fr"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Téléphone</label>
            <input
              type="tel"
              value={clientForm.telephone}
              onChange={(e) => setClientForm({ ...clientForm, telephone: e.target.value })}
              className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
              placeholder="06 12 34 56 78"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">Adresse de livraison</label>
            <input
              type="text"
              value={clientForm.adresse}
              onChange={(e) => setClientForm({ ...clientForm, adresse: e.target.value })}
              className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
              placeholder="12 rue des Prés, 71000 Mâcon"
            />
          </div>
        </div>

        {/* Récap */}
        <div className="p-4 bg-beige-mid rounded-xl border border-beige-dark">
          <div className="flex justify-between text-sm text-text-muted">
            <span>{item.name} — Ø{item.diametre}cm</span>
            <span className="font-semibold text-terre">{formatPrice(item.prix)}</span>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Les coordonnées bancaires (RIB) vous seront envoyées par email
            après validation. Votre tapis est réservé 48h.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || remaining.expired}
          className="w-full py-3 px-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading
            ? "Envoi en cours..."
            : remaining.expired
            ? "Réservation expirée"
            : "Réserver ce tapis — payer par virement"}
        </button>

        {/* STRIPE DÉSACTIVÉ — activable à tout moment */}
        {/* <button onClick={handleStripeCheckout} className="w-full py-3 px-6 bg-terre text-white ...">Payer par carte bancaire</button> */}
        {/* <p className="text-xs text-text-muted text-center mt-3">Paiement sécurisé via Stripe</p> */}
      </form>
    </div>
  );
}
