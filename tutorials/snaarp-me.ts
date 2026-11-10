import { Step1 } from "@/scenes/snaarp-me/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-me/step1/script";
import { Step2 } from "@/scenes/snaarp-me/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-me/step2/script";
import { Step3 } from "@/scenes/snaarp-me/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-me/step3/script";
import { Step4 } from "@/scenes/snaarp-me/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-me/step4/script";
import { Step5 } from "@/scenes/snaarp-me/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-me/step5/script";
import { Step6 } from "@/scenes/snaarp-me/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-me/step6/script";

import { ME_URLS } from "@/components/me/me-data";
import type { Tutorial } from "./types";

export const snaarpMe: Tutorial = {
  product: {
    id: "snaarp-me",
    name: "Snaarp Me",
    railLabel: "Snaarp Me",
    logo: "me",
    aliases: ["me", "snaarpme", "scheduling", "calendar", "bookings"],
  },
  steps: [
    {
      id: "me-home-dashboard",
      title: "Find your way around the Home dashboard",
      url: ME_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "me-open-booking-calendar",
      title: "Open a booking and check your calendar",
      url: ME_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "me-create-event-type",
      title: "Create an event type",
      url: ME_URLS.dashboard,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "me-edit-event-type",
      title: "Edit an event type and preview its booking page",
      url: ME_URLS.eventTypes,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "me-copy-link-book-meeting",
      title: "Copy your booking link and book a meeting",
      url: ME_URLS.eventTypes,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "me-home-updated",
      title: "See your new booking on Home",
      url: ME_URLS.dashboard,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Snaarp Me", from: "me-home-dashboard" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now configure event types, share public booking links, coordinate connected calendars, and manage all your scheduled calls in Snaarp Me.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
