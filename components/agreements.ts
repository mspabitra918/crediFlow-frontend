// Legal documents shown on the sign & agreement page
// TODO: replace with counsel-approved copy before launch
export type Agreement = {
  id: string;
  title: string;
  summary: string;
  consent: string;
  sections: { heading: string; body: string }[];
};

export const agreements: Agreement[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "How we collect, use, share, and protect your personal information.",
    consent:
      "I have read and agree to the Privacy Policy, including the collection and use of my information to process this application.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect the details you provide in your application — name, date of birth, contact information, address, employment, and income — along with bank account data you authorize us to access and device information used to prevent fraud.",
      },
      {
        heading: "How we use it",
        body: "Your information is used to verify your identity, evaluate your application, service your loan, meet legal and regulatory obligations, and communicate with you about your account.",
      },
      {
        heading: "Sharing",
        body: "We share information only with service providers that help us operate (such as identity verification, credit bureaus, and payment processors), and when required by law. We do not sell your personal information.",
      },
      {
        heading: "Security & your choices",
        body: "Data is protected with 256-bit encryption in transit and at rest. You may request access to, correction of, or deletion of your information by contacting support@crediflow.com, subject to record-keeping requirements.",
      },
    ],
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    summary:
      "The rules for using CrediFlow and your responsibilities as an applicant.",
    consent:
      "I agree to the Terms of Service and confirm that the information in my application is true and complete.",
    sections: [
      {
        heading: "Eligibility",
        body: "You must be at least 18 years old, a U.S. resident, and hold a valid checking account in your name to apply. One application per person may be active at a time.",
      },
      {
        heading: "Accurate information",
        body: "You confirm that everything you submit is true and complete. Providing false information may result in denial, cancellation, or immediate repayment of your loan.",
      },
      {
        heading: "Electronic communications",
        body: "You consent to receive disclosures, notices, and your loan agreement electronically, and agree that your electronic signature has the same legal effect as a handwritten one.",
      },
      {
        heading: "Payments",
        body: "You authorize scheduled ACH debits from your linked account for each payment due. You may revoke this authorization by contacting us at least three business days before a scheduled payment.",
      },
    ],
  },
  {
    id: "fair-lending-statement",
    title: "Fair Lending Statement",
    summary: "Our commitment to equal access to credit for every applicant.",
    consent: "I acknowledge that I have received the Fair Lending Statement.",
    sections: [
      {
        heading: "Equal Credit Opportunity",
        body: "CrediFlow complies with the Equal Credit Opportunity Act. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age (provided you can enter a contract), because income derives from public assistance, or because you have exercised rights under the Consumer Credit Protection Act.",
      },
      {
        heading: "Consistent decisions",
        body: "Every application is evaluated using the same documented underwriting criteria. If your application is declined, you will receive an adverse action notice explaining the principal reasons.",
      },
      {
        heading: "Questions or concerns",
        body: "If you believe you have been treated unfairly, contact our compliance team at support@crediflow.com or the Consumer Financial Protection Bureau at consumerfinance.gov.",
      },
    ],
  },
  {
    id: "direct-lender-disclosure",
    title: "Direct Lender Disclosure",
    summary: "Who funds your loan and who you'll work with for its full term.",
    consent: "I acknowledge that I have received the Direct Lender Disclosure.",
    sections: [
      {
        heading: "We are the lender",
        body: "CrediFlow is a direct lender, not a broker or lead generator. Your application is reviewed, approved, and funded by CrediFlow, and is not sold to third-party lenders.",
      },
      {
        heading: "Servicing",
        body: "CrediFlow services your loan for its entire term. All payments, questions, and account changes are handled directly by our team.",
      },
      {
        heading: "Cost disclosure",
        body: "Your APR, finance charge, amount financed, total of payments, and payment schedule are disclosed in your loan agreement before you sign, as required by the Truth in Lending Act.",
      },
    ],
  },
  {
    id: "state-licenses-and-disclosures",
    title: "State Licenses & Disclosures",
    summary:
      "Where CrediFlow is licensed to lend and the disclosures your state requires.",
    consent:
      "I acknowledge that I have received the State Licenses & Disclosures for my state of residence.",
    sections: [
      {
        heading: "Licensing",
        body: "CrediFlow makes loans under licenses issued by the states in which it operates. Loans are only offered to residents of states where CrediFlow is licensed or otherwise authorized to lend. Our NMLS ID and license numbers are available on request and through NMLS Consumer Access at nmlsconsumeraccess.org.",
      },
      {
        heading: "Availability by state",
        body: "Loan amounts, terms, rates, and fees may vary by state and are subject to applicable state law. Some products are not available in every state. Your available terms are shown before you accept an offer.",
      },
      {
        heading: "State-specific notices",
        body: "Residents of certain states have additional rights, such as the right to cancel within a set period or to receive specific notices about credit reports and collections. Any notice required for your state is included in your loan agreement.",
      },
      {
        heading: "Complaints",
        body: "If you have a complaint, contact us first at support@crediflow.com. You may also contact the financial regulator in your state of residence, whose contact details are listed in your loan agreement.",
      },
    ],
  },
  {
    id: "e-sign-consent",
    title: "E-Sign Consent",
    summary:
      "Your consent to receive documents and sign your loan agreement electronically.",
    consent:
      "I consent to receive disclosures and documents electronically and to sign my loan agreement with an electronic signature.",
    sections: [
      {
        heading: "Scope of consent",
        body: "Under the federal Electronic Signatures in Global and National Commerce Act (E-SIGN Act), you agree that CrediFlow may provide your loan agreement, disclosures, notices, statements, and other communications electronically, and that you may sign documents electronically.",
      },
      {
        heading: "Hardware & software requirements",
        body: "You need a device with internet access, a current web browser, a valid email address, and software that can open PDF files. If these requirements change in a way that affects your access, we will notify you.",
      },
      {
        heading: "Paper copies",
        body: "You may request a paper copy of any electronic document at no charge by contacting support@crediflow.com or calling +1 (800) 555-CREDI.",
      },
      {
        heading: "Withdrawing consent",
        body: "You may withdraw your consent at any time by contacting us. Withdrawing consent does not affect documents already signed electronically, and may delay processing of a pending application.",
      },
      {
        heading: "Keeping your email current",
        body: "You agree to keep your email address up to date so you continue to receive notices. You can update it from your account or by contacting support.",
      },
    ],
  },
];
