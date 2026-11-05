"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search, Check } from "lucide-react";
import {
  INITIAL_ACTIVE_ITEMS,
  type BookItem,
  type QuoteLineItem,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksQuoteBulkItemsDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(
    tl,
    "booksQuoteBulkItemsDialogOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(tl, "booksQuoteBulkSearch", "");
  const selectedIds = useTimelineVar<string[]>(
    tl,
    "booksQuoteBulkSelected",
    []
  );
  const currentLineItems = useTimelineVar<QuoteLineItem[]>(
    tl,
    "booksQuoteLineItems",
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
      tl.setVar("booksQuoteBulkSelected", []);
    } else {
      tl.setVar(
        "booksQuoteBulkSelected",
        filteredItems.map((it) => it.id)
      );
    }
  };

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "booksQuoteBulkSelected",
        selectedIds.filter((itemId) => itemId !== id)
      );
    } else {
      tl.setVar("booksQuoteBulkSelected", [...selectedIds, id]);
    }
  };

  const handleClose = () => {
    tl.setVar("booksQuoteBulkItemsDialogOpen", false);
  };

  const handleAddSelected = () => {
    // Convert selected BookItems to QuoteLineItems with prompt-specified rates:
    // Honey Beans 1kg -> 9.00, Yam Tubers -> 14.00, Packaging Boxes -> 12.00
    const newItems: QuoteLineItem[] = selectedIds.map((id) => {
      const found = INITIAL_ACTIVE_ITEMS.find((it) => it.id === id);
      let rate = found ? found.rate : 10.0;
      let name = found ? found.name : "Item";

      if (id === "item-5" || name.toLowerCase().includes("honey beans")) {
        rate = 9.0;
        name = "Honey Beans 1kg";
      } else if (id === "item-4" || name.toLowerCase().includes("yam tubers")) {
        rate = 14.0;
        name = "Yam Tubers";
      } else if (id === "item-7" || name.toLowerCase().includes("packaging boxes")) {
        rate = 12.0;
        name = "Packaging Boxes";
      }

      return {
        id: `bulk-${id}-${Date.now()}`,
        name,
        quantity: 1,
        rate,
        tax: "-",
        amount: rate,
      };
    });

    tl.setVar("booksQuoteLineItems", [...currentLineItems, ...newItems]);
    tl.setVar("booksQuoteBulkItemsDialogOpen", false);
    tl.setVar("booksQuoteBulkSearch", "");
    tl.setVar("booksQuoteBulkSelected", []);
  };

  // Helper for specific targets requested by test scripts
  const getItemTargetId = (item: BookItem) => {
    if (item.name.toLowerCase().includes("honey beans")) {
      return "checkbox-bulk-item-honey-beans";
    }
    if (item.name.toLowerCase().includes("yam tubers")) {
      return "checkbox-bulk-item-yam-tubers";
    }
    if (item.name.toLowerCase().includes("packaging boxes")) {
      return "checkbox-bulk-item-packaging-boxes";
    }
    return `checkbox-bulk-item-${item.id}`;
  };

  return (
    <div
      data-tl="modal-bulk-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
    >
      <div
        data-tl="modal-bulk-card"
        className="w-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 flex flex-col space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              data-tl="modal-bulk-title"
              className="text-base font-bold text-gray-900"
            >
              Add Items in Bulk
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select products or services to add to your quote.
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-close-bulk"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            data-tl="input-bulk-search"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => tl.setVar("booksQuoteBulkSearch", e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9]"
          />
        </div>

        {/* Select All Row */}
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100 text-xs">
          <label className="flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer">
            <button
              type="button"
              data-tl="checkbox-bulk-select-all"
              onClick={toggleSelectAll}
              className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                allSelected
                  ? "bg-[#7014D9] text-white"
                  : "border border-gray-300"
              }`}
            >
              {allSelected && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <span>Select All ({INITIAL_ACTIVE_ITEMS.length} items)</span>
          </label>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-72">
          {filteredItems.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            const targetTl = getItemTargetId(item);
            let displayPrice = item.rate.toFixed(2);
            if (item.name.toLowerCase().includes("honey beans")) displayPrice = "9.00";
            if (item.name.toLowerCase().includes("yam tubers")) displayPrice = "14.00";
            if (item.name.toLowerCase().includes("packaging boxes")) displayPrice = "12.00";

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isChecked
                    ? "bg-purple-50/60 border-purple-200"
                    : "hover:bg-gray-50 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    data-tl={targetTl}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item.id);
                    }}
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isChecked
                        ? "bg-[#7014D9] text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-900 truncate">
                        {item.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                        {item.type === "service" ? "Service" : "Product"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-semibold text-gray-900 pl-3 shrink-0">
                  {displayPrice}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            data-tl="bulk-selected-count"
            className="text-xs text-gray-500 font-medium"
          >
            {selectedIds.length} items selected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-cancel-bulk"
              onClick={handleClose}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-confirm-bulk-add"
              onClick={handleAddSelected}
              className="px-4 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
            >
              Add Selected Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
