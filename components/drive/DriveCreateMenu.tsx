"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 166, left: 72 });

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const menuEl = menuRef.current;
      const shellEl =
        menuEl?.closest<HTMLElement>("[data-tl=drive-shell]") ??
        document.querySelector<HTMLElement>("[data-tl=drive-shell]");
      if (!shellEl) return;

      const target = shellEl.querySelector<HTMLElement>("[data-tl=btn-sidebar-create]");
      if (!target) return;

      const shellRect = shellEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scale = shellRect.width / 1440;

      const targetLeft = (targetRect.left - shellRect.left) / scale;
      const targetBottom = (targetRect.bottom - shellRect.top) / scale;

      const left = Math.round(targetLeft);
      const top = Math.round(targetBottom + 4);

      setCoords({ top, left });
    };

    updatePosition();
    const raf = requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      data-tl="create-upload-menu"
      style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
      className="absolute z-50 w-56 rounded-2xl border border-gray-200 bg-white py-2 shadow-xl text-[13px] font-['Poppins',sans-serif] text-[#111827] select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Folder */}
      <button
        type="button"
        data-tl="menu-item-folder"
        onClick={() => {
          tl.setVar("driveFolderModalOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Folder size={17} className="text-[#F59E0B]" />
        <span>Folder</span>
      </button>

      {/* 2. Files upload */}
      <button
        type="button"
        data-tl="menu-item-file-upload"
        onClick={() => {
          tl.setVar("driveFilePickerOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Upload size={17} className="text-[#6B7280]" />
        <span>Files upload</span>
      </button>

      {/* 3. Folder upload */}
      <button
        type="button"
        data-tl="menu-item-folder-upload"
        onClick={() => {
          tl.setVar("driveFolderPickerOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
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
        onClick={() => {
          tl.setVar("driveMarkdownModalOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <FileCode size={17} className="text-[#3B82F6]" />
        <span>Markdown document</span>
      </button>

      {/* 8. Text document */}
      <button
        type="button"
        data-tl="menu-item-text"
        onClick={() => {
          tl.setVar("driveTextModalOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
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
        onClick={() => {
          tl.setVar("driveImportModalOpen", true);
          tl.setVar("driveCreateMenuOpen", false);
        }}
        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors cursor-pointer"
      >
        <Cloud size={17} className="text-[#6B7280]" />
        <span>Import from other drives</span>
      </button>
    </div>
  );
}
