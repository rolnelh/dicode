import type { Language } from "@/components/language-provider";
import { quebecCaseStudy } from "@/lib/quebec-case-study";
import { RedesignCaseStudy } from "./redesign-case-study";
const study = {
  copy: quebecCaseStudy,
  before: { src: "/images/quebec-original-hero.jpg", width: 1157, height: 742 },
  after: {
    src: "/images/quebec-signature-hero.png",
    width: 1513,
    height: 1040,
  },
  sourceUrl: "https://demenagementquebecsignature.ca/",
  fullBefore: "/images/quebec-original-full.jpg",
};
export function QuebecCaseStudy({ language }: { language: Language }) {
  return <RedesignCaseStudy language={language} study={study} />;
}
