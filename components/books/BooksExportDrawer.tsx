"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileSpreadsheet, FileText, Loader2, Download, Check } from "lucide-react";

type Props = {
  tl: Timeline;
  rowCount?: number;
};

export function BooksExportDrawer({ tl, rowCount }: Props) {
  const isOpen = useTimelineVar(tl, "booksExportDrawerOpen", false);
  const isExporting = useTimelineVar(tl, "booksExporting", false);
  const isDownloaded = useTimelineVar(tl, "booksExportDownloaded", false);
  const count = useTimelineVar(
    tl,
    "booksExportRowCount",
    rowCount ?? tl.getVar<any[]>("booksItems", []).length ?? 30
  );

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-export-drawer-overlay"
      className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
      onClick={() => tl.setVar("booksExportDrawerOpen", false)}
    >
      <div
        data-tl="books-export-drawer"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-[300px] bg-white border-l border-gray-200 p-5 shadow-2xl animate-in slide-in-from-right duration-200 flex flex-col justify-between"
      >
        <div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Exports the {count} item(s) currently shown in the list, respecting your active filters.
          </p>

          <div className="mt-5 space-y-3">
            {/* CSV Card (Selected) */}
            <div
              data-tl="export-opt-csv"
              className="flex items-center gap-3 rounded-xl border-2 border-blue-500 bg-blue-50/40 p-3.5 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FileSpreadsheet size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">CSV</p>
                <p className="text-[11px] text-gray-500">Spreadsheet-friendly format</p>
              </div>
            </div>

            {/* PDF Card (Disabled) */}
            <div
              data-tl="export-opt-pdf"
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 opacity-60 cursor-not-allowed"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                <FileText size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">PDF</p>
                <p className="text-[11px] text-gray-500">Not available yet</p>
              </div>
            </div>
          </div>

          {isDownloaded && (
            <div
              data-tl="export-downloaded-card"
              className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-emerald-800"
            >
              <Download size={16} className="text-emerald-600 shrink-0" />
              <span>Downloaded: <strong>products-export.csv</strong></span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-run-export"
            disabled={isExporting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <span>Export</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
