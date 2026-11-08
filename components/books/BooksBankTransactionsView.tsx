"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type BankTransaction,
  BANK_CHART_OF_ACCOUNTS_ASSET,
  TRANSACTION_FILTER_TYPES,
} from "./books-data";
import {
  Search,
  Plus,
  ChevronDown,
  Check,
  ArrowUpRight,
  ArrowDownRight,
  UploadCloud,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Tag,
  Building2,
} from "lucide-react";

interface BooksBankTransactionsViewProps {
  tl: Timeline;
}

export function BooksBankTransactionsView({
  tl,
}: BooksBankTransactionsViewProps) {
  const transactions = useTimelineVar<BankTransaction[]>(
    tl,
    "booksBankTransactions",
    []
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksTransactionsSearch",
    ""
  );
  const accountFilter = useTimelineVar<string>(
    tl,
    "booksTransactionsAccountFilter",
    "All Accounts"
  );
  const typeFilter = useTimelineVar<string>(
    tl,
    "booksTransactionsTypeFilter",
    "All Types"
  );
  const accountFilterOpen = useTimelineVar<boolean>(
    tl,
    "booksTransactionsAccountFilterOpen",
    false
  );
  const typeFilterOpen = useTimelineVar<boolean>(
    tl,
    "booksTransactionsTypeFilterOpen",
    false
  );

  // Categorize popover state
  const categorizePopoverOpen = useTimelineVar<boolean>(
    tl,
    "booksCategorizePopoverOpen",
    false
  );
  const categorizeTargetTxId = useTimelineVar<string | null>(
    tl,
    "booksCategorizeTargetTxId",
    null
  );
  const categorizeSearch = useTimelineVar<string>(
    tl,
    "booksCategorizeSearch",
    ""
  );

  // Filter transactions
  const filteredTransactions = transactions.filter((tx: BankTransaction) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !tx.description.toLowerCase().includes(q) &&
        !(tx.payee || "").toLowerCase().includes(q) &&
        !(tx.reference || "").toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (accountFilter !== "All Accounts") {
      const acc = tx.bankAccount || tx.accountName;
      if (acc !== accountFilter) return false;
    }
    if (typeFilter !== "All Types") {
      if (tx.type !== typeFilter) return false;
    }
    return true;
  });

  const handleSelectCategory = (cat: string) => {
    const updated = transactions.map((t: BankTransaction) =>
      t.id === categorizeTargetTxId
        ? {
            ...t,
            categoryAccount: cat,
            status: "Matched" as const,
          }
        : t
    );
    tl.setVar("booksBankTransactions", updated);
    tl.setVar("booksCategorizePopoverOpen", false);
    tl.setVar("booksCategorizeTargetTxId", null);
    tl.setVar("booksToastText", "Categorized and journal posted");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="view-bank-transactions"
      data-scroller="true"
      className="relative flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 space-y-4 max-w-7xl mx-auto w-full">
        {/* Top Header: Title & Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1
              data-tl="title-all-transactions"
              className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5"
            >
              <span>All Transactions</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-nav-accounts"
              onClick={() => {
                tl.setVar("booksView", "bank-accounts");
                tl.setUrl(BOOKS_URLS.bankAccounts);
              }}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Accounts</span>
            </button>

            <button
              type="button"
              data-tl="btn-import-statement"
              onClick={() => tl.setVar("booksImportDrawerOpen", true)}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-gray-500" />
              <span>Import Statement</span>
            </button>

            <button
              type="button"
              data-tl="btn-add-transaction"
              onClick={() => {
                tl.setVar("booksView", "new-bank-transaction");
                tl.setUrl(BOOKS_URLS.newBankTransaction);
              }}
              className="px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Summary Strip */}
        <div
          data-tl="strip-transactions-summary"
          className="bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600 shadow-2xs"
        >
          <div className="font-semibold text-gray-900 border-r border-gray-200 pr-4">
            {transactions.length} transactions
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-medium">
            <span>+ GBP 119,545.03</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 font-medium">
            <span>- GBP 117,802.44</span>
          </div>
          <div className="flex items-center gap-1 text-blue-700 font-bold border-r border-gray-200 pr-4">
            <span>Net GBP 1,742.59</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-medium">
            <span>+ USD 52,256.08</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 font-medium">
            <span>- USD 52,463.39</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700 font-semibold">
            <span>Net USD -207.31</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              data-tl="input-transactions-search"
              value={searchQuery}
              onChange={(e) => tl.setVar("booksTransactionsSearch", e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Account Filter */}
          <div className="relative">
            <button
              type="button"
              data-tl="select-transactions-account"
              onClick={() =>
                tl.setVar(
                  "booksTransactionsAccountFilterOpen",
                  !accountFilterOpen
                )
              }
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{accountFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {accountFilterOpen && (
              <div
                data-tl="menu-transactions-account"
                className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
              >
                <button
                  type="button"
                  data-tl="opt-tx-account-all"
                  onClick={() => {
                    tl.setVar("booksTransactionsAccountFilter", "All Accounts");
                    tl.setVar("booksTransactionsAccountFilterOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>All Accounts</span>
                  {accountFilter === "All Accounts" && (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  data-tl="opt-tx-account-main"
                  onClick={() => {
                    tl.setVar(
                      "booksTransactionsAccountFilter",
                      "Main Business Account"
                    );
                    tl.setVar("booksTransactionsAccountFilterOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Main Business Account</span>
                  {accountFilter === "Main Business Account" && (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
                <button
                  type="button"
                  data-tl="opt-tx-account-savings"
                  onClick={() => {
                    tl.setVar(
                      "booksTransactionsAccountFilter",
                      "Jordan Lee Savings"
                    );
                    tl.setVar("booksTransactionsAccountFilterOpen", false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Jordan Lee Savings</span>
                  {accountFilter === "Jordan Lee Savings" && (
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              type="button"
              data-tl="select-transactions-type"
              onClick={() =>
                tl.setVar("booksTransactionsTypeFilterOpen", !typeFilterOpen)
              }
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{typeFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {typeFilterOpen && (
              <div
                data-tl="menu-transactions-type"
                className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
              >
                {TRANSACTION_FILTER_TYPES.map((t) => {
                  const slug =
                    t === "Type" || (t as string) === "All Types"
                      ? "all"
                      : t.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <button
                      key={t}
                      type="button"
                      data-tl={`opt-tx-type-${slug}`}
                      onClick={() => {
                        tl.setVar("booksTransactionsTypeFilter", t);
                        tl.setVar("booksTransactionsTypeFilterOpen", false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{t}</span>
                      {typeFilter === t && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div
          data-tl="table-bank-transactions"
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs relative"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-2 w-10 text-center">Type</th>
                <th className="py-3 px-2.5 w-24">Date</th>
                <th className="py-3 px-2.5">Description</th>
                <th className="py-3 px-2.5">Payee / Payer</th>
                <th className="py-3 px-2.5">Category Account</th>
                <th className="py-3 px-2.5 w-28">Reference #</th>
                <th className="py-3 px-2.5 w-24">Status</th>
                <th className="py-3 px-2.5 text-right w-28">Amount</th>
                <th className="py-3 pl-2 pr-4 text-right w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredTransactions.map((tx: BankTransaction) => {
                const isDeposit = tx.type === "Deposit" || tx.type === "Transfer In";
                return (
                  <tr
                    key={tx.id}
                    data-tl={`transaction-row-${tx.id}`}
                    onClick={(e) => {
                      // Avoid opening details if clicking categorize button or delete
                      const target = e.target as HTMLElement;
                      if (target.closest("button")) return;
                      tl.setVar("booksActiveTransaction", tx);
                      tl.setVar("booksView", "bank-transaction-detail");
                      tl.setUrl(
                        BOOKS_URLS.bankTransactionDetails.replace(":id", tx.id)
                      );
                    }}
                    className="hover:bg-gray-50/75 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-2 text-center">
                      <div
                        className={`w-6 h-6 rounded-full inline-flex items-center justify-center ${
                          isDeposit
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-2.5 text-gray-600 font-medium whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-2.5 font-semibold text-gray-900">
                      <div className="truncate max-w-[170px]" title={tx.description}>
                        {tx.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-2.5 text-gray-600">
                      <div className="truncate max-w-[120px]" title={tx.payee || ""}>
                        {tx.payee || "—"}
                      </div>
                    </td>
                    <td className="py-3.5 px-2.5 text-gray-600">
                      <div className="truncate max-w-[150px]" title={tx.categoryAccount || ""}>
                        {tx.categoryAccount || (
                          <span className="text-gray-400 italic">Uncategorized</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-2.5 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                      {tx.reference || "—"}
                    </td>
                    <td className="py-3.5 px-2.5 whitespace-nowrap">
                      <span
                        data-tl={`badge-tx-status-${tx.id}`}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                          tx.status === "Matched"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === "Matched"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {tx.status}
                      </span>
                    </td>
                    <td
                      className={`py-3.5 px-2.5 text-right font-semibold whitespace-nowrap ${
                        isDeposit ? "text-emerald-600" : "text-gray-900"
                      }`}
                    >
                      {isDeposit ? "+ " : "- "}
                      {tx.currency} {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 pl-2 pr-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {tx.status === "Unmatched" ? (
                          <button
                            type="button"
                            data-tl={`btn-categorize-row-${tx.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              tl.setVar("booksCategorizeTargetTxId", tx.id);
                              tl.setVar("booksCategorizePopoverOpen", true);
                            }}
                            className="px-2.5 py-1 rounded-md border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3 text-purple-600" />
                            <span>Categorize</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-tl={`btn-recategorize-row-${tx.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              tl.setVar("booksCategorizeTargetTxId", tx.id);
                              tl.setVar("booksCategorizePopoverOpen", true);
                            }}
                            className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Recategorize
                          </button>
                        )}

                        <button
                          type="button"
                          data-tl={`btn-delete-row-${tx.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Categorize Popover (Anchored) */}
          {categorizePopoverOpen && (
            <div
              data-tl="popover-categorize-account"
              className="absolute right-12 top-20 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-40 space-y-2 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-900">
                  Select category account
                </span>
                <button
                  type="button"
                  onClick={() => tl.setVar("booksCategorizePopoverOpen", false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  data-tl="input-category-search"
                  value={categorizeSearch}
                  onChange={(e) =>
                    tl.setVar("booksCategorizeSearch", e.target.value)
                  }
                  placeholder="Search by name or code..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {BANK_CHART_OF_ACCOUNTS_ASSET.filter((coa) =>
                  categorizeSearch
                    ? coa.toLowerCase().includes(categorizeSearch.toLowerCase())
                    : true
                ).map((coa) => {
                  const code = coa.split(" - ")[0];
                  return (
                    <button
                      key={coa}
                      type="button"
                      data-tl={`opt-cat-${code}`}
                      onClick={() => handleSelectCategory(coa)}
                      className="w-full text-left px-2.5 py-1.5 rounded-md text-xs text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      {coa}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pagination Footer */}
          <div
            data-tl="pagination-transactions"
            className="border-t border-gray-200 px-4 py-3 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500"
          >
            <div>Rows per page 20</div>
            <div className="flex items-center gap-4">
              <span>Page 1 of 25</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-tl="btn-prev-page"
                  disabled
                  className="p-1 rounded-md text-gray-400 cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  data-tl="btn-next-page"
                  className="p-1 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
