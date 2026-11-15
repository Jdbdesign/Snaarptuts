"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Search,
  ArrowLeft,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { TEMPLATES_LIST } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsTemplateGalleryModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isTemplateModalOpen", false);
  const step = useTimelineVar<"gallery" | "form">(tl, "templateModalStep", "gallery");
  const selectedCategory = useTimelineVar<string>(tl, "templateCategory", "All");

  const formClient = useTimelineVar<string>(tl, "formClient", "");
  const formCategory = useTimelineVar<string>(tl, "formCategory", "Research");
  const formStartDate = useTimelineVar<string>(tl, "formStartDate", "2026-11-16");
  const formEndDate = useTimelineVar<string>(tl, "formEndDate", "2026-12-19");
  const formLead = useTimelineVar<string>(tl, "formLead", "Jane Doe");
  const formPriority = useTimelineVar<string>(tl, "formPriority", "High");

  if (!isOpen) return null;

  const categories = [
    "All",
    "Software/IT",
    "Marketing/Sales",
    "Construction",
    "Manufacturing",
    "Pharma",
    "HR",
    "Others",
  ];

  const handleClose = () => {
    tl.setVar("isTemplateModalOpen", false);
  };

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === "tmpl-explore") {
      tl.setVar("templateModalStep", "form");
    }
  };

  const handleBackToGallery = () => {
    tl.setVar("templateModalStep", "gallery");
  };

  const handleUseTemplate = () => {
    tl.setVar("isTemplateModalOpen", false);
    tl.setVar("hasCreatedProject", true);
    tl.setVar("selectedProjectId", "p-template");
    tl.setVar("isProjectDrawerOpen", true);
    pushProjectsToast(tl, 'Project "Explore Snaarp Projects!" created with 5 tasks!');
  };

  return (
    <div
      data-tl="template-gallery-backdrop"
      className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-150"
    >
      <div
        data-tl="template-gallery-modal"
        className="w-[680px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-200/90 flex flex-col overflow-hidden text-xs text-gray-800"
      >
        {step === "gallery" ? (
          /* STEP 1: Gallery */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-100">
              <div>
                <h2
                  data-tl="template-gallery-title"
                  className="text-base font-bold text-gray-900 tracking-tight"
                >
                  Template Gallery
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose a template to get started quickly, or start from scratch.
                </p>
              </div>
              <button
                type="button"
                data-tl="template-gallery-close-btn"
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: Categories, Search, Grid */}
            <div className="p-6 pt-4 space-y-4 overflow-y-auto no-scrollbar">
              {/* Category pills */}
              <div
                data-tl="template-categories-bar"
                className="flex items-center gap-1.5 flex-wrap"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    data-tl={`template-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => tl.setVar("templateCategory", cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-[#7014D9] text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search templates..."
                  data-tl="template-search-input"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none placeholder-gray-400 text-gray-700"
                />
              </div>

              {/* Grid of templates */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {TEMPLATES_LIST.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    data-tl={`template-card-${tmpl.id}`}
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    className="border border-gray-200/90 hover:border-[#7014D9]/60 hover:shadow-sm rounded-xl p-3.5 flex flex-col justify-between cursor-pointer transition-all bg-white group min-h-[95px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-gray-900 group-hover:text-[#7014D9] transition-colors">
                          {tmpl.name}
                        </span>
                        {tmpl.category !== "All" && (
                          <span className="text-[9px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            {tmpl.category}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>
                    {tmpl.tasksCount && (
                      <div className="text-[10px] font-medium text-gray-400 mt-2">
                        {tmpl.tasksCount} tasks
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: Template Creation Form */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header with back link */}
            <div className="p-6 pb-3 flex items-start justify-between border-b border-gray-100">
              <div>
                <button
                  type="button"
                  data-tl="template-form-back-btn"
                  onClick={handleBackToGallery}
                  className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-gray-900 mb-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to templates</span>
                </button>
                <div className="flex items-center gap-2">
                  <h2
                    data-tl="template-form-title"
                    className="text-base font-bold text-gray-900 tracking-tight"
                  >
                    Explore Snaarp Projects!
                  </h2>
                  <span className="text-[9px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                    Others
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  With this template, you can get a kick start of Snaarp Projects.
                </p>
              </div>
              <button
                type="button"
                data-tl="template-form-close-btn"
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 pt-4 space-y-3.5 overflow-y-auto no-scrollbar flex-1">
              {/* Project Name */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  PROJECT NAME *
                </label>
                <input
                  type="text"
                  readOnly
                  value="Explore Snaarp Projects!"
                  data-tl="template-form-name-input"
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none font-medium text-gray-900"
                />
              </div>

              {/* Client & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    CLIENT
                  </label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Client name"
                    value={formClient}
                    data-tl="template-form-client-input"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none placeholder-gray-400 font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    CATEGORY
                  </label>
                  <div
                    data-tl="template-form-category-select"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl flex items-center justify-between font-medium text-gray-900 cursor-pointer"
                  >
                    <span>{formCategory}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    START DATE
                  </label>
                  <div
                    data-tl="template-form-start-date"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl flex items-center justify-between font-medium text-gray-900"
                  >
                    <span>{formStartDate}</span>
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    END DATE
                  </label>
                  <div
                    data-tl="template-form-end-date"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl flex items-center justify-between font-medium text-gray-900"
                  >
                    <span>{formEndDate}</span>
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Lead Assignee & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    LEAD ASSIGNEE
                  </label>
                  <div
                    data-tl="template-form-lead-select"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl flex items-center justify-between font-medium text-gray-900 cursor-pointer"
                  >
                    <span>{formLead}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    PRIORITY
                  </label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <button
                      type="button"
                      data-tl="template-priority-high"
                      onClick={() => tl.setVar("formPriority", "High")}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        formPriority === "High"
                          ? "bg-[#7014D9] text-white shadow-2xs"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      High
                    </button>
                    <button
                      type="button"
                      data-tl="template-priority-medium"
                      onClick={() => tl.setVar("formPriority", "Medium")}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        formPriority === "Medium"
                          ? "bg-[#7014D9] text-white shadow-2xs"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      data-tl="template-priority-low"
                      onClick={() => tl.setVar("formPriority", "Low")}
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        formPriority === "Low"
                          ? "bg-[#7014D9] text-white shadow-2xs"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Low
                    </button>
                  </div>
                </div>
              </div>

              {/* Predefined tasks (5) */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  PREDEFINED TASKS (5)
                </div>
                <div className="space-y-1">
                  {[
                    "Create your first project",
                    "Add team members",
                    "Set up task statuses",
                    "Create milestones",
                    "Explore reports",
                  ].map((taskTitle, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{taskTitle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Workflow */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  STATUS WORKFLOW
                </div>
                <div className="flex items-center gap-2">
                  <span className="border border-gray-200 bg-white text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded">
                    To Do
                  </span>
                  <span className="border border-gray-200 bg-white text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded">
                    In Progress
                  </span>
                  <span className="border border-gray-200 bg-white text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded">
                    Done
                  </span>
                  <span className="border border-gray-200 bg-white text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 px-6 border-t border-gray-100 flex items-center justify-end gap-2.5 bg-gray-50/50">
              <button
                type="button"
                data-tl="template-form-cancel-btn"
                onClick={handleClose}
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="template-form-submit-btn"
                onClick={handleUseTemplate}
                className="bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
