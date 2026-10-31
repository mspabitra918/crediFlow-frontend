import type { Metadata } from "next";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/apply/ApplicationForm";
import { MAX_AMOUNT, MIN_AMOUNT } from "@/components/apply/types";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apply | LongLake Loans",
  description:
    "Apply for a LongLake Loans personal loan from $1,000 to $35,000 in about five minutes. Checking your rate won't affect your credit score.",
};

// Accepts ?amount= from the loan estimator, snapped to the slider's $500 steps
function parseAmount(raw: string | string[] | undefined) {
  const value = Number(Array.isArray(raw) ? raw[0] : raw);
  if (!Number.isFinite(value) || value <= 0) return 5000;
  const snapped = Math.round(value / 500) * 500;
  return Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, snapped));
}

export default function ApplyPage({ searchParams }: PageProps<"/apply">) {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />
      <main className={`${container} py-12 sm:py-20`}>
        <Suspense
          fallback={<div className="min-h-[720px] border border-line" />}
        >
          {searchParams.then(({ amount }) => (
            <ApplicationForm initialAmount={parseAmount(amount)} />
          ))}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
