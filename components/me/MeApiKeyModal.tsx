"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_API_KEY } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeApiKeyModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meApiKeyModalOpen", false);
  const [name, setName] = useState("Production API Key");
  const [expiry, setExpiry] = useState("");

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-apikey-overlay"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="me-apikey-modal"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">Create API Key</h2>
          <button
            type="button"
            data-tl="me-apikey-modal-close"
            onClick={() => tl.setVar("meApiKeyModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Key Name *</label>
            <input
              type="text"
              data-tl="me-apikey-name-input"
              value={name}
              placeholder="e.g. Production API Key"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Expiration Date</label>
            <input
              type="text"
              data-tl="me-apikey-expiry-input"
              value={expiry}
              placeholder="mm/dd/yyyy"
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
            <p className="text-[11px] text-gray-400 mt-1">Leave empty for no expiration</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-apikey-modal-cancel"
            onClick={() => tl.setVar("meApiKeyModalOpen", false)}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-apikey-modal-submit"
            onClick={() => {
              tl.setVar("meApiKeysList", [
                {
                  ...SAMPLE_API_KEY,
                  name: name || SAMPLE_API_KEY.name,
                },
              ]);
              tl.setVar("meToastMessage", "API key created successfully.");
              tl.setVar("meToastType", "success");
              tl.setVar("meApiKeyModalOpen", false);
            }}
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
