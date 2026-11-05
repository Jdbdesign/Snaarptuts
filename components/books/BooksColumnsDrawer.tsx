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
          <div
            data-tl="col-opt-purchase-desc"
            onClick={() => tl.setVar("booksColPurchaseDesc", !colPurchaseDesc)}
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colPurchaseDesc}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none"
            />
            <span>Purchase Description</span>
          </div>

          <div
            data-tl="col-opt-purchase-rate"
            onClick={() => tl.setVar("booksColPurchaseRate", !colPurchaseRate)}
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colPurchaseRate}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none"
            />
            <span>Purchase Rate</span>
          </div>

          <div
            data-tl="col-opt-desc"
            onClick={() => tl.setVar("booksColDesc", !colDesc)}
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colDesc}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none"
            />
            <span>Description</span>
          </div>

          <div
            data-tl="col-opt-rate"
            onClick={() => tl.setVar("booksColRate", !colRate)}
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colRate}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none"
            />
            <span>Rate</span>
          </div>

          <div
            data-tl="col-opt-unit"
            onClick={() => tl.setVar("booksColUnit", !colUnit)}
            className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={colUnit}
              readOnly
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer pointer-events-none"
            />
            <span>Usage Unit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
