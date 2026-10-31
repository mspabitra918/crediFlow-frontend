import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "State Licenses & Disclosures | LongLake Loans",
  description:
    "Where LongLake Loans is licensed to lend and the disclosures required in your state.",
};

export default function StateLicensesPage() {
  return <LegalDocument id="state-licenses-and-disclosures" />;
}
