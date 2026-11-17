"use client";

import React, { useState } from "react";
import {
  RotateCw,
  Phone,
  Video,
  PhoneIncoming,
  PhoneMissed,
  MessageSquare,
} from "lucide-react";
import {
  ACTIVITY_ITEMS,
  type ActivityItem,
  type ActivityFilterTab,
} from "./teams-data";

interface Props {
  activeTab: ActivityFilterTab;
  isLoading?: boolean;
  hoveredCallId?: string | null;
  onSelectTab: (tab: ActivityFilterTab) => void;
  onRefresh: () => void;
}

export function TeamsActivityView({
  activeTab,
  isLoading = false,
  hoveredCallId = null,
  onSelectTab,
  onRefresh,
}: Props) {
  const [internalHoverId, setInternalHoverId] = useState<string | null>(null);

  // Group items
  const itemsToDisplay = React.useMemo(() => {
    if (activeTab === "calls") {
      return ACTIVITY_ITEMS.filter((i) => i.type === "call");
    }
    if (activeTab === "all") {
      return ACTIVITY_ITEMS;
    }
    return [];
  }, [activeTab]);

  // Group by date
  const grouped = React.useMemo(() => {
    const map = new Map<string, ActivityItem[]>();
    for (const item of itemsToDisplay) {
      if (!map.has(item.groupDate)) {
        map.set(item.groupDate, []);
      }
      map.get(item.groupDate)!.push(item);
    }
    return Array.from(map.entries());
  }, [itemsToDisplay]);

  return (
    <div
      data-tl="teams-activity-view"
      className="flex-1 flex flex-col h-full bg-[#FAFAFC] overflow-y-auto"
    >
      <div className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-4">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              data-tl="activity-header-title"
              className="text-xl font-bold text-gray-900"
            >
              Activity
            </h1>
            <p
              data-tl="activity-subtitle"
              className="text-xs text-gray-500 mt-1"
            >
              Recent messages, mentions, and calls across your workspace
            </p>
          </div>

          <button
            type="button"
            data-tl="activity-refresh-btn"
            onClick={onRefresh}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer shadow-sm"
            title="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Tabs / Pills */}
        <div data-tl="activity-filter-tabs" className="flex items-center gap-2 pt-1">
          <button
            type="button"
            data-tl="activity-tab-all"
            onClick={() => onSelectTab("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "all"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            type="button"
            data-tl="activity-tab-unread"
            onClick={() => onSelectTab("unread")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "unread"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Unread
          </button>

          <button
            type="button"
            data-tl="activity-tab-calls"
            onClick={() => onSelectTab("calls")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5 ${
              activeTab === "calls"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>Calls</span>
            <span
              data-tl="activity-calls-badge"
              className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full"
            >
              3
            </span>
          </button>

          <button
            type="button"
            data-tl="activity-tab-ongoing"
            onClick={() => onSelectTab("ongoing")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "ongoing"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Ongoing
          </button>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div data-tl="activity-skeleton" className="space-y-3 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 animate-pulse"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-28 h-3.5 bg-gray-200 rounded" />
                  <div className="w-40 h-3 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === "ongoing" ? (
          <div
            data-tl="activity-ongoing-empty"
            className="my-10 bg-white border border-dashed border-gray-200 rounded-3xl p-10 text-center max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Phone className="w-5 h-5" />
            </div>
            <h3
              data-tl="activity-ongoing-title"
              className="text-sm font-bold text-gray-900"
            >
              No ongoing calls
            </h3>
            <p
              data-tl="activity-ongoing-desc"
              className="text-xs text-gray-500 mt-1 max-w-xs mx-auto"
            >
              Calls you joined stay here while they are live so you can rejoin.
            </p>
          </div>
        ) : activeTab === "unread" ? (
          <div
            data-tl="activity-unread-empty"
            className="my-10 bg-white border border-dashed border-gray-200 rounded-3xl p-10 text-center max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              No unread activity
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              You are all caught up with your workspace conversations.
            </p>
          </div>
        ) : (
          <div data-tl="activity-feed-list" className="space-y-6 pt-2">
            {grouped.map(([groupDate, items]) => (
              <div key={groupDate} className="space-y-2">
                <div
                  data-tl={`activity-date-${groupDate.replace(/[\s,]+/g, "-").toLowerCase()}`}
                  className="text-[11px] font-bold text-gray-400 tracking-wider uppercase px-1"
                >
                  {groupDate}
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => {
                    const isHovered =
                      hoveredCallId === item.id || internalHoverId === item.id;

                    return (
                      <div
                        key={item.id}
                        data-tl={`activity-card-${item.id}`}
                        onMouseEnter={() => setInternalHoverId(item.id)}
                        onMouseLeave={() => setInternalHoverId(null)}
                        className="bg-white border border-gray-200 rounded-2xl p-3.5 flex items-center justify-between hover:border-gray-300 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar with status badge */}
                          <div className="relative shrink-0">
                            <div
                              className={`w-9 h-9 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                            >
                              {item.avatarText}
                            </div>
                            {item.isMissed ? (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center ring-2 ring-white">
                                <PhoneMissed className="w-2.5 h-2.5" />
                              </div>
                            ) : item.type === "call" ? (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white">
                                <PhoneIncoming className="w-2.5 h-2.5" />
                              </div>
                            ) : null}
                          </div>

                          {/* Text info */}
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs text-gray-900 truncate">
                              {item.title}
                            </h4>
                            <p
                              className={`text-[11px] truncate mt-0.5 ${
                                item.isMissed
                                  ? "text-red-600 font-medium"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.preview}
                            </p>
                          </div>
                        </div>

                        {/* Right side: Time and Action Icon */}
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <span className="text-[11px] text-gray-400">
                            {item.timeAgo}
                          </span>

                          {item.callIcon === "video" ? (
                            <div
                              data-tl={`activity-icon-video-${idx}`}
                              className={`p-1 text-gray-400 ${
                                isHovered ? "text-purple-600" : ""
                              }`}
                            >
                              <Video className="w-4 h-4" />
                            </div>
                          ) : item.callIcon === "phone" ? (
                            <div
                              data-tl={`activity-icon-phone-${idx}`}
                              className={`p-1 text-gray-400 ${
                                isHovered ? "text-purple-600" : ""
                              }`}
                            >
                              <Phone className="w-4 h-4" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
