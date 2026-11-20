'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  REPORT_SAMPLE_RECORDS,
  REPORT_DATA_SOURCES,
  REPORT_SORT_FIELDS,
  REPORT_COLUMNS,
  REPORT_GROUP_BY_OPTIONS,
  type CrmReportRecord,
} from './crm-data';
import {
  FileText,
  Calendar,
  ChevronDown,
  Table as TableIcon,
  BarChart2,
  PieChart,
  TrendingUp,
  Plus,
  X,
  Play,
  Save,
  Download,
} from 'lucide-react';

interface Props {
  tl: Timeline;
}

export function CrmReportsView({ tl }: Props) {
  const reportType = useTimelineVar<string>(tl, 'crm:reportType', 'Standard');
  const dataSource = useTimelineVar<string>(tl, 'crm:reportDataSource', 'Contacts');
  const sortBy = useTimelineVar<string>(tl, 'crm:reportSortBy', 'Created Date');
  const sortOrder = useTimelineVar<string>(tl, 'crm:reportSortOrder', 'Newest first');
  const maxResults = useTimelineVar<number>(tl, 'crm:reportMaxResults', 50);
  const selectedColumns = useTimelineVar<string[]>(tl, 'crm:reportSelectedColumns', [
    'First Name',
    'Last Name',
    'Email',
    'Status',
    'Source',
    'Phone',
    'Country',
  ]);
  const groupBy = useTimelineVar<string>(tl, 'crm:reportGroupBy', 'None');
  const visualization = useTimelineVar<string>(tl, 'crm:reportVisualization', 'Table');
  const hasFilter = useTimelineVar<boolean>(tl, 'crm:reportHasFilter', false);
  const filterField = useTimelineVar<string>(tl, 'crm:reportFilterField', 'Status');
  const filterOp = useTimelineVar<string>(tl, 'crm:reportFilterOp', 'equals');
  const filterVal = useTimelineVar<string>(tl, 'crm:reportFilterVal', '');
  const hasRunReport = useTimelineVar<boolean>(tl, 'crm:reportHasRun', false);

  const handleRunReport = () => {
    tl.setVar('crm:reportHasRun', true);
  };

  const handleAddFilter = () => {
    tl.setVar('crm:reportHasFilter', true);
  };

  const handleRemoveFilter = () => {
    tl.setVar('crm:reportHasFilter', false);
  };

  const handleToggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      tl.setVar(
        'crm:reportSelectedColumns',
        selectedColumns.filter((c) => c !== col)
      );
    } else {
      tl.setVar('crm:reportSelectedColumns', [...selectedColumns, col]);
    }
  };

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case 'closed_won':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {label}
          </span>
        );
      case 'proposal':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            {label}
          </span>
        );
      case 'lead':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {label}
          </span>
        );
      case 'event_leads':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            {label}
          </span>
        );
    }
  };

  return (
    <div
      data-tl="crm-reports-view"
      className="flex-1 flex min-w-0 bg-[#F8FAFC] overflow-hidden text-[#111111]"
    >
      {/* Left Panel: Saved Reports */}
      <aside
        data-tl="crm-saved-reports-panel"
        className="w-64 shrink-0 border-r border-[#ECECF1] flex flex-col bg-white p-4 select-none"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h2 className="font-bold text-sm text-[#111111]">Saved Reports</h2>
          <span className="text-[11px] font-semibold text-gray-400">0</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-2.5">
            <FileText size={18} />
          </div>
          <p className="text-xs font-semibold text-gray-700">No saved reports yet</p>
          <p className="text-[11px] text-gray-400 mt-1">
            Build and save custom reports to access them quickly here
          </p>
        </div>
      </aside>

      {/* Main Workspace: Report Builder */}
      <main
        data-tl="crm-report-builder-workspace"
        className="flex-1 p-6 overflow-y-auto space-y-6"
      >
        {/* Workspace Top Header */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#111111]">Report Builder</h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Create custom reports from your CRM data
            </p>
          </div>

          <button
            type="button"
            data-tl="crm-report-schedule-btn"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar size={14} className="text-[#6B7280]" />
            <span>Schedule Delivery</span>
          </button>
        </div>

        {/* Report Type Selectors */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECECF1] rounded-2xl w-fit shadow-2xs">
          {['Standard', 'Matrix/Pivot', 'Date Comparison', 'With Formulas'].map((type) => (
            <button
              key={type}
              type="button"
              data-tl={`crm-report-type-${type.toLowerCase().replace(/[\/\s]+/g, '-')}`}
              onClick={() => tl.setVar('crm:reportType', type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                reportType === type
                  ? 'bg-[#F3ECFC] text-[#7014D9] shadow-2xs'
                  : 'text-[#4B5563] hover:text-[#111111] hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Report Configuration Card */}
        <div
          data-tl="crm-report-config-card"
          className="bg-white rounded-2xl border border-[#ECECF1] p-5 shadow-2xs space-y-5"
        >
          {/* Row 1: 4 fields grid */}
          <div className="grid grid-cols-4 gap-4 text-xs">
            {/* Data Source */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Data Source</label>
              <div className="relative">
                <select
                  value={dataSource}
                  onChange={(e) => tl.setVar('crm:reportDataSource', e.target.value)}
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                  data-tl="crm-report-data-source"
                >
                  {REPORT_DATA_SOURCES.map((ds) => (
                    <option key={ds} value={ds}>
                      {ds}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => tl.setVar('crm:reportSortBy', e.target.value)}
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                  data-tl="crm-report-sort-by"
                >
                  {REPORT_SORT_FIELDS.map((sf) => (
                    <option key={sf} value={sf}>
                      {sf}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Order */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Order</label>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => tl.setVar('crm:reportSortOrder', e.target.value)}
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                  data-tl="crm-report-order"
                >
                  <option value="Newest first">Newest first</option>
                  <option value="Oldest first">Oldest first</option>
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Max Results */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Max Results</label>
              <div className="relative">
                <select
                  value={maxResults}
                  onChange={(e) => tl.setVar('crm:reportMaxResults', Number(e.target.value))}
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                  data-tl="crm-report-max-results"
                >
                  {[25, 50, 100, 250, 500].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Columns Chips */}
          <div>
            <label className="block font-medium text-xs text-[#374151] mb-2">Columns</label>
            <div data-tl="crm-report-columns-chips" className="flex flex-wrap gap-1.5">
              {REPORT_COLUMNS.map((col) => {
                const isSelected = selectedColumns.includes(col);
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => handleToggleColumn(col)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-[#F3ECFC] text-[#7014D9] border-[#DDD6FE]'
                        : 'bg-white text-gray-600 border-[#E5E7EB] hover:bg-gray-50'
                    }`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Group By & Visualization */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-gray-100">
            {/* Group By */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Group By</label>
              <div className="relative">
                <select
                  value={groupBy}
                  onChange={(e) => tl.setVar('crm:reportGroupBy', e.target.value)}
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#111111] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-8"
                  data-tl="crm-report-group-by"
                >
                  {REPORT_GROUP_BY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Visualization */}
            <div>
              <label className="block font-medium text-[#374151] mb-1.5">Visualization</label>
              <div
                data-tl="crm-report-viz-selector"
                className="flex items-center gap-1 p-1 bg-gray-50 border border-[#E5E7EB] rounded-xl"
              >
                <button
                  type="button"
                  data-tl="crm-report-viz-table"
                  onClick={() => tl.setVar('crm:reportVisualization', 'Table')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    visualization === 'Table'
                      ? 'bg-white text-[#7014D9] shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TableIcon size={13} />
                  <span>Table</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-report-viz-bar"
                  onClick={() => tl.setVar('crm:reportVisualization', 'Bar')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    visualization === 'Bar'
                      ? 'bg-white text-[#7014D9] shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart2 size={13} />
                  <span>Bar</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-report-viz-pie"
                  onClick={() => tl.setVar('crm:reportVisualization', 'Pie')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    visualization === 'Pie'
                      ? 'bg-white text-[#7014D9] shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <PieChart size={13} />
                  <span>Pie</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-report-viz-line"
                  onClick={() => tl.setVar('crm:reportVisualization', 'Line')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    visualization === 'Line'
                      ? 'bg-white text-[#7014D9] shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TrendingUp size={13} />
                  <span>Line</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 4: Filters */}
          <div className="pt-1 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block font-medium text-xs text-[#374151]">Filters</label>
              {!hasFilter && (
                <button
                  type="button"
                  data-tl="crm-report-add-filter-btn"
                  onClick={handleAddFilter}
                  className="flex items-center gap-1 text-xs text-[#7014D9] font-semibold hover:underline cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add filter</span>
                </button>
              )}
            </div>

            {hasFilter && (
              <div
                data-tl="crm-report-filter-row"
                className="flex items-center gap-3 p-2.5 bg-gray-50/70 border border-[#E5E7EB] rounded-xl text-xs"
              >
                {/* Filter Field */}
                <div className="relative w-40">
                  <select
                    value={filterField}
                    onChange={(e) => tl.setVar('crm:reportFilterField', e.target.value)}
                    className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-6"
                    data-tl="crm-report-filter-field"
                  >
                    <option value="Status">Status</option>
                    <option value="Source">Source</option>
                    <option value="Country">Country</option>
                    <option value="Company">Company</option>
                  </select>
                  <ChevronDown size={13} className="text-gray-400 absolute right-2 top-2 pointer-events-none" />
                </div>

                {/* Filter Operator */}
                <div className="relative w-32">
                  <select
                    value={filterOp}
                    onChange={(e) => tl.setVar('crm:reportFilterOp', e.target.value)}
                    className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer pr-6"
                    data-tl="crm-report-filter-op"
                  >
                    <option value="equals">equals</option>
                    <option value="contains">contains</option>
                    <option value="starts_with">starts with</option>
                  </select>
                  <ChevronDown size={13} className="text-gray-400 absolute right-2 top-2 pointer-events-none" />
                </div>

                {/* Filter Value Input */}
                <input
                  type="text"
                  value={filterVal}
                  onChange={(e) => tl.setVar('crm:reportFilterVal', e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-[#7014D9]"
                  data-tl="crm-report-filter-val"
                />

                {/* Remove Filter */}
                <button
                  type="button"
                  data-tl="crm-report-filter-remove"
                  onClick={handleRemoveFilter}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                  title="Remove filter"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              data-tl="crm-run-report-btn"
              onClick={handleRunReport}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5E10B8] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Play size={13} className="fill-white" />
              <span>Run Report</span>
            </button>

            {hasRunReport && (
              <>
                <button
                  type="button"
                  data-tl="crm-report-save-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E5E7EB] text-[#374151] font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <Save size={13} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-report-export-csv-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E5E7EB] text-[#374151] font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  data-tl="crm-report-export-pdf-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E5E7EB] text-[#374151] font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export PDF</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Results Table Card (shows after Run Report) */}
        {hasRunReport && (
          <div
            data-tl="crm-report-results-card"
            className="bg-white rounded-2xl border border-[#ECECF1] p-5 shadow-2xs space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-sm text-[#111111]">Results</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                  7 records
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table
                data-tl="crm-report-results-table"
                className="w-full text-left text-xs divide-y divide-gray-100"
              >
                <thead className="bg-[#F8FAFC] text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-2.5">First Name</th>
                    <th className="px-4 py-2.5">Last Name</th>
                    <th className="px-4 py-2.5">Email</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5">Source</th>
                    <th className="px-4 py-2.5">Phone</th>
                    <th className="px-4 py-2.5">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {REPORT_SAMPLE_RECORDS.map((rec: CrmReportRecord) => (
                    <tr key={rec.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{rec.firstName}</td>
                      <td className="px-4 py-3 text-gray-700">{rec.lastName}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-[11px]">{rec.email}</td>
                      <td className="px-4 py-3">{getStatusBadge(rec.status, rec.statusLabel)}</td>
                      <td className="px-4 py-3 text-gray-600">{rec.source}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-[11px]">{rec.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{rec.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
