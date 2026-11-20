"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import {
  Calendar,
  ChevronDown,
} from "lucide-react";
import {
  SYSTEM_ADMIN_OVERVIEW_KPIS,
  SYSTEM_ADMIN_REP_PERFORMANCE,
} from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmSystemAdminOverviewView({ tl }: Props) {
  void tl;
  return (
    <div
      data-scroller
      className="no-scrollbar flex h-full flex-col overflow-y-auto bg-[#F8F9FA] p-6"
    >
      {/* Header */}
      <div
        data-tl="crm-sys-overview-header"
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
            Analytics
          </h1>
          <p className="text-[13px] text-[#6B7280]">
            Performance across all salesperson CRMs
          </p>
        </div>

        {/* Date Filter Pill */}
        <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#374151] shadow-2xs">
          <Calendar size={15} className="text-[#6B7280]" />
          <span>Last 30 days</span>
          <ChevronDown size={14} className="text-[#9CA3AF]" />
        </div>
      </div>

      {/* 8 KPI Cards (4 columns x 2 rows) */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {SYSTEM_ADMIN_OVERVIEW_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            data-tl={`crm-sys-kpi-${kpi.id}`}
            className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              {kpi.label}
            </div>
            <div className="mt-2 text-[26px] font-bold text-[#111111]">
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Performance by Salesperson Table */}
      <div
        data-tl="crm-sys-rep-table"
        className="rounded-[16px] border border-[#ECECF1] bg-white p-5 shadow-2xs"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#111111]">
              Performance by Salesperson
            </h2>
            <p className="text-[12px] text-[#6B7280]">
              Key metrics broken down per sales rep
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECECF1] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                <th className="pb-3 font-semibold">REP</th>
                <th className="pb-3 text-center font-semibold">CONTACTS</th>
                <th className="pb-3 text-center font-semibold">DEALS WON</th>
                <th className="pb-3 text-center font-semibold">OPEN DEALS</th>
                <th className="pb-3 text-center font-semibold">REVENUE</th>
                <th className="pb-3 text-center font-semibold">ACTIVITIES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {SYSTEM_ADMIN_REP_PERFORMANCE.map((rep) => (
                <tr
                  key={rep.id}
                  data-tl={`crm-sys-rep-row-${rep.id}`}
                  className="hover:bg-[#F9FAFB]"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[12px] font-bold text-[#7C3AED]">
                        {rep.initials}
                      </div>
                      <span className="font-medium text-[#111111]">{rep.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center font-medium text-[#374151]">
                    {rep.contacts}
                  </td>
                  <td className="py-3 text-center font-medium text-[#374151]">
                    {rep.dealsWon}
                  </td>
                  <td className="py-3 text-center font-medium text-[#374151]">
                    {rep.openDeals}
                  </td>
                  <td className="py-3 text-center font-semibold text-[#111111]">
                    {rep.revenue}
                  </td>
                  <td className="py-3 text-center font-medium text-[#374151]">
                    {rep.activities}
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
