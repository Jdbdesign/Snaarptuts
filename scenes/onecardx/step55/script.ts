import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP55_DURATION_MS = 6500;

export async function runStep55(tl: Timeline) {
  beginOneCardX(tl, URLS.contacts, "contacts", [0.78, 0.15]);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", true);
  tl.setVar("ocxContactPhoto", false);
  tl.setVar("ocxContactLogo", false);

  // 1. Click Photo circle
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickPhoto);
  await hoverOn(tl, "[data-tl=circle-upload-photo]", { ms: 600 });
  await pressOn(tl, "[data-tl=circle-upload-photo]", { ms: 300 });
  tl.setVar("ocxContactPhotoPickerOpen", true);
  await tl.wait(150);

  // 2. Select Portrait
  await tl.at(1800);
  tl.showCaption(CAPTIONS.selectPortrait);
  await hoverOn(tl, "[data-tl=sample-photo-alex]", { ms: 500 });
  await pressOn(tl, "[data-tl=sample-photo-alex]", { ms: 250 });
  tl.setVar("ocxContactPhoto", true);
  tl.setVar("ocxContactPhotoPickerOpen", false);
  await tl.wait(200);

  // 3. Click Logo circle
  await tl.at(3300);
  tl.showCaption(CAPTIONS.clickLogo);
  await hoverOn(tl, "[data-tl=circle-upload-logo]", { ms: 600 });
  await pressOn(tl, "[data-tl=circle-upload-logo]", { ms: 300 });
  tl.setVar("ocxContactLogoPickerOpen", true);
  await tl.wait(150);

  // 4. Select Logo
  await tl.at(4600);
  tl.showCaption(CAPTIONS.selectLogo);
  await hoverOn(tl, "[data-tl=sample-logo-acme]", { ms: 500 });
  await pressOn(tl, "[data-tl=sample-logo-acme]", { ms: 250 });
  tl.setVar("ocxContactLogo", true);
  tl.setVar("ocxContactLogoPickerOpen", false);
  await tl.wait(200);

  // 5. Finish
  await finishOneCardX(tl, STEP55_DURATION_MS);
}
