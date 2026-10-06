import type { Language } from "@/components/language-provider";
import { gozemCaseStudy } from "@/lib/gozem-case-study";
import { RedesignCaseStudy } from "./redesign-case-study";
export function GozemCaseStudy({ language }: { language: Language }) {
  return (
    <>
      <RedesignCaseStudy language={language} study={gozemCaseStudy} />
      <a
        className="text-link capture-full-link"
        href="/images/gozem-after-full.jpg"
        target="_blank"
        rel="noopener noreferrer"
      >
        {language === "fr"
          ? "Voir toute la page de ma refonte"
          : "View the complete redesign page"}
      </a>
    </>
  );
}
