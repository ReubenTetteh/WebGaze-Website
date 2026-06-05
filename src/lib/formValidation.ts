const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]{7,20}$/;

export function textField(value: unknown, maxLength = 200): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed.length > maxLength) return null;
  return trimmed;
}

export function textListField(
  value: unknown,
  maxItems = 12,
  maxItemLength = 120
): string[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > maxItems) {
    return null;
  }

  const items = value.map((item) => textField(item, maxItemLength));
  if (items.some((item) => item === null || item === "")) return null;

  return Array.from(new Set(items as string[]));
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone);
}
