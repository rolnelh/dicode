import Image from "next/image";
import type { Language } from "@/components/language-provider";
import type { RedesignStudy } from "@/lib/redesign-study";
export function RedesignCaseStudy({
  language,
  study,
}: {
  language: Language;
  study: RedesignStudy;
}) {
  const t = study.copy[language];
  return (
    <section className="redesign-case-study" aria-labelledby="redesign-heading">
      <div className="redesign-intro">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="redesign-heading">{t.title}</h2>
        <p>{t.intro}</p>
      </div>
      <div className="before-after-grid">
        <figure>
          <figcaption>
            <span className="comparison-label">{t.beforeLabel}</span>
            <strong>{t.beforeTitle}</strong>
          </figcaption>
          <a
            href={study.before.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.openBefore}
          >
            <Image
              src={study.before.src}
              alt={t.beforeAlt}
              width={study.before.width}
              height={study.before.height}
              sizes="(max-width:700px) 100vw, 50vw"
            />
          </a>
          <p>{t.beforeCaption}</p>
        </figure>
        <figure>
          <figcaption>
            <span className="comparison-label comparison-after">
              {t.afterLabel}
            </span>
            <strong>{t.afterTitle}</strong>
          </figcaption>
          <a
            href={study.after.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.openAfter}
          >
            <Image
              src={study.after.src}
              alt={t.afterAlt}
              width={study.after.width}
              height={study.after.height}
              sizes="(max-width:700px) 100vw, 50vw"
            />
          </a>
          <p>{t.afterCaption}</p>
        </figure>
      </div>
      <div className="comparison-source">
        <a
          href={study.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {t.sourceLink}
        </a>
        <span>{t.captureDate}</span>
        <a
          href={study.fullBefore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {t.fullCapture}
        </a>
      </div>
      <h3 className="redesign-changes-title">{t.changesTitle}</h3>
      <div className="redesign-changes">
        {t.changes.map((change, i) => (
          <article key={change.title}>
            <span className="change-number">0{i + 1}</span>
            <h4>{change.title}</h4>
            <p>{change.text}</p>
          </article>
        ))}
      </div>
      <p className="redesign-scope">{t.scope}</p>
    </section>
  );
}
