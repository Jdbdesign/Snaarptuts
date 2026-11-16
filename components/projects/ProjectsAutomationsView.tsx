"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Zap,
  Plus,
  ChevronDown,
  Edit2,
  Trash2,
  X,
  History,
  LayoutTemplate,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  AUTOMATION_TEMPLATES,
  type AutomationRule,
  type AutomationTemplate,
} from "./projects-data";
import { ProjectsAutomationForm } from "./ProjectsAutomationForm";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsAutomationsView({ tl }: Props) {
  const activeTab = useTimelineVar<"rules" | "history" | "templates">(
    tl,
    "automationsActiveTab",
    "rules"
  );
  const rules = useTimelineVar<AutomationRule[]>(tl, "automationRulesList", []);
  const isFormOpen = useTimelineVar<boolean>(tl, "isAutomationFormOpen", false);
  const deleteRuleId = useTimelineVar<string | null>(tl, "deleteAutomationRuleId", null);

  const handleOpenCreate = () => {
    tl.setVar("automationFormMode", "create");
    tl.setVar("automationFormName", "");
    tl.setVar("automationFormTrigger", "Task Created");
    tl.setVar("automationConditionsCount", 0);
    tl.setVar("automationActionsCount", 1);
    tl.setVar("isAutomationFormOpen", true);
  };

  const handleToggleRule = (ruleId: string) => {
    tl.setVar(
      "automationRulesList",
      rules.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleEditRule = (rule: AutomationRule) => {
    tl.setVar("automationFormMode", "edit");
    tl.setVar("automationFormName", rule.name);
    tl.setVar("automationFormTrigger", rule.trigger);
    tl.setVar("automationConditionsCount", rule.conditionsCount);
    tl.setVar("automationActionsCount", rule.actionsCount);
    tl.setVar("isAutomationFormOpen", true);
  };

  const handleDeleteRulePrompt = (ruleId: string) => {
    tl.setVar("deleteAutomationRuleId", ruleId);
  };

  const handleConfirmDelete = () => {
    if (!deleteRuleId) return;
    tl.setVar(
      "automationRulesList",
      rules.filter((r) => r.id !== deleteRuleId)
    );
    tl.setVar("deleteAutomationRuleId", null);
    pushProjectsToast(tl, "Automation deleted", "success");
  };

  const handleUseTemplate = (tmpl: AutomationTemplate) => {
    tl.setVar("automationFormMode", "create");
    tl.setVar("automationFormName", tmpl.title);
    tl.setVar("automationFormTrigger", tmpl.trigger);
    tl.setVar("automationConditionsCount", 1);
    tl.setVar("automationActionsCount", tmpl.actionsCount);
    tl.setVar("automationsActiveTab", "rules");
    tl.setVar("isAutomationFormOpen", true);
  };

  return (
    <div
      data-tl="projects-automations-view"
      className="space-y-6 max-w-7xl mx-auto font-sans select-none pb-12"
    >
      {/* Top project dropdown */}
      <div className="flex items-center gap-2">
        <div
          data-tl="automations-project-selector"
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 shadow-2xs cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span>Explore Snaarp Projects!</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      {/* Header line */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <h1
            data-tl="automations-page-title"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            Automations
          </h1>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            data-tl="new-automation-btn"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation</span>
          </button>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          type="button"
          data-tl="auto-tab-rules"
          onClick={() => tl.setVar("automationsActiveTab", "rules")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "rules"
              ? "bg-white text-gray-900 shadow-2xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Rules</span>
        </button>
        <button
          type="button"
          data-tl="auto-tab-history"
          onClick={() => tl.setVar("automationsActiveTab", "history")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "history"
              ? "bg-white text-gray-900 shadow-2xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>
        <button
          type="button"
          data-tl="auto-tab-templates"
          onClick={() => tl.setVar("automationsActiveTab", "templates")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "templates"
              ? "bg-white text-gray-900 shadow-2xs"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          {isFormOpen ? (
            <ProjectsAutomationForm tl={tl} />
          ) : rules.length === 0 ? (
            <div
              data-tl="automations-empty-state"
              className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center space-y-2 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 fill-amber-400 text-amber-500" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                No automation rules yet. Create one to automate your workflow.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  data-tl={`auto-rule-row-${rule.id}`}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          data-tl={`auto-rule-name-${rule.id}`}
                          className="font-bold text-sm text-gray-900"
                        >
                          {rule.name}
                        </span>
                        <span
                          data-tl={`auto-rule-trigger-${rule.id}`}
                          className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200"
                        >
                          {rule.trigger}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {rule.conditionsCount} conditions &nbsp; {rule.actionsCount} actions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Toggle switch */}
                    <button
                      type="button"
                      data-tl={`auto-rule-toggle-${rule.id}`}
                      onClick={() => handleToggleRule(rule.id)}
                      className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                        rule.enabled ? "bg-[#7014D9]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          rule.enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      data-tl={`auto-rule-edit-${rule.id}`}
                      onClick={() => handleEditRule(rule)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      data-tl={`auto-rule-delete-${rule.id}`}
                      onClick={() => handleDeleteRulePrompt(rule.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div
          data-tl="automations-history-empty"
          className="bg-white border border-gray-200/90 rounded-2xl p-12 text-center space-y-2 shadow-2xs"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-3">
            <History className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            No automation history yet. History will appear here once automations run.
          </p>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div
          data-tl="automations-templates-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {AUTOMATION_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              data-tl={`automation-template-${tmpl.id}`}
              className="bg-white border border-gray-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs space-y-4 hover:border-gray-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#7014D9] bg-[#F5EEFF] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tmpl.trigger}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-gray-900">{tmpl.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">
                  {tmpl.actionsCount} action{tmpl.actionsCount > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  data-tl={`template-use-btn-${tmpl.id}`}
                  onClick={() => handleUseTemplate(tmpl)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <span>Use</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Rule Confirmation Popover/Modal */}
      {deleteRuleId && (
        <div
          data-tl="delete-automation-popover-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
        >
          <div
            data-tl="delete-automation-popover"
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Delete this automation?
              </h3>
              <button
                type="button"
                onClick={() => tl.setVar("deleteAutomationRuleId", null)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                data-tl="delete-automation-cancel"
                onClick={() => tl.setVar("deleteAutomationRuleId", null)}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="delete-automation-confirm"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
