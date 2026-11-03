import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP31_DURATION_MS = 7500;

export async function runStep31(tl: Timeline) {
  beginOneCardX(tl, URLS.idCards, "idCards", [0.45, 0.45]);
  tl.setVar("ocxUserImageModalOpen", false);

  // 1. Click Users in sidebar
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickUsers, { target: "[data-tl=nav-users]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=nav-users]", { ms: 600 });
  await tl.click("[data-tl=nav-users]");
  tl.setUrl(URLS.users);
  tl.setVar("ocxPage", "users");
  await tl.wait(200);

  // 2. Highlight Users Directory
  await tl.at(3000);
  tl.showCaption(CAPTIONS.reviewDirectory, { target: "[data-tl=users-directory-container]" });
  await hoverOn(tl, "[data-tl=users-directory-container]", { ms: 600 });
  await ring(tl, "[data-tl=users-directory-container]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP31_DURATION_MS);
}
