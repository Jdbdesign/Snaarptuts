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
import { Step14 } from "@/scenes/snaarp-me/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/snaarp-me/step14/script";
import { Step15 } from "@/scenes/snaarp-me/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/snaarp-me/step15/script";
import { Step16 } from "@/scenes/snaarp-me/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/snaarp-me/step16/script";
import { Step17 } from "@/scenes/snaarp-me/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/snaarp-me/step17/script";
import { Step18 } from "@/scenes/snaarp-me/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/snaarp-me/step18/script";
import { Step19 } from "@/scenes/snaarp-me/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/snaarp-me/step19/script";
import { Step20 } from "@/scenes/snaarp-me/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/snaarp-me/step20/script";
import { Step21 } from "@/scenes/snaarp-me/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/snaarp-me/step21/script";
import { Step22 } from "@/scenes/snaarp-me/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/snaarp-me/step22/script";
import { Step23 } from "@/scenes/snaarp-me/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/snaarp-me/step23/script";
import { Step24 } from "@/scenes/snaarp-me/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/snaarp-me/step24/script";
import { Step25 } from "@/scenes/snaarp-me/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/snaarp-me/step25/script";
import { Step26 } from "@/scenes/snaarp-me/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/snaarp-me/step26/script";

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
    {
      id: "me-meet-workflows",
      title: "Meet Workflows",
      url: ME_URLS.workflows,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "me-create-workflow-template",
      title: "Create a workflow from a template",
      url: ME_URLS.workflows,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "me-toggle-workflow",
      title: "Turn a workflow on or off",
      url: ME_URLS.workflows,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "me-edit-emails-reminders",
      title: "Edit emails and reminders",
      url: ME_URLS.workflows,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "me-execution-logs",
      title: "Check execution logs",
      url: ME_URLS.workflows,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "me-build-custom-workflow",
      title: "Build a custom workflow",
      url: ME_URLS.workflows,
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "me-delete-custom-workflow",
      title: "Delete a custom workflow",
      url: ME_URLS.workflows,
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "me-meet-contacts",
      title: "Meet Contacts",
      url: ME_URLS.contacts,
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "me-columns-and-filter",
      title: "Show columns and filter",
      url: ME_URLS.contacts,
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
    {
      id: "me-add-contact",
      title: "Add a contact",
      url: ME_URLS.contacts,
      scene: {
        Component: Step23,
        run: runStep23,
        durationMs: STEP23_DURATION_MS,
      },
    },
    {
      id: "me-add-custom-field",
      title: "Add a custom field",
      url: ME_URLS.contacts,
      scene: {
        Component: Step24,
        run: runStep24,
        durationMs: STEP24_DURATION_MS,
      },
    },
    {
      id: "me-manage-column",
      title: "Manage a column",
      url: ME_URLS.contacts,
      scene: {
        Component: Step25,
        run: runStep25,
        durationMs: STEP25_DURATION_MS,
      },
    },
    {
      id: "me-export-contacts",
      title: "Export your contacts",
      url: ME_URLS.contacts,
      scene: {
        Component: Step26,
        run: runStep26,
        durationMs: STEP26_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Snaarp Me", from: "me-home-dashboard" },
    { title: "Availability, Calendar and Meetings", from: "me-meet-availability" },
    { title: "Workflows", from: "me-meet-workflows" },
    { title: "Contacts", from: "me-meet-contacts" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now configure event types, share public booking links, coordinate connected calendars, automate email workflows, and manage your contacts in Snaarp Me.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
