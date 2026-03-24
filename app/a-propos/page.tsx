import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Atelier de tapis artisanaux en boules de laine feutrée, Rigny-sur-Arroux (71160), Bourgogne.",
};

export default function AProposPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-medium text-laine tracking-wide uppercase mb-3">
          À propos
        </p>
        <h1 className="font-display text-marron text-3xl sm:text-4xl font-bold mb-6">
          Les Tapis Boules du Charollais
        </h1>

        {/* Contenu placeholder — à remplir depuis Sanity */}
        <div className="space-y-4 text-text-muted leading-relaxed">
          <p className="italic text-sm" style={{ color: "#C4622D" }}>
            {/* En production Sanity : ce texte sera remplacé par le contenu du champ "pageContent" */}
            Cette page sera complétée prochainement. Le contenu est modifiable
            depuis l&apos;espace Sanity Studio.
          </p>
        </div>

        {/* Infos pratiques */}
        <div className="mt-8 p-6 bg-beige-mid rounded-2xl border border-beige-dark">
          <h2 className="font-display text-marron font-semibold mb-4">
            L&apos;atelier
          </h2>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-terre">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Rigny-sur-Arroux, 71160 — Bourgogne
            </li>
            <li className="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-terre">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:madeleinebenifei@gmail.com" className="text-terre hover:text-terre-light">
                madeleinebenifei@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-terre">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <a href="tel:+33623016722" className="text-terre hover:text-terre-light">
                06 23 01 67 22
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
