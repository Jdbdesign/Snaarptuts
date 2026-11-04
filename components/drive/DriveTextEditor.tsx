"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileText, Download, Trash2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveTextEditor({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveTextEditorOpen", false);
  const isDirty = useTimelineVar(tl, "driveTextDirty", false);
  const isSaving = useTimelineVar(tl, "driveTextSaving", false);
  const isSaved = useTimelineVar(tl, "driveTextSaved", false);
  const content = useTimelineVar<string>(
    tl,
    "field:textContent",
    useTimelineVar<string>(tl, "driveTextContent", "")
  );

  if (!isOpen) return null;

  const handleSave = () => {
    tl.setVar("driveTextSaving", true);
    setTimeout(() => {
      tl.setVar("driveTextSaving", false);
      tl.setVar("driveTextSaved", true);
      tl.setVar("driveTextDirty", false);
    }, 600);
  };

  const handleClose = () => {
    tl.setVar("driveTextEditorOpen", false);
    tl.setVar("driveFileSampleTxtAdded", true);
  };

  const lines = content ? content.split("\n") : [""];

  return (
    <div
      data-tl="editor-text-fullscreen"
      className="fixed inset-0 z-50 flex flex-col bg-[#0B0F19]/80 backdrop-blur-xs select-none font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      {/* Dark Top Bar */}
      <header className="flex h-13 shrink-0 items-center justify-between border-b border-[#1E293B] bg-[#0B0F19] px-5 select-none">
        {/* Left: icon, doc name, unsaved/saving indicator */}
        <div className="flex items-center gap-2.5">
          <FileText size={18} className="text-gray-300" />
          <span className="font-semibold text-[13px] text-white">Sample.txt</span>
          {isDirty && !isSaved && (
            <span className="text-[11px] font-medium text-amber-400">Unsaved</span>
          )}
          {isSaving && (
            <span className="text-[11px] font-medium text-blue-400">Saving...</span>
          )}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-text-download"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Download"
          >
            <Download size={16} />
          </button>
          <button
            type="button"
            data-tl="btn-text-delete"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            data-tl="btn-text-save"
            onClick={handleSave}
            className={`rounded-lg px-3.5 py-1 text-[12px] font-semibold transition-colors cursor-pointer ${
              isDirty || isSaving
                ? "bg-[#2563EB] text-white hover:bg-blue-600 shadow-xs"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            data-tl="btn-text-close"
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer ml-1"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Center Editor Container */}
      <div className="flex-1 overflow-hidden p-6 flex flex-col items-center">
        <div className="flex-1 w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col p-5 overflow-hidden">
          <div data-tl="editor-text-body" className="flex-1 flex overflow-y-auto font-mono text-[13px] leading-relaxed">
            {/* Line numbers */}
            <div className="w-10 shrink-0 text-right pr-4 text-gray-400 select-none space-y-1">
              {lines.map((_: string, i: number) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Content textarea */}
            <textarea
              data-tl="textarea-plain-text"
              value={content}
              onChange={(e) => {
                tl.setVar("field:textContent", e.target.value);
                tl.setVar("driveTextDirty", true);
              }}
              placeholder="Start typing..."
              className="flex-1 h-full w-full resize-none border-none outline-none font-mono text-[#111827] placeholder:text-gray-400 bg-transparent leading-6 p-0"
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
