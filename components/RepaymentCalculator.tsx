"use client";
import React, { useState } from "react";
import { Eyebrow, buttonPrimary } from "@/components/ui";

const terms = [12, 24, 36, 48, 60];

const formatMoney = (value: number) => value.toFixed(2);

export default function RepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(24);
  const [apr, setApr] = useState(8);

  // Standard amortized monthly payment formula
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalRepayable = monthlyPayment * loanTerm;
  const totalInterest = totalRepayable - loanAmount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-line">
      <div className="p-8 sm:p-10 space-y-10">
        {/* Amount Slider */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-body">Loan amount</span>
            <span className="text-2xl font-semibold tabular-nums">
              {formatMoney(loanAmount)}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="35000"
            step="500"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            aria-label="Loan amount"
            className="w-full mt-4 accent-ink cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>$1,000</span>
            <span>$35,000</span>
          </div>
        </div>

        {/* APR Slider */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-body">APR</span>
            <span className="text-2xl font-semibold tabular-nums">
              {apr.toFixed(2)}%
            </span>
          </div>
          <input
            type="range"
            min="5.99"
            max="35.99"
            step="0.5"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            aria-label="APR"
            className="w-full mt-4 accent-ink cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>5.99%</span>
            <span>35.99%</span>
          </div>
        </div>

        {/* Term Selector */}
        <div>
          <span className="text-sm text-body">Term (months)</span>
          <div className="mt-3 grid grid-cols-5 border border-line divide-x divide-line">
            {terms.map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`py-2.5 text-sm transition-colors ${
                  loanTerm === term
                    ? "bg-ink text-paper"
                    : "text-body hover:bg-wash"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-wash border-t lg:border-t-0 lg:border-l border-line p-8 sm:p-10 flex flex-col">
        <Eyebrow>Estimated monthly payment</Eyebrow>
        <div className="mt-4 text-5xl font-semibold tracking-tight tabular-nums">
          {formatMoney(monthlyPayment)}
          <span className="text-base font-normal text-muted">/mo</span>
        </div>
        <dl className="mt-10 border-t border-line text-sm flex-1">
          <div className="flex justify-between py-4 border-b border-line">
            <dt className="text-body">Amount borrowed</dt>
            <dd className="font-medium tabular-nums">
              {formatMoney(loanAmount)}
            </dd>
          </div>
          <div className="flex justify-between py-4 border-b border-line">
            <dt className="text-body">Total interest</dt>
            <dd className="font-medium tabular-nums">
              {formatMoney(totalInterest)}
            </dd>
          </div>
          <div className="flex justify-between py-4">
            <dt className="text-body">Total repayable</dt>
            <dd className="font-semibold tabular-nums">
              {formatMoney(totalRepayable)}
            </dd>
          </div>
        </dl>
        <button className={`${buttonPrimary} w-full mt-6`}>
          Check my rate
        </button>
      </div>
    </div>
  );
}
