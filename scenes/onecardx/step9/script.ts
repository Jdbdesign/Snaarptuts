import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP9_DURATION_MS = 13500;

export async function runStep9(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.25, 0.40]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "classic");

  // 1. Click 'Add Photo or Video'
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickAddPhoto);
  await pressOn(tl, "[data-tl=btn-add-photo]", { ms: 650 });
  await tl.wait(200);

  // 2. Click 'Choose File'
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickChooseFile);
  await pressOn(tl, "[data-tl=btn-choose-file]", { ms: 600 });
  await tl.wait(200);

  // 3. Pick portrait from in-app chooser
  await tl.at(5200);
  tl.showCaption(CAPTIONS.pickPortrait);
  await pressOn(tl, "[data-tl=picker-photo-portrait-2]", { ms: 600 });
  await tl.wait(300);

  // 4. Click 'Add Media'
  await tl.at(7600);
  tl.showCaption(CAPTIONS.clickAddMedia);
  await pressOn(tl, "[data-tl=btn-add-media]", { ms: 600 });
  tl.setVar("ocxPhotoUploading", false);
  tl.setVar("ocxPhotoModalOpen", false);
  await tl.wait(300);

  // 5. Inspect card preview
  await tl.at(10400);
  tl.showCaption(CAPTIONS.photoUpdated);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2000);

  // 6. Conclude
  await finishOneCardX(tl, STEP9_DURATION_MS);
}
