"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Upload, FileSpreadsheet, CheckCircle2, RotateCw } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceImportDrawer({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksInvoiceImportDrawerOpen", false);
  const selectedFile = useTimelineVar(tl, "booksInvoiceCsvSelectedFile", "");
  const isImporting = useTimelineVar(tl, "booksInvoiceImporting", false);

  if (!isOpen) return null;

  const handleImport = () => {
    tl.setVar("booksInvoiceImporting", true);

    setTimeout(() => {
      tl.setVar("booksInvoiceImporting", false);
      tl.setVar("booksInvoiceImportDrawerOpen", false);
      tl.setVar("booksInvoiceCsvSelectedFile", "");
      tl.setVar("booksToastText", "Invoices imported successfully.");
      tl.setVar("booksToastOpen", true);
    }, 400);
  };

  return (
    <div
      data-tl="invoice-import-drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[1px] transition-opacity"
    >
      <div
        className="fixed inset-0"
        onClick={() => tl.setVar("booksInvoiceImportDrawerOpen", false)}
      />

      <div className="relative flex h-full w-[440px] flex-col bg-white p-6 shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Import Invoices
          </h2>
          <button
            type="button"
            data-tl="btn-close-invoice-import"
            onClick={() => tl.setVar("booksInvoiceImportDrawerOpen", false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <p className="text-xs text-gray-500 mb-4">
            Upload your sales invoice records from a CSV spreadsheet.
          </p>

          <div>
            {!selectedFile ? (
              <div
                data-tl="btn-upload-invoice-csv-box"
                onClick={() => tl.setVar("booksInvoiceCsvPickerOpen", true)}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-white p-8 text-center cursor-pointer hover:bg-blue-50/40 transition-colors"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
                  <Upload size={22} />
                </span>
                <p className="text-sm font-medium text-blue-600">Choose a CSV file</p>
                <p className="mt-1 text-xs text-gray-500">
                  Upload your invoices CSV export
                </p>
              </div>
            ) : (
              <div
                data-tl="invoice-import-file-row"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile}
                    </p>
                    <p className="text-xs text-gray-400">14.2 KB</p>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              File Requirements
            </h3>
            <ul className="mt-2 space-y-1 text-xs text-gray-500 list-disc list-inside">
              <li>Header row with column names</li>
              <li>Columns: Invoice Number, Customer, Date, Total, Status</li>
              <li>UTF-8 encoded CSV file</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-cancel-invoice-import"
            onClick={() => tl.setVar("booksInvoiceImportDrawerOpen", false)}
            className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-submit-invoice-import"
            disabled={!selectedFile || isImporting}
            onClick={handleImport}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold text-white transition-colors shadow-sm ${
              selectedFile && !isImporting
                ? "bg-[#7014D9] hover:bg-[#5b0fb3] cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isImporting && <RotateCw size={14} className="animate-spin" />}
            {isImporting ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    </div>
  );
}
