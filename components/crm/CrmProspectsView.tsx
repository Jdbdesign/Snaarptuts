'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CRM_PROSPECTS, PIPELINE_STAGES } from './crm-data';

interface Props {
  tl: Timeline;
}

export function CrmProspectsView({ tl }: Props) {
  const viewMode = useTimelineVar<'kanban' | 'list' | 'grid'>(tl, 'crm:prospectsViewMode', 'kanban');
  const isSortOpen = useTimelineVar<boolean>(tl, 'crm:isSortOpen', false);
  const sortOption = useTimelineVar<string>(tl, 'crm:sortOption', 'Most recent');

  // Handle Sort
  const sortedProspects = [...CRM_PROSPECTS].sort((a, b) => {
    if (sortOption === 'Name (A-Z)') return a.name.localeCompare(b.name);
    if (sortOption === 'Name (Z-A)') return b.name.localeCompare(a.name);
    if (sortOption === 'Oldest') return a.createdAt - b.createdAt;
    return b.createdAt - a.createdAt; // Most recent
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto">
      {/* Top Header */}
      <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold text-[#111111]" data-tl="crm-prospects-title">
              Prospects
            </h1>
            <div
              className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50"
              data-tl="crm-pipeline-selector"
            >
              <span>Sales Pipeline</span>
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-[#F3F4F6] rounded-full p-1 border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => tl.setVar('crm:prospectsViewMode', 'kanban')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-[#EDE9FE] text-[#7014D9] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-tl="crm-view-kanban"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="5" height="18" rx="1" />
                  <rect x="11" y="3" width="5" height="12" rx="1" />
                  <rect x="19" y="3" width="5" height="16" rx="1" />
                </svg>
                <span>Kanban</span>
              </button>
              <button
                type="button"
                onClick={() => tl.setVar('crm:prospectsViewMode', 'list')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#EDE9FE] text-[#7014D9] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-tl="crm-view-list"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => tl.setVar('crm:prospectsViewMode', 'grid')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#EDE9FE] text-[#7014D9] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                data-tl="crm-view-grid"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span>Grid</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => tl.setVar('crm:isSortOpen', !isSortOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                data-tl="crm-sort-dropdown"
              >
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>{sortOption}</span>
                <svg className="w-3 h-3 text-gray-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isSortOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30"
                  data-tl="crm-sort-menu"
                >
                  {[
                    { label: 'Most recent', tlKey: 'crm-sort-option-most-recent' },
                    { label: 'Oldest', tlKey: 'crm-sort-option-oldest' },
                    { label: 'Name (A-Z)', tlKey: 'crm-sort-option-name-az' },
                    { label: 'Name (Z-A)', tlKey: 'crm-sort-option-name-za' },
                    { label: 'Value (high-low)', tlKey: 'crm-sort-option-val-high' },
                    { label: 'Value (low-high)', tlKey: 'crm-sort-option-val-low' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        tl.setVar('crm:sortOption', opt.label);
                        tl.setVar('crm:isSortOpen', false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors ${
                        sortOption === opt.label
                          ? 'bg-[#2563EB] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      data-tl={opt.tlKey}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Import Button */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              data-tl="crm-import-btn"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Import</span>
            </button>

            {/* Export Button */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              data-tl="crm-export-btn"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export</span>
            </button>

            {/* Add Prospect Button */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs"
              data-tl="crm-add-prospect-btn"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Prospect</span>
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-gray-500">3 open prospects</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {viewMode === 'kanban' && (
          <div className="flex gap-4 overflow-x-auto pb-6" data-tl="crm-kanban-board">
            {PIPELINE_STAGES.map((stage) => {
              const stageProspects = sortedProspects.filter((p) => p.stage === stage.label);
              return (
                <div
                  key={stage.id}
                  className="w-72 shrink-0 bg-white rounded-2xl border border-gray-200/80 p-3.5 flex flex-col shadow-xs"
                  data-tl={`crm-kanban-column-${stage.id}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.dotColor }} />
                      <span className="text-xs font-bold text-gray-900">{stage.label}</span>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-gray-600">
                      {stageProspects.length}
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 mb-3 px-1">
                    {stageProspects.length} contact · {stage.percentage}
                  </div>

                  {/* Cards */}
                  <div className="space-y-3 flex-1">
                    {stageProspects.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl border border-gray-100 p-3 shadow-xs hover:border-gray-200 transition-all"
                        data-tl={`crm-kanban-card-${p.id}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold">
                              {p.initials}
                            </div>
                            <span className="text-xs font-bold text-gray-900">{p.name}</span>
                          </div>
                          <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>

                        {/* Action pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] text-[10px] font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            SMS
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                            </svg>
                            WhatsApp
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Prospect Dashed Button */}
                  <button
                    type="button"
                    className="mt-3 w-full py-2 border border-dashed border-gray-300 rounded-full text-center text-xs text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                  >
                    + Add prospect
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden" data-tl="crm-list-view">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 tracking-wider">
                    <th className="py-3 px-4 w-10">
                      <input type="checkbox" className="rounded border-gray-300 text-[#7014D9] focus:ring-0" />
                    </th>
                    <th className="py-3 px-4">NAME</th>
                    <th className="py-3 px-4">STAGE</th>
                    <th className="py-3 px-4">VALUE</th>
                    <th className="py-3 px-4">CONTACT</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {sortedProspects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors" data-tl={`crm-list-row-${p.id}`}>
                      <td className="py-3.5 px-4">
                        <input type="checkbox" className="rounded border-gray-300 text-[#7014D9] focus:ring-0" />
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">{p.name}</td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                          <span>{p.stage}</span>
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-600 font-semibold">{p.value ?? '-'}</td>
                      <td className="py-3.5 px-4 text-gray-600">{p.email}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-semibold">
                            Won
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626] text-[10px] font-semibold">
                            Lost
                          </span>
                          <button type="button" className="text-gray-400 hover:text-gray-600 p-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-full font-medium text-gray-700">
                  <span>20</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <span className="ml-2">Page 1 of 1</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-400 cursor-not-allowed bg-gray-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-400 cursor-not-allowed bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="space-y-6" data-tl="crm-grid-view">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedProspects.map((p) => {
                const stageObj = PIPELINE_STAGES.find((s) => s.label === p.stage);
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between"
                    data-tl={`crm-grid-card-${p.id}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-[#7014D9] focus:ring-0 mr-1" />
                        <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold">
                          {p.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stageObj?.dotColor || '#3B82F6' }} />
                            <span className="text-xs text-gray-500">{p.stage}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700">
                        <span>{p.stage}</span>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-full font-medium text-gray-700">
                  <span>20</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <span className="ml-2">Page 1 of 1</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-400 cursor-not-allowed bg-gray-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 border border-gray-200 rounded-full font-medium text-gray-400 cursor-not-allowed bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
