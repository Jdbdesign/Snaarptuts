import React from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  text: string;
  opacity: number;
  rotation: number;
  size: number;
  color: string;
  applyTo: "all" | "specific";
  hasApplied: boolean;
  onTextChange?: (text: string) => void;
  onOpacityChange?: (opacity: number) => void;
  onRotationChange?: (rotation: number) => void;
  onSizeChange?: (size: number) => void;
  onColorChange?: (color: string) => void;
  onApplyToChange?: (applyTo: "all" | "specific") => void;
  onApply?: () => void;
  onRemove?: () => void;
  onClose?: () => void;
}

const WATERMARK_COLORS = [
  { name: "black", hex: "#000000" },
  { name: "gray", hex: "#9CA3AF" },
  { name: "red", hex: "#EF4444" },
  { name: "blue", hex: "#3B82F6" },
  { name: "green", hex: "#10B981" },
  { name: "purple", hex: "#8B5CF6" },
  { name: "yellow", hex: "#F59E0B" },
  { name: "pink", hex: "#EC4899" },
];

export function PdfWatermarkPanel({
  isOpen,
  text,
  opacity,
  rotation,
  size,
  color,
  applyTo,
  hasApplied,
  onTextChange,
  onOpacityChange,
  onRotationChange,
  onSizeChange,
  onColorChange,
  onApplyToChange,
  onApply,
  onRemove,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="watermark-panel"
      className="absolute right-6 top-20 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 flex flex-col gap-4 text-xs z-30 animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm">Watermark</h3>
        <button
          type="button"
          data-tl="watermark-close-btn"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Text Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-gray-700">
            Text ({text.length}/100)
          </label>
        </div>
        <input
          type="text"
          data-tl="watermark-text-input"
          value={text}
          onChange={(e) => onTextChange?.(e.target.value)}
          placeholder="Enter watermark text"
          maxLength={100}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
        />
      </div>

      {/* Opacity Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-gray-700">
            Opacity: {opacity}%
          </label>
        </div>
        <input
          type="range"
          data-tl="watermark-opacity-slider"
          min="10"
          max="100"
          value={opacity}
          onChange={(e) => onOpacityChange?.(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Rotation Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-gray-700">
            Rotation: {rotation}°
          </label>
        </div>
        <input
          type="range"
          data-tl="watermark-rotation-slider"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => onRotationChange?.(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Font Size Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-gray-700">
            Font Size: {size}pt
          </label>
        </div>
        <input
          type="range"
          data-tl="watermark-size-slider"
          min="20"
          max="180"
          value={size}
          onChange={(e) => onSizeChange?.(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Color Swatches */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-gray-700">Color</label>
        <div className="flex items-center gap-2">
          {WATERMARK_COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              data-tl={c.name === "gray" ? "watermark-color-gray" : `watermark-color-${c.name}`}
              onClick={() => onColorChange?.(c.hex)}
              className={`w-5 h-5 rounded-full border border-gray-300 transition-transform ${
                color === c.hex ? "scale-125 ring-2 ring-blue-600 ring-offset-1" : "hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Pages Radio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-gray-700">Apply To</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              data-tl="watermark-apply-all"
              name="watermark-apply"
              checked={applyTo === "all"}
              onChange={() => onApplyToChange?.("all")}
              className="accent-blue-600"
            />
            <span className="text-gray-700 text-xs">All Pages</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              data-tl="watermark-apply-specific"
              name="watermark-apply"
              checked={applyTo === "specific"}
              onChange={() => onApplyToChange?.("specific")}
              className="accent-blue-600"
            />
            <span className="text-gray-700 text-xs">Current Page</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          data-tl="watermark-apply-btn"
          onClick={onApply}
          className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-medium rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          Apply Watermark
        </button>

        {hasApplied && (
          <button
            type="button"
            data-tl="watermark-remove-btn"
            onClick={onRemove}
            className="w-full py-2 px-4 border border-rose-200 text-rose-600 hover:bg-rose-50 font-medium rounded-xl text-xs transition-colors"
          >
            Remove Watermark
          </button>
        )}
      </div>
    </div>
  );
}
