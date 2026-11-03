"use client";

import { useEffect, useRef } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronDown,
  Eye,
  Share2,
  User,
  ArrowUp,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

// Heatmap mock data: 7 days x 24 hours
// Higher intensity for Sun 18, Mon 15, Tue 11, etc. matching the video
const HEATMAP_GRID: { day: string; cells: number[] }[] = [
  { day: "Sun", cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 1, 0, 0] },
  { day: "Mon", cells: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 1, 2, 0, 0, 0, 0] },
  { day: "Tue", cells: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { day: "Wed", cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { day: "Thu", cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { day: "Fri", cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
  { day: "Sat", cells: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0] },
];

export function OneCardXAnalyticsView({ tl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useTimelineVar(tl, "ocxAnalyticsScrollY", 0);
  const activeTooltip = useTimelineVar<string | null>(tl, "ocxAnalyticsHeatmapTooltip", null);
  const hoveredRow = useTimelineVar<number | null>(tl, "ocxAnalyticsHoveredRow", null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  const getHeatmapBg = (val: number) => {
    if (val === 3) return "bg-[#7014D9]"; // high
    if (val === 2) return "bg-[#9333EA]"; // medium
    if (val === 1) return "bg-[#D8B4FE]"; // low
    return "bg-[#F3F4F6]"; // 0 / empty
  };

  return (
    <div
      ref={containerRef}
      data-tl="analytics-page"
      className="h-full w-full overflow-y-auto bg-[#F8F9FA] p-6 font-['Poppins',sans-serif] space-y-5"
    >
      {/* Top Filter */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          data-tl="filter-period-dropdown"
          className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:border-gray-400 cursor-pointer"
        >
          <span>Last 30 days</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>

      {/* 1. Stat Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Views */}
        <div
          data-tl="stat-total-views"
          className="rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs"
        >
          <span className="text-[12px] font-medium text-[#6B7280]">
            Total Views
          </span>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[22px] font-bold text-[#111827]">
              <Eye size={20} className="text-[#6B7280]" />
              144
            </span>
            <span className="flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-600">
              <ArrowUp size={11} strokeWidth={2.5} />
              73%
            </span>
          </div>
        </div>

        {/* Total Shares */}
        <div
          data-tl="stat-total-shares"
          className="rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs"
        >
          <span className="text-[12px] font-medium text-[#6B7280]">
            Total Shares
          </span>
          <div className="mt-2 flex items-center gap-2">
            <Share2 size={20} className="text-[#6B7280]" />
            <span className="text-[22px] font-bold text-[#111827]">0</span>
          </div>
        </div>

        {/* Total Leads */}
        <div
          data-tl="stat-total-leads"
          className="rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs"
        >
          <span className="text-[12px] font-medium text-[#6B7280]">
            Total Leads
          </span>
          <div className="mt-2 flex items-center gap-2">
            <User size={20} className="text-[#6B7280]" />
            <span className="text-[22px] font-bold text-[#111827]">0</span>
          </div>
        </div>
      </div>

      {/* 2. Charts Row */}
      <div className="grid grid-cols-12 gap-5">
        {/* Views Over Time (8 cols) */}
        <div
          data-tl="chart-views-over-time"
          className="col-span-8 rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs"
        >
          <h3 className="text-[14px] font-semibold text-[#111827] mb-4">
            Views Over Time
          </h3>
          <div className="relative h-44 w-full">
            {/* SVG Chart */}
            <svg viewBox="0 0 600 150" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7014D9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7014D9" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#F3F4F6" strokeDasharray="3 3" />
              <line x1="40" y1="75" x2="580" y2="75" stroke="#F3F4F6" strokeDasharray="3 3" />
              <line x1="40" y1="130" x2="580" y2="130" stroke="#E5E7EB" />

              {/* Y Axis Labels */}
              <text x="25" y="24" fontSize="10" fill="#9CA3AF" textAnchor="end">19</text>
              <text x="25" y="79" fontSize="10" fill="#9CA3AF" textAnchor="end">10</text>
              <text x="25" y="134" fontSize="10" fill="#9CA3AF" textAnchor="end">0</text>

              {/* Filled Area */}
              <polygon
                points="
                  60,130
                  60,118
                  100,105
                  150,30
                  190,115
                  230,108
                  270,115
                  310,20
                  350,95
                  390,118
                  430,90
                  470,130
                "
                fill="url(#purpleArea)"
              />

              {/* Chart Line */}
              <polyline
                points="
                  60,118
                  100,105
                  150,30
                  190,115
                  230,108
                  270,115
                  310,20
                  350,95
                  390,118
                  430,90
                  470,130
                "
                fill="none"
                stroke="#7014D9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* X Axis Labels */}
              <text x="60" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-07</text>
              <text x="150" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-11</text>
              <text x="230" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-13</text>
              <text x="310" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-19</text>
              <text x="390" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-22</text>
              <text x="470" y="148" fontSize="9" fill="#9CA3AF" textAnchor="middle">10-24</text>
            </svg>
          </div>
        </div>

        {/* Device Breakdown (4 cols) */}
        <div
          data-tl="chart-device-breakdown"
          className="col-span-4 rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs flex flex-col"
        >
          <h3 className="text-[14px] font-semibold text-[#111827] mb-2">
            Device Breakdown
          </h3>

          <div className="flex-1 flex flex-col items-center justify-center py-2">
            {/* Donut Chart */}
            <div className="relative flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                {/* Background circle */}
                <circle cx="60" cy="60" r="46" fill="transparent" stroke="#F3F4F6" strokeWidth="14" />
                {/* Mobile: 84% -> strokeDasharray: ~242 out of 289 */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#7014D9"
                  strokeWidth="14"
                  strokeDasharray="242 289"
                  strokeDashoffset="0"
                />
                {/* Desktop: 15% -> ~43 out of 289 */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#22C55E"
                  strokeWidth="14"
                  strokeDasharray="43 289"
                  strokeDashoffset="-242"
                />
                {/* Tablet: 1% -> ~3 out of 289 */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#F97316"
                  strokeWidth="14"
                  strokeDasharray="4 289"
                  strokeDashoffset="-285"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[18px] font-bold text-[#111827] leading-none">
                  75
                </span>
                <span className="text-[9.5px] text-[#9CA3AF] mt-0.5">events</span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full mt-4 space-y-1.5 text-[11px] text-[#4B5563]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-xs bg-[#7014D9]" />
                  <span>Mobile</span>
                </div>
                <span className="text-[#6B7280]">63 (84%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-xs bg-[#22C55E]" />
                  <span>Desktop</span>
                </div>
                <span className="text-[#6B7280]">11 (15%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-xs bg-[#F97316]" />
                  <span>Tablet</span>
                </div>
                <span className="text-[#6B7280]">1 (1%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle Row */}
      <div className="grid grid-cols-12 gap-5">
        {/* Shares by Channel (5 cols) */}
        <div
          data-tl="card-shares-by-channel"
          className="col-span-5 rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs flex flex-col"
        >
          <h3 className="text-[14px] font-semibold text-[#111827] mb-3">
            Shares by Channel
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
              <Inbox size={28} strokeWidth={1.5} />
            </div>
            <p className="text-[12px] text-[#9CA3AF]">
              No shares yet in this period
            </p>
          </div>
        </div>

        {/* Engagement by Hour & Day (7 cols) */}
        <div
          data-tl="card-engagement-heatmap"
          className="col-span-7 rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs relative"
        >
          <h3 className="text-[14px] font-semibold text-[#111827] mb-3">
            Engagement by Hour & Day
          </h3>

          <div className="overflow-x-auto no-scrollbar">
            {/* Heatmap Grid */}
            <div className="min-w-[420px]">
              {/* Hour Labels */}
              <div className="flex pl-8 mb-1 text-[9px] text-[#9CA3AF]">
                {["0", "3", "6", "9", "12", "15", "18", "21"].map((hr) => (
                  <div key={hr} className="flex-1 text-left">
                    {hr}
                  </div>
                ))}
              </div>

              {/* Rows for each day */}
              <div className="space-y-1">
                {HEATMAP_GRID.map((row, rIdx) => (
                  <div key={row.day} className="flex items-center gap-1">
                    <span className="w-7 text-[9px] text-[#9CA3AF] shrink-0">
                      {row.day}
                    </span>
                    <div className="flex flex-1 gap-0.5">
                      {row.cells.map((val, cIdx) => {
                        const isTargetHoverCell = rIdx === 0 && cIdx === 18;
                        return (
                          <div
                            key={cIdx}
                            data-tl={isTargetHoverCell ? "heatmap-cell-sun-18" : undefined}
                            onMouseEnter={() =>
                              tl.setVar(
                                "ocxAnalyticsHeatmapTooltip",
                                `${row.day} ${cIdx}:00 - ${val > 0 ? val * 4 : 0} views`
                              )
                            }
                            onMouseLeave={() => tl.setVar("ocxAnalyticsHeatmapTooltip", null)}
                            className={`h-3 flex-1 rounded-xs transition-colors cursor-pointer ${getHeatmapBg(
                              val
                            )} hover:ring-1 hover:ring-[#7014D9]`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tooltip Overlay */}
          {activeTooltip && (
            <div
              data-tl="heatmap-tooltip"
              className="absolute right-6 top-5 rounded-lg bg-[#111827] px-2.5 py-1 text-[11px] font-medium text-white shadow-md"
            >
              {activeTooltip}
            </div>
          )}
        </div>
      </div>

      {/* 4. Per-Card Breakdown Table */}
      <div
        data-tl="card-per-card-breakdown"
        className="rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-semibold text-[#111827]">
            Per-Card Breakdown
          </h3>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#F3F4F6]">
          <table className="w-full border-collapse text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-[#F3F4F6] bg-gray-50/70 text-[10.5px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                <th className="py-2.5 px-4">Card</th>
                <th className="py-2.5 px-4">Views ⇕</th>
                <th className="py-2.5 px-4">Shares ⇕</th>
                <th className="py-2.5 px-4">Leads ⇕</th>
                <th className="py-2.5 px-4">Scans ⇕</th>
                <th className="py-2.5 px-4">Conversion Rate ⇕</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {/* Row 1 */}
              <tr
                data-tl="row-card-business"
                className={`transition-colors cursor-pointer ${
                  hoveredRow === 1 ? "bg-purple-50/60" : "hover:bg-gray-50/80"
                }`}
              >
                <td className="py-3 px-4 font-medium text-[#111827]">Business</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0.0%</td>
              </tr>

              {/* Row 2 */}
              <tr
                data-tl="row-card-id-card"
                className={`transition-colors cursor-pointer ${
                  hoveredRow === 2 ? "bg-purple-50/60" : "hover:bg-gray-50/80"
                }`}
              >
                <td className="py-3 px-4 font-medium text-[#111827]">ID Card</td>
                <td className="py-3 px-4 text-[#4B5563]">16</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0.0%</td>
              </tr>

              {/* Row 3 */}
              <tr
                data-tl="row-card-business-card"
                className={`transition-colors cursor-pointer ${
                  hoveredRow === 3 ? "bg-purple-50/60" : "hover:bg-gray-50/80"
                }`}
              >
                <td className="py-3 px-4 font-medium text-[#111827]">Business Card</td>
                <td className="py-3 px-4 text-[#4B5563]">45</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0</td>
                <td className="py-3 px-4 text-[#4B5563]">0.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-end gap-1 text-[12px]">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50"
            disabled
          >
            <ChevronLeft size={14} />
          </button>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7014D9] text-white font-medium">
            1
          </span>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50"
            disabled
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
