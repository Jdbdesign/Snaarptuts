'use client';

import React from 'react';
import {
  List,
  LayoutGrid,
  ChevronDown,
  ArrowUpDown,
  Check,
} from 'lucide-react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  type ClosedDealItem,
  WON_DEALS_INITIAL,
  LOST_DEALS_INITIAL,
  DEAL_STATUS_OPTIONS,
} from './crm-data';

interface Props {
  tl: Timeline;
  mode: 'won' | 'lost';
}

export function CrmDealsView({ tl, mode }: Props) {
  const isWon = mode === 'won';
  const viewMode = useTimelineVar<'list' | 'grid'>(
    tl,
    isWon ? 'crm:wonDealsViewMode' : 'crm:lostDealsViewMode',
    isWon ? 'list' : 'grid'
  );
  const isSortOpen = useTimelineVar<boolean>(tl, 'crm:isDealsSortOpen', false);
  const sortOption = useTimelineVar<string>(tl, 'crm:dealsSortOption', 'Recently closed');
  const isStatusOpen = useTimelineVar<boolean>(tl, 'crm:isStatusDropdownOpen', false);
  const activeStatusRowId = useTimelineVar<string | null>(tl, 'crm:activeStatusRowId', null);

  const wonDeals = useTimelineVar<ClosedDealItem[]>(tl, 'crm:wonDeals', WON_DEALS_INITIAL);
  const lostDeals = useTimelineVar<ClosedDealItem[]>(tl, 'crm:lostDeals', LOST_DEALS_INITIAL);

  const deals = isWon ? wonDeals : lostDeals;
  const heading = isWon ? 'Won Deals' : 'Lost Deals';
  const subtitle = `${deals.length} ${isWon ? 'won' : 'lost'} deals`;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F8F9FA] p-6 text-[#111111]" data-tl={isWon ? 'crm-won-deals-view' : 'crm-lost-deals-view'}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] font-bold text-[#111111]">{heading}</h1>
          <div className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[12px] font-medium text-[#374151] shadow-2xs cursor-pointer">
            <span>Sales Pipeline</span>
            <ChevronDown size={14} className="text-[#9CA3AF]" />
          </div>
          <span className="text-[12.5px] text-[#6B7280]">{subtitle}</span>
        </div>

        {/* View Switcher and Sort */}
        <div className="flex items-center gap-3">
          {/* List / Grid Segmented Switcher */}
          <div className="flex items-center rounded-xl bg-[#F3F4F6] p-1 border border-[#E5E7EB]">
            <button
              type="button"
              data-tl="crm-deals-view-list"
              onClick={() => tl.setVar(isWon ? 'crm:wonDealsViewMode' : 'crm:lostDealsViewMode', 'list')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-[#EDE9FE] text-[#7014D9] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <List size={14} />
              <span>List</span>
            </button>
            <button
              type="button"
              data-tl="crm-deals-view-grid"
              onClick={() => tl.setVar(isWon ? 'crm:wonDealsViewMode' : 'crm:lostDealsViewMode', 'grid')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#EDE9FE] text-[#7014D9] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="crm-deals-sort-btn"
              onClick={() => tl.setVar('crm:isDealsSortOpen', !isSortOpen)}
              className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB]"
            >
              <ArrowUpDown size={14} className="text-[#6B7280]" />
              <span>{sortOption}</span>
              <ChevronDown size={14} className="text-[#9CA3AF]" />
            </button>

            {isSortOpen && (
              <div
                data-tl="crm-deals-sort-menu"
                className="absolute right-0 top-full mt-1.5 z-30 w-44 rounded-xl border border-[#ECECF1] bg-white py-1 shadow-xl animate-in fade-in zoom-in-95 duration-100"
              >
                {[
                  'Recently closed',
                  'Oldest closed',
                  'Name (A-Z)',
                  'Name (Z-A)',
                  'Value (high-low)',
                  'Value (low-high)',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      tl.setVar('crm:dealsSortOption', opt);
                      tl.setVar('crm:isDealsSortOpen', false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-[12px] transition-colors ${
                      sortOption === opt
                        ? 'bg-[#F3ECFC] font-semibold text-[#7014D9]'
                        : 'text-[#374151] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span>{opt}</span>
                    {sortOption === opt && <Check size={14} className="text-[#7014D9]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {deals.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#D1D5DB] bg-white p-12 text-center">
          <p className="text-[14px] text-[#6B7280]">No {isWon ? 'won' : 'lost'} deals yet</p>
        </div>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="rounded-2xl border border-[#ECECF1] bg-white overflow-visible shadow-xs" data-tl="crm-deals-table-container">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECECF1] bg-[#F9FAFB] text-[11px] font-semibold tracking-wider text-[#6B7280]">
                <th className="py-3 px-5">NAME</th>
                <th className="py-3 px-4">VALUE</th>
                <th className="py-3 px-4">CONTACT</th>
                <th className="py-3 px-4">CLOSED</th>
                <th className="py-3 px-5">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECECF1]">
              {deals.map((deal: ClosedDealItem) => {
                const isDropdownOpen = isStatusOpen && (activeStatusRowId === deal.id || !activeStatusRowId);
                return (
                  <tr key={deal.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-[#111111]">{deal.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#111111]">{deal.value}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{deal.contact}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{deal.closedDate}</td>
                    <td className="py-3.5 px-5 relative">
                      <button
                        type="button"
                        data-tl={`crm-status-dropdown-${deal.id}`}
                        onClick={() => {
                          tl.setVar('crm:isStatusDropdownOpen', !isStatusOpen);
                          tl.setVar('crm:activeStatusRowId', deal.id);
                        }}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold border transition-all ${
                          deal.status === 'won'
                            ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                            : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                        }`}
                      >
                        <span className="capitalize">{deal.status}</span>
                        <ChevronDown size={13} />
                      </button>

                      {/* Status Dropdown Menu */}
                      {isDropdownOpen && (
                        <div
                          data-tl="crm-status-menu"
                          className="absolute right-0 top-full mt-1.5 z-40 w-48 rounded-xl border border-[#ECECF1] bg-white py-1 shadow-2xl animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto"
                        >
                          {DEAL_STATUS_OPTIONS.map((grp) => (
                            <div key={grp.group} className="py-1">
                              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                                {grp.group}
                              </div>
                              {grp.items.map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  data-tl={`crm-status-option-${item}`}
                                  className={`flex w-full items-center justify-between px-3.5 py-1.5 text-left text-[12px] transition-colors ${
                                    item === 'Interested'
                                      ? 'bg-[#EFF6FF] text-[#2563EB] font-medium'
                                      : 'text-[#374151] hover:bg-[#F3F4F6]'
                                  }`}
                                >
                                  <span>{item}</span>
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-[#ECECF1] px-5 py-3 text-[12px] text-[#6B7280]">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <div className="flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-[#111111]">
                <span>20</span>
                <ChevronDown size={12} className="text-[#9CA3AF]" />
              </div>
              <span className="ml-2">Page 1 of 1</span>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" disabled className="px-3 py-1 text-[#D1D5DB] font-medium">
                Previous
              </button>
              <button type="button" disabled className="px-3 py-1 text-[#D1D5DB] font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-5" data-tl="crm-deals-grid-container">
            {deals.map((deal: ClosedDealItem) => (
              <div
                key={deal.id}
                data-tl={`crm-deal-card-${deal.id}`}
                className="flex flex-col justify-between rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs hover:border-[#DDD6FE] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6] text-white text-[13px] font-bold">
                      {deal.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#111111]">{deal.name}</span>
                      <span className="text-[12px] text-[#6B7280]">Closed {deal.closedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                  <span className={`text-[16px] font-bold ${deal.status === 'won' ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                    {deal.value}
                  </span>

                  <button
                    type="button"
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold border ${
                      deal.status === 'won'
                        ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                    }`}
                  >
                    <span className="capitalize">{deal.status}</span>
                    <ChevronDown size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer for Grid */}
          <div className="flex items-center justify-between px-2 text-[12px] text-[#6B7280]">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <div className="flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-[#111111]">
                <span>20</span>
                <ChevronDown size={12} className="text-[#9CA3AF]" />
              </div>
              <span className="ml-2">Page 1 of 1</span>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" disabled className="px-3 py-1 text-[#D1D5DB] font-medium">
                Previous
              </button>
              <button type="button" disabled className="px-3 py-1 text-[#D1D5DB] font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
