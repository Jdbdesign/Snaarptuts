"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, type BankAccount } from "./books-data";
import { ChevronRight, Info } from "lucide-react";

interface BooksEditBankAccountViewProps {
  tl: Timeline;
}

export function BooksEditBankAccountView({
  tl,
}: BooksEditBankAccountViewProps) {
  const activeAccount = useTimelineVar<BankAccount | null>(
    tl,
    "booksActiveBankAccount",
    null
  );
  const editDescription = useTimelineVar<string>(
    tl,
    "booksEditAccountDescription",
    "Primary savings reserve account"
  );
  const isSaving = useTimelineVar<boolean>(
    tl,
    "booksEditAccountSaving",
    false
  );

  const defaultAcc: BankAccount = {
    id: "jordan-lee-savings",
    name: "Jordan Lee Savings",
    accountName: "Jordan Lee Savings",
    bankName: "Barclays Bank UK",
    accountNumber: "12345678",
    routingCode: "20-00-00",
    accountType: "Savings",
    currency: "GBP",
    balance: 2000.0,
    openingBalance: 2000.0,
    currentBalance: 2000.0,
    chartOfAccount: "1001 - Undeposited Funds",
    description: editDescription,
    status: "ACTIVE",
    reconciledBalance: 0,
    createdAt: "11/08/2026",
  };

  const account: BankAccount = activeAccount || defaultAcc;
  const accName = account.name || account.accountName || "";

  const handleSave = () => {
    tl.setVar("booksEditAccountSaving", true);
    setTimeout(() => {
      const updated: BankAccount = {
        ...account,
        description: editDescription,
      };
      tl.setVar("booksActiveBankAccount", updated);
      const allAccounts =
        tl.getVar<BankAccount[]>("booksBankAccounts", []) || [];
      tl.setVar(
        "booksBankAccounts",
        allAccounts.map((a) => (a.id === account.id ? updated : a))
      );
      tl.setVar("booksToastText", "Bank account updated successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksEditAccountSaving", false);
      tl.setVar("booksView", "bank-account-detail");
      tl.setUrl(BOOKS_URLS.bankAccountDetails.replace(":id", account.id));
    }, 400);
  };

  return (
    <div
      data-tl="view-edit-bank-account"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Breadcrumb & Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
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
          <button
            type="button"
            onClick={() => {
              tl.setVar("booksView", "bank-account-detail");
              tl.setUrl(
                BOOKS_URLS.bankAccountDetails.replace(":id", account.id)
              );
            }}
            className="hover:text-gray-900 transition-colors cursor-pointer"
          >
            {accName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">Edit</span>
        </nav>

        <div>
          <h1
            data-tl="title-edit-bank-account"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Edit Bank Account
          </h1>
        </div>

        {/* Account Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Account Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-gray-700">Account Name</label>
              <input
                type="text"
                value={accName}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                value={account.bankName}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                value={account.accountNumber}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-mono cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Routing / Sort Code</label>
              <input
                type="text"
                value={account.routingCode}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 font-mono cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Account Type</label>
              <input
                type="text"
                value={account.accountType}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-gray-700">Currency</label>
              <input
                type="text"
                value={account.currency}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Financial Details & Description Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">Financial Details</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-3.5 flex items-start gap-2.5 text-xs text-blue-800">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p>
                Opening balance cannot be edited once set. Adjust via manual journal entry if needed.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                data-tl="textarea-edit-description"
                value={editDescription}
                onChange={(e) =>
                  tl.setVar("booksEditAccountDescription", e.target.value)
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
            data-tl="btn-cancel-edit-account"
            onClick={() => {
              tl.setVar("booksView", "bank-account-detail");
              tl.setUrl(
                BOOKS_URLS.bankAccountDetails.replace(":id", account.id)
              );
            }}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-edit-account"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving && (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
