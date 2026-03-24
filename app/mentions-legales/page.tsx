import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Les Tapis Boules du Charollais.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-marron text-3xl font-bold mb-8">
        Mentions légales
      </h1>
      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Éditeur du site
          </h2>
          <p>
            Madeleine Benifei — Entreprise individuelle
            <br />
            Adresse : Rigny-sur-Arroux, 71160, France
            <br />
            Email :{" "}
            <a href="mailto:madeleinebenifei@gmail.com" className="text-terre hover:text-terre-light">
              madeleinebenifei@gmail.com
            </a>
            <br />
            Téléphone : 06 23 01 67 22
          </p>
          {/* SIRET à compléter par Madeleine */}
          <p className="mt-2 italic text-xs text-orange">
            N° SIRET : à compléter
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Hébergement
          </h2>
          <p>
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            Site :{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-terre hover:text-terre-light">
              vercel.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Conception du site
          </h2>
          <p>
            Agence Sparkana —{" "}
            <a href="https://sparkana.fr" target="_blank" rel="noopener noreferrer" className="text-terre hover:text-terre-light">
              sparkana.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des éléments de ce site (textes, images, logo, design)
            est la propriété de Madeleine Benifei ou fait l&apos;objet d&apos;une
            autorisation d&apos;utilisation. Toute reproduction, même partielle,
            est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Responsabilité
          </h2>
          <p>
            Madeleine Benifei s&apos;efforce de fournir des informations aussi
            précises que possible. Toutefois, elle ne pourra être tenue
            responsable des omissions, inexactitudes ou carences dans la mise à
            jour. Les photographies des tapis sont non contractuelles — chaque
            pièce étant unique, de légères variations sont possibles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Droit applicable
          </h2>
          <p>
            Le présent site est soumis au droit français. En cas de litige, les
            tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
