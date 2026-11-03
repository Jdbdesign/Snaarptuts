import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP33_DURATION_MS = 7200;

export async function runStep33(tl: Timeline) {
  beginOneCardX(tl, URLS.users, "users", [0.08, 0.42]);

  // 1. Click Create Card in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreateCard);
  await pressOn(tl, "[data-tl=nav-create-card]", { ms: 600 });
  tl.setUrl(URLS.orgCards);
  tl.setVar("ocxPage", "orgCards");

  // 2. Click '+ New organization card'
  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickNewCard);
  await pressOn(tl, "[data-tl=btn-new-org-card]", { ms: 600 });
  tl.setVar("ocxNewCardModalOpen", true);

  // 3. Inspect modal
  await tl.at(3600);
  tl.showCaption(CAPTIONS.inspectModal);
  await hoverOn(tl, "[data-tl=new-card-modal]", { ms: 500 });
  await ring(tl, "[data-tl=new-card-modal]", 1400);

  // 4. Click Cancel
  await tl.at(5400);
  tl.showCaption(CAPTIONS.clickCancel);
  await pressOn(tl, "[data-tl=btn-cancel-modal]", { ms: 500 });
  tl.setVar("ocxNewCardModalOpen", false);

  // 5. Conclude
  await finishOneCardX(tl, STEP33_DURATION_MS);
}
