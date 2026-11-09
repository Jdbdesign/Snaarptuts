import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  typeIntoVar,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS, INITIAL_VAULTS, type Vault } from "@/components/lock/lock-data";

export const STEP6_DURATION_MS = 28000;

export async function runStep6(tl: Timeline) {
  beginLock(tl, LOCK_URLS.personalLock, "vault-items", [0.85, 0.15], 6);

  const initialVaultsWithGitHub: Vault[] = [
    ...INITIAL_VAULTS,
    {
      id: "personal-lock",
      name: "Personal Lock",
      itemCount: 1,
      date: "Today",
      items: [
        {
          id: "item-github",
          type: "login",
          title: "GitHub",
          subtitle: "https://github.com/example/sample",
          websiteUrl: "https://github.com/example/sample",
          username: "jane@example.com",
          password: "Sample-Pass-123",
          notes: "Just for personal use",
        },
      ],
    },
  ];
  tl.setVar("lockVaults", initialVaultsWithGitHub);
  tl.setVar("lockSelectedVaultId", "personal-lock");

  // === 1. Add Secure Note ===
  await tl.at(400);
  tl.showCaption("Click + Add Item to store a Secure Note.");
  await pressOn(tl, "[data-tl=btn-add-item]");
  tl.setVar("lockAddModalOpen", true);
  await tl.wait(400);

  await tl.at(2500);
  tl.showCaption("Select Note and enter your confidential text.");
  await pressOn(tl, "[data-tl=tab-type-note]");
  tl.setVar("lockAddModalType", "note");
  await typeIntoVar(tl, "[data-tl=input-note-title]", "lockAddTitle", "Certification Passwords", {
    msPerChar: 35,
  });
  await typeIntoVar(
    tl,
    "[data-tl=input-note-content]",
    "lockAddContent",
    "Keep the API keys and server certificates secure.",
    { msPerChar: 25 }
  );
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-modal-save]");
  await tl.wait(800);

  // === 2. Add Credit Card ===
  await tl.at(8800);
  tl.showCaption("Click + Add Item again to add a Credit Card.");
  await pressOn(tl, "[data-tl=btn-add-item]");
  tl.setVar("lockAddModalOpen", true);
  await tl.wait(400);

  await tl.at(10800);
  tl.showCaption("Select Card and enter card details: cardholder, number, expiry, and CVV.");
  await pressOn(tl, "[data-tl=tab-type-card]");
  tl.setVar("lockAddModalType", "card");
  await typeIntoVar(tl, "[data-tl=input-card-title]", "lockAddCardName", "Mastercard", { msPerChar: 35 });
  await typeIntoVar(tl, "[data-tl=input-card-holder]", "lockAddCardholder", "Jane Doe", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-card-number]", "lockAddCardNumber", "4242 4242 4242 4242", { msPerChar: 25 });
  await typeIntoVar(tl, "[data-tl=input-card-month]", "lockAddMonth", "12", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-card-year]", "lockAddYear", "2028", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-card-cvv]", "lockAddCvv", "123", { msPerChar: 30 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-modal-save]");
  await tl.wait(800);

  // === 3. Add Identity ===
  await tl.at(18000);
  tl.showCaption("Click + Add Item once more to store an Identity profile.");
  await pressOn(tl, "[data-tl=btn-add-item]");
  tl.setVar("lockAddModalOpen", true);
  await tl.wait(400);

  await tl.at(20000);
  tl.showCaption("Select Identity and fill in personal details and contact info.");
  await pressOn(tl, "[data-tl=tab-type-identity]");
  tl.setVar("lockAddModalType", "identity");
  await typeIntoVar(tl, "[data-tl=input-id-title]", "lockAddIdName", "Voter Card", { msPerChar: 35 });
  await typeIntoVar(tl, "[data-tl=input-id-first-name]", "lockAddFirstName", "Jane", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-id-last-name]", "lockAddLastName", "Doe", { msPerChar: 30 });
  await typeIntoVar(tl, "[data-tl=input-id-email]", "lockAddEmail", "jane@example.com", { msPerChar: 25 });
  await typeIntoVar(tl, "[data-tl=input-id-phone]", "lockAddPhone", "+44 7700 900123", { msPerChar: 25 });
  await typeIntoVar(tl, "[data-tl=input-id-address]", "lockAddAddress", "123 Main St, London, UK", { msPerChar: 25 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-modal-save]");
  await tl.wait(800);

  // Finish
  await tl.at(26800);
  tl.showCaption("All four credential types are now securely saved in Personal Lock.");
  await tl.wait(700);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
