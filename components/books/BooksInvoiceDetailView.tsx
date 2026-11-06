"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type InvoiceItem,
  type InvoiceStatus,
  type PaymentInstallment,
  INITIAL_INVOICES,
} from "./books-data";
import {
  Send,
  CheckCircle,
  Download,
  Eye,
  Trash2,
  Edit,
  Clock,
  Loader2,
  Calendar,
  Check,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksInvoiceDetailView({ tl }: Props) {
  const allInvoices = useTimelineVar<InvoiceItem[]>(
    tl,
    "booksInvoices",
    INITIAL_INVOICES
  );
  const activeInvoice = useTimelineVar<InvoiceItem>(
    tl,
    "booksActiveInvoice",
    allInvoices[1] || INITIAL_INVOICES[1]
  );
  const isSending = useTimelineVar<boolean>(tl, "booksInvoiceSending", false);
  const isPreparingPdf = useTimelineVar<boolean>(
    tl,
    "booksInvoicePreparingPdf",
    false
  );

  // Local or timeline payment plan editing state on details card (for step 63)
  const [detailPlanType, setDetailPlanType] = useState<"none" | "scheduled">(
    activeInvoice.paymentPlan?.type === "scheduled" ? "scheduled" : "none"
  );
  const [detailInstallments, setDetailInstallments] = useState<
    PaymentInstallment[]
  >(activeInvoice.paymentPlan?.installments || []);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-700";
      case "Sent":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Partially Paid":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "Paid":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Overdue":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const navToList = () => {
    tl.setVar("booksView", "invoices");
    tl.setUrl(BOOKS_URLS.invoices);
  };

  const handleSendInvoice = async () => {
    tl.setVar("booksInvoiceSending", true);
    await new Promise((r) => setTimeout(r, 800));
    const updatedInvoice: InvoiceItem = {
      ...activeInvoice,
      status: "Sent",
      deliveryPending: true,
    };
    tl.setVar("booksActiveInvoice", updatedInvoice);
    tl.setVar(
      "booksInvoices",
      allInvoices.map((inv) =>
        inv.id === activeInvoice.id ? updatedInvoice : inv
      )
    );
    tl.setVar("booksInvoiceSending", false);
    tl.setVar("booksToastText", "Invoice sent successfully.");
    tl.setVar("booksToastOpen", true);
  };

  const handleDownloadPdf = () => {
    tl.setVar("booksInvoicePreparingPdf", true);
    setTimeout(() => {
      tl.setVar("booksInvoicePreparingPdf", false);
      tl.setVar("booksToastText", "Invoice PDF downloaded");
      tl.setVar("booksToastOpen", true);
    }, 800);
  };

  const handleQuickSplit = (multiplier: number) => {
    const total = activeInvoice.total;
    const splitAmount = +(total / multiplier).toFixed(2);
    const installments: PaymentInstallment[] = Array.from(
      { length: multiplier },
      (_, idx) => {
        const d = new Date(2026, 10 + idx, 5); // starting Nov 2026
        const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        return {
          id: `inst-${idx + 1}`,
          label: idx === 0 ? "First" : idx === 1 ? "Second" : `Part ${idx + 1}`,
          dueDate: dateStr,
          amount:
            idx === multiplier - 1
              ? +(total - splitAmount * (multiplier - 1)).toFixed(2)
              : splitAmount,
        };
      }
    );
    setDetailInstallments(installments);
  };

  const handleSaveDetailPlan = () => {
    const updatedInvoice: InvoiceItem = {
      ...activeInvoice,
      paymentPlan: {
        type: "scheduled",
        installments: detailInstallments,
      },
    };
    tl.setVar("booksActiveInvoice", updatedInvoice);
    tl.setVar(
      "booksInvoices",
      allInvoices.map((inv) =>
        inv.id === activeInvoice.id ? updatedInvoice : inv
      )
    );
    tl.setVar("booksToastText", "Payment plan set");
    tl.setVar("booksToastOpen", true);
  };

  const planInstallments =
    detailInstallments.length > 0
      ? detailInstallments
      : activeInvoice.paymentPlan?.installments || [];
  const planSum = planInstallments.reduce((acc, it) => acc + it.amount, 0);

  return (
    <div
      data-tl="books-invoice-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-breadcrumb-back"
            onClick={navToList}
            className="hover:text-gray-900 cursor-pointer font-medium"
          >
            ← Back
          </button>
          <span>|</span>
          <button
            type="button"
            data-tl="breadcrumb-home"
            onClick={() => {
              tl.setVar("booksView", "home");
              tl.setUrl(BOOKS_URLS.dashboard);
            }}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Home
          </button>
          <span>&gt;</span>
          <button
            type="button"
            data-tl="breadcrumb-invoices"
            onClick={navToList}
            className="hover:text-[#7014D9] cursor-pointer"
          >
            Invoices
          </button>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Details</span>
        </div>

        {/* Title & Action Buttons Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              data-tl="invoice-detail-title"
              className="text-2xl font-bold text-gray-900"
            >
              Invoice {activeInvoice.invoiceNumber}
            </h1>
            <span
              data-tl="invoice-detail-status"
              className={`px-3 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                activeInvoice.status
              )}`}
            >
              {activeInvoice.status}
            </span>
            {activeInvoice.deliveryPending && (
              <span
                data-tl="badge-delivery-pending"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
              >
                <Clock className="w-3 h-3 text-blue-500" />
                Delivery pending
              </span>
            )}
            {isSending && (
              <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Sending...
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Send Invoice */}
            <button
              type="button"
              data-tl="btn-send-invoice"
              onClick={handleSendInvoice}
              disabled={isSending}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Send Invoice</span>
            </button>

            {/* Mark as Paid (hidden if already paid) */}
            {activeInvoice.status !== "Paid" && (
              <button
                type="button"
                data-tl="btn-mark-as-paid"
                onClick={() =>
                  tl.setVar("booksInvoiceMarkPaidDialogOpen", true)
                }
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark as Paid</span>
              </button>
            )}

            {/* Download PDF */}
            <button
              type="button"
              data-tl="btn-download-pdf"
              onClick={handleDownloadPdf}
              disabled={isPreparingPdf}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              {isPreparingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
              ) : (
                <Download className="w-3.5 h-3.5 text-gray-500" />
              )}
              <span>Download PDF</span>
            </button>

            {/* Preview PDF */}
            <button
              type="button"
              data-tl="btn-preview-pdf"
              onClick={() => tl.setVar("booksInvoicePdfPreviewOpen", true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Preview PDF</span>
            </button>

            {/* Edit */}
            <button
              type="button"
              data-tl="btn-edit-invoice"
              onClick={() => {
                tl.setVar("booksView", "edit-invoice");
                tl.setUrl(BOOKS_URLS.editInvoice);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5 text-gray-500" />
              <span>Edit</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              data-tl="btn-delete-invoice"
              onClick={() => tl.setVar("booksInvoiceConfirmDialogOpen", true)}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            {/* Back to Invoices Link */}
            <button
              type="button"
              data-tl="btn-back-to-invoices"
              onClick={navToList}
              className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer font-medium ml-1"
            >
              Back to Invoices
            </button>
          </div>
        </div>

        {/* Invoice Details Card */}
        <div
          data-tl="card-invoice-details"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Invoice Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-gray-500 block mb-1">Customer</span>
              <span
                data-tl="detail-customer-name"
                className="font-medium text-gray-900"
              >
                {activeInvoice.customerName}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Invoice Date</span>
              <span
                data-tl="detail-invoice-date"
                className="font-medium text-gray-900"
              >
                {activeInvoice.date}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Due Date</span>
              <span
                data-tl="detail-due-date"
                className="font-medium text-gray-900"
              >
                {activeInvoice.dueDate}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Payment Terms</span>
              <span
                data-tl="detail-payment-terms"
                className="font-medium text-gray-900"
              >
                {activeInvoice.terms || "Due on Receipt"}
              </span>
            </div>
            {activeInvoice.orderNumber && (
              <div>
                <span className="text-gray-500 block mb-1">Order Number</span>
                <span
                  data-tl="detail-order-number"
                  className="font-medium text-gray-900"
                >
                  {activeInvoice.orderNumber}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table Card */}
        <div
          data-tl="card-invoice-items"
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Items
          </h2>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Item Details</th>
                <th className="py-2.5 px-3 text-center">Quantity</th>
                <th className="py-2.5 px-3 text-right">Rate</th>
                <th className="py-2.5 px-3 text-center">Tax Rate</th>
                <th className="py-2.5 px-3 text-right">Tax Amount</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeInvoice.items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <td className="py-3 px-3 font-medium text-gray-900">
                    {it.name}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-700">
                    {it.quantity}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700">
                    {it.rate.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-500">
                    {it.tax || "-"}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-500">-</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-900">
                    {it.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotals & Grand Total Section */}
          <div className="mt-6 flex justify-end">
            <div className="w-72 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total</span>
                <span>{activeInvoice.subTotal.toFixed(2)}</span>
              </div>
              {activeInvoice.discountAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount ({activeInvoice.discountPercent}%)</span>
                  <span>-{activeInvoice.discountAmount.toFixed(2)}</span>
                </div>
              )}
              {activeInvoice.shipping > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Charges</span>
                  <span>{activeInvoice.shipping.toFixed(2)}</span>
                </div>
              )}
              {activeInvoice.adjustment !== 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Adjustment</span>
                  <span>{activeInvoice.adjustment.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#2563EB] pt-2 border-t border-gray-100">
                <span>Total (GBP)</span>
                <span data-tl="detail-total-amount">
                  {activeInvoice.total.toFixed(2)}
                </span>
              </div>

              {/* Amount Paid and Balance Due (if paid or partially paid) */}
              {(activeInvoice.status === "Paid" ||
                activeInvoice.amountPaid > 0) && (
                <>
                  <div className="flex justify-between text-xs font-semibold text-emerald-600 pt-1">
                    <span>Amount Paid</span>
                    <span data-tl="detail-amount-paid">
                      -GBP {activeInvoice.amountPaid.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-rose-600 pt-1 border-t border-gray-100">
                    <span>Balance Due</span>
                    <span data-tl="detail-balance-due">
                      GBP {activeInvoice.balanceDue.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Payment Plan Card */}
        <div
          data-tl="card-payment-plan"
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 text-xs"
        >
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Payment plan</h2>
            <p className="text-gray-500 mt-0.5">
              Let the customer pay this invoice in parts. Choose how it works —
              they can always pay any amount up to the balance; a schedule is
              just guidance.
            </p>
          </div>

          {/* Plan Choice Chips */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="chip-plan-none"
              onClick={() => {
                setDetailPlanType("none");
                setDetailInstallments([]);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                detailPlanType === "none"
                  ? "bg-purple-50 text-[#7014D9] border border-[#7014D9]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              None
            </button>
            <button
              type="button"
              data-tl="chip-plan-flexible"
              onClick={() => setDetailPlanType("none")}
              className="px-3 py-1.5 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent transition-colors cursor-pointer"
            >
              Flexible
            </button>
            <button
              type="button"
              data-tl="chip-plan-scheduled"
              onClick={() => {
                setDetailPlanType("scheduled");
                if (detailInstallments.length === 0) handleQuickSplit(2);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                detailPlanType === "scheduled"
                  ? "bg-purple-50 text-[#7014D9] border border-[#7014D9]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
              }`}
            >
              Scheduled
            </button>
          </div>

          {/* Scheduled Plan Controls */}
          {detailPlanType === "scheduled" && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">Quick split:</span>
                {[2, 3, 4, 6].map((m) => (
                  <button
                    key={m}
                    type="button"
                    data-tl={`chip-split-${m}x`}
                    onClick={() => handleQuickSplit(m)}
                    className="px-2.5 py-1 bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-700 rounded-md text-[11px] font-medium cursor-pointer"
                  >
                    {m}x
                  </button>
                ))}
              </div>

              {/* Installments Table */}
              <div className="space-y-2">
                {planInstallments.map((inst, idx) => (
                  <div
                    key={inst.id || idx}
                    data-tl={`installment-row-${idx + 1}`}
                    className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs"
                  >
                    <span className="w-5 text-gray-400 font-medium text-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      data-tl={`input-inst-label-${idx + 1}`}
                      placeholder="Label (optional)"
                      value={inst.label || ""}
                      onChange={(e) => {
                        const updated = [...planInstallments];
                        updated[idx].label = e.target.value;
                        setDetailInstallments(updated);
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-gray-200 rounded-md"
                    />
                    <div className="relative w-36">
                      <input
                        type="text"
                        data-tl={`input-inst-date-${idx + 1}`}
                        value={inst.dueDate}
                        onChange={(e) => {
                          const updated = [...planInstallments];
                          updated[idx].dueDate = e.target.value;
                          setDetailInstallments(updated);
                        }}
                        className="w-full pl-2.5 pr-7 py-1.5 bg-white border border-gray-200 rounded-md"
                      />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="w-24 text-right font-medium text-gray-900">
                      GBP {inst.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sum Status */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span
                  data-tl="plan-sum-check"
                  className="flex items-center gap-1.5 text-emerald-600 font-semibold"
                >
                  <Check className="w-4 h-4" />
                  Sum GBP {planSum.toFixed(2)} / {activeInvoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Create Plan Button */}
          <div className="pt-2">
            <button
              type="button"
              data-tl="btn-create-payment-plan"
              onClick={handleSaveDetailPlan}
              disabled={detailPlanType === "none"}
              className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B7] text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Create plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
