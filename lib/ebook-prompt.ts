/** Session-local frequency cap, not a permanent first-visit flag or tracking cookie. */
export const EBOOK_PROMPT_KEY = "dicode-ebook-last-open";
export const EBOOK_PROMPT_DELAY = 8_000;
export const EBOOK_VISIT_WINDOW = 30 * 60 * 1_000;
export function isRecentEbookPrompt(
  value: string | null,
  now: number,
): boolean {
  if (!value?.trim()) return false;
  const openedAt = Number(value);
  return (
    Number.isFinite(openedAt) &&
    openedAt > 0 &&
    now >= openedAt &&
    now - openedAt < EBOOK_VISIT_WINDOW
  );
}
