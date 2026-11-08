"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, Plus, FileSpreadsheet, ChevronRight } from "lucide-react";
import type { JournalTemplate } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksChooseJournalTemplateView({ tl }: Props) {
  const templates = useTimelineVar<JournalTemplate[]>(tl, "booksTemplates", []);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header / Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-journals"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Manual Journals</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-900 text-base">Templates</span>
          </div>
        </div>
        <button
          type="button"
          data-tl="btn-new-template"
          className="inline-flex items-center gap-1.5 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Template</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-5xl mx-auto w-full">
        {templates.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center flex flex-col items-center justify-center my-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#145CFB] flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You don&apos;t have any templates yet.</h3>
            <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
              Create templates for recurring manual journals with pre-filled line items to eliminate repetitive data entry.
            </p>
            <button
              type="button"
              data-tl="btn-new-template"
              className="inline-flex items-center gap-2 bg-[#145CFB] hover:bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Template</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">Template Name</th>
                  <th className="px-6 py-3">Reference#</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Currency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {templates.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{tpl.name}</td>
                    <td className="px-6 py-4 text-gray-600">{tpl.reference || "—"}</td>
                    <td className="px-6 py-4 text-gray-600">{tpl.journalType}</td>
                    <td className="px-6 py-4 text-gray-600">{tpl.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
