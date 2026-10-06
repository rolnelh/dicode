"use client";

import { useMemo, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { useLanguage, type Language } from "@/components/language-provider";
import {
  copy,
  getBudgetOptions,
  getNeedOptions,
} from "@/lib/localized-content";

type Field = "name" | "email" | "need" | "message";
type ErrorKey = keyof typeof copy.fr.form.errors;
type FormErrors = Partial<Record<Field, ErrorKey>>;
type ContactData = Record<
  "name" | "email" | "need" | "budget" | "message" | "company_url",
  string
>;
type Status = "" | "draft" | "sent" | "validation" | "error";

function createMailtoUrl(data: ContactData, language: Language) {
  const text = copy[language].form.mail;
  const need =
    getNeedOptions(language).find((option) => option.value === data.need)
      ?.label || data.need;
  const budget =
    getBudgetOptions(language).find((option) => option.value === data.budget)
      ?.label || data.budget;
  const separator = language === "fr" ? " : " : ": ";
  const body = `${text.greeting}\n\n${data.message}\n\n${text.need}${separator}${need}\n${text.budget}${separator}${budget}\n${text.name}${separator}${data.name}\n${text.email}${separator}${data.email}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(`${text.subject} · ${need}`)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ deliveryEnabled }: { deliveryEnabled: boolean }) {
  const { language } = useLanguage();
  const text = copy[language].form;
  const needOptions = getNeedOptions(language);
  const budgetOptions = getBudgetOptions(language);
  const [status, setStatus] = useState<Status>("");
  const [error, setError] = useState<ErrorKey>("failed");
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<ContactData | null>(null);
  const mail = useMemo(
    () => (draft ? createMailtoUrl(draft, language) : ""),
    [draft, language],
  );

  function fieldError(field: Field) {
    const key = errors[field];
    return key ? (
      <p className="field-error" id={`${field}-error`}>
        {text.errors[key]}
      </p>
    ) : null;
  }

  function clearFeedback(event: FormEvent<HTMLFormElement>) {
    const field = (
      event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    ).name as Field;
    if (field in errors)
      setErrors((current) => ({ ...current, [field]: undefined }));
    if (!busy) {
      setStatus("");
      setDraft(null);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: ContactData = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      need: String(formData.get("need") || ""),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || "").trim(),
      company_url: String(formData.get("company_url") || ""),
    };
    const nextErrors: FormErrors = {};
    if (!data.name) nextErrors.name = "requiredName";
    else if (data.name.length > 100) nextErrors.name = "invalidName";
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!data.email) nextErrors.email = "requiredEmail";
    else if (data.email.length > 200 || emailInput.validity.typeMismatch)
      nextErrors.email = "invalidEmail";
    if (!needOptions.some((option) => option.value === data.need))
      nextErrors.need = "requiredNeed";
    if (!data.message) nextErrors.message = "requiredMessage";
    else if (data.message.length < 20) nextErrors.message = "shortMessage";
    else if (data.message.length > 4000) nextErrors.message = "longMessage";
    setErrors(nextErrors);
    setDraft(null);
    if (Object.keys(nextErrors).length) {
      setStatus("validation");
      const firstField = Object.keys(nextErrors)[0];
      (form.elements.namedItem(firstField) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("");
    if (!deliveryEnabled) {
      setDraft(data);
      setStatus("draft");
      window.location.href = createMailtoUrl(data, language);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Translate failures here rather than exposing a French backend message
        // in the English interface. The endpoint and its payload stay unchanged.
        const errorKey: ErrorKey =
          response.status === 400 || response.status === 422
            ? "invalid"
            : response.status === 403
              ? "forbidden"
              : response.status === 429
                ? "rateLimited"
                : response.status === 503
                  ? "unavailable"
                  : "failed";
        setError(errorKey);
        setStatus("error");
        return;
      }
      // A successful transport response must still be valid JSON, as in the
      // original endpoint contract. Do not report an HTML fallback as sent.
      try {
        const result = await response.json();
        if (result?.ok !== true) throw new Error("Unconfirmed delivery");
      } catch {
        setError("failed");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setError("network");
      setStatus("error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={clearFeedback}
      noValidate
    >
      <div className="field">
        <label htmlFor="name">{text.name}</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={text.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {fieldError("name")}
      </div>
      <div className="field">
        <label htmlFor="email">{text.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          placeholder={text.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {fieldError("email")}
      </div>
      <div className="field">
        <label htmlFor="need">{text.need}</label>
        <select
          id="need"
          name="need"
          defaultValue=""
          required
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? "need-error" : undefined}
        >
          <option value="" disabled>
            {text.needPlaceholder}
          </option>
          {needOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldError("need")}
      </div>
      <div className="field">
        <label htmlFor="budget">{text.budget}</label>
        <select id="budget" name="budget" defaultValue={budgetOptions[0].value}>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field full-field">
        <label htmlFor="message">{text.message}</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={4000}
          placeholder={text.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {fieldError("message")}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company_url">{text.honeypot}</label>
        <input
          id="company_url"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="full-field form-note">
        {text.privacy}
        {!deliveryEnabled && ` ${text.mailtoNote}`}
      </p>
      <button className="button" type="submit" disabled={busy}>
        {busy ? text.busy : deliveryEnabled ? text.send : text.prepare}
      </button>
      <span className="hand">{text.hand}</span>
      {status && (
        <div className="full-field form-status" role="status">
          {status === "error" ? text.errors[error] : text[status]}
          {status === "draft" && mail && (
            <>
              {" "}
              <a className="text-link" href={mail}>
                {text.openDraft}
              </a>
              .
            </>
          )}
        </div>
      )}
    </form>
  );
}
