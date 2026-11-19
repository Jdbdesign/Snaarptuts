"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { WIDGET_CATALOG } from "./crm-data";
import {
  X,
  Activity,
  BarChart2,
  TrendingUp,
  PieChart,
  Circle,
  Filter,
  Gauge,
  Table as TableIcon,
  Award,
  Calendar,
  Grid,
  CheckCircle2,
} from "lucide-react";

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onAddWidgets: (selectedIds: string[]) => void;
}

export function CrmAddWidgetsModal({ tl, isOpen, onClose, onAddWidgets }: Props) {
  const selectedList = useTimelineVar<string[]>(tl, "crm:selectedWidgets", []);

  if (!isOpen) return null;

  const toggleWidget = (id: string) => {
    let next: string[];
    if (selectedList.includes(id)) {
      next = selectedList.filter((item) => item !== id);
    } else {
      next = [...selectedList, id];
    }
    tl.setVar("crm:selectedWidgets", next);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "activity":
        return <Activity size={18} className="text-[#6366F1]" />;
      case "barChart":
        return <BarChart2 size={18} className="text-[#3B82F6]" />;
      case "trendingUp":
        return <TrendingUp size={18} className="text-[#8B5CF6]" />;
      case "pieChart":
        return <PieChart size={18} className="text-[#EC4899]" />;
      case "circle":
        return <Circle size={18} className="text-[#10B981]" />;
      case "filter":
        return <Filter size={18} className="text-[#F59E0B]" />;
      case "gauge":
        return <Gauge size={18} className="text-[#06B6D4]" />;
      case "table":
        return <TableIcon size={18} className="text-[#64748B]" />;
      case "award":
        return <Award size={18} className="text-[#EAB308]" />;
      case "calendar":
        return <Calendar size={18} className="text-[#EF4444]" />;
      case "grid":
        return <Grid size={18} className="text-[#7C3AED]" />;
      default:
        return <Grid size={18} />;
    }
  };

  const count = selectedList.length;

  return (
    <div
      data-tl="crm-add-widgets-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="flex max-h-[90vh] w-full max-w-[620px] flex-col rounded-[20px] border border-[#ECECF1] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-bold text-[#111111]">Add Widgets</h2>
            <p className="text-[13px] text-[#6B7280]">
              Select as many as you like, then add them all at once.
            </p>
          </div>
          <button
            type="button"
            data-tl="crm-close-add-widgets"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Widgets Grid */}
        <div className="no-scrollbar my-4 grid flex-1 grid-cols-2 gap-3 overflow-y-auto pr-1">
          {WIDGET_CATALOG.map((item) => {
            const isSelected = selectedList.includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                data-tl={`crm-widget-opt-${item.id}`}
                onClick={() => toggleWidget(item.id)}
                className={`relative flex flex-col justify-between rounded-[14px] border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-[#4F46E5] bg-[#EEF2FF] shadow-xs"
                    : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                }`}
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 text-[#4F46E5]">
                    <CheckCircle2 size={16} />
                  </span>
                )}
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F4F6]">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[13.5px] font-semibold text-[#111111]">
                    {item.name}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#6B7280]">{item.description}</p>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#ECECF1] pt-4">
          <span className="text-[12.5px] text-[#6B7280]">
            {count === 1 ? "1 widget selected" : `${count} widgets selected`}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-tl="crm-cancel-add-widgets"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-[#F3F4F6]"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="crm-btn-confirm-add-widgets"
              disabled={count === 0}
              onClick={() => {
                onAddWidgets(selectedList);
                tl.setVar("crm:selectedWidgets", []);
              }}
              className={`rounded-full px-5 py-2 text-[13px] font-medium text-white shadow-xs transition-colors ${
                count > 0 ? "bg-[#4F46E5] hover:bg-[#4338CA]" : "cursor-not-allowed bg-[#9CA3AF]"
              }`}
            >
              {count > 0 ? `+ Add ${count} widget${count > 1 ? "s" : ""}` : "+ Add widgets"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
