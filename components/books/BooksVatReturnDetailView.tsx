"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  X,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";
import type { VatReturnItem } from "./BooksVatFilingView";

type Props = {
  tl: Timeline;
};

export function BooksVatReturnDetailView({ tl }: Props) {
  const status = useTimelineVar<"DRAFT" | "FINALISED" | "FILED">(
    tl,
    "booksVatReturnStatus",
    "DRAFT"
  );
  const markModalOpen = useTimelineVar<boolean>(
    tl,
    "booksMarkVatFiledModalOpen",
    false
  );
  const hmrcRef = useTimelineVar<string>(tl, "booksVatHmrcRef", "");
  const isSaving = useTimelineVar<boolean>(tl, "booksVatSavingFiled", false);

  const [localRef, setLocalRef] = useState(hmrcRef);

  const boxes = [
    { num: 1, label: "VAT due on sales and other outputs", amount: 1240.0 },
    { num: 2, label: "VAT due on acquisitions (EC)", amount: 0.0 },
    { num: 3, label: "Total VAT due (Box 1 + Box 2)", amount: 1240.0 },
    { num: 4, label: "VAT reclaimed on purchases", amount: 412.5 },
    { num: 5, label: "Net VAT to pay / reclaim", amount: 827.5, bold: true },
    { num: 6, label: "Total value of sales ex-VAT", amount: 6200.0 },
    { num: 7, label: "Total value of purchases ex-VAT", amount: 2062.5 },
    { num: 8, label: "Total value of supplies ex-VAT (EC)", amount: 0.0 },
    { num: 9, label: "Total value of acquisitions ex-VAT (EC)", amount: 0.0 },
  ];

  const handleFinalise = () => {
    tl.setVar("booksVatReturnStatus", "FINALISED");
    tl.toast("Return finalised");
  };

  const handleConfirmFiled = () => {
    tl.setVar("booksVatSavingFiled", true);
    setTimeout(() => {
      tl.setVar("booksVatSavingFiled", false);
      tl.setVar("booksVatReturnStatus", "FILED");
      tl.setVar("booksMarkVatFiledModalOpen", false);

      // Add to returns list in state
      const filedItem: VatReturnItem = {
        id: "vat-oct-2026",
        periodLabel: "VAT return 2026-10-01_2026-10-31",
        startDate: "01 Oct 2026",
        endDate: "31 Oct 2026",
        scheme: "Cash accounting",
        netVat: 827.5,
        status: "FILED",
        hmrcRef: hmrcRef || localRef || "VAT-REF-2026-10",
      };
      tl.setVar("booksVatReturns", [filedItem]);
      tl.toast("Return marked as filed");
    }, 400);
  };

  return (
    <div
      className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto"
      data-scroller="true"
    >
      <div className="px-8 py-7 w-full max-w-6xl space-y-6">
        {/* Back Link */}
        <div>
          <button
            type="button"
            data-tl="btn-back-vat-returns"
            onClick={() => {
              tl.setVar("booksView", "vat-filing");
              tl.setUrl(BOOKS_URLS.vatFiling);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to VAT returns</span>
          </button>
        </div>

        {/* Heading & Controls */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              VAT return 2026-10-01_2026-10-31
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                01 Oct 2026 - 31 Oct 2026 · CASH basis
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                  status === "FILED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : status === "FINALISED"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {status === "DRAFT" && (
              <button
                type="button"
                data-tl="btn-finalise-vat-return"
                onClick={handleFinalise}
                className="px-4 py-2 bg-[#145CFB] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Finalise</span>
              </button>
            )}

            {status === "FINALISED" && (
              <>
                <button
                  type="button"
                  data-tl="btn-mark-vat-filed"
                  onClick={() => tl.setVar("booksMarkVatFiledModalOpen", true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as filed</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-reopen-vat-return"
                  onClick={() => tl.setVar("booksVatReturnStatus", "DRAFT")}
                  className="px-3.5 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Reopen
                </button>
              </>
            )}

            {status === "FILED" && (
              <button
                type="button"
                data-tl="btn-reopen-vat-return"
                onClick={() => tl.setVar("booksVatReturnStatus", "DRAFT")}
                className="px-3.5 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Reopen
              </button>
            )}
          </div>
        </div>

        {/* 9 Boxes Table */}
        <div className="border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-gray-100">
              {boxes.map((b) => (
                <tr
                  key={b.num}
                  className={`${
                    b.bold
                      ? "bg-[#FBFBFB] font-bold text-gray-900"
                      : "text-gray-700 hover:bg-gray-50/50"
                  } transition-colors`}
                >
                  <td className="py-3 px-5 w-24 text-gray-400 font-mono text-[11px]">
                    Box {b.num}
                  </td>
                  <td className="py-3 px-4">{b.label}</td>
                  <td className="py-3 px-5 text-right font-mono">
                    £{b.amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 pb-12">
          {/* Sales by VAT treatment */}
          <div className="border border-gray-200/90 rounded-2xl bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-900">
              Sales by VAT treatment
            </h3>
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-gray-400 border-b border-gray-100 pb-1">
                <tr>
                  <th className="py-1.5 font-medium">Treatment</th>
                  <th className="py-1.5 text-right font-medium">Net amount</th>
                  <th className="py-1.5 text-right font-medium">VAT amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 text-xs">
                <tr>
                  <td className="py-2.5">Standard rate 20%</td>
                  <td className="py-2.5 text-right font-mono">£6,200.00</td>
                  <td className="py-2.5 text-right font-mono">£1,240.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Purchases by VAT treatment */}
          <div className="border border-gray-200/90 rounded-2xl bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-900">
              Purchases by VAT treatment
            </h3>
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-gray-400 border-b border-gray-100 pb-1">
                <tr>
                  <th className="py-1.5 font-medium">Treatment</th>
                  <th className="py-1.5 text-right font-medium">Net amount</th>
                  <th className="py-1.5 text-right font-medium">VAT amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 text-xs">
                <tr>
                  <td className="py-2.5">Standard rate 20%</td>
                  <td className="py-2.5 text-right font-mono">£2,062.50</td>
                  <td className="py-2.5 text-right font-mono">£412.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mark as filed with HMRC modal dialog (Step 195) */}
      {markModalOpen && (
        <div
          data-tl="modal-mark-vat-filed"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              data-tl="btn-close-mark-vat-modal"
              onClick={() => tl.setVar("booksMarkVatFiledModalOpen", false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-gray-900">
              Mark as filed with HMRC
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">
              Record that you filed this VAT return with HMRC.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                HMRC reference (optional)
              </label>
              <input
                type="text"
                data-tl="input-vat-hmrc-ref"
                value={hmrcRef || localRef}
                onChange={(e) => {
                  setLocalRef(e.target.value);
                  tl.setVar("booksVatHmrcRef", e.target.value);
                }}
                placeholder="e.g. VAT-REF-2026-10"
                className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-confirm-vat-filed"
                onClick={handleConfirmFiled}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isSaving ? "Saving..." : "Mark as filed"}
              </button>
              <button
                type="button"
                data-tl="btn-cancel-mark-vat-filed"
                onClick={() => tl.setVar("booksMarkVatFiledModalOpen", false)}
                className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
