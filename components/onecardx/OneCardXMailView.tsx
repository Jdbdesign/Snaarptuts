"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  SAMPLE_MAIL_UNREAD,
  SAMPLE_MAIL_READ,
} from "./onecardx-data";

function OcxPortraitFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={`w-full h-full ${className}`}>
      <rect width="200" height="240" fill="#2B2D32" />
      <path d="M20 240 C30 180 60 170 100 170 C140 170 170 180 180 240 Z" fill="#18191C" />
      <path d="M85 150 L100 185 L115 150 Z" fill="#18191C" />
      <path d="M80 120 L80 160 C80 170 120 170 120 160 L120 120 Z" fill="#7C5743" />
      <ellipse cx="100" cy="105" rx="38" ry="48" fill="#8B634B" />
      <path d="M72 105 C72 145 85 155 100 155 C115 155 128 145 128 105 C122 135 110 148 100 148 C90 148 78 135 72 105 Z" fill="#1C1613" />
      <path d="M88 122 C94 118 106 118 112 122 C108 126 92 126 88 122 Z" fill="#1C1613" />
      <path d="M62 90 C62 60 78 52 100 52 C122 52 138 60 138 90 C138 70 125 60 100 60 C75 60 62 70 62 90 Z" fill="#151210" />
      <rect x="74" y="92" width="22" height="16" rx="4" stroke="#111" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
      <rect x="104" y="92" width="22" height="16" rx="4" stroke="#111" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
      <line x1="96" y1="100" x2="104" y2="100" stroke="#111" strokeWidth="2.5" />
      <circle cx="85" cy="100" r="2.5" fill="#111" />
      <circle cx="115" cy="100" r="2.5" fill="#111" />
    </svg>
  );
}

type Props = {
  tl: Timeline;
  subpage?: "inbox" | "settings";
  onOpenQuickSettings?: () => void;
  onOpenAllSettings?: () => void;
  onBackToMail?: () => void;
  onSelectSettingsSignature?: () => void;
  onPasteSignature?: () => void;
  onSaveSignature?: () => void;
  onOpenCompose?: () => void;
  onCloseCompose?: () => void;
};

