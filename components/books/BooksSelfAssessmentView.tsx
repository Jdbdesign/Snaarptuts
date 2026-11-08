"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Plus,
  X,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";

type Props = {
  tl: Timeline;
};

export interface SaReturnItem {
  id: string;
  taxYear: string;
  periodLabel: string;
  netProfit: number;
  estimatedTax: number;
  status: "DRAFT" | "FINALISED" | "FILED";
  hmrcRef?: string;
}

export function BooksSelfAssessmentView({ tl }: Props) {
  const activeTab = useTimelineVar<"to-be-filed" | "all-filings">(
    tl,
    "booksSaActiveTab",
    "to-be-filed"
  );
  const modalOpen = useTimelineVar<boolean>(
    tl,
    "booksGenerateSaModalOpen",
    false
  );
  const taxYear = useTimelineVar<string>(tl, "booksSaTaxYear", "");
  const [localTaxYear, setLocalTaxYear] = useState(taxYear);

  const toBeFiledItems: SaReturnItem[] = [
    {
      id: "sa-2025-26",
      taxYear: "2025-26",
      periodLabel: "06 Apr 2025 - 05 Apr 2026",
      netProfit: 34500.0,
      estimatedTax: 4386.0,
      status: "DRAFT",
    },
  ];

  const filedReturns = useTimelineVar<SaReturnItem[]>(
    tl,
    "booksSaFiledReturns",
    [
      {
        id: "sa-2024-25",
        taxYear: "2024-25",
        periodLabel: "06 Apr 2024 - 05 Apr 2025",
        netProfit: 32800.0,
        estimatedTax: 4046.0,
        status: "FILED",
        hmrcRef: "SA-REF-2024-25",
      },
    ]
  );

  const displayedItems =
    activeTab === "to-be-filed"
      ? toBeFiledItems
      : [...filedReturns, ...toBeFiledItems];

  const handleGenerate = () => {
    tl.setVar("booksGenerateSaModalOpen", false);
    tl.setVar("booksView", "self-assessment-return-detail");
    tl.setUrl(BOOKS_URLS.selfAssessmentReturnDetail);
    tl.toast("Self Assessment return generated");
  };

  return (
    <div
      className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto"
      data-scroller="true"
    >
      <div className="px-8 py-7 w-full max-w-6xl space-y-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Self Assessment
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mt-1">
              Generate your Self Assessment return (SA103 self-employment + SA100 summary) from your trading profit for the tax year, then file it with HMRC and mark it filed.
            </p>
          </div>

          <button
            type="button"
            data-tl="btn-generate-sa-return"
            onClick={() => tl.setVar("booksGenerateSaModalOpen", true)}
            className="px-4 py-2 bg-[#145CFB] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate return</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-medium">
          <button
            type="button"
            data-tl="tab-sa-to-be-filed"
            onClick={() => tl.setVar("booksSaActiveTab", "to-be-filed")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "to-be-filed"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            To Be Filed
          </button>
          <button
            type="button"
            data-tl="tab-sa-all-filings"
            onClick={() => tl.setVar("booksSaActiveTab", "all-filings")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "all-filings"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All Filings
          </button>
        </div>

        {/* Table */}
        <div className="border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="py-3 px-5">Tax year</th>
                <th className="py-3 px-4 text-right">Net profit</th>
                <th className="py-3 px-4 text-right">Estimated tax</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {displayedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-gray-900">
                    <div>{item.taxYear}</div>
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                      {item.periodLabel}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-gray-900">
                    £{item.netProfit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-gray-900">
                    £{item.estimatedTax.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        item.status === "FILED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : item.status === "FINALISED"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      data-tl={`btn-view-sa-${item.taxYear}`}
                      onClick={() => {
                        tl.setVar("booksView", "self-assessment-return-detail");
                        tl.setUrl(BOOKS_URLS.selfAssessmentReturnDetail);
                      }}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Self Assessment Return Modal Dialog (Step 196) */}
      {modalOpen && (
        <div
          data-tl="modal-generate-sa"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              data-tl="btn-close-generate-sa-modal"
              onClick={() => tl.setVar("booksGenerateSaModalOpen", false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-gray-900">
              Generate Self Assessment return
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed">
              The UK tax year runs 6 April to 5 April. Enter the year, e.g. 2025-26.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Tax year<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                data-tl="input-sa-tax-year"
                value={taxYear || localTaxYear}
                onChange={(e) => {
                  setLocalTaxYear(e.target.value);
                  tl.setVar("booksSaTaxYear", e.target.value);
                }}
                placeholder="2025-26"
                className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-modal-generate-sa"
                onClick={handleGenerate}
                className="px-5 py-2 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Generate
              </button>
              <button
                type="button"
                data-tl="btn-modal-cancel-sa"
                onClick={() => tl.setVar("booksGenerateSaModalOpen", false)}
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
