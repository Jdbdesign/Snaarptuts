"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ProductLogo } from "@/components/icons";
import {
  Home,
  Box,
  ShieldCheck,
  ShoppingCart,
  ShoppingBag,
  Landmark,
  BookOpen,
  FileText,
  BarChart3,
  Files,
  Bug,
  Settings,
  Search,
  UserPlus,
  Wrench,
  Grid,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { BOOKS_URLS } from "./books-data";
import { BooksSortDrawer } from "./BooksSortDrawer";
import { BooksColumnsDrawer } from "./BooksColumnsDrawer";
import { BooksImportDrawer } from "./BooksImportDrawer";
import { BooksExportDrawer } from "./BooksExportDrawer";
import { BooksCsvPickerModal } from "./BooksCsvPickerModal";
import { BooksImagePickerModal } from "./BooksImagePickerModal";
import { BooksConfirmDialog } from "./BooksConfirmDialog";
import { BooksCustomerImportDrawer } from "./BooksCustomerImportDrawer";
import { BooksCustomerCsvPickerModal } from "./BooksCustomerCsvPickerModal";
import { BooksCustomerConfirmDialog } from "./BooksCustomerConfirmDialog";
import { BooksQuoteNumberingDialog } from "./BooksQuoteNumberingDialog";
import { BooksQuoteScanDialog } from "./BooksQuoteScanDialog";
import { BooksQuoteBulkItemsDialog } from "./BooksQuoteBulkItemsDialog";
import { BooksQuotePdfPreviewModal } from "./BooksQuotePdfPreviewModal";
import { BooksQuoteConfirmDialog } from "./BooksQuoteConfirmDialog";
import { BooksQuoteFilePickerModal } from "./BooksQuoteFilePickerModal";
import { BooksInvoiceNumberingDialog } from "./BooksInvoiceNumberingDialog";
import { BooksInvoiceScanDialog } from "./BooksInvoiceScanDialog";
import { BooksInvoiceBulkItemsDialog } from "./BooksInvoiceBulkItemsDialog";
import { BooksInvoicePdfPreviewModal } from "./BooksInvoicePdfPreviewModal";
import { BooksInvoiceConfirmDialog } from "./BooksInvoiceConfirmDialog";
import { BooksInvoiceMarkPaidDialog } from "./BooksInvoiceMarkPaidDialog";
import { BooksInvoiceFilePickerModal } from "./BooksInvoiceFilePickerModal";
import { BooksInvoiceImportDrawer } from "./BooksInvoiceImportDrawer";
import { BooksInvoiceCsvPickerModal } from "./BooksInvoiceCsvPickerModal";
import { BooksReceiptNumberingDialog } from "./BooksReceiptNumberingDialog";
import { BooksReceiptScanDialog } from "./BooksReceiptScanDialog";
import { BooksReceiptBulkItemsDialog } from "./BooksReceiptBulkItemsDialog";
import { BooksReceiptPdfPreviewModal } from "./BooksReceiptPdfPreviewModal";
import { BooksReceiptConfirmDialog } from "./BooksReceiptConfirmDialog";
import { BooksReceiptFilePickerModal } from "./BooksReceiptFilePickerModal";
import { BooksRecurringPreferencesDialog } from "./BooksRecurringPreferencesDialog";
import { BooksRecurringBulkItemsDialog } from "./BooksRecurringBulkItemsDialog";
import { BooksRecurringConfirmDialog } from "./BooksRecurringConfirmDialog";
import { BooksToast } from "./BooksToast";

type Props = {
  tl: Timeline;
  children: ReactNode;
  overlay?: ReactNode;
};

export function BooksShell({ tl, children, overlay }: Props) {
  const currentView = useTimelineVar<string>(tl, "booksView", "home");
  const searchQuery = useTimelineVar<string>(tl, "booksTopSearchQuery", "");

  const handleNavClick = (view: "home" | "products") => {
    tl.setVar("booksView", view);
    if (view === "home") {
      tl.setUrl(BOOKS_URLS.dashboard);
    } else {
      tl.setUrl(BOOKS_URLS.products);
    }
  };

  const isHomeActive = currentView === "home";
  const isProductsActive =
    currentView === "products" ||
    currentView === "new-item" ||
    currentView === "item-detail";
  const isCustomerView =
    currentView === "customers" ||
    currentView === "new-customer" ||
    currentView === "customer-detail";
  const isQuotesView =
    currentView === "quotes" ||
    currentView === "new-quote" ||
    currentView === "quote-detail" ||
    currentView === "edit-quote";
  const isInvoicesView =
    currentView === "invoices" ||
    currentView === "new-invoice" ||
    currentView === "invoice-detail" ||
    currentView === "edit-invoice";
  const isReceiptsView =
    currentView === "receipts" ||
    currentView === "new-receipt" ||
    currentView === "receipt-detail" ||
    currentView === "edit-receipt";
  const isRecurringView =
    currentView === "recurring" ||
    currentView === "new-recurring" ||
    currentView === "recurring-detail" ||
    currentView === "edit-recurring";
  const salesExpanded = useTimelineVar<boolean>(
    tl,
    "booksSalesExpanded",
    isCustomerView || isQuotesView || isInvoicesView || isReceiptsView || isRecurringView
  );

  return (
    <div
      data-tl="books-shell"
      data-scroller
      className="relative flex h-full w-full overflow-hidden bg-white text-[#111827] font-['Poppins',sans-serif]"
    >
      {/* 1. Thin Suite Rail (Far Left) */}
      <aside
        data-tl="suite-left-rail"
        className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-[#EBECEF] bg-white py-2 select-none z-30"
      >
        {/* Top Hamburger */}
        <button
          type="button"
          data-tl="btn-suite-hamburger"
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          title="Menu"
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        {/* Suite app icons */}
        <div className="flex flex-1 flex-col items-center gap-1.5 overflow-y-auto no-scrollbar w-full px-1">
          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Mail"
          >
            <ProductLogo name="mail" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Mail
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Meets"
          >
            <ProductLogo name="meet" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Meets
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Teams"
          >
            <ProductLogo name="teams" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Teams
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="One Cardx"
          >
            <ProductLogo name="onecard" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90 truncate max-w-[50px]">
              One Cardx
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Sheets"
          >
            <ProductLogo name="sheet" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Sheets
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Docs"
          >
            <ProductLogo name="docs" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Docs
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Slides"
          >
            <ProductLogo name="presentation" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Slides
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="PDF"
          >
            <ProductLogo name="pdf" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              PDF
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Lock"
          >
            <ProductLogo name="lock" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Lock
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Sign"
          >
            <ProductLogo name="sign" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Sign
            </span>
          </div>

          <div
            className="flex flex-col items-center p-1 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer"
            title="Drive"
          >
            <ProductLogo name="drive" size={20} />
            <span className="text-[9px] text-[#6B7280] mt-0.5 scale-90">
              Drive
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Left Subnav Menu */}
      <aside
        data-tl="books-left-nav"
        className="flex h-full w-[220px] shrink-0 flex-col border-r border-[#EBECEF] bg-[#FAFAFA] select-none z-20"
      >
        {/* Navigation list */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          <button
            data-tl="nav-books-home"
            onClick={() => handleNavClick("home")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isHomeActive
                ? "bg-[#EDE9FE] text-[#7C3AED] font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Home</span>
          </button>

          <button
            data-tl="nav-books-products"
            onClick={() => handleNavClick("products")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isProductsActive
                ? "bg-[#EDE9FE] text-[#7C3AED] font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Box className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Products</span>
          </button>

          <button
            data-tl="nav-books-approvals"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="whitespace-nowrap">Approvals</span>
          </button>

          <div className="space-y-0.5">
            <button
              type="button"
              data-tl="nav-books-sales"
              onClick={() => tl.setVar("booksSalesExpanded", !salesExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                salesExpanded || isCustomerView || isQuotesView
                  ? "bg-[#F4EBFF] text-[#7014D9] font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Sales</span>
              </div>
              {salesExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#7014D9] shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              )}
            </button>

            {salesExpanded && (
              <div className="pl-4 pr-1 py-0.5 space-y-0.5">
                <button
                  type="button"
                  data-tl="nav-sales-customers"
                  onClick={() => {
                    tl.setVar("booksView", "customers");
                    tl.setUrl(BOOKS_URLS.customers);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isCustomerView
                      ? "bg-[#F9F5FF] text-[#7014D9] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="whitespace-nowrap">Customers</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-quotes"
                  onClick={() => {
                    tl.setVar("booksView", "quotes");
                    tl.setUrl(BOOKS_URLS.quotes);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isQuotesView
                      ? "bg-[#F9F5FF] text-[#7014D9] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="whitespace-nowrap">Quotes</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-invoices"
                  onClick={() => {
                    tl.setVar("booksView", "invoices");
                    tl.setUrl(BOOKS_URLS.invoices);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isInvoicesView
                      ? "bg-[#F9F5FF] text-[#7014D9] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="whitespace-nowrap">Invoices</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-receipts"
                  onClick={() => {
                    tl.setVar("booksView", "receipts");
                    tl.setUrl(BOOKS_URLS.salesReceipts);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isReceiptsView
                      ? "bg-[#F9F5FF] text-[#7014D9] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="whitespace-nowrap">Sales Receipts</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-recurring"
                  onClick={() => {
                    tl.setVar("booksView", "recurring");
                    tl.setUrl(BOOKS_URLS.recurringInvoices);
                  }}
                  className={`w-full flex items-center px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isRecurringView
                      ? "bg-[#F9F5FF] text-[#7014D9] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="whitespace-nowrap">Recurring Invoices</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-payments"
                  className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="whitespace-nowrap">Payments Received</span>
                </button>
                <button
                  type="button"
                  data-tl="nav-sales-credit-notes"
                  className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="whitespace-nowrap">Credit Notes</span>
                </button>
              </div>
            )}
          </div>

          <button
            data-tl="nav-books-purchases"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <ShoppingBag className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="whitespace-nowrap">Purchases</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          <button
            data-tl="nav-books-banking"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Landmark className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="whitespace-nowrap">Banking</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          <button
            data-tl="nav-books-accountant"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="whitespace-nowrap">Accountant</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          <button
            data-tl="nav-books-filing"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="whitespace-nowrap">Filing & Compliance</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          <button
            data-tl="nav-books-reports"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="whitespace-nowrap">Reports</span>
          </button>

          <button
            data-tl="nav-books-documents"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Files className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="whitespace-nowrap">Documents</span>
          </button>
        </div>

        {/* Bottom utility links */}
        <div className="p-3 border-t border-gray-200 space-y-1">
          <button
            data-tl="nav-books-bug"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Report a Bug</span>
          </button>
          <button
            data-tl="nav-books-admin"
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#7C3AED] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Column (Header + Content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header
          data-tl="books-header"
          className="h-14 border-b border-[#EBECEF] bg-white flex items-center justify-between px-6 shrink-0 z-10"
        >
          {/* Logo & Product Title */}
          <div className="flex items-center gap-2.5">
            <ProductLogo name="books" size={26} />
            <span className="font-bold text-gray-900 text-base">
              Snaarp Books
            </span>
          </div>

          {/* Center search input */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                data-tl="books-search-input"
                type="text"
                placeholder="Search... ( / )"
                value={searchQuery}
                onChange={(e) =>
                  tl.setVar("booksTopSearchQuery", e.target.value)
                }
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right actions & user profile */}
          <div className="flex items-center gap-3">
            <button
              data-tl="btn-add-users"
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              title="Add Users"
            >
              <UserPlus className="w-4 h-4 text-gray-500" />
              <span className="hidden sm:inline">Add Users</span>
            </button>

            <button
              data-tl="btn-tools"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              title="Tools"
            >
              <Wrench className="w-4 h-4" />
            </button>

            <button
              data-tl="btn-apps-grid"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              title="Apps"
            >
              <Grid className="w-4 h-4" />
            </button>

            <div
              data-tl="user-avatar"
              className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-semibold text-xs shadow-sm cursor-pointer select-none"
              title="Sam Taylor"
            >
              S
            </div>
          </div>
        </header>

        {/* View body */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </main>
      </div>

      {/* Drawers & Modals */}
      <BooksSortDrawer tl={tl} />
      <BooksColumnsDrawer tl={tl} />
      <BooksImportDrawer tl={tl} />
      <BooksExportDrawer tl={tl} />
      <BooksCsvPickerModal tl={tl} />
      <BooksImagePickerModal tl={tl} />
      <BooksConfirmDialog tl={tl} />
      <BooksCustomerImportDrawer tl={tl} />
      <BooksCustomerCsvPickerModal tl={tl} />
      <BooksCustomerConfirmDialog tl={tl} />
      <BooksQuoteNumberingDialog tl={tl} />
      <BooksQuoteScanDialog tl={tl} />
      <BooksQuoteBulkItemsDialog tl={tl} />
      <BooksQuotePdfPreviewModal tl={tl} />
      <BooksQuoteConfirmDialog tl={tl} />
      <BooksQuoteFilePickerModal tl={tl} />
      <BooksInvoiceNumberingDialog tl={tl} />
      <BooksInvoiceScanDialog tl={tl} />
      <BooksInvoiceBulkItemsDialog tl={tl} />
      <BooksInvoicePdfPreviewModal tl={tl} />
      <BooksInvoiceConfirmDialog tl={tl} />
      <BooksInvoiceMarkPaidDialog tl={tl} />
      <BooksInvoiceFilePickerModal tl={tl} />
      <BooksInvoiceImportDrawer tl={tl} />
      <BooksInvoiceCsvPickerModal tl={tl} />
      <BooksReceiptNumberingDialog tl={tl} />
      <BooksReceiptScanDialog tl={tl} />
      <BooksReceiptBulkItemsDialog tl={tl} />
      <BooksReceiptPdfPreviewModal tl={tl} />
      <BooksReceiptConfirmDialog tl={tl} />
      <BooksReceiptFilePickerModal tl={tl} />
      <BooksRecurringPreferencesDialog tl={tl} />
      <BooksRecurringBulkItemsDialog tl={tl} />
      <BooksRecurringConfirmDialog tl={tl} />
      <BooksToast tl={tl} />

      {/* Optional fade overlay */}
      {overlay}
    </div>
  );
}
