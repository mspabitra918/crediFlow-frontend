import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | CrediFlow",
  description:
    "How CrediFlow collects, uses, shares, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument id="privacy-policy" />;
}
