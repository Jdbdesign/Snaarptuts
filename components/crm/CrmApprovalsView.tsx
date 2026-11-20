'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { INITIAL_APPROVAL_REQUESTS, type CrmApprovalItem } from './crm-data';
import { pushCrmToast } from './crm-timeline';
import {
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardCheck,
  Calendar,
} from 'lucide-react';

interface Props {
  tl: Timeline;
}

export function CrmApprovalsView({ tl }: Props) {
  const approvalTab = useTimelineVar<'pending' | 'all'>(tl, 'crm:approvalTab', 'pending');
  const approvalRequests = useTimelineVar<CrmApprovalItem[]>(
    tl,
    'crm:approvalRequests',
    INITIAL_APPROVAL_REQUESTS
  );
  const pendingCount = useTimelineVar<number>(tl, 'crm:pendingCount', 1);
  const allCount = useTimelineVar<number>(tl, 'crm:allCount', 2);

  const filteredRequests =
    approvalTab === 'pending'
      ? approvalRequests.filter((r) => r.status === 'Pending')
      : approvalRequests;

  const handleApprove = () => {
    // Permission check: current user is Jane Doe, approver is Finance Reviewer
    pushCrmToast(tl, 'You are not the current approver for this request', { isError: true });
  };

  const handleReject = (item: CrmApprovalItem) => {
    const updated = approvalRequests.map((r) =>
      r.id === item.id ? { ...r, status: 'Rejected' as const } : r
    );
    tl.setVar('crm:approvalRequests', updated);
    pushCrmToast(tl, 'Rejected');
  };

  const handleOpenNewModal = () => {
    tl.setVar('crm:isNewApprovalOpen', true);
  };

  const handleTabChange = (tab: 'pending' | 'all') => {
    tl.setVar('crm:approvalTab', tab);
  };

  return (
    <div
      data-scroller="crm-approvals"
      className="flex-1 overflow-y-auto bg-[#F8F9FB] p-6 text-slate-800"
    >
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Approvals</h1>
            <p className="mt-0.5 text-xs text-slate-500">
              Raise, review and manage approval requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                data-tl="crm-approvals-tab-pending"
                onClick={() => handleTabChange('pending')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  approvalTab === 'pending'
                    ? 'bg-[#7014D9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                type="button"
                data-tl="crm-approvals-tab-all"
                onClick={() => handleTabChange('all')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  approvalTab === 'all'
                    ? 'bg-[#7014D9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({allCount})
              </button>
            </div>

            {/* New Request Button */}
            <button
              type="button"
              data-tl="crm-new-approval-btn"
              onClick={handleOpenNewModal}
              className="flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#5B0FB0] transition-colors"
            >
              <Plus size={14} />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 ? (
          <div
            data-tl="crm-approvals-empty-state"
            className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-700">No pending approvals</h3>
            <p className="mt-1 text-xs text-slate-400">
              All approval requests have been resolved or none have been submitted yet.
            </p>
          </div>
        ) : (
          /* Approvals List */
          <div data-tl="crm-approvals-list" className="space-y-3">
            {filteredRequests.map((item) => (
              <div
                key={item.id}
                data-tl={`crm-approval-card-${item.id}`}
                className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-slate-300 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-sm text-slate-900">
                      {item.type.includes('approval') ? item.type : `${item.type} approval`}
                    </span>
                    <span
                      data-tl="crm-approval-status-badge"
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        item.status === 'Pending'
                          ? 'border border-amber-200/80 bg-amber-50 text-amber-700'
                          : item.status === 'Rejected'
                            ? 'border border-red-200/80 bg-red-50 text-red-700'
                            : 'border border-emerald-200/80 bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {item.status === 'Pending' && <Clock size={11} className="text-amber-600" />}
                      {item.status === 'Rejected' && <XCircle size={11} className="text-red-600" />}
                      {item.status === 'Approved' && (
                        <CheckCircle2 size={11} className="text-emerald-600" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <div>
                      <span className="font-medium text-slate-700">Related to:</span>{' '}
                      <span className="text-slate-600">
                        {item.relatedTo} • {item.recordName}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Requested by:</span>{' '}
                      <span className="text-slate-600">{item.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Approver:</span>{' '}
                      <span className="text-slate-600">{item.approver}</span>
                    </div>
                  </div>
                </div>

                {/* Actions (visible when Pending) */}
                {item.status === 'Pending' ? (
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      data-tl="crm-approval-approve-btn"
                      onClick={() => handleApprove()}
                      className="flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-2xs hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      data-tl="crm-approval-reject-btn"
                      onClick={() => handleReject(item)}
                      className="flex items-center gap-1 rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 shadow-2xs hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={13} className="text-red-600" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <div className="self-end sm:self-center">
                    <span className="text-xs italic text-slate-400">Resolved</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
