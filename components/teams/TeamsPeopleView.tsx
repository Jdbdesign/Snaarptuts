"use client";

import React, { useState } from "react";
import {
  Search,
  RotateCw,
  X,
  MessageSquare,
  Phone,
  Video,
  Building2,
} from "lucide-react";
import {
  TEAMS_PEOPLE,
  PEOPLE_SUBTITLES,
  type PersonItem,
  type PeopleFilterTab,
} from "./teams-data";

interface Props {
  filterTab: PeopleFilterTab;
  searchQuery: string;
  loadedCount: number;
  isLoading?: boolean;
  hoveredPersonId?: string | null;
  onSelectFilterTab: (tab: PeopleFilterTab) => void;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  onClickChat: (person: PersonItem) => void;
  onClickCall: (person: PersonItem) => void;
  onHoverVideo?: () => void;
}

export function TeamsPeopleView({
  filterTab,
  searchQuery,
  loadedCount,
  isLoading = false,
  hoveredPersonId = null,
  onSelectFilterTab,
  onSearchChange,
  onRefresh,
  onLoadMore,
  onClickChat,
  onClickCall,
}: Props) {
  const [internalHoverId, setInternalHoverId] = useState<string | null>(null);

  // Filter items
  const filteredPeople = React.useMemo(() => {
    return TEAMS_PEOPLE.filter((p) => {
      // Tab filter
      if (filterTab === "chat" && !p.isOnChat) return false;
      if (filterTab === "org" && !p.isOrg) return false;
      if (filterTab === "external" && !p.isExternal) return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesEmail = p.email.toLowerCase().includes(q);
        const matchesDept = p.department?.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesDept;
      }
      return true;
    });
  }, [filterTab, searchQuery]);

  const visiblePeople = filteredPeople.slice(0, loadedCount);

  return (
    <div
      data-tl="teams-people-view"
      className="flex-1 flex flex-col h-full bg-[#FAFAFC] overflow-y-auto"
    >
      <div className="max-w-5xl w-full mx-auto p-6 md:p-8 space-y-4">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1
                data-tl="people-header-title"
                className="text-xl font-bold text-gray-900"
              >
                People
              </h1>
              <span
                data-tl="people-count-badge"
                className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full"
              >
                25
              </span>
            </div>
            <p
              data-tl="people-subtitle"
              className="text-xs text-gray-500 mt-1"
            >
              {PEOPLE_SUBTITLES[filterTab]}
            </p>
          </div>

          {/* Search box & refresh button */}
          <div className="flex items-center gap-2">
            <div className="relative w-64 md:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="people-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name, email, or company"
                className="w-full h-8 pl-8 pr-7 rounded-full text-xs border border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:border-purple-600"
              />
              {searchQuery ? (
                <button
                  type="button"
                  data-tl="people-search-clear"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              data-tl="people-refresh-btn"
              onClick={onRefresh}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer shadow-sm"
              title="Refresh"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div data-tl="people-filter-pills" className="flex items-center gap-2 pt-1">
          <button
            type="button"
            data-tl="people-pill-all"
            onClick={() => onSelectFilterTab("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              filterTab === "all"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            type="button"
            data-tl="people-pill-chat"
            onClick={() => onSelectFilterTab("chat")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              filterTab === "chat"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            On Snaarp Teams
          </button>
          <button
            type="button"
            data-tl="people-pill-org"
            onClick={() => onSelectFilterTab("org")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              filterTab === "org"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Organization
          </button>
          <button
            type="button"
            data-tl="people-pill-external"
            onClick={() => onSelectFilterTab("external")}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              filterTab === "external"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            External
          </button>
        </div>

        {/* List of People Cards or Skeleton */}
        {isLoading ? (
          <div data-tl="people-skeleton" className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-20 bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-32 h-3.5 bg-gray-200 rounded" />
                  <div className="w-48 h-3 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div data-tl="people-list" className="space-y-3 pt-2">
            {visiblePeople.map((person) => {
              const isHovered =
                hoveredPersonId === person.id ||
                internalHoverId === person.id;

              return (
                <div
                  key={person.id}
                  data-tl={`people-card-${person.id}`}
                  onMouseEnter={() => setInternalHoverId(person.id)}
                  onMouseLeave={() => setInternalHoverId(null)}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-gray-300 transition-colors group relative"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar circle */}
                    <div
                      className={`w-10 h-10 rounded-full ${person.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}
                    >
                      {person.avatarText}
                    </div>

                    {/* Person Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-xs text-gray-900 truncate">
                          {person.name}
                        </span>

                        {/* Badges */}
                        {person.isOnChat ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            ON CHAT
                          </span>
                        ) : null}

                        {person.isOrg ? (
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            ORG
                          </span>
                        ) : null}

                        {person.isExternal ? (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            EXTERNAL
                          </span>
                        ) : null}
                      </div>

                      {/* Department if any */}
                      {person.department ? (
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{person.department}</span>
                        </div>
                      ) : null}

                      {/* Email */}
                      <p className="text-xs text-gray-500 font-normal truncate mt-0.5">
                        {person.email}
                      </p>
                    </div>
                  </div>

                  {/* Action Icons on hover */}
                  <div
                    data-tl={`people-actions-${person.id}`}
                    className={`flex items-center gap-2 shrink-0 ${
                      isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    } transition-opacity`}
                  >
                    {/* Chat */}
                    <div className="relative group/tip">
                      <button
                        type="button"
                        data-tl={`people-btn-chat-${person.id}`}
                        onClick={() => onClickChat(person)}
                        className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-gray-600 cursor-pointer shadow-sm"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <div
                        data-tl={`tooltip-chat-${person.id}`}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/tip:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity"
                      >
                        Chat
                      </div>
                    </div>

                    {/* Call */}
                    <div className="relative group/tip">
                      <button
                        type="button"
                        data-tl={`people-btn-call-${person.id}`}
                        onClick={() => onClickCall(person)}
                        className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-gray-600 cursor-pointer shadow-sm"
                        title="Call"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <div
                        data-tl={`tooltip-call-${person.id}`}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/tip:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity"
                      >
                        Call
                      </div>
                    </div>

                    {/* Video call */}
                    <div className="relative group/tip">
                      <button
                        type="button"
                        data-tl={`people-btn-video-${person.id}`}
                        className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-gray-600 cursor-pointer shadow-sm"
                        title="Video call"
                      >
                        <Video className="w-4 h-4" />
                      </button>
                      <div
                        data-tl={`tooltip-video-${person.id}`}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/tip:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity"
                      >
                        Video call
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Load more button if more available */}
            {visiblePeople.length < filteredPeople.length ? (
              <div className="flex justify-center pt-4 pb-8">
                <button
                  type="button"
                  data-tl="people-load-more-btn"
                  onClick={onLoadMore}
                  className="px-5 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 shadow-sm cursor-pointer transition-colors"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
