'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  ANALYTICS_KPIS,
  ANALYTICS_DATE_OPTIONS,
  type CrmAnalyticsKpi,
} from './crm-data';
import {
  Users,
  Target,
  Trophy,
  TrendingUp,
  Mail,
  Activity,
  Calendar,
  ChevronDown,
  BarChart3,
  Check,
} from 'lucide-react';

interface Props {
  tl: Timeline;
}

export function CrmAnalyticsView({ tl }: Props) {
  const selectedDateFilter = useTimelineVar<string>(
    tl,
    'crm:analyticsDateFilter',
    'Last 30 days'
  );
  const isDateMenuOpen = useTimelineVar<boolean>(tl, 'crm:isAnalyticsDateOpen', false);

  const getKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-4 h-4 text-[#7014D9]" />;
      case 'target':
        return <Target className="w-4 h-4 text-blue-600" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'trendingUp':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'mail':
        return <Mail className="w-4 h-4 text-indigo-500" />;
      case 'activity':
      default:
        return <Activity className="w-4 h-4 text-rose-500" />;
    }
  };

  const handleToggleDateMenu = () => {
    tl.setVar('crm:isAnalyticsDateOpen', !isDateMenuOpen);
  };

  const handleSelectDateOption = (option: string) => {
    tl.setVar('crm:analyticsDateFilter', option);
    tl.setVar('crm:isAnalyticsDateOpen', false);
  };

  return (
    <div
      className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto text-[#111111] p-6 space-y-6"
      data-tl="crm-analytics-view"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#111111]">Analytics</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Track performance, identify trends, and make data-driven decisions
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            onClick={handleToggleDateMenu}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#374151] hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
            data-tl="crm-analytics-date-filter"
          >
            <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>{selectedDateFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </button>

          {isDateMenuOpen && (
            <div
              className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
              data-tl="crm-analytics-date-menu"
            >
              {ANALYTICS_DATE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectDateOption(opt)}
                  className="w-full text-left px-3.5 py-1.5 text-xs text-[#374151] hover:bg-[#F3ECFC] hover:text-[#7014D9] flex items-center justify-between transition-colors cursor-pointer"
                  data-tl={`crm-analytics-date-opt-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span>{opt}</span>
                  {selectedDateFilter === opt && (
                    <Check className="w-3.5 h-3.5 text-[#7014D9]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 shrink-0"
        data-tl="crm-analytics-kpi-grid"
      >
        {ANALYTICS_KPIS.map((kpi: CrmAnalyticsKpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-[16px] border border-[#ECECF1] p-3.5 shadow-2xs flex flex-col justify-between space-y-2 hover:border-[#D1D5DB] transition-colors"
            data-tl={`crm-kpi-${kpi.id}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B7280]">{kpi.label}</span>
              <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center">
                {getKpiIcon(kpi.icon)}
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xl font-bold text-[#111111]">{kpi.value}</span>
              {kpi.badge && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    kpi.isPositive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {kpi.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4 Performance Charts Grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 pb-4"
        data-tl="crm-analytics-charts-grid"
      >
        {/* Chart 1: Conversion Rate Over Time */}
        <div
          className="bg-white rounded-[16px] border border-[#ECECF1] p-4 shadow-2xs flex flex-col justify-between"
          data-tl="crm-chart-conversion"
        >
          <div>
            <h3 className="font-semibold text-xs text-[#111111]">Conversion Rate Over Time</h3>
            <p className="text-[11px] text-[#6B7280]">Deals won vs created per period</p>
          </div>

          <div className="h-44 w-full relative pt-4 flex flex-col justify-end">
            <svg viewBox="0 0 400 120" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7014D9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7014D9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#F1F5F9" strokeWidth="1" />

              {/* Area */}
              <polygon
                points="40,95 180,70 340,30 340,110 40,110"
                fill="url(#purpleGrad)"
              />
              {/* Line */}
              <polyline
                fill="none"
                stroke="#7014D9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,95 180,70 340,30"
              />
              {/* Points */}
              <circle cx="40" cy="95" r="3.5" fill="#FFFFFF" stroke="#7014D9" strokeWidth="2" />
              <circle cx="180" cy="70" r="3.5" fill="#FFFFFF" stroke="#7014D9" strokeWidth="2" />
              <circle cx="340" cy="30" r="3.5" fill="#FFFFFF" stroke="#7014D9" strokeWidth="2" />
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between px-8 text-[11px] text-[#9CA3AF] border-t border-[#F1F5F9] pt-2">
              <span>W45</span>
              <span>W46</span>
              <span>W47</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Contact Growth */}
        <div
          className="bg-white rounded-[16px] border border-[#ECECF1] p-4 shadow-2xs flex flex-col justify-between"
          data-tl="crm-chart-contact-growth"
        >
          <div>
            <h3 className="font-semibold text-xs text-[#111111]">Contact Growth</h3>
            <p className="text-[11px] text-[#6B7280]">New contacts added over time</p>
          </div>

          <div className="h-44 w-full flex flex-col justify-end">
            <div className="flex items-end justify-around h-28 px-12 pb-1">
              {/* Bar 1 */}
              <div className="flex flex-col items-center gap-1.5 w-12">
                <span className="text-[10px] font-semibold text-[#7014D9]">4</span>
                <div className="w-8 h-10 bg-[#EDE9FE] rounded-t-lg transition-all" />
              </div>

              {/* Bar 2 */}
              <div className="flex flex-col items-center gap-1.5 w-12">
                <span className="text-[10px] font-semibold text-[#7014D9]">9</span>
                <div className="w-8 h-18 bg-[#DDD6FE] rounded-t-lg transition-all" />
              </div>

              {/* Bar 3 */}
              <div className="flex flex-col items-center gap-1.5 w-12">
                <span className="text-[10px] font-semibold text-[#7014D9]">23</span>
                <div className="w-8 h-24 bg-[#7014D9] rounded-t-lg transition-all shadow-xs" />
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-around px-8 text-[11px] text-[#9CA3AF] border-t border-[#F1F5F9] pt-2">
              <span>W45</span>
              <span>W46</span>
              <span>W47</span>
            </div>
          </div>
        </div>

        {/* Chart 3: Pipeline Value Trending */}
        <div
          className="bg-white rounded-[16px] border border-[#ECECF1] p-4 shadow-2xs flex flex-col justify-between"
          data-tl="crm-chart-pipeline-trending"
        >
          <div>
            <h3 className="font-semibold text-xs text-[#111111]">Pipeline Value Trending</h3>
            <p className="text-[11px] text-[#6B7280]">Deal value created over time</p>
          </div>

          <div className="h-44 w-full relative pt-4 flex flex-col justify-end">
            <svg viewBox="0 0 400 120" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#F1F5F9" strokeWidth="1" />

              <polygon
                points="40,85 180,60 340,25 340,110 40,110"
                fill="url(#amberGrad)"
              />
              <polyline
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,85 180,60 340,25"
              />
              <circle cx="40" cy="85" r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="180" cy="60" r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="340" cy="25" r="3.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            </svg>

            <div className="flex justify-between px-8 text-[11px] text-[#9CA3AF] border-t border-[#F1F5F9] pt-2">
              <span>W45</span>
              <span>W46</span>
              <span>W47</span>
            </div>
          </div>
        </div>

        {/* Chart 4: Activity Breakdown */}
        <div
          className="bg-white rounded-[16px] border border-[#ECECF1] p-4 shadow-2xs flex flex-col justify-between"
          data-tl="crm-chart-activity-breakdown"
        >
          <div>
            <h3 className="font-semibold text-xs text-[#111111]">Activity Breakdown</h3>
            <p className="text-[11px] text-[#6B7280]">Activities by type this period</p>
          </div>

          <div className="h-44 w-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#9CA3AF] mb-2">
              <BarChart3 className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-[#4B5563]">No data for this period</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5">
              Completed calls, emails, and meetings will display here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
