"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/localized-content";
import { site } from "@/lib/site";

export function ContactContent({
  deliveryEnabled,
}: {
  deliveryEnabled: boolean;
}) {
  const { language } = useLanguage();
  const text = copy[language].contact;
  return (
    <div className="contact-page wrap">
      <div className="contact-heading">
        <p className="hand">{text.hand}</p>
        <h1>
          {text.title[0]}
          <br />
          {text.title[1]} <span aria-hidden="true">👋</span>
        </h1>
        <p>{text.intro}</p>
      </div>
      <ContactForm deliveryEnabled={deliveryEnabled} />
      <p className="contact-direct">
        {text.direct}{" "}
        <a className="text-link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
    </div>
  );
}
