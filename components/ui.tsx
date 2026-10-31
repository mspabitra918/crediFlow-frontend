import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Shared layout and style primitives for the minimal design system
export const container = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
export const section = "py-20 sm:py-28 border-t border-line";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors";
export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 border border-ink text-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mb-14">
      <div className="lg:col-span-4 pt-2">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <div className="lg:col-span-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
          {title}
        </h2>
        {text && (
          <p className="mt-4 text-base text-body leading-relaxed max-w-2xl">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
    >
      {children}
      <ArrowRight
        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
    </Link>
  );
}

export function CtaBanner({
  title,
  text,
  buttonLabel = "Start your application",
}: {
  title: string;
  text: string;
  buttonLabel?: string;
}) {
  return (
    <section className="bg-ink text-paper">
      <div
        className={`${container} py-20 sm:py-24 flex flex-col md:flex-row md:items-end justify-between gap-8`}
      >
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            {text}
          </p>
        </div>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-6 py-3 text-sm font-medium hover:bg-neutral-200 transition-colors shrink-0"
        >
          {buttonLabel} <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
