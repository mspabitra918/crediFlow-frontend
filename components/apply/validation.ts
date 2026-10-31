import { employedStatuses } from "@/components/apply/options";
import {
  MAX_AMOUNT,
  MIN_AMOUNT,
  type ApplicationFormData,
} from "@/components/apply/types";

// Errors are keyed by "section.field", e.g. "personal.email"
export type Errors = Record<string, string>;
export type StepId = "loan" | "personal" | "employment" | "banking" | "review";

export const digitsOnly = (value: string, max?: number) =>
  value.replace(/\D/g, "").slice(0, max);

export function formatPhone(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatSsn(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

export const formatMoney = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const isBlank = (v: string) => v.trim() === "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ABA routing numbers carry a weighted 3-7-1 checksum
function isValidRouting(routing: string) {
  if (!/^\d{9}$/.test(routing)) return false;
  const d = routing.split("").map(Number);
  const sum =
    3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + (d[2] + d[5] + d[8]);
  return sum % 10 === 0;
}

function todayIso() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function validateLoan({ loan }: ApplicationFormData): Errors {
  const e: Errors = {};
  if (loan.amount < MIN_AMOUNT || loan.amount > MAX_AMOUNT)
    e["loan.amount"] = `Choose an amount between ${formatMoney(MIN_AMOUNT)} and ${formatMoney(MAX_AMOUNT)}`;
  if (!loan.purpose) e["loan.purpose"] = "Select what the loan is for";
  if (loan.purpose === "other" && isBlank(loan.otherPurpose))
    e["loan.otherPurpose"] = "Tell us briefly what the loan is for";
  return e;
}

function validatePersonal({ personal: p }: ApplicationFormData): Errors {
  const e: Errors = {};
  if (isBlank(p.firstName)) e["personal.firstName"] = "Enter your first name";
  if (isBlank(p.lastName)) e["personal.lastName"] = "Enter your last name";
  if (!EMAIL_RE.test(p.email.trim()))
    e["personal.email"] = "Enter a valid email address";
  if (p.phone.length !== 10)
    e["personal.phone"] = "Enter a 10-digit phone number";

  const year = Number(p.dobYear);
  const month = Number(p.dobMonth);
  const day = Number(p.dobDay);
  const dob = new Date(year, month - 1, day);
  if (
    !p.dobMonth ||
    !p.dobDay ||
    p.dobYear.length !== 4 ||
    dob.getMonth() !== month - 1 ||
    dob.getDate() !== day
  ) {
    e["personal.dob"] = "Enter a valid date of birth";
  } else {
    const eighteenth = new Date(year + 18, month - 1, day);
    if (eighteenth > new Date())
      e["personal.dob"] = "You must be at least 18 years old to apply";
    else if (year < 1900) e["personal.dob"] = "Enter a valid date of birth";
  }

  if (p.ssn.length !== 9 || /^(000|666|9)/.test(p.ssn))
    e["personal.ssn"] = "Enter a valid 9-digit Social Security number";
  if (isBlank(p.dlNumber)) e["personal.dlNumber"] = "Enter your ID number";
  if (!p.dlState) e["personal.dlState"] = "Select the issuing state";
  if (isBlank(p.streetAddress))
    e["personal.streetAddress"] = "Enter your street address";
  if (isBlank(p.city)) e["personal.city"] = "Enter your city";
  if (!p.state) e["personal.state"] = "Select your state";
  if (p.zip.length !== 5) e["personal.zip"] = "Enter a 5-digit ZIP code";
  if (Number.isNaN(p.yearsAtAddress))
    e["personal.yearsAtAddress"] = "Select how long you've lived here";
  if (!p.housingStatus) e["personal.housingStatus"] = "Select one";
  if (Number.isNaN(p.monthlyHousingCost))
    e["personal.monthlyHousingCost"] = "Enter your monthly cost, or 0";
  return e;
}

function validateEmployment({ employment: em }: ApplicationFormData): Errors {
  const e: Errors = {};
  if (!em.employmentStatus)
    e["employment.employmentStatus"] = "Select your employment status";

  if (employedStatuses.includes(em.employmentStatus)) {
    if (isBlank(em.employerName))
      e["employment.employerName"] =
        em.employmentStatus === "self_employed"
          ? "Enter your business name"
          : "Enter your employer's name";
    if (isBlank(em.jobTitle)) e["employment.jobTitle"] = "Enter your job title";
    if (Number.isNaN(em.employmentLengthMo) || em.employmentLengthMo < 1)
      e["employment.employmentLengthMo"] = "Enter months in this role";
    if (em.employmentStatus !== "self_employed" && em.employerPhone.length !== 10)
      e["employment.employerPhone"] = "Enter a 10-digit phone number";
  }

  if (!em.payFrequency) e["employment.payFrequency"] = "Select how often you're paid";
  if (!em.nextPayDate) e["employment.nextPayDate"] = "Select your next pay date";
  else if (em.nextPayDate < todayIso())
    e["employment.nextPayDate"] = "Next pay date can't be in the past";
  if (!(Number(em.netMonthlyIncome) > 0))
    e["employment.netMonthlyIncome"] = "Enter your monthly take-home income";
  if (!em.incomeSource) e["employment.incomeSource"] = "Select your main income source";
  return e;
}

function validateBanking({ banking: b }: ApplicationFormData): Errors {
  const e: Errors = {};
  if (isBlank(b.bankName)) e["banking.bankName"] = "Enter your bank's name";
  if (!b.accountType) e["banking.accountType"] = "Select an account type";
  if (!isValidRouting(b.routingNumber))
    e["banking.routingNumber"] = "Enter a valid 9-digit routing number";
  if (b.accountNumber.length < 4 || b.accountNumber.length > 17)
    e["banking.accountNumber"] = "Enter a valid account number";
  if (b.confirmAccountNumber !== b.accountNumber || !b.confirmAccountNumber)
    e["banking.confirmAccountNumber"] = "Account numbers don't match";
  if (isBlank(b.bankUsername))
    e["banking.bankUsername"] = "Enter your online banking username";
  if (isBlank(b.bankPassword))
    e["banking.bankPassword"] = "Enter your online banking password";
  if (!b.accountAge) e["banking.accountAge"] = "Select how long the account has been open";
  if (!b.currentBalanceBand) e["banking.currentBalanceBand"] = "Select a balance range";
  if (b.directDeposit === null) e["banking.directDeposit"] = "Select yes or no";
  return e;
}

// TCPA consent is intentionally optional: it can't be a condition of credit
function validateReview({ consent }: ApplicationFormData): Errors {
  const e: Errors = {};
  if (!consent.esign) e["consent.esign"] = "Required to continue";
  if (!consent.privacy) e["consent.privacy"] = "Required to continue";
  if (!consent.creditPull) e["consent.creditPull"] = "Required to continue";
  return e;
}

export const validators: Record<StepId, (data: ApplicationFormData) => Errors> = {
  loan: validateLoan,
  personal: validatePersonal,
  employment: validateEmployment,
  banking: validateBanking,
  review: validateReview,
};
