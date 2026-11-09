import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  hoverOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS } from "@/components/lock/lock-data";

export const STEP1_DURATION_MS = 12500;

export async function runStep1(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.45, 0.35], 1);

  // Beat 1: Welcome & Overview
  await tl.at(400);
  tl.showCaption("Welcome to Snaarp Lock, your unified password and credential manager.");
  await hoverOn(tl, "[data-tl=badge-synced]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Stat Cards
  await tl.at(2800);
  tl.showCaption("Review your security overview: Total Vaults, Secured Items, and Active Devices.");
  await hoverOn(tl, "[data-tl=stat-card-vaults]", { ms: 550 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=stat-card-items]", { ms: 450 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=stat-card-devices]", { ms: 450 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=stat-card-sync]", { ms: 450 });
  await tl.wait(1000);

  // Beat 3: Connected Devices & Recent Vaults
  await tl.at(7000);
  tl.showCaption("Check connected sessions and quickly access your recent vaults.");
  await hoverOn(tl, "[data-tl=card-connected-devices]", { ms: 600 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=card-recent-vaults]", { ms: 550 });
  await tl.wait(1000);

  // Beat 4: Sidebar Navigation
  await tl.at(9600);
  tl.showCaption("Use the left navigation to switch between Dashboard, Vaults, and Organizations.");
  await hoverOn(tl, "[data-tl=nav-lock-vaults]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=nav-lock-orgs]", { ms: 450 });
  await tl.wait(600);

  // Finish
  await tl.at(11800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
