import type { Metadata } from "next";
import React from "react";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Fair Lending Statement | LongLake Loans",
  description:
    "LongLake Loans's commitment to equal credit opportunity for every applicant.",
};

export default function FairLendingStatementPage() {
  return <LegalDocument id="fair-lending-statement" />;
}
