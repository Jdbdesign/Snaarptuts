import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";
import { INITIAL_TEAM_MEMBERS } from "@/components/crm/crm-data";

export const STEP30_DURATION_MS = 22000;

export async function runStep30(tl: Timeline) {
  beginCrm(tl, "crm-system-admin-overview", {
    isSystemAdmin: true,
    activeSysNav: "overview",
  });
  tl.setUrl("crm.snaarp.com/admin/overview");

  // Beat 1: Review overall system analytics
  await tl.at(400);
  tl.showCaption("Review overall system performance metrics across all sales reps.");
  await hoverOn(tl, "[data-tl=crm-sys-kpi-contacts]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Inspect salesperson performance table
  await tl.at(3200);
  tl.showCaption("Review key metrics broken down by individual salesperson.");
  await hoverOn(tl, "[data-tl=crm-sys-rep-table]", { ms: 700 });
  await tl.wait(1800);

  // Beat 3: Switch to Team Members in System Admin navigation
  await tl.at(6800);
  tl.showCaption("Click Team Members to manage organization users and roles.");
  await pressOn(tl, "[data-tl=crm-sys-nav-team]");
  tl.setVar("crm:activeSysNav", "team");
  tl.setUrl("crm.snaarp.com/admin/team");
  await tl.wait(1500);

  // Beat 4: Inspect team members directory
  await tl.at(10500);
  tl.showCaption("Inspect team member departments, account roles, and CRM access levels.");
  await hoverOn(tl, "[data-tl=crm-team-table]", { ms: 700 });
  await tl.wait(1500);

  // Beat 5: Change Sam Taylor's role to Viewer
  await tl.at(14000);
  tl.showCaption("Change Sam Taylor's CRM access role to Viewer.");
  await pressOn(tl, "[data-tl=crm-team-access-dropdown]");
  const updated = INITIAL_TEAM_MEMBERS.map((m) =>
    m.id === "sam-taylor" ? { ...m, crmAccess: "Viewer" } : m
  );
  tl.setVar("crm:teamMembers", updated);
  tl.setVar("crm:toast", {
    id: "crm-toast-role-updated",
    message: "Role updated for Sam Taylor",
  });
  await tl.wait(2000);

  // Beat 6: Conclude step
  await tl.at(19500);
  tl.showCaption("Role updated successfully.");
  await finishCrm(tl);
}
