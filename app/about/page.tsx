import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import {
  CtaBanner,
  SectionHeader,
  container,
  section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us | CrediFlow",
  description:
    "Learn about CrediFlow's mission to make personal lending fast, fair, and transparent for responsible borrowers.",
};

const stats = [
  { value: "$45M+", label: "Loans funded" },
  { value: "28K+", label: "Borrowers served" },
  { value: "5 min", label: "Average application" },
  { value: "4.8/5", label: "Customer rating" },
];

const values = [
  {
    title: "Fairness",
    desc: "Clear terms and honest pricing. We show you the full cost of your loan before you sign anything.",
  },
  {
    title: "Security",
    desc: "Bank-grade 256-bit encryption and strict data controls protect every application end-to-end.",
  },
  {
    title: "Simplicity",
    desc: "Three steps, one screen at a time. We removed every form field that didn't need to be there.",
  },
  {
    title: "Responsibility",
    desc: "We only lend what we believe you can comfortably repay, and we're here to help if things change.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "CrediFlow founded",
    desc: "Started by a small team of fintech engineers and lending veterans frustrated by slow, paper-heavy loan processes.",
  },
  {
    year: "2022",
    title: "3-step application launched",
    desc: "Rebuilt the entire application into three simple steps with instant bank verification.",
  },
  {
    year: "2024",
    title: "$20M in loans funded",
    desc: "Expanded our lending partner network and introduced same-day direct deposit.",
  },
  {
    year: "2026",
    title: "$45M+ and growing",
    desc: "Serving tens of thousands of borrowers with an average application time of just 5 minutes.",
  },
];

const team = [
  { name: "Alex Morgan", role: "Co-Founder & CEO", initials: "AM" },
  { name: "Priya Shah", role: "Co-Founder & CTO", initials: "PS" },
  { name: "Daniel Reyes", role: "Head of Lending", initials: "DR" },
  { name: "Chloe Bennett", role: "Head of Customer Care", initials: "CB" },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About CrediFlow"
      title={
        <>
          Modern lending. <Muted>Built for responsible borrowers.</Muted>
        </>
      }
      subtitle="We replaced long lines and tedious paperwork with a clear, secure 3-step online flow — so you can get the money you need without the hassle."
    >
      {/* Stats */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-0 md:divide-x divide-line`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="py-8 md:py-10 md:px-8 md:first:pl-0">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="01 — Purpose" title="Why we exist." />
          <div className="lg:ml-[33.333%] lg:pl-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-t border-ink pt-6">
              <h3 className="text-lg font-semibold">Our mission</h3>
              <p className="mt-3 text-sm text-body leading-relaxed">
                To give everyday people fast, fair access to credit through
                technology that is transparent by design. No hidden fees, no
                confusing fine print, and no waiting weeks for an answer.
              </p>
            </div>
            <div className="border-t border-ink pt-6">
              <h3 className="text-lg font-semibold">Our vision</h3>
              <p className="mt-3 text-sm text-body leading-relaxed">
                A world where borrowing is simple and trustworthy — where every
                borrower understands exactly what they&apos;re agreeing to and
                feels in control of their finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${section} bg-wash`}>
        <div className={container}>
          <SectionHeader
            eyebrow="02 — Values"
            title="What we stand for."
            text="Four principles guide every product decision we make."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="border-r border-b border-line bg-paper p-8"
              >
                <span className="text-sm text-muted tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-base font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="03 — History" title="Our story." />
          <ol className="lg:ml-[33.333%] lg:pl-8 border-t border-line">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-8 py-6 border-b border-line"
              >
                <span className="text-sm text-muted tabular-nums">
                  {milestone.year}
                </span>
                <div className="sm:col-span-3">
                  <h3 className="text-base font-semibold">{milestone.title}</h3>
                  <p className="mt-1 text-sm text-body leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className={section}>
        <div className={container}>
          <SectionHeader eyebrow="04 — Leadership" title="The team." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                <div className="aspect-square bg-wash border border-line flex items-center justify-center text-3xl font-semibold text-muted">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-sm font-semibold">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Join thousands of borrowers."
        text="See what you qualify for in minutes — with no impact to your credit score."
      />
    </PageShell>
  );
}
