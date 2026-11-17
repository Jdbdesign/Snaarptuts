import React from "react";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Sparkles,
  ChevronDown,
  Volume2,
  Settings,
  MoreVertical,
} from "lucide-react";

export function TeamsPrejoinView({
  isOpen,
  camOff = false,
  micOff = false,
  onToggleCam,
  onToggleMic,
  onJoinNow,
}: {
  isOpen: boolean;
  camOff?: boolean;
  micOff?: boolean;
  onToggleCam?: () => void;
  onToggleMic?: () => void;
  onJoinNow?: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="prejoin-view"
      className="absolute inset-0 z-40 bg-white flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-200 text-[#111827]"
    >
      {/* Top bar */}
      <header
        data-tl="prejoin-topbar"
        className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm">
            <Video className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-gray-900">
            Snaarp <span className="font-normal text-gray-600">Meet</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs text-gray-500">jane@example.com</span>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
            J
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-8 py-6 overflow-y-auto no-scrollbar">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Column: Video Preview & Hardware Controls */}
          <div className="flex flex-col items-center">
            {/* Dark Video Box */}
            <div
              data-tl="prejoin-video-box"
              className="w-[520px] h-[330px] rounded-2xl bg-[#202124] relative flex items-center justify-center shadow-xl overflow-hidden border border-zinc-800"
            >
              {/* Name badge */}
              <div
                data-tl="prejoin-name-badge"
                className="absolute left-4 top-4 px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm"
              >
                Jane
              </div>

              {/* Three dots top right */}
              <button
                type="button"
                className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Center avatar letter */}
              <div
                data-tl="prejoin-avatar"
                className="w-20 h-20 rounded-full bg-zinc-700/80 flex items-center justify-center text-3xl font-semibold text-white shadow-inner"
              >
                J
              </div>

              {/* Bottom left extra button */}
              <div className="absolute left-4 bottom-4 w-7 h-7 rounded-full bg-black/40 text-gray-300 flex items-center justify-center text-xs">
                •••
              </div>
            </div>

            {/* In-box Floating Controls (Mic / Cam / Effects) */}
            <div className="flex items-center justify-center gap-3 -mt-6 z-10">
              {/* Mic toggle button */}
              <button
                type="button"
                data-tl="prejoin-mic-btn"
                onClick={onToggleMic}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-md ${
                  micOff
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {micOff ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              {/* Camera toggle button */}
              <button
                type="button"
                data-tl="prejoin-cam-btn"
                onClick={onToggleCam}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-md ${
                  camOff
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {camOff ? (
                  <VideoOff className="w-5 h-5" />
                ) : (
                  <Video className="w-5 h-5" />
                )}
              </button>

              {/* Effects button */}
              <button
                type="button"
                data-tl="prejoin-effects-btn"
                className="w-11 h-11 rounded-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center transition-colors shadow-md"
              >
                <Sparkles className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Dropdown Chips Row */}
            <div
              data-tl="prejoin-chips-row"
              className="flex items-center gap-2 mt-4 text-[11px] text-gray-600 font-medium"
            >
              <div
                data-tl="prejoin-chip-mic"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <Mic className="w-3 h-3 text-gray-400" />
                <span>Microphone (R...</span>
                <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
              </div>

              <div
                data-tl="prejoin-chip-speaker"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <Volume2 className="w-3 h-3 text-gray-400" />
                <span>Default - Spea...</span>
                <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
              </div>

              <div
                data-tl="prejoin-chip-camera"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <Video className="w-3 h-3 text-gray-400" />
                <span>Camera...</span>
                <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
              </div>

              <div
                data-tl="prejoin-chip-backgrounds"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-gray-400" />
                <span>Backgrounds...</span>
              </div>
            </div>
          </div>

          {/* Right Column: Ready to Join CTA & Controls */}
          <div className="flex flex-col items-center text-center w-full max-w-xs">
            <h2
              data-tl="prejoin-ready-title"
              className="text-2xl font-semibold text-gray-900 mb-1"
            >
              Ready to join?
            </h2>
            <p
              data-tl="prejoin-ready-sub"
              className="text-xs text-gray-500 mb-6"
            >
              Joining as Jane
            </p>

            <button
              type="button"
              data-tl="prejoin-join-btn"
              onClick={onJoinNow}
              className="w-full h-11 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-medium flex items-center justify-center transition-colors shadow-sm mb-4 cursor-pointer"
            >
              Join now
            </button>

            {/* Accordions */}
            <div className="w-full space-y-2 mb-4">
              <div
                data-tl="prejoin-settings-accordion"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <span>Meeting link settings</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>

              <div
                data-tl="prejoin-host-controls-accordion"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span>Host controls</span>
                </div>
                <Settings className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Other ways to join */}
            <button
              type="button"
              data-tl="prejoin-other-ways-btn"
              className="inline-flex items-center gap-1 text-xs text-[#1A73E8] font-medium hover:underline cursor-pointer"
            >
              <span>Other ways to join</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
