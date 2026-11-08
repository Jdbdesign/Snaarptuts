"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Package,
  FileText,
  CreditCard,
  Truck,
  Users,
  Upload,
  CheckCircle2,
} from "lucide-react";
import {
  IMPORT_CATEGORIES,
  type ImportCategory,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksImportDataView({ tl }: Props) {
  const selectedType = useTimelineVar<ImportCategory>(tl, "booksImportType", "items");
  const file = useTimelineVar<string | null>(tl, "booksImportFile", null);
  const isComplete = useTimelineVar<boolean>(tl, "booksImportComplete", false);

  const currentCategory =
    IMPORT_CATEGORIES.find((cat) => cat.id === selectedType) || IMPORT_CATEGORIES[0];

  const renderCategoryIcon = (icon: string) => {
    switch (icon) {
      case "package":
        return <Package className="w-5 h-5 text-blue-600 shrink-0" />;
      case "file-text":
        return <FileText className="w-5 h-5 text-gray-400 shrink-0" />;
      case "credit-card":
        return <CreditCard className="w-5 h-5 text-gray-400 shrink-0" />;
      case "truck":
        return <Truck className="w-5 h-5 text-gray-400 shrink-0" />;
      case "users":
        return <Users className="w-5 h-5 text-gray-400 shrink-0" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400 shrink-0" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto" data-scroller="true">
      <div className="w-full max-w-4xl mx-auto px-8 py-8">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Import Data</h1>
          <p className="text-xs text-gray-500 mt-1">
            Migrate your items, invoices, expenses, vendors, and customers from a CSV export. Upload
            one file at a time.
          </p>
        </div>

        {/* Section 1: What are you importing? */}
        <div className="mt-7">
          <h2 className="text-xs font-semibold text-gray-900 mb-3">1. What are you importing?</h2>
          <div className="grid grid-cols-2 gap-3 max-w-2xl">
            {IMPORT_CATEGORIES.map((cat) => {
              const isSelected = selectedType === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  data-tl={`card-import-type-${cat.id}`}
                  onClick={() => {
                    tl.setVar("booksImportType", cat.id);
                    // Reset upload state on type change
                    tl.setVar("booksImportFile", null);
                    tl.setVar("booksImportComplete", false);
                  }}
                  className={`text-left rounded-xl p-3.5 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? "border-2 border-blue-600 bg-blue-50/40 shadow-xs"
                      : "border border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="mt-0.5">{renderCategoryIcon(cat.icon)}</div>
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        isSelected ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {cat.name}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Upload CSV */}
        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-900 mb-3">
            2. Upload the {currentCategory.name} CSV
          </h2>

          {!file ? (
            /* Empty state: Dropzone */
            <div
              data-tl="dropzone-csv"
              onClick={() => tl.setVar("booksCsvPickerOpen", true)}
              className="border-2 border-dashed border-gray-200 rounded-xl p-9 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-300 transition-colors max-w-2xl bg-white"
            >
              <Upload className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs font-medium text-blue-600">Choose a CSV file</span>
              <span className="text-[11px] text-gray-400 mt-0.5">
                CSV export from your previous system
              </span>
            </div>
          ) : (
            /* File selected & preview table */
            <div className="space-y-4 max-w-2xl">
              <div
                data-tl="card-attached-file"
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{file}</p>
                      <p className="text-[11px] text-gray-400">2 data rows · 6 columns</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tl="btn-choose-diff-file"
                    onClick={() => {
                      tl.setVar("booksImportFile", null);
                      tl.setVar("booksImportComplete", false);
                      tl.setVar("booksCsvPickerOpen", true);
                    }}
                    className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Choose a different file
                  </button>
                </div>

                {/* Preview Table */}
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-[11px] font-medium text-gray-400">
                        <th className="pb-2 pl-1 font-medium">Item Name</th>
                        <th className="pb-2 font-medium">Unit</th>
                        <th className="pb-2 font-medium">Rate</th>
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-50 text-gray-700">
                        <td className="py-2.5 pl-1 font-medium text-gray-900">
                          Organic Rice 25kg
                        </td>
                        <td className="py-2.5">bag</td>
                        <td className="py-2.5 font-mono">29.00</td>
                        <td className="py-2.5">goods</td>
                        <td className="py-2.5">
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">
                            active
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-500">VAT Standard (20%)</td>
                      </tr>
                      <tr className="border-b border-gray-50 text-gray-700">
                        <td className="py-2.5 pl-1 font-medium text-gray-900">Palm Oil 5L</td>
                        <td className="py-2.5">can</td>
                        <td className="py-2.5 font-mono">11.00</td>
                        <td className="py-2.5">goods</td>
                        <td className="py-2.5">
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">
                            active
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-500">VAT Standard (20%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Import Button (before complete) */}
              {!isComplete && (
                <button
                  type="button"
                  data-tl="btn-import-submit"
                  onClick={() => {
                    tl.setVar("booksImportComplete", true);
                    tl.toast("Import started - 2 rows queued");
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Import 2 rows
                </button>
              )}

              {/* Complete State Result Card */}
              {isComplete && (
                <div
                  data-tl="block-import-complete"
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="text-xs font-bold text-gray-900">Import complete</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div
                      data-tl="stat-created"
                      className="rounded-xl bg-gray-50/80 p-3.5 text-center border border-gray-100"
                    >
                      <div className="text-xl font-bold text-emerald-600">2</div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">Created</div>
                    </div>
                    <div
                      data-tl="stat-skipped"
                      className="rounded-xl bg-gray-50/80 p-3.5 text-center border border-gray-100"
                    >
                      <div className="text-xl font-bold text-gray-900">0</div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">Skipped</div>
                    </div>
                    <div
                      data-tl="stat-errors"
                      className="rounded-xl bg-gray-50/80 p-3.5 text-center border border-gray-100"
                    >
                      <div className="text-xl font-bold text-gray-900">0</div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">Errors</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-tl="btn-import-another"
                    onClick={() => {
                      tl.setVar("booksImportFile", null);
                      tl.setVar("booksImportComplete", false);
                    }}
                    className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Import another file
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
