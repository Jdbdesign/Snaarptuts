"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ADMIN_HOLIDAYS_DATA } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function AdminHolidaysView({ tl }: Props) {
  const isCalendarView = useTimelineVar(tl, "wfHolidayCalendarView", false);
  const { publicHolidays, workingWeek } = ADMIN_HOLIDAYS_DATA;

  // Days for October 2026 calendar: 31 days, Oct 1 starts on Thursday (4 blanks)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 data-tl="holidays-admin-heading" className="text-xl font-bold text-[#111827]">
            Holidays
          </h2>
          <p data-tl="holidays-admin-sub" className="text-xs text-[#6B7280] mt-0.5">
            Company holidays and working-week configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-holiday-calendar-toggle"
            onClick={() => tl.setVar("wfHolidayCalendarView", !isCalendarView)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-xs transition-colors"
          >
            <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
            <span>{isCalendarView ? "List View" : "Calendar View"}</span>
          </button>
          <button
            type="button"
            data-tl="btn-add-holiday"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Icon name="plus" size={14} />
            <span>+ Add Holiday</span>
          </button>
        </div>
      </div>

      {/* LIST VIEW (Step 107) */}
      {!isCalendarView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Public Holidays list */}
          <div className="md:col-span-2 rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">United Kingdom (GB)</h3>
                <p className="text-[11px] text-[#6B7280]">8 registered public holidays for 2026/2027</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F3E8FF] text-[#7014D9]">
                GB Default
              </span>
            </div>

            <div className="divide-y divide-[#F3F4F6] text-xs">
              {publicHolidays.map((h) => (
                <div key={h.id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF5FF] text-[#7014D9] font-bold text-[10px]">
                      {h.code}
                    </span>
                    <div>
                      <p className="font-semibold text-[#111827]">{h.code}: {h.name}</p>
                      <p className="text-[11px] text-[#6B7280]">Official public holiday</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#111827]">{h.date}</span>
                    <span className="block text-[10px] text-[#059669]">Observed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working Week Card */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#111827] mb-1">Working Week</h3>
            <p className="text-[11px] text-[#6B7280] mb-4">Default organizational business days and hours</p>

            <div className="space-y-2 text-xs">
              {workingWeek.map((w) => (
                <div
                  key={w.day}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F9FAFB] border border-[#F3F4F6]"
                >
                  <span className="font-medium text-[#374151]">{w.day}</span>
                  <span
                    className={`font-semibold text-[11px] ${
                      w.working ? "text-[#7014D9]" : "text-[#9CA3AF]"
                    }`}
                  >
                    {w.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR VIEW (Step 108) */}
      {isCalendarView && (
        <div data-tl="holiday-calendar-grid" className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#111827]">October 2026</h3>
              <p className="text-xs text-[#6B7280]">Company & national holidays view</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7014D9]" />
                Public Holiday
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#6B7280] ml-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                Company Event
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-[#E5E7EB] rounded-xl overflow-hidden border border-[#E5E7EB]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="bg-[#F9FAFB] py-2 text-center text-xs font-semibold text-[#6B7280]">
                {day}
              </div>
            ))}

            {/* Prefix blanks for October 2026 (Oct 1 is Thursday -> 3 blanks: Mon, Tue, Wed) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`blank-${i}`} className="bg-white min-h-[75px] p-2 bg-gray-50/50" />
            ))}

            {calendarDays.map((d) => {
              const isFoundersDay = d === 30;
              return (
                <div
                  key={d}
                  className={`bg-white min-h-[75px] p-2 transition-colors ${
                    isFoundersDay ? "bg-[#FAF5FF] border border-[#D8B4FE]" : "hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold block ${
                      isFoundersDay ? "text-[#7014D9]" : "text-[#111827]"
                    }`}
                  >
                    {d}
                  </span>
                  {isFoundersDay && (
                    <div
                      data-tl="holiday-badge-founders-day"
                      className="mt-1.5 p-1 rounded-md bg-[#F3E8FF] border border-[#D8B4FE] text-[10px] font-semibold text-[#7014D9] leading-tight"
                    >
                      GB: Founders&apos; Day
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
