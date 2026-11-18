import React from "react";
import { X, FileText, Image as ImageIcon, FileSpreadsheet, Presentation } from "lucide-react";
import { EXPORT_FORMATS } from "./pdf-data";

interface Props {
  isOpen: boolean;
  selectedFormat: string;
  fileName: string;
  onSelectFormat?: (formatId: string) => void;
  onFileNameChange?: (name: string) => void;
  onCancel?: () => void;
  onDownload?: () => void;
}

export function PdfExportModal({
  isOpen,
  selectedFormat,
  fileName,
  onSelectFormat,
  onFileNameChange,
  onCancel,
  onDownload,
}: Props) {
  if (!isOpen) return null;

  const getFormatIcon = (id: string) => {
    switch (id) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "png":
      case "jpg":
        return <ImageIcon className="w-5 h-5 text-emerald-600" />;
      case "word":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "excel":
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case "pptx":
        return <Presentation className="w-5 h-5 text-orange-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 select-none">
      <div
        data-tl="export-modal"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col p-6 gap-6 animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Great Job! 🎉
            </h2>
            <p className="text-xs text-gray-500">
              Your document is ready to download. Choose your preferred format below.
            </p>
          </div>
          <button
            type="button"
            data-tl="export-close-btn"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Cards Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Select Format
          </label>
          <div data-tl="export-formats-grid" className="grid grid-cols-3 gap-3">
            {EXPORT_FORMATS.map((fmt) => {
              const isSelected = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  data-tl={`export-format-${fmt.id}`}
                  onClick={() => onSelectFormat?.(fmt.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-red-600 bg-red-50/50 shadow-xs"
                      : "border-gray-200 bg-gray-50/40 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-2xs mb-2">
                    {getFormatIcon(fmt.id)}
                  </div>
                  <span className="text-xs font-bold text-gray-800">
                    {fmt.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {fmt.ext}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* File Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            File Name
          </label>
          <input
            type="text"
            data-tl="export-filename-input"
            value={fileName}
            onChange={(e) => onFileNameChange?.(e.target.value)}
            placeholder="Enter file name"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium"
          />
          <p data-tl="export-filename-helper" className="text-[10.5px] text-gray-400">
            {fileName.length}/200 characters. Allowed: letters, numbers, spaces, hyphens, underscores.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="export-cancel-btn"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="export-download-btn"
            onClick={onDownload}
            className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
