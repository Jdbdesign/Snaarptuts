"use client";

import type { Timeline } from "@/lib/timeline";

type Props = {
  tl?: Timeline;
  onSelect: (dateStr: string) => void;
  onClose: () => void;
  todayDateStr?: string;
};

export function BooksDatePickerPopover({
  onSelect,
  onClose,
  todayDateStr = "11/05/2026",
}: Props) {
  // November 2026 days (1st is Sunday)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div
      data-tl="date-picker-popover"
      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 text-xs select-none"
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <span className="font-semibold text-gray-800">November 2026</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            data-tl="btn-date-clear"
            onClick={() => {
              onSelect("");
              onClose();
            }}
            className="px-2 py-0.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            data-tl="btn-date-today"
            onClick={() => {
              onSelect(todayDateStr);
              onClose();
            }}
            className="px-2 py-0.5 bg-[#F4EBFF] text-[#7014D9] font-medium hover:bg-[#E9D7FE] rounded cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-400 mb-1 text-[10px]">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => {
          const formatted = `11/${String(day).padStart(2, "0")}/2026`;
          const isToday = day === 5;
          const isTarget19 = day === 19;
          return (
            <button
              key={day}
              type="button"
              data-tl={`date-day-${day}`}
              onClick={() => {
                onSelect(formatted);
                onClose();
              }}
              className={`h-7 w-7 rounded-lg flex items-center justify-center font-medium transition-colors cursor-pointer ${
                isToday
                  ? "bg-[#7014D9] text-white font-semibold"
                  : isTarget19
                  ? "border border-[#7014D9] text-[#7014D9] hover:bg-purple-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
