"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_VENDORS,
  type VendorItem,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight, ChevronDown } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksVendorDetailView({ tl }: Props) {
  const activeVendor = useTimelineVar<VendorItem>(
    tl,
    "booksActiveVendor",
    INITIAL_VENDORS[0]
  );

  const [name, setName] = useState(activeVendor.name || "");
  const [email, setEmail] = useState(activeVendor.email || "");
  const [phone, setPhone] = useState(activeVendor.phone?.replace("+44 ", "") || "");
  const [address, setAddress] = useState(activeVendor.address || "");
  const [taxId, setTaxId] = useState(activeVendor.taxIdentification || "GB 123 4567 89");
  const paymentTerms = useTimelineVar<string>(
    tl,
    "booksVendorPaymentTerms",
    activeVendor.paymentTerms || "Due on Receipt"
  );
  const isPaymentTermsOpen = useTimelineVar<boolean>(
    tl,
    "booksVendorPaymentTermsOpen",
    false
  );
  const notes = useTimelineVar<string>(tl, "booksVendorNotes", activeVendor.notes || "");

  const handleBack = () => {
    tl.setVar("booksView", "vendors");
    tl.setUrl(BOOKS_URLS.vendors);
  };

  const handleDeactivate = () => {
    const currentVendors = tl.getVar<VendorItem[]>("booksVendors", INITIAL_VENDORS);
    const updated = currentVendors.map((v) =>
      v.id === activeVendor.id || v.name === activeVendor.name
        ? { ...v, status: "Inactive" as const }
        : v
    );
    tl.setVar("booksVendors", updated);
    tl.setVar("booksToastText", "Vendor deactivated successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "vendors");
    tl.setUrl(BOOKS_URLS.vendors);
  };

  const handleUpdate = () => {
    const currentVendors = tl.getVar<VendorItem[]>("booksVendors", INITIAL_VENDORS);
    const updated = currentVendors.map((v) =>
      v.id === activeVendor.id || v.name === activeVendor.name
        ? {
            ...v,
            name,
            email,
            phone: phone ? `+44 ${phone}` : v.phone,
            address,
            taxIdentification: taxId,
            paymentTerms,
            notes,
          }
        : v
    );
    tl.setVar("booksVendors", updated);
    tl.setVar("booksActiveVendor", {
      ...activeVendor,
      name,
      email,
      phone: phone ? `+44 ${phone}` : activeVendor.phone,
      address,
      taxIdentification: taxId,
      paymentTerms,
      notes,
    });
    tl.setVar("booksToastText", "Vendor updated successfully");
    tl.setVar("booksToastOpen", true);
  };

  return (
    <div
      data-tl="books-vendor-detail-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-vendors"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Vendors</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-medium">Details</span>
        </div>

        {/* Title Row */}
        <div className="flex items-center justify-between pt-2">
          <h1
            data-tl="title-vendor-details"
            className="text-xl font-bold text-gray-900"
          >
            {activeVendor.name}
          </h1>
          <button
            type="button"
            data-tl="btn-deactivate-vendor"
            onClick={handleDeactivate}
            className="px-4 py-2 text-xs font-medium text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg transition-colors shadow-xs"
          >
            Deactivate
          </button>
        </div>

        {/* Form Fields Stack */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              data-tl="input-vendor-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              data-tl="input-vendor-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0">
                <span>GB +44</span>
              </div>
              <input
                type="text"
                data-tl="input-vendor-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              rows={3}
              data-tl="input-vendor-address"
              placeholder="Vendor address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tax Identification
            </label>
            <input
              type="text"
              data-tl="input-vendor-tax-id"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Payment Terms
            </label>
            <div className="relative">
              <button
                type="button"
                data-tl="select-vendor-payment-terms"
                onClick={() => tl.setVar("booksVendorPaymentTermsOpen", !isPaymentTermsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <span>{paymentTerms}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {isPaymentTermsOpen && (
                <div
                  data-tl="dropdown-vendor-payment-terms"
                  className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                >
                  {[
                    { label: "Due on Receipt", id: "due-on-receipt" },
                    { label: "Net 15", id: "net15" },
                    { label: "Net 30", id: "net30" },
                    { label: "Net 45", id: "net45" },
                    { label: "Net 60", id: "net60" },
                  ].map((term) => (
                    <button
                      key={term.id}
                      type="button"
                      data-tl={`opt-terms-${term.id}`}
                      onClick={() => {
                        tl.setVar("booksVendorPaymentTerms", term.label);
                        tl.setVar("booksVendorPaymentTermsOpen", false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                        paymentTerms === term.label
                          ? "text-[#7014D9] font-medium bg-purple-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {term.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              data-tl="input-vendor-notes"
              placeholder="Additional notes"
              value={notes}
              onChange={(e) => tl.setVar("booksVendorNotes", e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              data-tl="btn-update-vendor"
              onClick={handleUpdate}
              className="w-full py-2.5 text-xs font-medium text-white bg-[#7014D9] hover:bg-[#5B10B0] rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Update Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
