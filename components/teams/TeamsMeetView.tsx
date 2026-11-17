import React from "react";
import {
  Link as LinkIcon,
  Calendar,
  Phone,
  Video,
  Copy,
  ExternalLink,
  Trash2,
  Pencil,
  Search,
  PhoneMissed,
  PhoneIncoming,
  Hash,
  Loader2,
} from "lucide-react";
import {
  RECENT_CALLS,
  type MeetSubTab,
  type MeetLinkCard,
} from "./teams-data";

export function TeamsMeetView({
  subTab = "links",
  meetLinks,
  searchQuery = "",
  isCreatingLink = false,
  onSelectSubTab,
  onCreateLink,
  onOpenJoinIdDialog,
  onCopyLink,
  onShareLink,
  onDeleteLink,
  onSearchCalls,
}: {
  subTab: MeetSubTab;
  meetLinks: MeetLinkCard[];
  searchQuery?: string;
  isCreatingLink?: boolean;
  onSelectSubTab: (tab: MeetSubTab) => void;
  onCreateLink: () => void;
  onOpenJoinIdDialog: () => void;
  onCopyLink: (card: MeetLinkCard) => void;
  onShareLink: (card: MeetLinkCard) => void;
  onDeleteLink: (id: string) => void;
  onSearchCalls?: (q: string) => void;
}) {
  const filteredCalls = RECENT_CALLS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      data-tl="meet-main-view"
      className="flex-1 flex h-full overflow-hidden bg-white select-none text-[#111827]"
    >
      {/* 1. Left sub-menu for Meet */}
      <aside
        data-tl="meet-sub-sidebar"
        className="w-48 shrink-0 border-r border-gray-100 p-4 flex flex-col gap-1"
      >
        <h2 className="text-base font-bold text-gray-900 mb-3 px-2">Meet</h2>

        <button
          type="button"
          data-tl="meet-tab-links"
          onClick={() => onSelectSubTab("links")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
            subTab === "links"
              ? "bg-purple-50 text-purple-700 font-semibold"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Meeting links
        </button>

        <button
          type="button"
          data-tl="meet-tab-scheduled"
          onClick={() => onSelectSubTab("scheduled")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
            subTab === "scheduled"
              ? "bg-purple-50 text-purple-700 font-semibold"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Scheduled meetings
        </button>

        <button
          type="button"
          data-tl="meet-tab-calls"
          onClick={() => onSelectSubTab("calls")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
            subTab === "calls"
              ? "bg-purple-50 text-purple-700 font-semibold"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          Calls
        </button>
      </aside>

      {/* 2. Main Tab Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-8">
        {subTab === "links" && (
          <div data-tl="meet-links-content" className="max-w-4xl space-y-6">
            {/* Top Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="meet-create-link-btn"
                onClick={onCreateLink}
                disabled={isCreatingLink}
                className="px-4 py-2 rounded-xl bg-[#5850EC] hover:bg-[#4F46E5] text-white text-xs font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                {isCreatingLink ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Video className="w-3.5 h-3.5" />
                )}
                Create a meeting link
              </button>

              <button
                type="button"
                data-tl="meet-join-id-btn"
                onClick={onOpenJoinIdDialog}
                className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Hash className="w-3.5 h-3.5 text-gray-500" />
                Join with a meeting ID
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Manage your meeting links. Links stay available until you remove
              them or they expire.
            </p>

            {/* Meeting link cards */}
            <div data-tl="meet-cards-container" className="space-y-4">
              {meetLinks.map((card, idx) => (
                <div
                  key={card.id}
                  data-tl={`meet-link-card-${idx + 1}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {card.title}
                      </span>
                      <Pencil className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-600 text-[10px] font-semibold tracking-wide">
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <button
                        type="button"
                        data-tl={`card-action-copy-${idx + 1}`}
                        onClick={() => onCopyLink(card)}
                        title="Copy link"
                        className="p-1 hover:text-gray-700 rounded transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        data-tl={`card-action-open-${idx + 1}`}
                        title="Open in new window"
                        className="p-1 hover:text-gray-700 rounded transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        data-tl={`card-action-delete-${idx + 1}`}
                        onClick={() => onDeleteLink(card.id)}
                        title="Remove"
                        className="p-1 hover:text-red-600 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="px-3 py-2 rounded-xl bg-purple-50/40 text-purple-700 font-mono text-xs flex-1 max-w-xl truncate">
                      {card.url}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Created {card.created}{" "}
                      <span className="text-amber-600 font-medium ml-1">
                        Expires {card.expires}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      data-tl={`card-btn-join-${idx + 1}`}
                      className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition-colors"
                    >
                      Join
                    </button>
                    <button
                      type="button"
                      data-tl={`card-btn-share-${idx + 1}`}
                      onClick={() => onShareLink(card)}
                      className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition-colors"
                    >
                      Share link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "scheduled" && (
          <div
            data-tl="scheduled-empty-state"
            className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
          >
            {/* Calendar icon illustration */}
            <div className="w-20 h-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center relative mb-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-red-500 font-bold text-sm shadow-sm">
                +
              </div>
              <div className="absolute -bottom-2 -right-2 w-5 h-5 text-emerald-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2l12 11.5-6.5.5 4 8-3 1.5-4-8-4.5 4.5z" />
                </svg>
              </div>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-1">
              You don&apos;t have anything scheduled
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Connect Snaarp Me to see your upcoming meetings here.
            </p>

            <button
              type="button"
              data-tl="connect-snaarp-me-link"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Connect Snaarp Me
            </button>
          </div>
        )}

        {subTab === "calls" && (
          <div data-tl="calls-content" className="max-w-4xl space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Recents</h3>
                <p className="text-xs text-gray-400">
                  Your recent audio and video calls · {filteredCalls.length}
                </p>
              </div>

              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  data-tl="calls-search-input"
                  value={searchQuery}
                  onChange={(e) =>
                    onSearchCalls ? onSearchCalls(e.target.value) : undefined
                  }
                  placeholder="Search recent calls"
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div data-tl="calls-list" className="space-y-3">
              {filteredCalls.map((call, idx) => (
                <div
                  key={call.id}
                  data-tl={`call-card-${idx + 1}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${call.avatarBg} text-white flex items-center justify-center text-xs font-semibold`}
                    >
                      {call.avatarText}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">
                        {call.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                        {call.type === "incoming-audio" ? (
                          <PhoneIncoming className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <PhoneMissed className="w-3 h-3 text-red-500" />
                        )}
                        <span
                          className={
                            call.type === "incoming-audio"
                              ? "text-gray-600"
                              : "text-red-600 font-medium"
                          }
                        >
                          {call.type === "incoming-audio"
                            ? "Incoming audio · "
                            : "Missed audio · "}
                          {call.timeAgo}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {call.dateStr}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      data-tl={`call-action-phone-${idx + 1}`}
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      data-tl={`call-action-video-${idx + 1}`}
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-gray-400 pt-2">
              1-4 of 4 recents
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
