"use client";
import { Lightbulb, PenTool, Rocket } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/localized-content";
const icons = [Lightbulb, PenTool, Rocket];
export function Process() {
  const { language } = useLanguage();
  const text = copy[language].process;
  return (
    <section className="process wrap section-space">
      <div className="center-heading">
        <p className="hand">{text.hand}</p>
        <h2>
          {text.title[0]}
          <br />
          {text.title[1]}
        </h2>
        <p>{text.intro}</p>
      </div>
      <div className="steps-grid">
        {text.steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <article className="step" key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <Icon size={76} strokeWidth={0.8} />
              <p>{s.text}</p>
              {i < 2 && (
                <span className="step-arrow" aria-hidden="true">
                  ⤳
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
