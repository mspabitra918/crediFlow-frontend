import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Navbar";
import { container } from "@/components/ui";
import { companyContact } from "./CompanyContact";

const footerColumns = [
  {
    title: "Application",
    links: [
      { href: "/how-it-works#step-1", label: "Step 1: Loan & personal" },
      { href: "/how-it-works#step-2", label: "Step 2: Banking" },
      { href: "/how-it-works#step-3", label: "Step 3: Receive funds" },
      { href: "/rates-and-fees#calculator", label: "Payment calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/rates-and-fees", label: "Rates & fees" },
      { href: "/faq", label: "FAQ" },
      { href: "/#partner", label: "Partners" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      {
        href: "/fair-lending-statement",
        label: "Fair Lending Statement",
      },
      {
        href: "/direct-lender-disclosure",
        label: "Direct Lender Disclosure",
      },
      {
        href: "/state-licenses-and-disclosures",
        label: "State Licenses & Disclosures",
      },
      { href: "/e-sign-consent", label: "E-Sign Consent" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-wash border-t border-line text-sm">
      <div className={`${container} py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-4 text-muted leading-relaxed max-w-xs">
              Transparent personal loans with clear terms and a simple 3-step
              application.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h5 className="text-xs font-medium uppercase tracking-[0.18em] text-muted mb-4">
                {column.title}
              </h5>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h5 className="text-xs font-medium uppercase tracking-[0.18em] text-muted mb-4">
              Support
            </h5>
            <div className="space-y-3 text-body">
              <a
                href={companyContact.email.href}
                className="block text-muted transition-colors hover:text-ink"
              >
                {companyContact.email.display}
              </a>

              <p className="text-muted">{companyContact.address}</p>

              <div>
                <p className="text-sm text-muted">Toll-Free</p>
                <a
                  href={companyContact.phones.tollFree.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {companyContact.phones.tollFree.display}
                </a>
              </div>

              <div>
                <p className="text-sm text-muted">Local</p>
                <a
                  href={companyContact.phones.local.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {companyContact.phones.local.display}
                </a>
              </div>

              <p className="text-muted">Monday – Friday, 8 AM – 8 PM EST</p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col md:flex-row justify-between gap-4 text-xs text-muted">
          <p className="max-w-2xl leading-relaxed">
            All loan approvals, rates, and funding times depend on individual
            eligibility verification, bank authorization, and underwriting
            guidelines.
          </p>
          <p className="shrink-0">
            © 2026 LongLake Loans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
