import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP32_DURATION_MS = 7500;

export async function runStep32(tl: Timeline) {
  beginOneCardX(tl, URLS.users, "users", [0.45, 0.45]);
  tl.setVar("ocxUserImageModalOpen", false);

  // 1. Click ID Card Image on Alex Morgan
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickIdCardImage, { target: "[data-tl=btn-idcard-image-alex-morgan]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-idcard-image-alex-morgan]", { ms: 600 });
  await tl.click("[data-tl=btn-idcard-image-alex-morgan]");
  tl.setVar("ocxUserImageModalOpen", true);
  await tl.wait(200);

  // 2. Review modal options
  await tl.at(2800);
  tl.showCaption(CAPTIONS.modalOptions, { target: "[data-tl=user-image-modal]" });
  await hoverOn(tl, "[data-tl=btn-upload-user-image]", { ms: 500 });
  await ring(tl, "[data-tl=btn-upload-user-image]", 1500);

  // 3. Click Cancel to close
  await tl.at(5200);
  tl.showCaption(CAPTIONS.closeModal, { target: "[data-tl=btn-cancel-user-image]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-cancel-user-image]", { ms: 500 });
  await tl.click("[data-tl=btn-cancel-user-image]");
  tl.setVar("ocxUserImageModalOpen", false);

  // 4. Finish
  await finishOneCardX(tl, STEP32_DURATION_MS);
}
