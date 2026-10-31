"use client";
import React, { useState } from "react";
import { Check, ChevronDown, Eye, EyeOff } from "lucide-react";
import type { Option } from "@/components/apply/options";

// Form primitives for the application flow, matching ContactForm's styling
const inputBase =
  "w-full bg-paper border px-4 py-3 text-sm text-ink placeholder:text-neutral-400 focus:outline-none transition-colors disabled:bg-wash";

export function inputClass(error?: string) {
  return `${inputBase} ${
    error ? "border-red-600 focus:border-red-700" : "border-line focus:border-ink"
  }`;
}

export function Field({
  label,
  error,
  hint,
  optional,
  className = "",
  as = "label",
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  // Use "fieldset" when the field holds buttons rather than a single input
  as?: "label" | "fieldset";
  children: React.ReactNode;
}) {
  const Wrapper = as;
  const Title = as === "label" ? "span" : "legend";
  return (
    <Wrapper className={`block min-w-0 ${className}`}>
      <Title className="flex items-baseline justify-between gap-2 text-sm text-body mb-2">
        {label}
        {optional && <span className="text-xs text-muted">Optional</span>}
      </Title>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </Wrapper>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  leading?: string;
  trailing?: string;
};

export function TextInput({
  error,
  leading,
  trailing,
  className = "",
  ...props
}: TextInputProps) {
  if (!leading && !trailing) {
    return (
      <input
        aria-invalid={!!error}
        className={`${inputClass(error)} ${className}`}
        {...props}
      />
    );
  }
  return (
    <div className="relative">
      {leading && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
          {leading}
        </span>
      )}
      <input
        aria-invalid={!!error}
        className={`${inputClass(error)} ${leading ? "pl-8" : ""} ${
          trailing ? "pr-20" : ""
        } ${className}`}
        {...props}
      />
      {trailing && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">
          {trailing}
        </span>
      )}
    </div>
  );
}

export function PasswordInput(props: Omit<TextInputProps, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <TextInput
        {...props}
        type={visible ? "text" : "password"}
        className="pr-12"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? "Hide" : "Show"}
        className="absolute right-0 top-0 h-full px-4 text-muted hover:text-ink"
      >
        {visible ? (
          <EyeOff className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <Eye className="w-4 h-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

export function Select({
  options,
  placeholder = "Select",
  error,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        aria-invalid={!!error}
        className={`${inputClass(error)} appearance-none pr-10 ${
          props.value === "" ? "text-neutral-400" : ""
        } ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
        strokeWidth={1.5}
      />
    </div>
  );
}

// Grid of selectable tiles, used in place of radio buttons
export function ChoiceGroup({
  options,
  value,
  onChange,
  error,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: string;
}) {
  return (
    <div role="radiogroup" className={`grid ${columns} gap-2`}>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`relative flex items-center justify-between gap-2 border px-4 py-3 text-left text-sm transition-colors ${
              selected
                ? "border-ink bg-ink text-paper"
                : `${error ? "border-red-600" : "border-line"} text-body hover:border-ink hover:text-ink`
            }`}
          >
            {o.label}
            {selected && (
              <Check className="w-4 h-4 shrink-0" strokeWidth={2} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex gap-4 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={`mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 ${
            checked
              ? "bg-ink border-ink text-paper"
              : `${error ? "border-red-600" : "border-neutral-400"} group-hover:border-ink`
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
        </span>
        <span className="text-sm text-body leading-relaxed">{children}</span>
      </label>
      {error && <p className="mt-1.5 ml-9 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FormSection({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-10 first:pt-0">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {text && <p className="mt-1 text-sm text-muted">{text}</p>}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-6 gap-x-4 gap-y-6">
        {children}
      </div>
    </section>
  );
}
