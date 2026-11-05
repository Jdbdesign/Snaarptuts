"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  FileText,
  FileSpreadsheet,
  Folder,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { FOLDER_ITEMS, RECENT_FILES, SAMPLE_USER } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveHomeView({ tl }: Props) {
  const filter = useTimelineVar<string>(tl, "driveRecentFilter", "all");
  const isInputFocused = useTimelineVar(tl, "driveFilterInputFocused", false);
  const hasWorkspaceRow = useTimelineVar(tl, "driveHomeHasWorkspace", false);
  const hasProjectFilesRow = useTimelineVar(tl, "driveHomeHasProjectFiles", false);

  const filterChips = [
    { id: "all", label: "All" },
    { id: "folders", label: "Folders" },
    { id: "docs", label: "Docs" },
    { id: "sheets", label: "Sheets" },
    { id: "presentation", label: "Presentation" },
    { id: "pdf", label: "PDF" },
    { id: "images", label: "Images" },
  ];

  return (
    <div
      data-tl="drive-home-view"
      className="space-y-6 font-['Poppins',sans-serif] text-[#111827]"
    >
      {/* 1. Get Started Cards */}
      <div>
        <h2 className="text-[15px] font-bold text-[#111827] mb-3">
          Get started
        </h2>
        <div data-tl="getstarted-cards" className="grid grid-cols-3 gap-4">
          {/* Snaarp Docs */}
          <div
            data-tl="card-getstarted-docs"
            className="flex items-center gap-3.5 rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs hover:shadow-xs hover:border-purple-200 transition-all cursor-pointer"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#7014D9]">
              <FileText size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-bold text-[#111827] leading-tight">
                Snaarp Docs
              </h3>
              <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                Supercharge your writing
              </p>
            </div>
          </div>

          {/* Presentation */}
          <div
            data-tl="card-get-started-presentation"
            className="flex items-center gap-3.5 rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs hover:shadow-xs hover:border-purple-200 transition-all cursor-pointer"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white font-bold text-[15px]">
              P
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-bold text-[#111827] leading-tight">
                Presentation
              </h3>
              <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                Bring your ideas to life
              </p>
            </div>
          </div>

          {/* Sheets */}
          <div
            data-tl="card-get-started-sheets"
            className="flex items-center gap-3.5 rounded-2xl border border-[#EBECEF] bg-white p-4 shadow-2xs hover:shadow-xs hover:border-purple-200 transition-all cursor-pointer"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6D28D9] text-white">
              <FileSpreadsheet size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-bold text-[#111827] leading-tight">
                Sheets
              </h3>
              <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                Do more with your data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Section */}
      <div className="space-y-4">
        <h2 className="text-[15px] font-bold text-[#111827]">
          Recent
        </h2>

        {/* Filter Chips & Search input row */}
        <div className="flex items-center justify-between gap-4">
          {/* Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {filterChips.map((chip) => {
              const active = filter === chip.id;
              // Styling matches video: All is purple; Folders is yellow/orange; PDF is red; Images is green
              let activeClass = "bg-[#7014D9] text-white";
              if (chip.id === "folders") activeClass = "bg-[#FEF3C7] text-[#92400E] font-semibold";
              if (chip.id === "pdf") activeClass = "bg-[#FEE2E2] text-[#B91C1C] font-semibold";
              if (chip.id === "images") activeClass = "bg-[#DCFCE7] text-[#15803D] font-semibold";

              return (
                <button
                  key={chip.id}
                  type="button"
                  data-tl={`filter-chip-${chip.id}`}
                  onClick={() => tl.setVar("driveRecentFilter", chip.id)}
                  className={`rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors cursor-pointer ${
                    active ? activeClass : "bg-transparent text-[#4B5563] hover:bg-gray-100"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Filter by name or person input */}
          <div className="relative">
            <input
              type="text"
              data-tl="input-filter-recent"
              placeholder="Filter by name or person"
              className={`w-64 rounded-xl border bg-white px-3 py-1.5 text-[12px] text-[#111827] placeholder:text-[#9CA3AF] shadow-2xs transition-all ${
                isInputFocused
                  ? "border-[#7014D9] ring-2 ring-[#7014D9]/20"
                  : "border-[#E5E7EB]"
              }`}
              readOnly
            />
          </div>
        </div>

        {/* Table Content */}
        <div data-tl="recent-table" className="rounded-2xl border border-[#EBECEF] bg-white overflow-hidden shadow-2xs">
          {filter === "pdf" ? (
            <div>
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#F3F4F6] text-[11.5px] font-semibold text-[#6B7280]">
                    <th className="py-3 px-5 font-medium">Name</th>
                    <th className="py-3 px-5 font-medium">Opened</th>
                    <th className="py-3 px-5 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  <tr data-tl="row-pdf-q3report" className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-50 text-rose-600">
                          <FileText size={14} />
                        </div>
                        <div>
                          <span className="font-semibold text-[#111827] block leading-tight">Q3 report.pdf</span>
                          <span className="text-[10.5px] text-[#9CA3AF]">PDF document</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">Just now</td>
                    <td className="py-3 px-5 text-[#4B5563]">Sam Taylor</td>
                  </tr>
                  <tr data-tl="row-pdf-payslip" className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-50 text-rose-600">
                          <FileText size={14} />
                        </div>
                        <div>
                          <span className="font-semibold text-[#111827] block leading-tight">payslip.pdf</span>
                          <span className="text-[10.5px] text-[#9CA3AF]">PDF document</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">Yesterday</td>
                    <td className="py-3 px-5 text-[#4B5563]">Sam Taylor</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-[#F3F4F6] px-5 py-3 text-[11.5px] text-[#6B7280]">
                <span>Showing 1-2 of 2</span>
              </div>
            </div>
          ) : filter === "folders" ? (
            <div>
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-[#F3F4F6] text-[11.5px] font-semibold text-[#6B7280]">
                    <th className="py-3 px-5 font-medium">Name</th>
                    <th className="py-3 px-5 font-medium">Opened</th>
                    <th className="py-3 px-5 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {FOLDER_ITEMS.map((item) => (
                    <tr
                      key={item.id}
                      data-tl={`row-folder-${item.id}`}
                      className="hover:bg-purple-50/30 transition-colors"
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2.5">
                          <Folder size={17} className="text-[#F59E0B] fill-[#FEF3C7]" />
                          <div>
                            <span className="font-semibold text-[#111827] block leading-tight">
                              {item.name}
                            </span>
                            <span className="text-[10.5px] text-[#9CA3AF]">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-[#4B5563]">
                        {item.opened}
                      </td>
                      <td className="py-3 px-5 text-[#4B5563]">
                        {item.owner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Folders Pagination Bar */}
              <div className="flex items-center justify-between border-t border-[#F3F4F6] px-5 py-3 text-[11.5px] text-[#6B7280]">
                <span>Showing 1-4 of 4</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span>Rows per page</span>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded border border-[#E5E7EB] px-1.5 py-0.5 text-xs text-[#111827]"
                    >
                      <span>20</span>
                      <ChevronDown size={12} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-gray-300 cursor-not-allowed">
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-gray-700 font-medium">1 / 1</span>
                    <button type="button" className="text-gray-300 cursor-not-allowed">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-[#F3F4F6] text-[11.5px] font-semibold text-[#6B7280]">
                  <th className="py-3 px-5 font-medium">Name</th>
                  <th className="py-3 px-5 font-medium">Opened</th>
                  <th className="py-3 px-5 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {/* Created Project Files Row in Step 24 */}
                {hasProjectFilesRow && (
                  <tr
                    data-tl="row-recent-project-files"
                    className="hover:bg-purple-50/40 bg-purple-50/20 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <Folder size={17} className="text-[#F59E0B] fill-[#FEF3C7]" />
                        <div>
                          <span className="font-semibold text-[#111827] block leading-tight">
                            Project Files
                          </span>
                          <span className="text-[10.5px] text-[#9CA3AF]">
                            Folder
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      Just now
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      {SAMPLE_USER.name}
                    </td>
                  </tr>
                )}

                {/* Optional Workspaces Row in Step 21 */}
                {hasWorkspaceRow && (
                  <tr
                    data-tl="row-recent-workspace"
                    className="hover:bg-purple-50/40 bg-purple-50/20 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <Folder size={17} className="text-[#F59E0B] fill-[#FEF3C7]" />
                        <div>
                          <span className="font-semibold text-[#111827] block leading-tight">
                            Workspaces
                          </span>
                          <span className="text-[10.5px] text-[#9CA3AF]">
                            Folder
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      Just now
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      {SAMPLE_USER.name}
                    </td>
                  </tr>
                )}

                {RECENT_FILES.map((file) => (
                  <tr
                    key={file.id}
                    data-tl={`row-file-${file.id}`}
                    className="hover:bg-purple-50/30 transition-colors"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs"
                          style={{ backgroundColor: file.thumbnailColor ?? "#F3F4F6" }}
                        >
                          <ImageIcon size={14} className="text-gray-700" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#111827] block leading-tight">
                            {file.name}
                          </span>
                          <span className="text-[10.5px] text-[#9CA3AF]">
                            {file.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      {file.opened}
                    </td>
                    <td className="py-3 px-5 text-[#4B5563]">
                      {file.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
