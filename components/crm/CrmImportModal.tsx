'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CSV_IMPORT_RECORDS } from './crm-data';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onFinishImport: () => void;
}

export function CrmImportModal({ tl, isOpen, onClose, onFinishImport }: Props) {
  const stage = useTimelineVar<'upload' | 'map' | 'review' | 'complete'>(tl, 'crm:importStage', 'upload');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-import-modal-overlay"
    >
      <div
        className="relative w-full max-w-[760px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-import-modal"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-gray-900" data-tl="crm-import-title">
              Import Prospects
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Upload, map your columns, review, then add prospects to your pipeline.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-tl="crm-import-close-btn"
            className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-3 bg-[#FAF5FF]/50 border-b border-gray-100 flex items-center gap-2 text-xs">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-colors ${
              stage === 'upload'
                ? 'bg-[#F3E8FF] text-[#7014D9]'
                : 'bg-[#DCFCE7] text-[#16A34A]'
            }`}
            data-tl="crm-import-step-upload"
          >
            {stage === 'upload' ? '1 Upload' : '✓ Upload'}
          </span>
          <span className="text-gray-300">―</span>
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-colors ${
              stage === 'map'
                ? 'bg-[#F3E8FF] text-[#7014D9]'
                : stage === 'review' || stage === 'complete'
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : 'text-gray-400'
            }`}
            data-tl="crm-import-step-map"
          >
            {stage === 'review' || stage === 'complete' ? '✓ Map' : '2 Map'}
          </span>
          <span className="text-gray-300">―</span>
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-colors ${
              stage === 'review'
                ? 'bg-[#F3E8FF] text-[#7014D9]'
                : stage === 'complete'
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : 'text-gray-400'
            }`}
            data-tl="crm-import-step-review"
          >
            {stage === 'complete' ? '✓ Review' : '3 Review'}
          </span>
          <span className="text-gray-300">―</span>
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-colors ${
              stage === 'complete' ? 'bg-[#F3E8FF] text-[#7014D9]' : 'text-gray-400'
            }`}
            data-tl="crm-import-step-complete"
          >
            4 Complete
          </span>
        </div>

        {/* Stage Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stage 1: Upload */}
          {stage === 'upload' && (
            <div className="flex flex-col gap-5">
              <div
                onClick={() => tl.setVar('crm:importStage', 'map')}
                className="border-2 border-dashed border-[#DDD6FE] hover:border-[#7014D9] bg-[#FAFAFE] rounded-2xl py-12 px-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                data-tl="crm-import-dropzone"
              >
                <div className="w-12 h-12 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7014D9] mb-3 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  Drag and drop a CSV or Excel file here, or browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  CSV, XLSX or XLS up to 50MB
                </p>
              </div>

              {/* Tips */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-xs text-gray-600">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/60">
                  <span className="font-bold text-gray-900">File preparation tips</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[#7014D9] font-medium hover:underline"
                    data-tl="crm-import-download-template"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download CSV template</span>
                  </button>
                </div>
                <ul className="space-y-1.5 text-gray-500 list-disc list-inside">
                  <li>Put column names in the first row. You choose what each column means in the next step.</li>
                  <li>Map a column to &quot;Pipeline Stage&quot; to place prospects in specific stages.</li>
                  <li>
                    Your stages: Event Leads, Lead, Proposal, Presentation, Awaiting Response, Interested, Not Interested, Integrating Systems, Negotiation, Growth, Lost, Won.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Stage 2: Map */}
          {stage === 'map' && (
            <div className="flex flex-col gap-4">
              {/* File Info Card */}
              <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] text-[#7014D9] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900" data-tl="crm-import-file-name">
                    prospects-import-sample1.csv
                  </h4>
                  <p className="text-[11px] text-gray-500">CSV · 788 B · 5 rows · 10 columns</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-900">Map file columns</h3>
                <p className="text-[11px] text-gray-500">
                  Choose Ignore, a prospect field, or Custom (rename) for every column.
                </p>
              </div>

              {/* Table with horizontal scroll */}
              <div className="border border-gray-200 rounded-xl overflow-x-auto" data-tl="crm-import-map-table">
                <table className="min-w-[900px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[10px] font-bold text-gray-600">
                      <th className="py-2.5 px-3 w-10">#</th>
                      <th className="py-2.5 px-3 min-w-[110px]">FIRST NAME</th>
                      <th className="py-2.5 px-3 min-w-[110px]">LAST NAME</th>
                      <th className="py-2.5 px-3 min-w-[140px]">EMAIL</th>
                      <th className="py-2.5 px-3 min-w-[110px]">PHONE</th>
                      <th className="py-2.5 px-3 min-w-[120px]">COMPANY</th>
                      <th className="py-2.5 px-3 min-w-[110px]">TITLE</th>
                      <th className="py-2.5 px-3 min-w-[90px]">SOURCE</th>
                      <th className="py-2.5 px-3 min-w-[110px]">STAGE</th>
                      <th className="py-2.5 px-3 min-w-[90px]">DEAL VALUE</th>
                      <th className="py-2.5 px-3 min-w-[120px]">NOTES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping Dropdowns Row */}
                    <tr className="bg-[#F0FDF4]/60 border-b border-gray-200">
                      <td className="py-2.5 px-3 font-semibold text-gray-700">Mapping</td>
                      {[
                        { id: 'first-name', label: 'First Name' },
                        { id: 'last-name', label: 'Last Name' },
                        { id: 'email', label: 'Email' },
                        { id: 'phone', label: 'Phone' },
                        { id: 'company', label: 'Company' },
                        { id: 'title', label: 'Title' },
                        { id: 'source', label: 'Source' },
                        { id: 'stage', label: 'Pipeline Stage' },
                        { id: 'value', label: 'Deal Value' },
                        { id: 'notes', label: 'Notes' },
                      ].map((col) => (
                        <td key={col.id} className="py-2 px-2">
                          <button
                            type="button"
                            onClick={() => tl.setVar('crm:activeMappingCol', col.id)}
                            className="w-full flex items-center justify-between px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-[#10B981] text-[#047857] text-[11px] font-medium shadow-2xs hover:bg-[#D1FAE5]"
                            data-tl={`crm-map-dropdown-${col.id}`}
                          >
                            <span>{col.label}</span>
                            <svg className="w-3 h-3 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </td>
                      ))}
                    </tr>

                    {/* Custom field Row */}
                    <tr className="border-b border-gray-100 text-gray-400 bg-white">
                      <td className="py-2 px-3 text-[11px] font-medium text-gray-600">Custom field</td>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <td key={i} className="py-2 px-3 text-center">―</td>
                      ))}
                    </tr>

                    {/* Sample Data Rows */}
                    {CSV_IMPORT_RECORDS.map((row) => (
                      <tr key={row.rowNum} className="border-b border-gray-50 text-[11px] text-gray-600 hover:bg-gray-50/50">
                        <td className="py-2 px-3 text-gray-400">{row.rowNum}</td>
                        <td className="py-2 px-3 font-medium text-gray-800">{row.firstName}</td>
                        <td className="py-2 px-3 font-medium text-gray-800">{row.lastName}</td>
                        <td className="py-2 px-3 text-gray-500">{row.email}</td>
                        <td className="py-2 px-3 text-gray-500">{row.phone}</td>
                        <td className="py-2 px-3 text-gray-600">{row.company}</td>
                        <td className="py-2 px-3 text-gray-600">{row.title}</td>
                        <td className="py-2 px-3 text-gray-600">{row.source}</td>
                        <td className="py-2 px-3 text-gray-600">{row.stage}</td>
                        <td className="py-2 px-3 text-gray-600">{row.dealValue}</td>
                        <td className="py-2 px-3 text-gray-500">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs font-semibold text-gray-700" data-tl="crm-import-status">
                10 of 10 columns mapped.
              </div>
            </div>
          )}

          {/* Stage 3: Review */}
          {stage === 'review' && (
            <div className="flex flex-col gap-4">
              {/* File Info Card */}
              <div className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] text-[#7014D9] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">prospects-import-sample1.csv</h4>
                  <p className="text-[11px] text-gray-500">CSV · 788 B · 5 rows · 10 columns</p>
                </div>
              </div>

              {/* 3 Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 flex flex-col items-center justify-center text-center"
                  data-tl="crm-review-card-ready"
                >
                  <span className="text-2xl font-bold text-[#059669]">5</span>
                  <span className="text-xs font-medium text-[#059669] mt-0.5">Ready to import</span>
                </div>
                <div
                  className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3.5 flex flex-col items-center justify-center text-center"
                  data-tl="crm-review-card-skipped"
                >
                  <span className="text-2xl font-bold text-[#DC2626]">0</span>
                  <span className="text-xs font-medium text-[#DC2626] mt-0.5">Will be skipped (errors)</span>
                </div>
                <div
                  className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 flex flex-col items-center justify-center text-center"
                  data-tl="crm-review-card-unrecognised"
                >
                  <span className="text-2xl font-bold text-[#D97706]">4</span>
                  <span className="text-xs font-medium text-[#D97706] mt-0.5">Stage not recognised</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500">
                Duplicates (same email or phone as an existing contact) are skipped automatically. Unrecognised stages fall back to the first stage.
              </p>

              {/* Review Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden" data-tl="crm-import-review-table">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[10px] font-bold text-gray-500">
                      <th className="py-2.5 px-3 w-8">#</th>
                      <th className="py-2.5 px-3">NAME</th>
                      <th className="py-2.5 px-3">EMAIL</th>
                      <th className="py-2.5 px-3">PHONE</th>
                      <th className="py-2.5 px-3">COMPANY</th>
                      <th className="py-2.5 px-3">STAGE</th>
                      <th className="py-2.5 px-3">COMMENT</th>
                      <th className="py-2.5 px-3">ISSUES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[11px]">
                    {CSV_IMPORT_RECORDS.map((row) => (
                      <tr key={row.rowNum} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 text-gray-400">{row.rowNum}</td>
                        <td className="py-2.5 px-3 font-semibold text-gray-900">{row.name}</td>
                        <td className="py-2.5 px-3 text-gray-500 truncate max-w-[130px]">{row.email}</td>
                        <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{row.phone}</td>
                        <td className="py-2.5 px-3 text-gray-600">{row.company}</td>
                        <td className="py-2.5 px-3 font-medium text-gray-700">{row.stage}</td>
                        <td className="py-2.5 px-3 text-gray-400">―</td>
                        <td className="py-2.5 px-3 text-[#D97706] font-medium text-[10.5px]">
                          {row.issueText ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stage 4: Complete */}
          {stage === 'complete' && (
            <div className="py-8 flex flex-col items-center justify-center text-center" data-tl="crm-import-complete-pane">
              <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900" data-tl="crm-import-complete-title">
                Import Complete
              </h3>

              <div className="flex items-center gap-8 mt-5">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#16A34A]">5</span>
                  <span className="text-xs text-gray-500 mt-0.5">Created</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#D97706]">0</span>
                  <span className="text-xs text-gray-500 mt-0.5">Skipped (duplicates)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#2563EB]">1</span>
                  <span className="text-xs text-gray-500 mt-0.5">Placed in a stage</span>
                </div>
              </div>

              <p className="text-xs text-[#D97706] font-medium mt-4">
                4 had a stage name that doesn&apos;t exist and were put in the first stage.
              </p>

              <button
                type="button"
                onClick={onFinishImport}
                className="mt-6 px-8 py-2 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs transition-colors"
                data-tl="crm-import-done-btn"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer for Stages 1, 2, 3 */}
        {stage !== 'complete' && (
          <div className="px-6 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
            {stage === 'upload' ? (
              <div />
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (stage === 'map') tl.setVar('crm:importStage', 'upload');
                  if (stage === 'review') tl.setVar('crm:importStage', 'map');
                }}
                className="text-gray-600 hover:text-gray-900 font-semibold"
                data-tl="crm-import-back-btn"
              >
                ← Back
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 border border-gray-200 rounded-full font-semibold text-gray-700 bg-white hover:bg-gray-50"
                data-tl="crm-import-cancel-btn"
              >
                Cancel
              </button>

              {stage === 'map' && (
                <button
                  type="button"
                  onClick={() => tl.setVar('crm:importStage', 'review')}
                  className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full font-semibold shadow-xs"
                  data-tl="crm-import-review-btn"
                >
                  Review import →
                </button>
              )}

              {stage === 'review' && (
                <button
                  type="button"
                  onClick={() => tl.setVar('crm:importStage', 'complete')}
                  className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full font-semibold shadow-xs"
                  data-tl="crm-import-submit-btn"
                >
                  Import 5 prospects
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
