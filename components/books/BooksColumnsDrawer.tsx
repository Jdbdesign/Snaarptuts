"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

type Props = {
  tl: Timeline;
};

export function BooksColumnsDrawer({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksColumnsDrawerOpen", false);
  const colPurchaseDesc = useTimelineVar(tl, "booksColPurchaseDesc", true);
  const colPurchaseRate = useTimelineVar(tl, "booksColPurchaseRate", true);
  const colDesc = useTimelineVar(tl, "booksColDesc", true);
  const colRate = useTimelineVar(tl, "booksColRate", true);
  const colUnit = useTimelineVar(tl, "booksColUnit", true);

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-columns-drawer-overlay"
      className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
      onClick={() => tl.setVar("booksColumnsDrawerOpen", false)}
    >
      <div
        data-tl="books-columns-drawer"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-[270px] bg-white border-l border-gray-200 p-5 shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <h3 className="text-sm font-semibold text-gray-900 pb-3 border-b border-gray-100">
          Visible Columns
        </h3>

        <div className="mt-4 space-y-3">
          <label
            data-tl="col-opt-purchase-desc"
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colPurchaseDesc}
              onChange={(e) => tl.setVar("booksColPurchaseDesc", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Purchase Description</span>
          </label>

          <label
            data-tl="col-opt-purchase-rate"
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colPurchaseRate}
              onChange={(e) => tl.setVar("booksColPurchaseRate", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Purchase Rate</span>
          </label>

          <label
            data-tl="col-opt-desc"
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colDesc}
              onChange={(e) => tl.setVar("booksColDesc", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Description</span>
          </label>

          <label
            data-tl="col-opt-rate"
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colRate}
              onChange={(e) => tl.setVar("booksColRate", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Rate</span>
          </label>

          <label
            data-tl="col-opt-unit"
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colUnit}
              onChange={(e) => tl.setVar("booksColUnit", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Usage Unit</span>
          </label>
        </div>
      </div>
    </div>
  );
}
