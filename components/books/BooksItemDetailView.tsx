"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Edit2,
  Home,
  Lock,
  Power,
  Trash2,
  Unlock,
  X,
} from "lucide-react";
import {
  type BookItem,
  FOOD_FARM_ITEM,
  FOOD_FARM_TRANSACTIONS,
  FOOD_FARM_HISTORY_DEFAULT,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksItemDetailView({ tl }: Props) {
  const item = useTimelineVar<BookItem>(
    tl,
    "booksCurrentItem",
    FOOD_FARM_ITEM
  );
  const activeTab = useTimelineVar<"overview" | "transactions" | "history">(
    tl,
    "booksDetailTab",
    "overview"
  );
  const isMoreOpen = useTimelineVar<boolean>(tl, "booksMoreMenuOpen", false);
  const isLocked = useTimelineVar<boolean>(
    tl,
    "booksItemLocked",
    item.isLocked || false
  );
  const itemStatus = useTimelineVar<"active" | "inactive">(
    tl,
    "booksItemStatus",
    item.status
  );
  const historyList = useTimelineVar<typeof FOOD_FARM_HISTORY_DEFAULT>(
    tl,
    "booksItemHistory",
    FOOD_FARM_HISTORY_DEFAULT
  );

  const handleEdit = () => {
    if (isLocked) return;
    tl.setVar("booksEditingItem", item);
    tl.setVar("booksFormName", item.name);
    tl.setVar("booksFormType", item.type);
    tl.setVar("booksFormUnit", item.usageUnit);
    tl.setVar("booksFormSellingPrice", item.sellingPrice.toString());
    tl.setVar("booksFormSalesAccount", item.salesAccount);
    tl.setVar("booksFormSalesDesc", item.description);
    tl.setVar("booksFormCostPrice", item.costPrice.toString());
    tl.setVar("booksFormPurchaseAccount", item.purchaseAccount);
    tl.setVar("booksFormPurchaseDesc", item.purchaseDescription);
    tl.setVar("booksView", "new-item");
  };

  const handleClone = () => {
    tl.setVar("booksMoreMenuOpen", false);
    const cloneName = `${item.name} (Copy)`;
    const cloned: BookItem = {
      ...item,
      id: `clone-${Date.now()}`,
      name: cloneName,
      createdAt: new Date().toISOString(),
    };
    const active = tl.getVar<BookItem[]>("booksItems", []);
    tl.setVar("booksItems", [cloned, ...active]);
    tl.setVar("booksCurrentItem", cloned);
    tl.setVar("booksToastMessage", "Item cloned.");
    tl.setVar("booksToastOpen", true);
  };

  const handleToggleActive = () => {
    tl.setVar("booksMoreMenuOpen", false);
    if (itemStatus === "active") {
      tl.setVar("booksItemStatus", "inactive");
      const updated = { ...item, status: "inactive" as const };
      tl.setVar("booksCurrentItem", updated);
      // Move from active to inactive
      const active = tl.getVar<BookItem[]>("booksItems", []);
      const inactive = tl.getVar<BookItem[]>("booksInactiveItems", []);
      tl.setVar(
        "booksItems",
        active.filter((x) => x.id !== item.id)
      );
      tl.setVar("booksInactiveItems", [updated, ...inactive]);
      tl.setVar("booksToastMessage", "Item marked as inactive.");
      tl.setVar("booksToastOpen", true);
    } else {
      tl.setVar("booksItemStatus", "active");
      const updated = { ...item, status: "active" as const };
      tl.setVar("booksCurrentItem", updated);
      const active = tl.getVar<BookItem[]>("booksItems", []);
      const inactive = tl.getVar<BookItem[]>("booksInactiveItems", []);
      tl.setVar(
        "booksInactiveItems",
        inactive.filter((x) => x.id !== item.id)
      );
      tl.setVar("booksItems", [updated, ...active]);
      tl.setVar("booksToastMessage", "Item marked as active.");
      tl.setVar("booksToastOpen", true);
    }
  };

  const handleToggleLock = () => {
    tl.setVar("booksMoreMenuOpen", false);
    if (!isLocked) {
      tl.setVar("booksItemLocked", true);
      tl.setVar("booksToastMessage", "Item locked.");
      tl.setVar("booksToastOpen", true);
    } else {
      tl.setVar("booksItemLocked", false);
      tl.setVar("booksToastMessage", "Item unlocked.");
      tl.setVar("booksToastOpen", true);
    }
  };

  const handleDelete = () => {
    tl.setVar("booksMoreMenuOpen", false);
    tl.setVar("booksConfirmText", `Delete "${item.name}"? This cannot be undone.`);
    tl.setVar("booksConfirmAction", "delete-single");
    tl.setVar("booksConfirmOpen", true);
  };

  return (
    <div
      data-tl="books-item-detail-view"
      className="flex-1 flex flex-col bg-white overflow-y-auto relative"
    >
      {/* Top breadcrumb bar */}
      <div className="flex items-center justify-between px-8 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <button
            data-tl="breadcrumb-back"
            onClick={() => tl.setVar("booksView", "products")}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">›</span>
            <button
              onClick={() => tl.setVar("booksView", "products")}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Products
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Details</span>
          </div>
        </div>

        <button
          data-tl="btn-close-details"
          onClick={() => tl.setVar("booksView", "products")}
          className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Item title & action bar */}
      <div className="px-8 pt-6 pb-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h1
            data-tl="detail-item-title"
            className="text-2xl font-bold text-gray-900"
          >
            {item.name}
          </h1>
          {isLocked && (
            <span
              data-tl="icon-item-locked"
              className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            data-tl="btn-edit-item"
            disabled={isLocked}
            onClick={handleEdit}
            className={`p-1.5 border border-gray-200 rounded-md transition-colors ${
              isLocked
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-700 hover:bg-gray-50 cursor-pointer"
            }`}
            title={isLocked ? "Unlock item to edit" : "Edit item"}
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            data-tl="btn-more-menu"
            onClick={() => tl.setVar("booksMoreMenuOpen", !isMoreOpen)}
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>More</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isMoreOpen && (
            <div
              data-tl="more-dropdown-menu"
              className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                data-tl="more-opt-clone"
                disabled={itemStatus === "inactive"}
                onClick={handleClone}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs ${
                  itemStatus === "inactive"
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                } transition-colors`}
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Clone Item</span>
              </button>

              <button
                data-tl="more-opt-toggle-active"
                onClick={handleToggleActive}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Power className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {itemStatus === "active"
                    ? "Mark as Inactive"
                    : "Mark as Active"}
                </span>
              </button>

              <button
                data-tl="more-opt-delete"
                disabled={itemStatus === "inactive"}
                onClick={handleDelete}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs ${
                  itemStatus === "inactive"
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-red-600 hover:bg-red-50"
                } transition-colors`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <button
                data-tl="more-opt-toggle-lock"
                onClick={handleToggleLock}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isLocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-gray-500" />
                    <span>Unlock Item</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-gray-500" />
                    <span>Lock Item</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Locked yellow banner */}
      {isLocked && (
        <div
          data-tl="banner-item-locked"
          className="mx-8 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 flex items-center gap-2"
        >
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            This item is locked and cannot be edited until it&apos;s unlocked.
          </span>
        </div>
      )}

      {/* Tabs bar */}
      <div className="px-8 mt-4 flex items-center gap-6 border-b border-gray-200 text-xs">
        <button
          data-tl="tab-details-overview"
          onClick={() => tl.setVar("booksDetailTab", "overview")}
          className={`pb-3 font-medium transition-colors cursor-pointer border-b-2 ${
            activeTab === "overview"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Overview
        </button>
        <button
          data-tl="tab-details-transactions"
          onClick={() => tl.setVar("booksDetailTab", "transactions")}
          className={`pb-3 font-medium transition-colors cursor-pointer border-b-2 ${
            activeTab === "transactions"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Transactions
        </button>
        <button
          data-tl="tab-details-history"
          onClick={() => tl.setVar("booksDetailTab", "history")}
          className={`pb-3 font-medium transition-colors cursor-pointer border-b-2 ${
            activeTab === "history"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          History
        </button>
      </div>

      {/* Tab contents */}
      <div className="p-8">
        {activeTab === "overview" && (
          <div data-tl="content-details-overview" className="max-w-3xl space-y-8">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">Item Type</span>
                <span className="text-gray-900 font-medium">
                  {item.type === "goods" ? "Sales Item" : "Service"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Unit</span>
                <span className="text-gray-900 font-medium">{item.usageUnit}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Status</span>
                <span
                  className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                    itemStatus === "active"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {itemStatus === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">Created Source</span>
                <span className="text-gray-900 font-medium">User</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Purchase Information
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Cost Price</span>
                  <span className="text-gray-900 font-medium">
                    £{item.costPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">
                    Purchase Account
                  </span>
                  <span className="text-gray-900 font-medium">
                    {item.purchaseAccount.replace(/^[0-9]+\s*—\s*/, "")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Sales Information
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Selling Price</span>
                  <span className="text-gray-900 font-medium">
                    £{item.sellingPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">
                    Sales Account
                  </span>
                  <span className="text-gray-900 font-medium">
                    {item.salesAccount.replace(/^[0-9]+\s*—\s*/, "")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-2">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                Reporting Tags
              </h3>
              <p className="text-xs text-gray-400">
                No reporting tag has been associated with this item.
              </p>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div data-tl="content-details-transactions" className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {FOOD_FARM_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-3 text-gray-500">{tx.date}</td>
                    <td className="py-3 px-3 font-medium text-gray-800">
                      {tx.type}
                    </td>
                    <td className="py-3 px-3 text-blue-600 font-mono">
                      {tx.reference}
                    </td>
                    <td className="py-3 px-3 text-gray-800">{tx.contact}</td>
                    <td className="py-3 px-3 text-gray-600">{tx.quantity}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">
                      {tx.amount}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "history" && (
          <div data-tl="content-details-history" className="max-w-2xl space-y-4">
            {historyList.map((h, i) => (
              <div
                key={h.id || i}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-900">
                      {h.action}
                    </p>
                    <span className="text-[11px] text-gray-400">
                      {h.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    by <span className="font-medium text-gray-700">{h.user}</span>
                  </p>
                  {h.detail && (
                    <p className="text-[11px] text-gray-400 pt-0.5">
                      {h.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
