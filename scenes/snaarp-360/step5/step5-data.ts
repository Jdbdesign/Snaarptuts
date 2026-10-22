import { DOMAIN } from "../step4/step4-data";

/** Sample people for step 5 (never real data). */
export const OWNER = { name: "Jane Doe", initials: "JD", email: `jane@${DOMAIN}` };

export const NEW_USER = {
  first: "Sam",
  last: "Lee",
  initials: "SL",
  email: `sam.lee@${DOMAIN}`,
  /** The part before the @, as chosen from the suggestion chips. */
  emailName: "sam.lee",
  recovery: "sam.recovery@example.com",
  /** Fake generated password. */
  password: "Wd7#kQ2mPz9a",
  domain: DOMAIN,
};

/** The name suggestions shown under Primary Email, built from the typed first and last name. */
export function emailSuggestions(first: string, last: string) {
  const f = first.trim().toLowerCase();
  const l = last.trim().toLowerCase();
  if (!f || !l) return [];
  return [f, l, `${f}.${l}`, `${f}_${l}`, `${f}${l}`, `${f[0]}${l}`];
}
