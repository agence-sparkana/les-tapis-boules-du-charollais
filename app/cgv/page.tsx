import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV — Conditions générales de vente des Tapis Boules du Charollais.",
};

export default function CGVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-marron text-3xl font-bold mb-8">
        Conditions générales de vente
      </h1>
      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 1 — Objet
          </h2>
          <p>
            Les présentes conditions générales de vente régissent les ventes de
            tapis artisanaux en laine feutrée réalisées par Madeleine Benifei,
            entreprise individuelle, Rigny-sur-Arroux (71160), France, via le
            site lestapisboules-du-charollais.fr.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 2 — Produits
          </h2>
          <p>
            Chaque tapis est une pièce unique, fabriquée entièrement à la main.
            Les photographies sont non contractuelles — de légères variations de
            teintes ou de dimensions sont possibles et constituent la
            caractéristique artisanale du produit. Les dimensions indiquées sont
            approximatives (± 2 cm).
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 3 — Réservation 48h
          </h2>
          <p>
            Lorsque vous ajoutez un tapis au panier, celui-ci est réservé à
            votre nom pendant 48 heures. Passé ce délai, si le virement n&apos;a
            pas été reçu, le tapis est automatiquement remis en vente. La
            réservation ne constitue pas un engagement d&apos;achat définitif.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 4 — Prix et paiement
          </h2>
          <p>
            Les prix sont indiqués en euros TTC (TVA non applicable — article
            293 B du CGI, sous réserve du statut fiscal en vigueur). Le paiement
            s&apos;effectue par virement bancaire. Les coordonnées bancaires
            sont communiquées par email après validation de la commande. Le
            virement doit être effectué dans les 48 heures suivant la commande.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 5 — Livraison
          </h2>
          <p>
            Les tapis sont expédiés depuis Rigny-sur-Arroux (Bourgogne) après
            réception du virement. Les délais de livraison sont indicatifs
            (généralement 5 à 10 jours ouvrés en France métropolitaine). Les
            frais de livraison sont communiqués lors de la commande. Le tapis
            est emballé avec soin pour le protéger pendant le transport.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 6 — Droit de rétractation
          </h2>
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la
            consommation, vous disposez d&apos;un délai de 14 jours à compter
            de la réception du produit pour exercer votre droit de rétractation,
            sans avoir à justifier de motif. Le produit doit être retourné dans
            son état d&apos;origine, non utilisé, dans son emballage. Les frais
            de retour sont à la charge de l&apos;acheteur. Le remboursement sera
            effectué par virement dans un délai de 14 jours.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 7 — Garantie
          </h2>
          <p>
            Les produits bénéficient de la garantie légale de conformité (articles
            L.217-4 et suivants du Code de la consommation) et de la garantie
            des vices cachés (articles 1641 et suivants du Code civil).
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 8 — Données personnelles
          </h2>
          <p>
            Les données collectées sont traitées conformément à notre{" "}
            <a href="/politique-confidentialite" className="text-terre hover:text-terre-light underline">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 9 — Médiation
          </h2>
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute
            action judiciaire. Conformément à l&apos;article L.612-1 du Code de
            la consommation, vous pouvez recourir gratuitement au service de
            médiation de la consommation. Le médiateur compétent sera communiqué
            sur simple demande.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Article 10 — Droit applicable
          </h2>
          <p>
            Les présentes CGV sont soumises au droit français. Tout litige sera
            de la compétence exclusive des tribunaux français.
          </p>
        </section>
      </div>
    </div>
  );
}
