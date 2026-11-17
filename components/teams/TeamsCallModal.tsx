import React from "react";
import { Mic, PhoneOff, UserPlus, Minimize2 } from "lucide-react";

export function TeamsCallModal({
  isOpen,
  onEndCall,
}: {
  isOpen: boolean;
  onEndCall: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="call-overlay"
      className="absolute inset-0 z-50 flex flex-col items-center justify-between bg-[#0F0F10] p-8 text-white select-none animate-in fade-in duration-150"
    >
      {/* Top right minimize button */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          data-tl="call-minimize-btn"
          className="w-8 h-8 rounded-full bg-zinc-800/80 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Center user info */}
      <div className="flex flex-col items-center">
        <div
          data-tl="call-avatar"
          className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-semibold text-white shadow-2xl ring-4 ring-blue-500/20 mb-4"
        >
          ST
        </div>
        <h2
          data-tl="call-contact-name"
          className="text-lg font-semibold text-white"
        >
          Sam Taylor
        </h2>
        <p
          data-tl="call-status"
          className="text-xs text-gray-400 font-medium mt-1 tracking-wide animate-pulse"
        >
          Calling...
        </p>
      </div>

      {/* Bottom control buttons */}
      <div className="flex items-center gap-5 mb-8">
        {/* Mic */}
        <button
          type="button"
          data-tl="call-mic-btn"
          className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* End Call (Red) */}
        <button
          type="button"
          data-tl="call-end-btn"
          onClick={onEndCall}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          <PhoneOff className="w-6 h-6" />
        </button>

        {/* Add Person */}
        <button
          type="button"
          data-tl="call-add-btn"
          className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
