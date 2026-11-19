import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP10_DURATION_MS = 34500;

export async function runStep10(tl: Timeline) {
  beginCrm(tl, "crm-tasks-comments", {
    activeNav: "prospects",
    salesOpen: true,
    hasImported: true,
  });

  // Beat 1: Open menu on prospect Alex Morgan
  await tl.at(400);
  tl.showCaption("Click the actions menu on Alex Morgan.");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 600 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(400);

  // Beat 2: Click Edit Value
  await tl.at(2800);
  tl.showCaption("Click Edit Value to adjust the deal size directly on the card.");
  await pressOn(tl, "[data-tl=crm-menu-edit-value]", { ms: 550 });
  tl.setVar("crm:editValueProspectId", "prospect-alex");
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(300);

  // Beat 3: Type 12000.00 and Save
  await tl.at(5200);
  tl.showCaption("Enter 12000.00 and click Save.");
  await pressOn(tl, "[data-tl=crm-inline-value-input]", { ms: 450 });
  await tl.typeText("crm_inline_val", "12000.00", { msPerChar: 40 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-val-save-btn]", { ms: 500 });
  tl.setVar("crm:editValueProspectId", null);
  pushCrmToast(tl, "Value updated");
  await tl.wait(500);

  // Beat 4: Open menu and click Add Task
  await tl.at(8800);
  tl.showCaption("Open the menu and click Add Task.");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 550 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=crm-menu-add-task]", { ms: 500 });
  tl.setVar("crm:addTaskProspectId", "prospect-alex");
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(300);

  // Beat 5: Enter task title and select Medium priority
  await tl.at(12200);
  tl.showCaption("Enter \"Follow up call\" and select Medium priority.");
  await pressOn(tl, "[data-tl=crm-task-title-input]", { ms: 450 });
  await tl.typeText("crm_task_title", "Follow up call", { msPerChar: 45 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-task-priority-dropdown]", { ms: 450 });
  tl.setVar("crm:isTaskPriorityOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-priority-option-medium]", { ms: 400 });
  tl.setVar("crm:taskPriority", "Medium");
  tl.setVar("crm:isTaskPriorityOpen", false);
  await tl.wait(300);

  // Beat 6: Save task
  await tl.at(16200);
  tl.showCaption("Click Save Task to schedule the reminder.");
  await pressOn(tl, "[data-tl=crm-task-save-btn]", { ms: 500 });
  tl.setVar("crm:addTaskProspectId", null);
  pushCrmToast(tl, "Task created — it will appear in Calendar");
  await tl.wait(500);
  tl.setVar("crm:isTaskReminderOpen", true);

  // Beat 7: High Priority Task Reminder Modal
  await tl.at(19500);
  tl.showCaption("Review the high-priority reminder and click Mark Done.");
  await pressOn(tl, "[data-tl=crm-reminder-mark-done]", { ms: 600 });
  tl.setVar("crm:isTaskReminderOpen", false);
  pushCrmToast(tl, "Task marked as done");
  await tl.wait(500);

  // Beat 8: Add Comment
  await tl.at(23000);
  tl.showCaption("Open the menu and click Add Comment.");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 550 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=crm-menu-add-comment]", { ms: 500 });
  tl.setVar("crm:isAddCommentOpen", true);
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(300);

  // Beat 9: Type comment text & Submit
  await tl.at(26200);
  tl.showCaption("Enter follow-up details and click Add Comment.");
  await pressOn(tl, "[data-tl=crm-comment-textarea]", { ms: 450 });
  await tl.typeText(
    "crm_comment_text",
    "Follow-up completed. Awaiting confirmation of next steps.",
    { msPerChar: 30 }
  );
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-comment-submit]", { ms: 550 });
  tl.setVar("crm:isAddCommentOpen", false);
  pushCrmToast(tl, "Comment added");
  await tl.wait(500);

  // Beat 10: View Comments
  await tl.at(30000);
  tl.showCaption("Open the menu and click View Comments to review the conversation log.");
  await pressOn(tl, "[data-tl=crm-card-dots-prospect-alex]", { ms: 550 });
  tl.setVar("crm:activeProspectMenuId", "prospect-alex");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=crm-menu-view-comments]", { ms: 500 });
  tl.setVar("crm:isViewCommentsOpen", true);
  tl.setVar("crm:activeProspectMenuId", null);
  await tl.wait(1200);
  await pressOn(tl, "[data-tl=crm-view-comments-done]", { ms: 450 });
  tl.setVar("crm:isViewCommentsOpen", false);

  await finishCrm(tl);
}
