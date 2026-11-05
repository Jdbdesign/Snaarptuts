"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type QuoteItem,
  type QuoteLineItem,
  INITIAL_QUOTES,
} from "./books-data";
import { Trash2, Home, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksEditQuoteView({ tl }: Props) {
  const quote = useTimelineVar<QuoteItem>(
    tl,
    "booksActiveQuote",
    INITIAL_QUOTES[0]
  );

  // Line items state
  const [items, setItems] = useState<QuoteLineItem[]>(quote.items);
  const [discountPercent, setDiscountPercent] = useState<number>(
    quote.discountPercent || 0
  );
  const [shipping, setShipping] = useState<number>(quote.shipping || 0);
  const [adjustment, setAdjustment] = useState<number>(quote.adjustment || 0);
  const [customerNotes, setCustomerNotes] = useState<string>(
    quote.customerNotes || "Looking forward for your business."
  );
  const [terms, setTerms] = useState<string>(
    quote.termsAndConditions ||
      "Payment due within 14 days of acceptance. Prices are valid until the expiry date. Delivery within 3 working days of order."
  );

  // Calculations
  const subTotal = items.reduce((acc, it) => acc + it.amount, 0);
  const discountAmount = subTotal * (discountPercent / 100);
  const total = subTotal - discountAmount + shipping + adjustment;

  const handleAddItem = () => {
    // Adds Delivery Fee as requested in Step 40
    const newItem: QuoteLineItem = {
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
    const updatedQuote: QuoteItem = {
      ...quote,
      items,
      subTotal,
      discountPercent,
      discountAmount,
      shipping,
      adjustment,
      total,
      amount: total,
      customerNotes,
      termsAndConditions: terms,
    };

    tl.setVar("booksActiveQuote", updatedQuote);
    tl.setVar("booksToastText", "Quote updated successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "quote-detail");
    tl.setUrl(BOOKS_URLS.quoteDetails);
  };

  const handleCancel = () => {
    tl.setVar("booksView", "quote-detail");
    tl.setUrl(BOOKS_URLS.quoteDetails);
  };

  return (
    <div
      data-tl="books-edit-quote-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="edit-quote-breadcrumb"
            onClick={handleCancel}
            className="hover:text-gray-900 cursor-pointer font-medium"
          >
            ← Back
          </button>
          <span>|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <span>&gt;</span>
          <span className="text-gray-600">Quotes</span>
          <span>&gt;</span>
          <span className="text-gray-600">Details</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Edit</span>
        </div>

        {/* Title Header */}
        <div className="flex items-center justify-between">
          <h1
            data-tl="edit-quote-title"
            className="text-2xl font-bold text-gray-900"
          >
            Edit Quote {quote.quoteNumber}
          </h1>

          <button
            type="button"
            data-tl="btn-edit-top-cancel"
            onClick={handleCancel}
            className="px-4 py-1.5 bg-purple-50 text-[#7014D9] hover:bg-purple-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Top Details Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Customer */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5">
                Customer *
              </label>
              <div
                data-tl="edit-quote-customer"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium"
              >
                {quote.customerName}
              </div>
            </div>

            {/* Quote Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5">
                Quote Date *
              </label>
              <input
                type="text"
                data-tl="edit-quote-date"
                defaultValue={quote.date}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5">
                Expiry Date
              </label>
              <input
                type="text"
                data-tl="edit-quote-expiry"
                defaultValue={quote.expiryDate}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          <div className="w-1/3 text-xs pt-1">
            <label className="block text-gray-700 font-medium mb-1.5">
              Reference Number
            </label>
            <input
              type="text"
              data-tl="edit-quote-reference"
              defaultValue={quote.referenceNumber}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Line Items Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
            <button
              type="button"
              data-tl="btn-edit-add-item"
              onClick={handleAddItem}
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Item</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-500 font-medium">
                  <th className="py-2.5 px-4">Item Details</th>
                  <th className="py-2.5 px-4 w-28 text-center">Qty</th>
                  <th className="py-2.5 px-4 w-32 text-right">Rate</th>
                  <th className="py-2.5 px-4 w-32 text-right">Amount</th>
                  <th className="py-2.5 px-3 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        data-tl={`edit-item-desc-${idx}`}
                        defaultValue={item.name}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-gray-800 text-xs"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        data-tl={`edit-item-qty-${idx}`}
                        defaultValue={item.quantity}
                        className="w-16 px-2 py-1.5 bg-white border border-gray-200 rounded text-center text-xs"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        data-tl={`edit-item-rate-${idx}`}
                        defaultValue={item.rate}
                        className="w-20 px-2 py-1.5 bg-white border border-gray-200 rounded text-right text-xs"
                      />
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      {item.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        data-tl={`btn-edit-delete-row-${idx}`}
                        onClick={() => handleDeleteItem(idx)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end pt-3">
            <div className="w-80 space-y-3 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Sub Total</span>
                <span data-tl="edit-sub-total" className="font-semibold text-gray-900">
                  {subTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Discount %</span>
                <input
                  type="number"
                  data-tl="input-edit-discount"
                  value={discountPercent}
                  onChange={(e) =>
                    setDiscountPercent(parseFloat(e.target.value) || 0)
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <input
                  type="number"
                  data-tl="input-edit-shipping"
                  value={shipping}
                  onChange={(e) =>
                    setShipping(parseFloat(e.target.value) || 0)
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Adjustment</span>
                <input
                  type="number"
                  data-tl="input-edit-adjustment"
                  value={adjustment}
                  onChange={(e) =>
                    setAdjustment(parseFloat(e.target.value) || 0)
                  }
                  className="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm font-bold text-[#2563EB]">
                <span>Total</span>
                <span data-tl="edit-total-amount">{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
            <label className="block font-semibold text-gray-900">
              Customer Notes
            </label>
            <textarea
              data-tl="edit-customer-notes"
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-2">
            <label className="block font-semibold text-gray-900">
              Terms &amp; Conditions
            </label>
            <textarea
              data-tl="edit-terms-conditions"
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-edit-cancel"
            onClick={handleCancel}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-quote-changes"
            onClick={handleSaveChanges}
            className="px-5 py-2 bg-[#7014D9] text-white hover:bg-[#5E10B7] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
