"use client";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/localized-content";
export default function NotFound() {
  const { language } = useLanguage();
  const text = copy[language].notFound;
  return (
    <div className="not-found">
      <span className="hand">{text.hand}</span>
      <h1>{text.title}</h1>
      <p>{text.text}</p>
      <Link className="button" href="/">
        {text.back}
      </Link>
    </div>
  );
}
