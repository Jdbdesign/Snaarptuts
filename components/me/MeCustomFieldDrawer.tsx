"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeCustomFieldDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meCustomFieldDrawerOpen", false);
  const fieldType = useTimelineVar<string>(tl, "meCustomFieldType", "Text");
  const fieldLabel = useTimelineVar<string>(tl, "meCustomFieldLabel", "");
  const typeDropdownOpen = useTimelineVar<boolean>(tl, "meCustomFieldTypeDropdownOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-custom-field-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn select-none"
    >
      <div
        data-tl="me-custom-field-drawer"
        className="h-full w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between animate-slideLeft"
      >
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Create a custom field</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Custom fields will be applied to all contact records.
              </p>
            </div>
            <button
              type="button"
              data-tl="me-custom-field-close"
              onClick={() => tl.setVar("meCustomFieldDrawerOpen", false)}
              className="rounded p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 text-xs">
            {/* Field Type Dropdown */}
            <div className="relative">
              <label className="block font-medium text-gray-700 mb-1">Field type</label>
              <button
                type="button"
                data-tl="me-custom-field-type-select"
                onClick={() => tl.setVar("meCustomFieldTypeDropdownOpen", !typeDropdownOpen)}
                className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-xs text-gray-900 text-left focus:border-[#7014D9] focus:outline-none"
              >
                <span>{fieldType}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {typeDropdownOpen && (
                <div
                  data-tl="me-custom-field-type-menu"
                  className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg py-1.5"
                >
                  {["Text", "Number", "Currency", "Tags", "Date", "Select", "Invitee question (from event types)"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        tl.setVar("meCustomFieldType", t);
                        tl.setVar("meCustomFieldTypeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field Label Input */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Field label</label>
              <input
                type="text"
                data-tl="me-custom-field-label-input"
                value={fieldLabel}
                onChange={(e) => tl.setVar("meCustomFieldLabel", e.target.value)}
                placeholder="e.g. Job"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            data-tl="me-custom-field-cancel"
            onClick={() => tl.setVar("meCustomFieldDrawerOpen", false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="me-custom-field-create-btn"
            onClick={() => {
              tl.setVar("meJobColumnAdded", true);
              tl.setVar("meCustomFieldDrawerOpen", false);
              const label = fieldLabel || "Job";
              tl.setVar("meContactsBanner", `"${label}" field created.`);
            }}
            className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
