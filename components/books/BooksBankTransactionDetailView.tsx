"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, type BankTransaction } from "./books-data";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Tag,
} from "lucide-react";

interface BooksBankTransactionDetailViewProps {
  tl: Timeline;
}

export function BooksBankTransactionDetailView({
  tl,
}: BooksBankTransactionDetailViewProps) {
  const activeTx = useTimelineVar<BankTransaction | null>(
    tl,
    "booksActiveTransaction",
    null
  );

  const tx: BankTransaction = activeTx || {
    id: "tx-1",
    type: "Withdrawal",
    date: "11/08/2026",
    description: "Cloud Hosting Monthly",
    payee: "Cloud Hosting Ltd",
    categoryAccount: "",
    reference: "INV-9921",
    status: "Unmatched",
    amount: 45.0,
    currency: "GBP",
    bankAccount: "Main Business Account",
  };

  const isDeposit = tx.type === "Deposit" || tx.type === "Transfer In";

  return (
    <div
      data-tl="view-bank-transaction-detail"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
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
            <span className="text-gray-900 font-medium">Details</span>
          </nav>

          <button
            type="button"
            data-tl="btn-back-to-transactions"
            onClick={() => {
              tl.setVar("booksView", "bank-transactions");
              tl.setUrl(BOOKS_URLS.bankTransactions);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
            <span>Back to Transactions</span>
          </button>
        </div>

        <div>
          <h1
            data-tl="title-transaction-details"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Transaction Details
          </h1>
        </div>

        {/* Card 1: Amount & Status Header */}
        <div
          data-tl="card-tx-amount-status"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isDeposit
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isDeposit ? (
                <ArrowDownRight className="w-6 h-6" />
              ) : (
                <ArrowUpRight className="w-6 h-6" />
              )}
            </div>
            <div>
              <div
                className={`text-2xl font-bold tracking-tight ${
                  isDeposit ? "text-emerald-600" : "text-gray-900"
                }`}
              >
                {isDeposit ? "+ " : "- "}
                {tx.currency} {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {tx.type} • {tx.date}
              </p>
            </div>
          </div>

          <div>
            <span
              data-tl="badge-tx-detail-status"
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
                tx.status === "Matched"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  tx.status === "Matched" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {tx.status}
            </span>
          </div>
        </div>

        {/* Card 2: Transaction Information */}
        <div
          data-tl="card-tx-information"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Transaction Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-900">{tx.date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Transaction Type</span>
              <span className="font-medium text-gray-900">{tx.type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Payee / Payer</span>
              <span className="font-medium text-gray-900">{tx.payee || "—"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Reference #</span>
              <span className="font-mono text-gray-900">{tx.reference || "—"}</span>
            </div>
            <div className="md:col-span-2 pt-1">
              <span className="text-gray-500 block mb-1">Description</span>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {tx.description}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Bank Account */}
        <div
          data-tl="card-tx-bank-account"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Bank Account</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">
                {tx.bankAccount || tx.accountName || "Main Business Account"}
              </div>
              <div className="text-[11px] text-gray-500">
                Account Currency: {tx.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Categorization */}
        <div
          data-tl="card-tx-categorization"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Categorization & General Ledger
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">
                {tx.categoryAccount || "Uncategorized"}
              </div>
              <div className="text-[11px] text-gray-500">
                {tx.status === "Matched"
                  ? "Matched with automated journal entry"
                  : "Awaiting category assignment"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
