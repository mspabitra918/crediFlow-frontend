"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CtaBanner,
  Eyebrow,
  SectionHeader,
  TextLink,
  buttonPrimary,
  buttonSecondary,
  container,
  section,
} from "@/components/ui";
import {
  ShieldCheck,
  Zap,
  EyeOff,
  ArrowRight,
  Plus,
  Building2,
  Users,
  Code2,
  Lock,
  Smartphone,
  Clock,
} from "lucide-react";

export default function T() {
  // Interactive Calculator State for Hero Section
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(24);

  const steps = [
    {
      stepNumber: 1,
      title: "Loan & personal details",
      subtitle: "Tell us about yourself, your employment and income.",
      subSections: [
        { num: "1.1", name: "Tell us about yourself" },
        { num: "1.2", name: "Employment" },
        { num: "1.3", name: "Your income details" },
      ],
    },
    {
      stepNumber: 2,
      title: "Banking verification",
      subtitle: "Securely link your account for instant identity confirmation.",
      subSections: [{ num: "2.1", name: "Bank account link" }],
    },
    {
      stepNumber: 3,
      title: "Where we send funds",
      subtitle: "Choose your payout account and e-sign your agreement.",
      subSections: [{ num: "3.1", name: "Direct deposit destination" }],
    },
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Fast approval",
      desc: "Complete all three steps in under 5 minutes with real-time automated verification.",
    },
    {
      icon: Lock,
      title: "Bank-grade security",
      desc: "Your data is protected with 256-bit encryption and strict privacy controls.",
    },
    {
      icon: EyeOff,
      title: "Transparent terms",
      desc: "No hidden charges or origination fees. Your full cost is shown upfront.",
    },
    {
      icon: Smartphone,
      title: "Fully digital",
      desc: "No paperwork or branch visits. Apply from any device, anywhere.",
    },
  ];

  const partnerOptions = [
    {
      icon: Building2,
      title: "Lenders & institutions",
      desc: "Access a pipeline of pre-screened, fully verified borrowers through automated API workflows.",
    },
    {
      icon: Users,
      title: "Affiliates & marketing",
      desc: "Monetize financial traffic with our high-converting 3-step funnel and competitive commissions.",
    },
    {
      icon: Code2,
      title: "Technology & API",
      desc: "Embed our lending SDKs to offer instant loan products directly to your users.",
    },
  ];

  const faqs = [
    {
      q: "What information do I need to apply?",
      a: "Your legal name, contact info, current address, employment status, employer name, and monthly income details.",
    },
    {
      q: "How does banking verification work?",
      a: "You securely link your bank account using bank-grade encryption. This verifies your identity and income without manual paystub uploads.",
    },
    {
      q: "How fast will I receive my funds?",
      a: "Once your agreement is signed, funds are sent via direct deposit, often arriving within 24 business hours.",
    },
    {
      q: "Will checking my rate affect my credit score?",
      a: "No. Checking your rate uses a soft credit inquiry that does not impact your credit score.",
    },
  ];

  const stats = [
    { value: "$45M+", label: "Loans funded" },
    { value: "5 min", label: "Average application" },
    { value: "$0", label: "Origination fees" },
    { value: "24 hrs", label: "Typical funding time" },
  ];

  // Estimated monthly payment calculation formula
  const monthlyRate = 0.1 / 12;
  const estimatedMonthly = (
    Math.round(
      ((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1)) *
        100,
    ) / 100
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className={`${container} pt-20 pb-24 sm:pt-28`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Personal loans · $1,000 – $35,000</Eyebrow>
            <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02]">
              Personal loans.
              <br />
              <span className="text-muted">Three simple steps.</span>
            </h1>
            <p className="mt-8 text-lg text-body max-w-xl leading-relaxed">
              Clear terms, no origination fees, and direct deposit to your bank
              — often within one business day.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className={buttonPrimary}>
                Start your application{" "}
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link href="/how-it-works" className={buttonSecondary}>
                How it works
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" strokeWidth={1.5} /> 256-bit
                encryption
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" strokeWidth={1.5} /> Instant decision
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} /> Same-day funding
              </span>
            </div>
          </div>

          {/* Loan Estimator */}
          <div className="lg:col-span-5">
            <div className="border border-line p-8">
              <div className="flex items-center justify-between">
                <Eyebrow>Loan estimate</Eyebrow>
                <span className="text-xs text-muted">8.00% APR example</span>
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-body">Amount</span>
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  aria-label="Loan amount"
                  className="w-full mt-4 accent-ink cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>$1,000</span>
                  <span>$35,000</span>
                </div>
              </div>

              <div className="mt-8">
                <span className="text-sm text-body">Term (months)</span>
                <div className="mt-3 grid grid-cols-4 border border-line divide-x divide-line">
                  {[12, 24, 36, 48].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`py-2.5 text-sm transition-colors ${
                        loanTerm === term
                          ? "bg-ink text-paper"
                          : "text-body hover:bg-wash"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-line flex items-baseline justify-between">
                <span className="text-sm text-body">Estimated monthly</span>
                <span className="text-2xl font-semibold tabular-nums">
                  ${estimatedMonthly}
                  <span className="text-sm font-normal text-muted">/mo</span>
                </span>
              </div>

              <Link
                href={`/apply?amount=${loanAmount}`}
                className={`${buttonPrimary} w-full mt-6`}
              >
                Apply for ${loanAmount.toLocaleString()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-8 md:py-10 md:px-8 md:first:pl-0"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="01 — Process"
            title="Three steps, start to finish."
            text="We've streamlined the application so you know exactly what to expect at every stage."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step) => (
              <div key={step.stepNumber} className="border-t border-ink pt-6">
                <span className="text-sm text-muted tabular-nums">
                  Step 0{step.stepNumber}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {step.subtitle}
                </p>
                <ul className="mt-6 space-y-2">
                  {step.subSections.map((sub) => (
                    <li
                      key={sub.num}
                      className="flex gap-3 text-sm text-body border-b border-line pb-2"
                    >
                      <span className="text-muted tabular-nums">{sub.num}</span>
                      {sub.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <TextLink href="/how-it-works">See the full process</TextLink>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="02 — Why LongLake Loans"
            title="Lending designed around the borrower."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {whyChooseUs.map((card) => (
              <div
                key={card.title}
                className="border-r border-b border-line bg-paper p-8"
              >
                <card.icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
                <h3 className="mt-8 text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Us */}
      <section id="partner" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="03 — Partners"
            title="Grow with our lending platform."
            text="Modern API technology and verified lead channels for lenders, affiliates, and product teams."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {partnerOptions.map((item) => (
              <div key={item.title} className="flex flex-col">
                <item.icon className="w-6 h-6 text-ink" strokeWidth={1.5} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed flex-1">
                  {item.desc}
                </p>
                <div className="mt-6">
                  <TextLink href="/contact">Become a partner</TextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={section}>
        <div className={container}>
          <SectionHeader eyebrow="04 — Questions" title="Common questions." />
          <div className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group border-b border-line"
              >
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
            <div className="mt-8">
              <TextLink href="/faq">View all questions</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={section}>
        <div className={container}>
          <SectionHeader
            eyebrow="05 — About"
            title="Modernizing loan access for responsible borrowers."
            text="LongLake Loans was built to replace long lines and tedious paperwork with a clear 3-step online flow. We prioritize data security, fair terms, and rapid disbursement."
          />
          <div className="lg:ml-[33.333%] lg:pl-8">
            <TextLink href="/about">Learn more about us</TextLink>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Check your rate in 5 minutes."
        text="No impact to your credit score. No obligation to accept."
      />

      <Footer />
    </div>
  );
}
