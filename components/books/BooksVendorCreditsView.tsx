"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_VENDOR_CREDITS, type VendorCredit } from "./books-data";
import {
  ChevronDown,
  Plus,
  Search,
  Trash2,
  RotateCcw,
  FileText,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksVendorCreditsView({ tl }: Props) {
  const credits = useTimelineVar<VendorCredit[]>(
    tl,
    "booksVendorCredits",
    INITIAL_VENDOR_CREDITS
  );
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksVendorCreditStatusFilter",
    "Status"
  );
  const isStatusMenuOpen = useTimelineVar<boolean>(
    tl,
    "booksVendorCreditStatusDropdownOpen",
    false
  );
  const searchQuery = useTimelineVar<string>(
    tl,
    "booksVendorCreditSearchQuery",
    ""
  );

  const handleRowClick = (credit: VendorCredit) => {
    tl.setVar("booksActiveVendorCredit", credit);
    tl.setVar("booksView", "vendor-credit-detail");
    tl.setUrl(BOOKS_URLS.vendorCreditDetails);
  };

  const handleNew = () => {
    tl.setVar("booksView", "new-vendor-credit");
    tl.setUrl(BOOKS_URLS.newVendorCredit);
  };

  const handleDelete = (e: React.MouseEvent, credit: VendorCredit) => {
    e.stopPropagation();
    tl.setVar("booksVendorCreditToDelete", credit);
    tl.setVar("booksVendorCreditConfirmOpen", true);
  };

  const filteredCredits = credits.filter((c) => {
    const matchesSearch =
      c.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creditNoteNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === "Status" || statusFilter === "All") return true;
    return c.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div
      data-tl="books-vendor-credits-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              data-tl="vendor-credits-title"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              All Vendor Credits
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </h1>
          </div>

          <button
            type="button"
            data-tl="btn-new-vendor-credit"
            onClick={handleNew}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              data-tl="input-vendor-credits-search"
              value={searchQuery}
              onChange={(e) => tl.setVar("booksVendorCreditSearchQuery", e.target.value)}
              placeholder="Search in Vendor Credits..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="btn-vendor-credit-status-dropdown"
              onClick={() =>
                tl.setVar(
                  "booksVendorCreditStatusDropdownOpen",
                  !isStatusMenuOpen
                )
              }
              className="flex items-center justify-between w-36 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isStatusMenuOpen && (
              <div
                data-tl="menu-vendor-credit-status-filter"
                className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 text-xs"
              >
                {[
                  { label: "Status", tlKey: "opt-vendor-credit-status-all" },
                  { label: "Open", tlKey: "opt-vendor-credit-status-open" },
                  { label: "Closed", tlKey: "opt-vendor-credit-status-closed" },
                  { label: "Void", tlKey: "opt-vendor-credit-status-void" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    data-tl={opt.tlKey}
                    onClick={() => {
                      tl.setVar("booksVendorCreditStatusFilter", opt.label);
                      tl.setVar("booksVendorCreditStatusDropdownOpen", false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                      statusFilter === opt.label
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty State or List */}
        {filteredCredits.length === 0 ? (
          <div
            data-tl="empty-state-vendor-credits"
            className="flex flex-col items-center justify-center py-12 px-4 text-center select-none"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              You deserve some credit too.
            </h2>
            <p className="text-xs text-gray-500 max-w-md mb-6">
              Create vendor credits and apply them to multiple bills when buying stuff from your vendor.
            </p>

            <button
              type="button"
              data-tl="btn-empty-new-vendor-credit"
              onClick={handleNew}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-colors uppercase tracking-wider mb-2"
            >
              CREATE VENDOR CREDITS
            </button>

            <button
              type="button"
              className="text-xs text-blue-600 hover:underline mb-12 cursor-pointer"
            >
              Import Vendor Credits
            </button>

            {/* Lifecycle diagram */}
            <div className="w-full max-w-3xl bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-700 mb-6">
                Life cycle of a Vendor Credit
              </h3>

              <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto py-2">
                {/* 1. Returned */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 text-[11px] font-semibold text-teal-800">
                  <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                  <span>PRODUCT RETURNED /<br />CANCELLED</span>
                </div>

                <div className="w-5 border-t border-dashed border-gray-300" />

                {/* 2. Received */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 text-[11px] font-semibold text-teal-800">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>CREDIT NOTE<br />RECEIVED</span>
                </div>

                <div className="w-5 border-t border-dashed border-gray-300" />

                {/* 3. Record */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 text-[11px] font-semibold text-teal-800">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>RECORD VENDOR<br />CREDITS</span>
                </div>

                {/* Split arrow */}
                <div className="flex flex-col items-center px-1">
                  <span className="text-[10px] text-gray-400">Mark as Open</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* 4a & 4b Split */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-[10px] font-semibold text-teal-800">
                    <FileText className="w-3 h-3 text-teal-600" />
                    <span>APPLY TO<br />FUTURE BILLS</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-[10px] font-semibold text-teal-800">
                    <DollarSign className="w-3 h-3 text-teal-600" />
                    <span>RECORD<br />REFUND</span>
                  </div>
                </div>
              </div>

              {/* Bullets */}
              <div className="text-left max-w-xl mx-auto space-y-3">
                <p className="text-xs font-semibold text-gray-800">
                  In the Vendor Credits module, you can:
                </p>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Record credits when you receive a credit note from your vendor.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Apply vendor credits to bill payments in the future.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Record refunds for your vendor credits.</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Credit Note#</th>
                  <th className="py-3 px-6">Vendor Name</th>
                  <th className="py-3 px-6">Order#</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Balance</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCredits.map((c) => (
                  <tr
                    key={c.id}
                    data-tl="row-vendor-credit-vc001"
                    onClick={() => handleRowClick(c)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-6 text-gray-600">{c.date}</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {c.creditNoteNumber}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{c.vendorName}</td>
                    <td className="py-3 px-6 text-gray-600">{c.orderNumber || "—"}</td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      GBP{c.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      GBP{c.balanceRemaining.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        type="button"
                        data-tl="btn-delete-vendor-credit-vc001"
                        onClick={(e) => handleDelete(e, c)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
