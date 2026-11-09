import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  typeIntoVar,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS } from "@/components/lock/lock-data";

export const STEP4_DURATION_MS = 16500;

export async function runStep4(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.15, 0.25], 4);

  // Beat 1: Navigate to Vaults
  await tl.at(400);
  tl.showCaption("Click Vaults in the left navigation to view all your credential vaults.");
  await pressOn(tl, "[data-tl=nav-lock-vaults]");
  tl.setVar("lockView", "vaults");
  tl.setUrl(LOCK_URLS.vaults);
  await tl.wait(400);

  // Beat 2: Open Social Vault
  await tl.at(2800);
  tl.showCaption("Click Social Vault to explore its stored credentials.");
  await pressOn(tl, "[data-tl=vault-card-social-vault]");
  tl.setVar("lockSelectedVaultId", "social-vault");
  tl.setVar("lockView", "vault-items");
  tl.setUrl(LOCK_URLS.socialVault);
  await tl.wait(400);

  // Beat 3: Filter chips
  await tl.at(5600);
  tl.showCaption("Filter by credential category: All, Login, or Secure Note.");
  await pressOn(tl, "[data-tl=filter-chip-login]");
  tl.setVar("lockItemsFilter", "login");
  await tl.wait(500);
  await pressOn(tl, "[data-tl=filter-chip-all]");
  tl.setVar("lockItemsFilter", "all");
  await tl.wait(400);

  // Beat 4: Return to Vaults
  await tl.at(8800);
  tl.showCaption("Click the back arrow to return to the Vaults directory.");
  await pressOn(tl, "[data-tl=btn-vault-back]");
  tl.setVar("lockView", "vaults");
  tl.setUrl(LOCK_URLS.vaults);
  await tl.wait(400);

  // Beat 5: Click + New Vault
  await tl.at(11000);
  tl.showCaption("Click + New Vault to organize a new category of credentials.");
  await pressOn(tl, "[data-tl=btn-new-vault]");
  tl.setVar("lockCreatingVault", true);
  await tl.wait(400);

  // Beat 6: Type vault name & submit
  await tl.at(13000);
  tl.showCaption("Enter Personal Lock and click Create.");
  await typeIntoVar(tl, "[data-tl=input-new-vault-name]", "lockCreateVaultName", "Personal Lock", {
    msPerChar: 45,
  });
  await pressOn(tl, "[data-tl=btn-submit-create-vault]");
  await tl.wait(1000);

  // Finish
  await tl.at(15800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
