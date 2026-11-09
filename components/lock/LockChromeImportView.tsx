"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Globe,
  Info,
  Upload,
  FileText,
  CheckCircle,
  RefreshCw,
  Rocket,
} from "lucide-react";
import { CHROME_IMPORT_ITEMS, LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockChromeImportView({ tl }: Props) {
  const fileChosen = useTimelineVar<boolean>(tl, "lockFileChosen", false);
  const importProgress = useTimelineVar<number>(tl, "lockImportProgress", 0);
  const importComplete = useTimelineVar<boolean>(tl, "lockImportComplete", false);

  const handleBack = () => {
    tl.setVar("lockView", "import");
    tl.setUrl(LOCK_URLS.import);
  };

  const handleOpenDropzone = () => {
    tl.setVar("lockFileChooserOpen", true);
  };

  const handleStartImport = () => {
    if (importProgress > 0) return;
    tl.setVar("lockImportProgress", 25);
  };

  const handleResetImport = () => {
    tl.setVar("lockFileChosen", false);
    tl.setVar("lockImportProgress", 0);
    tl.setVar("lockImportComplete", false);
  };

  return (
    <div
      data-tl="lock-chrome-import-container"
      data-lock-scroll="true"
      className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F8F9FA]"
    >
      <div className="max-w-[760px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            data-tl="btn-chrome-back"
            onClick={handleBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div data-tl="chrome-header-title">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                Google Chrome
              </h1>
              <p className="text-xs text-gray-500">
                Upload your exported CSV or JSON file
              </p>
            </div>
          </div>
        </div>

        {/* How to export notice */}
        <div
          data-tl="box-chrome-notice"
          className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-4 py-2.5 my-4 flex items-center gap-2.5 text-xs text-[#1E40AF]"
        >
          <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
          <span>
            How to export: Settings &rarr; Passwords &rarr; (three dots) &rarr; Export passwords
          </span>
        </div>

        {/* Result: Import Complete card */}
        {importComplete ? (
          <div
            data-tl="card-import-complete"
            className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center max-w-[480px] mx-auto mt-6 shadow-xs flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-3">
              <Rocket className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Import Complete
            </h2>
            <p className="text-xs text-gray-600 mb-6">
              142 passwords imported successfully into your vault.
            </p>
            <button
              type="button"
              data-tl="btn-import-more"
              onClick={handleResetImport}
              className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Import More</span>
            </button>
          </div>
        ) : (
          <>
            {/* Dropzone */}
            {!fileChosen ? (
              <div
                data-tl="dropzone-chrome"
                onClick={handleOpenDropzone}
                className="border-2 border-dashed border-[#DDD6FE] bg-[#FAF5FF] hover:bg-[#F3E8FF]/60 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-[130px]"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] mb-2">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">
                  Click to select file
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  Accepts CSV or JSON file
                </span>
              </div>
            ) : (
              <div
                data-tl="dropzone-selected"
                className="border border-[#DDD6FE] bg-[#FAF5FF] rounded-xl p-4 flex items-center justify-between h-[85px] animate-in fade-in duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#7C3AED] leading-tight">
                      Chrome Passwords.csv
                    </h3>
                    <span className="text-[11px] text-gray-500">
                      18 KB • CSV File
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ready</span>
                </div>
              </div>
            )}

            {/* When file is chosen: Summary row & Table & Progress */}
            {fileChosen && (
              <div className="mt-5 animate-in fade-in duration-200">
                {/* Summary bar */}
                <div
                  data-tl="bar-import-summary"
                  className="flex items-center justify-between mb-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-gray-900">
                      142 items found
                    </span>
                  </div>

                  <button
                    type="button"
                    data-tl="btn-run-import"
                    onClick={handleStartImport}
                    disabled={importProgress > 0}
                    className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs ${
                      importProgress > 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white cursor-pointer"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import 142 items</span>
                  </button>
                </div>

                {/* Progress bar */}
                {importProgress > 0 && (
                  <div
                    data-tl="bar-import-progress"
                    className="mb-4 bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-xs animate-in fade-in duration-150"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-[#7C3AED] animate-spin" />
                        <span>Importing... {importProgress}%</span>
                      </div>
                      <span className="font-bold text-[#7C3AED]">{importProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7C3AED] transition-all duration-300 rounded-full"
                        style={{ width: `${importProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Table of items */}
                <div
                  data-tl="table-import-items"
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs"
                >
                  <div className="bg-[#F9FAFB] border-b border-[#E5E7EB] grid grid-cols-12 px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <span className="col-span-4">Name</span>
                    <span className="col-span-4">URL</span>
                    <span className="col-span-4">Username</span>
                  </div>

                  <div
                    data-scroller="import-table"
                    className="max-h-[220px] overflow-y-auto no-scrollbar divide-y divide-[#F3F4F6]"
                  >
                    {CHROME_IMPORT_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 px-4 py-2 text-xs items-center hover:bg-gray-50/80 transition-colors"
                      >
                        <span className="col-span-4 font-semibold text-gray-900 truncate pr-2">
                          {item.name}
                        </span>
                        <span className="col-span-4 text-gray-500 truncate text-[11px] pr-2">
                          {item.url}
                        </span>
                        <span className="col-span-4 text-gray-600 truncate">
                          {item.username}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    data-tl="table-footer-count"
                    className="px-4 py-2 bg-[#F9FAFB] border-t border-[#E5E7EB] text-xs text-gray-500 font-medium"
                  >
                    Showing 10 of 142 items
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
