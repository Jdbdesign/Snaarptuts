"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Copy } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveShareConfirmModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveShareConfirmOpen", false);
  const recipientEmail = useTimelineVar(tl, "driveShareRecipientEmail", "alex.morgan@acme.example");
  const avatar = (recipientEmail.charAt(0) || "A").toUpperCase();

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-share-confirm-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveShareConfirmOpen", false)}
    >
      <div
        data-tl="dialog-share-confirm"
        className="relative w-[430px] rounded-2xl bg-white p-6 text-center shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          type="button"
          data-tl="btn-confirm-close"
          onClick={() => tl.setVar("driveShareConfirmOpen", false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={17} />
        </button>

        <h2 className="text-[17px] font-semibold text-[#111827]">Shared with</h2>

        {/* Avatar */}
        <div className="mt-3 flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-[16px] font-bold text-white shadow-2xs">
            {avatar}
          </div>
        </div>

        <p className="mt-2 text-[13px] font-semibold text-[#111827]">
          {recipientEmail}
        </p>
        <p className="mt-1 text-[11.5px] text-gray-500 max-w-xs mx-auto leading-relaxed">
          They can view this item. If they didn&apos;t get an email, send them the link below.
        </p>

        {/* Viewer link box */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50/50 p-3 text-left">
          <span className="text-[10.5px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Viewer link
          </span>
          <p className="text-[11px] text-blue-600 break-all select-all font-mono">
            https://drive.snaarp.com/s/invite-8f3a2c1e
          </p>
          <button
            type="button"
            data-tl="btn-confirm-copy-link"
            onClick={() => tl.setVar("driveCopyLinkToastOpen", true)}
            className="mt-2.5 flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700 hover:text-[#7014D9] transition-colors cursor-pointer"
          >
            <Copy size={13} />
            <span>Copy link</span>
          </button>
        </div>

        {/* Done Button */}
        <button
          type="button"
          data-tl="btn-confirm-done"
          onClick={() => tl.setVar("driveShareConfirmOpen", false)}
          className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
