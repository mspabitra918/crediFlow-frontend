"use client";
import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Muted } from "@/components/PageShell";
import { Eyebrow, buttonPrimary, buttonSecondary } from "@/components/ui";
import {
  Checkbox,
  ChoiceGroup,
  Field,
  FormSection,
  PasswordInput,
  Select,
  TextInput,
} from "@/components/apply/fields";
import {
  accountAges,
  accountTypes,
  amountPresets,
  balanceBands,
  defaultIncomeSource,
  employedStatuses,
  employmentStatuses,
  housingStatuses,
  incomeSources,
  labelFor,
  loanPurposes,
  months,
  payFrequencies,
  usStates,
  yearsAtAddressOptions,
} from "@/components/apply/options";
import {
  MAX_AMOUNT,
  MIN_AMOUNT,
  createInitialFormData,
  type ApplicationFormData,
} from "@/components/apply/types";
import {
  digitsOnly,
  formatMoney,
  formatPhone,
  formatSsn,
  validators,
  type Errors,
  type StepId,
} from "@/components/apply/validation";
import { useSearchParams } from "next/navigation";

const steps: { id: StepId; title: string; description: string }[] = [
  {
    id: "loan",
    title: "Your loan",
    description: "How much you need and what it's for.",
  },
  {
    id: "personal",
    title: "About you",
    description: "Your identity, contact details and address.",
  },
  {
    id: "employment",
    title: "Employment & income",
    description: "Where your income comes from and when you're paid.",
  },
  {
    id: "banking",
    title: "Banking",
    description: "The account we verify and deposit your funds into.",
  },
  {
    id: "review",
    title: "Review & submit",
    description: "Check your details and give your consent.",
  },
];

type Update = <S extends keyof ApplicationFormData>(
  section: S,
  patch: Partial<ApplicationFormData[S]>,
) => void;

type StepProps = {
  data: ApplicationFormData;
  update: Update;
  errors: Errors;
};

const numberValue = (n: number) => (Number.isNaN(n) ? "" : String(n));

