"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonPrimary, container } from "@/components/ui";

export const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/rates-and-fees", label: "Rates & fees" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="w-6 h-6 bg-ink text-paper flex items-center justify-center text-xs font-bold">
        C
      </span>
      <span className="text-base font-semibold tracking-tight text-ink">
        CrediFlow
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-line">
      <div className={`${container} flex items-center justify-between h-16`}>
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors underline-offset-[22px] decoration-1 ${
                pathname === link.href
                  ? "text-ink underline"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <button className="bg-ink text-paper px-5 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors">
            Apply now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 -mr-2 text-ink"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-paper">
          <div className={`${container} py-4`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 border-b border-line text-sm ${
                  pathname === link.href ? "text-ink font-medium" : "text-body"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className={`${buttonPrimary} w-full mt-5`}>
              Apply now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
