"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Package,
  Plus,
  Download,
  Upload,
  Search,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Copy,
  ChevronDown,
} from "lucide-react";
import {
  INITIAL_PRODUCTS,
  type CrmProductItem,
} from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmProductsView({ tl }: Props) {
  const products = useTimelineVar<CrmProductItem[]>(
    tl,
    "crm:products",
    INITIAL_PRODUCTS
  );
  const viewMode = useTimelineVar<"grid" | "list">(
    tl,
    "crm:productsViewMode",
    "grid"
  );
  const sortOption = useTimelineVar<string>(
    tl,
    "crm:productsSort",
    "Newest"
  );
  const selectedIds = useTimelineVar<string[]>(
    tl,
    "crm:selectedProductIds",
    []
  );

  // Filter/Sort products
  const displayProducts = [...products].sort((a, b) => {
    if (sortOption === "Name A-Z") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const toggleSelect = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    tl.setVar("crm:selectedProductIds", next);
  };

  return (
    <div
      data-scroller
      className="no-scrollbar flex h-full flex-col overflow-y-auto bg-[#F8F9FA] p-6 text-[#111111]"
    >
      {/* Header */}
      <div
        data-tl="crm-products-header"
        className="mb-5 flex items-center justify-between"
      >
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
            Products
          </h1>
          <p className="text-[13px] text-[#6B7280]">
            {products.length} products · drop these into email templates
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
          >
            <Download size={15} />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
          >
            <Upload size={15} />
            <span>Import</span>
          </button>

          <button
            type="button"
            data-tl="crm-products-add-btn"
            onClick={() => {
              tl.setVar("crm:isNewProductOpen", true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer transition-colors"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search, Sort and View Toggles */}
      <div className="mb-4 flex items-center justify-between">
        {/* Search */}
        <div className="flex w-[280px] items-center rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] shadow-2xs">
          <Search size={15} className="mr-2 text-[#9CA3AF]" />
          <input
            type="text"
            data-tl="crm-products-search-input"
            readOnly
            placeholder="Search products..."
            className="w-full bg-transparent text-[12.5px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative inline-block">
            <select
              data-tl="crm-products-sort-select"
              value={sortOption}
              onChange={(e) => {
                tl.setVar("crm:productsSort", e.target.value);
              }}
              className="appearance-none rounded-xl border border-[#E5E7EB] bg-white py-2 pl-3.5 pr-8 text-[12.5px] font-medium text-[#374151] shadow-2xs focus:border-[#7C3AED] focus:outline-none cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Name A-Z">Name A-Z</option>
              <option value="Price Low-High">Price: Low to High</option>
              <option value="Price High-Low">Price: High to Low</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              data-tl="crm-products-view-grid"
              onClick={() => tl.setVar("crm:productsViewMode", "grid")}
              className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#F3ECFC] text-[#7C3AED]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              data-tl="crm-products-view-list"
              onClick={() => tl.setVar("crm:productsViewMode", "list")}
              className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#F3ECFC] text-[#7C3AED]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Selection Bar */}
      {selectedIds.length > 0 && (
        <div
          data-tl="crm-products-bulk-bar"
          className="mb-4 flex items-center justify-between rounded-xl bg-[#7C3AED] px-4 py-2.5 text-white shadow-md animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="text-[13px] font-semibold">
            {selectedIds.length} selected
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => tl.setVar("crm:selectedProductIds", [])}
              className="text-[12.5px] font-medium text-white/80 hover:text-white cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              data-tl="crm-products-bulk-delete-btn"
              onClick={() => {
                const remaining = products.filter(
                  (p) => !selectedIds.includes(p.id)
                );
                tl.setVar("crm:products", remaining);
                tl.setVar("crm:selectedProductIds", []);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-[12.5px] font-semibold text-white shadow-xs hover:bg-red-700 cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Products Content: Grid or List */}
      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-4 gap-4">
          {displayProducts.map((p) => (
            <div
              key={p.id}
              data-tl={`crm-product-card-${p.id}`}
              className="flex flex-col justify-between rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3ECFC] text-[#7C3AED]">
                    <Package size={20} />
                  </div>
                  <span className="inline-flex rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-semibold text-[#059669]">
                    {p.status}
                  </span>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#111111]">
                  {p.name}
                </h3>
                <p className="text-[12px] text-[#6B7280]">
                  {p.category} · {p.sku}
                </p>
                <div className="mt-3 text-[15px] font-bold text-[#7C3AED]">
                  {p.price}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#F3F4F6] pt-3">
                <button
                  type="button"
                  data-tl={
                    p.id === "lock" ? "crm-product-edit-lock" : undefined
                  }
                  onClick={() => {
                    tl.setVar("crm:editingProductId", p.id);
                    tl.setVar("crm:isEditProductOpen", true);
                  }}
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#4B5563] hover:text-[#7C3AED] cursor-pointer"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="text-[12px] font-medium text-[#6B7280] hover:text-[#111111] cursor-pointer"
                >
                  Disable
                </button>
                <button
                  type="button"
                  className="text-[#9CA3AF] hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div
          data-tl="crm-products-table"
          className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#ECECF1] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                  <th className="w-10 pb-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length > 0 &&
                        selectedIds.length === displayProducts.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          tl.setVar(
                            "crm:selectedProductIds",
                            displayProducts.map((p) => p.id)
                          );
                        } else {
                          tl.setVar("crm:selectedProductIds", []);
                        }
                      }}
                      className="h-4 w-4 rounded accent-[#7C3AED]"
                    />
                  </th>
                  <th className="pb-3 font-semibold">PRODUCT</th>
                  <th className="pb-3 font-semibold">SKU</th>
                  <th className="pb-3 font-semibold">CATEGORY</th>
                  <th className="pb-3 font-semibold">PRICE</th>
                  <th className="pb-3 text-center font-semibold">STATUS</th>
                  <th className="pb-3 text-right font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {displayProducts.map((p) => {
                  const isChecked = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      data-tl={`crm-product-row-${p.id}`}
                      className="hover:bg-[#F9FAFB]"
                    >
                      <td className="py-3">
                        <input
                          type="checkbox"
                          data-tl={
                            p.id === "books"
                              ? "crm-product-check-books"
                              : p.id === "crm"
                              ? "crm-product-check-crm"
                              : undefined
                          }
                          checked={isChecked}
                          onChange={() => toggleSelect(p.id)}
                          className="h-4 w-4 rounded accent-[#7C3AED] cursor-pointer"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3ECFC] text-[#7C3AED]">
                            <Package size={16} />
                          </div>
                          <span className="font-semibold text-[#111111]">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-[#6B7280]">{p.sku}</td>
                      <td className="py-3 text-[#374151]">{p.category}</td>
                      <td className="py-3 font-bold text-[#7C3AED]">
                        {p.price}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-semibold text-[#059669]">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            data-tl={
                              p.id === "lock"
                                ? "crm-product-edit-lock"
                                : undefined
                            }
                            onClick={() => {
                              tl.setVar("crm:editingProductId", p.id);
                              tl.setVar("crm:isEditProductOpen", true);
                            }}
                            className="rounded-md p-1 text-[#6B7280] hover:text-[#7C3AED] cursor-pointer"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            type="button"
                            className="rounded-md p-1 text-[#6B7280] hover:text-[#111111] cursor-pointer"
                          >
                            <Copy size={15} />
                          </button>
                          <button
                            type="button"
                            className="rounded-md p-1 text-[#9CA3AF] hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
