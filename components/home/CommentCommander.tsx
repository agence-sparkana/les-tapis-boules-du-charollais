export default function CommentCommander() {
  const steps = [
    {
      num: "01",
      title: "Choisissez votre tapis",
      desc: "Parcourez la collection et trouvez la pièce qui vous ressemble. Chaque tapis est unique.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Réservé 48h pour vous",
      desc: "Ajoutez-le au panier : il est immédiatement réservé pendant 48 heures. Personne d'autre ne peut l'acheter.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Commandez par virement",
      desc: "Validez votre commande et réglez par virement bancaire. Votre tapis est expédié depuis la Bourgogne avec soin.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="6" width="22" height="14" rx="2" />
          <path d="M1 10h22" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: "#EDE4D6" }} className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-marron text-2xl sm:text-3xl font-bold">
            Comment commander
          </h2>
          <p className="text-text-muted mt-2 text-sm">
            Un processus simple, pensé pour des pièces uniques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-beige border border-beige-dark text-terre mb-4">
                {step.icon}
              </div>
              <div className="text-xs text-laine font-medium mb-2">
                {step.num}
              </div>
              <h3 className="font-display text-marron text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
