"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { CRM_HOME_METRICS } from "./crm-data";

interface Props {
  tl?: Timeline;
}

export function CrmHomeView(_props: Props) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto p-7"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 data-tl="crm-home-title" className="text-[22px] font-bold text-[#111111]">
          Dashboard
        </h1>
        <p className="text-[13px] text-[#6B7280]">Your CRM at a glance</p>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CRM_HOME_METRICS.map((metric) => (
          <div
            key={metric.id}
            data-tl={`crm-metric-${metric.id}`}
            className="flex flex-col justify-between rounded-[16px] border border-[#ECECF1] bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
          >
            <div className="text-[11px] font-bold tracking-wider text-[#9CA3AF]">
              {metric.label}
            </div>
            <div className="my-2.5 text-[28px] font-bold text-[#111111]">
              {metric.value}
            </div>
            <div className="text-[12px] text-[#6B7280]">
              {metric.sublabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
