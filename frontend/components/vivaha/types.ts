export type IconName =
  | "lamp"
  | "kalash"
  | "jasmine"
  | "lotus"
  | "rings"
  | "calendar"
  | "clock"
  | "pin";

export interface Link {
  href: string;
  label: string;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
