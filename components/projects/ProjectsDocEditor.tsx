"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Share2,
  History,
  Undo2,
  Redo2,
  Heading1,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Baseline,
  Highlighter,
  Quote,
  Minus,
  List,
  ListOrdered,
  ListTodo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CodeXml,
  Table,
  Image as ImageIcon,
  Link2,
  Type,
  Plus,
  FileText,
  X,
} from "lucide-react";
import {
  type DocumentItem,
  PROJECTS_URLS,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsDocEditor({ tl }: Props) {
  const documents = useTimelineVar<DocumentItem[]>(tl, "documentsList", []);
  const activeDocId = useTimelineVar<string>(tl, "activeDocId", "doc-product-design");
  const isHistoryOpen = useTimelineVar<boolean>(tl, "isDocHistoryOpen", false);
  const activeTooltip = useTimelineVar<string | null>(tl, "docActiveTooltip", null);
  const editorText = useTimelineVar<string>(tl, "docEditorContent", "");
  const isSelected = useTimelineVar<boolean>(tl, "docTextSelected", false);
  const isBold = useTimelineVar<boolean>(tl, "docTextBold", false);
  const isUnderline = useTimelineVar<boolean>(tl, "docTextUnderline", false);

  const activeDoc =
    documents.find((d) => d.id === activeDocId) || {
      id: "doc-product-design",
      title: "Product design",
      updatedDate: "9/24/2026",
    };

  const handleBack = () => {
    tl.setVar("projectsView", "documents");
    tl.setUrl(PROJECTS_URLS.documents);
  };

  const handleExport = () => {
    pushProjectsToast(tl, "Document exported", "success");
  };

  const handleToggleHistory = () => {
    tl.setVar("isDocHistoryOpen", !isHistoryOpen);
  };

  const handleSelectDoc = (id: string) => {
    tl.setVar("activeDocId", id);
  };

  return (
    <div
      data-tl="projects-doc-editor-view"
      className="flex h-full w-full bg-white select-none overflow-hidden relative font-sans"
    >
      {/* 1. Left sub-panel: Documents tree */}
      <aside
        data-tl="doc-editor-sidebar"
        className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/60 flex flex-col justify-between py-3 px-3 overflow-y-auto no-scrollbar"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span
              data-tl="doc-editor-sidebar-title"
              className="text-xs font-bold text-gray-800 tracking-tight"
            >
              Documents
            </span>
            <button
              type="button"
              data-tl="doc-editor-add-subdoc-btn"
              onClick={() => {
                tl.setVar("newDocTitle", "");
                tl.setVar("isCreateDocModalOpen", true);
              }}
              className="w-5 h-5 flex items-center justify-center rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tree hierarchy */}
          <div data-tl="doc-editor-tree" className="space-y-1 relative pl-2 border-l border-gray-200 ml-3">
            {documents.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <div
                  key={doc.id}
                  data-tl={`doc-editor-item-${doc.id}`}
                  onClick={() => handleSelectDoc(doc.id)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#F5EEFF] text-[#7014D9] font-bold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <FileText
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? "text-[#7014D9]" : "text-gray-400"
                    }`}
                  />
                  <span className="truncate">{doc.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* 2. Main document editor zone */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar header */}
        <div
          data-tl="doc-editor-topbar"
          className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-white shrink-0"
        >
          {/* Left: Back button + Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="doc-editor-back-btn"
              onClick={handleBack}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2
              data-tl="doc-editor-title"
              className="text-base font-bold text-gray-900 tracking-tight"
            >
              {activeDoc.title}
            </h2>
          </div>

          {/* Right: Export + History */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="doc-editor-export-btn"
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              type="button"
              data-tl="doc-editor-history-btn"
              onClick={handleToggleHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* Status subline */}
        <div
          data-tl="doc-editor-status-line"
          className="h-7 border-b border-gray-100 px-4 flex items-center justify-between bg-gray-50/50 text-[11px] text-gray-500 shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-gray-600">Ready</span>
          </div>
          <span className="text-[#7014D9] font-medium">
            Editing as Current User
          </span>
        </div>

        {/* Rich text formatting toolbar */}
        <div
          data-tl="doc-editor-toolbar"
          className="h-10 border-b border-gray-200 px-3 flex items-center gap-1 bg-white shrink-0 overflow-x-auto no-scrollbar relative"
        >
          {/* Tooltip display */}
          {activeTooltip && (
            <div className="absolute -top-7 left-14 bg-gray-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md pointer-events-none z-30 animate-in fade-in duration-150">
              {activeTooltip}
              <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
            </div>
          )}

          <button
            type="button"
            data-tl="doc-tool-undo"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-redo"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            data-tl="doc-tool-h1"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-bold"
            className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
              isBold
                ? "bg-[#F5EEFF] text-[#7014D9] font-bold"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-italic"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-underline"
            className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
              isUnderline
                ? "bg-[#F5EEFF] text-[#7014D9] font-bold"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-strike"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-code"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-color"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Baseline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-highlight"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-quote"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-hr"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            data-tl="doc-tool-list"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-ordered"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-todo"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <ListTodo className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            data-tl="doc-tool-align-left"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-align-center"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-align-right"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            data-tl="doc-tool-codeblock"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <CodeXml className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-table"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-image"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-link"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            data-tl="doc-tool-format"
            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <Type className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Document body canvas */}
        <div
          data-tl="doc-editor-canvas"
          className="flex-1 overflow-y-auto no-scrollbar p-10 bg-white"
        >
          <div className="max-w-3xl mx-auto min-h-[400px]">
            {editorText ? (
              <p
                data-tl="doc-editor-text-line"
                className={`text-base leading-relaxed ${
                  isBold ? "font-bold" : "font-normal"
                } ${isUnderline ? "underline" : ""} ${
                  isSelected ? "bg-[#E9D5FF] px-1 rounded" : ""
                }`}
              >
                {editorText}
              </p>
            ) : (
              <p
                data-tl="doc-editor-placeholder"
                className="text-gray-300 text-base"
              >
                Type something...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Slide-out Version History panel */}
      {isHistoryOpen && (
        <aside
          data-tl="doc-version-history-panel"
          className="w-72 shrink-0 border-l border-gray-200 bg-white flex flex-col justify-between py-4 px-4 z-20 shadow-lg animate-in slide-in-from-right duration-200"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3
                data-tl="doc-history-title"
                className="text-sm font-bold text-gray-900 tracking-tight"
              >
                Version History
              </h3>
              <button
                type="button"
                data-tl="doc-history-close-btn"
                onClick={handleToggleHistory}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-12 text-xs text-gray-400">
              No version history yet
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
