export function Loop({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`loop ${className}`}
      viewBox="0 0 180 170"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M26 8C-18 104 107 118 91 66C76 18 12 134 168 149"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Sparks({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`sparks ${className}`}
      viewBox="0 0 60 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m10 35 21 18M28 10l14 28M35 60l16 3"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
