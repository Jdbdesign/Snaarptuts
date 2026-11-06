"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, Check } from "lucide-react";
import {
  INITIAL_ACTIVE_ITEMS,
  type CreditNoteLineItem,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCreditNoteBulkItemsDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksCreditNoteBulkItemsDialogOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksCreditNoteBulkSearch",
    ""
  );
  const selectedIds = useTimelineVar<string[]>(
    tl,
    "booksCreditNoteBulkSelected",
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
        "booksCreditNoteBulkSelected",
        selectedIds.filter((itemId) => itemId !== id)
      );
    } else {
      tl.setVar("booksCreditNoteBulkSelected", [...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    const current = tl.getVar<CreditNoteLineItem[]>(
      "booksCreditNoteLineItems",
      []
    );
    const itemsToAdd = INITIAL_ACTIVE_ITEMS.filter((it) =>
      selectedIds.includes(it.id)
    ).map((it, idx) => ({
      id: `bulk-cn-${it.id}-${Date.now()}-${idx}`,
      name: it.name,
      description: it.description,
      account: "Sales",
      quantity: 1,
      rate: it.sellingPrice || it.rate,
      tax: it.tax || "VAT Standard (20%)",
      amount: (it.sellingPrice || it.rate) * 1,
    }));

    // If only an empty row exists, replace it, otherwise append
    const cleanedCurrent = current.filter((it) => it.name.trim() !== "");
    tl.setVar("booksCreditNoteLineItems", [...cleanedCurrent, ...itemsToAdd]);
    tl.setVar("booksCreditNoteBulkItemsDialogOpen", false);
    tl.setVar("booksCreditNoteBulkSelected", []);
  };

  const handleClose = () => {
    tl.setVar("booksCreditNoteBulkItemsDialogOpen", false);
  };

  return (
    <div
      data-tl="modal-credit-note-bulk-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-credit-note-bulk-card"
        className="w-[560px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 space-y-4 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            data-tl="modal-credit-note-bulk-title"
            className="text-base font-bold text-gray-900"
          >
            Add Items in Bulk
          </h2>
          <button
            type="button"
            data-tl="btn-close-credit-note-bulk"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            data-tl="input-credit-note-bulk-search"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) =>
              tl.setVar("booksCreditNoteBulkSearch", e.target.value)
            }
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[360px]">
          {filteredItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                data-tl={`bulk-item-row-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#7014D9] bg-purple-50/50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#7014D9] text-white"
                        : "border border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-xs text-gray-900">
                    £{item.rate.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-400">per {item.usageUnit}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {selectedIds.length} item{selectedIds.length === 1 ? "" : "s"} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-cancel-credit-note-bulk"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-confirm-credit-note-bulk"
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-xs"
            >
              Add Selected Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
