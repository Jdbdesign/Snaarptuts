import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, ORG, SAMPLE, slug } from "./org-data";

/** Snaarp Mail, step 3 - Organization details. Times are active milliseconds from the start of the step. */
export const STEP3_DURATION_MS = 24400;

const PANEL = "[data-tl=content-panel]";
const option = (id: string, label: string) => `[data-tl=option-${id}-${slug(label)}]`;

/** Open a select, hover a couple of other options, then pick one. */
async function pickFromList(tl: Timeline, id: string, hovers: string[], pick: string) {
  await tl.moveCursorTo(`[data-tl=select-${id}]`, { ms: 700 });
  await tl.click(`[data-tl=select-${id}]`); // the list opens
  await tl.wait(350);
  for (const h of hovers) {
    await tl.moveCursorTo(option(id, h), { ms: 380, dx: 40 });
    tl.hover(option(id, h));
    await tl.wait(260);
  }
  await tl.moveCursorTo(option(id, pick), { ms: 380, dx: 40 });
  tl.hover(option(id, pick));
  await tl.wait(260);
  await tl.click(option(id, pick)); // the list closes
  tl.hover(null);
}

export async function runStep3(tl: Timeline) {
  tl.placeCursor(0.62, 0.3);
  tl.setVar("intro", 1); // sidebar and card fade in; Organization Name is already filled

  // Organization name
  await tl.at(1000);
  tl.showCaption(CAPTIONS.name);
  tl.highlight("[data-tl=field-name]");
  await tl.at(2600);
  tl.clearHighlight();

  // Industry
  await tl.at(2800);
  tl.showCaption(CAPTIONS.industry);
  await pickFromList(tl, "industry", ["Healthcare", "Finance"], SAMPLE.industry);

  // Company size
  await tl.at(6400);
  tl.showCaption(CAPTIONS.size);
  await pickFromList(tl, "size", ["11-50 employees"], SAMPLE.size);

  // Optional fields
  await tl.at(10400);
  tl.showCaption(CAPTIONS.optional);
  await tl.scrollPanelTo(PANEL, "[data-tl=field-website]", 500, { margin: 60 });
  await tl.fill("[data-tl=field-website]", "website", SAMPLE.website, { moveMs: 700, msPerChar: 65 });

  await tl.at(13600);
  await tl.scrollPanelTo(PANEL, "[data-tl=field-phone]", 500, { margin: 60 });
  await tl.fill("[data-tl=field-phone]", "phone", SAMPLE.phone, { moveMs: 600, msPerChar: 65 });

  await tl.at(17000);
  await tl.scrollPanelTo(PANEL, "[data-tl=field-address]", 500, { margin: 60 });
  await tl.fill("[data-tl=field-address]", "address", SAMPLE.address, { moveMs: 600, msPerChar: 65 });

  // Continue
  await tl.at(20400);
  tl.showCaption(CAPTIONS.next);
  await tl.scrollPanelTo(PANEL, "[data-tl=cta-continue]", 500, { margin: 60 });
  await tl.moveCursorTo("[data-tl=cta-continue]", { ms: 700 });
  tl.highlight("[data-tl=cta-continue]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-continue]");
  tl.clearHighlight();
  tl.setVar("saving", true);
  await tl.wait(500);
  tl.toast(ORG.toast, 3000);

  // Quick white fade-out
  await tl.at(23800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP3_DURATION_MS);
}
