"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Upload, FileSpreadsheet, CheckCircle2, RotateCw } from "lucide-react";
import {
  type CustomerItem,
  CSV_IMPORT_CUSTOMERS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCustomerImportDrawer({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksCustomerImportDrawerOpen", false);
  const selectedFile = useTimelineVar(tl, "booksCustomerCsvSelectedFile", "");
  const isImporting = useTimelineVar(tl, "booksCustomerImporting", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="customer-import-drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[1px] transition-opacity"
    >
      <div
        className="fixed inset-0"
        onClick={() => tl.setVar("booksCustomerImportDrawerOpen", false)}
      />

      <div className="relative flex h-full w-[440px] flex-col bg-white p-6 shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Import Customers
          </h2>
          <button
            type="button"
            data-tl="btn-close-customer-import"
            onClick={() => tl.setVar("booksCustomerImportDrawerOpen", false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <p className="text-xs text-gray-500 mb-4">
            Upload your customer records from a CSV spreadsheet.
          </p>

          <div>
            {!selectedFile ? (
              <div
                data-tl="btn-upload-customer-csv-box"
                onClick={() => tl.setVar("booksCustomerCsvPickerOpen", true)}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-white p-8 text-center cursor-pointer hover:bg-blue-50/40 transition-colors"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                  <Upload size={22} />
                </span>
                <p className="text-sm font-medium text-blue-600">Choose a CSV file</p>
                <p className="mt-1 text-xs text-gray-500">
                  Upload your customers CSV export
                </p>
              </div>
            ) : (
              <div
                data-tl="customer-import-file-row"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3.5"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileSpreadsheet size={20} className="text-emerald-600 shrink-0" />
                  <div className="truncate text-left">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {selectedFile}
                    </p>
                    <p className="text-[11px] text-gray-500">3 customer records ready</p>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-run-customer-import"
            disabled={!selectedFile || isImporting}
            onClick={() => {
              tl.setVar("booksCustomerImporting", true);
              setTimeout(() => {
                tl.setVar("booksCustomerImporting", false);
                tl.setVar("booksCustomerImportDrawerOpen", false);
                const current = tl.getVar<CustomerItem[]>("booksCustomers", []);
                tl.setVar("booksCustomers", [...CSV_IMPORT_CUSTOMERS, ...current]);
                tl.setVar("booksToastMessage", "Customers imported successfully.");
                tl.setVar("booksToastOpen", true);
              }, 800);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-medium text-white hover:bg-blue-700 shadow-sm transition-colors cursor-pointer disabled:opacity-40"
          >
            {isImporting ? (
              <>
                <RotateCw size={15} className="animate-spin" />
                <span>Importing customers...</span>
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
