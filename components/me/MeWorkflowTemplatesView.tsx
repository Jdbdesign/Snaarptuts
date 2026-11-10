"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  WORKFLOW_TEMPLATES,
  ME_URLS,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeWorkflowTemplatesView({ tl }: Props) {
  const loading = useTimelineVar<boolean>(tl, "meWorkflowTemplatesLoading", false);

  if (loading) {
    return (
      <div
        data-tl="me-workflow-templates-loading"
        className="flex flex-col items-center justify-center min-h-[400px] space-y-3"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#7014D9] border-t-transparent" />
        <span className="text-xs font-medium text-gray-500">Loading templates...</span>
      </div>
    );
  }

  return (
    <div data-tl="me-workflow-templates-view" className="max-w-5xl mx-auto space-y-6 select-none">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Choose a workflow template
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Start from a ready-made template or write your own message.
          </p>
        </div>

        <button
          type="button"
          data-tl="me-templates-back-btn"
          onClick={() => {
            tl.setUrl(ME_URLS.workflows);
            tl.setVar("meView", "workflows");
          }}
          className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Hero Card: Custom Workflow */}
      <div className="rounded-xl border border-[#E9D5FF] bg-[#FAF5FF] p-5 flex items-center justify-between shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Custom workflow</h2>
          <p className="text-xs text-gray-600 mt-1">
            Start from scratch. Pick a trigger and add your own email, SMS, delay, or webhook steps.
          </p>
        </div>

        <button
          type="button"
          data-tl="me-templates-custom-btn"
          onClick={() => {
            tl.setUrl(ME_URLS.workflowsCreateCustom);
            tl.setVar("meEditorIsCustom", true);
            tl.setVar("meWorkflowTemplatesOpen", false);
          }}
          className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs shrink-0"
        >
          Create custom workflow
        </button>
      </div>

      {/* Subheading */}
      <div className="pt-2">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Or use a template</h2>

        {/* 2-column Grid */}
        <div className="grid grid-cols-2 gap-4">
          {WORKFLOW_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              data-tl={`me-template-card-${tpl.id}`}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900">{tpl.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  data-tl={`me-template-use-${tpl.id}`}
                  onClick={() => {
                    tl.setVar("meWorkflowTemplatesOpen", false);
                    tl.setVar("meEditorTemplateId", tpl.id);
                    tl.setVar("meEditorIsCustom", false);
                    tl.setVar("meEditorWorkflowName", tpl.title);
                  }}
                  className="rounded-lg bg-[#F3E8FF] px-3.5 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-purple-200 transition-colors"
                >
                  Use this template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
