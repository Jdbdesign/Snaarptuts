'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { ACME_STUDIO_COMPANY, type CrmCompanyInfo } from './crm-data';
import { ArrowLeft, Building2, Trash2, Check, Users } from 'lucide-react';

interface Props {
  tl: Timeline;
  onBack?: () => void;
  onSave?: () => void;
}

export function CrmCompanyProfileView({ tl, onBack, onSave }: Props) {
  const company = useTimelineVar<CrmCompanyInfo>(
    tl,
    'crm:companyInfo',
    ACME_STUDIO_COMPANY
  );

  return (
    <div
      data-tl="crm-company-profile-view"
      className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto"
    >
      {/* Top Header */}
      <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-tl="crm-company-back-btn"
            onClick={onBack}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7014D9] flex items-center justify-center shadow-xs">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900" data-tl="crm-company-name">
              {company.name}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{company.domain} · {company.industry}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="crm-company-delete-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          <button
            type="button"
            data-tl="crm-company-save-btn"
            onClick={onSave}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#7014D9] hover:bg-[#5E11B8] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Check size={14} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Body */}
      <div className="flex-1 p-8 flex gap-6 items-start">
        {/* Left Column: Company Info & Address */}
        <div className="flex-1 space-y-6">
          {/* COMPANY INFO */}
          <div
            data-tl="crm-company-info-card"
            className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
          >
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">COMPANY INFO</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Company Name</span>
                <p className="font-semibold text-gray-800">{company.name}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Domain</span>
                <p className="font-semibold text-gray-800">{company.domain}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Industry</span>
                <p className="font-semibold text-gray-800">{company.industry}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Company Size</span>
                <p className="font-semibold text-gray-800">{company.size}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Phone</span>
                <p className="font-semibold text-gray-800 font-mono">{company.phone}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Email</span>
                <p className="font-semibold text-gray-800">{company.email}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-[11px] mb-1">Website</span>
                <p className="font-semibold text-[#7014D9]">{company.website}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block text-[11px] mb-1">Description</span>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {company.description}
                </p>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div
            data-tl="crm-company-address-card"
            className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
          >
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">ADDRESS</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Street</span>
                <p className="font-semibold text-gray-800">{company.street}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">City</span>
                <p className="font-semibold text-gray-800">{company.city}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">State / Province</span>
                <p className="font-semibold text-gray-800">{company.state}</p>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px] mb-1">Country</span>
                <p className="font-semibold text-gray-800">{company.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Associated Contacts Panel */}
        <div
          data-tl="crm-associated-contacts-panel"
          className="w-80 shrink-0 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4"
        >
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#7014D9]" />
            <h3 className="text-sm font-bold text-gray-900">Associated Contacts</h3>
          </div>
          <div className="py-8 text-center text-xs text-gray-400">
            <p>No contacts linked to this company yet.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Add contacts with this company name to see them here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
