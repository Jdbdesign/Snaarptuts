import { formatGBP } from "@/lib/money";

/*
 * How a number shows under a toolbar format (steps 91-93): a currency by code, a percent, a plain or grouped number, a date, a
 * time, scientific, or plain text. Standalone (no imports from the grid), so grid-state can use it for live formulas.
 */

const p2 = (n: number) => String(n).padStart(2, "0");

/** A serial day count (days since 30/12/1899) as a UTC date. */
const serialDate = (n: number) => new Date(Date.UTC(1899, 11, 30) + Math.floor(n) * 86400000);

/** Days since 30/12/1899 for a date. */
export const toSerial = (y: number, m: number, d: number) => Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000);

/** How many decimals a number has, up to `max` (7.5 -> 1, 15 -> 0). */
export function naturalDecimals(n: number, max = 2): number {
  for (let d = 0; d < max; d++) if (Math.abs(Number(n.toFixed(d)) - n) < 1e-9) return d;
  return max;
}

/** Currencies of the dropdown: code, and how many decimals it uses (yen has none). */
const NO_DECIMALS = new Set(["JPY", "KRW", "VND", "CLP", "HUF"]);

/** "£1,000.12" for GBP (through formatGBP), the symbol of any other code through Intl (en-GB, narrow symbol). */
export function formatCurrency(n: number, code: string, dp?: number): string {
  const d = dp ?? (NO_DECIMALS.has(code) ? 0 : 2);
  if (code === "GBP" && d === 2) return formatGBP(n);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: code, currencyDisplay: "narrowSymbol", minimumFractionDigits: d, maximumFractionDigits: d }).format(n).replace(/ /g, " ");
}

const group = (n: number, d: number) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });

/** The decimals a format shows when none were asked for: percent keeps the ones the number has, number keeps whole numbers whole. */
export function defaultDecimals(n: number, nf: string): number {
  if (nf === "percent") return naturalDecimals(n * 100);
  if (nf.startsWith("currency:")) return NO_DECIMALS.has(nf.slice(9)) ? 0 : 2;
  return Number.isInteger(n) ? 0 : naturalDecimals(n, 3);
}

export function formatValue(n: number, nf: string, dp?: number): string {
  if (nf.startsWith("currency:")) return formatCurrency(n, nf.slice(9), dp);
  switch (nf) {
    case "percent":
      return `${(n * 100).toFixed(dp ?? naturalDecimals(n * 100))}%`;
    case "number":
      return group(n, dp ?? defaultDecimals(n, nf));
    case "scientific": {
      const [mant, exp] = n.toExponential(dp ?? 2).split("e");
      const e = Number(exp);
      return `${mant}E${e < 0 ? "-" : "+"}${p2(Math.abs(e))}`;
    }
    case "date": {
      const d = serialDate(n);
      return `${p2(d.getUTCDate())}/${p2(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
    }
    case "time": {
      const secs = Math.round((n - Math.floor(n)) * 86400);
      return `${p2(Math.floor(secs / 3600))}:${p2(Math.floor((secs % 3600) / 60))}:${p2(secs % 60)}`;
    }
    default:
      return dp === undefined ? String(n) : n.toFixed(dp);
  }
}

/** Weekday of a serial date, 1 = Sunday ... 7 = Saturday (the WEEKDAY default). */
export const weekdayOf = (serial: number) => serialDate(serial).getUTCDay() + 1;

/** Today as a serial day count (the clock of the machine playing the tutorial). */
export function todaySerial(): number {
  const d = new Date();
  return toSerial(d.getFullYear(), d.getMonth() + 1, d.getDate());
}
