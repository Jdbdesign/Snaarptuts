"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type PaymentReceivedItem,
  INITIAL_PAYMENTS,
} from "./books-data";
import {
  ArrowLeft,
  Mail,
  Download,
  Eye,
  Edit2,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksPaymentDetailView({ tl }: Props) {
  const payment = useTimelineVar<PaymentReceivedItem>(
    tl,
    "booksActivePayment",
    INITIAL_PAYMENTS[1] // PAY-00002
  );

  const handleBack = () => {
    tl.setVar("booksView", "payments");
    tl.setUrl(BOOKS_URLS.paymentsReceived);
  };

  const handleSendReceipt = () => {
    tl.setVar("booksToastText", "Email has been scheduled to send.");
    tl.setVar("booksToastOpen", true);
  };

  const handleDownloadPdf = () => {
    tl.setVar("booksToastText", "Payment PDF downloaded successfully");
    tl.setVar("booksToastOpen", true);
  };

  const handlePreviewPdf = () => {
    tl.setVar("booksPaymentPdfPreviewOpen", true);
  };

  const handleEdit = () => {
    tl.setVar("booksView", "edit-payment");
    tl.setUrl(BOOKS_URLS.editPayment);
  };

  return (
    <div
      data-tl="books-payment-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-payments"
            onClick={handleBack}
            className="flex items-center gap-1 text-[#7014D9] hover:underline font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <span
            onClick={handleBack}
            className="cursor-pointer hover:text-gray-700"
          >
            Home
          </span>
          <span>&gt;</span>
          <span
            onClick={handleBack}
            className="cursor-pointer hover:text-gray-700"
          >
            Payments Received
          </span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Details</span>
        </div>

        {/* Top Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1
              data-tl="text-payment-title"
              className="text-2xl font-bold text-gray-900"
            >
              Payment {payment?.paymentNumber || "PAY-00002"}
            </h1>
            <span
              data-tl="chip-payment-status"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              {payment?.status || "Paid"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="btn-send-payment-receipt"
              onClick={handleSendReceipt}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Receipt</span>
            </button>

            <button
              type="button"
              data-tl="btn-download-payment-pdf"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-preview-payment-pdf"
              onClick={handlePreviewPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview PDF</span>
            </button>

            <button
              type="button"
              data-tl="btn-edit-payment"
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* 3 Detail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Payment Details */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Payment Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-400 font-medium">Customer</p>
                <p
                  data-tl="text-payment-customer"
                  className="font-semibold text-gray-900 mt-1"
                >
                  {payment?.customerName || "Harvest Tables Ltd"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Payment Date</p>
                <p
                  data-tl="text-payment-date"
                  className="font-medium text-gray-900 mt-1"
                >
                  {payment?.paymentDate || "10/21/2026"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Payment Mode</p>
                <p
                  data-tl="text-payment-mode"
                  className="font-medium text-gray-900 mt-1 uppercase"
                >
                  {payment?.paymentMode || "CASH"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Deposit To</p>
                <p
                  data-tl="text-payment-deposit-to"
                  className="font-medium text-gray-900 mt-1"
                >
                  {payment?.depositTo || "Petty Cash"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Reference#</p>
                <p
                  data-tl="text-payment-ref"
                  className="font-medium text-gray-900 mt-1"
                >
                  {payment?.reference || "PARTIAL-PAYMENT"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Tax Deducted</p>
                <p className="font-medium text-gray-900 mt-1">
                  {payment?.taxDeducted || "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Amount Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Amount
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Amount Received</span>
                <span
                  data-tl="text-payment-amount"
                  className="font-semibold text-gray-900"
                >
                  £{(payment?.amount ?? 20).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Net Deposit</span>
                <span
                  data-tl="text-payment-net-deposit"
                  className="font-bold text-[#2563EB] text-sm"
                >
                  £{(payment?.amount ?? 20).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Notes Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-2">
          <h2 className="text-sm font-bold text-gray-900">Notes</h2>
          <p
            data-tl="text-payment-notes"
            className="text-xs text-gray-600 italic leading-relaxed"
          >
            {payment?.notes || "Partial payment (sample record)"}
          </p>
        </div>
      </div>
    </div>
  );
}
