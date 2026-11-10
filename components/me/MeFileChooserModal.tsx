"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeFileChooserModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meFileChooserOpen", false);
  const selected = useTimelineVar<string>(tl, "meFileChooserSelected", "sample-contacts.csv");

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-file-chooser-modal"
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl space-y-4 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Select File to Upload
            </h2>
          </div>
          <button
            type="button"
            onClick={() => tl.setVar("meFileChooserOpen", false)}
            className="rounded p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* File List */}
        <div className="space-y-1.5 py-1">
          {[
            { name: "sample-contacts.csv", size: "2.4 KB", type: "CSV Spreadsheet", date: "10/11/2026" },
            { name: "team-roster.csv", size: "1.8 KB", type: "CSV Spreadsheet", date: "09/11/2026" },
            { name: "q4-event-leads.csv", size: "3.2 KB", type: "CSV Spreadsheet", date: "05/11/2026" },
          ].map((file) => {
            const isPicked = selected === file.name;
            return (
              <button
                key={file.name}
                type="button"
                data-tl={`me-file-item-${file.name.replace(/\./g, "-")}`}
                onClick={() => tl.setVar("meFileChooserSelected", file.name)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors text-left ${
                  isPicked
                    ? "border-[#7014D9] bg-purple-50/50"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                    CSV
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{file.name}</div>
                    <div className="text-[10px] text-gray-400">{file.type} &middot; {file.size}</div>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400">{file.date}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-[11px] text-gray-500">
            Selected: <span className="font-semibold text-gray-800">{selected}</span>
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="me-file-chooser-cancel-btn"
              onClick={() => tl.setVar("meFileChooserOpen", false)}
              className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              data-tl="me-file-chooser-open-btn"
              onClick={() => {
                tl.setVar("meSelectedCsvFile", selected);
                tl.setVar("meFileChooserOpen", false);
              }}
              className="rounded-lg bg-[#7014D9] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
