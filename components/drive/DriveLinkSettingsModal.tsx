"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronLeft,
  X,
  Globe,
  Users,
  UserPlus,
  Eye,
  Calendar,
  ChevronDown,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveLinkSettingsModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveLinkSettingsOpen", false);
  const selectedScope = useTimelineVar<"anyone" | "existing" | "chosen">(
    tl,
    "driveLinkScope",
    "existing"
  );
  const itemName = useTimelineVar<string>(tl, "driveShareItemName", "Workspaces");

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-link-settings-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveLinkSettingsOpen", false)}
    >
      <div
        data-tl="dialog-link-settings"
        className="w-[450px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-link-settings-back"
              onClick={() => {
                tl.setVar("driveLinkSettingsOpen", false);
                tl.setVar("driveShareModalOpen", true);
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h2 className="text-[15px] font-semibold text-[#111827] leading-tight">
                Link settings
              </h2>
              <span className="text-[11px] text-gray-400">{itemName}</span>
            </div>
          </div>

          <button
            type="button"
            data-tl="btn-link-settings-close"
            onClick={() => tl.setVar("driveLinkSettingsOpen", false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Section: The link works for */}
        <div className="mt-4 space-y-2.5">
          <span className="text-[11px] font-semibold text-gray-500 block">
            The link works for
          </span>

          {/* Option 1: Anyone */}
          <div
            data-tl="radio-link-anyone"
            onClick={() => tl.setVar("driveLinkScope", "anyone")}
            className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
              selectedScope === "anyone"
                ? "border-blue-500 bg-blue-50/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-400">
              {selectedScope === "anyone" && (
                <div className="h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-medium text-[12.5px] text-[#111827]">
                <Globe size={15} className="text-gray-600" />
                <span>Anyone</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Share with anyone, doesn&apos;t require sign-in
              </p>
            </div>
          </div>

          {/* Option 2: Only people with existing access */}
          <div
            data-tl="radio-link-existing"
            onClick={() => tl.setVar("driveLinkScope", "existing")}
            className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
              selectedScope === "existing"
                ? "border-blue-500 bg-blue-50/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-400">
              {selectedScope === "existing" && (
                <div className="h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-medium text-[12.5px] text-[#111827]">
                <Users size={15} className="text-gray-600" />
                <span>Only people with existing access</span>
              </div>
            </div>
          </div>

          {/* Option 3: People you choose */}
          <div
            data-tl="radio-link-chosen"
            onClick={() => tl.setVar("driveLinkScope", "chosen")}
            className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
              selectedScope === "chosen"
                ? "border-blue-500 bg-blue-50/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-400">
              {selectedScope === "chosen" && (
                <div className="h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-medium text-[12.5px] text-[#111827]">
                <UserPlus size={15} className="text-gray-600" />
                <span>People you choose</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Only people you add below can open the link
              </p>
            </div>
          </div>
        </div>

        {/* Section: More settings */}
        <div className="mt-4 space-y-2.5">
          <span className="text-[11px] font-semibold text-gray-500 block">
            More settings
          </span>

          {/* Permission selector */}
          <div
            data-tl="select-link-permission"
            className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2 text-[12.5px] text-[#111827] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-gray-500" />
              <span>Can view</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>

          {/* Expiration date */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[12px] text-gray-600">Expiration date</span>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-[12px] text-gray-400 bg-white">
              <span>mm/dd/yyyy</span>
              <Calendar size={14} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            data-tl="btn-link-settings-apply"
            onClick={() => {
              tl.setVar("driveLinkSettingsOpen", false);
              tl.setVar("driveShareModalOpen", true);
              if (selectedScope === "anyone") {
                tl.setVar("driveShareLinkFooterText", "Anyone with the link can view.");
              }
              tl.setVar("driveLinkSettingsToastOpen", true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-2 text-[12.5px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
