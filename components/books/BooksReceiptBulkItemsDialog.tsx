"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, Check } from "lucide-react";
import {
  INITIAL_ACTIVE_ITEMS,
  type ReceiptLineItem,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksReceiptBulkItemsDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksReceiptBulkItemsDialogOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(tl, "booksReceiptBulkSearch", "");
  const selectedIds = useTimelineVar<string[]>(
    tl,
    "booksReceiptBulkSelected",
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

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "booksReceiptBulkSelected",
        selectedIds.filter((itemId) => itemId !== id)
      );
    } else {
      tl.setVar("booksReceiptBulkSelected", [...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    const current = tl.getVar<ReceiptLineItem[]>("booksReceiptLineItems", []);
    const itemsToAdd = INITIAL_ACTIVE_ITEMS.filter((it) =>
      selectedIds.includes(it.id)
    ).map((it, idx) => ({
      id: `bulk-${it.id}-${Date.now()}-${idx}`,
      name: it.name,
      description: it.description,
      quantity: 1,
      rate: it.rate,
      tax: "VAT Standard (20%)",
      amount: it.rate,
    }));

    tl.setVar("booksReceiptLineItems", [...current, ...itemsToAdd]);
    tl.setVar("booksReceiptBulkItemsDialogOpen", false);
    tl.setVar("booksReceiptBulkSelected", []);
    tl.setVar("booksToastText", `${itemsToAdd.length} items added`);
    tl.setVar("booksToastOpen", true);
  };

  const handleClose = () => {
    tl.setVar("booksReceiptBulkItemsDialogOpen", false);
  };

  const getItemCheckboxTl = (id: string, name: string) => {
    if (name.toLowerCase().includes("tote")) return "checkbox-bulk-item-tote";
    if (name.toLowerCase().includes("delivery")) return "checkbox-bulk-item-delivery";
    if (name.toLowerCase().includes("rice")) return "checkbox-bulk-item-rice";
    if (name.toLowerCase().includes("oil")) return "checkbox-bulk-item-oil";
    if (name.toLowerCase().includes("flour")) return "checkbox-bulk-item-flour";
    return `checkbox-bulk-item-${id}`;
  };

  return (
    <div
      data-tl="modal-receipt-bulk-items"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div className="w-[520px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Add Items in Bulk
          </h2>
          <button
            type="button"
            data-tl="btn-close-bulk-items"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            data-tl="input-bulk-search"
            value={searchQuery}
            onChange={(e) => tl.setVar("booksReceiptBulkSearch", e.target.value)}
            placeholder="Search items..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Items List */}
        <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 border border-gray-200 rounded-xl">
          {filteredItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const cbTl = getItemCheckboxTl(item.id, item.name);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between p-3 hover:bg-purple-50/50 cursor-pointer text-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-tl={
                      item.name.toLowerCase().includes("tote")
                        ? "checkbox-bulk-item-tote"
                        : item.name.toLowerCase().includes("delivery")
                        ? "checkbox-bulk-item-delivery"
                        : cbTl
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#7014D9] text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <div>
                    <span className="font-semibold text-gray-900 block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      {item.description}
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">
                  £{item.rate.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-cancel-bulk-items"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-confirm-bulk-items"
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              Add Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
