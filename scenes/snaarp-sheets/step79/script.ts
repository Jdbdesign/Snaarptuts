import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { chooseRow, openMenu } from "@/components/sheets/edit-timeline";
import { beginFdt, flipNotif, saveNotif, setNotif, toggleSwitch } from "@/components/sheets/fdt-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 79 - Tools > Notification settings: Edit notifications on, Comment replies off, frequency Daily, Save. */
export const STEP79_DURATION_MS = 21500;

export async function runStep79(tl: Timeline) {
  beginFdt(tl, URLS.renamed);

  await tl.at(600);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 750 });
  await chooseRow(tl, "tls-notif", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=notif-dialog]", 1700);

  tl.showCaption(CAPTIONS.edits);
  await toggleSwitch(tl, "notif-toggle-edits", () => flipNotif(tl, "edits"));
  tl.showCaption(CAPTIONS.replies);
  await toggleSwitch(tl, "notif-toggle-replies", () => flipNotif(tl, "replies"));
  tl.showCaption(CAPTIONS.freq);
  await ring(tl, "[data-tl=notif-freq]", 1400);
  tl.showCaption(CAPTIONS.daily);
  await pressOn(tl, "[data-tl=notif-freq-daily]", { ms: 700, ring: false });
  setNotif(tl, { freq: "daily" });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.save);
  await pressOn(tl, "[data-tl=notif-save]", { ms: 700 });
  saveNotif(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=sheet-notice]", 1800);
  await finish(tl, 400);
}
