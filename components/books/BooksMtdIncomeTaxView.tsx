"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  SlidersHorizontal,
  AlertTriangle,
  X,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksMtdIncomeTaxView({ tl }: Props) {
  const configured = useTimelineVar<boolean>(tl, "booksMtdConfigured", false);
  const modalOpen = useTimelineVar<boolean>(tl, "booksMtdSettingsModalOpen", false);
  const enabled = useTimelineVar<boolean>(tl, "booksMtdEnabled", false);
  const niNumber = useTimelineVar<string>(tl, "booksMtdNiNumber", "");
  const hmrcId = useTimelineVar<string>(tl, "booksMtdHmrcId", "");
  const taxYear = useTimelineVar<string>(tl, "booksMtdTaxYear", "2026-27");

  const prepared = useTimelineVar<boolean>(tl, "booksMtdQuartersPrepared", false);
  const q1Submitted = useTimelineVar<boolean>(tl, "booksMtdQ1Submitted", false);

  const [localNi, setLocalNi] = useState(niNumber);
  const [localId, setLocalId] = useState(hmrcId);

  const quarters = [
    {
      id: "q1",
      name: "Q1",
      period: "06 Apr - 06 Jul",
      income: 6800.0,
      expenses: 2150.0,
      net: 4650.0,
      submitted: q1Submitted,
      dataTlLink: "link-submit-mtd-q1",
    },
    {
      id: "q2",
      name: "Q2",
      period: "06 Jul - 06 Oct",
      income: 7350.0,
      expenses: 2480.0,
      net: 4870.0,
      submitted: false,
      dataTlLink: "link-submit-mtd-q2",
    },
    {
      id: "q3",
      name: "Q3",
      period: "06 Oct - 06 Jan",
      income: 8100.0,
      expenses: 2620.0,
      net: 5480.0,
      submitted: false,
      dataTlLink: "link-submit-mtd-q3",
    },
    {
      id: "q4",
      name: "Q4",
      period: "06 Jan - 06 Apr",
      income: 7900.0,
      expenses: 2550.0,
      net: 5350.0,
      submitted: false,
      dataTlLink: "link-submit-mtd-q4",
    },
  ];

  const handleSaveSettings = () => {
    tl.setVar("booksMtdConfigured", true);
    tl.setVar("booksMtdSettingsModalOpen", false);
    tl.toast("MTD settings saved");
  };

  const handlePrepareQuarters = () => {
    tl.setVar("booksMtdQuartersPrepared", true);
    tl.toast("Quarters prepared");
  };

  const handleSubmitQ1 = () => {
    tl.setVar("booksMtdQ1Submitted", true);
    tl.toast("Quarter marked submitted");
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
              MTD for Income Tax
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mt-1">
              Making Tax Digital for Income Tax requires four quarterly income and expense updates to HMRC each tax year. Prepare each quarter from your books below; online submission to HMRC is part of the upcoming HMRC connection.
            </p>
          </div>

          <button
            type="button"
            data-tl="btn-configure-mtd-settings"
            onClick={() => tl.setVar("booksMtdSettingsModalOpen", true)}
            className="px-3.5 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Configure MTD Settings</span>
          </button>
        </div>

        {/* Yellow Notice Banner (when not configured) */}
        {!configured && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              MTD for Income Tax isn&apos;t enabled yet. Configure your settings (National Insurance number and HMRC business ID) to get ready.
            </p>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700">Tax year</span>
            <input
              type="text"
              data-tl="input-mtd-tax-year"
              value={taxYear}
              readOnly
              className="w-28 px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-800"
            />
          </div>

          <button
            type="button"
            data-tl="btn-prepare-mtd-quarters"
            onClick={handlePrepareQuarters}
            className="px-4 py-1.5 bg-[#145CFB] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Prepare quarters
          </button>
        </div>

        {/* Quarters Table */}
        <div className="border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="py-3 px-5">Quarter</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4 text-right">Income</th>
                <th className="py-3 px-4 text-right">Expenses</th>
                <th className="py-3 px-4 text-right">Net profit</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {quarters.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-gray-900">{q.name}</td>
                  <td className="py-3.5 px-4 text-gray-600">{q.period}</td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    {prepared
                      ? `£${q.income.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    {prepared
                      ? `£${q.expenses.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-gray-900">
                    {prepared
                      ? `£${q.net.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {prepared ? (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          q.submitted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {q.submitted ? "Submitted" : "Open"}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {prepared && !q.submitted ? (
                      <button
                        type="button"
                        data-tl={q.dataTlLink}
                        onClick={q.id === "q1" ? handleSubmitQ1 : undefined}
                        className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Mark submitted
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MTD for Income Tax Settings Modal Dialog (Step 198) */}
      {modalOpen && (
        <div
          data-tl="modal-mtd-settings"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              data-tl="btn-close-mtd-modal"
              onClick={() => tl.setVar("booksMtdSettingsModalOpen", false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-base font-bold text-gray-900">
              MTD for Income Tax settings
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed">
              Configure your National Insurance number and HMRC identifiers to enable Making Tax Digital.
            </p>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  data-tl="checkbox-enable-mtd"
                  checked={enabled}
                  onChange={(e) => tl.setVar("booksMtdEnabled", e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-gray-700">
                  Enable MTD for Income Tax
                </span>
              </label>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  National Insurance number
                </label>
                <input
                  type="text"
                  data-tl="input-mtd-ni-number"
                  value={niNumber || localNi}
                  onChange={(e) => {
                    setLocalNi(e.target.value);
                    tl.setVar("booksMtdNiNumber", e.target.value);
                  }}
                  placeholder="e.g. QQ123456C"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  HMRC business ID (optional)
                </label>
                <input
                  type="text"
                  data-tl="input-mtd-hmrc-id"
                  value={hmrcId || localId}
                  onChange={(e) => {
                    setLocalId(e.target.value);
                    tl.setVar("booksMtdHmrcId", e.target.value);
                  }}
                  placeholder="e.g. XAIT00000123456"
                  className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-modal-save-mtd"
                onClick={handleSaveSettings}
                className="px-5 py-2 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                data-tl="btn-modal-cancel-mtd"
                onClick={() => tl.setVar("booksMtdSettingsModalOpen", false)}
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
