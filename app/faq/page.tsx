import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import PageShell, { Muted } from "@/components/PageShell";
import { buttonPrimary, buttonSecondary, container } from "@/components/ui";
import { companyContact } from "@/components/CompanyContact";

export const metadata: Metadata = {
  title: "FAQ | LongLake Loans",
  description:
    "Answers to common questions about applying, eligibility, rates, repayment, and security at LongLake Loans.",
};

const faqCategories = [
  {
    id: "applying",
    title: "Applying",
    faqs: [
      {
        q: "What information do I need for Step 1 (Loan & Personal)?",
        a: "You will need your legal name, contact info, current address, employment status, employer name, and your monthly income details.",
      },
      {
        q: "How does Step 2 (Banking) work?",
        a: "Step 2 lets you securely verify your bank account using bank-grade encryption. This verifies your identity and speeds up income validation without manual paystub uploads.",
      },
      {
        q: "How long does the application take?",
        a: "Most people complete all three steps in about 5 minutes. You'll get a decision on screen right after you submit.",
      },
      {
        q: "Can I save my application and finish later?",
        a: "Yes. Your progress is saved automatically after each section, and we'll email you a secure link to pick up where you left off.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility & credit",
    faqs: [
      {
        q: "Who is eligible to apply?",
        a: "You must be at least 18 years old, a U.S. resident with a valid SSN, have a regular source of income, and hold an active checking account in your name.",
      },
      {
        q: "Will checking my options impact my credit score?",
        a: "No. Checking your rate uses a soft credit inquiry that does not affect your credit score. A hard inquiry only happens if you accept an offer and proceed with your loan.",
      },
      {
        q: "Can I apply with fair or limited credit?",
        a: "Yes. We look at more than just your credit score, including your income and banking history, to give a fuller picture of your ability to repay.",
      },
    ],
  },
  {
    id: "funding",
    title: "Funding & repayment",
    faqs: [
      {
        q: "How fast are funds transferred in Step 3?",
        a: "Once your details are verified and the digital loan agreement is signed, funds are sent via direct deposit to your designated account — often arriving within 24 business hours.",
      },
      {
        q: "How do repayments work?",
        a: "Repayments are fixed monthly amounts automatically debited from your linked account on your chosen due date. You'll receive a reminder before every payment.",
      },
      {
        q: "Can I pay off my loan early?",
        a: "Absolutely. There are no prepayment penalties — paying early simply reduces the total interest you pay.",
      },
      {
        q: "What happens if I miss a payment?",
        a: "Contact us as soon as possible. A late fee may apply after a 10-day grace period, but our team can often adjust your due date or set up a payment plan.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & privacy",
    faqs: [
      {
        q: "Is my personal information safe?",
        a: "Yes. All data is protected with 256-bit SSL encryption in transit and encrypted at rest. We never sell your personal information.",
      },
      {
        q: "Do you store my online banking password?",
        a: "Never. Bank verification is handled through a secure, read-only connection and your login credentials are never shared with or stored by LongLake Loans.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="FAQ"
      title={
        <>
          Questions, <Muted>answered.</Muted>
        </>
      }
      subtitle="Everything you need to know about applying, getting funded, and repaying your LongLake Loans loan."
    >
      <section className="border-t border-line py-20 sm:py-28">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
          {/* Category Nav */}
          <aside className="lg:col-span-4">
            <nav className="lg:sticky lg:top-28 flex lg:flex-col gap-x-6 gap-y-3 overflow-x-auto text-sm">
              {faqCategories.map((category, i) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="shrink-0 text-muted hover:text-ink transition-colors"
                >
                  <span className="tabular-nums mr-3">0{i + 1}</span>
                  {category.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* FAQ Lists */}
          <div className="lg:col-span-8 space-y-16">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                  {category.title}
                </h2>
                <div className="border-t border-line">
                  {category.faqs.map((faq) => (
                    <details key={faq.q} className="group border-b border-line">
                      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer py-6 flex items-center justify-between gap-6 text-base font-medium">
                        {faq.q}
                        <Plus
                          className="w-5 h-5 shrink-0 text-muted transition-transform group-open:rotate-45"
                          strokeWidth={1.5}
                        />
                      </summary>
                      <p className="pb-6 -mt-2 text-sm text-body leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            {/* Support Prompt */}
            <div className="bg-wash border border-line p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-base font-semibold">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-body">
                  Our team can guide you step by step through your application.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/contact" className={buttonSecondary}>
                  Contact us
                </Link>
                <a
                  href={companyContact.phones.tollFree.href}
                  aria-label={`Call Toll-Free ${companyContact.phones.tollFree.display}`}
                  className={buttonPrimary}
                >
                  Call {companyContact.phones.tollFree.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
