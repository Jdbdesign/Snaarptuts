import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
} from "@/components/zeus/zeus-timeline";
import {
  ZEUS_URLS,
  CEO_CONTACT_ELENA,
  CEO_CONTACT_RAVI,
} from "@/components/zeus/zeus-data";

export const STEP15_DURATION_MS = 14000;

export async function runStep15(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.exports, "exports", [0.45, 0.35], 15);

  // Setup CEO list with 2 members
  const ceoList = {
    id: "list-ceo",
    name: "CEO",
    type: "Static" as const,
    membersCount: 2,
    date: "10/11/2026",
    contacts: [CEO_CONTACT_ELENA, CEO_CONTACT_RAVI],
  };
  tl.setVar("zeusLists", [ceoList]);

  // Beat 1: Select list to export
  await tl.at(400);
  tl.showCaption("Select your CEO list to configure the export.");
  await pressOn(tl, "[data-tl=export-list-item-ceo]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Review contacts
  await tl.at(3000);
  tl.showCaption("Review your revealed contacts before exporting.");
  await hoverOn(tl, "[data-tl=export-step2-card]", { ms: 600 });
  await tl.wait(1400);

  // Beat 3: Export revealed only
  await tl.at(5800);
  tl.showCaption("Click Export revealed only to generate your file.");
  await pressOn(tl, "[data-tl=btn-export-revealed-free]", { ms: 600 });
  await tl.wait(1600);

  // Beat 4: Download export
  await tl.at(8800);
  tl.showCaption("Click Download to save your exported leads.");
  await pressOn(tl, "[data-tl=btn-download-export]", { ms: 600 });
  await tl.wait(2000);

  // Finish
  await tl.at(12800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
