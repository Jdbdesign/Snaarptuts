"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeUploadCsvModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meUploadCsvModalOpen", false);
  const selectedFile = useTimelineVar<string | null>(tl, "meSelectedCsvFile", null);

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-upload-csv-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Upload CSV</h2>
          <button
            type="button"
            data-tl="me-csv-close-btn"
            onClick={() => tl.setVar("meUploadCsvModalOpen", false)}
            className="rounded p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-gray-600 leading-relaxed">
          Upload a CSV of your contact list. Required column: Email. Optional: Name, Phone, Company, Job Title.
        </p>

        {/* Upload Box */}
        <div className="rounded-xl border border-dashed border-gray-200 p-4 flex items-center gap-3 bg-gray-50/50">
          <button
            type="button"
            data-tl="me-csv-choose-file-btn"
            onClick={() => tl.setVar("meFileChooserOpen", true)}
            className="rounded-lg bg-[#F3E8FF] px-3.5 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-purple-200 transition-colors shadow-2xs"
          >
            Choose File
          </button>
          <span className="text-xs text-gray-500 truncate">
            {selectedFile || "No file chosen"}
          </span>
        </div>

        <div>
          <button
            type="button"
            className="text-xs font-medium text-gray-600 hover:text-gray-900"
          >
            Download CSV template
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="me-csv-cancel-btn"
            onClick={() => tl.setVar("meUploadCsvModalOpen", false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="me-csv-upload-confirm-btn"
            onClick={() => {
              tl.setVar("meUploadCsvModalOpen", false);
              tl.setVar("meContactsBanner", "Contacts imported successfully.");
            }}
            className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
          >
            Upload CSV
          </button>
        </div>
      </div>
    </div>
  );
}
