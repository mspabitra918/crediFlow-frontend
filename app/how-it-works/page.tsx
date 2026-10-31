import type { Metadata } from "next";
import React from "react";
import { Check } from "lucide-react";
import PageShell, { Muted } from "@/components/PageShell";
import { CtaBanner, SectionHeader, container, section } from "@/components/ui";

export const metadata: Metadata = {
  title: "How It Works | LongLake Loans",
  description:
    "Apply for a LongLake Loans personal loan in 3 simple steps: personal details, banking verification, and funds disbursement.",
};

const steps = [
  {
    stepNumber: 1,
    title: "Loan & personal details",
    duration: "About 3 minutes",
    intro:
      "Choose how much you want to borrow and for how long, then tell us a little about yourself so we can match you with the right offer.",
    points: [
      {
        name: "Tell us about yourself",
        desc: "Full legal name, date of birth, email, phone number, and current residential address.",
      },
      {
        name: "Employment",
        desc: "Employment status, job title, employer name, and how long you've been in your current role.",
      },
      {
        name: "Your income details",
        desc: "Monthly take-home pay, pay frequency, other income sources, and recurring obligations.",
      },
    ],
  },
  {
    stepNumber: 2,
    title: "Banking verification",
    duration: "About 1 minute",
    intro:
      "Securely link your primary checking account. This confirms your identity and income instantly — no paystub uploads required.",
    points: [
      {
        name: "Bank account link",
        desc: "Read-only, 256-bit encrypted connection. We never see or store your online banking password.",
      },
      {
        name: "Instant identity check",
        desc: "Your account details are matched against your application to confirm it's really you.",
      },
    ],
  },
  {
    stepNumber: 3,
    title: "Where we send funds",
    duration: "About 1 minute",
    intro:
      "Review your final offer, e-sign your loan agreement, and confirm where you'd like the money deposited.",
    points: [
      {
        name: "Direct deposit destination",
        desc: "Confirm the account that will receive your funds and your automatic repayment schedule.",
      },
      {
        name: "Sign & receive",
        desc: "Sign digitally in seconds. Funds are typically sent the same business day after approval.",
      },
    ],
  },
];

const timeline = [
  { time: "0 min", label: "Start your application" },
  { time: "5 min", label: "Receive an instant decision" },
  { time: "6 min", label: "E-sign your agreement" },
  { time: "≤ 24 hrs", label: "Funds arrive in your account" },
];

const checklist = [
  {
    title: "Valid government ID",
    desc: "Driver's license, state ID, or passport.",
  },
  {
    title: "Social Security Number",
    desc: "Used for a soft credit check that won't affect your score.",
  },
  {
    title: "Active checking account",
    desc: "In your name and able to receive direct deposits.",
  },
  {
    title: "Email & phone number",
    desc: "So we can send your offer and verification codes.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="How it works"
      title={
        <>
          From application to funds. <Muted>In three steps.</Muted>
        </>
      }
      subtitle="No branch visits, no paperwork, no surprises. Here's exactly what happens when you apply with LongLake Loans."
    >
      {/* Detailed Steps */}
      {steps.map((step) => (
        <section
          key={step.stepNumber}
          id={`step-${step.stepNumber}`}
          className={`${section} scroll-mt-16`}
        >
          <div
            className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-8`}
          >
            <div className="lg:col-span-4">
              <div className="text-7xl font-semibold tracking-tight text-line tabular-nums">
                0{step.stepNumber}
              </div>
              <p className="mt-4 text-sm text-muted">{step.duration}</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {step.title}
              </h2>
              <p className="mt-4 text-base text-body leading-relaxed max-w-2xl">
                {step.intro}
              </p>
              <dl className="mt-10 border-t border-line">
                {step.points.map((point) => (
                  <div
                    key={point.name}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8 py-5 border-b border-line"
                  >
                    <dt className="text-sm font-medium">{point.name}</dt>
                    <dd className="sm:col-span-2 text-sm text-body leading-relaxed">
                      {point.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      {/* Timeline */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="Timeline"
            title="What to expect, minute by minute."
            text="Most applicants go from start to signed agreement in under 10 minutes."
          />
          <ol className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {timeline.map((item) => (
              <li key={item.time} className="pt-6 pr-6 pb-6">
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">
                  {item.time}
                </div>
                <div className="mt-2 text-sm text-body">{item.label}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What You'll Need */}
      <section className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="Before you begin"
            title="What you'll need."
            text="Have these ready and you'll move through all three steps quickly. You must be at least 18 years old and a U.S. resident to apply."
          />
          <ul className="lg:ml-[33.333%] lg:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-line">
            {checklist.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 py-5 border-b border-line"
              >
                <Check
                  className="w-5 h-5 text-accent shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title="Ready to get started?"
        text="Checking your rate takes 5 minutes and won't affect your credit score."
      />
    </PageShell>
  );
}
