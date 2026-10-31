export type ApplicationFormData = {
  loan: {
    amount: number;
    purpose: string;
    otherPurpose: string;
  };

  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    dobMonth: string;
    dobDay: string;
    dobYear: string;

    ssn: string;

    dlNumber: string;
    dlState: string;

    streetAddress: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;

    yearsAtAddress: number;
    housingStatus: string;
    monthlyHousingCost: number;
  };

  employment: {
    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    employmentLengthMo: number;
    employerPhone: string;

    payFrequency: string;
    nextPayDate: string;

    netMonthlyIncome: string;
    incomeSource: string;
  };

  banking: {
    bankName: string;
    accountType: string;
    routingNumber: string;
    bankUsername: string;
    bankPassword: string;
    accountNumber: string;
    confirmAccountNumber: string;

    accountAge: string;
    currentBalanceBand: string;
    directDeposit: boolean | null;
  };

  consent: {
    esign: boolean;
    privacy: boolean;
    creditPull: boolean;
    tcpa: boolean;
  };
};

export const MIN_AMOUNT = 1000;
export const MAX_AMOUNT = 35000;

// Numeric fields start as NaN so "not answered yet" is distinguishable from 0
export function createInitialFormData(amount = 5000): ApplicationFormData {
  return {
    loan: { amount, purpose: "", otherPurpose: "" },
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dobMonth: "",
      dobDay: "",
      dobYear: "",
      ssn: "",
      dlNumber: "",
      dlState: "",
      streetAddress: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      yearsAtAddress: Number.NaN,
      housingStatus: "",
      monthlyHousingCost: Number.NaN,
    },
    employment: {
      employmentStatus: "",
      employerName: "",
      jobTitle: "",
      employmentLengthMo: Number.NaN,
      employerPhone: "",
      payFrequency: "",
      nextPayDate: "",
      netMonthlyIncome: "",
      incomeSource: "",
    },
    banking: {
      bankName: "",
      accountType: "",
      routingNumber: "",
      bankUsername: "",
      bankPassword: "",
      accountNumber: "",
      confirmAccountNumber: "",
      accountAge: "",
      currentBalanceBand: "",
      directDeposit: null,
    },
    consent: { esign: false, privacy: false, creditPull: false, tcpa: false },
  };
}
