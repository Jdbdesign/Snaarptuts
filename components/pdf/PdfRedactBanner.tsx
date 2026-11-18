import React from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export function PdfRedactBanner({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="redact-banner"
      className="w-full bg-[#FEF9C3] border-b border-yellow-200 px-6 py-2.5 flex items-center justify-between text-xs text-yellow-900 font-medium z-20 shrink-0 animate-in slide-in-from-top-2 duration-150"
    >
      <div className="flex items-center gap-2">
        <span>
          Drag over sensitive content to mark it for permanent removal. Redacted documents download as secure PDF files only.
        </span>
      </div>
      {onClose && (
        <button
          type="button"
          data-tl="redact-banner-close-btn"
          onClick={onClose}
          className="text-yellow-700 hover:text-yellow-950 p-1 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
