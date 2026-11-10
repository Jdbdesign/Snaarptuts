"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  type WorkflowItem,
  NOTIFY_ME_WORKFLOW,
  CREATED_CUSTOM_WORKFLOW,
  ME_URLS,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeWorkflowEditorView({ tl }: Props) {
  const isCustom = useTimelineVar<boolean>(tl, "meEditorIsCustom", false);
  const name = useTimelineVar<string>(
    tl,
    "meEditorWorkflowName",
    isCustom ? "Custom workflow" : "Notify me when someone books"
  );
  const trigger = useTimelineVar<string>(
    tl,
    "meEditorTrigger",
    isCustom ? "Meeting Started" : "Booking Created"
  );
  const recipient = useTimelineVar<"Organizer" | "Invitee" | "Both">(
    tl,
    "meEditorRecipient",
    isCustom ? "Both" : "Organizer"
  );
  const backendDetails = useTimelineVar<boolean>(tl, "meEditorBackendDetails", true);
  const subject = useTimelineVar<string>(
    tl,
    "meEditorSubject",
    isCustom
      ? "Your {{event_title}}"
      : "{{invitee_name}} just booked a meeting on your Snaarp Me"
  );
  const body = useTimelineVar<string>(
    tl,
    "meEditorBody",
    `Meeting details:\n- Date: {{event_date}} at {{event_time}} ({{timezone}})\n- Duration: {{event_duration}}\n- Invitee: {{invitee_name}} ({{invitee_email}})\n- Venue: {{meeting_url}}\n\nSee you then!`
  );

  const recipientDropdownOpen = useTimelineVar<boolean>(
    tl,
    "meEditorRecipientDropdownOpen",
    false
  );
  const triggerDropdownOpen = useTimelineVar<boolean>(
    tl,
    "meEditorTriggerDropdownOpen",
    false
  );

  return (
    <div data-tl="me-workflow-editor-view" className="max-w-5xl mx-auto space-y-6 select-none pb-12">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Workflow</h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit the email body, then choose whether booking details should be filled in by the backend.
          </p>
        </div>

        <button
          type="button"
          data-tl="me-editor-back-btn"
          onClick={() => {
            tl.setUrl(ME_URLS.workflows);
            tl.setVar("meView", "workflows");
          }}
          className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Card 1: Workflow Details */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900">Workflow Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Workflow Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-tl="me-editor-name-input"
              value={name}
              onChange={(e) => tl.setVar("meEditorWorkflowName", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              placeholder="e.g. Notify me when someone books"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Trigger Event <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              data-tl="me-editor-trigger-select"
              onClick={() => tl.setVar("meEditorTriggerDropdownOpen", !triggerDropdownOpen)}
              className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none text-left"
            >
              <span>{trigger}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {triggerDropdownOpen && (
              <div
                data-tl="me-editor-trigger-menu"
                className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg py-1.5"
              >
                {["Booking Created", "Meeting Started", "Booking Cancelled", "Meeting Ended"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-tl={`me-editor-trigger-${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => {
                      tl.setVar("meEditorTrigger", item);
                      tl.setVar("meEditorTriggerDropdownOpen", false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${
                      trigger === item ? "font-semibold text-[#7014D9] bg-purple-50/50" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Workflow Steps */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-gray-900">Workflow Steps</h2>

        {/* Step 1 Box */}
        <div className="rounded-xl border border-gray-200 p-5 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-xs font-bold text-gray-900">Step 1: Send Email</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <button type="button" className="p-1 hover:text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button type="button" className="p-1 hover:text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button type="button" className="p-1 rounded bg-red-50 text-red-500 hover:bg-red-100 ml-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Action Type</label>
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
              Send Email
            </div>
          </div>

          <div className="relative">
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Recipient</label>
            <button
              type="button"
              data-tl="me-editor-recipient-select"
              onClick={() => tl.setVar("meEditorRecipientDropdownOpen", !recipientDropdownOpen)}
              className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 text-left focus:border-[#7014D9] focus:outline-none"
            >
              <span>{recipient}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {recipientDropdownOpen && (
              <div
                data-tl="me-editor-recipient-menu"
                className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg py-1.5"
              >
                {(["Invitee", "Organizer", "Both"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    data-tl={`me-editor-recipient-${r.toLowerCase()}`}
                    onClick={() => {
                      tl.setVar("meEditorRecipient", r);
                      tl.setVar("meEditorRecipientDropdownOpen", false);
                    }}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 text-xs hover:bg-gray-50 ${
                      recipient === r ? "font-semibold text-gray-900 bg-purple-50/30" : "text-gray-700"
                    }`}
                  >
                    <span>{r}</span>
                    {recipient === r && (
                      <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Email Provider</label>
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
              System (Default)
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Choose which email account sends this message
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
            <div>
              <span className="text-xs font-semibold text-gray-900">Use backend booking details</span>
              <p className="text-[11px] text-gray-500">
                Fill names, times, meeting links, and other fields from the booking when the email is sent.
              </p>
            </div>
            <button
              type="button"
              data-tl="me-editor-backend-toggle"
              onClick={() => tl.setVar("meEditorBackendDetails", !backendDetails)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                backendDetails ? "bg-[#7014D9]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  backendDetails ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Subject</label>
            <input
              type="text"
              data-tl="me-editor-subject-input"
              value={subject}
              onChange={(e) => tl.setVar("meEditorSubject", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
            <button
              type="button"
              data-tl="me-editor-insert-merge-subject"
              className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#7014D9] hover:underline"
            >
              <span>&lt;/&gt;</span>
              <span>Insert Merge Field</span>
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Body</label>
            <textarea
              rows={6}
              data-tl="me-editor-body-textarea"
              value={body}
              onChange={(e) => tl.setVar("meEditorBody", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono text-gray-800 leading-relaxed focus:border-[#7014D9] focus:outline-none resize-none"
            />
            <button
              type="button"
              data-tl="me-editor-insert-merge-body"
              className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#7014D9] hover:underline"
            >
              <span>&lt;/&gt;</span>
              <span>Insert Merge Field</span>
            </button>
          </div>

          <div>
            <button
              type="button"
              data-tl="me-editor-add-condition"
              className="text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              + Add Condition
            </button>
          </div>
        </div>

        <div className="flex justify-center border-t border-gray-100 pt-3">
          <button
            type="button"
            data-tl="me-editor-add-step"
            className="text-xs font-semibold text-gray-700 hover:text-gray-900"
          >
            + Add Step
          </button>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          data-tl="me-editor-create-btn"
          onClick={() => {
            const currentWorkflows = tl.getVar<WorkflowItem[]>("meWorkflows", []);
            if (isCustom) {
              const newWorkflow = {
                ...CREATED_CUSTOM_WORKFLOW,
                name: name || "Custom workflow",
                triggerEvent: trigger,
              };
              tl.setVar("meWorkflows", [
                ...currentWorkflows.filter((w) => w.id !== CREATED_CUSTOM_WORKFLOW.id),
                newWorkflow,
              ]);
              tl.setVar("meWorkflowBanner", "Custom workflow created successfully.");
            } else {
              const newWorkflow = {
                ...NOTIFY_ME_WORKFLOW,
                name: name || "Notify me when someone books",
              };
              tl.setVar("meWorkflows", [
                newWorkflow,
                ...currentWorkflows.filter((w) => w.id !== NOTIFY_ME_WORKFLOW.id),
              ]);
              tl.setVar("meWorkflowBanner", "Workflow created successfully.");
            }
            tl.setUrl(ME_URLS.workflows);
            tl.setVar("meView", "workflows");
          }}
          className="rounded-xl bg-[#7014D9] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-sm"
        >
          Create Workflow
        </button>
      </div>
    </div>
  );
}
