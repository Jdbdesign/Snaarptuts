"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, FileText, CheckCircle2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

interface SampleFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

const SAMPLE_FILES: SampleFile[] = [
  {
    id: "f-supplier-inv",
    name: "supplier-invoice.pdf",
    size: "184 KB",
    type: "PDF Document",
  },
  {
    id: "f-packaging-receipt",
    name: "packaging-receipt.pdf",
    size: "95 KB",
    type: "PDF Document",
  },
  {
    id: "f-order-spec",
    name: "delivery-spec.pdf",
    size: "240 KB",
    type: "PDF Document",
  },
];

export function BooksBillFilePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksBillFilePickerOpen", false);
  const [selectedFileId, setSelectedFileId] = useState<string>("f-supplier-inv");
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = SAMPLE_FILES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectFile = () => {
    const chosen = SAMPLE_FILES.find((f) => f.id === selectedFileId) || SAMPLE_FILES[0];
    tl.setVar("booksBillAttachment", chosen.name);
    tl.setVar("booksBillFilePickerOpen", false);
  };

  const handleClose = () => {
    tl.setVar("booksBillFilePickerOpen", false);
  };

  return (
    <div
      data-tl="modal-bill-file-picker"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 select-none"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Attach File to Bill
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Select a receipt or supplier invoice from your workspace
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-close-bill-file-picker"
            onClick={handleClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* File List */}
        <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
          {filtered.map((file) => {
            const isSelected = file.id === selectedFileId;
            return (
              <div
                key={file.id}
                data-tl={`file-item-${file.id}`}
                onClick={() => setSelectedFileId(file.id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/40 text-blue-900"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-[10px] text-gray-500">
                      {file.size} • {file.type}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4 bg-gray-50">
          <button
            type="button"
            data-tl="btn-cancel-bill-file"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-attach-bill-file"
            onClick={handleSelectFile}
            className="px-4 py-2 rounded-lg bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 cursor-pointer shadow-sm"
          >
            Attach File
          </button>
        </div>
      </div>
    </div>
  );
}
