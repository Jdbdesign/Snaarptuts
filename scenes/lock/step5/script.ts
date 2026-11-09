import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  typeIntoVar,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS, INITIAL_VAULTS, type Vault } from "@/components/lock/lock-data";

export const STEP5_DURATION_MS = 22000;

export async function runStep5(tl: Timeline) {
  beginLock(tl, LOCK_URLS.vaults, "vaults", [0.45, 0.35], 5);

  const initialVaultsWithPersonal: Vault[] = [
    ...INITIAL_VAULTS,
    {
      id: "personal-lock",
      name: "Personal Lock",
      itemCount: 0,
      date: "Today",
      items: [],
    },
  ];
  tl.setVar("lockVaults", initialVaultsWithPersonal);

  // Beat 1: Open Personal Lock
  await tl.at(400);
  tl.showCaption("Click Personal Lock to open your new empty vault.");
  await pressOn(tl, "[data-tl=vault-card-personal-lock]");
  tl.setVar("lockSelectedVaultId", "personal-lock");
  tl.setVar("lockView", "vault-items");
  tl.setUrl(LOCK_URLS.personalLock);
  await tl.wait(400);

  // Beat 2: Click Add First Item
  await tl.at(2800);
  tl.showCaption("Click + Add First Item to store your login credentials.");
  await pressOn(tl, "[data-tl=btn-add-first-item]");
  tl.setVar("lockAddModalOpen", true);
  tl.setVar("lockAddModalType", "login");
  await tl.wait(400);

  // Beat 3: Fill Login Form
  await tl.at(5000);
  tl.showCaption("Enter the credential title, website URL, username, and password.");
  await typeIntoVar(tl, "[data-tl=input-login-title]", "lockAddTitle", "Google", { msPerChar: 40 });
  await typeIntoVar(tl, "[data-tl=input-login-url]", "lockAddUrl", "www.google.com", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-login-username]", "lockAddUsername", "jane@example.com", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-login-password]", "lockAddPassword", "SecretPass123", { msPerChar: 25 });
  await typeIntoVar(tl, "[data-tl=input-login-notes]", "lockAddNotes", "Personal account", { msPerChar: 25 });
  await tl.wait(400);

  // Beat 4: Save to Vault
  await tl.at(11000);
  tl.showCaption("Click Save to Vault.");
  await pressOn(tl, "[data-tl=btn-modal-save]");
  await tl.wait(1000);

  // Beat 5: Click credential card to edit
  await tl.at(13500);
  tl.showCaption("Click the newly saved credential card to view or edit its details.");
  await pressOn(tl, "[data-tl^=item-card-]");
  await tl.wait(500);

  // Beat 6: Update title and URL
  await tl.at(16000);
  tl.showCaption("Update the title to GitHub and the URL to the repository.");
  await typeIntoVar(tl, "[data-tl=input-edit-title]", "lockEditTitle", "GitHub", { msPerChar: 40 });
  await typeIntoVar(tl, "[data-tl=input-edit-url]", "lockEditUrl", "https://github.com/example/sample", { msPerChar: 30 });
  await tl.wait(400);

  // Beat 7: Click Save
  await tl.at(19500);
  tl.showCaption("Click Save to apply your changes.");
  await pressOn(tl, "[data-tl=btn-edit-save]");
  await tl.wait(1000);

  // Finish
  await tl.at(21400);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
