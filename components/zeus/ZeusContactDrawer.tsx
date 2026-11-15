"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Lock,
  Plus,
  Loader2,
  Copy,
  MapPin,
  ExternalLink,
} from "lucide-react";
import type { ZeusContact, ZeusList } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusContactDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusDrawerOpen", false);
  const contact = useTimelineVar<ZeusContact | null>(tl, "zeusSelectedContact", null);
  const revealed = useTimelineVar<boolean>(tl, "zeusContactRevealed", false);
  const revealing = useTimelineVar<boolean>(tl, "zeusRevealing", false);
  const addToListOpen = useTimelineVar<boolean>(tl, "zeusAddToListDropdownOpen", false);
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);

  if (!isOpen || !contact) return null;

  const handleReveal = () => {
    tl.setVar("zeusContactRevealed", true);
    tl.setVar("zeusCredits", 97);
  };

  const handleAddToList = (listName: string) => {
    const updatedLists = lists.map((l) => {
      if (l.name === listName) {
        return {
          ...l,
          membersCount: l.membersCount + 1,
          contacts: [...(l.contacts || []), contact],
        };
      }
      return l;
    });
    tl.setVar("zeusLists", updatedLists);
    tl.setVar("zeusAddToListDropdownOpen", false);
    tl.setVar("zeusToast", {
      text: `Added to ${listName}`,
      subtext: "Contact saved to list",
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  return (
    <div
      data-tl="zeus-drawer-overlay"
      className="fixed inset-0 z-40 flex justify-end bg-black/25 backdrop-blur-[1px] animate-in fade-in duration-200"
      onClick={() => tl.setVar("zeusDrawerOpen", false)}
    >
      <div
        data-tl="zeus-contact-drawer"
        className="w-full max-w-[420px] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              data-tl="btn-close-drawer"
              onClick={() => tl.setVar("zeusDrawerOpen", false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Details Header */}
          <div className="flex flex-col items-center text-center mt-2">
            <div
              className={`w-16 h-16 rounded-full text-white font-bold text-xl flex items-center justify-center shadow-sm ${contact.avatarBg}`}
            >
              {contact.initials}
            </div>
            <h2
              data-tl="drawer-contact-name"
              className="text-xl font-bold text-gray-900 mt-3 tracking-tight"
            >
              {contact.name}
            </h2>
            <p className="text-xs text-gray-600 font-medium mt-0.5">{contact.title}</p>
            <p className="text-xs text-blue-600 font-semibold hover:underline mt-0.5">
              {contact.company}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
              <MapPin className="w-3 h-3" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Contact Information Box */}
          <div className="mt-8 border border-gray-200/90 rounded-2xl p-5 bg-gray-50/70">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-gray-900">Contact Information</h3>
              <span className="text-[10px] font-semibold text-[#7014D9] bg-[#F5EEFF] px-2 py-0.5 rounded-full">
                1 credit
              </span>
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                  Email
                </span>
                {revealed ? (
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2">
                    <span
                      data-tl="drawer-revealed-email"
                      className="font-mono text-xs font-bold text-gray-900"
                    >
                      {contact.revealedEmail}
                    </span>
                    <button
                      type="button"
                      data-tl="btn-copy-drawer-email"
                      className="p-1 text-gray-400 hover:text-gray-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400">
                    <Lock className="w-3.5 h-3.5 text-gray-300" />
                    <span className="font-mono">{contact.maskedEmail}</span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                  Phone
                </span>
                <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400">
                  {contact.phone}
                </div>
              </div>

              {/* Reveal Button (if not yet revealed) */}
              {!revealed && (
                <div className="pt-2">
                  <button
                    type="button"
                    data-tl="btn-reveal-contact"
                    onClick={handleReveal}
                    disabled={revealing}
                    className="w-full bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {revealing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Revealing...</span>
                      </>
                    ) : (
                      <span>Reveal Contact (1 credit)</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-6 border-t border-gray-100 relative">
          {/* Add to list dropdown */}
          {addToListOpen && (
            <div
              data-tl="add-to-list-dropdown"
              className="absolute bottom-16 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 text-xs animate-in fade-in duration-150"
            >
              <div className="text-[11px] font-bold text-gray-500 mb-2">Select a list:</div>
              <div className="space-y-1">
                {lists.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    data-tl={
                      l.name === "New Leads"
                        ? "add-to-list-item-new-leads"
                        : `add-to-list-item-${l.id}`
                    }
                    onClick={() => handleAddToList(l.name)}
                    className="w-full text-left px-3 py-2 hover:bg-[#F5EEFF] hover:text-[#7014D9] rounded-lg transition-colors flex items-center justify-between font-semibold text-gray-800"
                  >
                    <span>{l.name}</span>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-add-to-list"
              onClick={() => tl.setVar("zeusAddToListDropdownOpen", !addToListOpen)}
              className="flex-1 border border-gray-200 hover:border-gray-300 bg-white text-gray-800 font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-gray-500" />
              <span>Add to List</span>
            </button>

            <button
              type="button"
              data-tl="btn-view-linkedin"
              className="border border-blue-600 bg-blue-50 text-blue-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
