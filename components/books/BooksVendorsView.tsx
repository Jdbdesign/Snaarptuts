"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_VENDORS,
  type VendorItem,
} from "./books-data";
import { Search, Plus, Trash2 } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksVendorsView({ tl }: Props) {
  const vendors = useTimelineVar<VendorItem[]>(tl, "booksVendors", INITIAL_VENDORS);
  const statusFilter = useTimelineVar<string>(tl, "booksVendorStatusFilter", "Active");
  const searchQuery = useTimelineVar<string>(tl, "booksVendorSearchQuery", "");

  const filtered = vendors.filter((v) => {
    if (statusFilter === "Active" && v.status !== "Active") return false;
    if (statusFilter === "Inactive" && v.status !== "Inactive") return false;
    if (
      searchQuery &&
      !v.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !v.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleRowClick = (vendor: VendorItem) => {
    tl.setVar("booksActiveVendor", vendor);
    tl.setVar("booksView", "vendor-details");
    tl.setUrl(BOOKS_URLS.vendorDetails);
  };

  const handleNewVendor = () => {
    tl.setVar("booksView", "new-vendor");
    tl.setUrl(BOOKS_URLS.newVendor);
  };

  const handleDeleteClick = (e: React.MouseEvent, vendor: VendorItem) => {
    e.stopPropagation();
    tl.setVar("booksVendorToDelete", vendor.name);
    tl.setVar("booksVendorConfirmOpen", true);
  };

  return (
    <div
      data-tl="books-vendors-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1
            data-tl="title-vendors"
            className="text-xl font-bold text-[#111827]"
          >
            All Vendors
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-vendors-import"
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs"
            >
              Import
            </button>
            <button
              type="button"
              data-tl="btn-new-vendor"
              onClick={handleNewVendor}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <input
              type="text"
              data-tl="input-vendors-search"
              placeholder="Search in Vendors..."
              value={searchQuery}
              onChange={(e) => tl.setVar("booksVendorSearchQuery", e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#2563EB]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              data-tl="select-vendors-status"
              value={statusFilter}
              onChange={(e) => tl.setVar("booksVendorStatusFilter", e.target.value)}
              className="text-xs border border-gray-200 rounded-lg bg-white px-3 py-2 pr-8 focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              <option data-tl="status-opt-active" value="Active">
                Active
              </option>
              <option data-tl="status-opt-inactive" value="Inactive">
                Inactive
              </option>
              <option data-tl="status-opt-all" value="All">
                All
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div
          data-tl="table-vendors"
          className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs"
        >
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9FAFB] border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Payment Terms</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No vendors found
                  </td>
                </tr>
              ) : (
                filtered.map((vendor) => {
                  const isGreenfield = vendor.id === "vend-greenfield" || vendor.name.includes("Greenfield");
                  const isNorthgate = vendor.id === "vend-northgate" || vendor.name.includes("Northgate");
                  const isHarbour = vendor.id === "vend-harbour" || vendor.name.includes("Harbour");

                  return (
                    <tr
                      key={vendor.id}
                      data-tl={
                        isGreenfield
                          ? "vendor-row-greenfield"
                          : isNorthgate
                          ? "vendor-row-northgate"
                          : isHarbour
                          ? "vendor-row-harbour"
                          : `vendor-row-${vendor.id}`
                      }
                      onClick={() => handleRowClick(vendor)}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {vendor.name}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {vendor.email}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {vendor.phone}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {vendor.paymentTerms}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            vendor.status === "Active"
                              ? "bg-[#DCFCE7] text-[#16A34A]"
                              : "bg-[#FEE2E2] text-[#DC2626]"
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          data-tl={
                            isNorthgate
                              ? "btn-delete-vendor-northgate"
                              : `btn-delete-vendor-${vendor.id}`
                          }
                          onClick={(e) => handleDeleteClick(e, vendor)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
