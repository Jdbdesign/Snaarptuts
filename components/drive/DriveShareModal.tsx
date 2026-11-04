"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Settings,
  X,
  Plus,
  Lock,
  Link as LinkIcon,
  Send,
  MessageSquare,
} from "lucide-react";
import { SHARE_PEOPLE_INITIAL } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveShareModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveShareModalOpen", false);
  const itemName = useTimelineVar<string>(tl, "driveShareItemName", "Workspaces");
  const emailVal = useTimelineVar<string>(tl, "driveShareEmailVal", "");
  const hasChip = useTimelineVar(tl, "driveShareHasChip", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-share-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveShareModalOpen", false)}
    >
      <div
        data-tl="dialog-share"
        className="w-[460px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">
            Share &quot;{itemName}&quot;
          </h2>
          <div className="flex items-center gap-1.5 text-gray-400">
            <button
              type="button"
              data-tl="btn-share-settings"
              onClick={() => {
                tl.setVar("driveShareModalOpen", false);
                tl.setVar("driveLinkSettingsOpen", true);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
              title="Link settings"
            >
              <Settings size={17} />
            </button>
            <button
              type="button"
              data-tl="btn-share-close"
              onClick={() => tl.setVar("driveShareModalOpen", false)}
              className="p-1 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Add Email input */}
        <div className="mt-2">
          <div className="flex items-center rounded-xl border border-gray-300 px-3 py-2 bg-white focus-within:border-blue-500 shadow-2xs">
            {hasChip ? (
              <div
                data-tl="share-email-chip"
                className="flex items-center gap-1.5 rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[12px] text-blue-700 font-medium"
              >
                <span>design@acme.example</span>
                <button
                  type="button"
                  data-tl="btn-remove-chip"
                  onClick={() => tl.setVar("driveShareHasChip", false)}
                  className="hover:text-blue-900 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <input
                type="text"
                data-tl="share-email-input"
                placeholder="Add email addresses"
                value={emailVal}
                readOnly
                className="w-full text-[13px] text-[#111827] placeholder:text-gray-400 focus:outline-none"
              />
            )}
            <Plus size={16} className="ml-auto text-gray-400 shrink-0" />
          </div>

          {/* Add a message trigger */}
          <button
            type="button"
            data-tl="btn-share-add-message"
            className="flex items-center gap-1.5 mt-2.5 text-[12px] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <MessageSquare size={13} className="text-gray-400" />
            <span>Add a message</span>
          </button>
        </div>

        {/* PEOPLE WITH ACCESS */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            People with access
          </span>

          <div className="mt-2.5 space-y-2.5 max-h-48 overflow-y-auto">
            {SHARE_PEOPLE_INITIAL.map((person) => (
              <div key={person.id} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      person.avatarBg ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {person.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#111827] leading-tight">
                      {person.email}
                    </p>
                    <p className="text-[11px] text-gray-400">{person.role}</p>
                  </div>
                </div>

                {person.role !== "Owner" && (
                  <button
                    type="button"
                    data-tl={`btn-remove-person-${person.id}`}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-6 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Lock size={13} className="text-gray-400" />
            <span>Only people with access can view.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-share-copy-link"
              onClick={() => {
                tl.setVar("driveShareModalOpen", false);
                tl.setVar("driveCopyLinkToastOpen", true);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <LinkIcon size={14} className="text-gray-500" />
              <span>Copy link</span>
            </button>

            <button
              type="button"
              data-tl="btn-share-send"
              onClick={() => {
                tl.setVar("driveShareModalOpen", false);
                tl.setVar("driveShareConfirmOpen", true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Send size={13} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
