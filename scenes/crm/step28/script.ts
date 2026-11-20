import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP28_DURATION_MS = 21000;

export async function runStep28(tl: Timeline) {
  beginCrm(tl, "crm-create-approval", {
    activeNav: "my-requests",
    approvalRequests: [],
    pendingCount: 0,
    allCount: 0,
    approvalTab: "pending",
    isNewApprovalOpen: false,
  });

  // Beat 1: Navigate to Approvals workspace & view empty state
  await tl.at(400);
  tl.showCaption("Navigate to Approvals workspace to manage review requests.");
  await hoverOn(tl, "[data-tl=crm-approvals-empty-state]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Click New Request to open modal
  await tl.at(3600);
  tl.showCaption("Click New Request to create an approval request.");
  await pressOn(tl, "[data-tl=crm-new-approval-btn]");
  tl.setVar("crm:isNewApprovalOpen", true);
  await tl.wait(1200);

  // Beat 3: Inspect Request Type and Related To options
  await tl.at(6800);
  tl.showCaption("Select Request Type: Discount approval.");
  await pressOn(tl, "[data-tl=crm-approval-type-select]");
  await tl.wait(1200);

  // Beat 4: Select Related To Deal & Record
  await tl.at(9800);
  tl.showCaption("Set Related To: Deal and select Record: Sam Taylor.");
  await pressOn(tl, "[data-tl=crm-approval-related-select]");
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-approval-record-select]");
  await tl.wait(1000);

  // Beat 5: Choose designated approver (Finance Reviewer)
  await tl.at(13200);
  tl.showCaption("Assign designated approver role: Finance Reviewer.");
  await pressOn(tl, "[data-tl=crm-approver-check-finance-reviewer]");
  await tl.wait(1200);

  // Beat 6: Submit request & update list
  await tl.at(15800);
  tl.showCaption("Submit the approval request.");
  await pressOn(tl, "[data-tl=crm-approval-modal-submit]");
  await tl.wait(1500);

  // Beat 7: Review submitted request in pending list
  await tl.at(18500);
  tl.showCaption("Review submitted approval request pending reviewer action.");
  await hoverOn(tl, "[data-tl=crm-approvals-list]", { ms: 600 });
  await tl.wait(1500);

  await finishCrm(tl);
}
