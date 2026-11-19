'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  INITIAL_DIRECTORY_CONTACTS,
  CONTACT_STATUS_FILTER_OPTIONS,
  type CrmDirectoryContact,
} from './crm-data';
import { Search, ChevronDown, Upload, UserPlus, Trash2 } from 'lucide-react';

interface Props {
  tl: Timeline;
  onOpenAddDrawer: () => void;
  onSelectContact?: (id: string) => void;
  onDeleteContact?: (id: string) => void;
}

export function CrmContactsDirectoryView({
  tl,
  onOpenAddDrawer,
  onSelectContact,
  onDeleteContact,
}: Props) {
  const contacts = useTimelineVar<CrmDirectoryContact[]>(
    tl,
    'crm:directoryContacts',
    INITIAL_DIRECTORY_CONTACTS
  );
  const isStatusFilterOpen = useTimelineVar<boolean>(
    tl,
    'crm:isStatusFilterOpen',
    false
  );
  const selectedStatus = useTimelineVar<string>(
    tl,
    'crm:selectedStatusFilter',
    'All statuses'
  );

  return (
    <div
      data-tl="crm-contacts-directory-view"
      className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto"
    >
      {/* Top Page Header */}
      <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111111]" data-tl="crm-contacts-title">
            Contacts
          </h1>
          <p className="text-xs text-gray-500 mt-0.5" data-tl="crm-contacts-count">
            {contacts.length} total contacts
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="crm-contacts-import-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Upload size={14} className="text-gray-500" />
            <span>Import</span>
          </button>

          <button
            type="button"
            data-tl="crm-contacts-add-btn"
            onClick={onOpenAddDrawer}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#7014D9] hover:bg-[#5E11B8] text-white rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus size={14} />
            <span>+ Add Contact</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-[420px]">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 shadow-2xs">
            <Search size={15} className="text-gray-400 mr-2.5 shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search contacts..."
              className="w-full bg-transparent outline-none placeholder:text-gray-400 text-xs"
              data-tl="crm-contacts-search-input"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="crm-status-filter-btn"
              onClick={() => tl.setVar('crm:isStatusFilterOpen', !isStatusFilterOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{selectedStatus}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isStatusFilterOpen && (
              <div
                data-tl="crm-status-filter-menu"
                className="absolute left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-40 max-h-60 overflow-y-auto"
              >
                {CONTACT_STATUS_FILTER_OPTIONS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    data-tl={`crm-status-option-${status.toLowerCase().replace(/[\s_]+/g, '-')}`}
                    onClick={() => {
                      tl.setVar('crm:selectedStatusFilter', status);
                      tl.setVar('crm:isStatusFilterOpen', false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      selectedStatus === status
                        ? 'font-semibold text-[#7014D9] bg-purple-50/60'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{status}</span>
                    {selectedStatus === status && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contacts Table Canvas */}
      <div className="flex-1 px-8 pb-8">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse" data-tl="crm-contacts-table">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                <th className="py-3 px-4 w-10 text-center">
                  <input type="checkbox" readOnly className="rounded-sm border-gray-300 text-[#7014D9]" />
                </th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  data-tl={`crm-contact-row-${contact.id.replace('contact-', '')}`}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="py-3 px-4 text-center">
                    <input type="checkbox" readOnly className="rounded-sm border-gray-300 text-[#7014D9]" />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      data-tl={`crm-contact-name-${contact.id.replace('contact-', '')}`}
                      onClick={() => onSelectContact && onSelectContact(contact.id)}
                      className="flex items-center gap-3 text-left font-semibold text-gray-900 hover:text-[#7014D9] transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-[#7014D9] font-bold text-[11px] flex items-center justify-center shrink-0">
                        {contact.initials}
                      </div>
                      <span>{contact.name}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{contact.email}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">{contact.phone}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{contact.company}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-[#7014D9] border border-purple-100">
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      data-tl={`crm-contact-delete-${contact.id.replace('contact-', '')}`}
                      onClick={() => onDeleteContact && onDeleteContact(contact.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title={`Delete ${contact.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
