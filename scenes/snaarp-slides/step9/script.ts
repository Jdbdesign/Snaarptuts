import { DECK, EMAIL } from "@/components/slides/slides-data";
import { chooseSub, closeDialog, hoverItem, openDialog, openFileMenu, pressOn, toast, typeInto } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 9 - Email the presentation (File > Email). Starts in the editor with "Acme Studio Pitch". */
export const STEP9_DURATION_MS = 45000;

export async function runStep9(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Email > Email this file
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "email", { ms: 600 });
  await tl.at(3200);
  tl.showCaption(CAPTIONS.thisFile);
  await chooseSub(tl, "email", "file", { ms: 300 });
  openDialog(tl, "emailFile");

  await tl.at(5400);
  tl.showCaption(CAPTIONS.to);
  await typeInto(tl, "email-to", EMAIL.sample.to);

  await tl.at(8600);
  tl.showCaption(CAPTIONS.subject);
  await typeInto(tl, "email-subject", EMAIL.sample.subject(DECK.title));

  await tl.at(11600);
  tl.showCaption(CAPTIONS.message);
  await typeInto(tl, "email-msg", EMAIL.sample.message, { msPerChar: 26 });

  // Attach as PDF or PPTX
  await tl.at(17200);
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.attach);
  await pressOn(tl, "[data-tl=email-attach-pptx]", { ms: 800 });
  tl.setVar("emailAttach", "PPTX");
  await tl.wait(700);
  await pressOn(tl, "[data-tl=email-attach-pdf]", { ms: 450 });
  tl.setVar("emailAttach", "PDF");

  // Send
  await tl.at(21000);
  tl.showCaption(CAPTIONS.send);
  await pressOn(tl, "[data-tl=email-send]", { ms: 800 });
  closeDialog(tl);
  toast(tl, EMAIL.sentToast, 3000);
  tl.showCaption(CAPTIONS.sent);

  // File > Email > Email collaborators
  await tl.at(25000);
  tl.showCaption(CAPTIONS.collabOpen);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "email", { ms: 500 });
  await tl.at(28000);
  tl.showCaption(CAPTIONS.collab);
  await chooseSub(tl, "email", "collaborators", { ms: 300 });
  openDialog(tl, "emailCollab");

  await tl.at(30500);
  tl.showCaption(CAPTIONS.tick);
  const ticked: string[] = [];
  for (const id of ["alex", "sam"]) {
    await pressOn(tl, `[data-tl=collab-person-${id}]`, { ms: 700 });
    ticked.push(id);
    tl.setVar("collabChecked", [...ticked]);
    await tl.wait(500);
  }

  await tl.at(35000);
  tl.showCaption(CAPTIONS.collabMessage);
  await typeInto(tl, "collab-msg", EMAIL.sample.collabMessage, { msPerChar: 26 });

  await tl.at(40000);
  tl.setVar("focus", "");
  tl.showCaption(CAPTIONS.collabSend);
  await pressOn(tl, "[data-tl=collab-send]", { ms: 800 });
  closeDialog(tl);
  toast(tl, EMAIL.sentCollabToast(2), 3000);

  // Quick white fade
  await tl.at(43800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP9_DURATION_MS);
}
