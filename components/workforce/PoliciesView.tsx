"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { SAMPLE_POLICIES, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  view?: "folders" | "engineering-list" | "document-detail";
};

export function PoliciesView({ tl, view: initialView }: Props) {
  const page = useTimelineVar(tl, "wfPage", "policies");
  const viewerOpen = useTimelineVar(tl, "wfPolicyViewerOpen", false);

  // Determine current active sub-view
  let currentView: "folders" | "engineering-list" | "document-detail" =
    initialView || "folders";

  if (page === "policies") {
    currentView = "folders";
  } else if (page === "policies-folder") {
    currentView = "engineering-list";
  } else if (page === "policy-details") {
    currentView = "document-detail";
  }

  const handleOpenFolder = () => {
    tl.setVar("wfPage", "policies-folder");
    tl.setUrl(URLS.policiesEngineering);
  };

  const handleBackToFolders = () => {
    tl.setVar("wfPage", "policies");
    tl.setUrl(URLS.policies);
  };

  const handleOpenPolicy = () => {
    tl.setVar("wfPage", "policy-details");
    tl.setUrl(URLS.policyDetails);
  };

  const handleBackToList = () => {
    tl.setVar("wfPage", "policies-folder");
    tl.setUrl(URLS.policiesEngineering);
  };

  return (
    <div
      data-scroller="policies"
      className="flex-1 overflow-y-auto no-scrollbar bg-[#F6F6F8] p-8"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* VIEW 1: Main Folders Grid (Step 45) */}
        {currentView === "folders" && (
          <div className="space-y-6">
            <div data-tl="policies-header">
              <h1 className="text-xl font-bold text-[#111827]">Policies</h1>
              <p className="text-xs text-[#6B7280] mt-1">
                Approved policies for your department
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9CA3AF] pointer-events-none">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                data-tl="input-search-folders"
                placeholder="Search department folders"
                readOnly
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-white text-xs text-[#111827] focus:outline-none placeholder:text-gray-400 shadow-sm"
              />
            </div>

            {/* Folder Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
              <button
                type="button"
                data-tl="policy-folder-engineering"
                onClick={handleOpenFolder}
                className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#7014D9]/40 transition-all text-center cursor-pointer"
              >
                <div className="relative mb-3">
                  <div className="w-16 h-16 flex items-center justify-center text-amber-400">
                    <Icon name="folder" size={56} className="text-amber-400 fill-amber-100" />
                  </div>
                  <span
                    data-tl="folder-badge-count"
                    className="absolute -bottom-1 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                  >
                    1
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#111827] group-hover:text-[#7014D9] transition-colors">
                  Engineering policies
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">Engineering</div>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: Folder Document List (Step 46) */}
        {currentView === "engineering-list" && (
          <div className="space-y-6">
            <button
              type="button"
              data-tl="policy-back-folders"
              onClick={handleBackToFolders}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4B5563] bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Icon name="chevronLeft" size={14} />
              <span>Back</span>
            </button>

            <div className="space-y-1">
              <h1 className="text-xl font-bold text-[#111827]">Engineering policies</h1>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#7014D9]">Engineering</span>
                <span className="text-gray-300">•</span>
                <span className="text-[#6B7280]">policies for engineering department</span>
              </div>
            </div>

            {/* Search Policies */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9CA3AF] pointer-events-none">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                data-tl="input-search-policies"
                placeholder="Search policies"
                readOnly
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 bg-white text-xs text-[#111827] focus:outline-none placeholder:text-gray-400 shadow-sm"
              />
            </div>

            {/* Table */}
            <div
              data-tl="policy-table-container"
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[#6B7280] font-medium">
                    <th className="py-3 px-5">Policy</th>
                    <th className="py-3 px-5">Version</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Uploaded</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr
                    data-tl="row-policy-engineering"
                    className="hover:bg-purple-50/30 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-[#111827]">
                      {SAMPLE_POLICIES.document.title}
                    </td>
                    <td className="py-4 px-5 text-[#4B5563]">
                      {SAMPLE_POLICIES.document.version}
                    </td>
                    <td className="py-4 px-5">
                      <span
                        data-tl="badge-policy-approved"
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F3E8FF] text-[#7014D9] border border-purple-200"
                      >
                        {SAMPLE_POLICIES.document.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-[#6B7280]">
                      {SAMPLE_POLICIES.document.uploadedDate}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        data-tl="btn-view-policy"
                        onClick={handleOpenPolicy}
                        className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-[#374151] hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination Footer */}
              <div
                data-tl="policy-pagination"
                className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-xs text-gray-400 bg-gray-50/50"
              >
                <span className="text-gray-300 cursor-not-allowed">Previous</span>
                <span className="font-semibold text-[#111827]">Page 1</span>
                <span className="text-gray-300 cursor-not-allowed">Next</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Document Details (Step 47) */}
        {currentView === "document-detail" && (
          <div className="space-y-6">
            <button
              type="button"
              data-tl="policy-back-list"
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4B5563] bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Icon name="chevronLeft" size={14} />
              <span>Back</span>
            </button>

            {/* Top Heading + Status Badge */}
            <div
              data-tl="policy-detail-header"
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-xl font-bold text-[#111827]">
                  {SAMPLE_POLICIES.document.title}
                </h1>
                <div
                  data-tl="policy-breadcrumb"
                  className="text-xs text-[#6B7280] mt-1"
                >
                  Engineering / Engineering policies / Version 1.0
                </div>
              </div>

              <span
                data-tl="badge-detail-approved"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3E8FF] text-[#7014D9] border border-purple-200 shadow-sm"
              >
                {SAMPLE_POLICIES.document.status}
              </span>
            </div>

            {/* White Details Card */}
            <div
              data-tl="policy-detail-card"
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5"
            >
              <div className="text-sm font-semibold text-[#111827]">
                {SAMPLE_POLICIES.document.description}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="text-gray-400">Uploaded by</div>
                  <div className="font-medium text-[#111827]">
                    {SAMPLE_POLICIES.document.uploadedBy}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-gray-400">Uploaded timestamp</div>
                  <div className="font-medium text-[#111827]">
                    {SAMPLE_POLICIES.document.uploadedTimestamp}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-gray-400">Attached File</div>
                  <div className="font-medium text-[#111827] flex items-center gap-1.5">
                    <Icon name="docFile" size={14} className="text-[#7014D9]" />
                    <span>{SAMPLE_POLICIES.document.fileName} / {SAMPLE_POLICIES.document.fileSize}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-gray-400">Reviewed timestamp</div>
                  <div className="font-medium text-[#111827]">
                    {SAMPLE_POLICIES.document.reviewedTimestamp}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  data-tl="btn-view-download-policy"
                  onClick={() => tl.setVar("wfPolicyViewerOpen", true)}
                  className="px-5 py-2.5 rounded-xl bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Icon name="docFile" size={15} />
                  <span>View / Download policy</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Viewer Modal for Policy */}
      <DocumentViewerModal
        isOpen={viewerOpen}
        onClose={() => tl.setVar("wfPolicyViewerOpen", false)}
        type="policy"
        fileName={SAMPLE_POLICIES.document.fileName}
      />
    </div>
  );
}
