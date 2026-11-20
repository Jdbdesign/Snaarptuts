"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Calendar } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function CrmNewEventModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "crm:isNewEventOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="crm-new-event-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-in fade-in duration-150"
    >
      <div
        data-tl="crm-new-event-modal"
        className="w-full max-w-[540px] overflow-hidden rounded-[20px] bg-white shadow-2xl animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECECF1] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3ECFC] text-[#7C3AED]">
              <Calendar size={18} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#111111]">
                New Event
              </h2>
              <p className="text-[12px] text-[#6B7280]">
                Schedule a new webinar or masterclass
              </p>
            </div>
          </div>
          <button
            type="button"
            data-tl="crm-new-event-cancel"
            onClick={() => tl.setVar("crm:isNewEventOpen", false)}
            className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6 text-[13px]">
          <div>
            <label className="mb-1 block font-semibold text-[#374151]">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Interactive Product Demo"
              className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Starts
              </label>
              <input
                type="text"
                defaultValue="2026-11-28 14:00"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Ends
              </label>
              <input
                type="text"
                defaultValue="2026-11-28 15:30"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Time Zone
              </label>
              <select
                defaultValue="Africa/Lagos"
                className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none cursor-pointer"
              >
                <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Location
              </label>
              <input
                type="text"
                defaultValue="Live Online"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-[#374151]">
              Join / Details Link
            </label>
            <input
              type="text"
              defaultValue="https://example.com/webinar"
              className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-[#374151]">
              Description
            </label>
            <textarea
              rows={2}
              defaultValue="Interactive product demo and workflow Q&A."
              className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:border-[#7C3AED] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#ECECF1] bg-[#F9FAFB] px-6 py-3.5">
          <button
            type="button"
            onClick={() => tl.setVar("crm:isNewEventOpen", false)}
            className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-new-event-save"
            onClick={() => tl.setVar("crm:isNewEventOpen", false)}
            className="rounded-xl bg-[#7C3AED] px-5 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
