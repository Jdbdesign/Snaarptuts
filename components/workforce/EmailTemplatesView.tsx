"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { EMAIL_TEMPLATES } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function EmailTemplatesView({ tl }: Props) {
  const selectedTemplateId = useTimelineVar<string>(
    tl,
    "wfSelectedEmailTemplate",
    "additional-docs"
  );

  const selectedTemplate =
    EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    EMAIL_TEMPLATES[0];

  return (
    <div
      data-scroller="email-templates-page"
      className="flex-1 overflow-y-auto bg-[#F8F9FB] p-6 text-[#111827] font-['Poppins',sans-serif]"
    >
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#111827]">
              Email templates
            </h1>
            <p className="text-xs text-[#6B7280]">
              Configure automated candidate communications and notifications
            </p>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of Templates */}
          <div
            data-tl="template-list"
            className="md:col-span-4 flex flex-col gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-2xs"
          >
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              All Templates
            </div>
            {EMAIL_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  data-tl={
                    tmpl.id === "additional-docs"
                      ? "template-item-additional-docs"
                      : tmpl.id === "app-received"
                      ? "template-item-app-received"
                      : undefined
                  }
                  onClick={() => tl.setVar("wfSelectedEmailTemplate", tmpl.id)}
                  className={`flex flex-col text-left p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#F3E8FF] border border-[#7014D9]/30 text-[#7014D9]"
                      : "bg-white hover:bg-gray-50 border border-transparent text-[#374151]"
                  }`}
                >
                  <span className="font-semibold text-xs text-[#111827]">
                    {tmpl.name}
                  </span>
                  <span className="text-[11px] text-[#6B7280] mt-0.5">
                    Automatic sending on
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Template Editor & Preview */}
          <div className="md:col-span-8 flex flex-col gap-5">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    data-tl="input-template-name"
                    value={selectedTemplate.name}
                    readOnly
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-[#F9FAFB] text-[#111827]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Purpose
                  </label>
                  <select
                    data-tl="select-template-purpose"
                    value={selectedTemplate.purpose}
                    disabled
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-[#F9FAFB] text-[#111827]"
                  >
                    <option>{selectedTemplate.purpose}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  data-tl="input-template-subject"
                  defaultValue={selectedTemplate.subject}
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Message
                </label>
                <textarea
                  data-tl="textarea-template-message"
                  data-scroller="template-message"
                  rows={8}
                  defaultValue={selectedTemplate.message}
                  className="w-full rounded-lg border border-[#D1D5DB] p-3 font-sans leading-relaxed focus:border-[#7014D9] focus:outline-none overflow-y-auto"
                />
              </div>

              {/* Placeholders */}
              <div
                data-tl="text-template-placeholders"
                className="rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-3 text-[11px] text-[#6B7280] leading-relaxed"
              >
                <span className="font-semibold text-[#374151]">
                  Placeholders:{" "}
                </span>
                <span>{selectedTemplate.placeholders}</span>
              </div>

              {/* Auto send toggle */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-[#E5E7EB]">
                <input
                  type="checkbox"
                  data-tl="checkbox-template-autosend"
                  defaultChecked={selectedTemplate.autoSend}
                  className="mt-0.5 rounded text-[#7014D9] focus:ring-[#7014D9]"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-xs text-[#111827]">
                    Send automatically
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    When enabled, this is the default template after HR confirms
                    a document request. It does not request documents merely
                    because an applicant changes stage.
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div
              data-tl="card-template-preview"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-3 text-xs"
            >
              <div className="font-bold text-xs uppercase tracking-wider text-[#6B7280]">
                Preview (sample applicant)
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex flex-col gap-2">
                <div className="font-semibold text-xs text-[#111827]">
                  {selectedTemplate.previewSubject}
                </div>
                <div className="text-[11px] text-[#4B5563] whitespace-pre-line leading-relaxed">
                  {selectedTemplate.previewBody}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                data-tl="btn-save-template"
                className="rounded-xl bg-[#7014D9] px-6 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors"
              >
                Save template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
