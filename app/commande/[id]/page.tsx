"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface CommandeData {
  tapisName: string;
  tapisPrix: number;
  diametre: number;
  photo: string;
  reservedUntil: string;
  clientNom: string;
  clientEmail: string;
}

export default function CommandeConfirmationPage() {
  const params = useParams();
  const tapisId = params.id as string;
  const [data, setData] = useState<CommandeData | null>(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(`commande_${tapisId}`);
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, [tapisId]);

  useEffect(() => {
    if (!data?.reservedUntil) return;

    function updateCountdown() {
      const end = new Date(data!.reservedUntil).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setCountdown("Expiré");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${hours}h ${String(minutes).padStart(2, "0")}min`);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold">
          Commande introuvable
        </h1>
        <p className="text-text-muted mt-3">
          Les détails de cette commande ne sont plus disponibles.
          Vérifiez vos emails pour les instructions de virement.
        </p>
        <Link
          href="/collection/naturelle"
          className="inline-flex items-center px-6 py-3 mt-6 bg-terre text-white font-medium rounded-lg hover:bg-terre-light transition-colors text-sm"
        >
          Retour à la collection
        </Link>
      </div>
    );
  }

  const priceFormatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(data.tapisPrix);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Succès */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="font-display text-marron text-2xl sm:text-3xl font-bold">
          Votre tapis est réservé !
        </h1>
        <p className="text-text-muted mt-2">
          Un email de confirmation avec les coordonnées bancaires vous a été
          envoyé à <strong>{data.clientEmail}</strong>.
        </p>
      </div>

      {/* Récap tapis */}
      <div className="bg-white rounded-2xl border border-beige-dark p-6">
        <div className="flex gap-6 items-center">
          <div className="relative w-24 h-24 shrink-0 overflow-hidden" style={{ borderRadius: 12, background: "#D9CCBB" }}>
            <Image src={data.photo} alt={data.tapisName} fill className="object-cover" sizes="96px" />
          </div>
          <div>
            <h2 className="font-display text-marron font-semibold text-lg">
              {data.tapisName}
            </h2>
            <p className="text-sm text-text-muted">Ø {data.diametre} cm</p>
            <p className="text-lg font-display text-terre font-bold mt-1">
              {priceFormatted}
            </p>
          </div>
        </div>
      </div>

      {/* Countdown 48h */}
      <div className="mt-6 p-4 bg-orange/10 rounded-xl border border-orange/20 text-center">
        <p className="text-sm text-marron">
          Temps restant pour effectuer le virement :
        </p>
        <p className="text-2xl font-display text-orange font-bold mt-1">
          {countdown}
        </p>
      </div>

      {/* RIB */}
      <div className="mt-6 bg-white rounded-2xl border border-beige-dark p-6">
        <h3 className="font-display text-marron font-semibold mb-4">
          Coordonnées bancaires
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-beige-dark">
            <span className="text-text-muted">Titulaire</span>
            <span className="font-medium text-marron">Madeleine Benifei</span>
          </div>
          <div className="flex justify-between py-2 border-b border-beige-dark">
            <span className="text-text-muted">IBAN / BIC</span>
            <span className="font-medium text-marron">Voir l&apos;email de confirmation</span>
          </div>
          <div className="flex justify-between py-2 border-b border-beige-dark">
            <span className="text-text-muted">Référence</span>
            <span className="font-mono text-xs text-marron">{tapisId}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-text-muted">Montant</span>
            <span className="font-bold text-terre">{priceFormatted}</span>
          </div>
        </div>
        <p className="text-xs text-text-muted mt-4">
          Les coordonnées bancaires complètes (IBAN / BIC) sont dans l&apos;email
          de confirmation envoyé à {data.clientEmail}.
        </p>
      </div>

      {/* Avertissement */}
      <div className="mt-4 p-4 bg-beige-mid rounded-xl border border-beige-dark">
        <p className="text-xs text-text-muted">
          <strong className="text-marron">Important :</strong> Sans virement
          reçu dans les 48h, le tapis sera automatiquement remis en vente.
        </p>
      </div>

      {/* Retour */}
      <div className="mt-8 text-center">
        <Link
          href="/collection/naturelle"
          className="inline-flex items-center gap-2 text-sm font-medium text-terre hover:text-terre-light transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour à la collection
        </Link>
      </div>
    </div>
  );
}
