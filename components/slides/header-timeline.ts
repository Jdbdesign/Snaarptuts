import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { enterFullScreen } from "@/components/docs/view-menu-timeline";
import { getSlideIndex, getSlides } from "./slides-edit";
import { playableSlides } from "./slides-format";
import { pressOn } from "./slides-timeline";
import { MEETING } from "./slides-tools-data";

/*
 * Timeline helpers for the header buttons of Snaarp Slides (steps 54-56): the Slideshow dropdown, the meeting icon and its dropdown, and Share.
 * Same pattern as menu-timeline.ts: move, ring, click, then do what the click does. The open card is the scene variable `toolMenu` ("slideshow" |
 * "meet"); `headerTip` is "meet" (the meeting icon's tooltip) or "cast" (the greyed Chromecast row's tooltip).
 */

export type HeaderMenu = "slideshow" | "meet";
export type HeaderRow = "ss-presenter" | "ss-beginning" | "ss-chromecast" | "ss-options" | "mt-product" | "mt-start" | "mt-code";

const BUTTON: Record<HeaderMenu, string> = { slideshow: "[data-tl=slideshow-arrow]", meet: "[data-tl=header-meet]" };
const row = (id: HeaderRow) => `[data-tl=${id}]`;

/** Move onto the meeting icon and hover it: its tooltip shows. */
export async function pointAtMeet(tl: Timeline, ms = 800) {
  await tl.moveCursorTo(BUTTON.meet, { ms });
  tl.hover(BUTTON.meet);
  tl.setVar("headerTip", "meet");
}

/** Click the Slideshow arrow or the meeting icon and open its card. */
export async function openHeader(tl: Timeline, menu: HeaderMenu, opts: { ms?: number } = {}) {
  await pressOn(tl, BUTTON[menu], { ms: opts.ms ?? 700 });
  tl.setVar("headerTip", "");
  tl.setVar("toolMenu", menu);
  await tl.wait(120);
}

export function closeHeader(tl: Timeline) {
  tl.hover(null);
  tl.setVar("headerTip", "");
  tl.setVar("toolMenu", "");
}

/** Move onto a row of the open card and hover it (the greyed Chromecast row shows its "Coming soon" tooltip). */
export async function hoverHeaderRow(tl: Timeline, id: HeaderRow, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(row(id), { ms: opts.ms ?? 350, dx: -20 });
  tl.hover(row(id));
  tl.setVar("headerTip", id === "ss-chromecast" ? "cast" : "");
}

/* ------------------------------------------------------- what a row does */

/** Presenter view: the dark screen opens on the selected slide and its timer starts. */
export function startPresenter(tl: Timeline) {
  tl.setVar("presenterSlide", getSlideIndex(tl));
  tl.setVar("presenterSeconds", 0);
  tl.setVar("presenter", true);
  (async () => {
    for (let s = 1; s <= 600 && tl.getVar<boolean>("presenter", false); s++) {
      await tl.wait(1000);
      tl.setVar("presenterSeconds", s);
    }
  })().catch(() => {}); // cancelled with the step
}

/** Start from beginning: full screen from the first slide that is not skipped. */
export function startFromBeginning(tl: Timeline) {
  tl.setVar("fsSlide", playableSlides(getSlides(tl))[0] ?? 0);
  enterFullScreen(tl);
}

export const openDisplayOptions = (tl: Timeline) => tl.setVar("dialog", "displayOptions");

export const startMeeting = (tl: Timeline) => showDocToast(tl, MEETING.startToast, "success", 3200);

export function openMeetingCode(tl: Timeline) {
  tl.setVar("field:meetcode", "");
  tl.setVar("focus", "");
  tl.setVar("dialog", "meetCode");
}

const HEADER_ACTIONS: Partial<Record<HeaderRow, (tl: Timeline) => void>> = {
  "ss-presenter": startPresenter,
  "ss-beginning": startFromBeginning,
  "ss-options": openDisplayOptions,
  "mt-start": startMeeting,
  "mt-code": openMeetingCode,
};

/** Move onto a row, ring it, click it, close the card and do what the row does. */
export async function chooseHeaderRow(tl: Timeline, id: HeaderRow, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(row(id), { ms: opts.ms ?? 450, dx: -20 });
  tl.hover(row(id));
  tl.highlight(row(id));
  await tl.wait(150);
  await tl.click(row(id));
  tl.clearHighlight();
  closeHeader(tl);
  HEADER_ACTIONS[id]?.(tl);
}
