import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP6_DURATION_MS = 13000;

export async function runStep6(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.45, 0.25], 6);

  // Pre-seed search results so table is open
  tl.setVar("zeusSearchResults", true);
  tl.setVar("zeusCredits", 98);

  // Beat 1: Click Jordan Lee contact row
  await tl.at(400);
  tl.showCaption("Click Jordan Lee to open full contact details in the side drawer.");
  await pressOn(tl, "[data-tl=contact-row-jordan-lee]", { ms: 600 });
  await tl.wait(800);

  // Beat 2: Inspect drawer info
  await tl.at(2800);
  tl.showCaption("Notice the contact's title, company, and currently masked email.");
  await hoverOn(tl, "[data-tl=drawer-contact-name]", { ms: 500 });
  await tl.wait(1200);

  // Beat 3: Reveal Contact (1 credit)
  await tl.at(5200);
  tl.showCaption("Click Reveal Contact (1 credit) to unlock their verified email.");
  await pressOn(tl, "[data-tl=btn-reveal-contact]", { ms: 600 });
  await tl.wait(1200);

  // Beat 4: Verify revealed email
  await tl.at(7800);
  tl.showCaption("The verified email is revealed. Click X to close the drawer.");
  await hoverOn(tl, "[data-tl=drawer-revealed-email]", { ms: 550 });
  await tl.wait(800);
  await pressOn(tl, "[data-tl=btn-close-drawer]", { ms: 550 });
  await tl.wait(600);

  // Beat 5: Notice credits update
  await tl.at(10500);
  tl.showCaption("Notice your remaining balance is 97 credits.");
  await hoverOn(tl, "[data-tl=zeus-credits-pill]", { ms: 500 });
  await tl.wait(800);

  // Finish
  await tl.at(12200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
