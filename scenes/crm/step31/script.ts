import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";
import { INITIAL_CRM_ROLES, type CrmRoleDefinition } from "@/components/crm/crm-data";

export const STEP31_DURATION_MS = 24000;

export async function runStep31(tl: Timeline) {
  beginCrm(tl, "crm-roles-permissions", {
    isSystemAdmin: true,
    activeSysNav: "team",
  });
  tl.setUrl("crm.snaarp.com/admin/team");

  // Beat 1: Open Roles & permissions modal
  await tl.at(400);
  tl.showCaption("Click Roles & permissions to view role definitions.");
  await pressOn(tl, "[data-tl=crm-team-roles-btn]");
  tl.setVar("crm:isRolesModalOpen", true);
  tl.setVar("crm:activeRoleId", "admin");
  tl.setVar("crm:isCreatingRole", false);
  await tl.wait(1500);

  // Beat 2: Inspect Admin permissions (locked)
  await tl.at(3500);
  tl.showCaption("Review Admin role. Full access is locked and cannot be edited.");
  await hoverOn(tl, "[data-tl=crm-role-tab-admin]", { ms: 600 });
  await tl.wait(1500);

  // Beat 3: Click New role button
  await tl.at(6800);
  tl.showCaption("Click New role to define custom permissions.");
  await pressOn(tl, "[data-tl=crm-roles-new-role-btn]");
  tl.setVar("crm:isCreatingRole", true);
  await tl.wait(1200);

  // Beat 4: Type Role name "Auditor"
  await tl.at(9800);
  tl.showCaption("Enter role name Auditor.");
  await pressOn(tl, "[data-tl=crm-role-name-input]");
  await tl.typeText("[data-tl=crm-role-name-input]", "Auditor", { msPerChar: 45 });
  tl.setVar("crm:newRoleName", "Auditor");
  await tl.wait(1200);

  // Beat 5: Check Forecasts View and Create permissions
  await tl.at(13500);
  tl.showCaption("Enable View and Create permissions for Forecasts.");
  await pressOn(tl, "[data-tl=crm-perm-forecasts-view]");
  tl.setVar("crm:newRoleForecastsView", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=crm-perm-forecasts-create]");
  tl.setVar("crm:newRoleForecastsCreate", true);
  await tl.wait(1000);

  // Beat 6: Click Create role
  await tl.at(17000);
  tl.showCaption("Click Create role to save.");
  await pressOn(tl, "[data-tl=crm-create-role-submit]");
  const auditorRole: CrmRoleDefinition = {
    id: "auditor",
    name: "Auditor",
    description: "Audit role with Forecasts access",
    permissions: {
      Forecasts: ["View", "Create"],
    },
  };
  tl.setVar("crm:crmRoles", [...INITIAL_CRM_ROLES, auditorRole]);
  tl.setVar("crm:isCreatingRole", false);
  tl.setVar("crm:activeRoleId", "auditor");
  tl.setVar("crm:toast", {
    id: "crm-toast-auditor",
    message: 'Role "Auditor" created',
  });
  await tl.wait(1800);

  // Beat 7: Close modal
  await tl.at(21000);
  tl.showCaption("Close the Roles & permissions modal.");
  await pressOn(tl, "[data-tl=crm-roles-close-btn]");
  tl.setVar("crm:isRolesModalOpen", false);
  await finishCrm(tl);
}
