"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Download,
  CheckCircle2,
  ListFilter,
  FileSpreadsheet,
  Clock,
} from "lucide-react";
import type { ZeusList, ZeusExport } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusExportsView({ tl }: Props) {
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);
  const selectedListId = useTimelineVar<string | null>(tl, "zeusSelectedExportListId", null);
  const exportStarted = useTimelineVar<boolean>(tl, "zeusExportStarted", false);
  const recentExports = useTimelineVar<ZeusExport[]>(tl, "zeusRecentExports", []);

  const selectedList = lists.find((l) => l.id === selectedListId) || null;

  const handleSelectExportList = (listId: string) => {
    tl.setVar("zeusSelectedExportListId", listId);
  };

  const handleStartExport = () => {
    tl.setVar("zeusExportStarted", true);
    tl.setVar("zeusToast", {
      text: "Export started",
      subtext: "You'll be notified when it's ready to download.",
    });

    const newExport: ZeusExport = {
      id: "exp-1",
      listName: selectedList?.name || "CEO",
      contactsCount: selectedList?.contacts?.length || 2,
      date: "10/11/2026",
      status: "completed",
    };
    tl.setVar("zeusRecentExports", [newExport, ...recentExports]);

    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 3000);
  };

  const handleDownload = () => {
    tl.setVar("zeusToast", {
      text: "Download started",
      subtext: "Saving export file to your downloads.",
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  const hasLists = lists.length > 0;

  return (
    <div data-tl="zeus-exports-view" className="h-full w-full overflow-y-auto bg-[#F6F6F8] p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Export</h1>
          <p className="text-xs text-gray-500 mt-1">
            Export contacts from your saved lists. You&apos;ll get an email when it&apos;s ready.
          </p>
        </div>

        {/* Card 1: Select a list to export */}
        <div data-tl="export-step1-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-3">1. Select a list to export</h2>

          {!hasLists ? (
            <div
              data-tl="exports-empty-card"
              className="py-8 px-4 text-center border border-dashed border-gray-200 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-2">
                <ListFilter className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-gray-700">No lists yet</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Add contacts to a list first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {lists.map((l) => {
                const isSelected = selectedListId === l.id;
                const count = l.contacts?.length ?? l.membersCount ?? 2;
                return (
                  <div
                    key={l.id}
                    data-tl={l.name === "CEO" ? "export-list-item-ceo" : `export-list-item-${l.id}`}
                    onClick={() => handleSelectExportList(l.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-[#F5EEFF]/50 border-[#7014D9] shadow-xs"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{l.name}</span>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          {l.type}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#7014D9]" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {l.type} • {count} {count === 1 ? "member" : "members"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Card 2: Export Action */}
        {selectedList && (
          <div data-tl="export-step2-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-gray-900 mb-4">2. Export</h2>

            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Total Contacts
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {selectedList.contacts?.length ?? selectedList.membersCount ?? 2}
                </span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Revealed (Free)
                </span>
                <span className="text-xl font-bold text-emerald-700">
                  {selectedList.contacts?.length ?? selectedList.membersCount ?? 2}
                </span>
              </div>

              <div className="bg-purple-50 border border-[#7014D9]/20 rounded-xl p-4">
                <span className="text-[10px] font-bold text-[#7014D9] uppercase tracking-wider block mb-1">
                  Unrevealed
                </span>
                <span className="text-xl font-bold text-[#7014D9]">0</span>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-export-revealed-free"
                onClick={handleStartExport}
                className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export revealed only (free)</span>
              </button>
            </div>

            {/* Export started alert message */}
            {exportStarted && (
              <div
                data-tl="export-started-alert"
                className="mt-5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-800 animate-in fade-in duration-200"
              >
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Export started. You will receive an email when it is ready.</span>
              </div>
            )}
          </div>
        )}

        {/* Card 3: Recent Exports */}
        {recentExports.length > 0 && (
          <div data-tl="recent-exports-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs animate-in fade-in duration-200">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Recent Exports</h2>

            <div className="space-y-2">
              {recentExports.map((exp) => (
                <div
                  key={exp.id}
                  data-tl={`recent-export-row-${exp.id}`}
                  className="p-3.5 bg-gray-50 border border-gray-200/80 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{exp.listName}</h4>
                      <p className="text-[11px] text-gray-500">
                        {exp.contactsCount} contacts exported • {exp.date}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-tl="btn-download-export"
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
