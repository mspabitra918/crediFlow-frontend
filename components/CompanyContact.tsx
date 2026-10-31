import React from "react";

export const companyContact = {
  address: "626 Wilshire Blvd - 5th Floor, Ste 575, Los Angeles, CA 90017",
  email: {
    display: "support@longlakeloans.com",
    href: "mailto:support@longlakeloans.com",
  },
  phones: {
    tollFree: {
      label: "Toll-Free",
      display: "(800) 321-2233",
      href: "tel:+18003212233",
    },
    local: {
      label: "Local",
      display: "(747) 200-5900",
      href: "tel:+17472005900",
    },
  },
} as const;

type PhoneType = keyof typeof companyContact.phones;

type CompanyContactInfoProps = {
  includeAddress?: boolean;
  includeEmail?: boolean;
  phoneTypes?: PhoneType[];
  className?: string;
  linkClassName?: string;
  addressClassName?: string;
};

export function CompanyContactInfo({
  includeAddress = false,
  includeEmail = false,
  phoneTypes = [],
  className,
  linkClassName = "hover:text-ink",
  addressClassName = "text-muted",
}: CompanyContactInfoProps) {
  return (
    <div className={className}>
      {includeEmail && (
        <a href={companyContact.email.href} className={linkClassName}>
          {companyContact.email.display}
        </a>
      )}
      {phoneTypes.map((type) => {
        const phone = companyContact.phones[type];

        return (
          <a
            key={type}
            href={phone.href}
            aria-label={`Call ${phone.label} ${phone.display}`}
            className={linkClassName}
          >
            <span>{phone.label}: </span>
            {phone.display}
          </a>
        );
      })}
      {includeAddress && (
        <p className={addressClassName}>{companyContact.address}</p>
      )}
    </div>
  );
}
