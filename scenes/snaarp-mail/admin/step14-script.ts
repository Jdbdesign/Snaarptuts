import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "@/scenes/snaarp-admin/script-helpers";
import { CAPTIONS, SIGNATURE, URL_ADMIN_USERS } from "./data";

/** Snaarp Mail admin, step 14 - Manage a user's signature (Alex Morgan). */
export const STEP14_DURATION_MS = 40000;

export async function runStep14(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_ADMIN_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.sigMenu);
  await press(tl, "[data-tl=mu-actions-alex]", { ms: 1100 });
  await hoverOn(tl, "[data-tl=mu-action-aliases]", { ms: 800, hold: 300 });
  await hoverOn(tl, "[data-tl=mu-action-signature]", { ms: 500, hold: 500 });
  await tl.click("[data-tl=mu-action-signature]");
  tl.hover(null);
  await tl.wait(1500);

  await tl.at(7500);
  tl.showCaption(CAPTIONS.sigTypeOne);
  await tl.fill("[data-tl=field-sig-one]", "sig-one", SIGNATURE.sample("Alex Morgan"), { moveMs: 1000, msPerChar: 80 });
  tl.setVar("focus", "");
  await tl.wait(800);

  await tl.at(19000);
  tl.showCaption(CAPTIONS.sigPreview);
  await tl.scrollPanelTo("[data-tl=sg-scroll]", "bottom", 900);
  tl.highlight("[data-tl=sg-preview]");
  await tl.moveCursorTo("[data-tl=sg-preview]", { ms: 800 });
  await tl.wait(3200);
  tl.clearHighlight();

  await tl.at(28500);
  tl.showCaption(CAPTIONS.sigSave);
  await press(tl, "[data-tl=btn-sg-save]", { ms: 1000 });
  await tl.wait(2500);
  await tl.at(STEP14_DURATION_MS);
}
