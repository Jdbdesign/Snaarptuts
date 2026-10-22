"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { MONTHS, STATS, Y_LABELS } from "./step3-data";

/* Screen D: admin dashboard (admin.snaarp.com/admin), inside the shared AdminLayout. */

export function AdminDashboard({ tl }: SceneProps) {
  const count = useTimelineVar(tl, "count", 0); // 0 -> 1 while the numbers count up
  return (
    <AdminLayout tl={tl} active="dashboard">
      <DashboardContent count={count} />
    </AdminLayout>
  );
}

/** The dashboard page itself (stat cards and the traffic chart). `count` runs 0 -> 1. */
export function DashboardContent({ count }: { count: number }) {
  const narrow = useNarrow();
  return (
    <>
      <h1 className="text-[26px] font-semibold leading-[34px]">Dashboard</h1>
      <div className={`mt-[17px] grid gap-6 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
        {STATS.map((s) => (
          <div
            key={s.id}
            data-tl={`stat-${s.id}`}
            className="flex h-[125px] items-center justify-between rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-12px_rgba(17,17,17,0.12)]"
          >
            <div>
              <p className="whitespace-nowrap text-[26px] font-bold leading-8">
                {s.value === null ? <span className="text-[20px]">{s.title}</span> : Math.round(s.value * count)}
              </p>
              <p className="mt-1 text-[14px] leading-5 text-[#6b7280]">{s.label}</p>
              <p className="mt-1 text-[12px] leading-4 text-[#9aa0ab]">{s.sub}</p>
            </div>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${s.tile}`}>
              <Icon name={s.icon} size={24} />
            </span>
          </div>
        ))}
      </div>
      <TrafficChart />
    </>
  );
}

const PLOT = { left: 85, right: 1010, top: 97, step: 75 };

function TrafficChart() {
  const monthX = (i: number) => PLOT.left + ((PLOT.right - PLOT.left) * i) / 11;
  const zeroY = PLOT.top + PLOT.step * 4;
  const legend = [
    { color: "#5B6CF0", text: "Incoming Emails: 0" },
    { color: "#22B35E", text: "Outgoing Emails: 0" },
    { color: "#E5484D", text: "Incoming Spam: 0" },
  ];

  return (
    <div className="relative mt-[50px] h-[470px] rounded-[18px] border border-[#F0F0F4] bg-white shadow-[0_6px_24px_-12px_rgba(17,17,17,0.1)]">
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
        <h2 className="text-[17px] font-bold">Email Traffic Statistics</h2>
        <span className="flex h-10 w-[139px] items-center justify-between rounded-lg border border-[#E6E6EC] px-3.5 text-[13px] text-[#2a2d36]">
          Last 30 days
          <Icon name="chevronDown" size={14} className="text-[#6b7280]" />
        </span>
      </div>

      <svg
        viewBox="0 0 1056 470"
        preserveAspectRatio="xMinYMin meet"
        className="absolute inset-0 h-full w-full"
        aria-label="Email traffic, last 30 days"
      >
        {Y_LABELS.map((label, i) => {
          const y = PLOT.top + PLOT.step * i;
          return (
            <g key={label}>
              <text x="76" y={y + 4} textAnchor="end" fontSize="12" fill="#9aa0ab">
                {label}
              </text>
              <line x1={PLOT.left} x2={PLOT.right} y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="2 4" />
            </g>
          );
        })}
        <line x1={PLOT.left} x2={PLOT.right} y1={zeroY} y2={zeroY} stroke="#E5484D" strokeWidth="1.6" />
        {MONTHS.map((m, i) => (
          <g key={m}>
            <circle cx={monthX(i)} cy={zeroY} r="4.5" fill="#fff" stroke="#E5484D" strokeWidth="1.6" />
            <text x={monthX(i)} y={zeroY + 20} textAnchor="middle" fontSize="12" fill="#6b7280">
              {m}
            </text>
          </g>
        ))}
        {legend.map((l, i) => {
          const x = 330 + i * 160;
          return (
            <g key={l.text}>
              <circle cx={x} cy={438} r="5" fill={l.color} />
              <text x={x + 11} y={442} fontSize="12" fill={l.color}>
                {l.text}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
