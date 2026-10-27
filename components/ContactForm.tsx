"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { buttonPrimary, buttonSecondary } from "@/components/ui";

const topics = [
  "New application",
  "Existing loan",
  "Payments & billing",
  "Partnerships",
  "Other",
];

const inputClass =
  "w-full bg-paper border border-line focus:border-ink focus:outline-none px-4 py-3 text-sm text-ink placeholder:text-neutral-400 transition-colors";
const labelClass = "block text-sm text-body mb-2";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TODO: send the form to the backend once the contact API is available
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-line p-10">
        <Check className="w-8 h-8 text-accent" strokeWidth={1.5} />
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          Message sent.
        </h3>
        <p className="mt-2 text-sm text-body">
          Thanks, {form.name.split(" ")[0] || "there"}. Our team will reply to{" "}
          {form.email} within one business day.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ ...form, message: "" });
          }}
          className={`${buttonSecondary} mt-8`}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label>
          <span className={labelClass}>Full name *</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Email address *</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Topic</span>
          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
            className={inputClass}
          >
            {topics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className={labelClass}>Message *</span>
        <textarea
          required
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className={`${inputClass} resize-none`}
        />
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-muted">
          Please don&apos;t include your SSN or bank account numbers.
        </p>
        <button type="submit" className={buttonPrimary}>
          Send message
        </button>
      </div>
    </form>
  );
}
