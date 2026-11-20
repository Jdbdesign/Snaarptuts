"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Plus,
  Search,
  ExternalLink,
  Users,
  Clock,
  MapPin,
  Edit2,
  UserPlus,
  X,
} from "lucide-react";
import { INITIAL_EVENTS, type CrmEventItem } from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmEventsView({ tl }: Props) {
  const events = useTimelineVar<CrmEventItem[]>(
    tl,
    "crm:events",
    INITIAL_EVENTS
  );
  const isAddContactOpen = useTimelineVar<boolean>(
    tl,
    "crm:isAddEventContactOpen",
    false
  );

  return (
    <div
      data-scroller
      className="relative flex h-full flex-col overflow-hidden bg-[#F8F9FA] text-[#111111]"
    >
      <div className="no-scrollbar flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div
          data-tl="crm-events-header"
          className="mb-5 flex items-center justify-between"
        >
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
              Events
            </h1>
            <p className="text-[13px] text-[#6B7280]">
              Create events like webinars and masterclasses, then use them in
              automations — e.g. &quot;remind attendees 1 day before&quot;.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex w-[260px] items-center rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-[12.5px] shadow-2xs">
              <Search size={15} className="mr-2 text-[#9CA3AF]" />
              <input
                type="text"
                readOnly
                placeholder="Search events..."
                className="w-full bg-transparent text-[12.5px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
              />
            </div>

            <button
              type="button"
              data-tl="crm-events-new-btn"
              onClick={() => tl.setVar("crm:isNewEventOpen", true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer transition-colors"
            >
              <Plus size={16} />
              <span>New event</span>
            </button>
          </div>
        </div>

        {/* Events Cards List */}
        <div className="space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              data-tl={`crm-event-card-${evt.id}`}
              className="rounded-[18px] border border-[#ECECF1] bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <h2 className="text-[17px] font-bold text-[#111111]">
                      {evt.name}
                    </h2>
                    <span className="inline-flex rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                      {evt.status}
                    </span>
                  </div>

                  <p className="text-[12.5px] text-[#6B7280]">
                    {evt.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-5 text-[12.5px] text-[#4B5563]">
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-[#7C3AED]" />
                      <span>{evt.date}, {evt.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-[#7C3AED]" />
                      <span>{evt.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#7C3AED]">
                      <ExternalLink size={14} />
                      <span className="underline">{evt.link}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-semibold text-[#111111]">
                      <Users size={15} className="text-[#7C3AED]" />
                      <span>{evt.attendeeCount} attendees</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-tl="crm-event-add-contact-btn"
                    onClick={() => tl.setVar("crm:isAddEventContactOpen", true)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
                  >
                    <UserPlus size={14} className="text-[#7C3AED]" />
                    <span>Add contact</span>
                  </button>

                  <button
                    type="button"
                    data-tl="crm-event-edit-btn"
                    onClick={() => {
                      tl.setVar("crm:editingEventId", evt.id);
                      tl.setVar("crm:isEditEventOpen", true);
                    }}
                    className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Contact Slide-Over Drawer */}
      {isAddContactOpen && (
        <div
          data-tl="crm-event-contact-drawer"
          className="absolute right-0 top-0 bottom-0 z-40 flex w-[380px] flex-col border-l border-[#ECECF1] bg-white shadow-2xl animate-in slide-in-from-right duration-200"
        >
          <div className="flex items-center justify-between border-b border-[#ECECF1] px-5 py-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#111111]">
                Add a contact
              </h3>
              <p className="text-[12px] text-[#6B7280]">
                Register contacts for Free Masterclass
              </p>
            </div>
            <button
              type="button"
              data-tl="crm-event-add-contact-close"
              onClick={() => tl.setVar("crm:isAddEventContactOpen", false)}
              className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-[12.5px]">
              <Search size={14} className="mr-2 text-[#9CA3AF]" />
              <input
                type="text"
                readOnly
                placeholder="Search registered contacts..."
                className="w-full bg-transparent text-[12px] focus:outline-none"
              />
            </div>
          </div>

          <div className="no-scrollbar flex-1 overflow-y-auto px-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-[#ECECF1] p-3 hover:bg-[#F9FAFB]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[12px] font-bold text-[#7C3AED]">
                  AM
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#111111]">
                    Alex Morgan
                  </div>
                  <div className="text-[11.5px] text-[#6B7280]">
                    alex.morgan@example.com
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-[12px] font-medium text-red-600 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#ECECF1] p-3 hover:bg-[#F9FAFB]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[12px] font-bold text-[#7C3AED]">
                  PS
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#111111]">
                    Priya Shah
                  </div>
                  <div className="text-[11.5px] text-[#6B7280]">
                    priya.shah@example.com
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-[12px] font-medium text-red-600 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
