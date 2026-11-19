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
  ],
  groups: [
    { title: "Overview", from: "crm-overview" },
    { title: "Dashboards", from: "crm-dashboards" },
    { title: "Sales Pipeline", from: "crm-prospects" },
  ],
  completion: {
    title: "You're all set",
    text: "You can now customize dashboards, monitor sales metrics, and manage your prospect pipeline in Snaarp CRM.",
    replayLabel: "Replay",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
