export const LOCK_URLS = {
  dashboard: "lock.snaarp.com/dashboard",
  devices: "lock.snaarp.com/settings/devices",
  vaults: "lock.snaarp.com/vaults",
  socialVault: "lock.snaarp.com/vaults/social-vault",
  personalLock: "lock.snaarp.com/vaults/personal-lock",
  organizations: "lock.snaarp.com/organizations",
  orgDetail: "lock.snaarp.com/organizations/acme-studio",
  import: "lock.snaarp.com/settings/import",
  chromeImport: "lock.snaarp.com/settings/import/chrome",
  importedVault: "lock.snaarp.com/vaults/imported-from-chrome",
} as const;

export type LockPage =
  | "dashboard"
  | "devices"
  | "vaults"
  | "vault-items"
  | "organizations"
  | "org-detail"
  | "import"
  | "chrome-import";

export type ItemType = "all" | "login" | "note" | "card" | "identity";

export interface DeviceSession {
  id: string;
  name: string;
  browser: string;
  os: string;
  ip: string;
  lastActive: string;
  active: boolean;
}

export interface VaultItem {
  id: string;
  type: "login" | "note" | "card" | "identity";
  title: string;
  subtitle: string;
  websiteUrl?: string;
  username?: string;
  password?: string;
  notes?: string;
  content?: string;
  cardholder?: string;
  cardNumber?: string;
  month?: string;
  year?: string;
  cvv?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Vault {
  id: string;
  name: string;
  itemCount: number;
  date: string;
  items: VaultItem[];
}

export interface OrganizationMember {
  id: string;
  name?: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
}

export interface Organization {
  id: string;
  name: string;
  memberCount: number;
  date: string;
  members: OrganizationMember[];
}

export interface ImportedPasswordItem {
  id: string;
  name: string;
  url: string;
  username: string;
}

export const INITIAL_DEVICES: DeviceSession[] = [
  {
    id: "dev-1",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.10",
    lastActive: "Today at 02:13 PM",
    active: true,
  },
  {
    id: "dev-2",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.12",
    lastActive: "11/08/2026 09:30 AM",
    active: false,
  },
  {
    id: "dev-3",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.15",
    lastActive: "11/07/2026 04:15 PM",
    active: false,
  },
  {
    id: "dev-4",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.18",
    lastActive: "11/06/2026 11:20 AM",
    active: false,
  },
  {
    id: "dev-5",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.21",
    lastActive: "11/05/2026 08:45 PM",
    active: false,
  },
  {
    id: "dev-6",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.25",
    lastActive: "11/04/2026 02:10 PM",
    active: false,
  },
  {
    id: "dev-7",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.28",
    lastActive: "11/03/2026 06:30 PM",
    active: false,
  },
  {
    id: "dev-8",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.33",
    lastActive: "11/02/2026 10:15 AM",
    active: false,
  },
  {
    id: "dev-9",
    name: "Snaarp SSO",
    browser: "Chrome",
    os: "Windows",
    ip: "203.0.113.40",
    lastActive: "11/01/2026 03:50 PM",
    active: false,
  },
];

export const INITIAL_VAULTS: Vault[] = [
  {
    id: "social-vault",
    name: "Social Vault",
    itemCount: 2,
    date: "6/15/2026",
    items: [
      {
        id: "item-netflix",
        type: "login",
        title: "Netflix",
        subtitle: "netflix.com",
        username: "jane@example.com",
        password: "Sample-Pass-123",
        websiteUrl: "https://netflix.com",
        notes: "Streaming subscription",
      },
      {
        id: "item-google",
        type: "login",
        title: "Google",
        subtitle: "google.com",
        username: "jane@example.com",
        password: "Sample-Pass-123",
        websiteUrl: "https://google.com",
        notes: "Personal Google Account",
      },
    ],
  },
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: "org-acme-ltd",
    name: "Acme Ltd",
    memberCount: 1,
    date: "6/15/2026",
    members: [
      {
        id: "mem-1",
        email: "jane@example.com",
        role: "Owner",
      },
    ],
  },
];

const BASE_DOMAINS = [
  "github.com",
  "figma.com",
  "notion.so",
  "slack.com",
  "dropbox.com",
  "spotify.com",
  "linkedin.com",
  "canva.com",
  "zoom.us",
  "trello.com",
  "atlassian.net",
  "linear.app",
  "miro.com",
  "airtable.com",
  "stripe.com",
  "gitlab.com",
  "vercel.com",
  "asana.com",
  "zendesk.com",
  "hubspot.com",
  "intercom.com",
  "mailchimp.com",
  "adobe.com",
  "digitalocean.com",
];

export const CHROME_IMPORT_ITEMS: ImportedPasswordItem[] = Array.from({ length: 142 }, (_, i) => {
  const base = BASE_DOMAINS[i % BASE_DOMAINS.length];
  const prefix = i >= BASE_DOMAINS.length ? `app${Math.floor(i / BASE_DOMAINS.length)}.` : "";
  const domain = `${prefix}${base}`;
  return {
    id: `import-${i + 1}`,
    name: domain,
    url: `https://${domain}/login`,
    username: i % 2 === 0 ? "jane@example.com" : "jane.doe@example.com",
  };
});

export const CHROME_VAULT_ITEMS: VaultItem[] = CHROME_IMPORT_ITEMS.map((item) => ({
  id: item.id,
  type: "login" as const,
  title: item.name.replace(/^app\d+\./, ""),
  subtitle: item.name,
  websiteUrl: item.url,
  username: item.username,
  password: "••••••••••••",
  notes: "Imported from Google Chrome",
}));
