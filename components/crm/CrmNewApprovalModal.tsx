'use client';

import React, { useState } from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  REQUEST_TYPES,
  RELATED_TO_OPTIONS,
  RECORD_OPTIONS,
  APPROVER_OPTIONS,
  type CrmApprovalItem,
} from './crm-data';
import { pushCrmToast } from './crm-timeline';
import { X, ChevronDown } from 'lucide-react';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: CrmApprovalItem) => void;
}

export function CrmNewApprovalModal({ tl, isOpen, onClose, onSubmit }: Props) {
  const [requestType, setRequestType] = useState<string>('Discount approval');
  const [relatedTo, setRelatedTo] = useState<string>('Deal');
  const [recordName, setRecordName] = useState<string>('Sam Taylor');
  const [selectedApprover, setSelectedApprover] = useState<string>('Finance Reviewer');
  const [reason, setReason] = useState<string>('');
  const isSubmitting = useTimelineVar<boolean>(tl, 'crm:isSubmittingApproval', false);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newReq: CrmApprovalItem = {
      id: 'appr-1',
      type: requestType,
      relatedTo: relatedTo,
      recordName: recordName,
      requestedBy: 'Jane Doe',
      approver: selectedApprover,
      date: '20/11/2026',
      status: 'Pending',
      reason: reason,
    };
    onSubmit(newReq);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 select-none"
      data-tl="crm-new-approval-modal"
    >
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden text-[#111111] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
          <div>
            <h2 className="font-semibold text-base text-[#111111]">New Approval Request</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            data-tl="crm-approval-modal-close"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs">
          {/* Request Type */}
          <div>
            <label className="block font-medium text-[#374151] mb-1">Request type</label>
            <div className="relative">
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                data-tl="crm-approval-type-select"
              >
                {REQUEST_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Related To */}
          <div>
            <label className="block font-medium text-[#374151] mb-1">Related to</label>
            <div className="relative">
              <select
                value={relatedTo}
                onChange={(e) => setRelatedTo(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                data-tl="crm-approval-related-select"
              >
                {RELATED_TO_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Record */}
          <div>
            <label className="block font-medium text-[#374151] mb-1">Record</label>
            <div className="relative">
              <select
                value={recordName}
                onChange={(e) => setRecordName(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                data-tl="crm-approval-record-select"
              >
                {RECORD_OPTIONS.map((rec) => (
                  <option key={rec} value={rec}>
                    {rec}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Approvers List */}
          <div>
            <label className="block font-medium text-[#374151] mb-0.5">Approvers</label>
            <p className="text-[11px] text-[#6B7280] mb-2">
              Approvers (approved in the order selected)
            </p>
            <div
              data-tl="crm-approval-approvers-list"
              className="border border-[#E5E7EB] rounded-xl divide-y divide-gray-100 max-h-36 overflow-y-auto"
            >
              {APPROVER_OPTIONS.map((appr) => {
                const isChecked = selectedApprover === appr;
                const slug = appr.toLowerCase().replace(/\s+/g, '-');
                return (
                  <label
                    key={appr}
                    className="flex items-center justify-between p-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-gray-800 font-medium">{appr}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setSelectedApprover(appr)}
                      data-tl={`crm-approver-check-${slug}`}
                      className="rounded border-[#D1D5DB] text-[#7014D9] focus:ring-[#7014D9] cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium text-[#374151] mb-1">Reason</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this approval needed?"
              data-tl="crm-approval-reason-input"
              className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9] resize-none"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-[#F3F4F6] bg-[#FAFAFA]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
            data-tl="crm-approval-modal-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            className="px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-70"
            data-tl="crm-approval-modal-submit"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
