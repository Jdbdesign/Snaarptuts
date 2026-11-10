"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  type ExecutionLog,
  INITIAL_EXECUTION_LOGS,
  ME_URLS,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeExecutionLogsView({ tl }: Props) {
  const workflowId = useTimelineVar<string>(tl, "meLogsWorkflowId", "booking-confirmation");
  const logs = useTimelineVar<ExecutionLog[]>(
    tl,
    "meWorkflowLogs",
    workflowId === "notify-me" ? [] : INITIAL_EXECUTION_LOGS
  );
  const statusFilter = useTimelineVar<string>(tl, "meLogsStatusFilter", "All Statuses");
  const filterDropdownOpen = useTimelineVar<boolean>(tl, "meLogsFilterDropdownOpen", false);

  const filteredLogs = logs.filter((log) => {
    if (statusFilter === "All Statuses") return true;
    return log.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div data-tl="me-execution-logs-view" className="max-w-5xl mx-auto space-y-6 select-none pb-12">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            type="button"
            data-tl="me-logs-back-btn"
            onClick={() => {
              tl.setUrl(`${ME_URLS.workflows}/${workflowId}`);
              tl.setVar("meView", "workflow-detail");
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <span>&larr;</span>
            <span>Back</span>
          </button>

          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Execution Logs</h1>
          <p className="text-xs text-gray-500 mt-1">
            View the execution history for this workflow
          </p>
        </div>

        <div className="pt-6">
          <button
            type="button"
            data-tl="me-logs-all-workflows-btn"
            onClick={() => {
              tl.setUrl(ME_URLS.workflows);
              tl.setVar("meView", "workflows");
            }}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
          >
            All Workflows
          </button>
        </div>
      </div>

      {/* Filter and Refresh Bar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            data-tl="me-logs-status-select"
            onClick={() => tl.setVar("meLogsFilterDropdownOpen", !filterDropdownOpen)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
          >
            <span className="text-gray-400 font-normal">Status:</span>
            <span>{statusFilter}</span>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {filterDropdownOpen && (
            <div
              data-tl="me-logs-status-menu"
              className="absolute z-20 mt-1 w-40 rounded-xl border border-gray-200 bg-white shadow-lg py-1.5"
            >
              {["All Statuses", "Completed", "Pending", "Failed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  data-tl={`me-logs-filter-${st.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    tl.setVar("meLogsStatusFilter", st);
                    tl.setVar("meLogsFilterDropdownOpen", false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${
                    statusFilter === st ? "font-semibold text-[#7014D9]" : "text-gray-700"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          data-tl="me-logs-refresh-btn"
          onClick={() => {
            // soft refresh animation
          }}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
        >
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Content Area */}
      {filteredLogs.length === 0 ? (
        <div
          data-tl="me-logs-empty"
          className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-xs"
        >
          <div className="mx-auto w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">
            No executions yet. Logs will appear here once the workflow runs.
          </p>
        </div>
      ) : (
        <div
          data-tl="me-logs-table"
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F9FAFB] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Invitee</th>
                <th className="py-3 px-4">Step</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Scheduled At</th>
                <th className="py-3 px-4">Executed At</th>
                <th className="py-3 px-4">Error</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{log.inviteeName}</div>
                    <div className="text-[11px] text-gray-500">{log.inviteeEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{log.step}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        log.status === "failed"
                          ? "bg-[#FEE2E2] text-[#991B1B]"
                          : log.status === "pending"
                          ? "bg-[#FEF3C7] text-[#92400E]"
                          : "bg-[#D1FAE5] text-[#065F46]"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{log.scheduledAt}</td>
                  <td className="py-3 px-4 text-gray-700">{log.executedAt}</td>
                  <td className="py-3 px-4">
                    {log.error ? (
                      <span className="text-red-500 font-medium text-[11px]">{log.error}</span>
                    ) : (
                      <span className="text-gray-400">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
