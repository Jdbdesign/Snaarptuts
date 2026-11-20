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
import { Step23 } from "@/scenes/crm/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/crm/step23/script";
import { Step24 } from "@/scenes/crm/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/crm/step24/script";
import { Step25 } from "@/scenes/crm/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/crm/step25/script";
import { Step26 } from "@/scenes/crm/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/crm/step26/script";
import { Step27 } from "@/scenes/crm/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/crm/step27/script";
import { Step28 } from "@/scenes/crm/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/crm/step28/script";
import { Step29 } from "@/scenes/crm/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/crm/step29/script";
import { Step30 } from "@/scenes/crm/step30/Step30";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/crm/step30/script";
import { Step31 } from "@/scenes/crm/step31/Step31";
import { runStep31, STEP31_DURATION_MS } from "@/scenes/crm/step31/script";
import { Step32 } from "@/scenes/crm/step32/Step32";
import { runStep32, STEP32_DURATION_MS } from "@/scenes/crm/step32/script";
import { Step33 } from "@/scenes/crm/step33/Step33";
import { runStep33, STEP33_DURATION_MS } from "@/scenes/crm/step33/script";
import { Step34 } from "@/scenes/crm/step34/Step34";
import { runStep34, STEP34_DURATION_MS } from "@/scenes/crm/step34/script";
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
    {
      id: "crm-messages-channels",
      title: "Messages and messaging channel integrations",
      url: "https://crm.snaarp.com/messages",
      scene: {
        Component: Step23,
        run: runStep23,
        durationMs: STEP23_DURATION_MS,
      },
    },
    {
      id: "crm-connect-email",
      title: "Connect Email Account",
      url: "https://crm.snaarp.com/messages",
      scene: {
        Component: Step24,
        run: runStep24,
        durationMs: STEP24_DURATION_MS,
      },
    },
    {
      id: "crm-workflow-automation",
      title: "Create and configure a workflow automation",
      url: "https://crm.snaarp.com/automations",
      scene: {
        Component: Step25,
        run: runStep25,
        durationMs: STEP25_DURATION_MS,
      },
    },
    {
      id: "crm-analytics",
      title: "CRM Analytics",
      url: "https://crm.snaarp.com/analytics",
      scene: {
        Component: Step26,
        run: runStep26,
        durationMs: STEP26_DURATION_MS,
      },
    },
    {
      id: "crm-report-builder",
      title: "Report Builder and report generation",
      url: "https://crm.snaarp.com/reports",
      scene: {
        Component: Step27,
        run: runStep27,
        durationMs: STEP27_DURATION_MS,
      },
    },
    {
      id: "crm-create-approval",
      title: "Create an approval request",
      url: "https://crm.snaarp.com/approvals",
      scene: {
        Component: Step28,
        run: runStep28,
        durationMs: STEP28_DURATION_MS,
      },
    },
    {
      id: "crm-approval-management",
      title: "Approval management, permission handling and rejection",
      url: "https://crm.snaarp.com/approvals",
      scene: {
        Component: Step29,
        run: runStep29,
        durationMs: STEP29_DURATION_MS,
      },
    },
    {
      id: "crm-system-admin-overview",
      title: "System admin overview and team members",
      url: "https://crm.snaarp.com/admin/overview",
      scene: {
        Component: Step30,
        run: runStep30,
        durationMs: STEP30_DURATION_MS,
      },
    },
    {
      id: "crm-roles-permissions",
      title: "Roles and permissions",
      url: "https://crm.snaarp.com/admin/team",
      scene: {
        Component: Step31,
        run: runStep31,
        durationMs: STEP31_DURATION_MS,
      },
    },
    {
      id: "crm-admin-users-products",
      title: "Admin users and products catalogue",
      url: "https://admin.snaarp.com/admin/users",
      scene: {
        Component: Step32,
        run: runStep32,
        durationMs: STEP32_DURATION_MS,
      },
    },
    {
      id: "crm-events-management",
      title: "Events management",
      url: "https://crm.snaarp.com/admin/events",
      scene: {
        Component: Step33,
        run: runStep33,
        durationMs: STEP33_DURATION_MS,
      },
    },
    {
      id: "crm-event-attendees",
      title: "Event attendees",
      url: "https://crm.snaarp.com/admin/event-attendees",
      scene: {
        Component: Step34,
        run: runStep34,
        durationMs: STEP34_DURATION_MS,
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
    { title: "Messages and Channels", from: "crm-messages-channels" },
    { title: "Email Account Setup", from: "crm-connect-email" },
    { title: "Workflow Automation", from: "crm-workflow-automation" },
    { title: "CRM Analytics", from: "crm-analytics" },
    { title: "Report Builder", from: "crm-report-builder" },
    { title: "Create Approval Request", from: "crm-create-approval" },
    { title: "Approval Management", from: "crm-approval-management" },
    { title: "System Admin and Team Members", from: "crm-system-admin-overview" },
    { title: "Roles and Permissions", from: "crm-roles-permissions" },
    { title: "Admin Users and Products", from: "crm-admin-users-products" },
    { title: "Events Management", from: "crm-events-management" },
    { title: "Event Attendees", from: "crm-event-attendees" },
  ],
  completion: {
    title: "You're all set",
    text: "You can now manage dashboards, prospects, calls, sales forecasting, deals, tasks, calendar activities, calling settings, providers, contacts, profiles, company records, messages, email accounts, automations, analytics, custom reports, approval workflows, system admin operations, team permissions, products catalogue, and event attendees in Snaarp CRM.",
    replayLabel: "Replay",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
