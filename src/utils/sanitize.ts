export function sanitizeString(input: string | undefined | null): string | null {
  if (input === undefined || input === null) return null
  // Replace common HTML special chars to avoid script injection when storing/displaying
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
}

export function sanitizeForStorage(input: string | undefined | null): string | null {
  return sanitizeString(input)
}
