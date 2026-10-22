import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SAMPLE } from "./domain-data";

/** Snaarp Mail, step 4 - Connect your domain. Times are active milliseconds from the start of the step. */
export const STEP4_DURATION_MS = 20600;

const PANEL = "[data-tl=content-panel]";

export async function runStep4(tl: Timeline) {
  tl.placeCursor(0.62, 0.55);
  tl.setVar("intro", 1); // Screen A fades in

  // Screen A: use an existing domain
  tl.showCaption(CAPTIONS.choose);
  tl.highlight("[data-tl=card-existing]");
  await tl.at(3000);
  tl.clearHighlight();
  await tl.moveCursorTo("[data-tl=cta-add-domain]", { ms: 800 });
  tl.highlight("[data-tl=cta-add-domain]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-add-domain]");
  tl.clearHighlight();

  // Screen B: type the domain
  await tl.at(5000);
  tl.setVar("screen", "b");
  tl.setVar("focus", "domain"); // the input is focused when the screen opens
  tl.showCaption(CAPTIONS.enter);
  await tl.wait(100); // let the screen render before measuring
  await tl.fill("[data-tl=field-domain]", "domain", SAMPLE.domain, { moveMs: 800, msPerChar: 150 });

  await tl.at(11000);
  tl.showCaption(CAPTIONS.add);
  await tl.scrollPanelTo(PANEL, "[data-tl=cta-add-new]", 400, { margin: 60 });
  await tl.moveCursorTo("[data-tl=cta-add-new]", { ms: 700 });
  tl.highlight("[data-tl=cta-add-new]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-add-new]");
  tl.clearHighlight();

  // Screen C: success
  await tl.at(13400);
  tl.setVar("screen", "c");
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.added);

  await tl.at(17500);
  tl.showCaption(CAPTIONS.proceed);
  await tl.wait(100);
  await tl.scrollPanelTo(PANEL, "[data-tl=cta-proceed]", 400, { margin: 60 });
  await tl.moveCursorTo("[data-tl=cta-proceed]", { ms: 700 });
  tl.highlight("[data-tl=cta-proceed]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-proceed]");
  tl.clearHighlight();

  // Quick white fade-out
  await tl.at(20000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP4_DURATION_MS);
}
