"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function ComplianceView({ tl }: Props) {
  const currentView = useTimelineVar<
    "list" | "new-folder" | "engineering-folder" | "policy-details"
  >(tl, "wfComplianceView", "list");

  const menuOpen = useTimelineVar(tl, "wfComplianceMenuOpen", false);
  const selectedUploaders = useTimelineVar<string[]>(
    tl,
    "wfComplianceSelectedUploaders",
    []
  );
  const selectedDept = useTimelineVar(tl, "wfComplianceFolderDept", null);
  const folderName = useTimelineVar(tl, "wfComplianceFolderName", "");
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <div
      data-scroller="compliance-page"
      className="flex-1 overflow-y-auto bg-[#F8F9FB] p-6 text-[#111827] font-['Poppins',sans-serif]"
    >
      {/* 1. Main Folders List View */}
      {currentView === "list" && (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1
                data-tl="compliance-title"
                className="text-xl font-bold tracking-tight text-[#111827]"
              >
                Compliance
              </h1>
              <p className="text-xs text-[#6B7280]">
                Manage department policies and assigned uploads
              </p>
            </div>
            <button
              type="button"
              data-tl="btn-create-compliance-folder"
              onClick={() => {
                tl.setVar("wfComplianceView", "new-folder");
                tl.setUrl(URLS.complianceFolderNew);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Icon name="plus" size={14} />
              <span>Create department folder</span>
            </button>
          </div>

          {/* Awaiting Approval Card */}
          <div
            data-tl="card-awaiting-approval"
            className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Icon name="clock" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#111827]">
                    Awaiting approval (1)
                  </span>
                  <span className="text-xs font-semibold text-[#374151]">
                    Marketing policies
                  </span>
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Marketing policies · Jordan Lee · Version 1.0
                </div>
              </div>
            </div>
            <button
              type="button"
              data-tl="btn-review-awaiting-policy"
              className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-2xs self-start sm:self-auto"
            >
              Review policy
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-sm">
            <input
              type="text"
              data-tl="input-search-compliance-folders"
              placeholder="Search department folders"
              className="h-9 w-full rounded-xl border border-[#D1D5DB] bg-white pl-9 pr-3 text-xs focus:border-[#7014D9] focus:outline-none"
            />
            <Icon
              name="search"
              size={14}
              className="absolute left-3 top-2.5 text-[#9CA3AF]"
            />
          </div>

          {/* Folder Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Engineering Folder */}
            <div
              data-tl="card-folder-engineering"
              onClick={() => {
                tl.setVar("wfComplianceView", "engineering-folder");
                tl.setUrl(URLS.complianceEngineering);
              }}
              className="relative rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs hover:border-[#7014D9]/40 hover:shadow-xs transition-all cursor-pointer flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-amber-500">
                    <Icon name="folder" size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#111827]">
                      Engineering policies
                    </h3>
                    <span className="text-xs text-[#6B7280]">Engineering</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#4B5563]">
                    1
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      data-tl="btn-menu-folder-engineering"
                      onClick={(e) => {
                        e.stopPropagation();
                        tl.setVar("wfComplianceMenuOpen", !menuOpen);
                      }}
                      className="p-1 text-[#9CA3AF] hover:text-[#111827] rounded"
                    >
                      <Icon name="moreHorizontal" size={16} />
                    </button>
                    {menuOpen && (
                      <div
                        data-tl="menu-folder-actions"
                        className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
                      >
                        <div
                          data-tl="menu-folder-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar("wfComplianceMenuOpen", false);
                          }}
                          className="px-3 py-1.5 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          Delete folder
                        </div>
                        <div
                          data-tl="menu-folder-settings"
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar("wfComplianceMenuOpen", false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                        >
                          Folder settings
                        </div>
                        <div
                          data-tl="menu-folder-copy"
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar("wfComplianceMenuOpen", false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                        >
                          Copy upload link
                        </div>
                        <div
                          data-tl="menu-folder-open"
                          onClick={(e) => {
                            e.stopPropagation();
                            tl.setVar("wfComplianceMenuOpen", false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                        >
                          Open upload page
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Folder */}
            <div
              data-tl="card-folder-marketing"
              className="relative rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs hover:border-[#7014D9]/40 hover:shadow-xs transition-all flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-amber-500">
                    <Icon name="folder" size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#111827]">
                      Marketing policies
                    </h3>
                    <span className="text-xs text-[#6B7280]">Marketing</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#4B5563]">
                    0
                  </span>
                  <button
                    type="button"
                    className="p-1 text-[#9CA3AF] hover:text-[#111827] rounded"
                  >
                    <Icon name="moreHorizontal" size={16} />
                  </button>
                </div>
              </div>

              <div>
                <span
                  data-tl="link-awaiting-review"
                  className="rounded bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]"
                >
                  1 awaiting HR review
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Create Department Folder Subpage (Step 88) */}
      {currentView === "new-folder" && (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <button
            type="button"
            data-tl="btn-back-compliance"
            onClick={() => {
              tl.setVar("wfComplianceView", "list");
              tl.setUrl(URLS.compliance);
            }}
            className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-2xs w-fit"
          >
            <Icon name="arrowLeft" size={14} />
            <span>Back</span>
          </button>

          <h1 className="text-xl font-bold tracking-tight text-[#111827]">
            Create department folder
          </h1>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-5 text-xs">
            {/* Department Select */}
            <div className="relative">
              <label className="block font-medium text-[#374151] mb-1">
                Department
              </label>
              <button
                type="button"
                data-tl="select-folder-department"
                onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
              >
                <span>{selectedDept || "Select a department"}</span>
                <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
              </button>
              {deptDropdownOpen && (
                <div
                  data-tl="dropdown-folder-dept"
                  className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                >
                  <div
                    data-tl="opt-folder-dept-eng"
                    onClick={() => {
                      tl.setVar("wfComplianceFolderDept", "Engineering");
                      setDeptDropdownOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-blue-50 text-blue-700 font-medium cursor-pointer"
                  >
                    Engineering
                  </div>
                  <div
                    onClick={() => {
                      tl.setVar("wfComplianceFolderDept", "Marketing");
                      setDeptDropdownOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    Marketing
                  </div>
                </div>
              )}
            </div>

            {/* Folder Name */}
            <div>
              <label className="block font-medium text-[#374151] mb-1">
                Folder name
              </label>
              <input
                type="text"
                data-tl="input-folder-name"
                value={folderName}
                onChange={(e) =>
                  tl.setVar("wfComplianceFolderName", e.target.value)
                }
                placeholder="Folder name"
                className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-[#374151] mb-1">
                Description
              </label>
              <textarea
                data-tl="textarea-folder-desc"
                rows={2}
                placeholder="Optional folder description"
                className="w-full rounded-lg border border-[#D1D5DB] p-2.5 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            {/* Assigned uploaders */}
            <div
              data-tl="section-assigned-uploaders"
              className="flex flex-col gap-3 pt-2 border-t border-[#E5E7EB]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-[#111827]">
                    Assigned uploaders / HODs
                  </h3>
                  <p className="text-[11px] text-[#6B7280]">
                    Tag employees or admins who can use this folder&apos;s upload
                    link. Uploading does not publish a policy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => tl.setVar("wfComplianceSelectedUploaders", [])}
                  className="rounded border border-[#D1D5DB] px-2.5 py-1 text-[11px] text-[#374151] hover:bg-gray-50"
                >
                  Clear uploader selection
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                <span>
                  {selectedUploaders.length > 0
                    ? `${selectedUploaders.length} selected`
                    : "0 selected"}
                </span>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] p-3 bg-[#F9FAFB]">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      data-tl="checkbox-uploader-alex"
                      checked={selectedUploaders.includes("Alex Morgan")}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedUploaders, "Alex Morgan"]
                          : selectedUploaders.filter((n) => n !== "Alex Morgan");
                        tl.setVar("wfComplianceSelectedUploaders", next);
                      }}
                      className="rounded"
                    />
                    <span className="font-medium text-[#111827]">
                      Alex Morgan
                    </span>
                  </div>
                  <span className="text-[#6B7280] text-[11px]">
                    alex.morgan@snaarp.com
                  </span>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      data-tl="checkbox-uploader-jordan"
                      checked={selectedUploaders.includes("Jordan Lee")}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...selectedUploaders, "Jordan Lee"]
                          : selectedUploaders.filter((n) => n !== "Jordan Lee");
                        tl.setVar("wfComplianceSelectedUploaders", next);
                      }}
                      className="rounded"
                    />
                    <span className="font-medium text-[#111827]">
                      Jordan Lee
                    </span>
                  </div>
                  <span className="text-[#6B7280] text-[11px]">
                    jordan.lee@snaarp.com
                  </span>
                </label>
              </div>
            </div>

            {/* Viewing access */}
            <div
              data-tl="block-viewing-access"
              className="flex flex-col gap-2 pt-2 border-t border-[#E5E7EB]"
            >
              <h3 className="font-bold text-xs text-[#111827]">
                Who can view approved policies?
              </h3>
              <select
                data-tl="select-viewing-access"
                className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
              >
                <option>All employees in this department</option>
              </select>
              <p className="text-[11px] text-[#6B7280]">
                Employees must still belong to this department when opening a
                policy. HR/admin can access all folders.
              </p>
            </div>

            {/* Submit button (disabled) */}
            <div className="flex justify-end pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                disabled
                data-tl="btn-save-folder-notify"
                className="rounded-xl bg-[#F3E8FF] px-5 py-2.5 text-xs font-semibold text-[#7014D9] opacity-70 cursor-not-allowed"
              >
                Save folder and notify uploaders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Engineering Folder Policies Subpage (Step 89 part 1) */}
      {currentView === "engineering-folder" && (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-back-compliance"
                onClick={() => {
                  tl.setVar("wfComplianceView", "list");
                  tl.setUrl(URLS.compliance);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50 shadow-2xs"
              >
                <Icon name="arrowLeft" size={16} />
              </button>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                  Engineering policies
                </h1>
                <p className="text-xs text-[#6B7280]">
                  Engineering · policies for engineering department
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-tl="btn-eng-folder-settings"
                className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-2xs"
              >
                Folder settings
              </button>
              <button
                type="button"
                data-tl="btn-eng-copy-link"
                className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-2xs"
              >
                Copy upload link
              </button>
              <button
                type="button"
                data-tl="btn-eng-open-upload"
                className="rounded-lg bg-[#7014D9] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#5B0FB3] shadow-2xs"
              >
                Open upload page
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search policies"
              className="h-9 w-64 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs"
            />
            <select className="h-9 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs">
              <option>All available statuses</option>
            </select>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                  <th className="py-3 px-4">Policy</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Uploaded</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-bold text-[#111827]">
                    ENGINEERING POLICY
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">1.0</td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]">
                      Approved
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">30/10/2026</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      data-tl="btn-view-eng-policy"
                      onClick={() => {
                        tl.setVar("wfComplianceView", "policy-details");
                        tl.setUrl(URLS.compliancePolicyReview);
                      }}
                      className="rounded-lg border border-[#D1D5DB] px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 text-xs text-[#6B7280]">
              <button
                type="button"
                disabled
                className="opacity-50 cursor-not-allowed"
              >
                Previous
              </button>
              <span>Page 1</span>
              <button
                type="button"
                disabled
                className="opacity-50 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-lg border border-[#D1D5DB] px-3 py-1.5 text-xs text-[#374151] hover:bg-gray-50"
            >
              Show folder activity
            </button>
          </div>
        </div>
      )}

      {/* 4. Policy Details & Review Subpage (Step 89 part 2) */}
      {currentView === "policy-details" && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-compliance"
              onClick={() => {
                tl.setVar("wfComplianceView", "engineering-folder");
                tl.setUrl(URLS.complianceEngineering);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50 shadow-2xs"
            >
              <Icon name="arrowLeft" size={16} />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                  ENGINEERING POLICY
                </h1>
                <span
                  data-tl="badge-eng-policy-approved"
                  className="rounded bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-semibold text-[#7014D9]"
                >
                  Approved
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Engineering / Engineering policies / Version 1.0
              </p>
            </div>
          </div>

          {/* Details Card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4">
            <p className="text-xs text-[#4B5563]">
              Policies for engineering department
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#6B7280] border-t border-[#E5E7EB] pt-3">
              <div>
                Uploaded by:{" "}
                <span className="font-semibold text-[#111827]">Alex Morgan</span>
              </div>
              <div>
                Uploaded:{" "}
                <span className="text-[#111827]">30/10/2026, 7:49:43 AM</span>
              </div>
              <div>
                File:{" "}
                <span className="font-mono text-[#111827]">
                  engineering-policy.pdf / 5 KB
                </span>
              </div>
              <div>
                Reviewed:{" "}
                <span className="text-[#111827]">30/10/2026, 7:51:51 AM</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                data-tl="btn-view-download-policy"
                onClick={() => setViewerOpen(true)}
                className="rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors flex items-center gap-1.5"
              >
                <Icon name="docFile" size={14} />
                <span>View / Download policy</span>
              </button>
              <button
                type="button"
                data-tl="btn-upload-new-version"
                className="rounded-xl border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Upload new version
              </button>
            </div>
          </div>

          {/* HR Review Card */}
          <div
            data-tl="card-hr-review"
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-3"
          >
            <h2 className="font-bold text-sm text-[#111827]">HR review</h2>
            <div>
              <label className="block text-[#6B7280] mb-1">
                Feedback or archive reason
              </label>
              <textarea
                data-tl="textarea-hr-feedback"
                rows={3}
                placeholder="Optional feedback..."
                className="w-full rounded-lg border border-[#D1D5DB] p-2.5 focus:border-[#7014D9] focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled
                data-tl="btn-archive-policy"
                className="rounded-xl border border-[#7014D9] px-4 py-2 text-xs font-semibold text-[#7014D9] opacity-60 cursor-not-allowed"
              >
                Archive policy
              </button>
            </div>
          </div>

          {/* Document Viewer Modal */}
          <DocumentViewerModal
            isOpen={viewerOpen}
            onClose={() => setViewerOpen(false)}
            type="policy"
            fileName="engineering-policy.pdf"
          />
        </div>
      )}
    </div>
  );
}
