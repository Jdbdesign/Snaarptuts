"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ChevronDown, Trash2 } from "lucide-react";
import {
  type CustomerItem,
  INITIAL_ACTIVE_CUSTOMERS,
  INITIAL_INACTIVE_CUSTOMERS,
  BOOKS_URLS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCustomersView({ tl }: Props) {
  const activeCustomers = useTimelineVar<CustomerItem[]>(
    tl,
    "booksCustomers",
    INITIAL_ACTIVE_CUSTOMERS
  );
  const inactiveCustomers = useTimelineVar<CustomerItem[]>(
    tl,
    "booksInactiveCustomers",
    INITIAL_INACTIVE_CUSTOMERS
  );
  const filterTab = useTimelineVar<"active" | "inactive" | "all">(
    tl,
    "booksCustomerFilter",
    "active"
  );
  const searchQuery = useTimelineVar<string>(tl, "booksCustomerSearch", "");
  const isStatusOpen = useTimelineVar<boolean>(
    tl,
    "booksCustomerStatusDropdownOpen",
    false
  );

  // Compute displayed list
  let baseList: CustomerItem[] = [];
  if (filterTab === "active") baseList = activeCustomers;
  else if (filterTab === "inactive") baseList = inactiveCustomers;
  else baseList = [...activeCustomers, ...inactiveCustomers];

  const filtered = baseList.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.displayName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  const getStatusLabel = () => {
    if (filterTab === "active") return "Active";
    if (filterTab === "inactive") return "Inactive";
    return "All";
  };

  const handleDeleteClick = (cust: CustomerItem) => {
    tl.setVar("booksTargetDeleteCustomer", cust);
    tl.setVar("booksCustomerConfirmOpen", true);
  };

  return (
    <div
      data-tl="customers-view"
      className="flex flex-1 flex-col h-full bg-white overflow-y-auto px-8 py-6 select-none"
    >
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        Customers
      </h1>

      {/* Top Controls Bar */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              data-tl="input-customer-search"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => tl.setVar("booksCustomerSearch", e.target.value)}
              className="h-10 w-64 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none transition-colors"
            />
          </div>

          {/* Status dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="select-customer-status"
              onClick={() =>
                tl.setVar(
                  "booksCustomerStatusDropdownOpen",
                  !isStatusOpen
                )
              }
              className="flex h-10 items-center justify-between gap-2.5 rounded-xl border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:border-[#7014D9] transition-colors cursor-pointer min-w-[100px]"
            >
              <span>{getStatusLabel()}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isStatusOpen && (
              <div
                data-tl="status-dropdown-menu"
                className="absolute left-0 top-[calc(100%+4px)] z-30 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  data-tl="status-opt-active"
                  onClick={() => {
                    tl.setVar("booksCustomerFilter", "active");
                    tl.setVar("booksCustomerStatusDropdownOpen", false);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-gray-50 cursor-pointer ${
                    filterTab === "active"
                      ? "text-[#7014D9] font-semibold bg-purple-50/50"
                      : "text-gray-700"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  data-tl="status-opt-inactive"
                  onClick={() => {
                    tl.setVar("booksCustomerFilter", "inactive");
                    tl.setVar("booksCustomerStatusDropdownOpen", false);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-gray-50 cursor-pointer ${
                    filterTab === "inactive"
                      ? "text-[#7014D9] font-semibold bg-purple-50/50"
                      : "text-gray-700"
                  }`}
                >
                  Inactive
                </button>
                <button
                  type="button"
                  data-tl="status-opt-all"
                  onClick={() => {
                    tl.setVar("booksCustomerFilter", "all");
                    tl.setVar("booksCustomerStatusDropdownOpen", false);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-xs transition-colors hover:bg-gray-50 cursor-pointer ${
                    filterTab === "all"
                      ? "text-[#7014D9] font-semibold bg-purple-50/50"
                      : "text-gray-700"
                  }`}
                >
                  All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-customers-import"
            onClick={() => tl.setVar("booksCustomerImportDrawerOpen", true)}
            className="flex h-10 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Import
          </button>

          <button
            type="button"
            data-tl="btn-new-customer"
            onClick={() => {
              tl.setVar("booksView", "new-customer");
              tl.setUrl(BOOKS_URLS.newCustomer);
            }}
            className="flex h-10 items-center justify-center rounded-xl bg-[#7014D9] px-4 text-xs font-medium text-white hover:bg-[#5E10B7] shadow-sm transition-colors cursor-pointer"
          >
            + New Customer
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div
        data-tl="customers-table-container"
        className="mt-6 overflow-hidden rounded-xl border border-gray-200"
      >
        <table data-tl="customers-table" className="w-full text-left">
          <thead className="bg-[#FAF9FC] border-b border-gray-200 text-xs font-medium text-gray-600">
            <tr>
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Phone</th>
              <th className="px-5 py-3.5">All</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filtered.map((cust, idx) => {
                const isSummit = cust.displayName === "Summit Cycles";
                return (
                  <tr
                    key={cust.id}
                    data-tl={`row-customer-${idx + 1}`}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      <button
                        type="button"
                        data-tl={`link-customer-${idx + 1}`}
                        onClick={() => {
                          tl.setVar("booksActiveCustomer", cust);
                          tl.setVar("booksView", "customer-detail");
                          tl.setUrl(
                            `${BOOKS_URLS.customers}/${cust.id}`
                          );
                        }}
                        className="text-left font-medium text-gray-900 hover:text-[#7014D9] cursor-pointer"
                      >
                        {cust.displayName}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{cust.email}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {cust.phoneCode} {cust.phone}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        data-tl={`badge-customer-status-${idx + 1}`}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          cust.status === "active"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {cust.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        data-tl={
                          isSummit
                            ? "btn-delete-customer-summit"
                            : `btn-delete-customer-${idx + 1}`
                        }
                        onClick={() => handleDeleteClick(cust)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                        title="Delete customer"
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
  );
}
