/** Decorative excerpts of the real projects; the project gallery carries their labels and links. */
const previews = [
  { name: "quebec", src: "/images/hero/quebec-signature.webp", width: 560, height: 385 },
  { name: "lexpo", src: "/images/hero/lexpo.webp", width: 560, height: 359 },
  { name: "mefolio", src: "/images/hero/mefolio.webp", width: 560, height: 315 },
] as const;

// A media-qualified source avoids downloading decorative screenshots on small screens.
const emptyPixel = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

export function HeroProjectPreviews() {
  return (
    <div className="hero-project-previews" aria-hidden="true">
      {previews.map((preview) => (
        <div key={preview.name} className={`hero-preview hero-preview-${preview.name}`}>
          <picture>
            <source media="(min-width: 1100px)" srcSet={preview.src} />
            <img
              src={emptyPixel}
              width={preview.width}
              height={preview.height}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}
