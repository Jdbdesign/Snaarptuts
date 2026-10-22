import type { Timeline } from "@/lib/timeline";
import { providerSlug } from "./dns/DnsModal";
import { CAPTIONS, MODAL } from "./dns-data";

/** Snaarp Mail, step 5 - Review your DNS records. Times are active milliseconds from the start of the step. */
export const STEP5_DURATION_MS = 31600;

const PANEL = "[data-tl=content-panel]";
const option = (label: string) => `[data-tl=option-provider-${providerSlug(label)}]`;

export async function runStep5(tl: Timeline) {
  tl.placeCursor(0.7, 0.4);
  tl.setVar("intro", 1); // page fades in

  // Overview
  await tl.at(1000);
  tl.showCaption(CAPTIONS.overview);
  tl.highlight("[data-tl=dns-heading]");
  await tl.at(2800);
  tl.clearHighlight();

  // Scroll slowly through the five cards; copy one value on the way
  await tl.at(3000);
  tl.showCaption(CAPTIONS.fields);
  await tl.scrollPanelTo(PANEL, "[data-tl=card-cname]", 2000, { margin: 60 });
  await tl.moveCursorTo("[data-tl=copy-cname-host]", { ms: 800 });
  await tl.wait(300);
  await tl.click("[data-tl=copy-cname-host]"); // a small "Copied" tooltip shows for a second
  await tl.wait(900);
  await tl.scrollPanelTo(PANEL, "bottom", 5200);

  // Back to the top
  await tl.at(13000);
  await tl.scrollPanelTo(PANEL, "top", 1200);

  // Publish automatically: open the modal
  await tl.at(14500);
  tl.showCaption(CAPTIONS.publish);
  await tl.moveCursorTo("[data-tl=cta-publish]", { ms: 800 });
  tl.highlight("[data-tl=cta-publish]");
  await tl.wait(300);
  await tl.click("[data-tl=cta-publish]");
  tl.clearHighlight();

  // Provider select: show the options, keep Manual Setup
  await tl.at(18000);
  tl.showCaption(CAPTIONS.manual);
  await tl.moveCursorTo("[data-tl=select-provider]", { ms: 800 });
  await tl.click("[data-tl=select-provider]"); // the list opens
  await tl.wait(400);
  for (const p of MODAL.providers.slice(1)) {
    await tl.moveCursorTo(option(p), { ms: 450, dx: 40 });
    tl.hover(option(p));
    await tl.wait(450);
  }
  await tl.moveCursorTo(option(MODAL.providers[0]), { ms: 600, dx: 40 });
  tl.hover(option(MODAL.providers[0]));
  await tl.wait(500);
  await tl.click(option(MODAL.providers[0])); // the list closes, Manual Setup stays
  tl.hover(null);

  // Close the modal
  await tl.at(25000);
  await tl.moveCursorTo("[data-tl=modal-close]", { ms: 800 });
  await tl.wait(300);
  await tl.click("[data-tl=modal-close]");

  await tl.at(27000);
  tl.showCaption(CAPTIONS.next);

  // Quick white fade-out
  await tl.at(31000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP5_DURATION_MS);
}
