import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP47_DURATION_MS = 7000;

export async function runStep47(tl: Timeline) {
  beginOneCardX(tl, URLS.emailSignatures, "emailSignatures", [0.45, 0.45]);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigStyle", 2);
  tl.setVar("ocxSigCopied", true);

  // 1. Click Mail in suite rail
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickMail);
  await hoverOn(tl, "[data-tl=suite-app-mail]", { ms: 600 });
  await pressOn(tl, "[data-tl=suite-app-mail]", { ms: 300 });
  tl.setUrl(URLS.mailInbox);
  tl.setVar("ocxPage", "mail");
  tl.setVar("ocxMailSubpage", "inbox");
  await tl.wait(150);

  // 2. Explore inbox
  await tl.at(2400);
  tl.showCaption(CAPTIONS.inboxOpened);
  await hoverOn(tl, "[data-tl=folder-inbox]", { ms: 600 });
  await ring(tl, "[data-tl=folder-inbox]", 1400);

  // 3. Highlight inbox messages list
  await tl.at(4400);
  await hoverOn(tl, "[data-tl=mail-unread-list]", { ms: 600 });
  await ring(tl, "[data-tl=mail-unread-list]", 1600);

  // 4. Finish
  await finishOneCardX(tl, STEP47_DURATION_MS);
}
