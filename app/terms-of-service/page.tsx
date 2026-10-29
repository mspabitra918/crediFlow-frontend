import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service | CrediFlow",
  description:
    "The terms that govern your use of CrediFlow and your loan application.",
};

export default function TermsOfServicePage() {
  return <LegalDocument id="terms-of-service" />;
}
