import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, flipA11y, toggleSwitch } from "@/components/sheets/fdt-timeline";
import { closeDialog, pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 80 - Tools > Accessibility: High contrast, Large text and Reduce motion on (the sheet changes behind the panel), the quick reference, Done, then reset. */
export const STEP80_DURATION_MS = 56000;

export async function runStep80(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-access", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.reader);
  await ring(tl, "[data-tl=a11y-section-0]", 2000);

  tl.showCaption(CAPTIONS.contrast);
  await toggleSwitch(tl, "a11y-toggle-contrast", () => flipA11y(tl, "contrast"));
  tl.showCaption(CAPTIONS.large);
  await toggleSwitch(tl, "a11y-toggle-large", () => flipA11y(tl, "large"));
  tl.showCaption(CAPTIONS.motion);
  await toggleSwitch(tl, "a11y-toggle-motion", () => flipA11y(tl, "motion"));
  tl.showCaption(CAPTIONS.quick);
  await ring(tl, "[data-tl=a11y-quick]", 2000);
  tl.showCaption(CAPTIONS.done);
  await pressOn(tl, "[data-tl=a11y-done]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.effect);
  await ring(tl, "[data-tl=sheet-grid]", 2200);

  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "tools", { ms: 650 });
  await chooseRow(tl, "tls-access", { ms: 450 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.reset);
  await toggleSwitch(tl, "a11y-toggle-contrast", () => flipA11y(tl, "contrast"), 600);
  await toggleSwitch(tl, "a11y-toggle-large", () => flipA11y(tl, "large"), 500);
  await toggleSwitch(tl, "a11y-toggle-motion", () => flipA11y(tl, "motion"), 500);
  await pressOn(tl, "[data-tl=a11y-done]", { ms: 650 });
  closeDialog(tl);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.back);
  await ring(tl, "[data-tl=sheet-grid]", 1400);
  await finish(tl, 400);
}
