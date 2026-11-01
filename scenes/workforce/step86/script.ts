import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP86_DURATION_MS = 16500;

export async function runStep86(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.12, 0.65], true);
  tl.setVar("wfRecruitmentTab", "interviews");
  tl.setVar("wfSelectedEmailTemplate", "additional-docs");

  // 1. Click Email templates in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickEmailTemplates);
  await pressOn(tl, "[data-tl=nav-email-templates]", { ms: 600 });
  tl.setVar("wfPage", "email-templates");
  tl.setUrl(URLS.emailTemplates);
  await tl.wait(400);

  // 2. Ring templates list
  await tl.at(2800);
  tl.showCaption(CAPTIONS.ringTemplatesList);
  await hoverOn(tl, "[data-tl=template-list]", { ms: 500 });
  await ring(tl, "[data-tl=template-list]", 1800);

  // 3. Click Application received, then back to Additional documents
  await tl.at(5200);
  tl.showCaption(CAPTIONS.clickAppReceived);
  await pressOn(tl, "[data-tl=template-item-app-received]", { ms: 500 });
  tl.setVar("wfSelectedEmailTemplate", "app-received");
  await tl.wait(600);

  await tl.at(7000);
  tl.showCaption(CAPTIONS.clickAdditionalDocs);
  await pressOn(tl, "[data-tl=template-item-additional-docs]", { ms: 500 });
  tl.setVar("wfSelectedEmailTemplate", "additional-docs");
  await tl.wait(400);

  // 4. Scroll message and ring placeholders
  await tl.at(8800);
  tl.showCaption(CAPTIONS.scrollPlaceholders);
  await tl.scrollPanelTo("[data-scroller=template-message]", 120, { ms: 600 });
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=text-template-placeholders]", { ms: 450 });
  await ring(tl, "[data-tl=text-template-placeholders]", 1800);

  // 5. Ring preview card
  await tl.at(11600);
  tl.showCaption(CAPTIONS.ringPreview);
  await hoverOn(tl, "[data-tl=card-template-preview]", { ms: 500 });
  await ring(tl, "[data-tl=card-template-preview]", 1800);

  // 6. Hover Save template
  await tl.at(14000);
  tl.showCaption(CAPTIONS.hoverSave);
  await hoverOn(tl, "[data-tl=btn-save-template]", { ms: 500 });
  await tl.wait(600);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
