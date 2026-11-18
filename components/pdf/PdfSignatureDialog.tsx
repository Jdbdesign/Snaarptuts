import React from "react";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";

export type SigTab = "draw" | "image" | "type" | "saved";

interface Props {
  isOpen: boolean;
  activeTab: SigTab;
  sigColor: string;
  typeInput: string;
  typeStyleIndex: number;
  hasImageUploaded: boolean;
  hasDrawnPath: boolean;
  onTabChange?: (tab: SigTab) => void;
  onColorChange?: (color: string) => void;
  onTypeInputChange?: (val: string) => void;
  onTypeStyleChange?: (idx: number) => void;
  onImageAreaClick?: () => void;
  onRemoveImage?: () => void;
  onClearDraw?: () => void;
  onDone?: () => void;
  onCancel?: () => void;
}

export function PdfSignatureDialog({
  isOpen,
  activeTab = "draw",
  sigColor = "#000000",
  typeInput = "",
  typeStyleIndex = 0,
  hasImageUploaded = false,
  hasDrawnPath = false,
  onTabChange,
  onColorChange,
  onTypeInputChange,
  onTypeStyleChange,
  onImageAreaClick,
  onRemoveImage,
  onClearDraw,
  onDone,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  const colors = [
    { name: "black", hex: "#000000" },
    { name: "blue", hex: "#2563EB" },
    { name: "navy", hex: "#1E3A8A" },
  ];

  const typeStyles = [
    { id: 0, fontClass: "font-serif italic tracking-wide" },
    { id: 1, fontClass: "font-sans italic font-bold tracking-tight" },
    { id: 2, fontClass: "font-mono italic font-medium" },
    { id: 3, fontClass: "font-sans font-light tracking-widest italic" },
  ];

  return (
    <div
      data-tl="sig-dialog-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="sig-dialog-modal"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Add Signature</h3>
          <button
            type="button"
            data-tl="sig-close-btn"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div data-tl="sig-tabs" className="flex border-b border-gray-100 px-6 pt-2">
          {(["draw", "image", "type", "saved"] as const).map((tab) => {
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                data-tl={`sig-tab-${tab}`}
                onClick={() => onTabChange?.(tab)}
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all capitalize ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="p-6">
          {/* DRAW TAB */}
          {activeTab === "draw" && (
            <div data-tl="sig-draw-pane" className="flex flex-col gap-2">
              <div
                data-tl="sig-draw-canvas-box"
                className="w-full h-40 border border-gray-200 rounded-xl relative bg-white flex items-center justify-center overflow-hidden"
              >
                {/* Drawn scribble SVG */}
                <svg
                  data-tl="sig-draw-svg"
                  viewBox="0 0 300 120"
                  className="w-full h-full pointer-events-none"
                >
                  {hasDrawnPath && (
                    <path
                      d="M 50 70 Q 75 30 110 65 T 160 55 T 210 65 Q 235 50 250 80 M 80 85 Q 140 85 220 80"
                      fill="none"
                      stroke={sigColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <button
                  type="button"
                  data-tl="sig-clear-btn"
                  onClick={onClearDraw}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Clear
                </button>
                <span className="italic text-[11px]">Sign Here</span>
              </div>
            </div>
          )}

          {/* IMAGE TAB */}
          {activeTab === "image" && (
            <div data-tl="sig-image-pane" className="flex flex-col gap-2">
              {hasImageUploaded ? (
                <div className="flex flex-col items-center gap-2">
                  <div
                    data-tl="sig-image-preview-box"
                    className="w-full h-40 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center p-3"
                  >
                    <div className="w-24 h-32 bg-white border border-gray-300 rounded shadow-2xs flex flex-col items-center justify-center p-2">
                      <span className="text-[10px] font-bold text-gray-400 mb-1">SIGNATURE</span>
                      <svg width="60" height="40" viewBox="0 0 60 40">
                        <path
                          d="M5 25 Q 20 5 35 25 T 55 20"
                          fill="none"
                          stroke="#1E3A8A"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tl="sig-remove-image-btn"
                    onClick={onRemoveImage}
                    className="text-red-500 hover:text-red-600 text-xs font-semibold"
                  >
                    Remove &amp; choose another
                  </button>
                </div>
              ) : (
                <div
                  data-tl="sig-image-upload-zone"
                  onClick={onImageAreaClick}
                  className="w-full h-40 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors p-4 text-center bg-gray-50/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">
                    Click or drag to upload a signature image
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    PNG, JPG, GIF, SVG
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TYPE TAB */}
          {activeTab === "type" && (
            <div data-tl="sig-type-pane" className="flex flex-col gap-3">
              {/* Text Input */}
              <input
                type="text"
                data-tl="sig-type-input"
                value={typeInput}
                onChange={(e) => onTypeInputChange?.(e.target.value)}
                placeholder="Type your name"
                className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 font-medium text-gray-800"
              />

              {/* 4 Font Style Cards */}
              <div data-tl="sig-type-styles-grid" className="grid grid-cols-2 gap-2.5 pt-1">
                {typeStyles.map((st) => {
                  const isSelected = typeStyleIndex === st.id;
                  const displayWord = typeInput.trim() || "Your Name";
                  return (
                    <div
                      key={st.id}
                      data-tl={`sig-font-style-${st.id + 1}`}
                      onClick={() => onTypeStyleChange?.(st.id)}
                      className={`h-16 rounded-xl border flex items-center justify-center p-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/40 shadow-2xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span
                        className={`text-base ${st.fontClass}`}
                        style={{ color: sigColor }}
                      >
                        {displayWord}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SAVED TAB */}
          {activeTab === "saved" && (
            <div
              data-tl="sig-saved-pane"
              className="w-full h-40 flex flex-col items-center justify-center text-center p-4 gap-2"
            >
              <Trash2 className="w-7 h-7 text-gray-400 stroke-[1.5]" />
              <p className="text-xs font-bold text-gray-800">
                No saved signatures yet
              </p>
              <p className="text-[11px] text-gray-400 max-w-xs">
                Check &ldquo;Save signature for future use&rdquo; when creating one
              </p>
            </div>
          )}

          {/* Color Dots & Future Use Checkbox */}
          <div className="flex flex-col gap-3 pt-5 border-t border-gray-100 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-700">Color:</span>
              <div className="flex items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    data-tl={`sig-color-${c.name}`}
                    onClick={() => onColorChange?.(c.hex)}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      sigColor === c.hex
                        ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                data-tl="sig-save-future-checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-0"
              />
              <span>Save signature for future use</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            data-tl="sig-cancel-btn"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="sig-done-btn"
            onClick={onDone}
            className="px-6 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
