'use client';

import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  prospectName?: string;
}

export function CrmCloseWonModal({
  isOpen,
  onClose,
  onConfirm,
  prospectName = 'Alex Morgan',
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-close-won-overlay"
    >
      <div
        className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-close-won-modal"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#7014D9] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900" data-tl="crm-close-won-title">
              Close deal as won
            </h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Mark {prospectName} as won? It will be closed and moved out of the open pipeline.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            data-tl="crm-close-won-close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50"
            data-tl="crm-close-won-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs"
            data-tl="crm-close-won-confirm"
          >
            Mark as Won
          </button>
        </div>
      </div>
    </div>
  );
}
