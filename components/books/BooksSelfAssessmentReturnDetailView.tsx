"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";
import type { SaReturnItem } from "./BooksSelfAssessmentView";

type Props = {
  tl: Timeline;
};

export function BooksSelfAssessmentReturnDetailView({ tl }: Props) {
  const status = useTimelineVar<"DRAFT" | "FINALISED" | "FILED">(
    tl,
    "booksSaReturnStatus",
    "DRAFT"
  );
  const markModalOpen = useTimelineVar<boolean>(
    tl,
    "booksMarkSaFiledModalOpen",
    false
  );
  const hmrcRef = useTimelineVar<string>(tl, "booksSaHmrcRef", "");
  const isSaving = useTimelineVar<boolean>(tl, "booksSaSavingFiled", false);

  const [localRef, setLocalRef] = useState(hmrcRef);

  const rows = [
    { label: "Turnover (business income)", amount: 48000.0 },
    { label: "Allowable business expenses", amount: 15200.0 },
    { label: "Net profit", amount: 32800.0, bold: true },
    { label: "Personal allowance", amount: 12570.0 },
    { label: "Taxable profit", amount: 20230.0 },
    { label: "Estimated income tax", amount: 4046.0, bold: true },
  ];

  const handleFinalise = () => {
    tl.setVar("booksSaReturnStatus", "FINALISED");
    tl.toast("Return finalised");
  };

  const handleConfirmFiled = () => {
    tl.setVar("booksSaSavingFiled", true);
    setTimeout(() => {
      tl.setVar("booksSaSavingFiled", false);
      tl.setVar("booksSaReturnStatus", "FILED");
      tl.setVar("booksMarkSaFiledModalOpen", false);

      const filedItem: SaReturnItem = {
        id: "sa-2024-25",
        taxYear: "2024-25",
        periodLabel: "06 Apr 2024 - 05 Apr 2025",
        netProfit: 32800.0,
        estimatedTax: 4046.0,
        status: "FILED",
        hmrcRef: hmrcRef || localRef || "SA-REF-2024-25",
      };
      tl.setVar("booksSaFiledReturns", [filedItem]);
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
            data-tl="btn-back-sa-returns"
            onClick={() => {
              tl.setVar("booksView", "self-assessment");
              tl.setUrl(BOOKS_URLS.selfAssessment);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Self Assessment</span>
          </button>
        </div>

        {/* Heading & Controls */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Self Assessment 2024-25
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                06 Apr 2024 - 05 Apr 2025
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
                data-tl="btn-finalise-sa-return"
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
                  data-tl="btn-mark-sa-filed"
                  onClick={() => tl.setVar("booksMarkSaFiledModalOpen", true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as filed</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-reopen-sa-return"
                  onClick={() => tl.setVar("booksSaReturnStatus", "DRAFT")}
                  className="px-3.5 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Reopen
                </button>
              </>
            )}

            {status === "FILED" && (
              <button
                type="button"
                data-tl="btn-reopen-sa-return"
                onClick={() => tl.setVar("booksSaReturnStatus", "DRAFT")}
                className="px-3.5 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Reopen
              </button>
            )}
          </div>
        </div>

        {/* Yellow Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            The estimated tax is a guide based on your trading profit and the standard bands. HMRC produces the binding calculation. National Insurance, dividends and other income are not included here.
          </p>
        </div>

        {/* Calculation Table */}
        <div className="border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-gray-100">
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className={`${
                    r.bold
                      ? "bg-[#FBFBFB] font-bold text-gray-900"
                      : "text-gray-700 hover:bg-gray-50/50"
                  } transition-colors`}
                >
                  <td className="py-3.5 px-5">{r.label}</td>
                  <td className="py-3.5 px-5 text-right font-mono">
                    £{r.amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark as filed with HMRC modal dialog (Step 197) */}
      {markModalOpen && (
        <div
          data-tl="modal-mark-sa-filed"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              data-tl="btn-close-mark-sa-modal"
              onClick={() => tl.setVar("booksMarkSaFiledModalOpen", false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-gray-900">
              Mark as filed with HMRC
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">
              Record that you filed this Self Assessment return with HMRC.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                HMRC reference (optional)
              </label>
              <input
                type="text"
                data-tl="input-sa-hmrc-ref"
                value={hmrcRef || localRef}
                onChange={(e) => {
                  setLocalRef(e.target.value);
                  tl.setVar("booksSaHmrcRef", e.target.value);
                }}
                placeholder="e.g. SA-REF-2024-25"
                className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-confirm-sa-filed"
                onClick={handleConfirmFiled}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isSaving ? "Saving..." : "Mark as filed"}
              </button>
              <button
                type="button"
                data-tl="btn-cancel-mark-sa-filed"
                onClick={() => tl.setVar("booksMarkSaFiledModalOpen", false)}
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
