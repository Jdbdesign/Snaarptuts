"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X } from "lucide-react";
import {
  NEW_DOCUMENT_DATA,
  type DocumentItem,
  PROJECTS_URLS,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsDocDialogs({ tl }: Props) {
  const isCreateOpen = useTimelineVar<boolean>(tl, "isCreateDocModalOpen", false);
  const isDeleteOpen = useTimelineVar<boolean>(tl, "isDeleteDocModalOpen", false);
  const newTitle = useTimelineVar<string>(tl, "newDocTitle", "");
  const docsList = useTimelineVar<DocumentItem[]>(tl, "documentsList", []);
  const deleteTarget = useTimelineVar<DocumentItem | null>(tl, "deleteDocTarget", null);

  const handleCloseCreate = () => {
    tl.setVar("isCreateDocModalOpen", false);
  };

  const handleCreateSubmit = () => {
    if (!newTitle.trim()) return;
    const newDoc: DocumentItem = {
      ...NEW_DOCUMENT_DATA,
      id: "doc-design-document",
      title: newTitle.trim(),
      updatedDate: "11/16/2026",
    };
    tl.setVar("documentsList", [
      ...docsList.filter((d) => d.id !== "doc-design-document"),
      newDoc,
    ]);
    tl.setVar("activeDocId", "doc-design-document");
    tl.setVar("isCreateDocModalOpen", false);
    tl.setVar("projectsView", "doc-editor");
    tl.setUrl(PROJECTS_URLS.docEditorNew);
  };

  const handleCloseDelete = () => {
    tl.setVar("isDeleteDocModalOpen", false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    tl.setVar(
      "documentsList",
      docsList.filter((d) => d.id !== deleteTarget.id)
    );
    tl.setVar("isDeleteDocModalOpen", false);
    pushProjectsToast(tl, "Document deleted", "success");
  };

  return (
    <>
      {/* Create Document Dialog */}
      {isCreateOpen && (
        <div
          data-tl="create-doc-dialog-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
        >
          <div
            data-tl="create-doc-dialog"
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h3
                data-tl="create-doc-dialog-title"
                className="text-base font-bold text-gray-900 tracking-tight"
              >
                Create Document
              </h3>
              <button
                type="button"
                data-tl="create-doc-close-btn"
                onClick={handleCloseCreate}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block text-[11px] font-bold text-gray-700 tracking-wider uppercase">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="create-doc-title-input"
                value={newTitle}
                onChange={(e) => tl.setVar("newDocTitle", e.target.value)}
                placeholder="Document title"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                data-tl="create-doc-cancel-btn"
                onClick={handleCloseCreate}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="create-doc-submit-btn"
                onClick={handleCreateSubmit}
                className="px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Document Dialog */}
      {isDeleteOpen && deleteTarget && (
        <div
          data-tl="delete-doc-dialog-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
        >
          <div
            data-tl="delete-doc-dialog"
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h3
                data-tl="delete-doc-dialog-title"
                className="text-base font-bold text-gray-900 tracking-tight"
              >
                Delete document?
              </h3>
              <button
                type="button"
                data-tl="delete-doc-close-btn"
                onClick={handleCloseDelete}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Delete <span className="font-semibold text-gray-900">{deleteTarget.title}</span>? It will be removed from your documents.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                data-tl="delete-doc-cancel-btn"
                onClick={handleCloseDelete}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="delete-doc-confirm-btn"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