// Placeholder until the backend issues real application IDs
const createReference = () =>
  `CF-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export default function ApplicationForm({
  initialAmount,
}: {
  initialAmount: number;
}) {
  const [data, setData] = useState(() => createInitialFormData(initialAmount));
  const [errors, setErrors] = useState<Errors>({});
  const [current, setCurrent] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const step = steps[current];
  const isLast = current === steps.length - 1;

  const update: Update = (section, patch) => {
    setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch)) {
        delete next[`${section}.${key}`];
        if (key.startsWith("dob")) delete next["personal.dob"];
      }
      return next;
    });
  };

  // Moving forward requires the current step to be valid
  const goTo = (index: number) => {
    if (index > current) {
      const stepErrors = validators[step.id](data);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    setErrors({});
    setCurrent(index);
    setFurthest((f) => Math.max(f, index));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = validators[step.id](data);
    if (Object.keys(stepErrors).length > 0) {
      // Render errors synchronously so the first invalid field can be focused
      flushSync(() => setErrors(stepErrors));
      const first = e.currentTarget.querySelector("[aria-invalid='true']");
      (first as HTMLElement | null)?.focus();
      return;
    }
    if (!isLast) {
      goTo(current + 1);
      return;
    }
    // Earlier steps may have been edited since they were last validated
    const invalidIndex = steps.findIndex(
      (s) => Object.keys(validators[s.id](data)).length > 0,
    );
    if (invalidIndex !== -1) {
      setCurrent(invalidIndex);
      setErrors(validators[steps[invalidIndex].id](data));
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // TODO: send the application to the backend once the API is available
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setReference(createReference());
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const amountParam = searchParams.get("amount");

    if (amountParam !== null) {
      const amount = Number(amountParam);

      if (
        Number.isFinite(amount) &&
        amount >= MIN_AMOUNT &&
        amount <= MAX_AMOUNT
      ) {
        update("loan", { amount });
      }
    }
  }, [searchParams]);

  if (reference) {
    return (
      <div
        ref={topRef}
        className="max-w-2xl mx-auto border border-line p-10 sm:p-14"
      >
        <Check className="w-10 h-10 text-accent" strokeWidth={1.5} />
        <h2 className="mt-8 text-3xl sm:text-4xl font-semibold tracking-tight">
          Application received.
        </h2>
        <p className="mt-4 text-base text-body leading-relaxed">
          Thanks, {data.personal.firstName}. We&apos;re reviewing your request
          for {formatMoney(data.loan.amount)} and will email{" "}
          <span className="text-ink font-medium">{data.personal.email}</span>{" "}
          with a decision shortly.
        </p>
        <dl className="mt-10 border-t border-line text-sm">
          {[
            ["Reference number", reference],
            ["Requested amount", formatMoney(data.loan.amount)],
            [
              "Deposit account",
              `${labelFor(accountTypes, data.banking.accountType)} •••• ${data.banking.accountNumber.slice(-4)}`,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 py-3 border-b border-line"
            >
              <dt className="text-body">{label}</dt>
              <dd className="font-medium tabular-nums text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link href="/" className={buttonPrimary}>
            Back to home
          </Link>
          <Link href="/faq" className={buttonSecondary}>
            What happens next
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / steps.length) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Sidebar */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>Application</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Apply in minutes. <Muted>No surprises.</Muted>
          </h1>
          <p className="mt-5 text-sm text-body leading-relaxed">
            Checking your rate uses a soft inquiry and won&apos;t affect your
            credit score.
          </p>

          <ol className="hidden lg:block mt-10 border-t border-line">
            {steps.map((s, i) => {
              const done = i !== current && i < furthest;
              const reachable = i <= furthest;
              return (
                <li key={s.id} className="border-b border-line">
                  <button
                    type="button"
                    disabled={!reachable || i === current}
                    onClick={() => goTo(i)}
                    className={`w-full flex items-center gap-4 py-4 text-left text-sm transition-colors ${
                      i === current
                        ? "text-ink font-medium"
                        : reachable
                          ? "text-body hover:text-ink"
                          : "text-muted"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 shrink-0 flex items-center justify-center border text-xs tabular-nums ${
                        i === current
                          ? "bg-ink border-ink text-paper"
                          : done
                            ? "border-ink text-ink"
                            : "border-line text-muted"
                      }`}
                    >
                      {done ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={2} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block mt-8 bg-wash p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-body">Requested</span>
              <span className="text-2xl font-semibold tracking-tight tabular-nums">
                {formatMoney(data.loan.amount)}
              </span>
            </div>
            {data.loan.purpose && (
              <p className="mt-2 text-xs text-muted text-right">
                {data.loan.purpose === "other" && data.loan.otherPurpose
                  ? data.loan.otherPurpose
                  : labelFor(loanPurposes, data.loan.purpose)}
              </p>
            )}
          </div>

          <ul className="hidden lg:block mt-8 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2.5">
              <Lock className="w-4 h-4" strokeWidth={1.5} /> 256-bit encryption
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4" strokeWidth={1.5} /> No impact to
              your credit score
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4" strokeWidth={1.5} /> About 5 minutes
            </li>
          </ul>
        </div>
      </aside>

      {/* Form */}
      <div ref={topRef} className="lg:col-span-8 scroll-mt-24">
        <form onSubmit={handleSubmit} noValidate className="border border-line">
          <header className="px-6 sm:px-10 pt-8 pb-7 border-b border-line">
            <div className="flex items-center justify-between text-xs text-muted tabular-nums">
              <span>
                Step {String(current + 1).padStart(2, "0")} of{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-px bg-line">
              <div
                className="h-px bg-ink transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <h2 className="mt-7 text-2xl sm:text-3xl font-semibold tracking-tight">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-body">{step.description}</p>
          </header>

          <div
            key={step.id}
            className="px-6 sm:px-10 py-10 animate-[fadeIn_0.3s_ease-out]"
          >
            {step.id === "loan" && (
              <LoanStep data={data} update={update} errors={errors} />
            )}
            {step.id === "personal" && (
              <PersonalStep data={data} update={update} errors={errors} />
            )}
            {step.id === "employment" && (
              <EmploymentStep data={data} update={update} errors={errors} />
            )}
            {step.id === "banking" && (
              <BankingStep data={data} update={update} errors={errors} />
            )}
            {step.id === "review" && (
              <ReviewStep
                data={data}
                update={update}
                errors={errors}
                onEdit={goTo}
              />
            )}
          </div>

          <footer className="px-6 sm:px-10 py-6 border-t border-line bg-wash flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            {current > 0 ? (
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-medium text-body hover:text-ink transition-colors"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
              </button>
            ) : (
              <p className="text-xs text-muted">
                Fields are required unless marked optional.
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className={`${buttonPrimary} disabled:opacity-60 disabled:cursor-wait`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                  Submitting
                </>
              ) : isLast ? (
                <>
                  Submit application{" "}
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

function LoanStep({ data, update, errors }: StepProps) {
  const { loan } = data;
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm text-body">Loan amount</span>
          <span className="text-5xl sm:text-6xl font-semibold tracking-tight tabular-nums">
            {formatMoney(loan.amount)}
          </span>
        </div>
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={500}
          value={loan.amount}
          onChange={(e) => update("loan", { amount: Number(e.target.value) })}
          aria-label="Loan amount"
          className="w-full mt-6 accent-ink cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>{formatMoney(MIN_AMOUNT)}</span>
          <span>{formatMoney(MAX_AMOUNT)}</span>
        </div>
        <div className="mt-6 grid grid-cols-4 border border-line divide-x divide-line">
          {amountPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => update("loan", { amount: preset })}
              className={`py-2.5 text-sm tabular-nums transition-colors ${
                loan.amount === preset
                  ? "bg-ink text-paper"
                  : "text-body hover:bg-wash"
              }`}
            >
              {formatMoney(preset)}
            </button>
          ))}
        </div>
        {errors["loan.amount"] && (
          <p className="mt-1.5 text-xs text-red-600">{errors["loan.amount"]}</p>
        )}
      </div>

      <Field
        as="fieldset"
        label="What's the loan for?"
        error={errors["loan.purpose"]}
      >
        <ChoiceGroup
          options={loanPurposes}
          value={loan.purpose}
          onChange={(purpose) => update("loan", { purpose })}
          error={errors["loan.purpose"]}
        />
      </Field>

      {loan.purpose === "other" && (
        <Field label="Tell us more" error={errors["loan.otherPurpose"]}>
          <TextInput
            value={loan.otherPurpose}
            onChange={(e) => update("loan", { otherPurpose: e.target.value })}
            placeholder="e.g. Wedding expenses"
            maxLength={80}
            error={errors["loan.otherPurpose"]}
            autoFocus
          />
        </Field>
      )}
    </div>
  );
}

function PersonalStep({ data, update, errors }: StepProps) {
  const p = data.personal;
  const set = (patch: Partial<ApplicationFormData["personal"]>) =>
    update("personal", patch);
  return (
    <div className="divide-y divide-line [&>section]:pb-10 [&>section:last-child]:pb-0">
      <FormSection
        title="Basic information"
        text="Use your legal name as it appears on your ID."
      >
        <Field
          label="First name"
          error={errors["personal.firstName"]}
          className="sm:col-span-3"
        >
          <TextInput
            value={p.firstName}
            onChange={(e) => set({ firstName: e.target.value })}
            autoComplete="given-name"
            placeholder="Jane"
            error={errors["personal.firstName"]}
          />
        </Field>
        <Field
          label="Last name"
          error={errors["personal.lastName"]}
          className="sm:col-span-3"
        >
          <TextInput
            value={p.lastName}
            onChange={(e) => set({ lastName: e.target.value })}
            autoComplete="family-name"
            placeholder="Doe"
            error={errors["personal.lastName"]}
          />
        </Field>
        <Field
          label="Email address"
          error={errors["personal.email"]}
          className="sm:col-span-3"
        >
          <TextInput
            type="email"
            value={p.email}
            onChange={(e) => set({ email: e.target.value })}
            autoComplete="email"
            placeholder="jane@example.com"
            error={errors["personal.email"]}
          />
        </Field>
        <Field
          label="Mobile phone"
          error={errors["personal.phone"]}
          className="sm:col-span-3"
        >
          <TextInput
            type="tel"
            inputMode="numeric"
            value={formatPhone(p.phone)}
            onChange={(e) => set({ phone: digitsOnly(e.target.value, 10) })}
            autoComplete="tel-national"
            placeholder="(555) 123-4567"
            error={errors["personal.phone"]}
          />
        </Field>
      </FormSection>

      <FormSection
        title="Identity"
        text="Used to verify your identity. Encrypted in transit and at rest."
      >
        <Field
          as="fieldset"
          label="Date of birth"
          error={errors["personal.dob"]}
          className="sm:col-span-6"
        >
          <div className="grid grid-cols-[2fr_1fr_1.2fr] gap-3">
            <Select
              aria-label="Birth month"
              options={months}
              placeholder="Month"
              value={p.dobMonth}
              onChange={(e) => set({ dobMonth: e.target.value })}
              autoComplete="bday-month"
              error={errors["personal.dob"]}
            />
            <TextInput
              aria-label="Birth day"
              inputMode="numeric"
              placeholder="DD"
              value={p.dobDay}
              onChange={(e) => set({ dobDay: digitsOnly(e.target.value, 2) })}
              autoComplete="bday-day"
              error={errors["personal.dob"]}
            />
            <TextInput
              aria-label="Birth year"
              inputMode="numeric"
              placeholder="YYYY"
              value={p.dobYear}
              onChange={(e) => set({ dobYear: digitsOnly(e.target.value, 4) })}
              autoComplete="bday-year"
              error={errors["personal.dob"]}
            />
          </div>
        </Field>
        <Field
          label="Social Security number"
          error={errors["personal.ssn"]}
          hint="Used for a soft credit check only."
          className="sm:col-span-2"
        >
          <TextInput
            inputMode="numeric"
            value={formatSsn(p.ssn)}
            onChange={(e) => set({ ssn: digitsOnly(e.target.value, 9) })}
            placeholder="123-45-6789"
            autoComplete="off"
            error={errors["personal.ssn"]}
          />
        </Field>
        <Field
          label="Driver's license / state ID"
          error={errors["personal.dlNumber"]}
          className="sm:col-span-2"
        >
          <TextInput
            value={p.dlNumber}
            onChange={(e) =>
              set({ dlNumber: e.target.value.toUpperCase().slice(0, 20) })
            }
            placeholder="ID number"
            autoComplete="off"
            error={errors["personal.dlNumber"]}
          />
        </Field>
        <Field
          label="Issuing state"
          error={errors["personal.dlState"]}
          className="sm:col-span-2"
        >
          <Select
            options={usStates}
            value={p.dlState}
            onChange={(e) => set({ dlState: e.target.value })}
            error={errors["personal.dlState"]}
          />
        </Field>
      </FormSection>

      <FormSection title="Home address">
        <Field
          label="Street address"
          error={errors["personal.streetAddress"]}
          className="sm:col-span-4"
        >
          <TextInput
            value={p.streetAddress}
            onChange={(e) => set({ streetAddress: e.target.value })}
            autoComplete="address-line1"
            placeholder="100 Market Street"
            error={errors["personal.streetAddress"]}
          />
        </Field>
        <Field label="Apt / unit" optional className="sm:col-span-2">
          <TextInput
            value={p.addressLine2}
            onChange={(e) => set({ addressLine2: e.target.value })}
            autoComplete="address-line2"
            placeholder="Suite 400"
          />
        </Field>
        <Field
          label="City"
          error={errors["personal.city"]}
          className="sm:col-span-3"
        >
          <TextInput
            value={p.city}
            onChange={(e) => set({ city: e.target.value })}
            autoComplete="address-level2"
            error={errors["personal.city"]}
          />
        </Field>
        <Field
          label="State"
          error={errors["personal.state"]}
          className="sm:col-span-2"
        >
          <Select
            options={usStates}
            value={p.state}
            onChange={(e) => set({ state: e.target.value })}
            autoComplete="address-level1"
            error={errors["personal.state"]}
          />
        </Field>
        <Field
          label="ZIP"
          error={errors["personal.zip"]}
          className="sm:col-span-1"
        >
          <TextInput
            inputMode="numeric"
            value={p.zip}
            onChange={(e) => set({ zip: digitsOnly(e.target.value, 5) })}
            autoComplete="postal-code"
            placeholder="94105"
            error={errors["personal.zip"]}
          />
        </Field>
        <Field
          label="Time at this address"
          error={errors["personal.yearsAtAddress"]}
          className="sm:col-span-3"
        >
          <Select
            options={yearsAtAddressOptions}
            value={numberValue(p.yearsAtAddress)}
            onChange={(e) => set({ yearsAtAddress: Number(e.target.value) })}
            error={errors["personal.yearsAtAddress"]}
          />
        </Field>
        <Field
          label="Monthly rent / mortgage"
          error={errors["personal.monthlyHousingCost"]}
          className="sm:col-span-3"
        >
          <TextInput
            inputMode="numeric"
            leading="$"
            value={numberValue(p.monthlyHousingCost)}
            onChange={(e) => {
              const v = digitsOnly(e.target.value, 6);
              set({ monthlyHousingCost: v === "" ? Number.NaN : Number(v) });
            }}
            placeholder="1,500"
            error={errors["personal.monthlyHousingCost"]}
          />
        </Field>
        <Field
          as="fieldset"
          label="Housing status"
          error={errors["personal.housingStatus"]}
          className="sm:col-span-6"
        >
          <ChoiceGroup
            columns="grid-cols-2 sm:grid-cols-4"
            options={housingStatuses}
            value={p.housingStatus}
            onChange={(housingStatus) => set({ housingStatus })}
            error={errors["personal.housingStatus"]}
          />
        </Field>
      </FormSection>
    </div>
  );
}

function EmploymentStep({ data, update, errors }: StepProps) {
  const em = data.employment;
  const set = (patch: Partial<ApplicationFormData["employment"]>) =>
    update("employment", patch);
  const employed = employedStatuses.includes(em.employmentStatus);
  const selfEmployed = em.employmentStatus === "self_employed";

  return (
    <div className="divide-y divide-line [&>section]:pb-10 [&>section:last-child]:pb-0">
      <FormSection title="Employment status">
        <Field
          as="fieldset"
          label="Which best describes you?"
          error={errors["employment.employmentStatus"]}
          className="sm:col-span-6"
        >
          <ChoiceGroup
            options={employmentStatuses}
            value={em.employmentStatus}
            onChange={(employmentStatus) =>
              set({
                employmentStatus,
                incomeSource:
                  em.incomeSource ||
                  defaultIncomeSource[employmentStatus] ||
                  "",
              })
            }
            error={errors["employment.employmentStatus"]}
          />
        </Field>

        {employed && (
          <>
            <Field
              label={selfEmployed ? "Business name" : "Employer name"}
              error={errors["employment.employerName"]}
              className="sm:col-span-3"
            >
              <TextInput
                value={em.employerName}
                onChange={(e) => set({ employerName: e.target.value })}
                autoComplete="organization"
                error={errors["employment.employerName"]}
              />
            </Field>
            <Field
              label="Job title"
              error={errors["employment.jobTitle"]}
              className="sm:col-span-3"
            >
              <TextInput
                value={em.jobTitle}
                onChange={(e) => set({ jobTitle: e.target.value })}
                autoComplete="organization-title"
                error={errors["employment.jobTitle"]}
              />
            </Field>
            <Field
              label="Time in this role"
              error={errors["employment.employmentLengthMo"]}
              className="sm:col-span-3"
            >
              <TextInput
                inputMode="numeric"
                trailing="months"
                value={numberValue(em.employmentLengthMo)}
                onChange={(e) => {
                  const v = digitsOnly(e.target.value, 3);
                  set({
                    employmentLengthMo: v === "" ? Number.NaN : Number(v),
                  });
                }}
                placeholder="24"
                error={errors["employment.employmentLengthMo"]}
              />
            </Field>
            <Field
              label={selfEmployed ? "Business phone" : "Employer phone"}
              optional={selfEmployed}
              error={errors["employment.employerPhone"]}
              className="sm:col-span-3"
            >
              <TextInput
                type="tel"
                inputMode="numeric"
                value={formatPhone(em.employerPhone)}
                onChange={(e) =>
                  set({ employerPhone: digitsOnly(e.target.value, 10) })
                }
                placeholder="(555) 123-4567"
                error={errors["employment.employerPhone"]}
              />
            </Field>
          </>
        )}
      </FormSection>

      <FormSection
        title="Income"
        text="Your take-home pay after taxes and deductions."
      >
        <Field
          label="Net monthly income"
          error={errors["employment.netMonthlyIncome"]}
          className="sm:col-span-3"
        >
          <TextInput
            inputMode="numeric"
            leading="$"
            value={em.netMonthlyIncome}
            onChange={(e) =>
              set({ netMonthlyIncome: digitsOnly(e.target.value, 7) })
            }
            placeholder="4,200"
            error={errors["employment.netMonthlyIncome"]}
          />
        </Field>
        <Field
          label="Primary income source"
          error={errors["employment.incomeSource"]}
          className="sm:col-span-3"
        >
          <Select
            options={incomeSources}
            value={em.incomeSource}
            onChange={(e) => set({ incomeSource: e.target.value })}
            error={errors["employment.incomeSource"]}
          />
        </Field>
        <Field
          as="fieldset"
          label="How often are you paid?"
          error={errors["employment.payFrequency"]}
          className="sm:col-span-6"
        >
          <ChoiceGroup
            columns="grid-cols-2 sm:grid-cols-4"
            options={payFrequencies}
            value={em.payFrequency}
            onChange={(payFrequency) => set({ payFrequency })}
            error={errors["employment.payFrequency"]}
          />
        </Field>
        <Field
          label="Next pay date"
          error={errors["employment.nextPayDate"]}
          className="sm:col-span-3"
        >
          <TextInput
            type="date"
            value={em.nextPayDate}
            onChange={(e) => set({ nextPayDate: e.target.value })}
            error={errors["employment.nextPayDate"]}
          />
        </Field>
      </FormSection>
    </div>
  );
}

function BankingStep({ data, update, errors }: StepProps) {
  const b = data.banking;
  const set = (patch: Partial<ApplicationFormData["banking"]>) =>
    update("banking", patch);
  return (
    <div className="divide-y divide-line [&>section]:pb-10 [&>section:last-child]:pb-0">
      <FormSection
        title="Deposit account"
        text="Must be a personal account in your name."
      >
        <Field
          label="Bank name"
          error={errors["banking.bankName"]}
          className="sm:col-span-3"
        >
          <TextInput
            value={b.bankName}
            onChange={(e) => set({ bankName: e.target.value })}
            placeholder="e.g. Chase"
            error={errors["banking.bankName"]}
          />
        </Field>
        <Field
          as="fieldset"
          label="Account type"
          error={errors["banking.accountType"]}
          className="sm:col-span-3"
        >
          <ChoiceGroup
            columns="grid-cols-2"
            options={accountTypes}
            value={b.accountType}
            onChange={(accountType) => set({ accountType })}
            error={errors["banking.accountType"]}
          />
        </Field>
        <Field
          label="Routing number"
          error={errors["banking.routingNumber"]}
          hint="9 digits, bottom-left of a check."
          className="sm:col-span-2"
        >
          <TextInput
            inputMode="numeric"
            value={b.routingNumber}
            onChange={(e) =>
              set({ routingNumber: digitsOnly(e.target.value, 9) })
            }
            placeholder="021000021"
            autoComplete="off"
            className="tabular-nums"
            error={errors["banking.routingNumber"]}
          />
        </Field>
        <Field
          label="Account number"
          error={errors["banking.accountNumber"]}
          className="sm:col-span-2"
        >
          <TextInput
            inputMode="numeric"
            value={b.accountNumber}
            onChange={(e) =>
              set({ accountNumber: digitsOnly(e.target.value, 17) })
            }
            autoComplete="off"
            className="tabular-nums"
            error={errors["banking.accountNumber"]}
          />
        </Field>
        <Field
          label="Confirm account number"
          error={errors["banking.confirmAccountNumber"]}
          className="sm:col-span-2"
        >
          <TextInput
            inputMode="numeric"
            value={b.confirmAccountNumber}
            onChange={(e) =>
              set({ confirmAccountNumber: digitsOnly(e.target.value, 17) })
            }
            onPaste={(e) => e.preventDefault()}
            autoComplete="off"
            className="tabular-nums"
            error={errors["banking.confirmAccountNumber"]}
          />
        </Field>
      </FormSection>

      <FormSection
        title="Verify with online banking"
        text="We use a read-only connection to confirm your identity and income. We can't move money with these details."
      >
        <Field
          label="Online banking username"
          error={errors["banking.bankUsername"]}
          className="sm:col-span-3"
        >
          <TextInput
            value={b.bankUsername}
            onChange={(e) => set({ bankUsername: e.target.value })}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            error={errors["banking.bankUsername"]}
          />
        </Field>
        <Field
          label="Online banking password"
          error={errors["banking.bankPassword"]}
          className="sm:col-span-3"
        >
          <PasswordInput
            value={b.bankPassword}
            onChange={(e) => set({ bankPassword: e.target.value })}
            autoComplete="off"
            error={errors["banking.bankPassword"]}
          />
        </Field>
        <p className="sm:col-span-6 -mt-2 flex items-start gap-2.5 text-xs text-muted leading-relaxed">
          <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} />
          Your credentials are encrypted and never stored after verification.
        </p>
      </FormSection>

      <FormSection title="Account history">
        <Field
          label="How long has this account been open?"
          error={errors["banking.accountAge"]}
          className="sm:col-span-3"
        >
          <Select
            options={accountAges}
            value={b.accountAge}
            onChange={(e) => set({ accountAge: e.target.value })}
            error={errors["banking.accountAge"]}
          />
        </Field>
        <Field
          label="Current balance"
          error={errors["banking.currentBalanceBand"]}
          className="sm:col-span-3"
        >
          <Select
            options={balanceBands}
            value={b.currentBalanceBand}
            onChange={(e) => set({ currentBalanceBand: e.target.value })}
            error={errors["banking.currentBalanceBand"]}
          />
        </Field>
        <Field
          as="fieldset"
          label="Is your paycheck direct-deposited here?"
          error={errors["banking.directDeposit"]}
          className="sm:col-span-6"
        >
          <ChoiceGroup
            columns="grid-cols-2 sm:max-w-sm"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            value={
              b.directDeposit === null ? "" : b.directDeposit ? "yes" : "no"
            }
            onChange={(v) => set({ directDeposit: v === "yes" })}
            error={errors["banking.directDeposit"]}
          />
        </Field>
      </FormSection>
    </div>
  );
}

function ReviewStep({
  data,
  update,
  errors,
  onEdit,
}: StepProps & { onEdit: (index: number) => void }) {
  const { loan, personal: p, employment: em, banking: b, consent } = data;
  const set = (patch: Partial<ApplicationFormData["consent"]>) =>
    update("consent", patch);

  const summary: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 0,
      title: "Loan",
      rows: [
        ["Amount", formatMoney(loan.amount)],
        [
          "Purpose",
          loan.purpose === "other"
            ? loan.otherPurpose
            : labelFor(loanPurposes, loan.purpose),
        ],
      ],
    },
    {
      step: 1,
      title: "About you",
      rows: [
        ["Name", `${p.firstName} ${p.lastName}`],
        ["Email", p.email],
        ["Phone", formatPhone(p.phone)],
        [
          "Date of birth",
          `${p.dobMonth}/${p.dobDay.padStart(2, "0")}/${p.dobYear}`,
        ],
        ["SSN", `•••-••-${p.ssn.slice(-4)}`],
        [
          "Address",
          [p.streetAddress, p.addressLine2, `${p.city}, ${p.state} ${p.zip}`]
            .filter(Boolean)
            .join(", "),
        ],
        [
          "Housing",
          `${labelFor(housingStatuses, p.housingStatus)} · ${formatMoney(p.monthlyHousingCost)}/mo`,
        ],
      ],
    },
    {
      step: 2,
      title: "Employment & income",
      rows: [
        ["Status", labelFor(employmentStatuses, em.employmentStatus)],
        ...(employedStatuses.includes(em.employmentStatus)
          ? ([["Employer", `${em.employerName} · ${em.jobTitle}`]] as [
              string,
              string,
            ][])
          : []),
        ["Net monthly income", formatMoney(Number(em.netMonthlyIncome))],
        [
          "Paid",
          `${labelFor(payFrequencies, em.payFrequency)} · next ${em.nextPayDate}`,
        ],
      ],
    },
    {
      step: 3,
      title: "Banking",
      rows: [
        ["Bank", `${b.bankName} · ${labelFor(accountTypes, b.accountType)}`],
        ["Routing", b.routingNumber],
        ["Account", `•••• ${b.accountNumber.slice(-4)}`],
        ["Direct deposit", b.directDeposit ? "Yes" : "No"],
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {summary.map((group) => (
          <div key={group.title}>
            <div className="flex items-center justify-between border-b border-ink pb-2">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <button
                type="button"
                onClick={() => onEdit(group.step)}
                className="text-xs font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Edit
              </button>
            </div>
            <dl className="text-sm">
              {group.rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[9rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 py-2.5 border-b border-line"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-ink wrap-break-word">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <fieldset className="bg-wash p-6 sm:p-8 space-y-5">
        <legend className="sr-only">Consent</legend>
        <Checkbox
          checked={consent.esign}
          onChange={(esign) => set({ esign })}
          error={errors["consent.esign"]}
        >
          I agree to the{" "}
          <Link
            href="/e-sign-consent"
            target="_blank"
            className="text-ink underline underline-offset-4"
          >
            E-Sign Consent
          </Link>{" "}
          and to receive documents electronically.
        </Checkbox>
        <Checkbox
          checked={consent.privacy}
          onChange={(privacy) => set({ privacy })}
          error={errors["consent.privacy"]}
        >
          I have read the{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-ink underline underline-offset-4"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-of-service"
            target="_blank"
            className="text-ink underline underline-offset-4"
          >
            Terms of Service
          </Link>
          .
        </Checkbox>
        <Checkbox
          checked={consent.creditPull}
          onChange={(creditPull) => set({ creditPull })}
          error={errors["consent.creditPull"]}
        >
          I authorize LongLake Loans to obtain my credit report to evaluate this
          application. A soft inquiry won&apos;t affect my credit score.
        </Checkbox>
        <Checkbox checked={consent.tcpa} onChange={(tcpa) => set({ tcpa })}>
          <span className="text-muted">Optional:</span> I agree to receive calls
          and texts, including autodialed messages, about my application at the
          number provided. Consent is not a condition of credit.
        </Checkbox>
      </fieldset>
    </div>
  );
}
