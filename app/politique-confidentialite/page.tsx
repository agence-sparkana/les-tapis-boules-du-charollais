import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-marron text-3xl font-bold mb-8">
        Politique de confidentialité
      </h1>
      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Responsable du traitement
          </h2>
          <p>
            Madeleine Benifei — Rigny-sur-Arroux, 71160, France
            <br />
            Email :{" "}
            <a href="mailto:madeleinebenifei@gmail.com" className="text-terre hover:text-terre-light">
              madeleinebenifei@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Données collectées
          </h2>
          <p>
            Lors d&apos;une commande ou d&apos;une prise de contact, nous pouvons
            collecter les informations suivantes :
          </p>
          <ul className="list-disc ml-4 mt-2 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Adresse postale de livraison</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Finalités du traitement
          </h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc ml-4 mt-2 space-y-1">
            <li>Le traitement et le suivi de votre commande</li>
            <li>L&apos;envoi d&apos;emails de confirmation de commande</li>
            <li>La communication des coordonnées bancaires pour le virement</li>
            <li>La réponse à vos demandes via le formulaire de contact</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Base légale
          </h2>
          <p>
            Le traitement de vos données repose sur l&apos;exécution d&apos;un
            contrat (commande) et votre consentement (formulaire de contact),
            conformément au RGPD (Règlement UE 2016/679).
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Durée de conservation
          </h2>
          <p>
            Les données de commande sont conservées pendant la durée nécessaire
            à l&apos;exécution de la commande, puis archivées conformément aux
            obligations légales (5 ans pour les données de facturation). Les
            données de contact sont supprimées dans un délai de 3 ans après le
            dernier échange.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, de suppression, de portabilité et d&apos;opposition
            sur vos données personnelles. Pour exercer ces droits, contactez-nous
            à{" "}
            <a href="mailto:madeleinebenifei@gmail.com" className="text-terre hover:text-terre-light">
              madeleinebenifei@gmail.com
            </a>
            .
          </p>
          <p className="mt-2">
            Vous pouvez également introduire une réclamation auprès de la CNIL
            (Commission Nationale de l&apos;Informatique et des Libertés) —{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-terre hover:text-terre-light">
              cnil.fr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Cookies
          </h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires au bon
            fonctionnement (panier, session). Aucun cookie publicitaire ou de
            traçage tiers n&apos;est utilisé.
          </p>
        </section>

        <section>
          <h2 className="font-display text-marron text-lg font-semibold mb-2">
            Sous-traitants
          </h2>
          <ul className="list-disc ml-4 mt-2 space-y-1">
            <li>Vercel Inc. — hébergement du site</li>
            <li>Resend — envoi d&apos;emails transactionnels</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
