import { SAMPLE_IMAGES } from "./sample-images";

/*
 * Copy and sample content for the Tools menu (Spelling, Explore, Preferences) and the header buttons (Slideshow, meeting, Share)
 * of Snaarp Slides (steps 48-50 and 54-56). Menu and dropdown labels come from the recording (ref/slides/Snaarp_Slides_final.mp4);
 * what Spelling, Explore, Preferences and the presenter view show is ours (the recording shows none of it). Edit here, not in the components.
 */

export const SPELLING = {
  /** The word the step 48 start state misspells in the slide title, and its fix. */
  wrong: "serivces",
  right: "services",
  heading: "Spelling suggestion",
  ignore: "Ignore",
  toast: "Spelling fixed",
};

export const EXPLORE = {
  title: "Explore",
  placeholder: "Search ideas, images and topics",
  query: "brand identity",
  layoutsHeading: "Layout ideas",
  imagesHeading: "Images",
  topicsHeading: "Related topics",
  layouts: [
    { id: "quote", label: "Big quote", text: "Good design is good business." },
    { id: "number", label: "Key number", text: "94% of clients return" },
  ],
  images: [
    { id: "desk", name: "Studio desk", src: SAMPLE_IMAGES.desk },
    { id: "moodboard", name: "Moodboard", src: SAMPLE_IMAGES.moodboard },
    { id: "sketchbook", name: "Sketchbook", src: SAMPLE_IMAGES.sketchbook },
  ],
  topics: [
    { id: "logo", label: "Logo design" },
    { id: "colour", label: "Colour palettes" },
    { id: "type", label: "Typography" },
  ],
  insertedToast: (what: string) => `${what} added to the slide`,
};

export const PREFERENCES = {
  title: "Preferences",
  spellCheck: { label: "Automatic spelling check", hint: "Underline misspelt words as you type" },
  rulerOnOpen: { label: "Show ruler on open", hint: "Open presentations with the ruler on" },
  defaultTheme: { label: "Default theme", hint: "Used for new presentations" },
  save: "Save",
  cancel: "Cancel",
  toast: "Preferences saved",
};

export const MEETING = {
  tooltip: "Join or start a meeting",
  heading: "Join or start a meeting",
  product: "Snaarp Meeting",
  badge: "NEW",
  start: "Start a new meeting",
  code: "Use a meeting code",
  startToast: "Meeting ready (sample)",
  codeDialog: { title: "Have a meeting code?", hint: "Enter the code you were given to join the meeting.", placeholder: "Enter a code", code: "abc-defg-hij", continue: "Continue", cancel: "Cancel" },
  joinToast: "Joining the meeting (sample)",
};

export const SLIDESHOW_MENU = {
  presenter: { label: "Presenter view", hint: "Start slideshow with speaker notes and audience Q&A" },
  beginning: { label: "Start from beginning", shortcut: "Ctrl+Shift+F5" },
  chromecast: { label: "Present using Chromecast" },
  options: { label: "Presentation display options" },
};

export const PRESENTER = {
  title: "Presenter view",
  next: "Next slide",
  notes: "Speaker notes",
  timer: "Timer",
  end: "End",
  noNext: "End of the presentation",
  /** Sample notes shown in the presenter view, by slide index (the deck has three slides). */
  notesBySlide: [
    "Welcome everyone and introduce Acme Studio.",
    "Walk through the three services, one at a time.",
    "Finish with the next steps and our contact email.",
  ],
};

export const DISPLAY_OPTIONS = {
  title: "Presentation display options",
  monitorLabel: "Show the presentation on",
  monitors: [
    { id: "screen1", label: "Screen 1 (this screen)" },
    { id: "screen2", label: "Screen 2 (projector)" },
  ],
  laser: { label: "Show laser pointer", hint: "Hold the pointer button to show a red dot" },
  done: "Done",
};

export const SHARE_STEP = {
  /** The header's people count after the share (Jane Doe + Alex Morgan). */
  collaboratorsAfter: "2",
  linkToast: "Link copied",
};
