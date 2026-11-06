"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type InvoiceItem,
  type InvoiceLineItem,
  INITIAL_INVOICES,
} from "./books-data";
import { Trash2, Home, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditInvoiceView({ tl }: Props) {
  const invoice = useTimelineVar<InvoiceItem>(
    tl,
    "booksActiveInvoice",
    INITIAL_INVOICES[3] // INV10006
  );

  // Line items state
  const [items, setItems] = useState<InvoiceLineItem[]>(invoice.items || [
    {
      id: "inv-edit-item-1",
      name: "Reusable Tote Bag",
      quantity: 4,
      rate: 21.0,
      tax: "-",
      amount: 84.0,
    },
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(
    invoice.discountPercent || 0
  );
  const [shipping, setShipping] = useState<number>(invoice.shipping || 0);
  const [adjustment, setAdjustment] = useState<number>(invoice.adjustment || 0);
  const [customerNotes, setCustomerNotes] = useState<string>(
    invoice.customerNotes || "Thank you for your business."
  );
  const [terms, setTerms] = useState<string>(
    invoice.termsAndConditions ||
      "Payment due within 30 days. Late payments may incur a 2% monthly fee."
  );
  const [orderNumber, setOrderNumber] = useState<string>(
    invoice.orderNumber || "PO-4471"
  );
  const [salesperson, setSalesperson] = useState<string>(
    invoice.salesperson || "Sam Taylor"
  );
  const [subject, setSubject] = useState<string>(
    invoice.subject || "Office supplies batch 4"
  );

  // Calculations
  const subTotal = items.reduce((acc, it) => acc + it.amount, 0);
  const discountAmount = subTotal * (discountPercent / 100);
  const total = subTotal - discountAmount + shipping + adjustment;

  const handleAddItem = () => {
    // Adds Delivery Fee as requested in Step 62
    const newItem: InvoiceLineItem = {
      id: "edit-delivery-fee",
      name: "Delivery Fee",
      quantity: 1,
      rate: 10.0,
      tax: "-",
      amount: 10.0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveChanges = () => {
    const updatedInvoice: InvoiceItem = {
      ...invoice,
      orderNumber,
      salesperson,
      subject,
      items,
      subTotal,
      discountPercent,
      discountAmount,
      shipping,
      adjustment,
      total,
      balanceDue: total - (invoice.amountPaid || 0),
      customerNotes,
      termsAndConditions: terms,
    };

    tl.setVar("booksActiveInvoice", updatedInvoice);
    tl.setVar("booksToastText", "Invoice updated successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "invoice-detail");
    tl.setUrl(BOOKS_URLS.invoiceDetails);
  };

  const handleCancel = () => {
    tl.setVar("booksView", "invoice-detail");
    tl.setUrl(BOOKS_URLS.invoiceDetails);
  };

  return (
    <div
      data-tl="books-edit-invoice-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="edit-invoice-breadcrumb"
            onClick={handleCancel}
            className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Invoices</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Edit Invoice</span>
          <span>/</span>
          <span className="text-gray-600 font-medium">{invoice.invoiceNumber}</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1
            data-tl="edit-invoice-title"
            className="text-2xl font-bold text-gray-900"
          >
            Edit Invoice — {invoice.invoiceNumber}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-cancel-edit-invoice"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-save-invoice-changes"
              onClick={handleSaveChanges}
              className="px-5 py-2 bg-[#7014D9] hover:bg-[#5b0fb3] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                disabled
                value={invoice.customerName}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Invoice Number
              </label>
              <input
                type="text"
                disabled
                value={invoice.invoiceNumber}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Order Number
              </label>
              <input
                type="text"
                data-tl="input-edit-order-number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Invoice Date
              </label>
              <input
                type="text"
                disabled
                value={invoice.date}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Terms
              </label>
              <input
                type="text"
                disabled
                value={invoice.terms}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Due Date
              </label>
              <input
                type="text"
                disabled
                value={invoice.dueDate}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Salesperson
              </label>
              <input
                type="text"
                data-tl="input-edit-salesperson"
                value={salesperson}
                onChange={(e) => setSalesperson(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                data-tl="input-edit-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Line Items Table */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Item Details
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <th className="py-2.5 px-3">Item Details</th>
                    <th className="py-2.5 px-3 text-right">Quantity</th>
                    <th className="py-2.5 px-3 text-right">Rate (£)</th>
                    <th className="py-2.5 px-3 text-right">Tax</th>
                    <th className="py-2.5 px-3 text-right">Amount (£)</th>
                    <th className="py-2.5 px-2 text-center w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((it, idx) => (
                    <tr key={it.id || idx} className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-3 font-medium text-gray-900">
                        {it.name}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-700">
                        {it.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-700">
                        {it.rate.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-500">
                        {it.tax}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-gray-900">
                        {it.amount.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          data-tl={`btn-delete-edit-item-${idx}`}
                          onClick={() => handleDeleteItem(idx)}
                          className="p-1 text-gray-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex justify-start">
              <button
                type="button"
                data-tl="btn-edit-add-row"
                onClick={handleAddItem}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#7014D9]" />
                <span>Add another line</span>
              </button>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Customer Notes
              </label>
              <textarea
                data-tl="textarea-edit-customer-notes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-xs font-normal text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Terms & Conditions
              </label>
              <textarea
                data-tl="textarea-edit-terms"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg border border-gray-300 text-xs font-normal text-gray-900 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Totals Block */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-80 space-y-2 text-xs">
              <div className="flex justify-between py-1 text-gray-600">
                <span>Sub Total</span>
                <span className="font-semibold text-gray-900">
                  £{subTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 text-gray-600">
                <span>Discount (%)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    data-tl="input-edit-discount"
                    value={discountPercent || ""}
                    onChange={(e) =>
                      setDiscountPercent(parseFloat(e.target.value) || 0)
                    }
                    placeholder="0"
                    className="w-16 h-7 px-2 text-right border border-gray-300 rounded text-xs font-medium"
                  />
                  <span className="w-16 text-right font-semibold text-gray-900">
                    -£{discountAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 text-gray-600">
                <span>Shipping Charges</span>
                <input
                  type="number"
                  data-tl="input-edit-shipping"
                  value={shipping || ""}
                  onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-24 h-7 px-2 text-right border border-gray-300 rounded text-xs font-medium"
                />
              </div>
              <div className="flex justify-between items-center py-1 text-gray-600">
                <span>Adjustment</span>
                <input
                  type="number"
                  data-tl="input-edit-adjustment"
                  value={adjustment || ""}
                  onChange={(e) =>
                    setAdjustment(parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                  className="w-24 h-7 px-2 text-right border border-gray-300 rounded text-xs font-medium"
                />
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                <span>Total (£)</span>
                <span className="text-[#2563EB]" data-tl="edit-total-amount">
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
