'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CRM_PRODUCT_OPTIONS } from './crm-data';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function CrmAddContactModal({ tl, isOpen, onClose, onSubmit }: Props) {
  const isProductsOpen = useTimelineVar<boolean>(tl, 'crm:isProductsDropdownOpen', false);
  const selectedProduct = useTimelineVar<string>(tl, 'crm:selectedProduct', '');
  const selectedSource = useTimelineVar<string>(tl, 'crm:selectedSource', 'Website');
  const selectedStatus = useTimelineVar<string>(tl, 'crm:selectedStatus', 'Lead');

  // Input fields from timeline vars or defaults
  const fname = useTimelineVar<string>(tl, 'field:crm_contact_fname', '');
  const lname = useTimelineVar<string>(tl, 'field:crm_contact_lname', '');
  const email = useTimelineVar<string>(tl, 'field:crm_contact_email', '');
  const phone = useTimelineVar<string>(tl, 'field:crm_contact_phone', '');
  const mobile = useTimelineVar<string>(tl, 'field:crm_contact_mobile', '');
  const company = useTimelineVar<string>(tl, 'field:crm_contact_company', '');
  const job = useTimelineVar<string>(tl, 'field:crm_contact_job', '');
  const address = useTimelineVar<string>(tl, 'field:crm_contact_address', '');
  const city = useTimelineVar<string>(tl, 'field:crm_contact_city', '');
  const country = useTimelineVar<string>(tl, 'field:crm_contact_country', '');
  const zip = useTimelineVar<string>(tl, 'field:crm_contact_zip', '');
  const notes = useTimelineVar<string>(tl, 'field:crm_contact_notes', '');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-add-contact-overlay"
    >
      <div
        className="relative w-full max-w-[540px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-add-contact-modal"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-gray-900" data-tl="crm-add-contact-title">
            Add Contact
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-tl="crm-add-contact-close"
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs" data-tl="crm-add-contact-body">
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">First name *</label>
              <input
                type="text"
                placeholder="John"
                value={fname}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-fname"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Last name *</label>
              <input
                type="text"
                placeholder="Doe"
                value={lname}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-lname"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              readOnly
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
              data-tl="crm-contact-field-email"
            />
          </div>

          {/* Row 3: Phone & Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                placeholder="+1 555 123 4567"
                value={phone}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-phone"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                placeholder="+1 555 987 6543"
                value={mobile}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-mobile"
              />
            </div>
          </div>

          {/* Row 4: Date of birth */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Date of birth</label>
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-400">
              <span>mm/dd/yyyy</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[10.5px] text-gray-400 mt-1">Used by birthday message automation.</p>
          </div>

          {/* Row 5: Company & Job title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                placeholder="Acme Inc"
                value={company}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-company"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Job title</label>
              <input
                type="text"
                placeholder="Marketing Manager"
                value={job}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-job"
              />
            </div>
          </div>

          {/* Row 6: Source & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Source</label>
              <div
                className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-800 cursor-pointer"
                data-tl="crm-contact-field-source"
              >
                <span>{selectedSource}</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Status</label>
              <div
                className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-800 cursor-pointer"
                data-tl="crm-contact-field-status"
              >
                <span>{selectedStatus}</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 7: Address */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={address}
              readOnly
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
              data-tl="crm-contact-field-address"
            />
          </div>

          {/* Row 8: City & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-city"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
                data-tl="crm-contact-field-country"
              />
            </div>
          </div>

          {/* Row 9: Zip Code */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Zip Code</label>
            <input
              type="text"
              value={zip}
              readOnly
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9]"
              data-tl="crm-contact-field-zip"
            />
          </div>

          {/* Row 10: Products */}
          <div className="relative">
            <label className="block font-medium text-gray-700 mb-1">Products</label>
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl">
              <span className={selectedProduct ? 'text-gray-900 font-semibold' : 'text-gray-400'}>
                {selectedProduct ? `${selectedProduct} (Linked)` : 'No products linked'}
              </span>
              <button
                type="button"
                onClick={() => tl.setVar('crm:isProductsDropdownOpen', !isProductsOpen)}
                className="text-[#7014D9] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                data-tl="crm-contact-products-btn"
              >
                <span>Add</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Products Dropdown */}
            {isProductsOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-20 max-h-48 overflow-y-auto space-y-1"
                data-tl="crm-contact-products-dropdown"
              >
                {CRM_PRODUCT_OPTIONS.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      tl.setVar('crm:selectedProduct', prod.name);
                      tl.setVar('crm:isProductsDropdownOpen', false);
                    }}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      selectedProduct === prod.name ? 'bg-[#F3E8FF] text-[#7014D9]' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    data-tl={`crm-product-option-${prod.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedProduct === prod.name}
                        readOnly
                        className="rounded border-gray-300 text-[#7014D9] focus:ring-0"
                      />
                      <span className="font-medium text-xs">{prod.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{prod.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row 11: Notes */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={3}
              placeholder="Additional notes..."
              value={notes}
              readOnly
              className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden focus:border-[#7014D9] resize-none"
              data-tl="crm-contact-field-notes"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50"
            data-tl="crm-contact-cancel-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs"
            data-tl="crm-contact-submit-btn"
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}
