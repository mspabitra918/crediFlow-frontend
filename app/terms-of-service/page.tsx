import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service | LongLake Loans",
  description:
    "The terms that govern your use of LongLake Loans and your loan application.",
};

export default function TermsOfServicePage() {
  return <LegalDocument id="terms-of-service" />;
}
