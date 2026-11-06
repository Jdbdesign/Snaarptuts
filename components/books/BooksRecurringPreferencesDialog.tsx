"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import type { RecurringInvoicePreference } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksRecurringPreferencesDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksRecurringPreferencesDialogOpen",
    false
  );
  const currentPref = useTimelineVar<RecurringInvoicePreference>(
    tl,
    "booksRecurringPreferences",
    "Create Invoices as Drafts"
  );
  const [selectedPref, setSelectedPref] =
    useState<RecurringInvoicePreference>(currentPref);

  if (!isOpen) return null;

  const handleSave = () => {
    tl.setVar("booksRecurringPreferences", selectedPref);
    tl.setVar("booksRecurringPreferencesDialogOpen", false);
    tl.setVar("booksToastText", "Recurring invoice preferences updated");
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksRecurringPreferencesDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-recurring-preferences"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[460px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Recurring Invoices Preferences
          </h2>
          <button
            type="button"
            data-tl="btn-close-recurring-preferences"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Choose what action to take when the recurring schedule triggers:
        </p>

        {/* 3 Radios */}
        <div className="space-y-3 text-xs">
          <label
            data-tl="radio-recurring-draft"
            onClick={() => setSelectedPref("Create Invoices as Drafts")}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              selectedPref === "Create Invoices as Drafts"
                ? "border-[#7014D9] bg-purple-50/50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="recurring-pref"
              checked={selectedPref === "Create Invoices as Drafts"}
              onChange={() => setSelectedPref("Create Invoices as Drafts")}
              className="mt-0.5 text-[#7014D9] focus:ring-[#7014D9]"
            />
            <div>
              <span className="font-semibold text-gray-900 block">
                Create Invoices as Drafts
              </span>
              <span className="text-[11px] text-gray-500">
                Generate an invoice draft and review it before sending.
              </span>
            </div>
          </label>

          <label
            data-tl="radio-recurring-create-and-send"
            onClick={() => setSelectedPref("Create and Send Invoices")}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              selectedPref === "Create and Send Invoices"
                ? "border-[#7014D9] bg-purple-50/50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="recurring-pref"
              checked={selectedPref === "Create and Send Invoices"}
              onChange={() => setSelectedPref("Create and Send Invoices")}
              className="mt-0.5 text-[#7014D9] focus:ring-[#7014D9]"
            />
            <div>
              <span className="font-semibold text-gray-900 block">
                Create and Send Invoices
              </span>
              <span className="text-[11px] text-gray-500">
                Automatically generate and email invoices to the customer.
              </span>
            </div>
          </label>

          <label
            data-tl="radio-recurring-charge-and-send"
            onClick={() => setSelectedPref("Create, Charge and Send Invoices")}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              selectedPref === "Create, Charge and Send Invoices"
                ? "border-[#7014D9] bg-purple-50/50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="recurring-pref"
              checked={selectedPref === "Create, Charge and Send Invoices"}
              onChange={() =>
                setSelectedPref("Create, Charge and Send Invoices")
              }
              className="mt-0.5 text-[#7014D9] focus:ring-[#7014D9]"
            />
            <div>
              <span className="font-semibold text-gray-900 block">
                Create, Charge and Send Invoices
              </span>
              <span className="text-[11px] text-gray-500">
                Charge the customer saved card/account and email the receipt.
              </span>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-recurring-preferences"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-recurring-preferences"
            onClick={handleSave}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
