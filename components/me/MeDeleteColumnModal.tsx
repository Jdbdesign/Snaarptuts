"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeDeleteColumnModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meDeleteColumnModalOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-delete-col-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-gray-200">
        <h2 className="text-base font-bold text-gray-900">Delete custom field</h2>

        <p className="text-xs text-gray-600 leading-relaxed">
          Delete the &ldquo;Job&rdquo; field? Values stored on every contact will be removed.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="me-delete-col-cancel"
            onClick={() => tl.setVar("meDeleteColumnModalOpen", false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="me-delete-col-confirm"
            onClick={() => {
              tl.setVar("meJobColumnAdded", false);
              tl.setVar("meDeleteColumnModalOpen", false);
              tl.setVar("meContactsBanner", '"Job" field deleted.');
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors shadow-xs"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
