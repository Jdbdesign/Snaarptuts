import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS } from "@/components/lock/lock-data";

export const STEP10_DURATION_MS = 18800;

export async function runStep10(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.45, 0.25], 10);

  // Beat 1: Click Import in the sidebar
  await tl.at(400);
  tl.showCaption("Click Import in the left menu.");
  await pressOn(tl, "[data-tl=nav-lock-import]");
  tl.setVar("lockView", "import");
  tl.setUrl(LOCK_URLS.import);
  await tl.wait(600);

  // Beat 2: Select Google Chrome source card
  await tl.at(2400);
  tl.showCaption("Select Google Chrome to migrate your browser credentials.");
  await pressOn(tl, "[data-tl=card-import-chrome]");
  tl.setVar("lockView", "chrome-import");
  tl.setUrl(LOCK_URLS.chromeImport);
  await tl.wait(600);

  // Beat 3: Click drop zone to open in-app file chooser
  await tl.at(4400);
  tl.showCaption("Click the drop zone to choose your exported file.");
  await pressOn(tl, "[data-tl=dropzone-chrome]");
  tl.setVar("lockFileChooserOpen", true);
  await tl.wait(600);

  // Beat 4: Select Chrome Passwords.csv
  await tl.at(6400);
  tl.showCaption("Select Chrome Passwords.csv.");
  await pressOn(tl, "[data-tl=file-row-chrome-csv]");
  await tl.wait(500);

  // Beat 5: Click Open
  await tl.at(8000);
  tl.showCaption("Click Open.");
  await pressOn(tl, "[data-tl=btn-chooser-open]");
  tl.setVar("lockFileChooserOpen", false);
  tl.setVar("lockFileChosen", true);
  tl.setVar("lockToast", "Found 142 items to import");
  await tl.wait(800);

  // Beat 6: Scroll the table a little
  await tl.at(10200);
  tl.showCaption("Review the parsed logins in the table.");
  await tl.moveCursorTo("[data-scroller=import-table]", { ms: 600 });
  await tl.scrollPanelTo("[data-scroller=import-table]", 90, 800);
  await tl.wait(600);

  // Beat 7: Click Import 142 items
  await tl.at(12600);
  tl.showCaption("Click Import 142 items.");
  await pressOn(tl, "[data-tl=btn-run-import]");

  // Progress animation: 25% -> 60% -> 100%
  tl.setVar("lockImportProgress", 25);
  await tl.wait(700);
  tl.setVar("lockImportProgress", 60);
  await tl.wait(700);
  tl.setVar("lockImportProgress", 100);
  await tl.wait(600);

  // Result: Toast + Import Complete card
  tl.setVar("lockToast", "Successfully imported 142 items!");
  tl.setVar("lockImportComplete", true);
  await tl.wait(1500);

  // Finish
  await tl.at(17600);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
