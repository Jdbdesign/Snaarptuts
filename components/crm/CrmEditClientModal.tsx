'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function CrmEditClientModal({
  tl,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const editValue = useTimelineVar<string>(tl, 'field:crm_edit_val', '12000.00');
  const editPriority = useTimelineVar<string>(tl, 'field:crm_edit_priority', 'Medium');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-edit-client-overlay"
    >
      <div
        className="relative w-full max-w-[540px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-edit-client-modal"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-gray-900" data-tl="crm-edit-client-title">
            Edit Client
          </h2>
          <button
            type="button"
            onClick={onClose}
            data-tl="crm-edit-client-close"
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs" data-tl="crm-edit-client-body">
          {/* Section: Client Details */}
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              CLIENT DETAILS
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-medium text-gray-700 mb-1">First name *</label>
                <input
                  type="text"
                  value="Alex"
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Last name *</label>
                <input
                  type="text"
                  value="Morgan"
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value="alex.morgan@example.com"
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value="+44 7700 900101"
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  type="text"
                  value=""
                  readOnly
                  placeholder=""
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block font-medium text-gray-700 mb-1">Date of birth</label>
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-400">
                <span>mm/dd/yyyy</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Used by birthday message automation.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value="Acme Inc"
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Job title</label>
                <input
                  type="text"
                  value="Marketing Manager"
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                />
              </div>
            </div>

            {/* Products */}
            <div className="mb-3">
              <label className="block font-medium text-gray-700 mb-1">Products</label>
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-400">
                <span>No products linked</span>
                <span className="text-[#7014D9] font-medium flex items-center gap-1 cursor-pointer">
                  <span>Add</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Attachments */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">Attachments</label>
              <div className="border border-dashed border-gray-300 rounded-xl py-6 flex flex-col items-center justify-center text-center text-gray-400 hover:border-gray-400 cursor-pointer">
                <svg className="w-5 h-5 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Click to upload files</span>
              </div>
            </div>
          </div>

          {/* Section: Prospect Details */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              PROSPECT DETAILS
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={editValue}
                  readOnly
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden"
                  data-tl="crm-edit-field-val"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-800">
                  <span>{editPriority}</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Expected close date</label>
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-400">
                <span>mm/dd/yyyy</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                rows={2}
                readOnly
                className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-gray-200 rounded-xl text-gray-900 outline-hidden resize-none"
              />
            </div>

            {/* Comments Section */}
            <div>
              <div className="flex items-center gap-1.5 font-medium text-gray-700 mb-1.5">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Comments</span>
              </div>
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Add a comment..."
                  readOnly
                  className="w-full p-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-xs text-gray-700 outline-hidden resize-none"
                />
                <button
                  type="button"
                  className="absolute right-2 bottom-2 px-3 py-1 bg-[#7014D9] text-white rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-xs"
                >
                  <svg className="w-3 h-3 rotate-45 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center py-2">No comments yet</p>
            </div>

            {/* Stage History */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 font-medium text-gray-700 mb-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Stage History</span>
              </div>
              <p className="text-[10.5px] text-gray-400 py-1">No stage changes yet</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50"
            data-tl="crm-edit-client-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs"
            data-tl="crm-edit-client-save"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
