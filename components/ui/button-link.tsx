import Link from "next/link";
import type { ReactNode } from "react";
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${variant === "outline" ? "outline" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
