"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { item } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-beige/95 backdrop-blur-sm border-b border-beige-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Liens gauche */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/collection/naturelle"
              className="text-sm text-text-muted hover:text-terre transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/savoir-faire"
              className="text-sm text-text-muted hover:text-terre transition-colors"
            >
              Savoir-faire
            </Link>
            <Link
              href="/blog"
              className="text-sm text-text-muted hover:text-terre transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Logo centré */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 shrink-0">
            <Image
              src="/logo.png"
              alt="Les Tapis Boules du Charollais"
              width={64}
              height={64}
              className="object-contain"
            />
          </Link>

          {/* Liens droite + CTA + panier */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/a-propos"
              className="text-sm text-text-muted hover:text-terre transition-colors"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-terre transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/panier"
              className="relative p-2 text-text-muted hover:text-terre transition-colors"
              aria-label="Panier"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {item && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
            <Link
              href="/collection/naturelle"
              className="inline-flex items-center px-4 py-2 bg-terre text-white text-sm font-medium rounded-lg hover:bg-terre-light transition-colors"
            >
              Voir les tapis
            </Link>
          </div>

          {/* Mobile: panier + hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <Link
              href="/panier"
              className="relative p-2 text-text-muted hover:text-terre transition-colors"
              aria-label="Panier"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {item && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-text-muted"
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile ouvert */}
      {open && (
        <div className="md:hidden border-t border-beige-dark bg-beige">
          <div className="px-4 py-4 space-y-3">
            <Link href="/collection/naturelle" className="block text-sm text-text-muted hover:text-terre" onClick={() => setOpen(false)}>
              Collection naturelle
            </Link>
            <Link href="/savoir-faire" className="block text-sm text-text-muted hover:text-terre" onClick={() => setOpen(false)}>
              Savoir-faire
            </Link>
            <Link href="/blog" className="block text-sm text-text-muted hover:text-terre" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/a-propos" className="block text-sm text-text-muted hover:text-terre" onClick={() => setOpen(false)}>
              À propos
            </Link>
            <Link href="/contact" className="block text-sm text-text-muted hover:text-terre" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/collection/naturelle" className="block w-full text-center px-4 py-2 bg-terre text-white text-sm font-medium rounded-lg" onClick={() => setOpen(false)}>
              Voir les tapis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
