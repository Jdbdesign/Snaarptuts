/** Sample domain used across step 4 (never a real domain). */
export const DOMAIN = "acme-studio.com";

/** Made-up key material, not a real DKIM key. */
const SAMPLE_DKIM =
  "v=DKIM1; k=rsa; h=sha256; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq7Zt3LkR0wVbN8yJcXe2HdUo5FmPaTg1IiS9nWvKzYr4BxQ6lCuOjDe7hMfAsGt0Xp2NkEw8RvLyBZq3UoJc5TiHdFa1PnVgS9mKxYb6WrQe4ZtCuLjO7DhNf2MsAi0GvXpBkE8RyTw3UlJc5ZoHq1PnVdFa9SgmKxYb6WrQe4ZtCuLjO7DhNf2MsAi0GvXpBkE8RyTw3UlJc5ZoHq1PnVdFaQIDAQAB";

export const MX_RECORD = {
  host: DOMAIN,
  priority: "10",
  server: "mail.mailrit.com.",
  ttl: "3600",
  zone: `${DOMAIN} IN MX 10 mail.mailrit.com.`,
};

export const CNAME_RECORD = {
  host: `mail.${DOMAIN}`,
  value: "mail.mailrit.com.",
  ttl: "3600",
  zone: `mail.${DOMAIN} IN CNAME mail.mailrit.com.`,
};

export const TXT_RECORDS = [
  {
    id: "txt1",
    host: `rsa._domainkey.${DOMAIN}`,
    value: SAMPLE_DKIM,
    ttl: "3600",
    zone: `rsa._domainkey.${DOMAIN} IN TXT "v=DKIM1; k=rsa; h=sha256; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."`,
  },
  {
    id: "txt2",
    host: DOMAIN,
    value: "v=spf1 mx ra=postmaster -all",
    ttl: "3600",
    zone: `${DOMAIN} IN TXT "v=spf1 mx ra=postmaster -all"`,
  },
  {
    id: "txt3",
    host: `_dmarc.${DOMAIN}`,
    value: `v=DMARC1; p=reject; rua=mailto:postmaster@${DOMAIN}; ruf=mailto:postmaster@${DOMAIN}`,
    ttl: "3600",
    zone: `_dmarc.${DOMAIN} IN TXT "v=DMARC1; p=reject; rua=mailto:postmaster@${DOMAIN}; ..."`,
  },
];
