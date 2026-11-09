export const LOCK_URLS = {
  dashboard: "lock.snaarp.com/dashboard",
  devices: "lock.snaarp.com/settings/devices",
  vaults: "lock.snaarp.com/vaults",
  socialVault: "lock.snaarp.com/vaults/social-vault",
  personalLock: "lock.snaarp.com/vaults/personal-lock",
} as const;

export type LockPage = "dashboard" | "devices" | "vaults" | "vault-items";

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
