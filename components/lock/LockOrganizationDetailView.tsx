"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Users,
  UserPlus,
  Mail,
  X,
  ChevronDown,
  Crown,
  User,
  Shield,
  UserMinus,
  ArrowLeftRight,
  Loader2,
  Check,
} from "lucide-react";
import { LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockOrganizationDetailView({ tl }: Props) {
  const orgDetailLoading = useTimelineVar<boolean>(tl, "lockOrgDetailLoading", false);
  const inviteOpen = useTimelineVar<boolean>(tl, "lockInviteOpen", false);
  const inviteEmail = useTimelineVar<string>(tl, "lockInviteEmail", "");
  const inviteRole = useTimelineVar<string>(tl, "lockInviteRole", "Member");
  const memberCount = useTimelineVar<number>(tl, "lockMemberCount", 1);
  const memberRole = useTimelineVar<"Member" | "Admin">(tl, "lockMemberRole", "Member");
  const roleDropdownOpen = useTimelineVar<boolean>(tl, "lockRoleDropdownOpen", false);
  const transferTooltip = useTimelineVar<boolean>(tl, "lockTransferTooltip", false);

  const handleBack = () => {
    tl.setVar("lockView", "organizations");
    tl.setUrl(LOCK_URLS.organizations);
  };

  const handleOpenInvite = () => {
    tl.setVar("lockInviteOpen", true);
  };

  const handleCloseInvite = () => {
    tl.setVar("lockInviteOpen", false);
  };

  const handleSendInvite = () => {
    tl.setVar("lockMemberCount", 2);
    tl.setVar("lockInviteOpen", false);
    tl.setVar("lockInviteEmail", "");
    tl.setVar("lockToast", "Invitation sent successfully");
  };

  const handleSelectRole = (newRole: "Member" | "Admin") => {
    tl.setVar("lockMemberRole", newRole);
    tl.setVar("lockRoleDropdownOpen", false);
    tl.setVar("lockToast", "Role updated");
  };

  const handleOpenTransferModal = () => {
    tl.setVar("lockTransferModalOpen", true);
  };

  return (
    <div
      data-tl="lock-org-detail-container"
      data-lock-scroll="true"
      className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F8F9FA]"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            data-tl="btn-org-back"
            onClick={handleBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1
              data-tl="org-detail-title"
              className="text-xl font-bold text-gray-900 tracking-tight"
            >
              Acme Studio
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage members and permissions
            </p>
          </div>
        </div>

        {/* Members card */}
        <div
          data-tl="card-org-members"
          className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs max-w-[540px] w-full"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Members</h2>
              <span
                data-tl="pill-members-count"
                className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium"
              >
                {memberCount}
              </span>
            </div>

            <button
              type="button"
              data-tl="btn-open-invite"
              onClick={handleOpenInvite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </button>
          </div>

          {/* Loading spinner moment */}
          {orgDetailLoading ? (
            <div className="py-8 flex flex-col items-center justify-center text-gray-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#7C3AED]" />
              <span className="text-xs text-gray-500 font-medium">Loading members...</span>
            </div>
          ) : (
            <>
              {/* Inline Invite Box */}
              {inviteOpen && (
                <div
                  data-tl="box-inline-invite"
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3.5 my-3 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Invite a new member</span>
                    </div>
                    <button
                      type="button"
                      data-tl="btn-close-invite"
                      onClick={handleCloseInvite}
                      className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      data-tl="input-invite-email"
                      value={inviteEmail}
                      onChange={(e) => tl.setVar("lockInviteEmail", e.target.value)}
                      placeholder="member@example.com"
                      className="flex-1 h-8 px-2.5 text-xs bg-white border border-gray-300 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-md text-gray-900 placeholder-gray-400 outline-none"
                    />

                    <div
                      data-tl="select-invite-role"
                      className="h-8 px-2.5 bg-white border border-gray-300 rounded-md text-xs text-gray-700 flex items-center justify-between gap-1 w-24 cursor-pointer"
                    >
                      <span>{inviteRole}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>

                    <button
                      type="button"
                      data-tl="btn-send-invite"
                      onClick={handleSendInvite}
                      className="h-8 px-3.5 rounded-md bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer flex items-center justify-center shrink-0"
                    >
                      Send Invite
                    </button>
                  </div>
                </div>
              )}

              {/* Members List */}
              <div className="divide-y divide-[#F3F4F6] mt-1">
                {/* Row 1: Owner */}
                <div
                  data-tl="member-row-owner"
                  className="py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold text-xs">
                      J
                    </div>
                    <span
                      data-tl="pill-role-owner"
                      className="bg-[#FEF3C7] text-[#D97706] text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <Crown className="w-3 h-3 text-[#D97706]" />
                      <span>Owner</span>
                    </span>
                  </div>
                </div>

                {/* Row 2: Member / Admin */}
                {memberCount >= 2 && (
                  <div
                    data-tl="member-row-john"
                    className="py-3 flex items-center justify-between animate-in fade-in duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold text-xs">
                        J
                      </div>

                      {memberRole === "Member" ? (
                        <span
                          data-tl="pill-role-member"
                          className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <User className="w-3 h-3 text-gray-400" />
                          <span>Member</span>
                        </span>
                      ) : (
                        <span
                          data-tl="pill-role-admin"
                          className="bg-[#EDE9FE] text-[#7C3AED] text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <Shield className="w-3 h-3 text-[#7C3AED]" />
                          <span>Admin</span>
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Role dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          data-tl="select-member-role"
                          onClick={() => tl.setVar("lockRoleDropdownOpen", !roleDropdownOpen)}
                          className="h-7 px-2 border border-gray-200 hover:border-gray-300 rounded text-xs text-gray-700 bg-white flex items-center gap-1 cursor-pointer"
                        >
                          <span>{memberRole}</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>

                        {roleDropdownOpen && (
                          <div
                            data-tl="dropdown-member-role"
                            className="absolute right-0 top-full mt-1 w-28 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-30"
                          >
                            <button
                              type="button"
                              data-tl="option-role-member"
                              onClick={() => handleSelectRole("Member")}
                              className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between cursor-pointer ${
                                memberRole === "Member"
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span>Member</span>
                              {memberRole === "Member" && <Check className="w-3 h-3 text-blue-600" />}
                            </button>
                            <button
                              type="button"
                              data-tl="option-role-admin"
                              onClick={() => handleSelectRole("Admin")}
                              className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between cursor-pointer ${
                                memberRole === "Admin"
                                  ? "bg-blue-50 text-blue-600 font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span>Admin</span>
                              {memberRole === "Admin" && <Check className="w-3 h-3 text-blue-600" />}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Remove member button */}
                      <button
                        type="button"
                        data-tl="btn-remove-member"
                        className="w-7 h-7 rounded flex items-center justify-center text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>

                      {/* Transfer ownership button & tooltip */}
                      <div className="relative">
                        <button
                          type="button"
                          data-tl="btn-transfer-owner"
                          onClick={handleOpenTransferModal}
                          onMouseEnter={() => tl.setVar("lockTransferTooltip", true)}
                          onMouseLeave={() => tl.setVar("lockTransferTooltip", false)}
                          className="w-7 h-7 rounded flex items-center justify-center text-amber-500 hover:bg-amber-50 cursor-pointer transition-colors"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                        </button>

                        {transferTooltip && (
                          <div
                            data-tl="tooltip-transfer"
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-900 text-white text-[10px] rounded shadow-md whitespace-nowrap pointer-events-none z-30"
                          >
                            Transfer ownership
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
