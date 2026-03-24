import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-marron text-beige-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Les Tapis Boules du Charollais"
                width={56}
                height={56}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-sm text-beige-dark leading-relaxed">
              Laine cardée feutrée 100% Bourgogne.
              <br />
              Pièces uniques, faites à la main.
            </p>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-display text-beige text-sm font-semibold mb-4">
              Boutique
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collection/naturelle" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Collection naturelle
                </Link>
              </li>
              <li>
                <Link href="/collection/teintee" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Collection teintée
                </Link>
              </li>
              <li>
                <Link href="/collection/accessoires" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link href="/panier" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Mon panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h4 className="font-display text-beige text-sm font-semibold mb-4">
              Informations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/savoir-faire" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Savoir-faire
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-sm text-beige-dark hover:text-beige transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-beige text-sm font-semibold mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-beige-dark">
              <li>Madeleine Benifei</li>
              <li>Rigny-sur-Arroux, 71160</li>
              <li>
                <a href="mailto:madeleinebenifei@gmail.com" className="hover:text-beige transition-colors">
                  madeleinebenifei@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33623016722" className="hover:text-beige transition-colors">
                  06 23 01 67 22
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur + crédits */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-beige-dark/60">
            &copy; {new Date().getFullYear()} Les Tapis Boules du Charollais.
            Tous droits réservés.
          </p>
          <p className="text-xs text-beige-dark/40">
            Site réalisé par{" "}
            <a
              href="https://sparkana.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-beige-dark/60 transition-colors"
            >
              Sparkana
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
