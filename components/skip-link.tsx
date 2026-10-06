"use client";
import { useLanguage } from "@/components/language-provider";
export function SkipLink() {
  const { language } = useLanguage();
  return (
    <a className="skip-link" href="#contenu">
      {language === "en" ? "Skip to content" : "Aller au contenu"}
    </a>
  );
}
