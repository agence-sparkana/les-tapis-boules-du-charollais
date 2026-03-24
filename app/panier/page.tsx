"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, getTimeRemaining } from "@/lib/utils";
import ReservationCountdown from "@/components/ReservationCountdown";
import { useState } from "react";

export default function PanierPage() {
  const { item, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [clientForm, setClientForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  const handleOrder = async () => {
    if (!item) return;
    if (!clientForm.nom || !clientForm.email) {
      alert("Merci de renseigner au minimum votre nom et votre email.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/commande-virement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item._id,
          productName: item.name,
          productSlug: item.slug,
          price: item.prix,
          diametre: item.diametre,
          client: clientForm,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setOrderSent(true);
    } catch {
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
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

  if (orderSent) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold">
          Commande enregistrée
        </h1>
        <p className="text-text-muted mt-3 max-w-md mx-auto">
          Vous allez recevoir un email avec les coordonnées bancaires pour
          effectuer votre virement. Votre tapis <strong>{item.name}</strong> est
          réservé 48h.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 mt-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors text-sm"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold mb-8">
        Votre panier
      </h1>

      {/* Produit */}
      <div className="bg-white rounded-2xl border border-beige-dark p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden shrink-0" style={{ borderRadius: 12 }}>
            <Image
              src={item.photo}
              alt={item.name}
              fill
              className="object-cover"
              sizes="128px"
            />
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
          <button
            onClick={removeItem}
            className="shrink-0 text-text-muted hover:text-red-500 transition-colors self-start"
            aria-label="Retirer du panier"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info 48h */}
      <div className="mt-4 p-4 bg-beige-mid rounded-xl border border-beige-dark">
        <p className="text-xs text-text-muted">
          <strong className="text-marron">Réservation 48h :</strong> votre
          tapis est réservé pour vous pendant 48 heures. Envoyez votre virement
          sous ce délai pour confirmer la commande.
        </p>
      </div>

      {!showRecap ? (
        /* Bouton principal */
        <div className="mt-8 bg-white rounded-2xl border border-beige-dark p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-text-muted">Total</span>
            <span className="text-xl font-display text-marron font-bold">
              {formatPrice(item.prix)}
            </span>
          </div>
          <button
            onClick={() => setShowRecap(true)}
            disabled={remaining.expired}
            className="w-full py-3 px-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {remaining.expired
              ? "Réservation expirée"
              : "Commander — payer par virement"}
          </button>
          {/* Code Stripe commenté — à réactiver plus tard */}
          {/* <button onClick={handleCheckout} className="...">Payer par carte bancaire</button> */}
          {/* <p className="text-xs text-text-muted text-center mt-3">Paiement sécurisé via Stripe</p> */}
        </div>
      ) : (
        /* Formulaire client + récap virement */
        <div className="mt-8 bg-white rounded-2xl border border-beige-dark p-6 space-y-6">
          <h2 className="font-display text-marron font-semibold text-lg">
            Vos coordonnées
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                value={clientForm.nom}
                onChange={(e) => setClientForm({ ...clientForm, nom: e.target.value })}
                className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
                placeholder="Marie Dupont"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                Email *
              </label>
              <input
                type="email"
                value={clientForm.email}
                onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
                placeholder="marie@exemple.fr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={clientForm.telephone}
                onChange={(e) => setClientForm({ ...clientForm, telephone: e.target.value })}
                className="w-full px-3 py-2 border border-beige-dark rounded-lg text-sm text-marron bg-beige focus:outline-none focus:border-terre"
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">
                Adresse de livraison
              </label>
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
          <div className="p-4 bg-beige-mid rounded-xl border border-beige-dark space-y-2">
            <h3 className="text-sm font-medium text-marron">
              Récapitulatif de commande
            </h3>
            <div className="flex justify-between text-sm text-text-muted">
              <span>{item.name} — Ø{item.diametre}cm</span>
              <span className="font-semibold text-terre">{formatPrice(item.prix)}</span>
            </div>
          </div>

          {/* Info virement */}
          <div className="p-4 bg-beige rounded-xl border border-beige-dark">
            <h3 className="text-sm font-medium text-marron mb-2">
              Coordonnées bancaires
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Les coordonnées bancaires (RIB / IBAN) vous seront envoyées par
              email après validation de votre commande. Votre tapis est réservé
              48h — envoyez votre virement dans ce délai pour confirmer.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowRecap(false)}
              className="flex-1 py-3 px-6 border border-beige-dark text-text-muted font-medium rounded-lg hover:bg-beige-mid transition-colors text-sm"
            >
              Retour
            </button>
            <button
              onClick={handleOrder}
              disabled={loading || remaining.expired}
              className="flex-1 py-3 px-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Envoi en cours..." : "Valider la commande"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
