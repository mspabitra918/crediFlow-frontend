import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { agreements } from "@/components/agreements";
import { CtaBanner, Eyebrow, container, section } from "@/components/ui";

export const lastUpdated = "October 1, 2026";

export function getAgreement(id: string) {
  const doc = agreements.find((item) => item.id === id);
  if (!doc) notFound();
  return doc;
}

// Shared layout for standalone legal document pages
export default function LegalDocument({ id }: { id: string }) {
  const doc = getAgreement(id);
  const related = agreements.filter((item) => item.id !== id);

  return (
    <PageShell eyebrow="Legal" title={doc.title} subtitle={doc.summary}>
      <section className={section}>
        <div
          className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8`}
        >
          {/* Table of contents */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Eyebrow>Contents</Eyebrow>
              <ol className="mt-4 border-t border-line">
                {doc.sections.map((part, idx) => (
                  <li key={part.heading} className="border-b border-line">
                    <a
                      href={`#section-${idx + 1}`}
                      className="flex gap-3 py-3 text-sm text-body hover:text-ink transition-colors"
                    >
                      <span className="text-muted tabular-nums">
                        0{idx + 1}
                      </span>
                      {part.heading}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-muted">
                Last updated {lastUpdated}
              </p>
            </div>
          </aside>

          {/* Document body */}
          <article className="lg:col-span-8">
            {doc.sections.map((part, idx) => (
              <div
                key={part.heading}
                id={`section-${idx + 1}`}
                className="scroll-mt-24 border-t border-ink pt-6 pb-12"
              >
                <span className="text-sm text-muted tabular-nums">
                  Section 0{idx + 1}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {part.heading}
                </h2>
                <p className="mt-4 text-base text-body leading-relaxed max-w-2xl">
                  {part.body}
                </p>
              </div>
            ))}

            <div className="border-t border-line pt-8 text-sm text-body leading-relaxed max-w-2xl">
              Questions about this document? Email{" "}
              <a
                href="mailto:support@crediflow.com"
                className="text-ink underline underline-offset-4"
              >
                support@crediflow.com
              </a>{" "}
              or call +1 (800) 555-CREDI.
            </div>
          </article>
        </div>
      </section>

      {/* Related documents */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <Eyebrow>Related documents</Eyebrow>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className="border-r border-b border-line bg-paper p-8 hover:bg-wash transition-colors"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Check your rate in 5 minutes."
        text="No impact to your credit score. No obligation to accept."
      />
    </PageShell>
  );
}
