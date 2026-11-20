import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";
import { INITIAL_APPROVAL_REQUESTS, type CrmApprovalItem } from "@/components/crm/crm-data";

export const STEP29_DURATION_MS = 18000;

export async function runStep29(tl: Timeline) {
  beginCrm(tl, "crm-approval-management", {
    activeNav: "my-requests",
    approvalRequests: INITIAL_APPROVAL_REQUESTS,
    pendingCount: 1,
    allCount: 2,
    approvalTab: "pending",
  });

  // Beat 1: Attempt approval as non-approver -> triggers permission error toast
  await tl.at(400);
  tl.showCaption("Attempt approval as non-approver to test permission enforcement.");
  await pressOn(tl, "[data-tl=crm-approval-approve-btn]");
  tl.setVar("crm:toast", {
    id: "crm-toast-permission-error",
    message: "You are not the current approver for this request",
    isError: true,
  });
  await tl.wait(1800);

  // Beat 2: Reject request -> updates badge to Rejected and shows toast
  await tl.at(4200);
  tl.showCaption("Reject the pending request.");
  await pressOn(tl, "[data-tl=crm-approval-reject-btn]");
  const rejectedRequests: CrmApprovalItem[] = INITIAL_APPROVAL_REQUESTS.map((r) =>
    r.id === "appr-1" ? { ...r, status: "Rejected" as const } : r
  );
  tl.setVar("crm:approvalRequests", rejectedRequests);
  tl.setVar("crm:toast", {
    id: "crm-toast-rejected",
    message: "Rejected",
  });
  await tl.wait(1800);

  // Beat 3: Switch to All tab to review all approval records
  await tl.at(8200);
  tl.showCaption("Switch to All tab to review all approval records.");
  await pressOn(tl, "[data-tl=crm-approvals-tab-all]");
  tl.setVar("crm:approvalTab", "all");
  await tl.wait(1800);

  // Beat 4: Switch back to Pending tab -> 0 pending requests & empty state
  await tl.at(12200);
  tl.showCaption("Switch back to Pending tab.");
  await pressOn(tl, "[data-tl=crm-approvals-tab-pending]");
  tl.setVar("crm:approvalTab", "pending");
  tl.setVar("crm:pendingCount", 0);
  tl.setVar("crm:approvalRequests", []);
  await tl.wait(1000);

  // Beat 5: Review final empty state
  await tl.at(14800);
  tl.showCaption("No pending approvals remain in the queue.");
  await hoverOn(tl, "[data-tl=crm-approvals-empty-state]", { ms: 600 });
  await tl.wait(1500);

  await finishCrm(tl);
}
