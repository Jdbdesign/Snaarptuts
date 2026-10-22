/*
 * Snaarp Mail, step 3 - "Organization Details". All copy, list options, sample values and captions live
 * here so they can be edited without touching the layout (Step3Organization.tsx) or the script (step3-script.ts).
 * Wording follows the recording frames in ref/mail/frames-step3. Sample data only.
 */

export const ORG = {
  title: "Organization Details",
  subtitle: "Tell us about your organization",
  labels: {
    name: "Organization Name *",
    industry: "Industry *",
    size: "Company Size *",
    website: "Website",
    phone: "Phone Number",
    address: "Address",
  },
  placeholders: {
    industry: "Select your industry",
    size: "Select company size",
    website: "https://yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State, Country",
  },
  back: "Back",
  next: "Continue",
  saving: "Saving...",
  toast: "Organization details saved successfully!",
};

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Non-profit",
  "Government",
];

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

/** Sample data only. */
export const SAMPLE = {
  name: "Acme Studio",
  industry: "Technology",
  size: "1-10 employees",
  website: "https://acme-studio.com",
  phone: "+234 801 234 5678",
  address: "12 Marina Road, Lagos, Nigeria",
};

export const CAPTIONS = {
  name: "Check your organization name",
  industry: "Choose your industry",
  size: "Choose your company size",
  optional: "Website, phone and address are optional",
  next: "Click Continue",
};

/** Turn an option label into a safe selector fragment ("1-10 employees" -> "1-10-employees"). */
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
