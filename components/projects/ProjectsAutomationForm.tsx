"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Plus,
  Trash2,
  GripVertical,
  Save,
} from "lucide-react";
import {
  CREATED_AUTOMATION_RULE,
  type AutomationRule,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsAutomationForm({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isAutomationFormOpen", false);
  const mode = useTimelineVar<"create" | "edit">(tl, "automationFormMode", "create");
  const name = useTimelineVar<string>(tl, "automationFormName", "");
  const trigger = useTimelineVar<string>(tl, "automationFormTrigger", "Task Created");
  const conditionsCount = useTimelineVar<number>(tl, "automationConditionsCount", 0);
  const actionsCount = useTimelineVar<number>(tl, "automationActionsCount", 1);
  const rulesList = useTimelineVar<AutomationRule[]>(tl, "automationRulesList", []);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("isAutomationFormOpen", false);
  };

  const handleAddCondition = () => {
    tl.setVar("automationConditionsCount", Math.min(5, conditionsCount + 1));
  };

  const handleAddAction = () => {
    tl.setVar("automationActionsCount", Math.min(10, actionsCount + 1));
  };

  const handleSubmit = () => {
    if (mode === "create") {
      const newRule: AutomationRule = {
        ...CREATED_AUTOMATION_RULE,
        name: name.trim() || "Assign Task to Team",
        trigger: trigger,
        conditionsCount: Math.max(1, conditionsCount),
        actionsCount: Math.max(1, actionsCount),
        enabled: true,
      };
      tl.setVar("automationRulesList", [
        ...rulesList.filter((r) => r.id !== newRule.id),
        newRule,
      ]);
      tl.setVar("isAutomationFormOpen", false);
      pushProjectsToast(tl, "Automation created", "success");
    } else {
      tl.setVar("isAutomationFormOpen", false);
      pushProjectsToast(tl, "Automation updated", "success");
    }
  };

  return (
    <div
      data-tl="automation-form-card"
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 max-w-4xl mx-auto font-sans select-none animate-in fade-in duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h2
          data-tl="automation-form-title"
          className="text-base font-bold text-gray-900 tracking-tight"
        >
          {mode === "create" ? "Create Automation" : "Edit Automation"}
        </h2>
        <button
          type="button"
          data-tl="automation-form-close-btn"
          onClick={handleClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Name */}
      <div className="space-y-1.5 text-xs">
        <label className="block text-[11px] font-semibold text-gray-700">
          <span className="text-red-500">*</span> Name
        </label>
        <input
          type="text"
          data-tl="automation-name-input"
          value={name}
          onChange={(e) => tl.setVar("automationFormName", e.target.value)}
          placeholder="Automation name"
          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs shadow-2xs"
        />
      </div>

      {/* When this happens (Trigger) */}
      <div className="space-y-1.5 text-xs">
        <label className="block text-[11px] font-semibold text-gray-700">
          <span className="text-red-500">*</span> When this happens (Trigger)
        </label>
        <div className="space-y-2">
          <div
            data-tl="automation-trigger-select"
            className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs text-gray-800 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-medium">{trigger}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conditions (optional, max 5) */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-gray-700">
            Conditions (optional, max 5)
          </label>
          <button
            type="button"
            data-tl="add-condition-btn"
            onClick={handleAddCondition}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Condition</span>
          </button>
        </div>

        {conditionsCount > 0 && (
          <div className="space-y-2 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
            {/* Condition 1 */}
            <div
              data-tl="condition-row-1"
              className="flex items-center gap-2 text-xs"
            >
              <div
                data-tl="condition-field-1"
                className="w-36 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
              >
                Priority
              </div>
              <div
                data-tl="condition-op-1"
                className="w-28 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800"
              >
                Equals
              </div>
              <div
                data-tl="condition-val-1"
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
              >
                Normal
              </div>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Condition 2 */}
            {conditionsCount >= 2 && (
              <>
                <div className="text-[10px] font-bold text-gray-400 uppercase px-1">
                  AND
                </div>
                <div
                  data-tl="condition-row-2"
                  className="flex items-center gap-2 text-xs"
                >
                  <div
                    data-tl="condition-field-2"
                    className="w-36 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                  >
                    Assignee
                  </div>
                  <div
                    data-tl="condition-op-2"
                    className="w-28 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800"
                  >
                    Contains
                  </div>
                  <div
                    data-tl="condition-val-2"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                  >
                    jane@example.com
                  </div>
                  <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* Condition 3 */}
            {conditionsCount >= 3 && (
              <>
                <div className="text-[10px] font-bold text-gray-400 uppercase px-1">
                  AND
                </div>
                <div
                  data-tl="condition-row-3"
                  className="flex items-center gap-2 text-xs"
                >
                  <div
                    data-tl="condition-field-3"
                    className="w-36 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                  >
                    Tag
                  </div>
                  <div
                    data-tl="condition-op-3"
                    className="w-28 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800"
                  >
                    Contains
                  </div>
                  <div
                    data-tl="condition-val-3"
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                  >
                    design
                  </div>
                  <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Then do this (Actions) */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-gray-700">
            Then do this (Actions) – {actionsCount}/10
          </label>
          <button
            type="button"
            data-tl="add-action-btn"
            onClick={handleAddAction}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Action</span>
          </button>
        </div>

        <div className="space-y-2 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
          {/* Action 1 */}
          <div
            data-tl="action-row-1"
            className="flex items-center gap-2 text-xs"
          >
            <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-grab" />
            <div
              data-tl="action-type-1"
              className="w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
            >
              Assign Member
            </div>
            <div
              data-tl="action-target-1"
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
            >
              jane@example.com
            </div>
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2 */}
          {actionsCount >= 2 && (
            <>
              <div className="text-[10px] font-bold text-gray-400 uppercase px-1">
                THEN
              </div>
              <div
                data-tl="action-row-2"
                className="flex items-center gap-2 text-xs"
              >
                <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-grab" />
                <div
                  data-tl="action-type-2"
                  className="w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                >
                  Set Priority
                </div>
                <div
                  data-tl="action-target-2"
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium"
                >
                  High
                </div>
                <button
                  type="button"
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          data-tl="automation-cancel-btn"
          onClick={handleClose}
          className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          data-tl="automation-submit-btn"
          onClick={handleSubmit}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{mode === "create" ? "Create Automation" : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
}
