import React from "react";

interface Props {
  isOpen: boolean;
  percent: number;
}

export function PdfProcessing({ isOpen, percent }: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="processing-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="processing-card"
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 border border-gray-100 animate-in zoom-in-95 duration-150"
      >
        <p className="text-sm font-bold text-gray-900 text-center">
          Processing your document...
        </p>

        {/* Green progress bar */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-200"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-600">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
