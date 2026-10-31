import type { Metadata } from "next";
import React from "react";
import PageShell, { Muted } from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import { Eyebrow, TextLink, container } from "@/components/ui";
import { CompanyContactInfo, companyContact } from "@/components/CompanyContact";

export const metadata: Metadata = {
  title: "Contact Us | LongLake Loans",
  description:
    "Get in touch with the LongLake Loans support team by phone, email, or our online contact form.",
};

const hours = [
  { day: "Monday – Friday", time: "8 AM – 8 PM EST" },
  { day: "Saturday", time: "9 AM – 2 PM EST" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title={
        <>
          Get in touch. <Muted>We&apos;re here to help.</Muted>
        </>
      }
      subtitle="Questions about your application, an existing loan, or partnering with us? Reach out and a real person will get back to you."
    >
      {/* Contact Methods */}
      <section className="border-t border-line">
        <div
          className={`${container} grid grid-cols-1 md:grid-cols-3 md:divide-x divide-line`}
        >
          {[
            { title: "Phone", note: "Fastest for urgent questions" },
            { title: "Email", note: "We reply within 1 business day" },
            { title: "Office", note: "Visits by appointment only" },
          ].map((method) => (
            <div
              key={method.title}
              className="py-10 md:px-8 md:first:pl-0 border-b md:border-b-0 border-line last:border-b-0"
            >
              <Eyebrow>{method.title}</Eyebrow>
              {method.title === "Phone" ? (
                <CompanyContactInfo
                  phoneTypes={["tollFree", "local"]}
                  className="mt-4 space-y-2"
                  linkClassName="block text-lg font-medium underline-offset-4 hover:underline wrap-break-word"
                />
              ) : method.title === "Email" ? (
                <a
                  href={companyContact.email.href}
                  className="mt-4 block text-lg font-medium underline-offset-4 hover:underline wrap-break-word"
                >
                  {companyContact.email.display}
                </a>
              ) : (
                <CompanyContactInfo
                  includeAddress
                  className="mt-4 text-lg font-medium"
                  addressClassName="wrap-break-word"
                />
              )}
              <p className="mt-2 text-sm text-muted">{method.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Hours */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Send us a message.
              </h2>
              <p className="mt-4 text-sm text-body leading-relaxed">
                Fill out the form and the right member of our team will get back
                to you.
              </p>
            </div>

            <div>
              <Eyebrow>Support hours</Eyebrow>
              <dl className="mt-4 border-t border-line text-sm">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between gap-4 py-3 border-b border-line"
                  >
                    <dt className="text-body">{item.day}</dt>
                    <dd className="font-medium text-right">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="text-sm text-body">Looking for a quick answer?</p>
              <div className="mt-2">
                <TextLink href="/faq">Visit the FAQ</TextLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
