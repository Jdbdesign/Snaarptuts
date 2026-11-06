"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type RecurringInvoiceItem,
  INITIAL_RECURRING_INVOICES,
} from "./books-data";
import { ChevronDown, ArrowLeft } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditRecurringInvoiceView({ tl }: Props) {
  const activeProfile = useTimelineVar<RecurringInvoiceItem>(
    tl,
    "booksActiveRecurring",
    INITIAL_RECURRING_INVOICES[0]
  );

  const [paymentTerms, setPaymentTerms] = useState<string>(
    activeProfile?.paymentTerms || "Net 15"
  );
  const [termsDropdownOpen, setTermsDropdownOpen] = useState(false);

  const handleSave = () => {
    const updated: RecurringInvoiceItem = {
      ...activeProfile,
      paymentTerms,
    };
    tl.setVar("booksActiveRecurring", updated);

    const profiles = tl.getVar<RecurringInvoiceItem[]>(
      "booksRecurringInvoices",
      INITIAL_RECURRING_INVOICES
    );
    tl.setVar(
      "booksRecurringInvoices",
      profiles.map((p) => (p.id === updated.id ? updated : p))
    );

    tl.setVar("booksView", "recurring-detail");
    tl.setUrl(BOOKS_URLS.recurringDetails);
    tl.setVar("booksToastText", "Recurring invoice updated successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksView", "recurring-detail");
    tl.setUrl(BOOKS_URLS.recurringDetails);
  };

  return (
    <div
      data-tl="books-edit-recurring-invoice-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-cancel-edit-recurring"
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Edit Recurring Profile — {activeProfile?.profileName || "Monthly Retainer"}
            </h1>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Customer Name
              </label>
              <input
                type="text"
                readOnly
                value={activeProfile?.customerName || "Acme Foods Ltd"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Profile Name
              </label>
              <input
                type="text"
                readOnly
                value={activeProfile?.profileName || "Monthly Retainer"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Frequency
              </label>
              <input
                type="text"
                readOnly
                value={activeProfile?.frequency || "Monthly"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            {/* Payment Terms Field */}
            <div className="relative">
              <label className="font-semibold text-gray-700 block mb-1">
                Payment Terms <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-edit-recurring-terms"
                onClick={() => setTermsDropdownOpen(!termsDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-gray-900">{paymentTerms}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {termsDropdownOpen && (
                <div
                  data-tl="menu-edit-recurring-terms"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="terms-opt-net30"
                    onClick={() => {
                      setPaymentTerms("Net 30");
                      setTermsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                  >
                    Net 30
                  </button>
                  <button
                    type="button"
                    data-tl="terms-opt-net15"
                    onClick={() => {
                      setPaymentTerms("Net 15");
                      setTermsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                  >
                    Net 15
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-recurring-changes"
            onClick={handleSave}
            className="px-5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
