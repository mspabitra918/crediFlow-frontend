import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "E-Sign Consent | LongLake Loans",
  description:
    "Consent to receive LongLake Loans loan documents and sign your agreement electronically.",
};

export default function ESignConsentPage() {
  return <LegalDocument id="e-sign-consent" />;
}
