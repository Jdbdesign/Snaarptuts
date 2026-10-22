/*
 * Snaarp Mail - the DNS records and the copy of the "DNS Mapping" page (step 5).
 * DNS_RECORDS is the single source of truth: steps 6 (Cloudflare) and 7 (confirm the records) import it,
 * so the values must only ever be edited here. All values are sample data for acme-studio.com except the
 * mail server, which is the product's real mail host (mail.mailrit.com.) and stays as written.
 */

export const DOMAIN = "acme-studio.com";
export const MAIL_SERVER = "mail.mailrit.com.";

export type DnsRecord = {
  /** Stable id used in selectors (`card-<id>`, `mark-<id>`, `copy-<id>-host`) and scene variables (`dns:<id>`). */
  id: string;
  type: "MX" | "CNAME" | "TXT";
  host: string;
  /** The value, or the mail server for the MX record. */
  value: string;
  /** MX only. */
  priority?: string;
};

// Made-up key material: the standard "MIIBIjAN..." header followed by random-looking letters.
const FAKE_DKIM_KEY =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA" +
  "x7Qm2LdVa9TzBn4Ke8WcRf1YuHs6JpOg3NiZtXb5MlAy0CvEkDqUh+r/wS2GjFo7PnT9mXcLeVb4KaYdQz8ZtRu1HiWs3NgOy6AxBp5MvJk0CfEl2DqTnUr" +
  "7Zh+9SwGjFoLmP4XcVbKaYdQz8ZtRu1HiWs3NgOy6AxBp5MvJk0CfEl2DqTnUrIDAQAB";

export const DNS_RECORDS: DnsRecord[] = [
  { id: "mx", type: "MX", host: DOMAIN, priority: "10", value: MAIL_SERVER },
  { id: "cname", type: "CNAME", host: `mail.${DOMAIN}`, value: MAIL_SERVER },
  {
    id: "dkim",
    type: "TXT",
    host: `rsa._domainkey.${DOMAIN}`,
    value: `v=DKIM1; k=rsa; h=sha256; p=${FAKE_DKIM_KEY}`,
  },
  {
    id: "spf",
    type: "TXT",
    host: DOMAIN,
    value: "v=spf1 mx include:_spf.google.com include:mailgun.org include:sendgrid.net -all",
  },
  {
    id: "dmarc",
    type: "TXT",
    host: `_dmarc.${DOMAIN}`,
    value: `v=DMARC1; p=reject; rua=mailto:postmaster@${DOMAIN}; ruf=mailto:postmaster@${DOMAIN}`,
  },
];

/** Column headings: the MX record has a priority column, the others a type column. */
export const COLUMNS = {
  mx: ["HOST / NAME", "PRIORITY", "MAIL SERVER", "STATUS"],
  other: ["TYPE", "HOST / NAME", "VALUE", "STATUS"],
};

export const PAGE = {
  back: "Back To Domain",
  title: "DNS Mapping",
  intro:
    "Once you verify your domain and create users, you will be able to send emails from domain-based accounts. However, you will not be able to receive emails until you configure the MX records for your domain.",
  stepsTitle: "Configuration Steps",
  steps: [
    "Log in to the DNS provider where your domain's name servers are pointed (e.g. Cloudflare, GoDaddy, Hostinger, Namecheap, Route 53).",
    "Add the records from the table below to your DNS settings page.",
  ],
  stepsLink: "Click here for detailed instructions.",
  publish: "Publish DNS automatically",
  toContinue: "To continue, all records must be submitted to your provider and marked as submitted in the table below.",
  recordCount: "1 record",
  pending: "Pending",
  verified: "Verified",
  mark: "Mark submitted",
  note: {
    label: "Note:",
    text: " Use the minimum TTL value in your DNS settings. Changes may take 30 minutes to 1 day to propagate. Contact us at support@snaarp.com if you need help.",
  },
  continue: "Continue",
};

export const MODAL = {
  title: "Automatic DNS Publishing",
  label: "DNS Provider",
  providers: ["Manual Setup (Copy & Paste)", "Cloudflare", "GoDaddy", "Spaceship"],
  info: "Manual setup selected. Copy the DNS records below and add them to your DNS provider's dashboard.",
  warning: "Your DNS provider credentials are not stored. They are used only to publish records and are immediately discarded.",
  close: "Close",
};

export const CAPTIONS = {
  overview: "Snaarp shows the DNS records your domain needs",
  fields: "Each record has a type, a name and a value",
  publish: "You can publish automatically for some providers",
  manual: "We will add the records by hand. Keep Manual Setup",
  next: "Next, open your Cloudflare dashboard and add these records",
  // Step 7
  confirm: "Back in Snaarp, click Mark submitted on each record",
  continue: "Click Continue",
};
