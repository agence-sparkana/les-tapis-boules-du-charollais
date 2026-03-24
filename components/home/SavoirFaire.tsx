import Image from "next/image";

export default function SavoirFaire() {
  const etapes = [
    {
      num: "01",
      title: "Cardage",
      desc: "La laine brute est cardée pour séparer et aligner les fibres. Cette étape prépare la matière première.",
    },
    {
      num: "02",
      title: "Feutrage des boules",
      desc: "Chaque boule est formée à la main par feutrage à l'eau chaude et au savon. Un geste répété des centaines de fois.",
    },
    {
      num: "03",
      title: "Assemblage",
      desc: "Les boules sont assemblées une par une pour former le tapis rond. La disposition est unique à chaque pièce.",
    },
    {
      num: "04",
      title: "Finition",
      desc: "Le tapis est vérifié, ajusté et préparé. Chaque pièce reçoit un soin particulier avant d'être proposée à la vente.",
    },
  ];

  return (
    <section className="bg-beige py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Gauche — étapes */}
          <div>
            <p className="text-sm font-medium text-laine tracking-wide uppercase mb-3">
              Savoir-faire
            </p>
            <h2 className="font-display text-marron text-2xl sm:text-3xl font-bold mb-8">
              Du cardage à l&apos;assemblage
            </h2>

            <div className="space-y-6">
              {etapes.map((etape) => (
                <div key={etape.num} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-beige-mid border border-beige-dark flex items-center justify-center">
                    <span className="text-xs font-bold text-terre">
                      {etape.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-marron font-semibold">
                      {etape.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">
                      {etape.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Droite — photo */}
          <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: 12 }}>
            <Image
              src="/boules-fleur.jpg"
              alt="Boules de laine feutrée en cours de fabrication"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
