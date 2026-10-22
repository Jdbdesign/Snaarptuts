import { DNS_RECORDS, DOMAIN, type DnsRecord } from "./dns-data";

/*
 * Snaarp Mail step 6 - Add the records in Cloudflare. All copy, captions and the record mapping live here.
 * The five records are NOT retyped: they are derived from DNS_RECORDS (dns-data.ts, the same source step 5 shows),
 * converted to what Cloudflare asks for: the Name is the host without the domain (acme-studio.com -> "@",
 * mail.acme-studio.com -> "mail") and the mail server has no trailing dot.
 */

export const URLS = {
  overview: `dash.cloudflare.com/${DOMAIN}`,
  dns: `dash.cloudflare.com/${DOMAIN}/dns/records`,
};

export type CfRow = {
  type: string;
  /** "@" means the root domain. */
  name: string;
  value: string;
  priority?: string;
  proxied: boolean;
};

export type CfRecord = CfRow & { id: DnsRecord["id"] };

const cfName = (host: string) => (host === DOMAIN ? "@" : host.endsWith(`.${DOMAIN}`) ? host.slice(0, -(DOMAIN.length + 1)) : host);
const noTrailingDot = (s: string) => s.replace(/\.$/, "");

/** What gets typed into Cloudflare, in the order step 5 lists the records. */
export const CF_RECORDS: CfRecord[] = DNS_RECORDS.map((r) => ({
  id: r.id,
  type: r.type,
  name: cfName(r.host),
  value: r.type === "TXT" ? r.value : noTrailingDot(r.value),
  priority: r.priority,
  proxied: false, // mail records must be DNS only
}));

export const record = (id: DnsRecord["id"]) => CF_RECORDS.find((r) => r.id === id)!;

/** Rows already in the zone (for context). */
export const EXISTING_ROWS: CfRow[] = [
  { type: "A", name: "@", value: "203.0.113.10", proxied: true },
  { type: "CNAME", name: "www", value: DOMAIN, proxied: true },
];

export const OVERVIEW = {
  title: "Overview",
  statusLabel: "Status",
  status: "Active",
  statusText: "is using Cloudflare.",
  cards: [
    { label: "Plan", value: "Free" },
    { label: "DNS records", value: "2" },
    { label: "Name servers", value: "Cloudflare" },
  ],
  nextTitle: "Recommended next step",
  nextText: "Add the DNS records Snaarp gave you. Open DNS in the menu on the left.",
};

export const DNS = {
  title: "DNS",
  cardTitle: "DNS management for",
  search: "Search DNS Records",
  advanced: "Advanced",
  addRecord: "Add record",
  cancel: "Cancel",
  save: "Save",
  toast: "Record added",
  helper: "Use @ for root",
  columns: { type: "Type", name: "Name", content: "Content", proxy: "Proxy status", ttl: "TTL", actions: "Actions" },
  edit: "Edit",
  ttl: "Auto",
  labels: { type: "Type", name: "Name (required)", priority: "Priority", proxy: "Proxy status", ttl: "TTL" },
};

/** Record types in the Type list, and what each one asks for. */
export const TYPES = ["A", "AAAA", "CAA", "CNAME", "MX", "NS", "SRV", "TXT"];

export type FormKind = { valueLabel: string; priority?: boolean; proxy?: boolean; multiline?: boolean };

export const FORM_KINDS: Record<string, FormKind> = {
  A: { valueLabel: "IPv4 address", proxy: true },
  AAAA: { valueLabel: "IPv6 address", proxy: true },
  CNAME: { valueLabel: "Target", proxy: true },
  MX: { valueLabel: "Mail server", priority: true },
  TXT: { valueLabel: "Content", multiline: true },
};
export const DEFAULT_KIND: FormKind = { valueLabel: "Content" };

export const CAPTIONS = {
  open: "Open your domain in Cloudflare",
  addRecord: "Click Add record",
  mx: (r: CfRecord) => `MX record: name ${r.name}, mail server ${r.value}, priority ${r.priority}`,
  cname: (r: CfRecord) => `CNAME record: name ${r.name}, target ${r.value}`,
  cnameProxy: "Turn the orange cloud off. Mail records must be DNS only",
  dkim: "Paste the DKIM value exactly as shown in Snaarp",
  spf: (r: CfRecord) => `SPF record: name ${r.name}`,
  dmarc: (r: CfRecord) => `DMARC record: name ${r.name}`,
  done: "All five records are added. Go back to Snaarp",
};
