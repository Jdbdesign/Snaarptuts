"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksSortDrawer({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksSortDrawerOpen", false);
  const sortBy = useTimelineVar<string>(tl, "booksSortBy", "date-desc");

  if (!isOpen) return null;

  const handleSelect = (key: string) => {
    tl.setVar("booksSortBy", key);
  };

  return (
    <div
      data-tl="books-sort-drawer-overlay"
      className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[0.5px] transition-opacity"
      onClick={() => tl.setVar("booksSortDrawerOpen", false)}
    >
      <div
        data-tl="books-sort-drawer"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-[270px] bg-white border-l border-gray-200 p-5 shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <div className="space-y-1">
          {/* Name */}
          <button
            type="button"
            data-tl="sort-opt-name"
            onClick={() => handleSelect("name-asc")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              sortBy === "name-asc"
                ? "bg-blue-50/80 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Name</span>
            {sortBy === "name-asc" && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} />
                <span>Ascending</span>
              </span>
            )}
          </button>

          {/* Selling Price */}
          <button
            type="button"
            data-tl="sort-opt-selling-price"
            onClick={() => handleSelect("selling-desc")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              sortBy === "selling-desc"
                ? "bg-blue-50/80 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Selling Price</span>
            {sortBy === "selling-desc" && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} />
                <span>Descending</span>
              </span>
            )}
          </button>

          {/* Cost Price */}
          <button
            type="button"
            data-tl="sort-opt-cost-price"
            onClick={() => handleSelect("cost-desc")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              sortBy === "cost-desc"
                ? "bg-blue-50/80 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Cost Price</span>
            {sortBy === "cost-desc" && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} />
                <span>Descending</span>
              </span>
            )}
          </button>

          {/* Date Created */}
          <button
            type="button"
            data-tl="sort-opt-date-created"
            onClick={() => handleSelect("date-desc")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              sortBy === "date-desc"
                ? "bg-blue-50/80 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Date Created</span>
            {sortBy === "date-desc" && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} />
                <span>Descending</span>
              </span>
            )}
          </button>

          {/* Last Modified */}
          <button
            type="button"
            data-tl="sort-opt-last-modified"
            onClick={() => handleSelect("modified-desc")}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              sortBy === "modified-desc"
                ? "bg-blue-50/80 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Last Modified</span>
            {sortBy === "modified-desc" && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Check size={14} />
                <span>Descending</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
