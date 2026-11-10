"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { WorkflowItem } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeDeleteWorkflowModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meDeleteWorkflowModalOpen", false);
  const targetItem = useTimelineVar<WorkflowItem | null>(tl, "meDeleteWorkflowItem", null);

  if (!isOpen) return null;

  const itemName = targetItem?.name || "Custom workflow";

  return (
    <div
      data-tl="me-delete-workflow-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Delete Workflow</h2>
          <button
            type="button"
            data-tl="me-delete-workflow-close"
            onClick={() => tl.setVar("meDeleteWorkflowModalOpen", false)}
            className="rounded p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <p className="text-xs text-gray-600 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-gray-900">{itemName}</span>? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="me-delete-workflow-cancel"
            onClick={() => tl.setVar("meDeleteWorkflowModalOpen", false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="me-delete-workflow-confirm"
            onClick={() => {
              const currentWorkflows = tl.getVar<WorkflowItem[]>("meWorkflows", []);
              const updated = currentWorkflows.filter((w) => w.id !== targetItem?.id);
              tl.setVar("meWorkflows", updated);
              tl.setVar("meDeleteWorkflowModalOpen", false);
              tl.setVar("meWorkflowBanner", "Workflow deleted successfully.");
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors shadow-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
