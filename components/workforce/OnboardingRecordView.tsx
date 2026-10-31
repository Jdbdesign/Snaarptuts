"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ONBOARDING_RECORD } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
  onOpenTaskDetail?: (taskId: string) => void;
};

export function OnboardingRecordView({ tl, onBack, onOpenTaskDetail }: Props) {
  const activeTab = useTimelineVar<"overview" | "checklist" | "documents" | "activity">(
    tl,
    "wfActiveRecordTab",
    "overview"
  );

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="btn-back-onboarding-record"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-semibold hover:bg-[#E9D5FF] transition-colors"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 data-tl="record-employee-name" className="text-xl font-bold text-[#111827]">
          {ONBOARDING_RECORD.employee}
        </h2>
        <p data-tl="record-subline" className="text-xs text-[#6B7280] mt-1">
          {ONBOARDING_RECORD.program} / {ONBOARDING_RECORD.version} / Start date {ONBOARDING_RECORD.startDate} /{" "}
          {ONBOARDING_RECORD.status}
        </p>
      </div>

      {/* Progress card */}
      <div
        data-tl="record-progress-card"
        className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2"
      >
        <span className="text-xs font-bold text-[#111827]">{ONBOARDING_RECORD.progressText}</span>
        <div
          data-tl="record-green-bar"
          className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden"
        >
          <div className="h-full w-full bg-[#16A34A] rounded-full" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        {(["overview", "checklist", "documents", "activity"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            data-tl={`tab-rec-${tab}`}
            onClick={() => tl.setVar("wfActiveRecordTab", tab)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors capitalize ${
              activeTab === tab
                ? "bg-[#7014D9] text-white"
                : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. Overview Tab */}
        {activeTab === "overview" && (
          <div
            data-tl="rec-overview-content"
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-4 text-xs">
              <div>
                <span className="text-[#6B7280] block mb-0.5">Program</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.program}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Version</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.version}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Employee</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.employee}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Department</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.department}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div>
                <span className="text-[#6B7280] block mb-0.5">Onboarding mentor</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.mentor}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Start date</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.startDate}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Completion date</span>
                <span className="font-semibold text-[#111827]">{ONBOARDING_RECORD.overviewDetails.completionDate}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Status</span>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-[#16A34A] border border-green-200">
                  {ONBOARDING_RECORD.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Checklist Tab */}
        {activeTab === "checklist" && (
          <div data-tl="rec-checklist-content" className="flex flex-col gap-3">
            {ONBOARDING_RECORD.tasks.map((task) => (
              <div
                key={task.id}
                data-tl={`rec-${task.id}`}
                onClick={() => onOpenTaskDetail?.(task.id)}
                className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-[#7014D9] cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">{task.name} *</h4>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {task.owner} / Due {task.due}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3E8FF] text-[#7014D9]">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 3. Documents Tab */}
        {activeTab === "documents" && (
          <div data-tl="rec-documents-content" className="flex flex-col gap-3">
            {ONBOARDING_RECORD.documents.map((doc) => (
              <div
                key={doc.id}
                data-tl="rec-doc-row"
                className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">{doc.name} *</h4>
                  <p className="text-[11px] text-[#6B7280] mt-1">
                    {doc.owner} / Due {doc.due}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3E8FF] text-[#7014D9]">
                    {doc.status}
                  </span>
                  <button
                    type="button"
                    data-tl="btn-view-doc-file"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50"
                  >
                    <Icon name="docFile" size={14} />
                    <span>View {doc.doc}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Activity Tab */}
        {activeTab === "activity" && (
          <div
            data-tl="rec-activity-content"
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-3"
          >
            {ONBOARDING_RECORD.activity.map((act) => (
              <div
                key={act.id}
                data-tl={`rec-act-${act.id}`}
                className="p-4 rounded-xl bg-gray-50 border border-[#F3F4F6] flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827]">
                    {act.action} {act.target ? `/ ${act.target}` : ""}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">{act.time}</span>
                </div>
                {act.detail && <p className="text-xs text-[#6B7280]">{act.detail}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
