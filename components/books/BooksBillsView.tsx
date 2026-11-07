"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_BILLS, type Bill } from "./books-data";
import {
  ChevronDown,
  Plus,
  Search,
  List,
  Calendar as CalendarIcon,
  Trash2,
  Star,
  PlusCircle,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksBillsView({ tl }: Props) {
  const bills = useTimelineVar<Bill[]>(tl, "booksBills", INITIAL_BILLS);
  const activeViewMode = useTimelineVar<"list" | "calendar">(
    tl,
    "booksBillViewMode",
    "list"
  );
  const calendarMonth = useTimelineVar<"Oct 2026" | "Nov 2026">(
    tl,
    "booksBillCalendarMonth",
    "Nov 2026"
  );
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksBillStatusFilter",
    "Status"
  );
  const allBillsView = useTimelineVar<string>(
    tl,
    "booksAllBillsView",
    "All"
  );

  const [search, setSearch] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [allBillsDropdownOpen, setAllBillsDropdownOpen] = useState(false);

  const handleRowClick = (bill: Bill) => {
    tl.setVar("booksActiveBill", bill);
    tl.setVar("booksView", "bill-detail");
    tl.setUrl(BOOKS_URLS.billDetails);
  };

  const handleNew = () => {
    tl.setVar("booksView", "new-bill");
    tl.setUrl(BOOKS_URLS.newBill);
  };

  const handleDelete = (e: React.MouseEvent, bill: Bill) => {
    e.stopPropagation();
    tl.setVar("booksBillToDeleteNumber", bill.billNumber);
    tl.setVar("booksBillToDeleteId", bill.id);
    tl.setVar("booksBillConfirmOpen", true);
  };

  // Filter bills
  const filtered = bills.filter((b) => {
    // Search
    const matchesSearch =
      b.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.vendorName.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    // Status filter
    if (statusFilter !== "Status") {
      if (statusFilter === "Paid" && b.status !== "Paid") return false;
      if (statusFilter === "Open" && b.status !== "Open") return false;
      if (statusFilter === "Draft" && b.status !== "Draft") return false;
      if (statusFilter === "Overdue" && !b.isOverdue) return false;
    }

    // All Bills View dropdown filter
    if (allBillsView === "Overdue" && !b.isOverdue) return false;
    if (allBillsView === "Open" && b.status !== "Open") return false;
    if (allBillsView === "Paid" && b.status !== "Paid") return false;

    return true;
  });

  return (
    <div
      data-tl="books-bills-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              type="button"
              data-tl="dropdown-all-bills"
              onClick={() => setAllBillsDropdownOpen(!allBillsDropdownOpen)}
              className="flex items-center gap-1.5 text-xl font-bold text-gray-900 cursor-pointer"
            >
              <span>{allBillsView === "All" ? "All Bills" : allBillsView}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {allBillsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1.5 text-xs">
                {[
                  { id: "all", label: "All" },
                  { id: "draft", label: "Draft" },
                  { id: "open", label: "Open" },
                  { id: "overdue", label: "Overdue" },
                  { id: "partially-paid", label: "Partially Paid" },
                  { id: "paid", label: "Paid" },
                  { id: "void", label: "Void" },
                ].map((v) => (
                  <div
                    key={v.id}
                    data-tl={`opt-view-${v.id}`}
                    onClick={() => {
                      tl.setVar("booksAllBillsView", v.label);
                      setAllBillsDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                      allBillsView === v.label ? "bg-purple-50 text-[#7014D9] font-medium" : "text-gray-700"
                    }`}
                  >
                    <span>{v.label}</span>
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                ))}
                <div className="border-t border-gray-100 my-1 pt-1">
                  <div className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 cursor-pointer font-medium">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New View</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* View Switchers */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <button
                type="button"
                data-tl="btn-view-list"
                onClick={() => tl.setVar("booksBillViewMode", "list")}
                className={`p-2 cursor-pointer transition-colors ${
                  activeViewMode === "list"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-tl="btn-view-calendar"
                onClick={() => tl.setVar("booksBillViewMode", "calendar")}
                className={`p-2 cursor-pointer transition-colors ${
                  activeViewMode === "calendar"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="Calendar View"
              >
                <CalendarIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              data-tl="btn-new-bill"
              onClick={handleNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>
          </div>
        </div>

        {activeViewMode === "list" ? (
          <>
            {/* Filter Bar */}
            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  data-tl="input-bills-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in Bills..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Status Select */}
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-bills-status-filter"
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs bg-white text-gray-700 hover:border-gray-300 cursor-pointer"
                >
                  <span>{statusFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {statusDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                    {[
                      { id: "all", label: "Status" },
                      { id: "draft", label: "Draft" },
                      { id: "open", label: "Open" },
                      { id: "overdue", label: "Overdue" },
                      { id: "partially-paid", label: "Partially Paid" },
                      { id: "paid", label: "Paid" },
                      { id: "void", label: "Void" },
                    ].map((s) => (
                      <div
                        key={s.id}
                        data-tl={`opt-status-${s.id}`}
                        onClick={() => {
                          tl.setVar("booksBillStatusFilter", s.label);
                          setStatusDropdownOpen(false);
                        }}
                        className={`px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer ${
                          statusFilter === s.label
                            ? "bg-blue-600 text-white font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBFD] text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-6">Bill#</th>
                    <th className="py-3 px-6">Vendor Name</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Due Date</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Balance Due</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  {filtered.map((bill) => (
                    <tr
                      key={bill.id}
                      data-tl={`bill-row-${bill.billNumber}`}
                      onClick={() => handleRowClick(bill)}
                      className="hover:bg-gray-50/70 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {bill.billNumber}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {bill.vendorName}
                      </td>
                      <td className="py-4 px-6 text-gray-500">{bill.date}</td>
                      <td className="py-4 px-6 text-gray-500">{bill.dueDate}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        GBP{bill.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        {bill.status === "PENDING_APPROVAL" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-gray-100 text-gray-600">
                            PENDING_APPROVAL
                          </span>
                        ) : bill.status === "Paid" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                            Paid
                          </span>
                        ) : bill.status === "Open" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                            {bill.status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        GBP{bill.balanceDue.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          data-tl={`btn-delete-bill-${bill.billNumber}`}
                          onClick={(e) => handleDelete(e, bill)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Calendar View ("Bills Summary") */
          <div data-tl="bills-calendar-view" className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Bills Summary
              </h2>
            </div>

            {/* Month Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-medium text-gray-500">
              {["Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026", "Jan 2027"].map(
                (m) => (
                  <button
                    key={m}
                    type="button"
                    data-tl={`tab-calendar-${m.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() =>
                      tl.setVar(
                        "booksBillCalendarMonth",
                        m as "Oct 2026" | "Nov 2026"
                      )
                    }
                    className={`pb-3 -mb-px cursor-pointer transition-colors ${
                      calendarMonth === m
                        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                        : "hover:text-gray-800"
                    }`}
                  >
                    {m}
                  </button>
                )
              )}
            </div>

            {/* Calendar Grid */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 py-2.5">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {calendarMonth === "Nov 2026" ? (
                <div className="grid grid-cols-7 grid-rows-5 text-xs divide-x divide-y divide-gray-100 min-h-[460px]">
                  {/* Nov 1-7 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">1 Nov</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">2</span></div>
                  <div className="p-2 min-h-[90px]">
                    <span className="text-gray-500 font-medium">3</span>
                    <div className="mt-2 text-red-500 font-semibold text-[11px]">
                      GBP43.20
                    </div>
                  </div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">4</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">5</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">6</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-blue-600 font-bold">7</span></div>

                  {/* Nov 8-14 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">8</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">9</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">10</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">11</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">12</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">13</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">14</span></div>

                  {/* Nov 15-21 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">15</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">16</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">17</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">18</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">19</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">20</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">21</span></div>

                  {/* Nov 22-28 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">22</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">23</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">24</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">25</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">26</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">27</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">28</span></div>

                  {/* Nov 29-30 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">29</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">30</span></div>
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                </div>
              ) : (
                /* Oct 2026 */
                <div className="grid grid-cols-7 grid-rows-5 text-xs divide-x divide-y divide-gray-100 min-h-[460px]">
                  {/* Oct 1-3 */}
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px] bg-gray-50/50" />
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">1 Oct</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">2</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">3</span></div>

                  {/* Oct 4-10 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">4</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">5</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">6</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">7</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">8</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">9</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">10</span></div>

                  {/* Oct 11-17 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">11</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">12</span></div>
                  <div className="p-2 min-h-[90px]">
                    <span className="text-gray-500 font-medium">13</span>
                    <div className="mt-2 text-green-600 font-semibold text-[11px]">
                      GBP200.00
                    </div>
                  </div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">14</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">15</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">16</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">17</span></div>

                  {/* Oct 18-24 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">18</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">19</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">20</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">21</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">22</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">23</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">24</span></div>

                  {/* Oct 25-31 */}
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">25</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">26</span></div>
                  <div className="p-2 min-h-[90px]">
                    <span className="text-gray-500 font-medium">27</span>
                    <div className="mt-1 text-red-500 font-semibold text-[11px]">
                      GBP43.20
                    </div>
                    <div className="text-red-500 font-semibold text-[11px]">
                      GBP72.00
                    </div>
                  </div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">28</span></div>
                  <div className="p-2 min-h-[90px]">
                    <span className="text-gray-500 font-medium">29</span>
                    <div className="mt-1 text-red-500 font-semibold text-[11px]">
                      GBP36.00
                    </div>
                  </div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">30</span></div>
                  <div className="p-2 min-h-[90px]"><span className="text-gray-500 font-medium">31</span></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
