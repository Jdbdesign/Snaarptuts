'use client';

import React from 'react';
import { X, UserPlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function CrmAddContactDrawer({ isOpen, onClose, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        data-tl="crm-add-contact-drawer"
        className="w-full max-w-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">Add Contact</h2>
            <p className="text-xs text-gray-500 mt-0.5">Create a new contact in your CRM directory.</p>
          </div>
          <button
            type="button"
            data-tl="crm-add-contact-drawer-close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto max-h-[60vh]">
          {/* Company & Job Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Company</label>
              <input
                type="text"
                placeholder="e.g. Acme Studio"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Job title</label>
              <input
                type="text"
                placeholder="e.g. Sales Manager"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Source & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Source</label>
              <select
                defaultValue="Networking"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Networking">Networking</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <select
                defaultValue="Event Leads"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Event Leads">Event Leads</option>
                <option value="Lead">Lead</option>
                <option value="Proposal">Proposal</option>
                <option value="Interested">Interested</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              placeholder="10 Acme Street"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="London"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Country</label>
              <input
                type="text"
                placeholder="United Kingdom"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                placeholder="EC1A 1AA"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Linked Products */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Products</label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-500">No products linked</span>
              <button type="button" className="text-[#7014D9] font-semibold hover:underline">
                + Add
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Notes</label>
            <textarea
              rows={2}
              placeholder="Additional notes about this contact..."
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-[#7014D9] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <button
            type="button"
            data-tl="crm-add-contact-drawer-cancel"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-add-contact-drawer-submit"
            onClick={() => {
              if (onSubmit) onSubmit();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5E11B8] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus size={14} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}
