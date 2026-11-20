"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Users,
  Search,
  Download,
  ChevronDown,
  Trash2,
  Mail,
  Phone,
  Building2,
  X,
} from "lucide-react";
import {
  INITIAL_EVENT_ATTENDEES,
  type CrmEventAttendee,
} from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmEventAttendeesView({ tl }: Props) {
  const attendees = useTimelineVar<CrmEventAttendee[]>(
    tl,
    "crm:eventAttendees",
    INITIAL_EVENT_ATTENDEES
  );
  const activeTab = useTimelineVar<"all" | "web-form" | "manual">(
    tl,
    "crm:attendeesTab",
    "all"
  );
  const selectedProfileId = useTimelineVar<string | null>(
    tl,
    "crm:selectedAttendeeProfileId",
    null
  );

  const filteredAttendees =
    activeTab === "manual"
      ? []
      : attendees;

  const profileAttendee = attendees.find((a) => a.id === selectedProfileId);

  return (
    <div
      data-scroller
      className="relative flex h-full flex-col overflow-hidden bg-[#F8F9FA] text-[#111111]"
    >
      <div className="no-scrollbar flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div
          data-tl="crm-attendees-header"
          className="mb-5 flex items-center justify-between"
        >
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
              Event Attendees
            </h1>
            <p className="text-[13px] text-[#6B7280]">
              Everyone registered for your events, from web forms or added by hand.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Event Filter Dropdown */}
            <div className="relative inline-block">
              <select className="appearance-none rounded-xl border border-[#E5E7EB] bg-white py-2 pl-3.5 pr-8 text-[12.5px] font-medium text-[#374151] shadow-2xs focus:border-[#7C3AED] focus:outline-none cursor-pointer">
                <option>All events</option>
                <option>Free Masterclass</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
            </div>

            {/* Search */}
            <div className="flex w-[240px] items-center rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] shadow-2xs">
              <Search size={15} className="mr-2 text-[#9CA3AF]" />
              <input
                type="text"
                readOnly
                placeholder="Search attendees..."
                className="w-full bg-transparent text-[12.5px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
              />
            </div>

            {/* Export */}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
            >
              <Download size={15} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-4 flex items-center gap-4 border-b border-[#ECECF1]">
          <button
            type="button"
            data-tl="crm-attendees-tab-all"
            onClick={() => tl.setVar("crm:attendeesTab", "all")}
            className={`border-b-2 pb-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
              activeTab === "all"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-[#6B7280] hover:text-[#111111]"
            }`}
          >
            All 2
          </button>
          <button
            type="button"
            data-tl="crm-attendees-tab-web"
            onClick={() => tl.setVar("crm:attendeesTab", "web-form")}
            className={`border-b-2 pb-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
              activeTab === "web-form"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-[#6B7280] hover:text-[#111111]"
            }`}
          >
            Web form 2
          </button>
          <button
            type="button"
            data-tl="crm-attendees-tab-manual"
            onClick={() => tl.setVar("crm:attendeesTab", "manual")}
            className={`border-b-2 pb-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
              activeTab === "manual"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-[#6B7280] hover:text-[#111111]"
            }`}
          >
            Added manually 0
          </button>
        </div>

        {/* Attendees Table Card */}
        <div
          data-tl="crm-attendees-table"
          className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs"
        >
          {filteredAttendees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[#6B7280]">
              <Users size={32} className="mb-2 text-[#9CA3AF]" />
              <p className="text-[13px] font-medium">No attendees found</p>
              <p className="text-[11.5px] text-[#9CA3AF]">
                No attendees have been added manually yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#ECECF1] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                    <th className="w-10 pb-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded accent-[#7C3AED]"
                      />
                    </th>
                    <th className="pb-3 font-semibold">ATTENDEE</th>
                    <th className="pb-3 font-semibold">CONTACT</th>
                    <th className="pb-3 font-semibold">STAGE</th>
                    <th className="pb-3 font-semibold">EVENT</th>
                    <th className="pb-3 font-semibold">SOURCE</th>
                    <th className="pb-3 font-semibold">REGISTERED</th>
                    <th className="pb-3 text-right font-semibold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {filteredAttendees.map((att) => (
                    <tr
                      key={att.id}
                      data-tl={`crm-attendee-row-${att.id}`}
                      className="hover:bg-[#F9FAFB]"
                    >
                      <td className="py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded accent-[#7C3AED]"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[12px] font-bold text-[#7C3AED]">
                            {att.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <button
                              type="button"
                              data-tl={
                                att.id === "att-1"
                                  ? "crm-attendee-link-alex"
                                  : undefined
                              }
                              onClick={() => {
                                tl.setVar(
                                  "crm:selectedAttendeeProfileId",
                                  att.id
                                );
                              }}
                              className="font-bold text-[#7C3AED] hover:underline cursor-pointer"
                            >
                              {att.name}
                            </button>
                            <div className="text-[11.5px] text-[#6B7280]">
                              {att.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-[12.5px] text-[#111111]">
                          {att.email}
                        </div>
                        <div className="text-[11.5px] text-[#6B7280]">
                          {att.phone}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex rounded-full bg-[#F3ECFC] px-2.5 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                          {att.stage}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-[#374151]">
                        {att.event}
                      </td>
                      <td className="py-3">
                        <span className="inline-flex rounded-md bg-[#F3F4F6] px-2 py-0.5 text-[11.5px] font-medium text-[#4B5563]">
                          {att.source}
                        </span>
                      </td>
                      <td className="py-3 text-[#6B7280]">
                        {att.registeredDate}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          className="rounded-md p-1 text-[#9CA3AF] hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Linked Contact Profile Drawer */}
      {selectedProfileId && profileAttendee && (
        <div
          data-tl="crm-attendee-profile-drawer"
          className="absolute right-0 top-0 bottom-0 z-40 flex w-[420px] flex-col border-l border-[#ECECF1] bg-white shadow-2xl animate-in slide-in-from-right duration-200"
        >
          <div className="flex items-center justify-between border-b border-[#ECECF1] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                CONTACT PROFILE
              </span>
            </div>
            <button
              type="button"
              data-tl="crm-attendee-profile-close"
              onClick={() =>
                tl.setVar("crm:selectedAttendeeProfileId", null)
              }
              className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE9FE] text-[16px] font-bold text-[#7C3AED]">
                {profileAttendee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#111111]">
                  {profileAttendee.name}
                </h3>
                <div className="text-[12.5px] text-[#6B7280]">
                  {profileAttendee.company}
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-[#ECECF1] bg-[#F9FAFB] p-4 text-[12.5px]">
              <div className="flex items-center gap-2 text-[#4B5563]">
                <Mail size={14} className="text-[#7C3AED]" />
                <span>{profileAttendee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4B5563]">
                <Phone size={14} className="text-[#7C3AED]" />
                <span>{profileAttendee.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4B5563]">
                <Building2 size={14} className="text-[#7C3AED]" />
                <span>{profileAttendee.company}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
