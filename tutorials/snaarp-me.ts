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
import { Step7 } from "@/scenes/snaarp-me/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-me/step7/script";
import { Step8 } from "@/scenes/snaarp-me/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-me/step8/script";
import { Step9 } from "@/scenes/snaarp-me/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-me/step9/script";
import { Step10 } from "@/scenes/snaarp-me/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-me/step10/script";
import { Step11 } from "@/scenes/snaarp-me/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-me/step11/script";
import { Step12 } from "@/scenes/snaarp-me/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-me/step12/script";
import { Step13 } from "@/scenes/snaarp-me/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/snaarp-me/step13/script";

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
    {
      id: "me-meet-availability",
      title: "Meet Availability",
      url: ME_URLS.availability,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "me-create-schedule",
      title: "Create a schedule",
      url: ME_URLS.availability,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "me-add-date-override",
      title: "Add a date override",
      url: ME_URLS.availability,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "me-preview-availability",
      title: "Preview availability",
      url: ME_URLS.availability,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "me-explore-calendar",
      title: "Explore the Calendar",
      url: ME_URLS.calendar,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "me-open-day-and-meeting",
      title: "Open a day and a meeting",
      url: ME_URLS.calendar,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "me-meetings-list",
      title: "Meetings list",
      url: ME_URLS.bookings,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Snaarp Me", from: "me-home-dashboard" },
    { title: "Availability, Calendar and Meetings", from: "me-meet-availability" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now configure event types, share public booking links, coordinate connected calendars, and manage all your scheduled calls in Snaarp Me.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
