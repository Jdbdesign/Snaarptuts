"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, Check } from "lucide-react";
import {
  INITIAL_ACTIVE_ITEMS,
  type InvoiceLineItem,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceBulkItemsDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksInvoiceBulkItemsDialogOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(tl, "booksInvoiceBulkSearch", "");
  const selectedIds = useTimelineVar<string[]>(
    tl,
    "booksInvoiceBulkSelected",
    []
  );
  const currentLineItems = useTimelineVar<InvoiceLineItem[]>(
    tl,
    "booksInvoiceLineItems",
    []
  );

  if (!isOpen) return null;

  const filteredItems = INITIAL_ACTIVE_ITEMS.filter((item) => {
    if (!searchQuery.trim()) return true;
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  });

  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every((it) => selectedIds.includes(it.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      tl.setVar("booksInvoiceBulkSelected", []);
    } else {
      tl.setVar(
        "booksInvoiceBulkSelected",
        filteredItems.map((it) => it.id)
      );
    }
  };

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "booksInvoiceBulkSelected",
        selectedIds.filter((itemId) => itemId !== id)
      );
    } else {
      tl.setVar("booksInvoiceBulkSelected", [...selectedIds, id]);
    }
  };

  const handleClose = () => {
    tl.setVar("booksInvoiceBulkItemsDialogOpen", false);
  };

  const handleAddSelected = () => {
    const selectedItems = INITIAL_ACTIVE_ITEMS.filter((it) =>
      selectedIds.includes(it.id)
    );

    const newLines: InvoiceLineItem[] = selectedItems.map((it) => ({
      id: `bulk-${it.id}-${Date.now()}`,
      name: it.name,
      description: it.description,
      quantity: 1,
      rate: it.rate,
      tax: "-",
      amount: it.rate * 1,
    }));

    tl.setVar("booksInvoiceLineItems", [...currentLineItems, ...newLines]);
    tl.setVar("booksInvoiceBulkItemsDialogOpen", false);
    tl.setVar("booksInvoiceBulkSelected", []);
    tl.setVar("booksInvoiceBulkSearch", "");
    tl.setVar("booksToastText", `${newLines.length} items added.`);
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="modal-invoice-bulk-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-invoice-bulk-card"
        className="w-[620px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2
              data-tl="modal-invoice-bulk-title"
              className="text-base font-bold text-gray-900"
            >
              Add Items in Bulk
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select multiple items from your price list to insert at once.
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-close-invoice-bulk-x"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="pt-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              data-tl="input-invoice-bulk-search"
              value={searchQuery}
              onChange={(e) =>
                tl.setVar("booksInvoiceBulkSearch", e.target.value)
              }
              placeholder="Search items by name or SKU..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl divide-y divide-gray-100">
          <div className="p-2.5 bg-gray-50/80 flex items-center justify-between text-xs font-semibold text-gray-600">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                data-tl="checkbox-invoice-bulk-all"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded text-[#7014D9] focus:ring-[#7014D9] cursor-pointer"
              />
              <span>Select All</span>
            </label>
            <span>{selectedIds.length} selected</span>
          </div>

          {filteredItems.map((it) => {
            const isChecked = selectedIds.includes(it.id);
            return (
              <div
                key={it.id}
                data-tl={`bulk-invoice-item-row-${it.id}`}
                onClick={() => toggleItem(it.id)}
                className={`p-3 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  isChecked ? "bg-purple-50/60" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    data-tl={`checkbox-invoice-bulk-item-${it.id}`}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "bg-[#7014D9] border-[#7014D9] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{it.name}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {it.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">£{it.rate.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{it.type}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-cancel-invoice-bulk"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-invoice-submit-bulk-add"
              onClick={handleAddSelected}
              disabled={selectedIds.length === 0}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                selectedIds.length > 0
                  ? "bg-[#7014D9] hover:bg-[#5b0fb3] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add Selected Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
