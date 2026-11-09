import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  hoverOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS, INITIAL_VAULTS, type Vault } from "@/components/lock/lock-data";

export const STEP7_DURATION_MS = 16500;

export async function runStep7(tl: Timeline) {
  beginLock(tl, LOCK_URLS.personalLock, "vault-items", [0.45, 0.2], 7);

  const initialVaultsWith4Items: Vault[] = [
    ...INITIAL_VAULTS,
    {
      id: "personal-lock",
      name: "Personal Lock",
      itemCount: 4,
      date: "Today",
      items: [
        {
          id: "item-github",
          type: "login",
          title: "GitHub",
          subtitle: "https://github.com/example/sample",
          websiteUrl: "https://github.com/example/sample",
          username: "jane@example.com",
        },
        {
          id: "item-cert",
          type: "note",
          title: "Certification Passwords",
          subtitle: "Keep the API keys and server certificates secure.",
        },
        {
          id: "item-card",
          type: "card",
          title: "Mastercard",
          subtitle: "Jane Doe •••• 4242",
        },
        {
          id: "item-id",
          type: "identity",
          title: "Voter Card",
          subtitle: "Jane Doe",
        },
      ],
    },
  ];
  tl.setVar("lockVaults", initialVaultsWith4Items);
  tl.setVar("lockSelectedVaultId", "personal-lock");

  // Beat 1: Filter Login
  await tl.at(400);
  tl.showCaption("Click the Login filter chip to view only saved logins.");
  await pressOn(tl, "[data-tl=filter-chip-login]");
  tl.setVar("lockItemsFilter", "login");
  await tl.wait(600);

  // Beat 2: Filter Secure Note
  await tl.at(2800);
  tl.showCaption("Click the Secure Note filter chip to view your notes.");
  await pressOn(tl, "[data-tl=filter-chip-note]");
  tl.setVar("lockItemsFilter", "note");
  await tl.wait(600);

  // Beat 3: Reset filter to All
  await tl.at(5200);
  tl.showCaption("Click All to view all credentials in the vault again.");
  await pressOn(tl, "[data-tl=filter-chip-all]");
  tl.setVar("lockItemsFilter", "all");
  await tl.wait(600);

  // Beat 4: Return to Vaults
  await tl.at(7600);
  tl.showCaption("Click the back arrow to return to Vaults.");
  await pressOn(tl, "[data-tl=btn-vault-back]");
  tl.setVar("lockView", "vaults");
  tl.setUrl(LOCK_URLS.vaults);
  await tl.wait(400);

  // Beat 5: Hover and click Delete
  await tl.at(9800);
  tl.showCaption("Hover over Personal Lock and click Delete.");
  await hoverOn(tl, "[data-tl=vault-card-personal-lock]");
  await pressOn(tl, "[data-tl=btn-delete-personal-lock]");
  tl.setVar("lockDeleteConfirmId", "personal-lock");
  await tl.wait(600);

  // Beat 6: Confirm Delete
  await tl.at(12200);
  tl.showCaption("Click Delete Vault in the confirmation dialog.");
  await pressOn(tl, "[data-tl=btn-confirm-delete-vault]");
  await tl.wait(800);

  // Beat 7: Social Vault remains
  await tl.at(14200);
  tl.showCaption("The vault and its items are deleted, leaving your Social Vault intact.");
  await hoverOn(tl, "[data-tl=vault-card-social-vault]");
  await tl.wait(800);

  // Finish
  await tl.at(15800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
