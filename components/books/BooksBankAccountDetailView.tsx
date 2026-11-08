"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, type BankAccount, formatGBP } from "./books-data";
import {
  ChevronRight,
  Pencil,
  PowerOff,
  Trash2,
  AlertTriangle,
  Building2,
  ArrowRight,
} from "lucide-react";

interface BooksBankAccountDetailViewProps {
  tl: Timeline;
}

export function BooksBankAccountDetailView({
  tl,
}: BooksBankAccountDetailViewProps) {
  const activeAccount = useTimelineVar<BankAccount | null>(
    tl,
    "booksActiveBankAccount",
    null
  );
  const isDeactivating = useTimelineVar<boolean>(
    tl,
    "booksAccountDeactivating",
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
    description: "Primary savings reserve account",
    status: "ACTIVE",
    reconciledBalance: 0,
    createdAt: "11/08/2026",
  };

  const account: BankAccount = activeAccount || defaultAcc;
  const accName = account.name || account.accountName || "";
  const bal = account.balance ?? account.currentBalance ?? 0;
  const openBal = account.openingBalance ?? bal;
  const isActive = account.status === "ACTIVE";

  const handleDeactivate = () => {
    tl.setVar("booksAccountDeactivating", true);
    setTimeout(() => {
      const updated: BankAccount = { ...account, status: "INACTIVE" };
      tl.setVar("booksActiveBankAccount", updated);
      const allAccounts =
        tl.getVar<BankAccount[]>("booksBankAccounts", []) || [];
      tl.setVar(
        "booksBankAccounts",
        allAccounts.map((a) => (a.id === account.id ? updated : a))
      );
      tl.setVar("booksToastText", "Bank account deactivated successfully");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksAccountDeactivating", false);
    }, 400);
  };

  return (
    <div
      data-tl="view-bank-account-detail"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
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
          <span className="text-gray-900 font-medium">{accName}</span>
        </nav>

        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  data-tl="title-account-name"
                  className="text-xl font-bold text-gray-900 tracking-tight"
                >
                  {accName}
                </h1>
                <span
                  data-tl="badge-account-status"
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                  {account.status}
                </span>
              </div>
              <p
                data-tl="subtitle-account-bank"
                className="text-xs text-gray-500 mt-1"
              >
                {account.bankName} • ••••{account.accountNumber.slice(-4) || account.accountNumber}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-edit-account"
              onClick={() => {
                tl.setVar("booksEditAccountDescription", account.description);
                tl.setVar("booksView", "edit-bank-account");
                tl.setUrl(
                  BOOKS_URLS.editBankAccount.replace(":id", account.id)
                );
              }}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-500" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              data-tl="btn-deactivate-account"
              onClick={handleDeactivate}
              disabled={isDeactivating || !isActive}
              className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isDeactivating ? (
                <span className="w-3 h-3 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
              ) : (
                <PowerOff className="w-3.5 h-3.5 text-gray-500" />
              )}
              <span>{isDeactivating ? "Deactivating..." : "Deactivate"}</span>
            </button>

            <button
              type="button"
              data-tl="btn-delete-account"
              className="px-3.5 py-2 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-xs font-medium text-red-600 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Yellow Inactive Banner */}
        {!isActive && (
          <div
            data-tl="banner-account-inactive"
            className="rounded-xl border border-yellow-200 bg-yellow-50/80 p-4 flex items-center gap-3 text-xs text-yellow-800"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
            <p className="font-medium">
              This bank account is inactive and cannot be used for new banking activity.
            </p>
          </div>
        )}

        {/* Current Balance Card */}
        <div
          data-tl="card-current-balance"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs"
        >
          <div className="text-xs font-medium text-gray-500">Current Balance</div>
          <div className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
            {account.currency === "GBP"
              ? formatGBP(bal)
              : `${account.currency} ${bal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Opening balance:{" "}
            {account.currency === "GBP"
              ? formatGBP(openBal)
              : `${account.currency} ${openBal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          </div>
        </div>

        {/* Account Information Card */}
        <div
          data-tl="card-account-info"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
        >
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Account Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Account Name</span>
              <span className="font-medium text-gray-900">{accName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Bank Name</span>
              <span className="font-medium text-gray-900">{account.bankName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Account Number</span>
              <span className="font-mono text-gray-900">{account.accountNumber}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Routing / Sort Code</span>
              <span className="font-mono text-gray-900">{account.routingCode}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Account Type</span>
              <span className="font-medium text-gray-900">{account.accountType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Currency</span>
              <span className="font-medium text-gray-900">{account.currency}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Chart of Account</span>
              <span className="font-medium text-gray-900">
                {account.chartOfAccount}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-gray-900">{account.status}</span>
            </div>
            <div className="md:col-span-2 pt-1">
              <span className="text-gray-500 block mb-1">Description</span>
              <p
                data-tl="desc-account"
                className="text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                {account.description || "None"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div
          data-tl="card-recent-transactions"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <button
              type="button"
              data-tl="btn-view-all-transactions"
              onClick={() => {
                tl.setVar("booksView", "bank-transactions");
                tl.setUrl(BOOKS_URLS.bankTransactions);
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-8 text-center text-xs text-gray-500">
            No transactions yet for this account
          </div>
        </div>
      </div>
    </div>
  );
}
