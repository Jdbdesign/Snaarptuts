'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  ArrowLeft,
  DollarSign,
  Mail,
  CheckSquare,
  Activity,
  Send,
  Paperclip,
  Trash2,
} from 'lucide-react';

interface Props {
  tl: Timeline;
  onBack?: () => void;
}

export function CrmContactProfileView({ tl, onBack }: Props) {
  const profileTab = useTimelineVar<'timeline' | 'comments' | 'history' | 'details'>(
    tl,
    'crm:contactProfileTab',
    'timeline'
  );

  return (
    <div
      data-tl="crm-contact-profile-view"
      className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto"
    >
      {/* Profile Header */}
      <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-tl="crm-profile-back-btn"
            onClick={onBack}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Back to contacts"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7014D9] font-bold text-base flex items-center justify-center shadow-xs">
            AM
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900" data-tl="crm-profile-name">
              Alex Morgan
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Sales Manager at Acme Studio · alex.morgan@example.com
            </p>
          </div>
        </div>

        <button
          type="button"
          data-tl="crm-profile-delete-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 space-y-6">
        {/* 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-4" data-tl="crm-profile-metrics-grid">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">Emails</span>
              <span className="text-lg font-bold text-gray-900">0</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign size={18} />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">Deals</span>
              <span className="text-lg font-bold text-gray-900">1</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <CheckSquare size={18} />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">Tasks</span>
              <span className="text-lg font-bold text-gray-900">0</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-medium block">Activities</span>
              <span className="text-lg font-bold text-gray-900">0</span>
            </div>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-gray-200/80 shadow-2xs w-fit">
          <button
            type="button"
            data-tl="crm-profile-tab-timeline"
            onClick={() => tl.setVar('crm:contactProfileTab', 'timeline')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              profileTab === 'timeline'
                ? 'bg-[#7014D9] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Timeline
          </button>
          <button
            type="button"
            data-tl="crm-profile-tab-comments"
            onClick={() => tl.setVar('crm:contactProfileTab', 'comments')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              profileTab === 'comments'
                ? 'bg-[#7014D9] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Comments
          </button>
          <button
            type="button"
            data-tl="crm-profile-tab-history"
            onClick={() => tl.setVar('crm:contactProfileTab', 'history')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              profileTab === 'history'
                ? 'bg-[#7014D9] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            History
          </button>
          <button
            type="button"
            data-tl="crm-profile-tab-details"
            onClick={() => tl.setVar('crm:contactProfileTab', 'details')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              profileTab === 'details'
                ? 'bg-[#7014D9] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Details
          </button>
        </div>

        {/* Tab 1: Timeline */}
        {profileTab === 'timeline' && (
          <div
            data-tl="crm-profile-timeline-card"
            className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
          >
            <h3 className="text-sm font-bold text-gray-900">Activity Timeline</h3>
            <div className="relative pl-6 border-l-2 border-purple-100 space-y-6 my-2">
              <div className="relative flex items-center justify-between p-3.5 rounded-xl bg-purple-50/40 border border-purple-100">
                <div className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xs">
                  <DollarSign size={13} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Deal: Alex Morgan</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    <span className="font-semibold text-emerald-700">£4,200</span> · open
                  </p>
                </div>
                <span className="text-[11px] font-mono text-gray-400">11/19/2026</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Comments */}
        {profileTab === 'comments' && (
          <div
            data-tl="crm-profile-comments-card"
            className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
          >
            <h3 className="text-sm font-bold text-gray-900">Comments</h3>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                placeholder="Add a comment..."
                data-tl="crm-comment-input"
                className="flex-1 bg-[#F8FAFC] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
              />
              <button
                type="button"
                data-tl="crm-comment-add-btn"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5E11B8] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Send size={13} />
                <span>Add</span>
              </button>
            </div>
            <div className="py-8 text-center text-xs text-gray-400">
              No comments added yet.
            </div>
          </div>
        )}

        {/* Tab 3: History */}
        {profileTab === 'history' && (
          <div
            data-tl="crm-profile-history-card"
            className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
          >
            <h3 className="text-sm font-bold text-gray-900">Audit History</h3>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span>Contact profile created</span>
                <span className="text-gray-400 font-mono text-[11px]">11/19/2026, 09:15 AM</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Details */}
        {profileTab === 'details' && (
          <div
            data-tl="crm-profile-details-card"
            className="space-y-5"
          >
            {/* PERSONAL */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">PERSONAL</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">First name</span>
                  <p className="font-semibold text-gray-800">Alex</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Last name</span>
                  <p className="font-semibold text-gray-800">Morgan</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Email</span>
                  <p className="font-semibold text-gray-800">alex.morgan@example.com</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Phone</span>
                  <p className="font-semibold text-gray-800 font-mono">+44 7700 900125</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Date of birth</span>
                  <p className="text-gray-400 font-mono">mm/dd/yyyy</p>
                </div>
              </div>
            </div>

            {/* PROFESSIONAL */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">PROFESSIONAL</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Company</span>
                  <p className="font-semibold text-gray-800">Acme Studio</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Job title</span>
                  <p className="font-semibold text-gray-800">Sales Manager</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Source</span>
                  <p className="font-semibold text-gray-800">Networking</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Pipeline Stage</span>
                  <p className="font-semibold text-[#7014D9]">Event Leads</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block text-[11px] mb-1">Products</span>
                  <p className="text-gray-500">No products linked</p>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">ADDRESS</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Street address</span>
                  <p className="font-semibold text-gray-800">10 Acme Street</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">City</span>
                  <p className="font-semibold text-gray-800">London</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">State / Province</span>
                  <p className="font-semibold text-gray-800">London</p>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] mb-1">Zip code</span>
                  <p className="font-semibold text-gray-800 font-mono">EC1A 1AA</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block text-[11px] mb-1">Country</span>
                  <p className="font-semibold text-gray-800">United Kingdom</p>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">NOTES</h3>
              <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                Met at a business networking event
              </p>
            </div>

            {/* ATTACHMENTS */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">ATTACHMENTS</h3>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline"
                >
                  <Paperclip size={13} />
                  <span>Attach file</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 py-3 text-center">
                No files attached to this contact
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
