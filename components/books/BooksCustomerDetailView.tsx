"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ChevronDown, RotateCw } from "lucide-react";
import {
  type CustomerItem,
  INITIAL_ACTIVE_CUSTOMERS,
  BOOKS_URLS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCustomerDetailView({ tl }: Props) {
  const currentCust = useTimelineVar<CustomerItem>(
    tl,
    "booksActiveCustomer",
    INITIAL_ACTIVE_CUSTOMERS[1]
  );
  const activeCustomers = useTimelineVar<CustomerItem[]>(
    tl,
    "booksCustomers",
    INITIAL_ACTIVE_CUSTOMERS
  );
  const inactiveCustomers = useTimelineVar<CustomerItem[]>(
    tl,
    "booksInactiveCustomers",
    []
  );

  const [name, setName] = useState(currentCust.displayName);
  const [email, setEmail] = useState(currentCust.email);
  const [phone, setPhone] = useState(currentCust.phone);
  const [billing, setBilling] = useState(
    currentCust.billingAddress
      ? `${currentCust.billingAddress.street1 || ""}${
          currentCust.billingAddress.city
            ? `, ${currentCust.billingAddress.city}`
            : ""
        }${
          currentCust.billingAddress.zipCode
            ? `, ${currentCust.billingAddress.zipCode}`
            : ""
        }`
      : "12 Market Street, Leeds, LS1 4AB"
  );
  const [shipping, setShipping] = useState(
    currentCust.shippingAddress
      ? `${currentCust.shippingAddress.street1 || ""}${
          currentCust.shippingAddress.city
            ? `, ${currentCust.shippingAddress.city}`
            : ""
        }${
          currentCust.shippingAddress.zipCode
            ? `, ${currentCust.shippingAddress.zipCode}`
            : ""
        }`
      : "Unit 4, Dock Road, Leeds, LS10 1AB"
  );
  const [taxId, setTaxId] = useState(currentCust.companyId || "GB123456789");
  const [notes, setNotes] = useState(
    currentCust.notes || "Pays by bank transfer. Orders weekly."
  );

  const isSaving = useTimelineVar<boolean>(tl, "booksDetailSaving", false);

  const handleUpdate = () => {
    tl.setVar("booksDetailSaving", true);
    setTimeout(() => {
      tl.setVar("booksDetailSaving", false);
      const updated: CustomerItem = {
        ...currentCust,
        displayName: name,
        email,
        phone,
        companyId: taxId,
        notes,
      };
      tl.setVar("booksActiveCustomer", updated);
      const list = activeCustomers.map((c) =>
        c.id === currentCust.id ? updated : c
      );
      tl.setVar("booksCustomers", list);
      tl.setVar("booksToastMessage", "Customer updated successfully.");
      tl.setVar("booksToastOpen", true);
    }, 700);
  };

  const handleDeactivate = () => {
    const updated: CustomerItem = { ...currentCust, status: "inactive" };
    const remainingActive = activeCustomers.filter(
      (c) => c.id !== currentCust.id
    );
    tl.setVar("booksCustomers", remainingActive);
    tl.setVar("booksInactiveCustomers", [updated, ...inactiveCustomers]);
    tl.setVar("booksActiveCustomer", updated);
    tl.setVar("booksToastMessage", "Customer deactivated successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "customers");
    tl.setUrl(BOOKS_URLS.customers);
  };

  const handleActivate = () => {
    const updated: CustomerItem = { ...currentCust, status: "active" };
    const remainingInactive = inactiveCustomers.filter(
      (c) => c.id !== currentCust.id
    );
    tl.setVar("booksInactiveCustomers", remainingInactive);
    tl.setVar("booksCustomers", [updated, ...activeCustomers]);
    tl.setVar("booksActiveCustomer", updated);
    tl.setVar("booksToastMessage", "Customer activated successfully.");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "customers");
    tl.setUrl(BOOKS_URLS.customers);
  };

  const isInactive = currentCust.status === "inactive";

  return (
    <div
      data-tl="customer-detail-view"
      className="flex flex-1 flex-col h-full bg-white overflow-y-auto px-8 py-6 select-none"
    >
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <button
          type="button"
          data-tl="btn-back-to-customers"
          onClick={() => {
            tl.setVar("booksView", "customers");
            tl.setUrl(BOOKS_URLS.customers);
          }}
          className="hover:text-gray-900 cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>← Back</span>
        </button>
        <span>|</span>
        <span>⌂ &gt; Customers &gt; Details</span>
      </div>

      {/* Title & Action Row */}
      <div className="mt-2 flex items-center justify-between">
        <h1
          data-tl="customer-detail-title"
          className="text-xl font-bold text-gray-900 tracking-tight"
        >
          {currentCust.displayName}
        </h1>

        {isInactive ? (
          <button
            type="button"
            data-tl="btn-activate-customer"
            onClick={handleActivate}
            className="flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-xs font-medium text-white hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
          >
            Activate
          </button>
        ) : (
          <button
            type="button"
            data-tl="btn-deactivate-customer"
            onClick={handleDeactivate}
            className="flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-xs font-medium text-white hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
          >
            Deactivate
          </button>
        )}
      </div>

      {/* Customer Form Fields */}
      <div className="mt-6 max-w-2xl space-y-4 text-xs">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">Name</label>
          <input
            type="text"
            data-tl="input-detail-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Email
          </label>
          <input
            type="email"
            data-tl="input-detail-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Phone
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 text-xs text-gray-700 cursor-pointer min-w-[85px] justify-between"
            >
              <span>GB {currentCust.phoneCode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <input
              type="text"
              data-tl="input-detail-phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                tl.setVar("booksDetailPhone", e.target.value);
              }}
              className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Billing Address
          </label>
          <textarea
            rows={3}
            data-tl="input-detail-billing"
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none resize-none"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Shipping Address
          </label>
          <textarea
            rows={3}
            data-tl="input-detail-shipping"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none resize-none"
          />
        </div>

        {/* Tax Identification */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Tax Identification
          </label>
          <input
            type="text"
            data-tl="input-detail-tax-id"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">
            Notes
          </label>
          <textarea
            rows={3}
            data-tl="input-detail-notes"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              tl.setVar("booksDetailNotes", e.target.value);
            }}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none resize-none"
          />
        </div>

        {/* Update Customer button */}
        <div className="pt-4">
          <button
            type="button"
            data-tl="btn-update-customer"
            disabled={isSaving}
            onClick={handleUpdate}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#7014D9] px-8 text-xs font-medium text-white hover:bg-[#5E10B7] shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Update Customer</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
