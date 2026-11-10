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

export function MeWorkflowDetailView({ tl }: Props) {
  const workflows = useTimelineVar<WorkflowItem[]>(tl, "meWorkflows", INITIAL_WORKFLOWS);
  const detailId = useTimelineVar<string>(tl, "meDetailWorkflowId", "booking-confirmation");
  const banner = useTimelineVar<string | null>(tl, "meDetailBanner", null);

  const bookingConfirm = useTimelineVar<boolean>(tl, "meDetailBookingConfirm", true);
  const reminder24h = useTimelineVar<boolean>(tl, "meDetailReminder24h", false);
  const reminder1h = useTimelineVar<boolean>(tl, "meDetailReminder1h", false);
  const reminder15m = useTimelineVar<boolean>(tl, "meDetailReminder15m", false);
  const recipient = useTimelineVar<"Organizer" | "Invitee" | "Both">(
    tl,
    "meDetailRecipient",
    "Organizer"
  );
  const recipientDropdownOpen = useTimelineVar<boolean>(
    tl,
    "meDetailRecipientDropdownOpen",
    false
  );

  const currentWorkflow =
    workflows.find((w) => w.id === detailId) || workflows[0] || INITIAL_WORKFLOWS[0];

  return (
    <div data-tl="me-workflow-detail-view" className="max-w-5xl mx-auto space-y-6 select-none pb-12">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            type="button"
            data-tl="me-detail-back-btn"
            onClick={() => {
              tl.setUrl(ME_URLS.workflows);
              tl.setVar("meView", "workflows");
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <span>&larr;</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Booking emails &amp; reminders
            </h1>
            <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[11px] font-medium text-[#065F46]">
              Active
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">{currentWorkflow.name}</p>
        </div>

        <div className="flex items-center gap-2.5 pt-6">
          <button
            type="button"
            data-tl="me-detail-deactivate-btn"
            className="rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors"
          >
            Deactivate
          </button>
          <button
            type="button"
            data-tl="me-detail-logs-btn"
            onClick={() => {
              tl.setUrl(`${ME_URLS.workflows}/${detailId}/executions`);
              tl.setVar("meLogsWorkflowId", detailId);
              tl.setVar(
                "meWorkflowLogs",
                detailId === "notify-me" ? [] : INITIAL_EXECUTION_LOGS
              );
              tl.setVar("meLogsStatusFilter", "All Statuses");
              tl.setVar("meView", "workflow-executions");
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Logs
          </button>
        </div>
      </div>

      {/* Inline Green Banner */}
      {banner && (
        <div
          data-tl="me-detail-banner"
          className="rounded-lg bg-[#E6F4EA] border border-emerald-200 px-4 py-2.5 text-xs font-medium text-[#137333] flex items-center justify-between animate-fadeIn"
        >
          <span>{banner}</span>
          <button
            type="button"
            onClick={() => tl.setVar("meDetailBanner", null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Card 1: When someone books a meeting */}
      <div className="rounded-xl border border-[#F3E8FF] bg-[#FAF5FF] p-5 space-y-3">
        <h2 className="text-sm font-bold text-gray-900">When someone books a meeting</h2>
        <p className="text-xs text-gray-600">
          These emails are sent automatically. Meeting links are included when available.
        </p>
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-semibold text-white">
              1
            </span>
            <span className="text-xs text-gray-700">Confirmation email when someone books</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-semibold text-white">
              2
            </span>
            <span className="text-xs text-gray-700">Host notification when someone books on your calendar</span>
          </div>
        </div>
      </div>

      {/* Card 2: Booking confirmation */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Booking confirmation</h3>
            <p className="text-xs text-gray-500 mt-0.5">Sent right after someone books</p>
          </div>
          <button
            type="button"
            data-tl="me-detail-booking-toggle"
            onClick={() => tl.setVar("meDetailBookingConfirm", !bookingConfirm)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              bookingConfirm ? "bg-[#7014D9]" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                bookingConfirm ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <div className="pt-2">
          <button
            type="button"
            data-tl="me-detail-customize-email"
            className="text-xs font-semibold text-[#7014D9] hover:underline"
          >
            Customize email
          </button>
        </div>
      </div>

      {/* Card 3: Meeting reminders */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Meeting reminders</h3>
          <p className="text-xs text-gray-500 mt-0.5">Emails sent before the meeting starts</p>
        </div>

        <div className="space-y-3 divide-y divide-gray-100">
          {/* Row 1: 24 hours */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-semibold text-gray-900">24 hours before</span>
              <p className="text-[11px] text-gray-500">Day-before reminder</p>
            </div>
            <button
              type="button"
              data-tl="me-detail-toggle-24h"
              onClick={() => tl.setVar("meDetailReminder24h", !reminder24h)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                reminder24h ? "bg-[#7014D9]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  reminder24h ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Row 2: 1 hour */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-semibold text-gray-900">1 hour before</span>
              <p className="text-[11px] text-gray-500">Last-hour heads-up</p>
            </div>
            <button
              type="button"
              data-tl="me-detail-toggle-1h"
              onClick={() => tl.setVar("meDetailReminder1h", !reminder1h)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                reminder1h ? "bg-[#7014D9]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  reminder1h ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Row 3: 15 minutes */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-semibold text-gray-900">15 minutes before</span>
              <p className="text-[11px] text-gray-500">Right before the meeting</p>
            </div>
            <button
              type="button"
              data-tl="me-detail-toggle-15m"
              onClick={() => tl.setVar("meDetailReminder15m", !reminder15m)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                reminder15m ? "bg-[#7014D9]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  reminder15m ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 4: Send to */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Send to</h3>
          <p className="text-xs text-gray-500 mt-0.5">Who receives these emails</p>
        </div>

        <div className="relative">
          <label className="block text-[11px] font-medium text-gray-500 mb-1">Recipient</label>
          <button
            type="button"
            data-tl="me-detail-recipient-select"
            onClick={() => tl.setVar("meDetailRecipientDropdownOpen", !recipientDropdownOpen)}
            className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 text-left focus:border-[#7014D9] focus:outline-none"
          >
            <span>{recipient}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {recipientDropdownOpen && (
            <div
              data-tl="me-detail-recipient-menu"
              className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg py-1.5"
            >
              {(["Organizer", "Invitee", "Both"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  data-tl={`me-detail-recipient-${r.toLowerCase()}`}
                  onClick={() => {
                    tl.setVar("meDetailRecipient", r);
                    tl.setVar("meDetailRecipientDropdownOpen", false);
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
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          className="text-xs font-medium text-gray-600 hover:text-gray-900"
        >
          Switch to advanced step editor
        </button>

        <button
          type="button"
          data-tl="me-detail-save-btn"
          onClick={() => {
            tl.setVar("meDetailBanner", "Workflow saved successfully.");
            // Update workflow in list if needed
            const updated = workflows.map((w) => {
              if (w.id === detailId) {
                const sched = [
                  "Confirmation email when someone books",
                  "Host notification when someone books on your calendar",
                ];
                if (reminder24h) sched.push("Reminder 24 hours before the meeting");
                if (reminder1h) sched.push("Reminder 1 hour before the meeting");
                if (reminder15m) sched.push("Reminder 15 minutes before the meeting");
                return { ...w, scheduleItems: sched };
              }
              return w;
            });
            tl.setVar("meWorkflows", updated);
          }}
          className="rounded-xl bg-[#7014D9] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-sm"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
