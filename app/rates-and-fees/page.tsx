import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import RepaymentCalculator from "@/components/RepaymentCalculator";
import { CtaBanner, SectionHeader, container, section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Rates & Fees | LongLake Loans",
  description:
    "Transparent LongLake Loans personal loan rates and fees. APRs 10%, no origination fees, and no prepayment penalties.",
};

const highlights = [
  { value: "10%", label: "APR" },
  { value: "$1K–35K", label: "Loan amounts" },
  { value: "12–60", label: "Month terms" },
  { value: "$0", label: "Origination fee" },
];

const rateTiers = [
  { tier: "Excellent", score: "720+", apr: "5.99% – 11.99%" },
  { tier: "Good", score: "680 – 719", apr: "12.00% – 18.99%" },
  { tier: "Fair", score: "620 – 679", apr: "19.00% – 27.99%" },
  { tier: "Building", score: "Below 620", apr: "28.00% – 35.99%" },
];

const fees = [
  { name: "Origination fee", amount: "$0" },
  { name: "Application fee", amount: "$0" },
  { name: "Prepayment penalty", amount: "$0" },
  { name: "Monthly maintenance fee", amount: "$0" },
  {
    name: "Late payment fee",
    amount: "$15 or 5%, whichever is less",
    note: "Only after a 10-day grace period",
  },
  {
    name: "Returned payment fee",
    amount: "$15",
    note: "If a scheduled payment is declined by your bank",
  },
];

export default function RatesAndFeesPage() {
  return (
    <PageShell
      eyebrow="Rates & fees"
      title={
        <>
          Simple rates. <Muted>Zero surprises.</Muted>
        </>
      }
      subtitle="You should know the full cost of your loan before you apply. Here's everything you'll pay — and everything you won't."
    >
      {/* Highlights */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="py-8 md:py-10 md:px-8 md:first:pl-0"
            >
              <div className="text-sm text-muted">{item.label}</div>
              <div className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rate Tiers */}
      <section className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="01 — Interest rates"
            title="Fixed for the life of your loan."
            text="Your rate is based on your credit profile, income, and loan term. It never changes after you sign."
          />
          <div className="lg:ml-[33.333%] lg:pl-8 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-ink text-xs uppercase tracking-[0.12em] text-muted">
                  <th className="py-4 pr-4 font-medium">Credit profile</th>
                  <th className="py-4 pr-4 font-medium">Typical score</th>
                  <th className="py-4 font-medium text-right">Fixed APR</th>
                </tr>
              </thead>
              <tbody>
                {rateTiers.map((row) => (
                  <tr key={row.tier} className="border-b border-line">
                    <td className="py-5 pr-4 font-medium">{row.tier}</td>
                    <td className="py-5 pr-4 text-body tabular-nums">
                      {row.score}
                    </td>
                    <td className="py-5 text-right font-medium tabular-nums">
                      {row.apr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted">
              Rate ranges are illustrative. Your actual rate is shown before you
              accept any offer.
            </p>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="02 — Fees"
            title="Most of our fees are zero."
            text="The rest only apply if a payment is missed. Every cost is listed in your loan agreement."
          />
          <dl className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {fees.map((fee) => (
              <div
                key={fee.name}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-8 py-5 border-b border-line"
              >
                <dt>
                  <span className="text-sm font-medium">{fee.name}</span>
                  {fee.note && (
                    <span className="block text-xs text-muted mt-1">
                      {fee.note}
                    </span>
                  )}
                </dt>
                <dd
                  className={`text-sm font-medium tabular-nums ${fee.amount === "$0" ? "text-accent" : ""}`}
                >
                  {fee.amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className={`${section} scroll-mt-16`}>
        <div className={container}>
          <SectionHeader
            eyebrow="03 — Calculator"
            title="Estimate your payment."
            text="Adjust the amount, rate, and term to see what your loan could cost."
          />
          <RepaymentCalculator />
          <p className="mt-8 text-xs text-muted leading-relaxed max-w-3xl">
            <span className="font-medium text-body">
              Representative example:
            </span>{" "}
            A $5,000 loan repaid over 24 months at a fixed 8.00% APR would have
            24 monthly payments of $226.14. The total amount repayable would be
            $5,427.36, including $427.36 in interest. No origination fee
            applies.
          </p>
        </div>
      </section>

      <CtaBanner
        title="See your personalized rate."
        text="Takes 5 minutes and uses a soft credit check that won't affect your score."
        buttonLabel="Check my rate"
      />
    </PageShell>
  );
}
