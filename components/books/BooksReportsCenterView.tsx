"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Search,
  PieChart,
  ShoppingCart,
  Users,
  CreditCard,
  Repeat,
  ShoppingBag,
  Receipt,
  BookOpen,
  Target,
  Coins,
  FileCheck2,
  Activity,
  Layers,
} from "lucide-react";
import { BOOKS_URLS, type BooksPage } from "./books-data";

export interface ReportItem {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  page?: BooksPage;
  url?: string;
}

export const ALL_REPORTS: ReportItem[] = [
  // Business Overview (4)
  { id: "profit-and-loss", name: "Profit and Loss", category: "Business Overview", categoryKey: "business-overview", page: "reports-profit-and-loss", url: BOOKS_URLS.profitAndLoss },
  { id: "balance-sheet", name: "Balance Sheet", category: "Business Overview", categoryKey: "business-overview", page: "reports-balance-sheet", url: BOOKS_URLS.balanceSheet },
  { id: "cash-flow-statement", name: "Cash Flow Statement", category: "Business Overview", categoryKey: "business-overview" },
  { id: "movement-of-equity", name: "Movement of Equity", category: "Business Overview", categoryKey: "business-overview" },

  // Sales (4)
  { id: "sales-by-customer", name: "Sales by Customer", category: "Sales", categoryKey: "sales", page: "reports-sales-by-customer", url: BOOKS_URLS.salesByCustomer },
  { id: "sales-by-item", name: "Sales by Item", category: "Sales", categoryKey: "sales" },
  { id: "sales-by-salesperson", name: "Sales by Salesperson", category: "Sales", categoryKey: "sales" },
  { id: "sales-summary", name: "Sales Summary", category: "Sales", categoryKey: "sales" },

  // Receivables (7)
  { id: "customer-balance-summary", name: "Customer Balance Summary", category: "Receivables", categoryKey: "receivables", page: "reports-customer-balance-summary", url: BOOKS_URLS.customerBalanceSummary },
  { id: "ar-aging-summary", name: "AR Aging Summary", category: "Receivables", categoryKey: "receivables" },
  { id: "ar-aging-details", name: "AR Aging Details", category: "Receivables", categoryKey: "receivables" },
  { id: "invoice-details", name: "Invoice Details", category: "Receivables", categoryKey: "receivables" },
  { id: "quote-details", name: "Quote Details", category: "Receivables", categoryKey: "receivables" },
  { id: "receivable-summary", name: "Receivable Summary", category: "Receivables", categoryKey: "receivables" },
  { id: "receivable-details", name: "Receivable Details", category: "Receivables", categoryKey: "receivables" },

  // Payments Received (4)
  { id: "payments-received", name: "Payments Received", category: "Payments Received", categoryKey: "payments-received" },
  { id: "time-to-get-paid", name: "Time to Get Paid", category: "Payments Received", categoryKey: "payments-received" },
  { id: "credit-note-details", name: "Credit Note Details", category: "Payments Received", categoryKey: "payments-received" },
  { id: "refund-history", name: "Refund History", category: "Payments Received", categoryKey: "payments-received" },

  // Recurring Invoices (1)
  { id: "recurring-invoice-details", name: "Recurring Invoice Details", category: "Recurring Invoices", categoryKey: "recurring-invoices", page: "reports-recurring-invoice-details", url: BOOKS_URLS.recurringInvoiceDetails },

  // Purchases and Expenses (7)
  { id: "purchases-by-vendor", name: "Purchases by Vendor", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "purchases-by-item", name: "Purchases by Item", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "expense-details", name: "Expense Details", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "expenses-by-category", name: "Expenses by Category", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "expenses-by-customer", name: "Expenses by Customer", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "expenses-by-employee", name: "Expenses by Employee", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },
  { id: "billable-expense-details", name: "Billable Expense Details", category: "Purchases and Expenses", categoryKey: "purchases-expenses" },

  // Payables (6)
  { id: "vendor-balance-summary", name: "Vendor Balance Summary", category: "Payables", categoryKey: "payables" },
  { id: "ap-aging-summary", name: "AP Aging Summary", category: "Payables", categoryKey: "payables" },
  { id: "ap-aging-details", name: "AP Aging Details", category: "Payables", categoryKey: "payables" },
  { id: "bill-details", name: "Bill Details", category: "Payables", categoryKey: "payables" },
  { id: "payments-made-details", name: "Payments Made Details", category: "Payables", categoryKey: "payables" },
  { id: "vendor-refund-history", name: "Vendor Refund History", category: "Payables", categoryKey: "payables" },

  // Accountant (7)
  { id: "trial-balance", name: "Trial Balance", category: "Accountant", categoryKey: "accountant", page: "reports-trial-balance", url: BOOKS_URLS.trialBalance },
  { id: "general-ledger", name: "General Ledger", category: "Accountant", categoryKey: "accountant" },
  { id: "detailed-general-ledger", name: "Detailed General Ledger", category: "Accountant", categoryKey: "accountant" },
  { id: "account-type-summary", name: "Account Type Summary", category: "Accountant", categoryKey: "accountant" },
  { id: "journal-report", name: "Journal Report", category: "Accountant", categoryKey: "accountant" },
  { id: "account-transactions", name: "Account Transactions", category: "Accountant", categoryKey: "accountant" },
  { id: "system-audit-trail", name: "System Audit Trail", category: "Accountant", categoryKey: "accountant" },

  // Budget (1)
  { id: "budget-vs-actuals", name: "Budget vs Actuals", category: "Budget", categoryKey: "budget", page: "reports-budget-vs-actuals", url: BOOKS_URLS.budgetVsActuals },

  // Currency (2)
  { id: "realized-gain-loss", name: "Realized Gain or Loss", category: "Currency", categoryKey: "currency", page: "reports-realized-gain-loss", url: BOOKS_URLS.realizedGainLoss },
  { id: "unrealized-gain-loss", name: "Unrealized Gain or Loss", category: "Currency", categoryKey: "currency" },

  // Taxes (1)
  { id: "tax-summary", name: "Tax Summary", category: "Taxes", categoryKey: "taxes", page: "reports-tax-summary", url: BOOKS_URLS.taxSummary },

  // Activity (4)
  { id: "system-audit", name: "System Audit", category: "Activity", categoryKey: "activity" },
  { id: "activity-logs", name: "Activity Logs", category: "Activity", categoryKey: "activity" },
  { id: "user-activity-log", name: "User Activity Log", category: "Activity", categoryKey: "activity" },
  { id: "api-usage-log", name: "API Usage Log", category: "Activity", categoryKey: "activity" },
];

