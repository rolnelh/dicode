import Image from "next/image";
export type BrandName =
  "linkedin" | "threads" | "substack" | "dribbble" | "github" | "whatsapp";
export function BrandIcon({ name }: { name: BrandName }) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      width={22}
      height={22}
      className="brand-icon"
    />
  );
}
