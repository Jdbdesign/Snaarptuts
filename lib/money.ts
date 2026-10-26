/** The one place money is formatted. Every price, total and amount in the tutorials goes through here. */

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const GBP_WHOLE = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const GBP_CODE = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", currencyDisplay: "code" });

type MoneyOptions = {
  /** Drop the pence: 49 -> "£49" (the Snaarp 360 pricing page). Default shows them: "£49.00". */
  whole?: boolean;
  /** Show the currency code instead of the sign: "GBP 25.00" (the sign-up plan box). */
  code?: boolean;
};

export function formatGBP(amount: number, { whole = false, code = false }: MoneyOptions = {}): string {
  const text = (code ? GBP_CODE : whole ? GBP_WHOLE : GBP).format(amount);
  return text.replace(/ /g, " ");
}

/** A plan's monthly price and its 12-month total, so the two always add up. */
export function planPrice(monthly: number, options: Omit<MoneyOptions, "code"> = {}) {
  return { price: formatGBP(monthly, options), total: formatGBP(monthly * 12, options) };
}
