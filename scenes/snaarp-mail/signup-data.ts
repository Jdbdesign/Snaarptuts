import type { IconName } from "@/components/icons";

/*
 * Snaarp Mail, step 2 - sign-up page. All copy and sample values live here so they can be edited
 * without touching the layout (Step2Signup.tsx) or the script (step2-script.ts).
 * Wording follows the recording frames in ref/mail/frames-step2. Sample data only.
 */

export const BRAND = {
  wordmark: "Snaarp",
  heading: "Secure business email for your organization",
  text: "Host your business email on a secure, encrypted and ad-free email service, and add a professional touch that goes out.",
  features: [
    { icon: "shield", title: "Enterprise-grade security", text: "End-to-end encryption, spam protection, and advanced threat detection" },
    { icon: "users", title: "Team collaboration", text: "Shared calendars, contacts, and real-time document collaboration" },
    { icon: "gear", title: "Full admin controls", text: "Manage users, set permissions, and control security policies" },
  ] satisfies { icon: IconName; title: string; text: string }[],
  footerLinks: ["Terms of Service", "Privacy Policy", "Security", "Help Center"],
};

/** The plan chosen in step 1 (Mail tab, Growth). */
export const PLAN = {
  label: "Selected plan",
  name: "Growth",
  price: "NGN 44,585.17",
  per: "/month",
  storage: "100 GB",
  billing: "Billed monthly",
  trial: "14-day free trial included",
};

export const FORM = {
  title: "Sign up for Snaarp",
  subtitle: "Glad to have you on board! Create your ad-free business email account now.",
  placeholders: {
    first: "First name",
    last: "Last name",
    email: "Email",
    org: "Organization name",
    phone: "Phone number",
  },
  country: "Nigeria",
  dialCode: "+234",
  passwordLabel: "Password",
  strengthLabel: "Password strength:",
  terms: {
    before: "I agree to the ",
    termsLink: "Terms of Service",
    middle: " and ",
    privacyLink: "Privacy Policy",
    after: ". I understand that Snaarp will process my data as described in the Privacy Policy.",
  },
  submit: "Create Account",
  submitting: "Creating Account...",
  hasAccount: "Already have an account?",
  logIn: "Log In",
};

/** Sample data only. The password is shown as dots; it has upper, lower, number and special characters. */
export const SAMPLE = {
  first: "Jane",
  last: "Doe",
  email: "jane.doe@example.com",
  org: "Acme Studio",
  phone: "8012345678",
  password: "Wd7#kQ2mPz9a",
};

export const CAPTIONS = {
  plan: `Your plan is already selected: ${PLAN.name}, ${PLAN.price}${PLAN.per}`,
  name: "Enter your name",
  email: "Use an email address you can access",
  country: "Check your country and phone code",
  password: "Choose a strong password. Aim for Strong",
  terms: "Accept the Terms of Service and Privacy Policy",
  submit: "Click Create Account",
};

export type Strength = { level: "none" | "weak" | "good" | "strong"; label: string; color: string; width: number };

const STRENGTHS: Record<Strength["level"], Strength> = {
  none: { level: "none", label: "None", color: "#E5E7EB", width: 0 },
  weak: { level: "weak", label: "Weak", color: "#EF4444", width: 0.33 },
  good: { level: "good", label: "Good", color: "#EAB308", width: 0.66 },
  strong: { level: "strong", label: "Strong", color: "#22C55E", width: 1 },
};

/** Weak under 6 characters, Good from 6, Strong from 10 characters with upper, lower, number and symbol. */
export function passwordStrength(value: string): Strength {
  if (!value) return STRENGTHS.none;
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(value)).length;
  if (value.length >= 10 && classes === 4) return STRENGTHS.strong;
  if (value.length >= 6) return STRENGTHS.good;
  return STRENGTHS.weak;
}
