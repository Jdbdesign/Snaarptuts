"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function CrmNewDashboardModal({ tl, isOpen, onClose, onCreate }: Props) {
  const typedName = useTimelineVar<string>(tl, "field:dashboard-name-input", "");
  const [localName, setLocalName] = useState("");
  const name = typedName || localName;

  if (!isOpen) return null;

  return (
    <div
      data-tl="crm-new-dashboard-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#ECECF1] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        <h2 className="text-[18px] font-bold text-[#111111]">New Dashboard</h2>

        <div className="my-5">
          <input
            type="text"
            data-tl="crm-dashboard-name-input"
            value={name}
            onChange={(e) => {
              setLocalName(e.target.value);
              tl.setVar("field:dashboard-name-input", e.target.value);
            }}
            placeholder="Dashboard name"
            className="w-full rounded-full border border-[#D1D5DB] px-4 py-2.5 text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="crm-cancel-dashboard-btn"
            onClick={onClose}
            className="rounded-full px-5 py-2 text-[13px] font-medium text-[#4B5563] transition-colors hover:bg-[#F3F4F6]"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-create-dashboard-btn"
            onClick={() => onCreate(name || "Client Leads")}
            className="rounded-full bg-[#4F46E5] px-6 py-2 text-[13px] font-medium text-white shadow-xs transition-colors hover:bg-[#4338CA]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
