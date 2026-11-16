"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Plus, Search, FileText, Trash2 } from "lucide-react";
import {
  type DocumentItem,
  PROJECTS_URLS,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsDocumentsView({ tl }: Props) {
  const documents = useTimelineVar<DocumentItem[]>(tl, "documentsList", []);
  const searchQuery = useTimelineVar<string>(tl, "docsSearchQuery", "");

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleOpenDoc = (doc: DocumentItem) => {
    tl.setVar("activeDocId", doc.id);
    tl.setVar("projectsView", "doc-editor");
    tl.setUrl(
      doc.id === "doc-product-design"
        ? PROJECTS_URLS.docEditor
        : `projects.snaarp.com/documents/${doc.id}`
    );
  };

  const handleOpenCreateModal = () => {
    tl.setVar("newDocTitle", "");
    tl.setVar("isCreateDocModalOpen", true);
  };

  const handleDeleteDoc = (e: React.MouseEvent, doc: DocumentItem) => {
    e.stopPropagation();
    tl.setVar("deleteDocTarget", doc);
    tl.setVar("isDeleteDocModalOpen", true);
  };

  return (
    <div
      data-tl="projects-documents-view"
      className="space-y-6 max-w-7xl mx-auto font-sans select-none pb-12"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1
          data-tl="documents-page-title"
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          Documents
        </h1>
        <button
          type="button"
          data-tl="new-doc-btn"
          onClick={handleOpenCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-72">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          data-tl="docs-search-input"
          value={searchQuery}
          onChange={(e) => tl.setVar("docsSearchQuery", e.target.value)}
          placeholder="Search documents..."
          className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] placeholder-gray-400 text-gray-800 shadow-2xs"
        />
      </div>

      {/* Grid of Documents */}
      <div
        data-tl="documents-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            data-tl={`doc-card-${doc.id}`}
            onClick={() => handleOpenDoc(doc)}
            className="group relative bg-white border border-gray-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all cursor-pointer shadow-2xs min-h-[140px]"
          >
            <div className="space-y-3">
              <div className="w-7 h-7 rounded-lg bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3
                  data-tl={`doc-card-title-${doc.id}`}
                  className="font-bold text-sm text-gray-900 group-hover:text-[#7014D9] transition-colors leading-tight"
                >
                  {doc.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  Updated {doc.updatedDate}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-center">
              <button
                type="button"
                data-tl={`doc-delete-btn-${doc.id}`}
                onClick={(e) => handleDeleteDoc(e, doc)}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
