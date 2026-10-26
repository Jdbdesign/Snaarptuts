import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { SAMPLE_TITLE } from "@/components/docs/sample-document";
import { MEET } from "@/components/docs/toolbar-data";

/*
 * Snaarp Doc, step 61 - Start or join a meeting (header Meet button). All copy lives here; the card texts are in components/docs/toolbar-data.ts (MEET).
 * Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (about 0:57-1:05): the video button opens "Start new meeting" and "Join with link";
 * "Join with link" turns the card into "Have a meeting code?" with an input and a Continue button that stays grey until something is typed.
 * No meeting starts in the tutorial: a sample code is typed and a toast says the meeting is ready.
 */

export { URLS } from "./step31-data";

export const START_EDITOR = SAMPLE_EDITOR;
export const CODE = MEET.sampleCode;
export const READY = MEET.toast;

export const CAPTIONS = {
  meet: "Click the video button to meet from your document",
  menu: "Start new meeting begins a call right away",
  join: "Click Join with link to enter a code",
  code: "Type the meeting code",
  cont: "Continue turns blue, then click it",
  ready: "You are in. No real meeting starts in this lesson",
};

export const TITLE = SAMPLE_TITLE;
