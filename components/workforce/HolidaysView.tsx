"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { SAMPLE_HOLIDAYS, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function HolidaysView({ tl, onBack }: Props) {
  const { month, holiday, today } = SAMPLE_HOLIDAYS;

  // Calendar days for October 2026:
  // Oct 1 is Thursday. So Sun, Mon, Tue, Wed are blank prefix cells (4 days).
  // Days 1..31.
  const prefixDays = [null, null, null, null];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const calendarCells = [...prefixDays, ...days];

  // Pad to complete the 5 or 6 weeks (total 35 cells: 4 prefix + 31 days = 35 cells = exactly 5 weeks of 7!)
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="holidays-back-btn"
          onClick={() => {
            if (onBack) onBack();
            else {
              tl.setVar("wfPage", "exit-tasks");
              tl.setVar("wfSubpage", "exit-tasks");
              tl.setUrl(URLS.exitTasks);
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Icon name="chevronLeft" size={14} className="text-[#6B7280]" />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 data-tl="holidays-heading" className="text-xl font-bold text-[#111827]">
            Holidays
          </h2>
          <p data-tl="holidays-sub" className="text-xs text-[#6B7280] mt-0.5">
            Manage organization holidays and observances
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-xs">
          <button
            type="button"
            className="p-1.5 rounded-md bg-purple-50 text-[#7014D9]"
            title="Calendar view"
          >
            <Icon name="shCalendar" size={16} />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-md text-[#6B7280] hover:bg-gray-50"
            title="List view"
          >
            <Icon name="edBullets" size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Card */}
      <div
        data-tl="holidays-calendar-card"
        className="rounded-2xl border border-gray-200/90 bg-white shadow-xs overflow-hidden"
      >
        {/* Month Header */}
        <div className="flex items-center justify-between border-b border-gray-200/80 px-6 py-4">
          <button
            type="button"
            data-tl="btn-holidays-prev-month"
            className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          >
            <Icon name="chevronLeft" size={16} />
          </button>
          <span
            data-tl="holidays-month-header"
            className="text-sm font-semibold text-[#111827]"
          >
            {month}
          </span>
          <button
            type="button"
            data-tl="btn-holidays-next-month"
            className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
          >
            <Icon name="chevronRight" size={16} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-gray-200/80 bg-gray-50/60 text-center text-[11px] font-semibold text-[#6B7280] py-2.5">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid (5 rows of 7 days) */}
        <div className="grid grid-cols-7 divide-x divide-y divide-gray-100 border-b border-gray-100">
          {calendarCells.map((dayNum, idx) => {
            if (dayNum === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[88px] bg-gray-50/30 p-2"
                />
              );
            }

            const isHoliday = dayNum === holiday.day;
            const isToday = dayNum === today;

            return (
              <div
                key={dayNum}
                data-tl={`cal-day-cell-${dayNum}`}
                className="min-h-[88px] p-2 flex flex-col justify-between hover:bg-gray-50/40 transition-colors"
              >
                <div className="flex items-center justify-start">
                  {isToday ? (
                    <div
                      data-tl="holiday-today-circle"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7014D9] text-xs font-bold text-white shadow-xs"
                    >
                      {dayNum}
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-[#374151] px-1">
                      {dayNum}
                    </span>
                  )}
                </div>

                {isHoliday && (
                  <div className="mt-1">
                    <span
                      data-tl="holiday-chip-founders-day"
                      className="inline-block rounded-md bg-[#F3E8FF] px-2 py-0.5 text-[10px] font-semibold text-[#7014D9] truncate max-w-full"
                      title={holiday.label}
                    >
                      {holiday.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
