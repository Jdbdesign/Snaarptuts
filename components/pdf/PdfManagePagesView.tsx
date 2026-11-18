import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  RotateCcw,
  RotateCw,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onCancel?: () => void;
  onSave?: () => void;
}

export function PdfManagePagesView({ isOpen, onCancel, onSave }: Props) {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  if (!isOpen) return null;

  const togglePage = (page: number) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPages.length === 3) {
      setSelectedPages([]);
    } else {
      setSelectedPages([1, 2, 3]);
    }
  };

  return (
    <div
      data-tl="manage-pages-view"
      className="absolute inset-0 bg-[#F3F4F6] z-40 flex flex-col select-none animate-in fade-in duration-150"
    >
      {/* Top Toolbar */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="mp-new-page-btn"
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-[#7014D9] hover:bg-purple-100 rounded-xl font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Page</span>
          </button>

          <div className="h-5 w-px bg-gray-200 mx-1" />

          <button
            type="button"
            data-tl="mp-delete-pages-btn"
            disabled={selectedPages.length === 0}
            className={`p-2 rounded-xl transition-colors ${
              selectedPages.length > 0
                ? "text-rose-600 hover:bg-rose-50"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Delete Pages"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            data-tl="mp-duplicate-btn"
            disabled={selectedPages.length === 0}
            className={`p-2 rounded-xl transition-colors ${
              selectedPages.length > 0
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            type="button"
            data-tl="mp-rotate-left-btn"
            disabled={selectedPages.length === 0}
            className={`p-2 rounded-xl transition-colors ${
              selectedPages.length > 0
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Rotate Left"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            data-tl="mp-rotate-right-btn"
            disabled={selectedPages.length === 0}
            className={`p-2 rounded-xl transition-colors ${
              selectedPages.length > 0
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            }`}
            title="Rotate Right"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          data-tl="mp-select-all-btn"
          onClick={handleSelectAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {selectedPages.length === 3 ? "Deselect All" : "Select All"}
        </button>
      </header>

      {/* Grid of Pages */}
      <main className="flex-1 overflow-y-auto p-10 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 max-w-4xl w-full">
          {[1, 2, 3].map((page) => {
            const isSelected = selectedPages.includes(page);
            return (
              <div
                key={page}
                data-tl={`mp-page-card-${page}`}
                onClick={() => togglePage(page)}
                className={`relative flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-blue-600 ring-4 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Circular Badge */}
                <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {page}
                </div>

                {/* Mock Thumbnail Content */}
                <div className="w-full aspect-3/4 bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col gap-2 pointer-events-none select-none">
                  <div className="w-2/3 h-2.5 bg-gray-800 rounded-xs mx-auto mb-1" />
                  <div className="w-1/2 h-1.5 bg-gray-400 rounded-xs mx-auto mb-2" />
                  <div className="w-full h-px bg-gray-200" />
                  <div className="space-y-1.5 mt-2">
                    <div className="w-full h-1.5 bg-gray-300 rounded-xs" />
                    <div className="w-5/6 h-1.5 bg-gray-300 rounded-xs" />
                    <div className="w-4/6 h-1.5 bg-gray-300 rounded-xs" />
                    <div className="w-full h-1.5 bg-gray-200 rounded-xs mt-3" />
                    <div className="w-3/4 h-1.5 bg-gray-200 rounded-xs" />
                  </div>
                </div>

                <span className="mt-3 text-xs font-semibold text-gray-700">
                  Page {page}
                </span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Footer Bar */}
      <footer className="h-20 bg-white border-t border-gray-200 px-8 flex items-center justify-between">
        <button
          type="button"
          data-tl="mp-cancel-btn"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-xs transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          data-tl="mp-save-btn"
          onClick={onSave}
          className="px-8 py-2.5 rounded-full bg-[#EA580C] hover:bg-orange-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          Save
        </button>
      </footer>
    </div>
  );
}
