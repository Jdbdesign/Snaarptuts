import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  typeIntoVar,
  hoverOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS, INITIAL_ORGANIZATIONS, type Organization } from "@/components/lock/lock-data";

export const STEP8_DURATION_MS = 13500;

export async function runStep8(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.45, 0.25], 8);

  // Beat 1: Navigate to Organizations
  await tl.at(400);
  tl.showCaption("Click Organizations in the left menu.");
  await pressOn(tl, "[data-tl=nav-lock-orgs]");
  tl.setVar("lockView", "organizations");
  tl.setUrl(LOCK_URLS.organizations);
  await tl.wait(600);

  // Beat 2: Click + Create Organization
  await tl.at(2600);
  tl.showCaption("Click Create Organization to collaborate with your team.");
  await pressOn(tl, "[data-tl=btn-create-org]");
  tl.setVar("lockCreateOrgOpen", true);
  await tl.wait(500);

  // Beat 3: Type Acme Studio into the name input
  await tl.at(4800);
  tl.showCaption("Enter the organization name.");
  await pressOn(tl, "[data-tl=input-org-name]");
  await typeIntoVar(tl, "[data-tl=input-org-name]", "lockCreateOrgName", "Acme Studio", {
    msPerChar: 60,
  });
  await tl.wait(400);

  // Beat 4: Submit Create Organization
  await tl.at(7600);
  tl.showCaption("Click Create.");
  await pressOn(tl, "[data-tl=btn-submit-org]");

  // Update orgs list with new organization first
  const newOrg: Organization = {
    id: "org-acme-studio",
    name: "Acme Studio",
    memberCount: 1,
    date: "Today",
    members: [
      {
        id: "mem-owner",
        email: "jane@example.com",
        role: "Owner",
      },
    ],
  };
  tl.setVar("lockOrgs", [newOrg, ...INITIAL_ORGANIZATIONS]);
  tl.setVar("lockCreateOrgOpen", false);
  tl.setVar("lockCreateOrgName", "");
  tl.setVar("lockToast", "Organization created successfully");
  await tl.wait(800);

  // Beat 5: Notice new card appears first
  await tl.at(10000);
  tl.showCaption("Acme Studio is now created and appears first in your list.");
  await hoverOn(tl, "[data-tl=org-card-studio]");
  await tl.wait(1500);

  // Finish
  await tl.at(12200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
