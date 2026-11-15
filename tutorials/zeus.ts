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
import { Step10 } from "@/scenes/zeus/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/zeus/step10/script";
import { Step11 } from "@/scenes/zeus/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/zeus/step11/script";
import { Step12 } from "@/scenes/zeus/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/zeus/step12/script";
import { Step13 } from "@/scenes/zeus/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/zeus/step13/script";
import { Step14 } from "@/scenes/zeus/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/zeus/step14/script";
import { Step15 } from "@/scenes/zeus/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/zeus/step15/script";
import { Step16 } from "@/scenes/zeus/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/zeus/step16/script";
import { Step17 } from "@/scenes/zeus/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/zeus/step17/script";
import { Step18 } from "@/scenes/zeus/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/zeus/step18/script";
import { Step19 } from "@/scenes/zeus/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/zeus/step19/script";
import { Step20 } from "@/scenes/zeus/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/zeus/step20/script";
import { Step21 } from "@/scenes/zeus/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/zeus/step21/script";
import { Step22 } from "@/scenes/zeus/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/zeus/step22/script";

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
    {
      id: "zeus-search-companies",
      title: "Search for companies",
      url: ZEUS_URLS.companies,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "zeus-open-company",
      title: "Open a company",
      url: ZEUS_URLS.companies,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "zeus-rename-list",
      title: "Rename a list",
      url: ZEUS_URLS.lists,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "zeus-delete-list-empty",
      title: "Delete a list",
      url: ZEUS_URLS.lists,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "zeus-build-ceo-list",
      title: "Build your CEO lead list",
      url: ZEUS_URLS.people,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "zeus-export-list",
      title: "Export a list",
      url: ZEUS_URLS.exports,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "zeus-create-api-key",
      title: "Create an API key",
      url: ZEUS_URLS.integrations,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "zeus-add-webhook",
      title: "Add a webhook",
      url: ZEUS_URLS.integrations,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "zeus-update-profile",
      title: "Update your profile",
      url: ZEUS_URLS.settings,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "zeus-change-password",
      title: "Change your password",
      url: ZEUS_URLS.settings,
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "zeus-turn-on-2fa",
      title: "Turn on two-factor authentication",
      url: ZEUS_URLS.settings,
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "zeus-set-notifications",
      title: "Set your notifications",
      url: ZEUS_URLS.settings,
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "zeus-stay-signed-in",
      title: "Stay signed in on this device",
      url: ZEUS_URLS.settings,
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "zeus-meet-zeus" },
    { title: "Find people", from: "zeus-search-filters" },
    { title: "Contacts and lists", from: "zeus-open-contact-reveal" },
    { title: "Companies", from: "zeus-search-companies" },
    { title: "Lists", from: "zeus-rename-list" },
    { title: "Export and integrations", from: "zeus-export-list" },
    { title: "Settings", from: "zeus-update-profile" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now discover verified B2B leads and companies, build curated lists, export contacts, and integrate Zeus with your CRM via webhooks and API keys.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
