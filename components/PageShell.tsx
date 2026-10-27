import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Eyebrow, container } from "@/components/ui";

type PageShellProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
};

// Shared layout for inner pages: navbar, page header, content, footer
export default function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />

      <header className={`${container} pt-20 pb-16 sm:pt-28 sm:pb-20`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl">
          {title}
        </h1>
        <p className="mt-8 text-lg text-body max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
}

// Second half of a headline, set in a lighter tone
export function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-muted">{children}</span>;
}
