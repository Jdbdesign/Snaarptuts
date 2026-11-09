"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileText, X, Check } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function LockFileChooserModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "lockFileChooserOpen", false);
  const [selectedFile, setSelectedFile] = useState<string>("chrome-csv");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("lockFileChooserOpen", false);
  };

  const handleOpen = () => {
    tl.setVar("lockFileChooserOpen", false);
    tl.setVar("lockFileChosen", true);
    tl.setVar("lockToast", "Found 142 items to import");
  };

  return (
    <div
      data-tl="modal-file-chooser-backdrop"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="file-chooser-modal"
        className="bg-white rounded-2xl p-5 shadow-2xl max-w-[460px] w-full flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Select File to Import
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Choose an exported CSV or JSON password file
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-close-chooser"
            onClick={handleClose}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* File items list */}
        <div className="flex flex-col gap-2 my-2">
          {/* Chrome CSV row */}
          <div
            data-tl="file-row-chrome-csv"
            onClick={() => setSelectedFile("chrome-csv")}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
              selectedFile === "chrome-csv"
                ? "border-[#7C3AED] bg-[#F5F3FF]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedFile === "chrome-csv"
                    ? "bg-[#EDE9FE] text-[#7C3AED]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold leading-tight ${
                    selectedFile === "chrome-csv" ? "text-[#7C3AED]" : "text-gray-900"
                  }`}
                >
                  Chrome Passwords.csv
                </h4>
                <span className="text-[10px] text-gray-500">
                  18 KB • CSV File
                </span>
              </div>
            </div>

            {selectedFile === "chrome-csv" && (
              <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Backup CSV row */}
          <div
            data-tl="file-row-backup-csv"
            onClick={() => setSelectedFile("backup-csv")}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
              selectedFile === "backup-csv"
                ? "border-[#7C3AED] bg-[#F5F3FF]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedFile === "backup-csv"
                    ? "bg-[#EDE9FE] text-[#7C3AED]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold leading-tight ${
                    selectedFile === "backup-csv" ? "text-[#7C3AED]" : "text-gray-900"
                  }`}
                >
                  passwords_backup_2026.csv
                </h4>
                <span className="text-[10px] text-gray-500">
                  12 KB • CSV File
                </span>
              </div>
            </div>

            {selectedFile === "backup-csv" && (
              <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Credentials JSON row */}
          <div
            data-tl="file-row-export-json"
            onClick={() => setSelectedFile("export-json")}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
              selectedFile === "export-json"
                ? "border-[#7C3AED] bg-[#F5F3FF]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedFile === "export-json"
                    ? "bg-[#EDE9FE] text-[#7C3AED]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold leading-tight ${
                    selectedFile === "export-json" ? "text-[#7C3AED]" : "text-gray-900"
                  }`}
                >
                  credentials_export.json
                </h4>
                <span className="text-[10px] text-gray-500">
                  24 KB • JSON File
                </span>
              </div>
            </div>

            {selectedFile === "export-json" && (
              <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F3F4F6] mt-2">
          <button
            type="button"
            data-tl="btn-chooser-cancel"
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-chooser-open"
            onClick={handleOpen}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-xs transition-colors cursor-pointer"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