export const CATEGORIES = [
  { key: "business-overview", name: "Business Overview", count: 4, icon: PieChart },
  { key: "sales", name: "Sales", count: 4, icon: ShoppingCart },
  { key: "receivables", name: "Receivables", count: 7, icon: Users },
  { key: "payments-received", name: "Payments Received", count: 4, icon: CreditCard },
  { key: "recurring-invoices", name: "Recurring Invoices", count: 1, icon: Repeat },
  { key: "purchases-expenses", name: "Purchases and Expenses", count: 7, icon: ShoppingBag },
  { key: "payables", name: "Payables", count: 6, icon: Receipt },
  { key: "accountant", name: "Accountant", count: 7, icon: BookOpen },
  { key: "budget", name: "Budget", count: 1, icon: Target },
  { key: "currency", name: "Currency", count: 2, icon: Coins },
  { key: "taxes", name: "Taxes", count: 1, icon: FileCheck2 },
  { key: "activity", name: "Activity", count: 4, icon: Activity },
];

interface Props {
  tl: Timeline;
}

export function BooksReportsCenterView({ tl }: Props) {
  const selectedCat = useTimelineVar<string>(tl, "booksReportsCategory", "all");
  const searchQuery = useTimelineVar<string>(tl, "booksReportsSearch", "");

  const handleSelectCat = (key: string) => {
    tl.setVar("booksReportsCategory", key);
  };

  const handleSearchChange = (val: string) => {
    tl.setVar("booksReportsSearch", val);
  };

  const handleOpenReport = (report: ReportItem) => {
    if (report.page && report.url) {
      tl.setVar("booksView", report.page);
      tl.setUrl(report.url);
    }
  };

  // Filter logic
  let filtered = ALL_REPORTS;
  if (selectedCat !== "all") {
    filtered = filtered.filter((r) => r.categoryKey === selectedCat);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }

  const currentCatObj = CATEGORIES.find((c) => c.key === selectedCat);
  const currentTitle =
    selectedCat === "all" ? "All Reports" : currentCatObj?.name ?? "Reports";
  const currentCount = filtered.length;

  return (
    <div
      data-tl="reports-center-container"
      className="flex h-full w-full bg-white select-none overflow-hidden"
    >
      {/* 1. Category Sidebar (2nd column) */}
      <aside
        data-tl="reports-category-sidebar"
        className="w-[200px] shrink-0 border-r border-[#EBECEF] bg-white flex flex-col py-4 px-3 overflow-y-auto no-scrollbar"
      >
        {/* All Reports pill */}
        <button
          type="button"
          data-tl="cat-all-reports"
          onClick={() => handleSelectCat("all")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors mb-3 ${
            selectedCat === "all"
              ? "bg-[#EFF6FF] text-[#1D4ED8]"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Layers className="w-4 h-4 text-[#1D4ED8] shrink-0" />
          <span>All Reports</span>
        </button>

        {/* Section title */}
        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-2">
          REPORT CATEGORY
        </div>

        {/* Categories list */}
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                data-tl={`cat-${cat.key}`}
                onClick={() => handleSelectCat(cat.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors text-left ${
                  isSelected
                    ? "bg-[#EFF6FF] text-[#1D4ED8] font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-normal"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isSelected ? "text-[#1D4ED8]" : "text-gray-400"
                  }`}
                />
                <span className="truncate">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white px-8 py-6">
        {/* Top Header */}
        <div className="mb-4">
          <h1
            data-tl="reports-center-title"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            Reports Center
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative mb-5 max-w-[680px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            data-tl="input-search-reports"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search reports"
            className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Section title & count badge */}
        <div className="flex items-center gap-2 mb-3">
          <h2
            data-tl="reports-current-category-title"
            className="text-sm font-bold text-gray-900"
          >
            {currentTitle}
          </h2>
          <span
            data-tl="reports-count-badge"
            className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-600"
          >
            {currentCount}
          </span>
        </div>

        {/* Reports Table in scroll container */}
        <div
          data-tl="reports-table-scroll"
          data-scroller="true"
          className="flex-1 overflow-y-auto no-scrollbar border border-gray-100 rounded-lg"
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFAFA] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">REPORT NAME</th>
                <th className="py-2.5 px-4 font-semibold w-[260px]">REPORT CATEGORY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium">
                    <button
                      type="button"
                      data-tl={`report-link-${report.id}`}
                      onClick={() => handleOpenReport(report)}
                      className="text-[#1D4ED8] hover:underline cursor-pointer text-left"
                    >
                      {report.name}
                    </button>
                  </td>
                  <td className="py-2.5 px-4 text-gray-500">
                    {report.category}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-gray-400 italic">
                    No reports match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
