'use client';

import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export function CrmNewTargetModal({ tl, isOpen, onClose, onCreate }: Props) {
  const period = useTimelineVar<string>(tl, 'field:crm_target_period', 'Monthly');
  const year = useTimelineVar<string>(tl, 'field:crm_target_year', '2026');
  const month = useTimelineVar<string>(tl, 'field:crm_target_month', 'November');
  const revenue = useTimelineVar<string>(tl, 'field:crm_target_rev', '0');
  const dealCount = useTimelineVar<string>(tl, 'field:crm_target_deals', '0');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-new-target-overlay"
    >
      <div
        className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        data-tl="crm-new-target-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-[17px] font-bold text-[#111111]">New Sales Target</h2>
          <button
            type="button"
            onClick={onClose}
            data-tl="crm-target-modal-close"
            className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Period */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[#4B5563]">Period</label>
          <div
            data-tl="crm-target-period-select"
            className="flex h-10 w-full items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] bg-white cursor-pointer hover:border-[#7014D9]"
          >
            <span>{period}</span>
            <ChevronDown size={15} className="text-[#9CA3AF]" />
          </div>
        </div>

        {/* Year and Month */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#4B5563]">Year</label>
            <input
              type="text"
              readOnly
              data-tl="crm-target-year-input"
              value={year}
              className="h-10 w-full rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] outline-none focus:border-[#7014D9]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[#4B5563]">Month</label>
            <div
              data-tl="crm-target-month-select"
              className="flex h-10 w-full items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] bg-white cursor-pointer hover:border-[#7014D9]"
            >
              <span>{month}</span>
              <ChevronDown size={15} className="text-[#9CA3AF]" />
            </div>
          </div>
        </div>

        {/* Revenue Target */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[#4B5563]">Revenue target</label>
          <input
            type="text"
            readOnly
            data-tl="crm-target-rev-input"
            value={revenue}
            className="h-10 w-full rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Deal Count Target */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-[#4B5563]">Deal count target (optional)</label>
          <input
            type="text"
            readOnly
            data-tl="crm-target-deal-input"
            value={dealCount}
            className="h-10 w-full rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            data-tl="crm-target-cancel-btn"
            className="px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:text-[#111111]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreate}
            data-tl="crm-target-create-btn"
            className="h-10 rounded-full bg-[#7014D9] px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Create Target
          </button>
        </div>
      </div>
    </div>
  );
}
