"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ACTIVITY_FEED_ITEMS,
  ACTIVITY_TABS,
  APPROVALS_ITEMS,
  MY_SPACE_STATS,
  SAMPLE_EMPLOYEE,
  type ActivityTabId,
} from "./workforce-data";

type Props = {
  tl: Timeline;
  onNavigateSub?: (sub: "overview" | "onboarding" | "profile") => void;
};

export function MySpaceOverviewView({ tl, onNavigateSub }: Props) {
  const activeTab = useTimelineVar<ActivityTabId>(tl, "wfActiveActivityTab", "activities");
  const isCheckedIn = useTimelineVar<boolean>(tl, "wfCheckedIn", true);

  // Live counting timer starting from 00:09:11
  const [seconds, setSeconds] = useState(9 * 60 + 11);

  useEffect(() => {
    if (!isCheckedIn) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTimer = (totalSec: number) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="btn-back-overview"
          onClick={() => tl.setUrl("workforce.snaarp.com/dashboard")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-semibold hover:bg-[#E9D5FF] transition-colors"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Row 1: Profile card, Today's attendance timer, Reportees */}
      <div className="grid grid-cols-3 gap-5">
        {/* Profile Card */}
        <div
          data-tl="card-profile"
          className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[190px]"
        >
          <div className="flex items-start gap-4">
            <div
              data-tl="profile-avatar"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0284C7]"
            >
              <Icon name="user" size={28} />
            </div>
            <div className="min-w-0">
              <h3 data-tl="profile-name" className="text-base font-bold text-[#111827] truncate">
                {SAMPLE_EMPLOYEE.name}
              </h3>
              <button
                type="button"
                data-tl="link-edit-profile"
                onClick={() => onNavigateSub?.("profile")}
                className="text-xs font-medium text-[#7014D9] hover:underline block mt-0.5"
              >
                View and edit my profile
              </button>

              <div className="mt-3 flex flex-col gap-1 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <Icon name="wfBadge" size={14} className="text-[#6B7280]" />
                  <span>{SAMPLE_EMPLOYEE.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="building" size={14} className="text-[#6B7280]" />
                  <span>{SAMPLE_EMPLOYEE.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Attendance Card with live timer */}
        <div
          data-tl="card-attendance"
          className="flex flex-col items-center justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-center min-h-[190px]"
        >
          <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase">
            TODAY&apos;S ATTENDANCE
          </span>

          <div className="my-2">
            <div
              data-tl="attendance-timer-display"
              className="text-3xl font-extrabold text-[#111827] tracking-wider font-mono"
            >
              {formatTimer(seconds)}
            </div>
            {isCheckedIn ? (
              <button
                type="button"
                data-tl="btn-attendance-stop"
                onClick={() => tl.setVar("wfCheckedIn", false)}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-semibold hover:bg-[#B91C1C] transition-colors shadow-sm"
              >
                <Icon name="wfStop" size={12} />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                data-tl="btn-attendance-start"
                onClick={() => tl.setVar("wfCheckedIn", true)}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5B0FB3] transition-colors shadow-sm"
              >
                <Icon name="play" size={12} />
                <span>Start</span>
              </button>
            )}
          </div>

          <p data-tl="attendance-note" className="text-[11px] text-[#6B7280]">
            {isCheckedIn
              ? "You are currently checked in. Click Stop when done."
              : "Checked out. Click Start to resume session."}
          </p>
        </div>

        {/* Reportees Card */}
        <div
          data-tl="card-reportees"
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-center min-h-[190px]"
        >
          <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase mb-3">
            REPORTEES
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-[#9CA3AF] mb-2">
            <Icon name="users" size={24} />
          </div>
          <p className="text-xs text-[#6B7280]">No direct reportees</p>
        </div>
      </div>

      {/* Row 2: Three stat cards */}
      <div className="grid grid-cols-3 gap-5">
        {MY_SPACE_STATS.map((s) => (
          <div
            key={s.id}
            data-tl={`stat-${s.id}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#7014D9]">
              <Icon name={s.icon} size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-[#111827]">{s.value}</div>
              <div className="text-xs text-[#6B7280]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: ACTIVITY tabs & content */}
      <section
        data-tl="card-activity"
        className="flex flex-col p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase mb-3">
          ACTIVITY
        </span>

        {/* Tab switcher */}
        <div className="flex items-center gap-5 border-b border-[#F3F4F6] pb-3 overflow-x-auto no-scrollbar">
          {ACTIVITY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-tl={`tab-act-${tab.id}`}
              onClick={() => tl.setVar("wfActiveActivityTab", tab.id)}
              className={`text-xs font-medium pb-1 whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? "text-[#7014D9] font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-[#7014D9]"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panes */}
        <div className="mt-4">
          {activeTab === "activities" && (
            <div className="flex flex-col divide-y divide-[#F3F4F6]">
              {ACTIVITY_FEED_ITEMS.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">{item.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "feeds" && (
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#111827]">NEW MONTH CELEBRATIONS</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Celebrating a new month</p>
              </div>
              <span className="text-[11px] text-[#9CA3AF]">30/10/2026, 09:56</span>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="py-8 text-center text-xs text-[#6B7280]">
              No profile activity to display.
            </div>
          )}

          {activeTab === "approvals" && (
            <div className="flex flex-col divide-y divide-[#F3F4F6]">
              {APPROVALS_ITEMS.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">{item.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{item.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                    <button type="button" className="text-xs font-medium text-[#7014D9] hover:underline">
                      {item.link}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "leave" && (
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#111827]">Sick leave – 5 days remaining</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Approved absence</p>
              </div>
              <span className="text-[11px] text-[#9CA3AF]">18/10/2026</span>
            </div>
          )}

          {(activeTab === "attendance" || activeTab === "time-logs" || activeTab === "timesheets") && (
            <div className="py-8 text-center text-xs text-[#6B7280]">
              No items to display.
            </div>
          )}
        </div>
      </section>

      {/* Row 4: MY PAYSLIPS */}
      <section
        data-tl="card-payslips"
        className="flex flex-col p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
          <Icon name="docFile" size={16} />
          <span>MY PAYSLIPS</span>
        </div>
        <p className="text-xs text-[#6B7280]">No payslips available yet.</p>
      </section>
    </div>
  );
}
