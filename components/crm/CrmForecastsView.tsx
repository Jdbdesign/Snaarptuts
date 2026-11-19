'use client';

import React from 'react';
import {
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  Plus,
  Trash2,
  DollarSign,
} from 'lucide-react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  FORECAST_STAGES,
  FORECAST_REPS,
  PIPELINE_RISK_DEALS,
  type TargetItem,
} from './crm-data';

interface Props {
  tl: Timeline;
  onOpenNewTarget?: () => void;
}

export function CrmForecastsView({ tl, onOpenNewTarget }: Props) {
  const activeTab = useTimelineVar<'pipeline' | 'by-rep' | 'targets' | 'risk'>(
    tl,
    'crm:forecastTab',
    'pipeline'
  );
  const targets = useTimelineVar<TargetItem[]>(tl, 'crm:targets', []);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F8F9FA] p-6 text-[#111111]">
      {/* Page Header */}
      <div className="flex flex-col gap-1 pb-4">
        <h1 className="text-[20px] font-bold text-[#111111]">Sales Forecasting</h1>
        <p className="text-[13px] text-[#6B7280]">
          Weighted pipeline, per-rep forecasts, quota tracking and at-risk deals.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] mb-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            data-tl="crm-forecast-tab-pipeline"
            onClick={() => tl.setVar('crm:forecastTab', 'pipeline')}
            className={`flex items-center gap-2 pb-3 text-[13px] font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'pipeline'
                ? 'border-[#7014D9] text-[#7014D9] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <TrendingUp size={15} />
            <span>Weighted Pipeline</span>
          </button>

          <button
            type="button"
            data-tl="crm-forecast-tab-by-rep"
            onClick={() => tl.setVar('crm:forecastTab', 'by-rep')}
            className={`flex items-center gap-2 pb-3 text-[13px] font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'by-rep'
                ? 'border-[#7014D9] text-[#7014D9] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <Users size={15} />
            <span>By Rep</span>
          </button>

          <button
            type="button"
            data-tl="crm-forecast-tab-targets"
            onClick={() => tl.setVar('crm:forecastTab', 'targets')}
            className={`flex items-center gap-2 pb-3 text-[13px] font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'targets'
                ? 'border-[#7014D9] text-[#7014D9] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <Target size={15} />
            <span>Targets</span>
          </button>

          <button
            type="button"
            data-tl="crm-forecast-tab-pipeline-risk"
            onClick={() => tl.setVar('crm:forecastTab', 'risk')}
            className={`flex items-center gap-2 pb-3 text-[13px] font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'risk'
                ? 'border-[#7014D9] text-[#7014D9] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <AlertTriangle size={15} />
            <span>Pipeline Risk</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Weighted Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="flex flex-col gap-6" data-tl="crm-forecast-pipeline-content">
          {/* 3 KPI Cards */}
          <div className="grid grid-cols-3 gap-5" data-tl="crm-forecast-kpis">
            <div className="flex flex-col gap-2 rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
                <DollarSign size={14} />
                <span>Total Pipeline</span>
              </div>
              <div className="text-[28px] font-bold text-[#111111]">£36.4k</div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
                <TrendingUp size={14} />
                <span>Weighted Forecast</span>
              </div>
              <div className="text-[28px] font-bold text-[#7014D9]">£3.0k</div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
                <Target size={14} />
                <span>Quota Attainment</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-[#111111]">0%</span>
                <span className="text-[12px] text-[#9CA3AF]">£0 of £0</span>
              </div>
            </div>
          </div>

          {/* Pipeline by Stage Card */}
          <div className="flex flex-col rounded-2xl border border-[#ECECF1] bg-white p-6 shadow-xs" data-tl="crm-forecast-stages">
            <h3 className="text-[15px] font-bold text-[#111111] mb-5">Pipeline by stage</h3>
            <div className="flex flex-col gap-4">
              {FORECAST_STAGES.map((s) => (
                <div key={s.stage} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="text-[#374151]">
                      <span className="font-medium text-[#111111]">{s.stage}</span> · {s.probability} · {s.dealsCount} deals
                    </span>
                    <span className="text-[#6B7280] font-mono text-[12px]">
                      {s.pipelineValue} → <span className="font-semibold text-[#111111]">{s.weightedValue}</span>
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-4 w-full rounded-full bg-[#F3F4F6] overflow-hidden">
                    {s.barWidthPercent > 0 && (
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${s.barWidthPercent}%`,
                          backgroundColor: s.barColor,
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: By Rep */}
      {activeTab === 'by-rep' && (
        <div className="rounded-2xl border border-[#ECECF1] bg-white overflow-hidden shadow-xs" data-tl="crm-forecast-reps-content">
          <table className="w-full text-left text-[13px]" data-tl="crm-forecast-reps-table">
            <thead>
              <tr className="border-b border-[#ECECF1] bg-[#F9FAFB] text-[11px] font-semibold tracking-wider text-[#6B7280]">
                <th className="py-3 px-5">REP</th>
                <th className="py-3 px-4">OPEN DEALS</th>
                <th className="py-3 px-4">PIPELINE</th>
                <th className="py-3 px-4">WEIGHTED</th>
                <th className="py-3 px-4">WON (YTD)</th>
                <th className="py-3 px-4">TARGET</th>
                <th className="py-3 px-5">ATTAINMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECECF1]">
              {FORECAST_REPS.map((rep) => (
                <tr key={rep.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#111111]">{rep.name}</span>
                      {rep.email && <span className="text-[11px] text-[#6B7280]">{rep.email}</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#374151]">{rep.openDeals}</td>
                  <td className="py-3 px-4 font-semibold text-[#111111]">{rep.pipeline}</td>
                  <td className="py-3 px-4 font-semibold text-[#7014D9]">{rep.weighted}</td>
                  <td className="py-3 px-4 text-[#374151]">{rep.wonYtd}</td>
                  <td className="py-3 px-4 text-[#9CA3AF]">{rep.target}</td>
                  <td className="py-3 px-5 text-[#6B7280]">{rep.attainment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Targets */}
      {activeTab === 'targets' && (
        <div className="flex flex-col gap-4" data-tl="crm-forecast-targets-content">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#6B7280]">
              Set revenue quotas per period. Leave the rep blank for an org-wide target.
            </p>
            <button
              type="button"
              data-tl="crm-btn-new-target"
              onClick={onOpenNewTarget}
              className="flex items-center gap-1.5 h-9 rounded-full bg-[#7014D9] px-4 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus size={15} />
              <span>New Target</span>
            </button>
          </div>

          {targets.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D1D5DB] bg-white p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3ECFC] text-[#7014D9] mb-3">
                <Target size={24} />
              </div>
              <h3 className="text-[16px] font-bold text-[#111111]">No sales targets set</h3>
              <p className="text-[13px] text-[#6B7280] max-w-[380px] mt-1 mb-5">
                Targets drive quota attainment on the overview and per-rep tabs.
              </p>
              <button
                type="button"
                data-tl="crm-target-empty-create-btn"
                onClick={onOpenNewTarget}
                className="flex items-center gap-1.5 h-9 rounded-full bg-[#7014D9] px-5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <span>Create a target</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#ECECF1] bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#ECECF1] bg-[#F9FAFB] text-[11px] font-semibold tracking-wider text-[#6B7280]">
                    <th className="py-3 px-5">SCOPE</th>
                    <th className="py-3 px-4">PERIOD</th>
                    <th className="py-3 px-4">REVENUE TARGET</th>
                    <th className="py-3 px-4">DEAL TARGET</th>
                    <th className="py-3 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECECF1]">
                  {targets.map((t: TargetItem) => (
                    <tr key={t.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-[#111111]">{t.scope}</td>
                      <td className="py-3.5 px-4 text-[#374151]">{t.period}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#111111]">{t.revenueTarget}</td>
                      <td className="py-3.5 px-4 text-[#9CA3AF]">{t.dealTarget}</td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          className="p-1 rounded-lg text-[#EF4444] hover:bg-[#FEF2F2]"
                          title="Delete target"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Pipeline Risk */}
      {activeTab === 'risk' && (
        <div className="flex flex-col gap-6" data-tl="crm-forecast-risk-content">
          {/* 2 KPI Cards */}
          <div className="grid grid-cols-2 gap-5 max-w-[600px]">
            <div className="flex flex-col gap-2 rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
                <AlertTriangle size={14} className="text-[#F59E0B]" />
                <span>Deals at risk</span>
              </div>
              <div className="text-[28px] font-bold text-[#111111]">7</div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-[#ECECF1] bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
                <DollarSign size={14} />
                <span>Value at risk</span>
              </div>
              <div className="text-[28px] font-bold text-[#111111]">£0</div>
            </div>
          </div>

          {/* Risk Table */}
          <div className="rounded-2xl border border-[#ECECF1] bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left text-[13px]" data-tl="crm-risk-deals-table">
              <thead>
                <tr className="border-b border-[#ECECF1] bg-[#F9FAFB] text-[11px] font-semibold tracking-wider text-[#6B7280]">
                  <th className="py-3 px-5">DEAL</th>
                  <th className="py-3 px-4">STAGE</th>
                  <th className="py-3 px-4">VALUE</th>
                  <th className="py-3 px-4">IDLE</th>
                  <th className="py-3 px-5">REASON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECF1]">
                {PIPELINE_RISK_DEALS.map((d) => (
                  <tr key={d.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3 px-5 font-semibold text-[#111111]">{d.deal}</td>
                    <td className="py-3 px-4 text-[#374151]">{d.stage}</td>
                    <td className="py-3 px-4 text-[#111111]">{d.value}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{d.idle}</td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#D97706]">
                        {d.reason}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
