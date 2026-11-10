"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { INITIAL_BOOKINGS } from "./me-data";

interface Props {
  tl?: Timeline;
}

export function MeBookingDetailView({ tl }: Props) {
  const booking = INITIAL_BOOKINGS[0];

  return (
    <div className="flex flex-col gap-6 max-w-[1080px] mx-auto select-none text-left">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="me-detail-back-link"
          onClick={() => {
            if (tl) {
              tl.setUrl("snaarp.me/dashboard");
              tl.setVar("meView", "dashboard");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Bookings</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h1
            data-tl="me-detail-title"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            {booking.title}
          </h1>
          <span
            data-tl="me-detail-subtitle"
            className="text-sm text-gray-500 mt-1"
          >
            with {booking.inviteeName}
          </span>
        </div>

        <span
          data-tl="me-detail-status-badge"
          className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800"
        >
          {booking.status}
        </span>
      </div>

      {/* Main Content: 2 Cards */}
      <div className="grid grid-cols-3 gap-6 items-start mt-2">
        {/* Left Card: Meeting (2 cols) */}
        <div
          data-tl="me-detail-meeting-card"
          className="col-span-2 rounded-3xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col gap-5"
        >
          <h2 className="text-base font-bold text-gray-900">Meeting</h2>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-xs">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                EVENT TYPE
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.title}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                DATE & TIME
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.date}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                DURATION
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.duration}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                LOCATION
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.location}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#7014D9] truncate max-w-[170px]">
                  {booking.meetUrl}
                </span>
                <button
                  type="button"
                  data-tl="me-detail-btn-copy-loc"
                  className="rounded border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-600 hover:bg-gray-100"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                SOURCE
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.source}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                CREATED
              </span>
              <span className="font-semibold text-sm text-gray-900 mt-1 block">
                {booking.created}
              </span>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-2" />

          {/* Snaarp Meet */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              SNAARP MEET
            </span>
            <button
              type="button"
              data-tl="me-detail-btn-join"
              className="w-fit rounded-xl bg-[#7014D9] hover:bg-[#5e0eb8] text-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Join meeting</span>
            </button>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 font-mono">
                {booking.meetUrl}
              </span>
              <button
                type="button"
                data-tl="me-detail-btn-copy-meet"
                className="rounded border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Right Card: Invitee (1 col) */}
        <div
          data-tl="me-detail-invitee-card"
          className="col-span-1 rounded-3xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col gap-5"
        >
          <h2 className="text-base font-bold text-gray-900">Invitee</h2>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7014D9] flex items-center justify-center font-bold text-sm">
              {booking.inviteeName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-gray-900">
                {booking.inviteeName}
              </span>
              <span className="text-xs text-[#7014D9] truncate">
                {booking.inviteeEmail}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              TIMEZONE
            </span>
            <span className="font-semibold text-sm text-gray-800 mt-1 block">
              {booking.timezone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
