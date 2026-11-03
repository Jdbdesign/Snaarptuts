import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP52_DURATION_MS = 8500;

export async function runStep52(tl: Timeline) {
  beginOneCardX(tl, URLS.mailSettings, "mail", [0.15, 0.15]);
  tl.setVar("ocxMailSubpage", "settings");
  tl.setVar("ocxMailSettingsTab", "signature");
  tl.setVar("ocxMailSigPasted", true);
  tl.setVar("ocxMailSigSaved", true);
  tl.setVar("ocxMailComposeOpen", false);

  // 1. Click Back to Mail
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickBackToMail);
  await hoverOn(tl, "[data-tl=btn-back-to-mail]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-back-to-mail]", { ms: 300 });
  tl.setUrl(URLS.mailInbox);
  tl.setVar("ocxMailSubpage", "inbox");
  await tl.wait(150);

  // 2. Click Compose
  await tl.at(2600);
  tl.showCaption(CAPTIONS.clickCompose);
  await hoverOn(tl, "[data-tl=btn-mail-compose]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-mail-compose]", { ms: 300 });
  tl.setVar("ocxMailComposeOpen", true);
  await tl.wait(150);

  // 3. Highlight signature card in draft
  await tl.at(4800);
  tl.showCaption(CAPTIONS.signatureInEmail);
  await hoverOn(tl, "[data-tl=compose-signature-card]", { ms: 600 });
  await ring(tl, "[data-tl=compose-signature-card]", 1800);

  // 4. Finish
  await finishOneCardX(tl, STEP52_DURATION_MS);
}
