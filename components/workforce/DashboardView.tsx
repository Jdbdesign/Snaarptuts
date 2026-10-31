"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ANNOUNCEMENT,
  DASHBOARD_HIGHLIGHTS,
  DASHBOARD_OVERVIEW_CARDS,
  NEXT_7_DAYS,
  TASKS_AND_REQUESTS,
} from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function DashboardView({ tl }: Props) {
  const activeTaskTab = useTimelineVar<"tasks" | "leave" | "sickness">(tl, "wfActiveTaskTab", "tasks");

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-12">
      {/* Date subtitle shown at top of dashboard */}
      <div className="text-xs text-[#6B7280]">Friday, 30 October 2026</div>

      {/* 1. Company highlights */}
      <section data-tl="company-highlights" className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-[#111827]">Company highlights</h2>
        <div className="grid grid-cols-5 gap-4">
          {DASHBOARD_HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              data-tl={`highlight-${item.id}`}
              className="flex flex-col justify-between p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[105px]"
            >
              <div className="text-[#7014D9]">
                <Icon name={item.icon} size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#111827]">{item.count}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Your overview */}
      <section data-tl="your-overview" className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-[#111827]">Your overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {DASHBOARD_OVERVIEW_CARDS.map((card) => (
            <div
              key={card.id}
              data-tl={`overview-card-${card.id}`}
              className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[160px]"
            >
              <div>
                <div className="flex items-center gap-2 text-[#7014D9] text-xs font-semibold">
                  <Icon name={card.icon} size={16} />
                  <span>{card.name}</span>
                </div>
                <div className="text-lg font-bold text-[#111827] mt-3">{card.title}</div>
                <div className="text-xs text-[#6B7280] mt-1">{card.sub}</div>
              </div>

              <button
                type="button"
                data-tl={`btn-view-${card.id}`}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-[#7014D9] text-white text-xs font-medium hover:bg-[#5B0FB3] transition-colors"
              >
                <span>{card.btn}</span>
                <Icon name="chevronRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Your tasks and requests & Next 7 days */}
      <div className="grid grid-cols-2 gap-4">
        {/* Your tasks and requests */}
        <section
          data-tl="card-tasks-requests"
          className="flex flex-col p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[190px]"
        >
          <h2 className="text-sm font-semibold text-[#111827]">Your tasks and requests</h2>

          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-[#F3F4F6] mt-3 pb-2">
            <button
              type="button"
              data-tl="tab-tasks"
              onClick={() => tl.setVar("wfActiveTaskTab", "tasks")}
              className={`text-xs font-medium transition-colors ${
                activeTaskTab === "tasks" ? "text-[#7014D9] font-semibold" : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Tasks ({TASKS_AND_REQUESTS.tasks.length})
            </button>
            <button
              type="button"
              data-tl="tab-leave"
              onClick={() => tl.setVar("wfActiveTaskTab", "leave")}
              className={`text-xs font-medium transition-colors ${
                activeTaskTab === "leave" ? "text-[#7014D9] font-semibold" : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Leave ({TASKS_AND_REQUESTS.leave.length})
            </button>
            <button
              type="button"
              data-tl="tab-sickness"
              onClick={() => tl.setVar("wfActiveTaskTab", "sickness")}
              className={`text-xs font-medium transition-colors ${
                activeTaskTab === "sickness" ? "text-[#7014D9] font-semibold" : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Sickness ({TASKS_AND_REQUESTS.sickness.length})
            </button>
          </div>

          {/* Tab content */}
          <div className="mt-3 flex-1 flex flex-col justify-center">
            {activeTaskTab === "tasks" && (
              <div className="flex flex-col gap-2">
                {TASKS_AND_REQUESTS.tasks.map((task) => (
                  <div
                    key={task.id}
                    data-tl={`task-item-${task.id}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-[#F3F4F6]"
                  >
                    <span className="text-xs font-medium text-[#111827]">{task.title}</span>
                    <span className="text-[11px] text-[#6B7280]">Due {task.due}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTaskTab === "leave" && (
              <div className="flex flex-col gap-2">
                {TASKS_AND_REQUESTS.leave.map((l) => (
                  <div
                    key={l.id}
                    data-tl={`leave-item-${l.id}`}
                    className="p-2.5 rounded-xl bg-gray-50 border border-[#F3F4F6] text-xs font-medium text-[#111827]"
                  >
                    {l.title}
                  </div>
                ))}
              </div>
            )}

            {activeTaskTab === "sickness" && (
              <div data-tl="sickness-empty" className="text-xs text-[#6B7280] text-center py-4">
                No sickness records to display.
              </div>
            )}
          </div>
        </section>

        {/* Next 7 days */}
        <section
          data-tl="card-next-7-days"
          className="flex flex-col p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[190px]"
        >
          <h2 className="text-sm font-semibold text-[#111827]">Next 7 days</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Your upcoming tasks and approved leave</p>

          <div className="mt-4 flex flex-col gap-2 flex-1 justify-center">
            {NEXT_7_DAYS.map((item, idx) => (
              <div
                key={item.id}
                data-tl={`next-7-item-${idx + 1}`}
                className="p-2.5 rounded-xl bg-gray-50 border border-[#F3F4F6] text-xs font-medium text-[#111827]"
              >
                {item.title}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Announcements */}
      <section
        data-tl="card-announcements"
        className="flex flex-col p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <h2 className="text-sm font-semibold text-[#111827] mb-3">Announcements</h2>
        <div
          data-tl="announcement-item"
          className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex flex-col gap-1"
        >
          <div className="text-xs font-bold text-[#111827] uppercase tracking-wide">
            {ANNOUNCEMENT.title}
          </div>
          <div className="text-xs text-[#4B5563]">{ANNOUNCEMENT.text}</div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">{ANNOUNCEMENT.date}</div>
        </div>
      </section>
    </div>
  );
}
