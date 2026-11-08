"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type BankAccount,
  BANK_ACCOUNT_TYPES,
  BANK_CURRENCIES,
  BANK_CHART_OF_ACCOUNTS_ASSET,
} from "./books-data";
import { ChevronRight, ChevronDown, Check } from "lucide-react";

interface BooksNewBankAccountViewProps {
  tl: Timeline;
}

export function BooksNewBankAccountView({ tl }: BooksNewBankAccountViewProps) {
  // Form variables
  const accountName = useTimelineVar<string>(tl, "booksNewAccountName", "");
  const bankName = useTimelineVar<string>(tl, "booksNewAccountBankName", "");
  const accountNumber = useTimelineVar<string>(tl, "booksNewAccountNumber", "");
  const routingCode = useTimelineVar<string>(tl, "booksNewAccountRoutingCode", "");
  const accountType = useTimelineVar<string>(tl, "booksNewAccountType", "Savings");
  const currency = useTimelineVar<string>(tl, "booksNewAccountCurrency", "GBP");
  const openingBalance = useTimelineVar<string>(tl, "booksNewAccountOpeningBalance", "");
  const chartOfAccount = useTimelineVar<string>(
    tl,
    "booksNewAccountChartOfAccount",
    "1001 - Undeposited Funds"
  );
  const description = useTimelineVar<string>(tl, "booksNewAccountDescription", "");

  // Dropdown open states
  const accountTypeOpen = useTimelineVar<boolean>(
    tl,
    "booksNewAccountTypeDropdownOpen",
    false
  );
  const currencyOpen = useTimelineVar<boolean>(
    tl,
    "booksNewAccountCurrencyDropdownOpen",
    false
  );
  const coaOpen = useTimelineVar<boolean>(
    tl,
    "booksNewAccountCoaDropdownOpen",
    false
  );
  const isSaving = useTimelineVar<boolean>(tl, "booksNewAccountSaving", false);

  const handleSave = () => {
    tl.setVar("booksNewAccountSaving", true);
    setTimeout(() => {
      const existing =
        (tl.getVar<BankAccount[]>("booksBankAccounts", []) || []).filter(
          (a) => a.id !== "jordan-lee-savings"
        );
      const newAcc: BankAccount = {
        id: "jordan-lee-savings",
        name: accountName || "Jordan Lee Savings",
        accountName: accountName || "Jordan Lee Savings",
        bankName: bankName || "Barclays Bank UK",
        accountNumber: accountNumber || "12345678",
        routingCode: routingCode || "20-00-00",
        accountType: (accountType as BankAccount["accountType"]) || "Savings",
        currency: (currency as BankAccount["currency"]) || "GBP",
        balance: parseFloat(openingBalance) || 2000.0,
        openingBalance: parseFloat(openingBalance) || 2000.0,
        currentBalance: parseFloat(openingBalance) || 2000.0,
        chartOfAccount: chartOfAccount || "1001 - Undeposited Funds",
        description: description || "Primary savings reserve account",
        status: "ACTIVE",
        reconciledBalance: 0,
        createdAt: "11/08/2026",
        lastUpdated: "11/08/2026",
      };
      tl.setVar("booksBankAccounts", [newAcc, ...existing]);
      tl.setVar("booksToastText", "Bank account created successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksNewAccountSaving", false);
      tl.setVar("booksView", "bank-accounts");
      tl.setUrl(BOOKS_URLS.bankAccounts);
    }, 400);
  };

  return (
    <div
      data-tl="view-new-bank-account"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Breadcrumb & Title */}
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <button
              type="button"
              data-tl="link-breadcrumb-bank-accounts"
              onClick={() => {
                tl.setVar("booksView", "bank-accounts");
                tl.setUrl(BOOKS_URLS.bankAccounts);
              }}
              className="hover:text-gray-900 transition-colors cursor-pointer"
            >
              Bank Accounts
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-medium">Add Bank Account</span>
          </nav>
          <h1
            data-tl="title-add-bank-account"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Add Bank Account
          </h1>
        </div>

        {/* Card 1: Account Details */}
        <div
          data-tl="card-account-details"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Account Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your banking details and identifier information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Name * */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Account Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-account-name"
                value={accountName}
                onChange={(e) => tl.setVar("booksNewAccountName", e.target.value)}
                placeholder="e.g. Operating Account, Jordan Lee Savings"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Bank Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                data-tl="input-bank-name"
                value={bankName}
                onChange={(e) => tl.setVar("booksNewAccountBankName", e.target.value)}
                placeholder="e.g. Barclays Bank UK, HSBC"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                data-tl="input-account-number"
                value={accountNumber}
                onChange={(e) => tl.setVar("booksNewAccountNumber", e.target.value)}
                placeholder="e.g. 12345678"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Routing / Sort Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                Routing / Sort Code
              </label>
              <input
                type="text"
                data-tl="input-routing-code"
                value={routingCode}
                onChange={(e) => tl.setVar("booksNewAccountRoutingCode", e.target.value)}
                placeholder="e.g. 20-00-00"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Account Type * */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Account Type</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-account-type"
                onClick={() =>
                  tl.setVar("booksNewAccountTypeDropdownOpen", !accountTypeOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{accountType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {accountTypeOpen && (
                <div
                  data-tl="menu-account-types"
                  className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  {BANK_ACCOUNT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      data-tl={`opt-account-type-${t}`}
                      onClick={() => {
                        tl.setVar("booksNewAccountType", t);
                        tl.setVar("booksNewAccountTypeDropdownOpen", false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{t}</span>
                      {accountType === t && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="space-y-1.5 relative md:col-span-2">
              <label className="text-xs font-medium text-gray-700">Currency</label>
              <button
                type="button"
                data-tl="select-currency"
                onClick={() =>
                  tl.setVar("booksNewAccountCurrencyDropdownOpen", !currencyOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {currencyOpen && (
                <div
                  data-tl="menu-currencies"
                  className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  {BANK_CURRENCIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      data-tl={`opt-currency-${c}`}
                      onClick={() => {
                        tl.setVar("booksNewAccountCurrency", c);
                        tl.setVar("booksNewAccountCurrencyDropdownOpen", false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>{c}</span>
                      {currency === c && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Financial Details */}
        <div
          data-tl="card-financial-details"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Financial Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Set the opening balance and link to your General Ledger chart of accounts.
            </p>
          </div>

          <div className="space-y-4">
            {/* Opening Balance */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Opening Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  {currency === "GBP" ? "£" : currency}
                </span>
                <input
                  type="text"
                  data-tl="input-opening-balance"
                  value={openingBalance}
                  onChange={(e) =>
                    tl.setVar("booksNewAccountOpeningBalance", e.target.value)
                  }
                  placeholder="0.00"
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Chart of Account (Asset) * */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>Chart of Account (Asset)</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-chart-of-account"
                onClick={() =>
                  tl.setVar("booksNewAccountCoaDropdownOpen", !coaOpen)
                }
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{chartOfAccount}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {coaOpen && (
                <div
                  data-tl="menu-chart-of-accounts"
                  className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 max-h-56 overflow-y-auto"
                >
                  {BANK_CHART_OF_ACCOUNTS_ASSET.map((coa) => {
                    const code = coa.split(" - ")[0];
                    return (
                      <button
                        key={coa}
                        type="button"
                        data-tl={`opt-coa-${code}`}
                        onClick={() => {
                          tl.setVar("booksNewAccountChartOfAccount", coa);
                          tl.setVar("booksNewAccountCoaDropdownOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                      >
                        <span>{coa}</span>
                        {chartOfAccount === coa && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                data-tl="textarea-account-description"
                value={description}
                onChange={(e) =>
                  tl.setVar("booksNewAccountDescription", e.target.value)
                }
                placeholder="Add notes about this bank account..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cancel-account"
            onClick={() => {
              tl.setVar("booksView", "bank-accounts");
              tl.setUrl(BOOKS_URLS.bankAccounts);
            }}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-account"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{isSaving ? "Saving..." : "Save Account"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
