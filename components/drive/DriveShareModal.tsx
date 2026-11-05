"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Settings,
  X,
  Plus,
  Lock,
  Link as LinkIcon,
  Send,
  MessageSquare,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { DEFAULT_SHARE_PEOPLE, type SharedPerson } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveShareModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveShareModalOpen", false);
  const itemName = useTimelineVar<string>(tl, "driveShareItemName", "Workspaces");
  const emailVal = useTimelineVar(tl, "field:share-email", useTimelineVar(tl, "driveShareEmailVal", ""));
  const hasChip = useTimelineVar(tl, "driveShareHasChip", false);
  const recipientName = useTimelineVar<string>(tl, "driveShareRecipientName", "Alex Morgan");
  const role = useTimelineVar<"Can edit" | "Can view">(tl, "driveShareRole", "Can view");
  const roleDropdownOpen = useTimelineVar(tl, "driveShareRoleDropdownOpen", false);
  const showMessage = useTimelineVar(tl, "driveShareShowMessage", false);
  const messageVal = useTimelineVar(tl, "field:share-message", useTimelineVar(tl, "driveShareMessage", ""));
  const isSharing = useTimelineVar(tl, "driveIsSharing", false);
  const suggestVar = useTimelineVar(tl, "driveShareShowSuggest", false);
  const people = useTimelineVar<SharedPerson[]>(tl, "driveSharePeople", DEFAULT_SHARE_PEOPLE);
  const linkCopied = useTimelineVar(tl, "driveLinkCopied", false);
  const isShareAgain = useTimelineVar(tl, "driveShareAgain", false);
  const footerText = useTimelineVar<string>(
    tl,
    "driveShareLinkFooterText",
    "Only people with access can view."
  );

  const lowerEmail = emailVal.toLowerCase();
  const showAlexSuggest = (lowerEmail.includes("alex") || (suggestVar && !lowerEmail.includes("jordan") && !lowerEmail.includes("taylor"))) && !hasChip;
  const showJordanSuggest = lowerEmail.includes("jordan") && !hasChip;
  const showTaylorSuggest = lowerEmail.includes("taylor") && !hasChip;

  if (!isOpen) return null;

  return (
    <div
      data-tl="dialog-share-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      onClick={() => tl.setVar("driveShareModalOpen", false)}
    >
      <div
        data-tl="dialog-share"
        className="w-[460px] rounded-2xl bg-white p-5 shadow-2xl font-['Poppins',sans-serif] text-[#111827] select-none animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[16px] font-semibold text-[#111827]">
            Share &quot;{itemName}&quot;
          </h2>
          <div className="flex items-center gap-1.5 text-gray-400">
            <button
              type="button"
              data-tl="btn-share-settings"
              onClick={() => {
                tl.setVar("driveShareModalOpen", false);
                tl.setVar("driveLinkSettingsOpen", true);
              }}
              className="p-1 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
              title="Link settings"
            >
              <Settings size={17} />
            </button>
            <button
              type="button"
              data-tl="btn-share-close"
              onClick={() => tl.setVar("driveShareModalOpen", false)}
              className="p-1 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Add Email input */}
        <div className="mt-2 relative">
          <div className="flex items-center rounded-xl border border-gray-300 px-3 py-2 bg-white focus-within:border-blue-500 shadow-2xs">
            {hasChip ? (
              <div className="flex items-center justify-between w-full">
                <div
                  data-tl="share-email-chip"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-[12px] text-blue-700 font-medium"
                >
                  <span>{recipientName}</span>
                  <button
                    type="button"
                    data-tl="btn-remove-chip"
                    onClick={() => tl.setVar("driveShareHasChip", false)}
                    className="hover:text-blue-900 cursor-pointer ml-1"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* Role dropdown trigger */}
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-share-role"
                    onClick={() => tl.setVar("driveShareRoleDropdownOpen", !roleDropdownOpen)}
                    className="flex items-center gap-1 text-[12px] font-medium text-gray-700 hover:text-gray-900 px-2 py-1 rounded-lg border border-gray-200 cursor-pointer bg-white"
                  >
                    <span>{role}</span>
                    <ChevronDown size={12} className="text-gray-400" />
                  </button>

                  {roleDropdownOpen && (
                    <div
                      data-tl="menu-share-role"
                      className="absolute right-0 top-8 z-30 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-[12px]"
                    >
                      <button
                        type="button"
                        data-tl="option-role-view"
                        onClick={() => {
                          tl.setVar("driveShareRole", "Can view");
                          tl.setVar("driveShareRoleDropdownOpen", false);
                        }}
                        className={`flex w-full items-center px-3 py-1.5 text-left hover:bg-gray-50 cursor-pointer ${
                          role === "Can view" ? "font-semibold text-blue-600" : "text-gray-700"
                        }`}
                      >
                        Can view
                      </button>
                      <button
                        type="button"
                        data-tl="option-role-edit"
                        onClick={() => {
                          tl.setVar("driveShareRole", "Can edit");
                          tl.setVar("driveShareRoleDropdownOpen", false);
                        }}
                        className={`flex w-full items-center px-3 py-1.5 text-left hover:bg-gray-50 cursor-pointer ${
                          role === "Can edit" ? "font-semibold text-blue-600" : "text-gray-700"
                        }`}
                      >
                        Can edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  data-tl="share-email-input"
                  placeholder="Add email addresses"
                  value={emailVal}
                  readOnly
                  className="w-full text-[13px] text-[#111827] placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="button"
                  data-tl="btn-share-add-email"
                  onClick={() => {
                    if (emailVal.trim()) {
                      tl.setVar("driveShareHasChip", true);
                      tl.setVar("driveShareRecipientName", emailVal.trim());
                      tl.setVar("driveShareEmailVal", "");
                      tl.setVar("field:share-email", "");
                    }
                  }}
                  className="ml-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0"
                >
                  <Plus size={16} />
                </button>
              </>
            )}
          </div>

          {/* Autocomplete suggestion popovers */}
          {showAlexSuggest && (
            <div
              data-tl="share-suggest-alex"
              onClick={() => {
                tl.setVar("driveShareHasChip", true);
                tl.setVar("driveShareEmailVal", "");
                tl.setVar("field:share-email", "");
                tl.setVar("driveShareRecipientName", "Alex Morgan");
                tl.setVar("driveShareRecipientEmail", "alex.morgan@acme.example");
              }}
              className="mt-1 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5 shadow-lg hover:bg-blue-50/50 cursor-pointer animate-in fade-in transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                A
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-gray-900 leading-tight">Alex Morgan</p>
                <p className="text-[11px] text-gray-400">alex.morgan@acme.example</p>
              </div>
            </div>
          )}

          {showJordanSuggest && (
            <div
              data-tl="share-suggest-jordan"
              onClick={() => {
                tl.setVar("driveShareHasChip", true);
                tl.setVar("driveShareEmailVal", "");
                tl.setVar("field:share-email", "");
                tl.setVar("driveShareRecipientName", "Jordan Lee");
                tl.setVar("driveShareRecipientEmail", "jordan.lee@acme.example");
              }}
              className="mt-1 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5 shadow-lg hover:bg-blue-50/50 cursor-pointer animate-in fade-in transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                J
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-gray-900 leading-tight">Jordan Lee</p>
                <p className="text-[11px] text-gray-400">jordan.lee@acme.example</p>
              </div>
            </div>
          )}

          {showTaylorSuggest && (
            <div
              data-tl="share-suggest-taylor"
              onClick={() => {
                tl.setVar("driveShareHasChip", true);
                tl.setVar("driveShareEmailVal", "");
                tl.setVar("field:share-email", "");
                tl.setVar("driveShareRecipientName", "Taylor Reed");
                tl.setVar("driveShareRecipientEmail", "taylor.reed@acme.example");
              }}
              className="mt-1 flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5 shadow-lg hover:bg-blue-50/50 cursor-pointer animate-in fade-in transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                T
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-gray-900 leading-tight">Taylor Reed</p>
                <p className="text-[11px] text-gray-400">taylor.reed@acme.example</p>
              </div>
            </div>
          )}

          {/* Add a message trigger / input */}
          {!showMessage ? (
            <button
              type="button"
              data-tl="btn-share-add-message"
              onClick={() => tl.setVar("driveShareShowMessage", true)}
              className="flex items-center gap-1.5 mt-2.5 text-[12px] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <MessageSquare size={13} className="text-gray-400" />
              <span>Add a message</span>
            </button>
          ) : (
            <div className="mt-2.5">
              <textarea
                data-tl="share-message-input"
                placeholder="Add a message..."
                value={messageVal}
                readOnly
                rows={2}
                className="w-full rounded-xl border border-gray-300 p-2.5 text-[12px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 shadow-2xs resize-none"
              />
            </div>
          )}
        </div>

        {/* PEOPLE WITH ACCESS */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            People with access
          </span>

          <div className="mt-2.5 space-y-2.5 max-h-48 overflow-y-auto">
            {people.map((person) => (
              <div key={person.id} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      person.avatarBg ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {person.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#111827] leading-tight">
                      {person.email}
                    </p>
                    {person.role === "Owner" ? (
                      <p className="text-[11px] text-gray-400">Owner</p>
                    ) : (
                      <button
                        type="button"
                        data-tl={`select-person-role-${person.id}`}
                        onClick={() => {
                          const newRole = person.role === "Can view" ? "Can edit" : "Can view";
                          tl.setVar(
                            "driveSharePeople",
                            people.map((p) => (p.id === person.id ? { ...p, role: newRole } : p))
                          );
                          tl.setVar("drivePersonRoleUpdatedToastOpen", true);
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      >
                        {person.role}
                      </button>
                    )}
                  </div>
                </div>

                {person.role !== "Owner" && (
                  <button
                    type="button"
                    data-tl={`btn-remove-person-${person.id}`}
                    onClick={() => {
                      tl.setVar(
                        "driveSharePeople",
                        people.filter((p) => p.id !== person.id)
                      );
                      tl.setVar("drivePersonRemovedToastOpen", true);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-6 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Lock size={13} className="text-gray-400" />
            <span>{footerText}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="btn-share-copy-link"
              onClick={() => {
                tl.setVar("driveLinkCopied", true);
                tl.setVar("driveLinkCopiedToastOpen", true);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <LinkIcon size={14} className="text-gray-500" />
              <span>{linkCopied ? "Copied!" : "Copy link"}</span>
            </button>

            <button
              type="button"
              data-tl="btn-share-send"
              disabled={isSharing}
              onClick={() => {
                tl.setVar("driveShareModalOpen", false);
                if (itemName === "Client Files") {
                  tl.setVar("driveFolderShareToastOpen", true);
                  tl.setVar("driveClientFilesShared", true);
                } else if (isShareAgain) {
                  tl.setVar("driveShareAgainToastOpen", true);
                } else {
                  tl.setVar("driveShareSuccessToastOpen", true);
                }
              }}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-[12px] font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-75"
            >
              {isSharing ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>{hasChip ? "Share" : "Send"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
