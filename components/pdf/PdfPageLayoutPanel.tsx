import React from "react";
import {
  FileText,
  BookOpen,
  ArrowDown,
  ArrowRight,
  RotateCcw,
  RotateCw,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  mode: "single" | "twopage";
  transition: "vertical" | "horizontal";
  onSelectMode?: (mode: "single" | "twopage") => void;
  onSelectTransition?: (tr: "vertical" | "horizontal") => void;
  onRotateCcw?: () => void;
  onRotateCw?: () => void;
  onClose?: () => void;
}

export function PdfPageLayoutPanel({
  isOpen,
  mode = "single",
  transition = "vertical",
  onSelectMode,
  onSelectTransition,
  onRotateCcw,
  onRotateCw,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="page-layout-panel"
      className="absolute top-28 right-8 z-40 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex flex-col gap-4 text-xs font-sans animate-in zoom-in-95 duration-100"
    >
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <h4 className="font-bold text-gray-900 text-sm">Page Layout</h4>
      </div>

      {/* 1. Page Mode */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-gray-500">Page Mode</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-tl="layout-mode-single"
            onClick={() => onSelectMode?.("single")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
              mode === "single"
                ? "border-blue-600 bg-blue-50/60 text-blue-600 font-semibold"
                : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[11px]">Single Page</span>
          </button>

          <button
            type="button"
            data-tl="layout-mode-twopage"
            onClick={() => onSelectMode?.("twopage")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
              mode === "twopage"
                ? "border-blue-600 bg-blue-50/60 text-blue-600 font-semibold"
                : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[11px]">Two-Page Spread</span>
          </button>
        </div>
      </div>

      {/* 2. Page Transition */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-gray-500">Page Transition</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-tl="layout-transition-vertical"
            onClick={() => onSelectTransition?.("vertical")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
              transition === "vertical"
                ? "border-blue-600 bg-blue-50/60 text-blue-600 font-semibold"
                : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <ArrowDown className="w-4 h-4" />
            <span className="text-[11px]">Vertical Scroll</span>
          </button>

          <button
            type="button"
            data-tl="layout-transition-horizontal"
            onClick={() => onSelectTransition?.("horizontal")}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all gap-1.5 ${
              transition === "horizontal"
                ? "border-blue-600 bg-blue-50/60 text-blue-600 font-semibold"
                : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            <span className="text-[11px]">Horizontal Scroll</span>
          </button>
        </div>
      </div>

      {/* 3. Page Rotation */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-gray-500">Page Rotation</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-tl="layout-rotate-ccw"
            onClick={onRotateCcw}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-all gap-1.5 bg-white"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[11px] text-center leading-tight">Rotate 90° CCW</span>
          </button>

          <button
            type="button"
            data-tl="layout-rotate-cw"
            onClick={onRotateCw}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 transition-all gap-1.5 bg-white"
          >
            <RotateCw className="w-4 h-4" />
            <span className="text-[11px] text-center leading-tight">Rotate 90° CW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
