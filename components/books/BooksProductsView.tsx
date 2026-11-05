"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowUpDown,
  Upload,
  Download,
  Settings,
  RotateCw,
  Trash2,
  SlidersHorizontal,
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  X,
} from "lucide-react";
import {
  type BookItem,
  INITIAL_ACTIVE_ITEMS,
  INITIAL_INACTIVE_ITEMS,
  REFRESHED_NEW_ITEM,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksProductsView({ tl }: Props) {
  const activeItems = useTimelineVar<BookItem[]>(
    tl,
    "booksItems",
    INITIAL_ACTIVE_ITEMS
  );
  const inactiveItems = useTimelineVar<BookItem[]>(
    tl,
    "booksInactiveItems",
    INITIAL_INACTIVE_ITEMS
  );
  const filterTab = useTimelineVar<"active" | "inactive" | "all">(
    tl,
    "booksFilterTab",
    "active"
  );
  const isDropdownOpen = useTimelineVar<boolean>(
    tl,
    "booksTabDropdownOpen",
    false
  );
  const isMenuOpen = useTimelineVar<boolean>(
    tl,
    "booksProductsMenuOpen",
    false
  );
  const isSearchOpen = useTimelineVar<boolean>(
    tl,
    "booksSearchInputOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(tl, "booksSearchFilter", "");
  const selectedIds = useTimelineVar<string[]>(tl, "booksSelectedIds", []);
  const isColumnResized = useTimelineVar<boolean>(
    tl,
    "booksColumnResized",
    false
  );
  const colNameWidth = useTimelineVar<number>(
    tl,
    "booksColNameWidth",
    isColumnResized ? 320 : 220
  );
  const isLoading = useTimelineVar<boolean>(tl, "booksLoadingList", false);

  // Column visibility
  const colPurchaseDesc = useTimelineVar<boolean>(
    tl,
    "booksColPurchaseDesc",
    true
  );
  const colPurchaseRate = useTimelineVar<boolean>(
    tl,
    "booksColPurchaseRate",
    true
  );
  const colDesc = useTimelineVar<boolean>(tl, "booksColDesc", true);
  const colRate = useTimelineVar<boolean>(tl, "booksColRate", true);
  const colUnit = useTimelineVar<boolean>(tl, "booksColUnit", true);
  const sortBy = useTimelineVar<string>(tl, "booksSortBy", "date-desc");

  // Compute displayed items
  let baseList: BookItem[] = [];
  if (filterTab === "active") baseList = activeItems;
  else if (filterTab === "inactive") baseList = inactiveItems;
  else baseList = [...activeItems, ...inactiveItems];

  const filteredItems = baseList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.purchaseDescription.toLowerCase().includes(q)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "selling-desc") return b.sellingPrice - a.sellingPrice;
    if (sortBy === "cost-desc") return b.costPrice - a.costPrice;
    if (sortBy === "date-desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const allSelected =
    sortedItems.length > 0 &&
    sortedItems.every((it) => selectedIds.includes(it.id));
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < sortedItems.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      tl.setVar("booksSelectedIds", []);
    } else {
      tl.setVar(
        "booksSelectedIds",
        sortedItems.map((it) => it.id)
      );
    }
  };

  const handleToggleRow = (id: string) => {
    if (selectedIds.includes(id)) {
      tl.setVar(
        "booksSelectedIds",
        selectedIds.filter((x) => x !== id)
      );
    } else {
      tl.setVar("booksSelectedIds", [...selectedIds, id]);
    }
  };

  const currentTabLabel =
    filterTab === "active"
      ? "Active Items"
      : filterTab === "inactive"
      ? "Inactive Items"
      : "All Items";

  return (
    <div
      data-tl="books-products-view"
      className="flex-1 flex flex-col bg-white overflow-hidden relative"
    >
      {/* Top action row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 relative z-20">
        <div className="relative">
          <button
            data-tl="btn-filter-dropdown"
            onClick={() => tl.setVar("booksTabDropdownOpen", !isDropdownOpen)}
            className="flex items-center gap-1.5 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            <span>{currentTabLabel}</span>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div
              data-tl="filter-dropdown-menu"
              className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                data-tl="filter-opt-active"
                onClick={() => {
                  tl.setVar("booksFilterTab", "active");
                  tl.setVar("booksTabDropdownOpen", false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  filterTab === "active"
                    ? "font-semibold text-blue-600 bg-blue-50/50"
                    : "text-gray-700"
                }`}
              >
                Active Items
              </button>
              <button
                data-tl="filter-opt-inactive"
                onClick={() => {
                  tl.setVar("booksFilterTab", "inactive");
                  tl.setVar("booksTabDropdownOpen", false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  filterTab === "inactive"
                    ? "font-semibold text-blue-600 bg-blue-50/50"
                    : "text-gray-700"
                }`}
              >
                Inactive Items
              </button>
              <button
                data-tl="filter-opt-all"
                onClick={() => {
                  tl.setVar("booksFilterTab", "all");
                  tl.setVar("booksTabDropdownOpen", false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  filterTab === "all"
                    ? "font-semibold text-blue-600 bg-blue-50/50"
                    : "text-gray-700"
                }`}
              >
                All Items
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            data-tl="btn-new-item"
            onClick={() => {
              tl.setVar("booksView", "new-item");
              tl.setVar("booksEditingItem", null);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-sm rounded-md shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          <button
            data-tl="btn-products-menu"
            onClick={() => tl.setVar("booksProductsMenuOpen", !isMenuOpen)}
            className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md transition-colors cursor-pointer"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div
              data-tl="products-dropdown-menu"
              className="absolute right-0 top-10 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                data-tl="menu-opt-sort"
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksSortDrawerOpen", true);
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <span>Sort by</span>
                </div>
                <span className="text-gray-400 text-xs">›</span>
              </button>

              <button
                data-tl="menu-opt-import"
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksImportDrawerOpen", true);
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span>Import</span>
                </div>
                <span className="text-gray-400 text-xs">›</span>
              </button>

              <button
                data-tl="menu-opt-export"
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksExportDrawerOpen", true);
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-gray-500" />
                  <span>Export</span>
                </div>
                <span className="text-gray-400 text-xs">›</span>
              </button>

              <button
                data-tl="menu-opt-preferences"
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksColumnsDrawerOpen", true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span>Preferences</span>
              </button>

              <button
                data-tl="menu-opt-refresh"
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksLoadingList", true);
                  setTimeout(() => {
                    tl.setVar("booksLoadingList", false);
                    const current = tl.getVar<BookItem[]>("booksItems", INITIAL_ACTIVE_ITEMS);
                    if (!current.some((x) => x.id === REFRESHED_NEW_ITEM.id)) {
                      tl.setVar("booksItems", [REFRESHED_NEW_ITEM, ...current]);
                    }
                    tl.setVar("booksToastMessage", "Item list refreshed.");
                    tl.setVar("booksToastOpen", true);
                  }, 600);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <RotateCw className="w-4 h-4 text-gray-500" />
                <span>Refresh List</span>
              </button>

              <button
                data-tl="menu-opt-delete"
                disabled={selectedIds.length === 0}
                onClick={() => {
                  if (selectedIds.length > 0) {
                    tl.setVar("booksProductsMenuOpen", false);
                    tl.setVar(
                      "booksConfirmText",
                      `Delete ${selectedIds.length} selected items? This cannot be undone.`
                    );
                    tl.setVar("booksConfirmAction", "delete-bulk");
                    tl.setVar("booksConfirmOpen", true);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm ${
                  selectedIds.length > 0
                    ? "text-red-600 hover:bg-red-50 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed"
                } transition-colors`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                data-tl="menu-opt-reset-widths"
                disabled={!isColumnResized}
                onClick={() => {
                  tl.setVar("booksProductsMenuOpen", false);
                  tl.setVar("booksColumnResized", false);
                  tl.setVar("booksColNameWidth", 220);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm ${
                  isColumnResized
                    ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed"
                } transition-colors`}
              >
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <span>Reset Column Width</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk action bar (visible when 1 or more items selected) */}
      {selectedIds.length > 0 && (
        <div
          data-tl="bulk-action-bar"
          className="flex items-center justify-between px-6 py-2.5 bg-blue-50/50 border-b border-blue-100"
        >
          <div className="flex items-center gap-2">
            <span
              data-tl="bulk-selected-count"
              className="text-sm font-medium text-gray-900"
            >
              {selectedIds.length} selected
            </span>
          </div>

          <button
            data-tl="btn-bulk-delete"
            onClick={() => {
              tl.setVar(
                "booksConfirmText",
                `Delete ${selectedIds.length} selected items? This cannot be undone.`
              );
              tl.setVar("booksConfirmAction", "delete-bulk");
              tl.setVar("booksConfirmOpen", true);
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Table container */}
      <div
        data-tl="products-table-container"
        className="flex-1 overflow-x-auto overflow-y-auto"
      >
        <table
          data-tl="products-table"
          className="w-full text-left border-collapse min-w-[900px]"
        >
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="w-10 px-4 py-3">
                <input
                  data-tl="th-checkbox"
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleToggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th
                style={{ width: `${colNameWidth}px` }}
                className="px-4 py-3 relative group"
              >
                <span>NAME</span>
                {/* Resize handle */}
                <div
                  data-tl="col-resize-handle"
                  onClick={(e) => {
                    e.stopPropagation();
                    tl.setVar("booksColumnResized", true);
                    tl.setVar("booksColNameWidth", 340);
                  }}
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-400/40"
                  title="Drag to resize column"
                />
              </th>
              {colPurchaseDesc && (
                <th className="px-4 py-3">PURCHASE DESCRIPTION</th>
              )}
              {colPurchaseRate && (
                <th className="px-4 py-3">PURCHASE RATE</th>
              )}
              {colDesc && <th className="px-4 py-3">DESCRIPTION</th>}
              {colRate && <th className="px-4 py-3">RATE</th>}
              {colUnit && <th className="px-4 py-3">USAGE UNIT</th>}
              <th className="w-12 px-3 py-3 text-right">
                <button
                  data-tl="btn-table-search"
                  onClick={() =>
                    tl.setVar("booksSearchInputOpen", !isSearchOpen)
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label="Search items"
                >
                  <Search className="w-4 h-4" />
                </button>
              </th>
            </tr>

            {/* Inline search row when search is toggled open */}
            {isSearchOpen && (
              <tr className="border-b border-blue-200 bg-blue-50/40 animate-in fade-in duration-100">
                <td className="px-4 py-2" />
                <td colSpan={7} className="px-4 py-2">
                  <div className="flex items-center gap-2 max-w-sm bg-white border border-gray-300 rounded px-2.5 py-1 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      data-tl="input-table-search"
                      type="text"
                      placeholder="Filter items by name or description..."
                      value={searchQuery}
                      onChange={(e) =>
                        tl.setVar("booksSearchFilter", e.target.value)
                      }
                      className="w-full text-xs text-gray-900 outline-none bg-transparent"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => tl.setVar("booksSearchFilter", "")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-sm text-gray-400"
                >
                  <RotateCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                  Loading items...
                </td>
              </tr>
            ) : sortedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-sm text-gray-400"
                >
                  No items found.
                </td>
              </tr>
            ) : (
              sortedItems.map((item, index) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    data-tl={`row-item-${index + 1}`}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isChecked ? "bg-blue-50/20" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        data-tl={`row-checkbox-${index + 1}`}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleRow(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td
                      style={{ width: `${colNameWidth}px` }}
                      className="px-4 py-3 font-medium truncate"
                    >
                      <button
                        data-tl={`link-item-${index + 1}`}
                        onClick={() => {
                          tl.setVar("booksView", "item-detail");
                          tl.setVar("booksCurrentItem", item);
                          tl.setVar("booksDetailTab", "overview");
                        }}
                        className="text-[#2563EB] hover:underline cursor-pointer text-left font-medium truncate max-w-full"
                      >
                        {item.name}
                      </button>
                    </td>
                    {colPurchaseDesc && (
                      <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]">
                        {item.purchaseDescription}
                      </td>
                    )}
                    {colPurchaseRate && (
                      <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                        £{item.purchaseRate.toFixed(2)}
                      </td>
                    )}
                    {colDesc && (
                      <td className="px-4 py-3 text-gray-600 truncate max-w-[240px]">
                        {item.description}
                      </td>
                    )}
                    {colRate && (
                      <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                        £{item.rate.toFixed(2)}
                      </td>
                    )}
                    {colUnit && (
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {item.usageUnit}
                      </td>
                    )}
                    <td className="px-3 py-3" />
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
