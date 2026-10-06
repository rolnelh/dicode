import type { Language } from "@/components/language-provider";
export type RedesignCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  beforeLabel: string;
  beforeTitle: string;
  afterLabel: string;
  afterTitle: string;
  beforeAlt: string;
  afterAlt: string;
  beforeCaption: string;
  afterCaption: string;
  openBefore: string;
  openAfter: string;
  sourceLink: string;
  captureDate: string;
  fullCapture: string;
  changesTitle: string;
  changes: { title: string; text: string }[];
  scope: string;
};
export type RedesignStudy = {
  copy: Record<Language, RedesignCopy>;
  before: { src: string; width: number; height: number };
  after: { src: string; width: number; height: number };
  sourceUrl: string;
  fullBefore: string;
};
