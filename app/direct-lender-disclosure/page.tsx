import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Direct Lender Disclosure | CrediFlow",
  description:
    "CrediFlow is a direct lender: we review, fund, and service your loan ourselves.",
};

export default function DirectLenderDisclosurePage() {
  return <LegalDocument id="direct-lender-disclosure" />;
}
