import React, { useState } from "react";
import {
  Search,
  Upload,
  RefreshCw,
  Edit3,
  Globe,
  PenTool,
  List,
  LayoutGrid,
  Download,
  MoreVertical,
  Loader2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { QUICK_CARDS, type PdfFileItem } from "./pdf-data";

interface Props {
  files: PdfFileItem[];
  filterTab: "all" | "pdf";
  viewMode: "list" | "grid";
  searchQuery: string;
  isUploading: boolean;
  onUploadClick?: () => void;
  onFilterTabChange?: (tab: "all" | "pdf") => void;
  onViewModeChange?: (mode: "list" | "grid") => void;
  onSearchChange?: (q: string) => void;
  onDownloadRow?: (file: PdfFileItem) => void;
}

export function PdfFilesView({
  files,
  filterTab,
  viewMode,
  searchQuery,
  isUploading,
  onUploadClick,
  onFilterTabChange,
  onViewModeChange,
  onSearchChange,
  onDownloadRow,
}: Props) {
  const [hoveredDownloadId, setHoveredDownloadId] = useState<string | null>(null);
  const [hoveredMoreId, setHoveredMoreId] = useState<string | null>(null);

  // Filter files by tab and search
  const pdfFilesCount = files.filter((f) => f.type === "pdf").length;
  const allFilesCount = files.length;

  const filteredFiles = files.filter((f) => {
    if (filterTab === "pdf" && f.type !== "pdf") return false;
    if (searchQuery.trim()) {
      return f.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div data-tl="pdf-files-view" className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* 1. Header with Title and Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">My files</h1>
        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              data-tl="files-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search files..."
              className="pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600 w-64 shadow-2xs"
            />
          </div>

          {/* Purple Upload File Button */}
          <button
            type="button"
            data-tl="upload-file-btn"
            onClick={onUploadClick}
            disabled={isUploading}
            className="flex items-center gap-2 bg-[#7014D9] hover:bg-[#5E10B8] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload file</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Quick Action Cards (Convert, Edit, Translate, Sign) */}
      <div data-tl="quick-cards-row" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_CARDS.map((card) => {
          let IconComponent = RefreshCw;
          if (card.iconType === "edit") IconComponent = Edit3;
          if (card.iconType === "translate") IconComponent = Globe;
          if (card.iconType === "sign") IconComponent = PenTool;

          return (
            <div
              key={card.id}
              data-tl={`quick-card-${card.iconType}`}
              className="flex items-center justify-center flex-col py-6 px-4 rounded-2xl border transition-shadow cursor-pointer hover:shadow-xs"
              style={{
                backgroundColor: card.bgColor,
                borderColor: card.borderColor,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-2.5 shadow-2xs"
                style={{ backgroundColor: card.iconBg }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-800">{card.title}</span>
            </div>
          );
        })}
      </div>

      {/* 3. Filter Tabs (All / PDF) & View Mode Toggles */}
      <div className="flex items-center justify-between pt-2">
        {/* Left Tabs */}
        <div data-tl="files-filter-tabs" className="flex items-center gap-1.5">
          <button
            type="button"
            data-tl="tab-all"
            onClick={() => onFilterTabChange?.("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterTab === "all"
                ? "bg-white text-gray-900 border border-gray-200 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            All {allFilesCount}
          </button>
          <button
            type="button"
            data-tl="tab-pdf"
            onClick={() => onFilterTabChange?.("pdf")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterTab === "pdf"
                ? "bg-white text-gray-900 border border-gray-200 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            PDF {pdfFilesCount}
          </button>
        </div>

        {/* Right List/Grid View Toggle */}
        <div
          data-tl="files-view-toggle-capsule"
          className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200"
        >
          <button
            type="button"
            data-tl="view-toggle-list"
            onClick={() => onViewModeChange?.("list")}
            className={`p-1 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="view-toggle-grid"
            onClick={() => onViewModeChange?.("grid")}
            className={`p-1 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white text-gray-900 shadow-2xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Files List View (Table) */}
      {viewMode === "list" && (
        <div
          data-tl="files-table-container"
          className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-2xs"
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Updated</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFiles.map((file, idx) => (
                <tr
                  key={file.id}
                  data-tl={file.id === "f-4" ? "row-acme-resume" : `file-row-${file.id}`}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  {/* File Name + Icon */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                        {file.type === "pdf" ? (
                          <FileText className="w-4 h-4 text-red-500" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 text-xs truncate max-w-sm">
                        {file.name}
                      </span>
                    </div>
                  </td>

                  {/* Size */}
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    {file.size}
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    {file.updated}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 relative">
                      {/* Download button with tooltip */}
                      <div className="relative">
                        <button
                          type="button"
                          data-tl={file.id === "f-4" ? "action-download-row-resume" : `action-download-row-${idx + 1}`}
                          onClick={() => onDownloadRow?.(file)}
                          onMouseEnter={() => setHoveredDownloadId(file.id)}
                          onMouseLeave={() => setHoveredDownloadId(null)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        {hoveredDownloadId === file.id && (
                          <div className="absolute bottom-full mb-1 right-0 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                            Download
                          </div>
                        )}
                      </div>

                      {/* More options button with tooltip */}
                      <div className="relative">
                        <button
                          type="button"
                          data-tl={`action-more-row-${idx + 1}`}
                          onMouseEnter={() => setHoveredMoreId(file.id)}
                          onMouseLeave={() => setHoveredMoreId(null)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        {hoveredMoreId === file.id && (
                          <div className="absolute bottom-full mb-1 right-0 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                            Options
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Files Grid View (Cards) */}
      {viewMode === "grid" && (
        <div data-tl="files-grid-container" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              data-tl={`file-grid-card-${file.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 shadow-2xs hover:shadow-xs transition-shadow"
            >
              {/* Pinkish preview tile with red PDF icon */}
              <div className="w-full h-40 bg-[#FFF1F2] border border-red-100 rounded-xl flex items-center justify-center">
                {file.type === "pdf" ? (
                  <FileText className="w-10 h-10 text-red-500" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-amber-500" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs truncate">{file.name}</p>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
