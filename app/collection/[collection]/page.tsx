import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { mockTapis } from "@/lib/mock-data";

// En production :
// import { getTapisByCollection } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ collection: string }>;
};

const collectionLabels: Record<string, string> = {
  naturelle: "Collection naturelle",
  teintee: "Collection teintée",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  const label = collectionLabels[collection];
  if (!label) return {};
  return {
    title: label,
    description:
      collection === "naturelle"
        ? "Tapis ronds en boules de laine feutrée non teintée. Tons blanc cassé, ivoire, beige, caramel, gris laine."
        : "Collection teintée — bientôt disponible. Tapis en laine feutrée colorée.",
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;

  if (!collectionLabels[collection]) {
    notFound();
  }

  if (collection === "teintee") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-medium text-laine tracking-wide uppercase mb-3">
            Collection teintée
          </p>
          <h1 className="font-display text-marron text-3xl sm:text-4xl font-bold">
            Bientôt disponible
          </h1>
          <p className="text-text-muted mt-4 max-w-lg mx-auto leading-relaxed">
            La collection teintée est en cours de création. Des tapis aux
            couleurs vibrantes, toujours en laine feutrée 100% Bourgogne.
          </p>
          <div className="mt-8 p-6 bg-beige-mid rounded-2xl border border-beige-dark inline-block">
            <p className="text-sm text-text-muted">
              Envie d&apos;être prévenu(e) ? Écrivez-nous à{" "}
              <a
                href="mailto:madeleinebenifei@gmail.com"
                className="text-terre hover:text-terre-light underline"
              >
                madeleinebenifei@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // En production :
  // const tapis = await getTapisByCollection(collection);
  const tapis = mockTapis.filter((t) => t.collection === collection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <p className="text-sm font-medium text-laine tracking-wide uppercase mb-2">
          Boutique
        </p>
        <h1 className="font-display text-marron text-3xl sm:text-4xl font-bold">
          {collectionLabels[collection]}
        </h1>
        <p className="text-text-muted mt-2 max-w-lg">
          Chaque tapis est une pièce unique en laine feutrée, fabriquée
          entièrement à la main en Bourgogne.
        </p>
      </div>

      {tapis.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {tapis.map((t, i) => (
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
        <p className="text-center text-text-muted py-16">
          Aucun tapis disponible pour le moment. Revenez bientôt !
        </p>
      )}
    </div>
  );
}
