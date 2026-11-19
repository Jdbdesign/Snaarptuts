'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { pushCrmToast } from './crm-timeline';

interface Props {
  tl: Timeline;
}

export function CrmCalendarView({ tl }: Props) {
  const selectedDay = useTimelineVar<number | null>(tl, 'crm:selectedCalendarDay', null);
  const isTaskDone = useTimelineVar<boolean>(tl, 'crm:calTaskDone', false);

  const handleDayClick = (day: number) => {
    tl.setVar('crm:selectedCalendarDay', day);
  };

  const handleCompleteTask = () => {
    tl.setVar('crm:calTaskDone', true);
    pushCrmToast(tl, 'Task marked as done');
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-[#F8F9FA] text-[#111111]" data-tl="crm-calendar-view">
      {/* Main Calendar Content */}
      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[20px] font-bold text-[#111111]">Calendar</h1>
            <span className="text-[12.5px] text-[#6B7280]">
              Tasks, meetings, calls, and deal deadlines
            </span>
          </div>

          {/* Legend and Controls */}
          <div className="flex items-center gap-5">
            {/* Legend */}
            <div className="flex items-center gap-3 text-[11.5px] text-[#4B5563]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#3B82F6]" /> Task
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B]" /> Meeting
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" /> Call
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" /> Deal
              </span>
            </div>

            {/* Date Nav Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-tl="crm-cal-btn-today"
                className="h-8 rounded-xl border border-[#E5E7EB] bg-white px-3 text-[12px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB]"
              >
                Today
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] shadow-2xs hover:bg-[#F9FAFB]"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-2 text-[13px] font-bold text-[#111111]">November 2026</span>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] shadow-2xs hover:bg-[#F9FAFB]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Column Calendar Grid */}
        <div className="flex flex-1 flex-col rounded-2xl border border-[#ECECF1] bg-white overflow-hidden shadow-xs" data-tl="crm-cal-grid">
          {/* Weekday Names */}
          <div className="grid grid-cols-7 border-b border-[#ECECF1] bg-[#F9FAFB] text-center text-[11px] font-bold text-[#6B7280] py-2.5">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Month Days Matrix (5 rows of 7 days) */}
          <div className="grid grid-cols-7 grid-rows-5 flex-1 divide-x divide-y divide-[#ECECF1]">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = i + 1; // Nov 1 = Sun (index 0)
              const isNovember = dayNum <= 30;
              const displayDay = isNovember ? dayNum : dayNum - 30;
              const isToday = dayNum === 20;
              const isSelected = selectedDay === dayNum;

              // Events
              const hasMessageCeo = dayNum === 13;
              const hasCallClient = dayNum === 20;

              return (
                <div
                  key={i}
                  data-tl={dayNum === 13 ? 'crm-cal-day-12' : dayNum === 20 ? 'crm-cal-day-19' : `crm-cal-day-${dayNum}`}
                  onClick={() => handleDayClick(dayNum)}
                  className={`min-h-[92px] p-2 flex flex-col justify-between transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#F3ECFC]/40' : 'hover:bg-[#F9FAFB]'
                  } ${!isNovember ? 'bg-[#FAFAFA] text-[#D1D5DB]' : ''}`}
                >
                  {/* Day Number */}
                  <div className="flex items-center justify-between">
                    {isToday ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7014D9] text-[12px] font-bold text-white shadow-xs">
                        {displayDay}
                      </span>
                    ) : (
                      <span className={`text-[12px] font-medium ${isNovember ? 'text-[#374151]' : 'text-[#D1D5DB]'}`}>
                        {displayDay}
                      </span>
                    )}
                  </div>

                  {/* Events in Cell */}
                  <div className="flex flex-col gap-1 mt-1">
                    {hasMessageCeo && (
                      <div className="flex items-center gap-1 rounded bg-[#EFF6FF] px-1.5 py-0.5 text-[10.5px] font-medium text-[#1E40AF] truncate">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                        <span className="truncate">Message CEO</span>
                      </div>
                    )}

                    {hasCallClient && (
                      <div
                        className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10.5px] font-medium truncate ${
                          isTaskDone ? 'bg-[#ECFDF5] text-[#065F46] line-through' : 'bg-[#EFF6FF] text-[#1E40AF]'
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isTaskDone ? 'bg-[#10B981]' : 'bg-[#3B82F6]'}`} />
                        <span className="truncate">Call The Client before the end o...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right-Side Day Panel */}
      <div className="w-[320px] shrink-0 border-l border-[#ECECF1] bg-white p-5 flex flex-col justify-between overflow-y-auto" data-tl="crm-cal-day-panel">
        <div>
          {(selectedDay === 12 || selectedDay === 13) ? (
            /* Day 12 / 13 Selected */
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#111111]">Thu, Nov 12</h3>
                  <span className="text-[12px] text-[#6B7280]">1 event</span>
                </div>
                <button type="button" className="p-1.5 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]">
                  <Plus size={16} />
                </button>
              </div>

              {/* Event Card */}
              <div className="flex items-start justify-between rounded-2xl border border-[#ECECF1] bg-white p-4 shadow-xs" data-tl="crm-cal-event-ev-1">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-[#9CA3AF]">
                    <Circle size={15} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-[#111111]">Message CEO</span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[10.5px] font-semibold text-[#2563EB]">
                        Task
                      </span>
                      <span className="text-[11px] text-[#6B7280]">medium</span>
                    </div>
                  </div>
                </div>

                <div className="text-[#10B981]">
                  <CheckCircle2 size={16} />
                </div>
              </div>
            </div>
          ) : (selectedDay === 19 || selectedDay === 20) ? (
            /* Day 19 / 20 Selected */
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-bold text-[#111111]">Thu, Nov 19</h3>
                  <span className="text-[12px] text-[#6B7280]">1 event</span>
                </div>
                <button type="button" className="p-1.5 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]">
                  <Plus size={16} />
                </button>
              </div>

              {/* Event Card */}
              <div className="flex items-start justify-between rounded-2xl border border-[#ECECF1] bg-white p-4 shadow-xs" data-tl="crm-cal-event-ev-2">
                <div className="flex items-start gap-2.5">
                  <button
                    type="button"
                    data-tl="crm-cal-complete-task"
                    onClick={handleCompleteTask}
                    className="mt-0.5 text-[#9CA3AF] hover:text-[#7014D9]"
                  >
                    {isTaskDone ? (
                      <CheckCircle2 size={16} className="text-[#10B981]" />
                    ) : (
                      <Circle size={16} />
                    )}
                  </button>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`text-[13px] font-semibold leading-snug transition-all ${
                        isTaskDone ? 'line-through text-[#9CA3AF]' : 'text-[#111111]'
                      }`}
                    >
                      Call The Client before the end of work
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[10.5px] font-semibold text-[#2563EB]">
                        Task
                      </span>
                      <span className="rounded bg-[#FEF3C7] px-2 py-0.5 text-[10.5px] font-semibold text-[#D97706]">
                        high
                      </span>
                    </div>
                  </div>
                </div>

                {isTaskDone ? (
                  <div className="text-[#10B981]">
                    <CheckCircle2 size={16} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteTask}
                    className="text-[#D1D5DB] hover:text-[#10B981]"
                  >
                    <Circle size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col gap-4">
              <div className="flex flex-col pb-3 border-b border-[#F3F4F6]">
                <h3 className="text-[14px] font-bold text-[#111111]">Select a day</h3>
                <span className="text-[12px] text-[#6B7280]">0 events</span>
              </div>
              <div className="flex flex-col items-center justify-center p-8 text-center text-[#9CA3AF]">
                <span className="text-[13px]">No events this day</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
