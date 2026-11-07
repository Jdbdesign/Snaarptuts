"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BOOKS_URLS, INITIAL_BILLS, type Bill } from "./books-data";
import {
  ArrowLeft,
  Home,
  ChevronRight,
  Send,
  Download,
  Eye,
  FileEdit,
  CreditCard,
  Clock,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksBillDetailView({ tl }: Props) {
  const bill = useTimelineVar<Bill>(tl, "booksActiveBill", INITIAL_BILLS[0]);
  const isSending = useTimelineVar<boolean>(tl, "booksBillSending", false);
  const [localSending, setLocalSending] = useState(false);

  const handleBack = () => {
    tl.setVar("booksView", "bills");
    tl.setUrl(BOOKS_URLS.bills);
  };

  const handleSend = () => {
    setLocalSending(true);
    tl.setVar("booksBillSending", true);
    setTimeout(() => {
      setLocalSending(false);
      tl.setVar("booksBillSending", false);
      tl.setVar("booksToastText", "Bill sent successfully");
      tl.setVar("booksToastOpen", true);
    }, 1200);
  };

  const handlePreviewPdf = () => {
    tl.setVar("booksBillPdfPreviewOpen", true);
  };

  const handleDownloadPdf = () => {
    tl.setVar("booksToastText", "Bill PDF downloaded");
    tl.setVar("booksToastOpen", true);
  };

  const handleDelete = () => {
    tl.setVar("booksBillToDeleteNumber", bill.billNumber);
    tl.setVar("booksBillToDeleteId", bill.id);
    tl.setVar("booksBillConfirmOpen", true);
  };

  const showSending = isSending || localSending;

  return (
    <div
      data-tl="books-bill-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-bills"
            onClick={handleBack}
            className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span>Bills</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-900 font-medium">Details</span>
          </div>
        </div>

        {/* Header Title & Actions */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {bill.billNumber}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Status:{" "}
              {bill.status === "Paid" ? (
                <span data-tl="badge-bill-status-paid" className="font-semibold text-green-600">
                  Paid
                </span>
              ) : bill.status === "PENDING_APPROVAL" ? (
                <span className="font-semibold text-gray-700">Pending Approval</span>
              ) : (
                <span className="font-semibold text-blue-600">Open</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showSending && (
              <div
                data-tl="chip-bill-sending"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </div>
            )}

            {bill.billNumber === "BILL-003" && (
              <button
                type="button"
                data-tl="btn-submit-for-approval"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Submit for Approval</span>
              </button>
            )}

            <button
              type="button"
              data-tl="btn-send-bill"
              onClick={handleSend}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Bill</span>
            </button>

            <button
              type="button"
              data-tl="btn-download-bill-pdf"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-preview-bill-pdf"
              onClick={handlePreviewPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-edit-bill"
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              data-tl="btn-record-bill-payment"
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>

            <button
              type="button"
              data-tl="btn-delete-bill-detail"
              onClick={handleDelete}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Approval Card (BILL-005) */}
        {bill.billNumber === "BILL-005" && (
          <div
            data-tl="card-bill-approval"
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-xs space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-bold text-gray-900 text-sm">Approval</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800">
                Awaiting approval (1 of 2)
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                  <span className="font-medium">1. Jordan Lee</span>
                </div>
                <span className="text-gray-500">Awaiting</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>2. Casey Brown</span>
                </div>
                <span className="text-gray-500">Queued</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 text-right">
              <span className="text-[11px] text-gray-500 hover:text-gray-700 cursor-pointer">
                Withdraw &amp; change approvers
              </span>
            </div>
          </div>
        )}

        {/* Overdue Banner (BILL-003) */}
        {bill.isOverdue && (
          <div
            data-tl="banner-bill-overdue"
            className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex items-center justify-between text-xs"
          >
            <div className="text-gray-700">
              <span className="font-bold text-blue-900 tracking-wide mr-2">
                WHAT&apos;S NEXT?
              </span>
              <span>Payment for this bill is overdue. You can record the payment for this bill if paid.</span>
            </div>
            <button
              type="button"
              data-tl="btn-banner-record-payment"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium cursor-pointer shadow-sm transition-colors"
            >
              Record Payment
            </button>
          </div>
        )}

        {/* Bill Document View */}
        <div className="relative border border-gray-200 rounded-xl p-8 bg-white shadow-sm overflow-hidden">
          {/* Overdue Ribbon */}
          {bill.isOverdue && (
            <div
              data-tl="ribbon-bill-overdue"
              className="absolute top-4 left-4 bg-orange-600 text-white font-bold text-[11px] px-3 py-1 rounded shadow-md uppercase tracking-wider"
            >
              OVERDUE
            </div>
          )}

          <div className="flex justify-between items-start pt-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mt-4">
                {bill.vendorName}
              </h2>
            </div>
            <div className="text-right space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">BILL</h3>
              <p className="text-xs text-gray-500">Bill# {bill.billNumber}</p>
              <div className="pt-2">
                <span className="text-xs text-gray-400 block">Balance Due</span>
                {bill.status === "Paid" ? (
                  <span
                    data-tl="text-balance-due-zero"
                    className="text-lg font-bold text-gray-900"
                  >
                    GBP0.00
                  </span>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    GBP{bill.balanceDue.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Row */}
          <div className="flex justify-end text-xs text-gray-500 space-y-1 mt-4">
            <div className="text-right space-y-1">
              <p>Order Number : {bill.orderNumber || "2"}</p>
              <p>Bill Date : {bill.date}</p>
              <p>Due Date : {bill.dueDate}</p>
              <p>Terms : {bill.terms || "Due on Receipt"}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-8 border border-gray-200 rounded-sm overflow-hidden text-xs">
            <div className="bg-[#1E3A8A] text-white grid grid-cols-12 py-2.5 px-4 font-semibold text-[11px]">
              <div className="col-span-1">#</div>
              <div className="col-span-6">Item &amp; Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-1 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="divide-y divide-gray-100">
              {(bill.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 py-3 px-4 text-gray-700 hover:bg-gray-50/50"
                >
                  <div className="col-span-1 text-gray-400">{idx + 1}</div>
                  <div className="col-span-6 font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="col-span-2 text-right">
                    {item.quantity.toFixed(2)}
                  </div>
                  <div className="col-span-1 text-right">
                    {item.rate.toFixed(2)}
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {item.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-6 text-xs">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span>{bill.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total</span>
                <span>GBP{bill.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 text-sm">
                <span>Balance Due</span>
                {bill.status === "Paid" ? (
                  <span>GBP0.00</span>
                ) : (
                  <span>GBP{bill.balanceDue.toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Journal Section */}
        <div data-tl="section-bill-journal" className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-gray-900">Journal</h3>
            <span className="text-xs text-gray-500">
              Amount is displayed in your base currency{" "}
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-600 text-white">
                GBP
              </span>
            </span>
          </div>

          <p className="text-xs font-semibold text-gray-800">Bill</p>

          <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-gray-50 grid grid-cols-12 py-2.5 px-4 font-semibold text-gray-600 border-b border-gray-200">
              <div className="col-span-8">Account</div>
              <div className="col-span-2 text-right">Debit</div>
              <div className="col-span-2 text-right">Credit</div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="grid grid-cols-12 py-2.5 px-4 text-gray-700">
                <div className="col-span-8">Expense Account</div>
                <div className="col-span-2 text-right">{bill.total.toFixed(2)}</div>
                <div className="col-span-2 text-right">0.00</div>
              </div>
              <div className="grid grid-cols-12 py-2.5 px-4 text-gray-700">
                <div className="col-span-8">Accounts Payable</div>
                <div className="col-span-2 text-right">0.00</div>
                <div className="col-span-2 text-right">{bill.total.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-12 py-2.5 px-4 font-bold text-gray-900 bg-gray-50/50">
                <div className="col-span-8">Total</div>
                <div className="col-span-2 text-right">{bill.total.toFixed(2)}</div>
                <div className="col-span-2 text-right">{bill.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
