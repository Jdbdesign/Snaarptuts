"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Building2, Plus, X, Users, Calendar, ChevronRight } from "lucide-react";
import { INITIAL_ORGANIZATIONS, LOCK_URLS, type Organization } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockOrganizationsView({ tl }: Props) {
  const orgs = useTimelineVar<Organization[]>(tl, "lockOrgs", INITIAL_ORGANIZATIONS);
  const createOrgOpen = useTimelineVar<boolean>(tl, "lockCreateOrgOpen", false);
  const orgNameInput = useTimelineVar<string>(tl, "lockCreateOrgName", "");

  const handleOpenCreate = () => {
    tl.setVar("lockCreateOrgOpen", true);
  };

  const handleCloseCreate = () => {
    tl.setVar("lockCreateOrgOpen", false);
  };

  const handleCreateSubmit = () => {
    const name = orgNameInput.trim() || "Acme Studio";
    const newOrg: Organization = {
      id: "org-acme-studio",
      name,
      memberCount: 1,
      date: "Today",
      members: [
        {
          id: "mem-owner",
          email: "jane@example.com",
          role: "Owner",
        },
      ],
    };
    tl.setVar("lockOrgs", [newOrg, ...orgs]);
    tl.setVar("lockCreateOrgOpen", false);
    tl.setVar("lockCreateOrgName", "");
    tl.setVar("lockToast", "Organization created successfully");
  };

  const handleOpenOrg = (orgId: string) => {
    tl.setVar("lockActiveOrgId", orgId);
    tl.setVar("lockView", "org-detail");
    tl.setUrl(LOCK_URLS.orgDetail);
  };

  return (
    <div
      data-tl="lock-orgs-container"
      data-lock-scroll="true"
      className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F8F9FA]"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div
          data-tl="orgs-header"
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Organizations
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Collaborate and share vaults with your team
            </p>
          </div>

          <button
            type="button"
            data-tl="btn-create-org"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Organization</span>
          </button>
        </div>

        {/* Create New Organization card */}
        {createOrgOpen && (
          <div
            data-tl="box-create-org"
            className="bg-white border border-[#E5E7EB] rounded-xl p-4 mb-6 shadow-xs animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-semibold text-gray-900">
                  Create New Organization
                </h3>
              </div>
              <button
                type="button"
                data-tl="btn-close-create-org"
                onClick={handleCloseCreate}
                className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="text"
                data-tl="input-org-name"
                value={orgNameInput}
                onChange={(e) => tl.setVar("lockCreateOrgName", e.target.value)}
                placeholder="Organization name (1-100 characters)"
                className="w-[360px] h-9 px-3 text-xs bg-white border border-gray-300 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all"
              />
              <button
                type="button"
                data-tl="btn-submit-org"
                onClick={handleCreateSubmit}
                className="h-9 px-4 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Organizations grid */}
        <div
          data-tl="orgs-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {orgs.map((org) => {
            const isStudio = org.name.toLowerCase().includes("studio");
            if (isStudio) {
              return (
                <div
                  key={org.id}
                  data-tl="org-card-studio"
                  onClick={() => handleOpenOrg(org.id)}
                  className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/40 hover:shadow-sm rounded-xl p-4 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                        {org.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span>{org.memberCount} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{org.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              );
            }
            return (
              <div
                key={org.id}
                data-tl="org-card-ltd"
                onClick={() => handleOpenOrg(org.id)}
                className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/40 hover:shadow-sm rounded-xl p-4 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                      {org.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span>{org.memberCount} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{org.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
