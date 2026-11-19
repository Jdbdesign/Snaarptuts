import { Step1 } from "@/scenes/crm/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/crm/step1/script";
import { Step2 } from "@/scenes/crm/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/crm/step2/script";
import { Step3 } from "@/scenes/crm/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/crm/step3/script";
import { Step4 } from "@/scenes/crm/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/crm/step4/script";
import { Step5 } from "@/scenes/crm/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/crm/step5/script";
import { Step6 } from "@/scenes/crm/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/crm/step6/script";
import { Step7 } from "@/scenes/crm/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/crm/step7/script";
import { Step8 } from "@/scenes/crm/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/crm/step8/script";
import { Step9 } from "@/scenes/crm/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/crm/step9/script";
import { Step10 } from "@/scenes/crm/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/crm/step10/script";
import { Step11 } from "@/scenes/crm/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/crm/step11/script";
import { Step12 } from "@/scenes/crm/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/crm/step12/script";
import { Step13 } from "@/scenes/crm/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/crm/step13/script";
import { Step14 } from "@/scenes/crm/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/crm/step14/script";
import { Step15 } from "@/scenes/crm/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/crm/step15/script";
import { Step16 } from "@/scenes/crm/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/crm/step16/script";
import { Step17 } from "@/scenes/crm/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/crm/step17/script";
import { Step18 } from "@/scenes/crm/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/crm/step18/script";
import { Step19 } from "@/scenes/crm/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/crm/step19/script";
import { Step20 } from "@/scenes/crm/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/crm/step20/script";
import { Step21 } from "@/scenes/crm/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/crm/step21/script";
import { Step22 } from "@/scenes/crm/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/crm/step22/script";
import type { Tutorial } from "./types";

export const crm: Tutorial = {
  product: {
    id: "crm",
    name: "Snaarp CRM",
    logo: "crm",
    aliases: ["snaarp-crm", "crm", "sales"],
  },
  steps: [
    {
      id: "crm-overview",
      title: "CRM overview and navigation",
      url: "https://crm.snaarp.com",
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "crm-dashboards",
      title: "Explore CRM dashboards",
      url: "https://crm.snaarp.com/dashboards",
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "crm-create-dashboard",
      title: "Create a custom dashboard",
      url: "https://crm.snaarp.com/dashboards/new",
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "crm-add-widgets",
      title: "Add and save dashboard widgets",
      url: "https://crm.snaarp.com/dashboards/client-leads",
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "crm-share-tv",
      title: "Share and present the dashboard",
      url: "https://crm.snaarp.com/dashboards/client-leads",
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "crm-prospects",
      title: "View and sort CRM prospects",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "crm-import-prospects",
      title: "Import prospects from CSV",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "crm-calls-messaging",
      title: "Cloud phone and SMS messaging",
      url: "https://crm.snaarp.com/calls",
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "crm-add-contact",
      title: "Add a contact and link products",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "crm-tasks-comments",
      title: "Prospect tasks, reminders, and comments",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "crm-edit-close",
      title: "Edit client details and close deal",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "crm-list-view",
      title: "List view and pipeline sorting",
      url: "https://crm.snaarp.com/sales/prospects",
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "crm-forecasts",
      title: "Sales forecasting and targets",
      url: "https://crm.snaarp.com/forecasts",
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "crm-won-lost",
      title: "Won and lost deals management",
      url: "https://crm.snaarp.com/deals/won",
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "crm-tasks",
      title: "Team tasks and follow-up scheduling",
      url: "https://crm.snaarp.com/tasks",
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "crm-task-details",
      title: "Task details, reminders, and progress",
      url: "https://crm.snaarp.com/tasks",
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "crm-calendar",
      title: "Activity calendar and task completion",
      url: "https://crm.snaarp.com/calendar",
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "crm-calling-settings",
      title: "Calling settings and Cloud Phone",
      url: "https://crm.snaarp.com/calls",
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "crm-calling-providers",
      title: "Calling providers and integrations",
      url: "https://crm.snaarp.com/calls",
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "crm-contacts-directory",
      title: "Contacts directory and safe deletion",
      url: "https://crm.snaarp.com/contacts",
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "crm-contact-profile",
      title: "Contact profile, timeline, and details",
      url: "https://crm.snaarp.com/contacts/alex-morgan",
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "crm-company-info",
      title: "Company profile and associated contacts",
      url: "https://crm.snaarp.com/companies/acme-studio",
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "crm-overview" },
    { title: "Dashboards", from: "crm-dashboards" },
    { title: "Sales Pipeline", from: "crm-prospects" },
    { title: "Import Prospects", from: "crm-import-prospects" },
    { title: "Calls and Messaging", from: "crm-calls-messaging" },
    { title: "Contacts", from: "crm-add-contact" },
    { title: "Prospect Tasks and Comments", from: "crm-tasks-comments" },
    { title: "Edit and Close Prospects", from: "crm-edit-close" },
    { title: "List View and Sorting", from: "crm-list-view" },
    { title: "Sales Forecasting", from: "crm-forecasts" },
    { title: "Won and Lost Deals", from: "crm-won-lost" },
    { title: "Tasks", from: "crm-tasks" },
    { title: "Task Details and Reminders", from: "crm-task-details" },
    { title: "Calendar", from: "crm-calendar" },
    { title: "Calling Settings", from: "crm-calling-settings" },
    { title: "Calling Providers", from: "crm-calling-providers" },
    { title: "Contacts Directory", from: "crm-contacts-directory" },
    { title: "Contact Profile", from: "crm-contact-profile" },
    { title: "Company Information", from: "crm-company-info" },
  ],
  completion: {
    title: "You're all set",
    text: "You can now manage dashboards, prospects, calls, sales forecasting, deals, tasks, calendar activities, calling settings, providers, contacts, profiles, and company records in Snaarp CRM.",
    replayLabel: "Replay",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
