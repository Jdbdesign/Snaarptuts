"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Video, RotateCw, Download, Play } from "lucide-react";
import { MEETINGS_RECORDINGS } from "./drive-data";

export interface DriveMeetingsViewProps {
  tl?: Timeline;
}

export const DriveMeetingsView: React.FC<DriveMeetingsViewProps> = ({ tl }) => {
  const isRefreshing = useTimelineVar(tl!, "driveMeetingsRefreshing", false);

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]" data-tl="meetings-view">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#7014D9] flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Meetings</h1>
            <p className="text-xs text-gray-500">Recordings from your Snaarp Meet sessions</p>
          </div>
        </div>
        <button
          type="button"
          data-tl="btn-meetings-refresh"
          onClick={() => {
            tl?.setVar("driveMeetingsRefreshing", true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Duration</th>
              <th className="py-3 px-4 font-medium">Size</th>
              <th className="py-3 px-4 font-medium">Format</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
            {MEETINGS_RECORDINGS.map((recording, idx) => (
              <tr
                key={recording.id}
                data-tl={`row-meeting-${idx + 1}`}
                className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100/70 text-[#7014D9] flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-[#7014D9] transition-colors">
                        {recording.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">
                        {recording.code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {recording.date}
                </td>
                <td className="py-3.5 px-4 text-gray-400 font-mono">
                  {recording.duration}
                </td>
                <td className="py-3.5 px-4 text-gray-600 font-mono">
                  {recording.size}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200/60 uppercase">
                    {recording.format}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {recording.status === "Completed" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      Failed
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {recording.status === "Completed" && (
                    <button
                      type="button"
                      data-tl={`btn-meeting-download-${idx + 1}`}
                      onClick={() => {
                        tl?.setVar("driveMeetingsDownloadedToastOpen", true);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#7014D9] hover:bg-purple-50 rounded-md transition-colors cursor-pointer"
                      title="Download recording"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-3 px-4 bg-gray-50/50 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
          {MEETINGS_RECORDINGS.length} recordings
        </div>
      </div>
    </div>
  );
};
