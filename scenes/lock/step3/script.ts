import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS } from "@/components/lock/lock-data";

export const STEP3_DURATION_MS = 14000;

export async function runStep3(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.72, 0.45], 3);

  // Beat 1: Adjust length slider
  await tl.at(400);
  tl.showCaption("Adjust the password length slider to increase entropy.");
  await pressOn(tl, "[data-tl=slider-gen-length]");
  tl.setVar("lockGenLength", 20);
  await tl.wait(600);

  // Beat 2: Toggle symbols
  await tl.at(2800);
  tl.showCaption("Toggle character sets: uppercase, lowercase, numbers, or symbols.");
  await pressOn(tl, "[data-tl=check-gen-symbols]");
  tl.setVar("lockGenSymbols", false);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=check-gen-symbols]");
  tl.setVar("lockGenSymbols", true);
  await tl.wait(400);

  // Beat 3: Generate Password
  await tl.at(5600);
  tl.showCaption("Click Generate to create a randomized, high-security password.");
  await pressOn(tl, "[data-tl=btn-generate-password]");
  tl.setVar("lockGenResult", "p7#Kx9$vQ!m2Wz8L@4jF");
  await tl.wait(800);

  // Beat 4: Switch to Passphrase
  await tl.at(8200);
  tl.showCaption("Click Passphrase to generate easy-to-remember multi-word phrases.");
  await pressOn(tl, "[data-tl=tab-gen-passphrase]");
  tl.setVar("lockGenMode", "passphrase");
  await tl.wait(400);

  // Beat 5: Adjust Words & Copy
  await tl.at(10200);
  tl.showCaption("Adjust word count and click Copy to copy it directly to your clipboard.");
  await pressOn(tl, "[data-tl=slider-gen-words]");
  tl.setVar("lockGenWords", 5);
  tl.setVar("lockGenResult", "banner-correct-glacier-venture-subtle");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-copy-gen-result]");
  tl.setVar("lockToast", "Copied to clipboard");
  await tl.wait(1000);

  // Finish
  await tl.at(13200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
