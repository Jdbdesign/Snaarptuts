import { Step1 } from "@/scenes/zeus/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/zeus/step1/script";
import { Step2 } from "@/scenes/zeus/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/zeus/step2/script";
import { Step3 } from "@/scenes/zeus/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/zeus/step3/script";
import { Step4 } from "@/scenes/zeus/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/zeus/step4/script";
import { Step5 } from "@/scenes/zeus/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/zeus/step5/script";
import { Step6 } from "@/scenes/zeus/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/zeus/step6/script";
import { Step7 } from "@/scenes/zeus/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/zeus/step7/script";
import { Step8 } from "@/scenes/zeus/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/zeus/step8/script";
import { Step9 } from "@/scenes/zeus/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/zeus/step9/script";

import { ZEUS_URLS } from "@/components/zeus/zeus-data";
import type { Tutorial } from "./types";

export const zeus: Tutorial = {
  product: {
    id: "zeus",
    name: "Zeus",
    railLabel: "Zeus",
    logo: "zeus",
    aliases: ["zeus", "lead-search", "people-search", "leads"],
  },
  steps: [
    {
      id: "zeus-meet-zeus",
      title: "Meet Zeus",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "zeus-check-credits-plan",
      title: "Check your credits and plan",
      url: ZEUS_URLS.billing,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "zeus-search-filters",
      title: "Search with filters",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "zeus-save-search",
      title: "Save a search",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "zeus-find-email",
      title: "Find an email",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "zeus-open-contact-reveal",
      title: "Open a contact and reveal details",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "zeus-create-list",
      title: "Create a list",
      url: ZEUS_URLS.lists,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "zeus-add-contact-to-list",
      title: "Add a contact to a list",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "zeus-delete-list",
      title: "Delete a list",
      url: ZEUS_URLS.lists,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "zeus-meet-zeus" },
    { title: "Find people", from: "zeus-search-filters" },
    { title: "Contacts and lists", from: "zeus-open-contact-reveal" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now discover verified B2B leads, filter by seniority and company, find individual email addresses, and manage curated lists in Zeus.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
