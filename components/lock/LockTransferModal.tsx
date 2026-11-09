"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle, ArrowLeftRight } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function LockTransferModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "lockTransferModalOpen", false);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("lockTransferModalOpen", false);
  };

  return (
    <div
      data-tl="modal-transfer-backdrop"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="modal-transfer-card"
        className="bg-white rounded-2xl p-6 shadow-2xl max-w-[420px] w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-150"
      >
        <div
          data-tl="tile-transfer-warning"
          className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706] mb-3"
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3
          data-tl="title-transfer"
          className="text-lg font-bold text-gray-900 mb-1"
        >
          Transfer Ownership
        </h3>

        <p
          data-tl="sub-transfer-warning"
          className="text-xs font-semibold text-red-600 mb-2"
        >
          This action cannot be undone easily
        </p>

        <p
          data-tl="body-transfer"
          className="text-xs text-gray-600 mb-6 leading-relaxed max-w-[340px]"
        >
          Are you sure you want to transfer ownership? You will be demoted to admin.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            data-tl="btn-transfer-cancel"
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="btn-transfer-confirm"
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Transfer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
