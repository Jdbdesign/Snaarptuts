import React from "react";
import { X, FileText, Image as ImageIcon, Check } from "lucide-react";
import { PICKER_FILES, type PickerFile } from "./pdf-data";

interface Props {
  isOpen: boolean;
  selectedFileId: string | null;
  onSelectFile: (file: PickerFile) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PdfFilePickerModal({
  isOpen,
  selectedFileId,
  onSelectFile,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="file-picker-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="file-picker-modal"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Select File</h3>
            <p className="text-[11px] text-gray-500">Choose a file to upload</p>
          </div>
          <button
            type="button"
            data-tl="picker-close-btn"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* File List */}
        <div className="p-4 max-h-72 overflow-y-auto space-y-2">
          {PICKER_FILES.map((file) => {
            const isSelected = selectedFileId === file.id;
            return (
              <div
                key={file.id}
                data-tl={`picker-file-${file.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => onSelectFile(file)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-purple-600 bg-purple-50/50 shadow-2xs"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      file.type === "pdf"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {file.type === "pdf" ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <ImageIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{file.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{file.size}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            data-tl="picker-cancel-btn"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 bg-white border border-gray-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="picker-open-btn"
            onClick={onConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5E10B8] rounded-xl shadow-xs transition-all"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
