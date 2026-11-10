"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { EventType } from "./me-data";
import { MeToastBanner } from "./MeToastBanner";

interface Props {
  tl: Timeline;
}

export function MeEventTypesView({ tl }: Props) {
  const eventTypes = useTimelineVar<EventType[]>(tl, "meEventTypes", []);
  const linkCopied = useTimelineVar<boolean>(tl, "meLinkCopied", false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 max-w-[1180px] mx-auto select-none text-left">
      <MeToastBanner tl={tl} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Scheduling
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create and manage the types of events people can book with you
          </p>
        </div>

        <button
          type="button"
          data-tl="me-event-types-btn-new"
          className="rounded-full bg-[#7014D9] hover:bg-[#5e0eb8] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>+ New Event Type</span>
        </button>
      </div>

      {/* Event Types Cards */}
      <div className="flex flex-col gap-4">
        {eventTypes.map((et: EventType) => {
          const isCopied = et.id === "creative-meeting" && linkCopied;

          return (
            <div
              key={et.id}
              data-tl={`me-card-${et.id}`}
              onClick={() => {
                tl.setVar("meEditDrawerOpen", true);
                tl.setVar("meEditTab", "basic");
                tl.setVar("meEditEventId", et.id);
              }}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between cursor-pointer group"
            >
              {/* Left Info */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xs mt-0.5"
                  style={{ backgroundColor: et.color || "#2563eb" }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <h2
                    data-tl={`me-card-title-${et.id}`}
                    className="font-bold text-base text-gray-900 group-hover:text-[#7014D9] transition-colors"
                  >
                    {et.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5 max-w-xl">
                    {et.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2.5 text-xs">
                    <span className="flex items-center gap-1 text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{et.duration} min</span>
                    </span>

                    <span className="flex items-center gap-1 text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{et.location}</span>
                    </span>

                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5">
                      Active
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400 mt-2 font-mono">
                    https://snaarp.me/jane/{et.slug}
                  </span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                {/* Active Toggle */}
                <button
                  type="button"
                  data-tl={`me-toggle-${et.id}`}
                  className="w-11 h-6 rounded-full bg-[#7014D9] flex items-center px-0.5"
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md transform translate-x-5" />
                </button>

                {/* Copy Link Button with Tooltip */}
                <div className="relative">
                  <button
                    type="button"
                    data-tl={`me-btn-copy-link-${et.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      tl.setVar("meLinkCopied", true);
                      tl.setVar("meToast", "Booking link copied to clipboard!");
                    }}
                    onMouseEnter={() => setHoveredLink(et.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {isCopied ? (
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </button>

                  {/* Tooltip */}
                  {hoveredLink === et.id && !isCopied && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-white shadow-md whitespace-nowrap">
                      Copy link
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  data-tl={`me-btn-delete-${et.id}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
