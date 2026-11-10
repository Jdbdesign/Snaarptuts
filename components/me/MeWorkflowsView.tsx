"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  type WorkflowItem,
  INITIAL_WORKFLOWS,
  INITIAL_EXECUTION_LOGS,
  ME_URLS,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeWorkflowsView({ tl }: Props) {
  const workflows = useTimelineVar<WorkflowItem[]>(tl, "meWorkflows", INITIAL_WORKFLOWS);
  const banner = useTimelineVar<string | null>(tl, "meWorkflowBanner", null);

  const bookingWorkflows = workflows.filter((w) => w.type === "booking");
  const customWorkflows = workflows.filter((w) => w.type === "custom");

  return (
    <div data-tl="me-workflows-view" className="max-w-5xl mx-auto space-y-6 select-none">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workflows</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage booking confirmation emails, meeting reminders, and custom automation when events occur.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="me-workflows-custom-btn"
            onClick={() => {
              tl.setUrl(ME_URLS.workflowsCreateCustom);
              tl.setVar("meView", "workflows-create");
              tl.setVar("meEditorIsCustom", true);
            }}
            className="rounded-lg border border-[#7014D9] px-4 py-2 text-xs font-semibold text-[#7014D9] hover:bg-purple-50 transition-colors"
          >
            Custom workflow
          </button>

          <button
            type="button"
            data-tl="me-workflows-new-btn"
            onClick={() => {
              tl.setUrl(ME_URLS.workflowsCreate);
              tl.setVar("meView", "workflows-create");
              tl.setVar("meEditorIsCustom", false);
              tl.setVar("meWorkflowTemplatesOpen", true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Workflow</span>
          </button>
        </div>
      </div>

      {/* Inline Green Banner */}
      {banner && (
        <div
          data-tl="me-workflows-banner"
          className="rounded-lg bg-[#E6F4EA] border border-emerald-200 px-4 py-2.5 text-xs font-medium text-[#137333] flex items-center justify-between animate-fadeIn"
        >
          <span>{banner}</span>
          <button
            type="button"
            onClick={() => tl.setVar("meWorkflowBanner", null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Section 1: Booking emails & reminders */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">Booking emails &amp; reminders</h2>

        <div className="space-y-4">
          {bookingWorkflows.map((item) => (
            <div
              key={item.id}
              data-tl={`me-workflow-card-${item.id}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-gray-900">{item.name}</span>
                  <span
                    data-tl={`me-workflow-status-${item.id}`}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      item.active
                        ? "bg-[#D1FAE5] text-[#065F46]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Toggle switch */}
                  <button
                    type="button"
                    data-tl={`me-workflow-toggle-${item.id}`}
                    onClick={() => {
                      const updated = workflows.map((w) =>
                        w.id === item.id ? { ...w, active: !w.active } : w
                      );
                      tl.setVar("meWorkflows", updated);
                      const target = updated.find((w) => w.id === item.id);
                      if (target?.active) {
                        tl.setVar("meWorkflowBanner", `"${item.name}" activated.`);
                      } else {
                        tl.setVar("meWorkflowBanner", `"${item.name}" deactivated.`);
                      }
                    }}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      item.active ? "bg-[#7014D9]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        item.active ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    data-tl={`me-workflow-edit-${item.id}`}
                    onClick={() => {
                      tl.setUrl(`${ME_URLS.workflows}/${item.id}`);
                      tl.setVar("meDetailWorkflowId", item.id);
                      tl.setVar("meView", "workflow-detail");
                    }}
                    className="rounded-lg bg-[#7014D9] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5b10b0] transition-colors"
                  >
                    Edit emails
                  </button>

                  <button
                    type="button"
                    data-tl={`me-workflow-logs-${item.id}`}
                    onClick={() => {
                      tl.setUrl(`${ME_URLS.workflows}/${item.id}/executions`);
                      tl.setVar("meLogsWorkflowId", item.id);
                      tl.setVar(
                        "meWorkflowLogs",
                        item.id === "notify-me" ? [] : INITIAL_EXECUTION_LOGS
                      );
                      tl.setVar("meLogsStatusFilter", "All Statuses");
                      tl.setVar("meView", "workflow-executions");
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Logs
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-1 mb-4">{item.subtitle}</p>

              {/* Lavender Email Schedule Box */}
              {item.scheduleItems && item.scheduleItems.length > 0 && (
                <div className="rounded-lg bg-[#FBF8FE] border border-[#F3E8FF] p-4 space-y-2.5">
                  <span className="text-[10px] font-bold tracking-wider text-[#7014D9] uppercase">
                    Email Schedule
                  </span>
                  <div className="space-y-2">
                    {item.scheduleItems.map((sched, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-semibold text-white">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-gray-700">{sched}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Custom workflows */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Custom workflows</h2>
          <button
            type="button"
            data-tl="me-custom-workflows-top-btn"
            onClick={() => {
              tl.setUrl(ME_URLS.workflowsCreateCustom);
              tl.setVar("meView", "workflows-create");
              tl.setVar("meEditorIsCustom", true);
            }}
            className="rounded-lg border border-[#7014D9] px-3 py-1 text-xs font-semibold text-[#7014D9] hover:bg-purple-50 transition-colors"
          >
            Custom workflow
          </button>
        </div>

        {customWorkflows.length === 0 ? (
          <div
            data-tl="me-custom-workflows-empty"
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-3"
          >
            <p className="text-xs text-gray-600">
              Build your own automation with emails, SMS, delays, or webhooks — without starting from a template.
            </p>
            <button
              type="button"
              data-tl="me-custom-workflows-create-btn"
              onClick={() => {
                tl.setUrl(ME_URLS.workflowsCreateCustom);
                tl.setVar("meView", "workflows-create");
                tl.setVar("meEditorIsCustom", true);
              }}
              className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
            >
              Create custom workflow
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {customWorkflows.map((item) => (
              <div
                key={item.id}
                data-tl={`me-custom-workflow-card-${item.id}`}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-gray-900">{item.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        item.active
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Toggle */}
                    <button
                      type="button"
                      data-tl={`me-custom-workflow-toggle-${item.id}`}
                      onClick={() => {
                        const updated = workflows.map((w) =>
                          w.id === item.id ? { ...w, active: !w.active } : w
                        );
                        tl.setVar("meWorkflows", updated);
                      }}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.active ? "bg-[#7014D9]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          item.active ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      data-tl={`me-custom-workflow-edit-${item.id}`}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      data-tl={`me-custom-workflow-logs-${item.id}`}
                      onClick={() => {
                        tl.setUrl(`${ME_URLS.workflows}/${item.id}/executions`);
                        tl.setVar("meLogsWorkflowId", item.id);
                        tl.setVar("meView", "workflow-executions");
                      }}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Logs
                    </button>

                    <button
                      type="button"
                      data-tl={`me-custom-workflow-delete-${item.id}`}
                      onClick={() => {
                        tl.setVar("meDeleteWorkflowItem", item);
                        tl.setVar("meDeleteWorkflowModalOpen", true);
                      }}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
