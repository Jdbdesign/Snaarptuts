"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  FileCode,
  Download,
  Trash2,
  X,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  List,
  ListOrdered,
  Code,
  Quote,
  Link2,
  Image as ImageIcon,
  PenLine,
  Columns,
  Eye,
  History,
} from "lucide-react";
import { INITIAL_MARKDOWN_TEMPLATE } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveMarkdownEditor({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveMarkdownEditorOpen", false);
  const isDirty = useTimelineVar(tl, "driveMarkdownDirty", false);
  const isSaving = useTimelineVar(tl, "driveMarkdownSaving", false);
  const isSaved = useTimelineVar(tl, "driveMarkdownSaved", false);
  const content = useTimelineVar<string>(
    tl,
    "field:markdownContent",
    useTimelineVar<string>(tl, "driveMarkdownContent", INITIAL_MARKDOWN_TEMPLATE)
  );

  if (!isOpen) return null;

  const handleSave = () => {
    tl.setVar("driveMarkdownSaving", true);
    setTimeout(() => {
      tl.setVar("driveMarkdownSaving", false);
      tl.setVar("driveMarkdownSaved", true);
      tl.setVar("driveMarkdownDirty", false);
    }, 600);
  };

  const handleClose = () => {
    tl.setVar("driveMarkdownEditorOpen", false);
    tl.setVar("driveFileMeetingNotesAdded", true);
  };

  const lines = content.split("\n");

  return (
    <div
      data-tl="editor-markdown-fullscreen"
      className="fixed inset-0 z-50 flex flex-col bg-[#0B0F19]/80 backdrop-blur-xs select-none font-['Poppins',sans-serif] animate-in fade-in duration-150"
    >
      {/* Dark Top Bar */}
      <header className="flex h-13 shrink-0 items-center justify-between border-b border-[#1E293B] bg-[#0B0F19] px-5 select-none">
        {/* Left: icon, doc name, unsaved/saving indicator */}
        <div className="flex items-center gap-2.5">
          <FileCode size={18} className="text-[#3B82F6]" />
          <span className="font-semibold text-[13px] text-white">Meeting notes.md</span>
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
            data-tl="btn-editor-download"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Download"
          >
            <Download size={16} />
          </button>
          <button
            type="button"
            data-tl="btn-editor-delete"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            data-tl="btn-editor-save"
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
            data-tl="btn-editor-close"
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
        <div className="flex-1 w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Formatting Toolbar */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 bg-gray-50/70 select-none">
            {/* Left formatting tools */}
            <div className="flex items-center gap-1 text-gray-600">
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Bold">
                <Bold size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Italic">
                <Italic size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Strikethrough">
                <Strikethrough size={15} />
              </button>
              <div className="h-4 w-[1px] bg-gray-300 mx-1" />
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Heading">
                <Heading1 size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Bullet List">
                <List size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Numbered List">
                <ListOrdered size={15} />
              </button>
              <div className="h-4 w-[1px] bg-gray-300 mx-1" />
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Code">
                <Code size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Quote">
                <Quote size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Link">
                <Link2 size={15} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Image">
                <ImageIcon size={15} />
              </button>
            </div>

            {/* Right modes */}
            <div className="flex items-center gap-1 text-gray-500">
              <button
                type="button"
                className="flex items-center justify-center h-7 w-7 rounded-lg bg-blue-100 text-[#2563EB]"
                title="Edit mode"
              >
                <PenLine size={14} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Split view">
                <Columns size={14} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="Preview">
                <Eye size={14} />
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded cursor-pointer" title="History">
                <History size={14} />
              </button>
            </div>
          </div>

          {/* Text Area with line numbers */}
          <div data-tl="editor-markdown-body" className="flex-1 flex overflow-y-auto font-mono text-[13px] leading-relaxed p-4 bg-white">
            {/* Line numbers */}
            <div className="w-10 shrink-0 text-right pr-4 text-gray-400 select-none space-y-1">
              {lines.map((_: string, i: number) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Content editable or textarea */}
            <textarea
              data-tl="textarea-markdown"
              value={content}
              onChange={(e) => {
                tl.setVar("field:markdownContent", e.target.value);
                tl.setVar("driveMarkdownDirty", true);
              }}
              className="flex-1 h-full w-full resize-none border-none outline-none font-mono text-[#111827] bg-transparent leading-6 p-0"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
