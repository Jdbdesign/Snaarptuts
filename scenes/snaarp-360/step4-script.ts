import type { Timeline } from "@/lib/timeline";
import { DOMAIN } from "./step4/step4-data";

/** Step 4 — Add and verify your domain. Times are active milliseconds from the start of the step. */
export const STEP4_DURATION_MS = 29500;

const MAIN = "[data-tl=admin-main]";

export async function runStep4(tl: Timeline) {
  // Continue exactly where step 3 stopped: cursor and ring already on "Domains", no fade.
  tl.placeCursorOn("[data-tl=menu-domains]");
  tl.highlight("[data-tl=menu-domains]");
  tl.showCaption("Open Domains from the menu");

  await tl.at(600);
  tl.hover("[data-tl=menu-domains]");
  await tl.click("[data-tl=menu-domains]"); // swaps the page to Domain Management
  tl.clearHighlight();
  tl.hover(null);

  // Empty state
  await tl.at(2200);
  tl.showCaption("You have no domains yet. Click Add Domain");
  await tl.moveCursorTo("[data-tl=btn-add-domain-empty]", { ms: 800 });
  tl.highlight("[data-tl=btn-add-domain-empty]");
  await tl.wait(350);
  await tl.click("[data-tl=btn-add-domain-empty]"); // opens the modal
  tl.clearHighlight();

  // Add Domain modal
  await tl.at(4200);
  tl.showCaption("Enter your company domain without http:// or www");
  await tl.fill("[data-tl=field-domain]", "domain", DOMAIN, { moveMs: 700 });

  await tl.at(7400);
  tl.showCaption("Keep the defaults: Primary, Manual setup and Quarantine");
  for (const id of ["category", "provider", "dmarc"]) {
    tl.highlight(`[data-tl=select-${id}]`);
    await tl.wait(650);
    tl.clearHighlight();
  }

  await tl.at(9800);
  await tl.moveCursorTo("[data-tl=btn-modal-add]", { ms: 700 });
  tl.highlight("[data-tl=btn-modal-add]");
  await tl.wait(300);
  await tl.click("[data-tl=btn-modal-add]"); // closes the modal, row + toast + counts appear
  tl.clearHighlight();

  // Domain added but pending
  await tl.at(12400);
  tl.showCaption("Your domain is added but not verified yet");
  tl.highlight("[data-tl=pill-status]");
  await tl.at(13800);
  tl.clearHighlight();

  // DNS tab
  await tl.at(14000);
  tl.showCaption("Open the DNS tab to see the records you need");
  await tl.moveCursorTo("[data-tl=tab-dns]", { ms: 700 });
  await tl.click("[data-tl=tab-dns]");

  await tl.at(16200);
  tl.showCaption("Add these MX, CNAME and TXT records at your domain provider");
  await tl.moveCursorTo("[data-tl=copy-mx-host]", { ms: 800 });
  await tl.click("[data-tl=copy-mx-host]"); // "Copied" flashes for 1 second
  await tl.wait(150);
  await tl.scrollPanelTo(MAIN, "bottom", 3600);

  // Back to Domains
  await tl.wait(200);
  tl.showCaption("Back on Domains, open the actions menu");
  await tl.scrollPanelTo(MAIN, "top", 700);
  await tl.moveCursorTo("[data-tl=tab-domains]", { ms: 600 });
  await tl.click("[data-tl=tab-domains]");

  // Actions menu
  await tl.at(23200);
  await tl.moveCursorTo("[data-tl=btn-row-actions]", { ms: 600 });
  await tl.click("[data-tl=btn-row-actions]"); // opens the menu
  await tl.wait(250);
  await tl.moveCursorTo("[data-tl=menu-item-publish]", { ms: 500 });
  tl.hover("[data-tl=menu-item-publish]");
  await tl.wait(450);
  tl.showCaption("After the records are added, choose Verify Domain");
  tl.hover(null);
  await tl.moveCursorTo("[data-tl=menu-item-verify]", { ms: 400 });
  tl.hover("[data-tl=menu-item-verify]");
  tl.highlight("[data-tl=menu-item-verify]");
  await tl.wait(350);
  await tl.click("[data-tl=menu-item-verify]"); // verified: pill, DNS status, counts, toast
  tl.clearHighlight();
  tl.hover(null);

  await tl.at(26000);
  tl.showCaption("Your domain is verified. Next, add your first user");
  await tl.at(29000);
}
