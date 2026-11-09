import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  hoverOn,
  scrollView,
} from "@/components/lock/lock-timeline";
import {
  LOCK_URLS,
  INITIAL_VAULTS,
  CHROME_VAULT_ITEMS,
  type Vault,
} from "@/components/lock/lock-data";

export const STEP11_DURATION_MS = 13500;

export async function runStep11(tl: Timeline) {
  beginLock(tl, LOCK_URLS.chromeImport, "chrome-import", [0.45, 0.25], 11);

  const vaultsWithImported: Vault[] = [
    {
      id: "imported-from-chrome",
      name: "Imported from Chrome",
      itemCount: 142,
      date: "Today",
      items: CHROME_VAULT_ITEMS,
    },
    ...INITIAL_VAULTS,
  ];
  tl.setVar("lockVaults", vaultsWithImported);

  // Beat 1: Navigate to Vaults
  await tl.at(400);
  tl.showCaption("Click Vaults in the left menu.");
  await pressOn(tl, "[data-tl=nav-lock-vaults]");
  tl.setVar("lockView", "vaults");
  tl.setUrl(LOCK_URLS.vaults);
  await tl.wait(600);

  // Beat 2: Open the new Imported from Chrome vault
  await tl.at(2400);
  tl.showCaption("Click the new Imported from Chrome vault.");
  await pressOn(tl, "[data-tl=vault-card-chrome]");
  tl.setVar("lockSelectedVaultId", "imported-from-chrome");
  tl.setVar("lockView", "vault-items");
  tl.setUrl(LOCK_URLS.importedVault);
  await tl.wait(800);

  // Beat 3: Scroll the grid down through the items
  await tl.at(4800);
  tl.showCaption("Scroll through your imported password credentials.");
  await scrollView(tl, 400, 1000);
  await tl.wait(400);
  await scrollView(tl, 800, 1000);
  await tl.wait(400);

  // Beat 4: Hover over a credential card
  await tl.at(8800);
  tl.showCaption("Hover over an item card to inspect actions.");
  await hoverOn(tl, "[data-tl=item-card-import-25]");
  await tl.wait(1500);

  // Finish on the scrolled grid
  await tl.at(12000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
