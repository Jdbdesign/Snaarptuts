"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Folder,
  Upload,
  FolderUp,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode,
  File,
  Cloud,
  ChevronRight,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveCreateMenu({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveCreateMenuOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="create-upload-menu"
      className="absolute left-6 top-[160px] z-50 w-56 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl text-[13px] font-['Poppins',sans-serif] text-[#111827] select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Folder */}
      <button
        type="button"
        data-tl="menu-item-folder"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Folder size={17} className="text-[#F59E0B]" />
        <span>Folder</span>
      </button>

      {/* 2. Files upload */}
      <button
        type="button"
        data-tl="menu-item-file-upload"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Upload size={17} className="text-[#6B7280]" />
        <span>Files upload</span>
      </button>

      {/* 3. Folder upload */}
      <button
        type="button"
        data-tl="menu-item-folder-upload"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <FolderUp size={17} className="text-[#6B7280]" />
        <span>Folder upload</span>
      </button>

      <div className="my-1.5 border-t border-gray-100" />

      {/* 4. Snaarp Docs */}
      <button
        type="button"
        data-tl="menu-item-docs"
        className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <FileText size={17} className="text-[#7014D9]" />
          <span>Snaarp Docs</span>
        </div>
        <ChevronRight size={14} className="text-gray-400" />
      </button>

      {/* 5. Sheets */}
      <button
        type="button"
        data-tl="menu-item-sheets"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <FileSpreadsheet size={17} className="text-[#10B981]" />
        <span>Sheets</span>
      </button>

      {/* 6. Presentation */}
      <button
        type="button"
        data-tl="menu-item-presentation"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Presentation size={17} className="text-[#EF4444]" />
        <span>Presentation</span>
      </button>

      {/* 7. Markdown document */}
      <button
        type="button"
        data-tl="menu-item-markdown"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <FileCode size={17} className="text-[#3B82F6]" />
        <span>Markdown document</span>
      </button>

      {/* 8. Text document */}
      <button
        type="button"
        data-tl="menu-item-text"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <File size={17} className="text-[#6B7280]" />
        <span>Text document</span>
      </button>

      <div className="my-1.5 border-t border-gray-100" />

      {/* 9. Import from other drives */}
      <button
        type="button"
        data-tl="menu-item-import"
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Cloud size={17} className="text-[#6B7280]" />
        <span>Import from other drives</span>
      </button>
    </div>
  );
}