export function OneCardXMailView({
  tl,
  subpage: defaultSubpage = "inbox",
  onOpenQuickSettings,
  onOpenAllSettings,
  onBackToMail,
  onSelectSettingsSignature,
  onPasteSignature,
  onSaveSignature,
  onOpenCompose,
  onCloseCompose,
}: Props) {
  const mailSubpage = useTimelineVar<"inbox" | "settings">(tl, "ocxMailSubpage", defaultSubpage);
  const quickSettingsOpen = useTimelineVar(tl, "ocxMailQuickSettingsOpen", false);
  const settingsActiveTab = useTimelineVar(tl, "ocxMailSettingsTab", "signature");
  const signaturePasted = useTimelineVar(tl, "ocxMailSigPasted", false);
  const signatureSaved = useTimelineVar(tl, "ocxMailSigSaved", false);
  const composeOpen = useTimelineVar(tl, "ocxMailComposeOpen", false);

  return (
    <div
      data-tl="snaarp-mail-view"
      className="flex h-full w-full flex-col bg-[#F8F9FA] text-[#111827] font-['Poppins',sans-serif] select-none"
    >
      {/* 1. Snaarp Mail Top Bar */}
      <header
        data-tl="mail-topbar"
        className="flex h-14 shrink-0 items-center justify-between border-b border-[#EBECEF] bg-white px-5 z-20"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 p-1 rounded-lg"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#111827]">Snaarp</span>
              <span className="h-2 w-2 rounded-full bg-[#7014D9]" />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-80 lg:w-96">
            <input
              type="text"
              readOnly
              data-tl="input-search-mail"
              placeholder={mailSubpage === "settings" ? "Search in mail" : "Search in inbox"}
              className="w-full rounded-full border border-gray-200 bg-gray-50/80 pl-9 pr-8 py-1.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-hidden"
            />
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="absolute left-3 top-2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right Icons & User Profile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect width={18} height={18} x={3} y={4} rx={2} />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>

          {/* Settings Gear Button */}
          <button
            type="button"
            data-tl="btn-mail-settings"
            onClick={() => {
              tl.setVar("ocxMailQuickSettingsOpen", !quickSettingsOpen);
              onOpenQuickSettings?.();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              quickSettingsOpen
                ? "bg-[#E0F2FE] text-[#0284C7]"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
            title="Settings"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* User Avatar with Green status dot */}
          <div className="relative">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200">
              <OcxPortraitFace />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
        </div>
      </header>

      {/* 2. Main Mail Workspace (Sidebar + Content View) */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Mail Left Navigation Sidebar */}
        <aside
          data-tl="mail-sidebar"
          className="flex h-full w-[215px] shrink-0 flex-col border-r border-[#EBECEF] bg-white p-3 space-y-4"
        >
          {/* Compose Button */}
          <button
            type="button"
            data-tl="btn-mail-compose"
            onClick={() => {
              tl.setVar("ocxMailComposeOpen", true);
              onOpenCompose?.();
            }}
            className="flex items-center gap-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#BAE6FD] px-5 py-2.5 text-xs font-semibold text-[#0284C7] shadow-2xs transition-colors cursor-pointer"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            <span>Compose</span>
          </button>

          {/* Mail Folders */}
          <nav className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 text-xs">
            <button
              type="button"
              data-tl="folder-inbox"
              onClick={() => {
                tl.setVar("ocxMailSubpage", "inbox");
                onBackToMail?.();
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left cursor-pointer transition-colors ${
                mailSubpage === "inbox"
                  ? "bg-[#E0F2FE] text-[#0284C7] font-semibold"
                  : "text-gray-700 hover:bg-gray-100 font-normal"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect width={20} height={16} x={2} y={4} rx={2} />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Inbox</span>
              </div>
              <span className="text-[11px] font-semibold">19</span>
            </button>

            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">★</span>
                <span>Starred</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">🕒</span>
                <span>Snoozed</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">➤</span>
                <span>Sent</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">📄</span>
                <span>Drafts</span>
              </div>
              <span className="text-[11px] font-normal text-gray-500">42</span>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span>∧</span>
                <span>Less</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">🏷️</span>
                <span>Important</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">📅</span>
                <span>Scheduled</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">✉️</span>
                <span>All Mail</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">⚠️</span>
                <span>Spam</span>
              </div>
              <span className="text-[11px] text-gray-500">1</span>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">🗑️</span>
                <span>Trash</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <span className="text-gray-400">🚫</span>
                <span>Blocked</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-gray-600 px-3 py-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span>Manage labels</span>
            </div>
            <div className="flex items-center justify-between text-gray-600 px-3 py-1 hover:bg-gray-50 rounded-lg cursor-pointer">
              <span>+ Create new label</span>
            </div>
          </nav>

          {/* Storage Widget */}
          <div className="rounded-xl bg-gray-50/90 p-3 border border-gray-100 text-[11px] space-y-1.5">
            <div className="flex items-center gap-1.5 text-gray-700 font-medium">
              <span className="text-sky-500">☁</span>
              <span>Snaarp Drive</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[10px]">
              <span>Your Storage</span>
              <span className="font-semibold text-gray-700">12%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full w-[12%] rounded-full bg-[#0284C7]" />
            </div>
            <p className="text-[9.5px] text-gray-400 leading-none">2.4 GB of 20.00 GB used</p>
          </div>
        </aside>

        {/* 3. Main Body View (Inbox OR Settings) */}
        {mailSubpage === "inbox" ? (
          // A. INBOX VIEW
          <main className="flex-1 overflow-y-auto bg-white p-4 space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-3 text-gray-500 text-xs">
                <input type="checkbox" className="rounded-sm border-gray-300" />
                <button type="button" className="hover:text-gray-700">↻</button>
                <button type="button" className="hover:text-gray-700">⋮</button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <button type="button" className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-medium">Default</button>
                <button type="button" className="px-2 py-0.5 rounded hover:bg-gray-50">Compact</button>
              </div>
            </div>

            {/* Section 1: Unread Emails */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 px-2 py-1">
                <div className="flex items-center gap-1.5">
                  <span>∨</span>
                  <span>Unread</span>
                </div>
                <span className="text-[11px] font-normal text-gray-400">1-19 of 19</span>
              </div>

              <div data-tl="mail-unread-list" className="divide-y divide-gray-100 border-t border-gray-100">
                {SAMPLE_MAIL_UNREAD.map((mail) => (
                  <div
                    key={mail.id}
                    className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-gray-50/80 cursor-pointer transition-colors bg-white font-medium"
                  >
                    <input type="checkbox" className="rounded-sm border-gray-300 shrink-0" />
                    <span className="text-gray-300 hover:text-amber-400 shrink-0">★</span>
                    <span className="text-gray-300 hover:text-amber-500 shrink-0">🏷️</span>
                    <div className="w-40 shrink-0 truncate text-gray-900 font-semibold">
                      {mail.sender}
                      {mail.senderCount && <span className="ml-1 text-gray-400 font-normal">({mail.senderCount})</span>}
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-gray-900 font-semibold">{mail.subject}</span>
                      <span className="text-gray-400 font-normal ml-2">— {mail.snippet}</span>
                    </div>
                    <div className="w-20 text-right shrink-0 text-[11px] text-gray-500 font-normal">
                      {mail.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Everything Else */}
            <div className="space-y-1 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 px-2 py-1">
                <div className="flex items-center gap-1.5">
                  <span>∨</span>
                  <span>Everything else</span>
                </div>
                <span className="text-[11px] font-normal text-gray-400">1-25 of 81 &lt; &gt;</span>
              </div>

              <div data-tl="mail-read-list" className="divide-y divide-gray-100 border-t border-gray-100">
                {SAMPLE_MAIL_READ.map((mail) => (
                  <div
                    key={mail.id}
                    className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer transition-colors bg-gray-50/30 text-gray-600"
                  >
                    <input type="checkbox" className="rounded-sm border-gray-300 shrink-0" />
                    <span className="text-gray-300 shrink-0">☆</span>
                    <span className="text-gray-300 shrink-0">🏷️</span>
                    <div className="w-40 shrink-0 truncate font-normal">
                      {mail.sender}
                    </div>
                    <div className="flex-1 truncate">
                      <span className="font-normal text-gray-800">{mail.subject}</span>
                      <span className="text-gray-400 ml-2">— {mail.snippet}</span>
                    </div>
                    <div className="w-20 text-right shrink-0 text-[11px] text-gray-400">
                      {mail.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        ) : (
          // B. SETTINGS VIEW
          <main className="flex flex-1 overflow-hidden bg-white">
            {/* Settings Left Menu */}
            <div
              data-tl="settings-nav-sidebar"
              className="w-56 shrink-0 border-r border-gray-200 p-4 space-y-4 overflow-y-auto no-scrollbar text-xs"
            >
              <button
                type="button"
                data-tl="btn-back-to-mail"
                onClick={() => {
                  tl.setVar("ocxMailSubpage", "inbox");
                  onBackToMail?.();
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-black font-medium pb-2 border-b border-gray-100 cursor-pointer w-full text-left"
              >
                <span>←</span>
                <span>Back to Mail</span>
              </button>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  ACCOUNT
                </div>
                <div className="space-y-0.5 text-gray-600">
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Profile</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Preferences</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Filters &amp; Forwarding</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Security</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Auto-Reply</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  PRIVACY
                </div>
                <div className="space-y-0.5 text-gray-600">
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Privacy &amp; Images</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  APPEARANCE
                </div>
                <div className="space-y-0.5">
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-600">Labels &amp; Folders</div>
                  <button
                    type="button"
                    data-tl="btn-settings-signature"
                    onClick={() => {
                      tl.setVar("ocxMailSettingsTab", "signature");
                      onSelectSettingsSignature?.();
                    }}
                    className={`flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors ${
                      settingsActiveTab === "signature"
                        ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>Signature</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  DATA
                </div>
                <div className="space-y-0.5 text-gray-600">
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Data Migration</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Offline &amp; Storage</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  ABOUT
                </div>
                <div className="space-y-0.5 text-gray-600">
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">About Snaarp</div>
                  <div className="px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">Help &amp; Support</div>
                </div>
              </div>
            </div>

            {/* Signature Editor Right Workspace */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 max-w-4xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                    Signature Editor
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Create a custom signature for your emails
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-tl="btn-clear-signature"
                    onClick={() => tl.setVar("ocxMailSigPasted", false)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    data-tl="btn-save-signature"
                    onClick={() => {
                      tl.setVar("ocxMailSigSaved", true);
                      onSaveSignature?.();
                    }}
                    className="rounded-lg bg-[#111827] px-5 py-2 text-xs font-semibold text-white hover:bg-black transition-colors shadow-2xs cursor-pointer"
                  >
                    Save Signature
                  </button>
                </div>
              </div>

              {/* Default Signature Toggle */}
              <div className="rounded-2xl border border-gray-200 p-4 space-y-1 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">Default Signature</span>
                  <div className="h-5 w-9 rounded-full bg-gray-200 p-0.5 cursor-pointer">
                    <div className="h-4 w-4 rounded-full bg-white shadow-xs" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">
                  Sync signature across Snaarp apps — When on, your default signature is applied automatically across Snaarp products
                </p>
              </div>

              {/* Upload Image File Drop Area */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-900">Upload Image File</span>
                <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-300 transition-colors">
                  <span className="text-2xl text-gray-400 mb-1">☁</span>
                  <p className="text-xs font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, GIF or WebP (Max 50MB)</p>
                </div>
              </div>

              {/* Signature Rich Text Editor */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-900">Signature</span>
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs">
                  {/* Editor Toolbar */}
                  <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50/60 px-3 py-2 text-xs text-gray-600">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded italic">I</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded underline">U</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded line-through">S</button>
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">≡</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">🔗</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">🖼️</button>
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <span className="text-[11px] text-gray-500">Size ▾</span>
                    <span className="text-[11px] text-gray-500 ml-2">A ▾</span>
                  </div>

                  {/* Editor Text Area */}
                  <div
                    data-tl="input-signature-editor"
                    onClick={() => {
                      tl.setVar("ocxMailSigPasted", true);
                      onPasteSignature?.();
                    }}
                    className="min-h-40 p-4 cursor-text bg-white"
                  >
                    {signaturePasted ? (
                      <div className="max-w-md rounded-xl border border-gray-200 p-4 space-y-3 bg-white shadow-2xs">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                              <OcxPortraitFace />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-gray-900 leading-tight">
                                Alex Morgan
                              </div>
                              <div className="text-[11px] text-gray-500 mt-0.5">
                                Product Designer · Acme Ltd
                              </div>
                            </div>
                          </div>

                          <div className="h-10 w-10 rounded-md border border-gray-200 p-1 bg-white shrink-0 flex items-center justify-center">
                            <svg width={32} height={32} viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v6h-2v-4h-2v-2zm-4 4h2v4h-2v-4zm6 2h2v2h-2v-2z" />
                            </svg>
                          </div>
                        </div>

                        <div className="w-full rounded-lg bg-[#7014D9] py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs">
                          SAVE CONTACT
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">Enter your signature...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Box */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-900">Preview</span>
                <div
                  data-tl="signature-preview-box"
                  className="rounded-2xl border border-gray-200 p-4 bg-gray-50/50 min-h-32 flex items-center justify-center"
                >
                  {signaturePasted ? (
                    <div className="w-full max-w-md rounded-xl border border-gray-200 p-4 space-y-3 bg-white shadow-2xs">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                            <OcxPortraitFace />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-900 leading-tight">
                              Alex Morgan
                            </div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              Product Designer · Acme Ltd
                            </div>
                          </div>
                        </div>

                        <div className="h-10 w-10 rounded-md border border-gray-200 p-1 bg-white shrink-0 flex items-center justify-center">
                          <svg width={32} height={32} viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v6h-2v-4h-2v-2zm-4 4h2v4h-2v-4zm6 2h2v2h-2v-2z" />
                          </svg>
                        </div>
                      </div>

                      <div className="w-full rounded-lg bg-[#7014D9] py-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs">
                        SAVE CONTACT
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No signature set</span>
                  )}
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* 4. Quick Settings Popover */}
      {quickSettingsOpen && (
        <div
          data-tl="mail-quick-settings-popover"
          className="absolute top-14 right-8 z-50 w-76 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-100 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="font-bold text-gray-900">Quick settings</span>
            <button
              type="button"
              onClick={() => tl.setVar("ocxMailQuickSettingsOpen", false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="py-3">
            <button
              type="button"
              data-tl="btn-see-all-settings"
              onClick={() => {
                tl.setVar("ocxMailQuickSettingsOpen", false);
                tl.setVar("ocxMailSubpage", "settings");
                onOpenAllSettings?.();
              }}
              className="w-full rounded-xl border border-gray-300 py-2 text-center text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              See all settings
            </button>
          </div>

          {/* Inbox Type */}
          <div className="space-y-1.5 py-2 border-t border-gray-100">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              INBOX TYPE
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
              <div className="rounded-lg border border-gray-200 p-2 text-gray-600 cursor-pointer hover:bg-gray-50">Default</div>
              <div className="rounded-lg border border-sky-500 bg-sky-50/50 p-2 text-sky-700 font-semibold cursor-pointer">Unread first</div>
              <div className="rounded-lg border border-gray-200 p-2 text-gray-600 cursor-pointer hover:bg-gray-50">Starred first</div>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 py-2 border-t border-gray-100 text-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[11px]">EMAIL PREVIEW</div>
                <div className="text-[10px] text-gray-500">Show snippets</div>
              </div>
              <div className="h-4 w-7 rounded-full bg-[#0284C7] p-0.5 cursor-pointer">
                <div className="h-3 w-3 rounded-full bg-white ml-auto" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[11px]">CONVERSATIONS</div>
                <div className="text-[10px] text-gray-500">Group by conversation</div>
              </div>
              <div className="h-4 w-7 rounded-full bg-[#0284C7] p-0.5 cursor-pointer">
                <div className="h-3 w-3 rounded-full bg-white ml-auto" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[11px]">UNDO SEND</div>
                <div className="text-[10px] text-gray-500">Cancel window: Immediately</div>
              </div>
              <div className="h-4 w-7 rounded-full bg-[#0284C7] p-0.5 cursor-pointer">
                <div className="h-3 w-3 rounded-full bg-white ml-auto" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Toast Notification (Bottom Left) */}
      {signatureSaved && (
        <div
          data-tl="toast-signature-saved"
          className="fixed bottom-5 left-20 z-50 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 shadow-lg text-emerald-800 text-xs font-semibold animate-in slide-in-from-bottom-2 duration-150"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px]">
            ✓
          </span>
          <span>Signature updated successfully</span>
        </div>
      )}

      {/* 6. Compose Message Modal (Docked in Bottom Right) */}
      {composeOpen && (
        <div
          data-tl="mail-compose-window"
          className="fixed bottom-0 right-14 z-50 w-[480px] rounded-t-2xl bg-white border border-gray-300 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2.5 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-800">New Message</span>
            <div className="flex items-center gap-2 text-gray-400">
              <button type="button" className="hover:text-gray-700">_</button>
              <button type="button" className="hover:text-gray-700">⤢</button>
              <button
                type="button"
                data-tl="btn-close-compose"
                onClick={() => {
                  tl.setVar("ocxMailComposeOpen", false);
                  onCloseCompose?.();
                }}
                className="hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="divide-y divide-gray-100 text-xs">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-gray-400">To</span>
                <input
                  type="text"
                  placeholder=""
                  className="flex-1 focus:outline-hidden text-gray-800 text-xs"
                />
              </div>
              <span className="text-[11px] text-gray-400 cursor-pointer hover:text-gray-600">Cc Bcc</span>
            </div>
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Subject"
                className="w-full focus:outline-hidden text-gray-800 text-xs placeholder-gray-400"
              />
            </div>
          </div>

          {/* Message Body with Signature */}
          <div className="min-h-48 p-4 flex flex-col justify-between text-xs text-gray-800">
            <div className="space-y-1">
              <p className="text-gray-600">Hi Alex,</p>
              <p className="text-gray-600">Here is the update regarding the new organization ID card and signatures.</p>
            </div>

            {/* Signature Card */}
            <div
              data-tl="compose-signature-card"
              className="mt-6 pt-4 border-t border-gray-100"
            >
              <div className="max-w-xs rounded-xl border border-gray-200 p-3 space-y-2.5 bg-white shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <OcxPortraitFace />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-gray-900 leading-tight">
                        Alex Morgan
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        Product Designer · Acme Ltd
                      </div>
                    </div>
                  </div>

                  <div className="h-8 w-8 rounded-md border border-gray-200 p-0.5 bg-white shrink-0 flex items-center justify-center">
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v6h-2v-4h-2v-2zm-4 4h2v4h-2v-4zm6 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

                <div className="w-full rounded-md bg-[#7014D9] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs">
                  SAVE CONTACT
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between bg-white px-4 py-2.5 border-t border-gray-100">
            <button
              type="button"
              data-tl="btn-send-email"
              className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Send</span>
              <span className="text-[10px]">▾</span>
            </button>

            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="hover:text-gray-600 cursor-pointer">↶</span>
              <span className="hover:text-gray-600 cursor-pointer">↷</span>
              <span className="hover:text-gray-600 cursor-pointer font-bold">B</span>
              <span className="hover:text-gray-600 cursor-pointer italic">I</span>
              <span className="hover:text-gray-600 cursor-pointer">🔗</span>
              <span className="hover:text-gray-600 cursor-pointer">📎</span>
              <span className="hover:text-gray-600 cursor-pointer">😊</span>
              <span className="hover:text-gray-600 cursor-pointer">🗑️</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
