"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Upload, FileSpreadsheet, Loader2, Check } from "lucide-react";
import { CSV_IMPORT_ITEMS, type BookItem } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksImportDrawer({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksImportDrawerOpen", false);
  const selectedFile = useTimelineVar(tl, "booksCsvSelectedFile", "");
  const isImporting = useTimelineVar(tl, "booksImporting", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-import-drawer-overlay"
      className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
      onClick={() => tl.setVar("booksImportDrawerOpen", false)}
    >
      <div
        data-tl="books-import-drawer"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-[300px] bg-white border-l border-gray-200 p-5 shadow-2xl animate-in slide-in-from-right duration-200 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 pb-3 border-b border-gray-100">
            Import Items
          </h3>

          <div className="mt-5">
            <div
              data-tl="btn-upload-csv-box"
              onClick={() => tl.setVar("booksCsvPickerOpen", true)}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-white p-6 text-center cursor-pointer hover:bg-blue-50/40 transition-colors"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                <Upload size={22} />
              </span>
              <p className="text-sm font-medium text-blue-600">Choose a CSV file</p>
              <p className="mt-1 text-xs text-gray-500">Upload your item&apos;s CSV export</p>
            </div>

            {selectedFile && (
              <div
                data-tl="import-selected-file-badge"
                className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileSpreadsheet size={18} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-medium text-gray-800 truncate">{selectedFile}</span>
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0">
                  <Check size={11} strokeWidth={3} />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-run-import"
            disabled={!selectedFile || isImporting}
            onClick={() => {
              tl.setVar("booksImporting", true);
              setTimeout(() => {
                tl.setVar("booksImporting", false);
                tl.setVar("booksImportDrawerOpen", false);
                const current = tl.getVar<BookItem[]>("booksItems", []);
                tl.setVar("booksItems", [...CSV_IMPORT_ITEMS, ...current]);
                tl.setVar("booksToastMessage", "Items imported successfully.");
                tl.setVar("booksToastOpen", true);
              }, 400);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isImporting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <span>Import</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
