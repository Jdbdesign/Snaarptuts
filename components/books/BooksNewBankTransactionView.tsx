"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type BankTransaction,
  BANK_CHART_OF_ACCOUNTS_ASSET,
  TRANSACTION_TYPE_OPTIONS,
} from "./books-data";
import { ChevronRight, ChevronDown, Check } from "lucide-react";

interface BooksNewBankTransactionViewProps {
  tl: Timeline;
}

export function BooksNewBankTransactionView({
  tl,
}: BooksNewBankTransactionViewProps) {
  const bankAccount = useTimelineVar<string>(
    tl,
    "booksNewTxBankAccount",
    "Main Business Account"
  );
  const txType = useTimelineVar<string>(tl, "booksNewTxType", "Deposit");
  const date = useTimelineVar<string>(tl, "booksNewTxDate", "11/08/2026");
  const amount = useTimelineVar<string>(tl, "booksNewTxAmount", "");
  const payee = useTimelineVar<string>(tl, "booksNewTxPayee", "");
  const reference = useTimelineVar<string>(tl, "booksNewTxReference", "");
  const description = useTimelineVar<string>(tl, "booksNewTxDescription", "");
  const categoryAccount = useTimelineVar<string>(
    tl,
    "booksNewTxCategoryAccount",
    "1100 - Accounts Receivable (ASSET)"
  );
  const notes = useTimelineVar<string>(tl, "booksNewTxNotes", "");

  const bankAccountOpen = useTimelineVar<boolean>(
    tl,
    "booksNewTxBankAccountOpen",
    false
  );
  const txTypeOpen = useTimelineVar<boolean>(tl, "booksNewTxTypeOpen", false);
  const categoryAccountOpen = useTimelineVar<boolean>(
    tl,
    "booksNewTxCategoryAccountOpen",
    false
  );
  const isSaving = useTimelineVar<boolean>(tl, "booksNewTxSaving", false);

  const handleRecord = () => {
    tl.setVar("booksNewTxSaving", true);
    setTimeout(() => {
      const existing = (
        tl.getVar<BankTransaction[]>("booksBankTransactions", []) || []
      ).filter((t) => t.id !== "tx-new-dep");
      const newTx: BankTransaction = {
        id: "tx-new-dep",
        accountId: "acct-1",
        accountName: bankAccount || "Main Business Account",
        bankName: "Barclays Bank UK",
        type: (txType as BankTransaction["type"]) || "Deposit",
        date: date || "11/08/2026",
        description: description || "Client retainers deposit",
        payee: payee || "Acme Client Corp",
        categoryAccount:
          categoryAccount || "1100 - Accounts Receivable (ASSET)",
        reference: reference || "DEP-2026-089",
        status: "Matched",
        amount: parseFloat(amount) || 1500.0,
        currency: "GBP",
        bankAccount: bankAccount || "Main Business Account",
      };
      tl.setVar("booksBankTransactions", [newTx, ...existing]);
      tl.setVar("booksToastText", "Transaction recorded successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksNewTxSaving", false);
      tl.setVar("booksView", "bank-transactions");
      tl.setUrl(BOOKS_URLS.bankTransactions);
    }, 400);
  };

  return (
    <div
      data-tl="view-new-bank-transaction"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Breadcrumb & Title */}
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <button
              type="button"
              data-tl="link-breadcrumb-bank-transactions"
              onClick={() => {
                tl.setVar("booksView", "bank-transactions");
                tl.setUrl(BOOKS_URLS.bankTransactions);
              }}
              className="hover:text-gray-900 transition-colors cursor-pointer"
            >
              Bank Transactions
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-medium">Record Transaction</span>
          </nav>
          <h1
            data-tl="title-record-transaction"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Record Transaction
          </h1>
        </div>

        {/* Card 1: Transaction Details */}
        <div
          data-tl="card-tx-details"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Transaction Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bank Account * */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Bank Account</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-tx-bank-account"
                onClick={() =>
                  tl.setVar("booksNewTxBankAccountOpen", !bankAccountOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{bankAccount}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {bankAccountOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                  <button
                    type="button"
                    data-tl="opt-tx-account-main"
                    onClick={() => {
                      tl.setVar("booksNewTxBankAccount", "Main Business Account");
                      tl.setVar("booksNewTxBankAccountOpen", false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Main Business Account</span>
                    {bankAccount === "Main Business Account" && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                  <button
                    type="button"
                    data-tl="opt-tx-account-savings"
                    onClick={() => {
                      tl.setVar("booksNewTxBankAccount", "Jordan Lee Savings");
                      tl.setVar("booksNewTxBankAccountOpen", false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Jordan Lee Savings</span>
                    {bankAccount === "Jordan Lee Savings" && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Transaction Type * */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Transaction Type</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-tx-type"
                onClick={() => tl.setVar("booksNewTxTypeOpen", !txTypeOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{txType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {txTypeOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                  {TRANSACTION_TYPE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      data-tl={`opt-tx-type-${t.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => {
                        tl.setVar("booksNewTxType", t);
                        tl.setVar("booksNewTxTypeOpen", false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{t}</span>
                      {txType === t && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date * */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Date</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-tx-date"
                value={date}
                onChange={(e) => tl.setVar("booksNewTxDate", e.target.value)}
                placeholder="MM/DD/YYYY"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Amount * */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Amount</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  £
                </span>
                <input
                  type="text"
                  data-tl="input-tx-amount"
                  value={amount}
                  onChange={(e) => tl.setVar("booksNewTxAmount", e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Payee / Payer */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                Payee / Payer
              </label>
              <input
                type="text"
                data-tl="input-tx-payee"
                value={payee}
                onChange={(e) => tl.setVar("booksNewTxPayee", e.target.value)}
                placeholder="e.g. Acme Client Corp"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Reference # */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                Reference #
              </label>
              <input
                type="text"
                data-tl="input-tx-reference"
                value={reference}
                onChange={(e) => tl.setVar("booksNewTxReference", e.target.value)}
                placeholder="e.g. DEP-2026-089"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                data-tl="input-tx-description"
                value={description}
                onChange={(e) =>
                  tl.setVar("booksNewTxDescription", e.target.value)
                }
                placeholder="e.g. Client retainers deposit"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Categorization */}
        <div
          data-tl="card-tx-categorization"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Categorization</h2>
          </div>

          <div className="space-y-4">
            {/* Category Account */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-700">
                Category Account
              </label>
              <button
                type="button"
                data-tl="select-tx-category-account"
                onClick={() =>
                  tl.setVar(
                    "booksNewTxCategoryAccountOpen",
                    !categoryAccountOpen
                  )
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{categoryAccount}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {categoryAccountOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 max-h-56 overflow-y-auto">
                  {BANK_CHART_OF_ACCOUNTS_ASSET.map((coa) => {
                    const code = coa.split(" - ")[0];
                    return (
                      <button
                        key={coa}
                        type="button"
                        data-tl={`opt-tx-cat-${code}`}
                        onClick={() => {
                          tl.setVar("booksNewTxCategoryAccount", coa);
                          tl.setVar("booksNewTxCategoryAccountOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                      >
                        <span>{coa}</span>
                        {categoryAccount === coa && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Notes</label>
              <input
                type="text"
                data-tl="input-tx-notes"
                value={notes}
                onChange={(e) => tl.setVar("booksNewTxNotes", e.target.value)}
                placeholder="e.g. Monthly retainer November"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-tx"
            onClick={() => {
              tl.setVar("booksView", "bank-transactions");
              tl.setUrl(BOOKS_URLS.bankTransactions);
            }}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-record-transaction"
            onClick={handleRecord}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{isSaving ? "Recording..." : "Record Transaction"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
