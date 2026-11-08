"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, Plus, Trash2, ChevronDown, Check } from "lucide-react";
import type { JournalTemplateLine } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksNewJournalTemplateView({ tl }: Props) {
  const templateName = useTimelineVar<string>(tl, "booksNewTemplateName", "");
  const reference = useTimelineVar<string>(tl, "booksNewTemplateReference", "");
  const notes = useTimelineVar<string>(tl, "booksNewTemplateNotes", "");
  const method = useTimelineVar<string>(tl, "booksNewTemplateMethod", "Accrual and Cash");
  const currency = useTimelineVar<string>(tl, "booksNewTemplateCurrency", "GBP - British Pound");
  const currencyOpen = useTimelineVar<boolean>(tl, "booksNewTemplateCurrencyOpen", false);

  const defaultLines: JournalTemplateLine[] = [
    {
      account: "",
      description: "",
      contact: "",
      txType: "Sales",
      tax: "No Tax",
      type: "Debits",
      amount: 0,
    },
    {
      account: "",
      description: "",
      contact: "",
      txType: "Sales",
      tax: "No Tax",
      type: "Credits",
      amount: 0,
    },
  ];
  const lines = useTimelineVar<JournalTemplateLine[]>(tl, "booksNewTemplateLines", defaultLines);

  const [activeAccountDropdown, setActiveAccountDropdown] = useState<number | null>(null);
  const [activeContactDropdown, setActiveContactDropdown] = useState<number | null>(null);
  const [activeTaxDropdown, setActiveTaxDropdown] = useState<number | null>(null);

  const accountsList = [
    "Accounts Receivable (ASSET)",
    "Sales (INCOME)",
    "Cash on Hand (ASSET)",
    "Cost of Goods Sold (EXPENSE)",
    "Office Supplies (EXPENSE)",
    "Advertising and Marketing (EXPENSE)",
    "Undeposited Funds (ASSET)",
  ];

  const contactsList = [
    "Acme Foods Ltd",
    "Brightway Stores",
    "Northgate Supplies",
    "Metro Wholesale",
    "Delta Logistics",
  ];

  const taxesList = ["No Tax", "Standard Rate (20%)", "Reduced Rate (5%)", "Zero Rate (0%)"];

  // Compute totals
  let totalDebits = 0;
  let totalCredits = 0;
  lines.forEach((l) => {
    if (l.type === "Debits") totalDebits += l.amount || 0;
    if (l.type === "Credits") totalCredits += l.amount || 0;
  });
  const difference = Math.abs(totalDebits - totalCredits);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-templates"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">New Journal Template</h2>
        </div>
      </div>

      <div className="p-8 max-w-5xl mx-auto w-full space-y-6 pb-24">
        {/* Form Fields Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-template-name"
                value={templateName}
                placeholder="e.g. Monthly Accrual"
                readOnly
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Reference#
              </label>
              <input
                type="text"
                data-tl="input-template-ref"
                value={reference}
                placeholder="e.g. 9382"
                readOnly
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Notes
            </label>
            <input
              type="text"
              data-tl="input-template-notes"
              value={notes}
              placeholder="Recurring month-end accrual entry"
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Journal Type
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="journalType"
                    data-tl="radio-type-accrual"
                    checked={method === "Accrual and Cash"}
                    readOnly
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-800">Accrual and Cash</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="journalType"
                    data-tl="radio-type-cash"
                    checked={method === "Cash only"}
                    readOnly
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-800">Cash only</span>
                </label>
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <button
                type="button"
                data-tl="btn-template-currency"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center justify-between text-left shadow-sm"
              >
                <span>{currency}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {currencyOpen && (
                <div
                  data-tl="menu-template-currency"
                  className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1"
                >
                  <button
                    type="button"
                    data-tl="opt-currency-gbp"
                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                  >
                    <span>GBP - British Pound</span>
                    <Check className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    type="button"
                    data-tl="opt-currency-usd"
                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>USD - US Dollar</span>
                  </button>
                  <button
                    type="button"
                    data-tl="opt-currency-eur"
                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span>EUR - Euro</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Journal Line Items</h3>
            <span className="text-xs text-gray-500">All amounts in GBP (£)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3 min-w-[200px]">Account</th>
                  <th className="px-4 py-3 min-w-[180px]">Description</th>
                  <th className="px-4 py-3 min-w-[160px]">Contact</th>
                  <th className="px-4 py-3 min-w-[120px]">Tax</th>
                  <th className="px-4 py-3 min-w-[110px] text-right">Debits (£)</th>
                  <th className="px-4 py-3 min-w-[110px] text-right">Credits (£)</th>
                  <th className="px-3 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    {/* Account */}
                    <td className="px-4 py-3 relative">
                      <button
                        type="button"
                        data-tl={`select-line-account-${idx}`}
                        onClick={() => setActiveAccountDropdown(activeAccountDropdown === idx ? null : idx)}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded text-left text-xs text-gray-900 flex items-center justify-between"
                      >
                        <span className="truncate">{line.account || "Select account"}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                      </button>
                      {activeAccountDropdown === idx && (
                        <div
                          data-tl={`menu-line-account-${idx}`}
                          className="absolute left-4 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                        >
                          {accountsList.map((acc) => (
                            <button
                              key={acc}
                              type="button"
                              data-tl={`opt-account-${acc.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                              onClick={() => setActiveAccountDropdown(null)}
                              className="w-full px-3 py-1.5 text-left text-xs hover:bg-blue-50 text-gray-700 hover:text-blue-600 truncate"
                            >
                              {acc}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        data-tl={`input-line-desc-${idx}`}
                        value={line.description}
                        placeholder="Description"
                        readOnly
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-900"
                      />
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3 relative">
                      <button
                        type="button"
                        data-tl={`select-line-contact-${idx}`}
                        onClick={() => setActiveContactDropdown(activeContactDropdown === idx ? null : idx)}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded text-left text-xs text-gray-900 flex items-center justify-between"
                      >
                        <span className="truncate">{line.contact || "Select contact"}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                      </button>
                      {activeContactDropdown === idx && (
                        <div
                          data-tl={`menu-line-contact-${idx}`}
                          className="absolute left-4 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                        >
                          {contactsList.map((ct) => (
                            <button
                              key={ct}
                              type="button"
                              data-tl={`opt-contact-${ct.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                              onClick={() => setActiveContactDropdown(null)}
                              className="w-full px-3 py-1.5 text-left text-xs hover:bg-blue-50 text-gray-700 hover:text-blue-600 truncate"
                            >
                              {ct}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Tax */}
                    <td className="px-4 py-3 relative">
                      <button
                        type="button"
                        data-tl={`select-line-tax-${idx}`}
                        onClick={() => setActiveTaxDropdown(activeTaxDropdown === idx ? null : idx)}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded text-left text-xs text-gray-900 flex items-center justify-between"
                      >
                        <span className="truncate">{line.tax || "No Tax"}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
                      </button>
                      {activeTaxDropdown === idx && (
                        <div
                          data-tl={`menu-line-tax-${idx}`}
                          className="absolute left-4 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                        >
                          {taxesList.map((tx) => (
                            <button
                              key={tx}
                              type="button"
                              data-tl={`opt-tax-${tx.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                              onClick={() => setActiveTaxDropdown(null)}
                              className="w-full px-3 py-1.5 text-left text-xs hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                            >
                              {tx}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Debits */}
                    <td className="px-4 py-3 text-right">
                      <input
                        type="text"
                        data-tl={`input-line-debit-${idx}`}
                        value={line.type === "Debits" && line.amount ? line.amount.toFixed(2) : ""}
                        placeholder="0.00"
                        readOnly
                        className="w-24 px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-right text-gray-900 font-mono"
                      />
                    </td>

                    {/* Credits */}
                    <td className="px-4 py-3 text-right">
                      <input
                        type="text"
                        data-tl={`input-line-credit-${idx}`}
                        value={line.type === "Credits" && line.amount ? line.amount.toFixed(2) : ""}
                        placeholder="0.00"
                        readOnly
                        className="w-24 px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-right text-gray-900 font-mono"
                      />
                    </td>

                    {/* Trash */}
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        data-tl={`btn-delete-line-${idx}`}
                        className="text-gray-400 hover:text-red-500 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              data-tl="btn-add-line-row"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Row</span>
            </button>

            <div className="flex items-center gap-6 text-xs font-medium text-gray-600">
              <div>
                <span>Subtotal Debits: </span>
                <span className="font-bold text-gray-900 font-mono">£{totalDebits.toFixed(2)}</span>
              </div>
              <div>
                <span>Subtotal Credits: </span>
                <span className="font-bold text-gray-900 font-mono">£{totalCredits.toFixed(2)}</span>
              </div>
              <div className={difference === 0 ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                <span>Difference: </span>
                <span className="font-mono">£{difference.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            data-tl="btn-save-template"
            className="px-6 py-2.5 bg-[#145CFB] hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            data-tl="btn-cancel-template"
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-700 font-medium text-sm rounded-lg border border-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
