/**
 * Estimate reading time for a given text body.
 * Assumes an average reading speed of 200 words per minute.
 *
 * @param body - Raw text content (Markdown/MDX source)
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function readingTime(body: string): number {
  const wordCount = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
