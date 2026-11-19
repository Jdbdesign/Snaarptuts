'use client';

import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMarkDone: () => void;
  prospectName?: string;
  taskTitle?: string;
}

export function CrmTaskReminderModal({
  isOpen,
  onClose,
  onMarkDone,
  prospectName = 'Alex Morgan',
  taskTitle = 'Follow up call',
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-reminder-overlay"
    >
      <div
        className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-reminder-modal"
      >
        {/* Orange Banner Header */}
        <div className="bg-[#EA580C] px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">High Priority Task</h3>
              <p className="text-[11px] text-white/80 leading-tight">Needs your attention</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1"
            data-tl="crm-reminder-close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col gap-4 text-xs">
          <div>
            <h4 className="text-sm font-bold text-gray-900" data-tl="crm-reminder-task-heading">
              High priority task: {taskTitle}
            </h4>
            <p className="text-gray-600 mt-1.5 leading-relaxed">
              You have a high-priority task that needs attention. Linked to {prospectName}. Complete it or change its priority to dismiss this reminder.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={onMarkDone}
              className="flex-1 py-2.5 px-4 bg-[#059669] hover:bg-[#047857] text-white rounded-full font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              data-tl="crm-reminder-mark-done"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Mark Done</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              data-tl="crm-reminder-go-task"
            >
              <span>Go to Task</span>
              <span>→</span>
            </button>
          </div>

          {/* Remind Me Later */}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>REMIND ME LATER</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['10 minutes', '15 minutes', '30 minutes', '1 hour', '3 hours', 'Tomorrow'].map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={onClose}
                  data-tl={`crm-reminder-snooze-${pill.replace(/\s+/g, '-').toLowerCase()}`}
                  className="py-1.5 px-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-full text-[11px] font-medium text-gray-700 text-center transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-full text-[11px] font-medium text-gray-700 flex items-center justify-center gap-1.5 transition-colors mt-1"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Pick a specific date &amp; time</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
