"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { Pause } from "lucide-react";

interface Props {
  tl?: Timeline;
  onExit: () => void;
}

export function CrmTvModeView({ onExit }: Props) {
  return (
    <div
      data-tl="crm-tv-mode-view"
      className="absolute inset-0 z-40 flex flex-col overflow-y-auto bg-[#581C87] p-6 text-white animate-in fade-in duration-200"
    >
      {/* TV Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-white">Client Leads</h1>
          <p className="text-[12px] text-[#E9D5FF]">
            Auto-refreshing · 11/19/2026, 2:27:06 AM
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="crm-tv-pause-btn"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            <Pause size={14} />
          </button>
          <button
            type="button"
            data-tl="crm-btn-exit-tv-mode"
            onClick={onExit}
            className="rounded-full bg-[#111827] px-4 py-1.5 text-[12.5px] font-medium text-white shadow-md transition-colors hover:bg-black"
          >
            Exit TV Mode
          </button>
        </div>
      </div>

      {/* Dark Widgets Grid */}
      <div className="flex flex-col gap-4">
        {/* Row 1: KPI Card (1), Bar Chart (2), KPI Card (1) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* KPI Card */}
          <div className="rounded-[16px] bg-[#1E293B] p-4 shadow-md">
            <div className="text-[11px] font-semibold text-[#94A3B8]">KPI CARD</div>
            <div className="my-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-b from-white/90 to-white/70 text-[32px] font-bold text-[#0F172A]">
              25
            </div>
            <div className="text-center text-[11.5px] text-[#94A3B8]">KPI Card</div>
          </div>

          {/* Bar Chart */}
          <div className="col-span-2 rounded-[16px] bg-[#1E293B] p-4 shadow-md">
            <div className="text-[11px] font-semibold text-[#94A3B8]">BAR CHART</div>
            <div className="mt-4 flex flex-col gap-3">
              <div>
                <div className="flex justify-between text-[11.5px] text-[#CBD5E1]">
                  <span>Event_leads</span>
                  <span>15</span>
                </div>
                <div className="mt-1 h-3.5 w-full rounded-full bg-white/10">
                  <div className="h-full w-[75%] rounded-full bg-[#818CF8]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11.5px] text-[#CBD5E1]">
                  <span>Lead</span>
                  <span>6</span>
                </div>
                <div className="mt-1 h-3.5 w-full rounded-full bg-white/10">
                  <div className="h-full w-[30%] rounded-full bg-[#A78BFA]" />
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card */}
          <div className="rounded-[16px] bg-[#1E293B] p-4 shadow-md">
            <div className="text-[11px] font-semibold text-[#94A3B8]">KPI CARD</div>
            <div className="my-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-b from-white/90 to-white/70 text-[32px] font-bold text-[#0F172A]">
              25
            </div>
            <div className="text-center text-[11.5px] text-[#94A3B8]">KPI Card</div>
          </div>
        </div>

        {/* Row 2: Pie Chart (2), Line Chart (2) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="rounded-[16px] bg-[#1E293B] p-4 shadow-md">
            <div className="text-[11px] font-semibold text-[#94A3B8]">PIE CHART</div>
            <div className="mt-3 flex items-center justify-around">
              <svg width="120" height="120" viewBox="0 0 100 100" className="rotate-[-90deg]">
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#818CF8" strokeWidth="30" strokeDasharray="132 220" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#A78BFA" strokeWidth="30" strokeDasharray="53 220" strokeDashoffset="-132" />
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F472B6" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-185" />
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#FBBF24" strokeWidth="30" strokeDasharray="18 220" strokeDashoffset="-203" />
              </svg>
              <div className="flex flex-col gap-1.5 text-[11px] text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#818CF8]" />
                  <span>Event_leads: 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />
                  <span>Lead: 6</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#F472B6]" />
                  <span>New: 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
                  <span>Proposal: 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="rounded-[16px] bg-[#1E293B] p-4 shadow-md">
            <div className="text-[11px] font-semibold text-[#94A3B8]">LINE CHART</div>
            <div className="mt-4 flex h-32 items-end justify-between px-4 pb-2">
              <svg className="h-full w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path
                  d="M 10 20 L 90 60 L 170 85 L 280 85"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="3"
                />
                <circle cx="10" cy="20" r="4" fill="#818CF8" />
                <circle cx="90" cy="60" r="4" fill="#818CF8" />
                <circle cx="170" cy="85" r="4" fill="#818CF8" />
                <circle cx="280" cy="85" r="4" fill="#818CF8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 3: Table */}
        <div className="rounded-[16px] bg-[#1E293B] p-4 shadow-md">
          <div className="text-[11px] font-semibold text-[#94A3B8]">TABLE</div>
          <table className="mt-3 w-full text-left text-[12px] text-[#CBD5E1]">
            <thead>
              <tr className="border-b border-white/10 text-[11px] text-[#94A3B8]">
                <th className="pb-2">STATUS</th>
                <th className="pb-2 text-right">VALUE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-2">Event_leads</td>
                <td className="py-2 text-right font-medium text-white">15</td>
              </tr>
              <tr>
                <td className="py-2">Lead</td>
                <td className="py-2 text-right font-medium text-white">6</td>
              </tr>
              <tr>
                <td className="py-2">New</td>
                <td className="py-2 text-right font-medium text-white">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
