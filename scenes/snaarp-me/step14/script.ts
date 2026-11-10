import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP14_DATA } from "./data";

export const STEP14_DURATION_MS = STEP14_DATA.durationMs;

export async function runStep14(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 14);

  // Beat 1: Intro
  await tl.at(400);
  tl.showCaption(STEP14_DATA.captions.intro);
  await hoverOn(tl, "[data-tl=me-workflows-view]", { ms: 600, ring: false });
  await tl.wait(2000);

  // Beat 2: Header Buttons
  await tl.at(3000);
  tl.showCaption(STEP14_DATA.captions.headerBtns);
  await hoverOn(tl, "[data-tl=me-workflows-new-btn]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Beat 3: Booking emails & reminders
  await tl.at(5600);
  tl.showCaption(STEP14_DATA.captions.bookingSection);
  await hoverOn(tl, "[data-tl=me-workflow-card-booking-confirmation]", { ms: 650, ring: true });
  await tl.wait(2000);

  // Beat 4: Custom Workflows
  await tl.at(8200);
  tl.showCaption(STEP14_DATA.captions.customSection);
  await hoverOn(tl, "[data-tl=me-custom-workflows-empty]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Finish
  await tl.at(9800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
