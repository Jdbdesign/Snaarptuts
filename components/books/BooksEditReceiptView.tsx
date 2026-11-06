"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type SalesReceiptItem,
  INITIAL_RECEIPTS,
} from "./books-data";
import { ChevronDown, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditReceiptView({ tl }: Props) {
  const activeReceipt = useTimelineVar<SalesReceiptItem>(
    tl,
    "booksActiveReceipt",
    INITIAL_RECEIPTS[0]
  );

  const [depositTo, setDepositTo] = useState<string>(
    activeReceipt?.depositTo || "Petty Cash"
  );
  const [depositDropdownOpen, setDepositDropdownOpen] = useState(false);
  const [customerNotes, setCustomerNotes] = useState<string>(
    activeReceipt?.customerNotes || "Auto-generated when invoice INV10008 was marked paid"
  );
  const [paymentMode] = useState<string>(activeReceipt?.paymentMode || "Bank Transfer");
  const [reference] = useState<string>(activeReceipt?.reference || "REF-8841");

  const handleSave = () => {
    const updated: SalesReceiptItem = {
      ...activeReceipt,
      depositTo: depositTo as SalesReceiptItem["depositTo"],
      customerNotes,
    };
    tl.setVar("booksActiveReceipt", updated);

    const receipts = tl.getVar<SalesReceiptItem[]>(
      "booksReceipts",
      INITIAL_RECEIPTS
    );
    tl.setVar(
      "booksReceipts",
      receipts.map((r) => (r.id === updated.id ? updated : r))
    );

    tl.setVar("booksView", "receipt-detail");
    tl.setUrl(BOOKS_URLS.receiptDetails);
    tl.setVar("booksToastText", "Sales receipt updated successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handleCancel = () => {
    tl.setVar("booksView", "receipt-detail");
    tl.setUrl(BOOKS_URLS.receiptDetails);
  };

  return (
    <div
      data-tl="books-edit-receipt-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-breadcrumb-back"
            onClick={handleCancel}
            className="hover:text-gray-900 cursor-pointer font-medium"
          >
            ← Back
          </button>
          <span>|</span>
          <button
            type="button"
            data-tl="breadcrumb-home"
            onClick={() => {
              tl.setVar("booksView", "home");
              tl.setUrl(BOOKS_URLS.dashboard);
            }}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Home
          </button>
          <span>&gt;</span>
          <button
            type="button"
            data-tl="breadcrumb-receipts"
            onClick={() => {
              tl.setVar("booksView", "receipts");
              tl.setUrl(BOOKS_URLS.salesReceipts);
            }}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Sales Receipts
          </button>
          <span>&gt;</span>
          <button
            type="button"
            data-tl="breadcrumb-receipt-details"
            onClick={handleCancel}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Details
          </button>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Edit</span>
        </div>

        {/* Title & Close */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Edit Sales Receipt {activeReceipt?.receiptNumber || "SR-00002"}
          </h1>
          <button
            type="button"
            data-tl="btn-cancel-edit-receipt"
            onClick={handleCancel}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Customer Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                readOnly
                value={activeReceipt?.customerName || "Acme Foods Ltd"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Sales Receipt#
              </label>
              <input
                type="text"
                readOnly
                value={activeReceipt?.receiptNumber || "SR-00002"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Receipt Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                readOnly
                value={activeReceipt?.receiptDate || "11/05/2026"}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Payment Mode <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                readOnly
                value={paymentMode}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>

            {/* Deposit To Field */}
            <div className="relative">
              <label className="font-semibold text-gray-700 block mb-1">
                Deposit To <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-edit-deposit-to"
                onClick={() => setDepositDropdownOpen(!depositDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-gray-900">{depositTo}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {depositDropdownOpen && (
                <div
                  data-tl="menu-edit-deposit-to"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  <button
                    type="button"
                    data-tl="deposit-opt-bank-account"
                    onClick={() => {
                      setDepositTo("Bank Account");
                      setDepositDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                  >
                    Bank Account
                  </button>
                  <button
                    type="button"
                    data-tl="deposit-opt-petty-cash"
                    onClick={() => {
                      setDepositTo("Petty Cash");
                      setDepositDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                  >
                    Petty Cash
                  </button>
                  <button
                    type="button"
                    data-tl="deposit-opt-undeposited-funds"
                    onClick={() => {
                      setDepositTo("Undeposited Funds");
                      setDepositDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] text-gray-800 cursor-pointer"
                  >
                    Undeposited Funds
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Reference#
              </label>
              <input
                type="text"
                readOnly
                value={reference}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              Customer Notes
            </label>
            <textarea
              data-tl="textarea-edit-receipt-notes"
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
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
            data-tl="btn-save-receipt-changes"
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
