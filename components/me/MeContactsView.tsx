"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  type Contact,
  ORGANIZATION_CONTACTS,
  INVITEE_CONTACTS,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeContactsView({ tl }: Props) {
  // Tab
  const tab = useTimelineVar<"my-contacts" | "organization" | "invitees">(
    tl,
    "meContactsTab",
    "my-contacts"
  );

  // Collections
  const myContacts = useTimelineVar<Contact[]>(tl, "meMyContacts", []);
  const search = useTimelineVar<string>(tl, "meContactsSearch", "");
  const banner = useTimelineVar<string | null>(tl, "meContactsBanner", null);

  // Dropdowns & Popovers
  const addMenuOpen = useTimelineVar<boolean>(tl, "meAddContactMenuOpen", false);
  const showColumnsOpen = useTimelineVar<boolean>(tl, "meShowColumnsOpen", false);
  const filterOpen = useTimelineVar<boolean>(tl, "meFilterOpen", false);
  const exportTooltip = useTimelineVar<boolean>(tl, "meExportTooltipOpen", false);

  // Columns visibility
  const colFirstName = useTimelineVar<boolean>(tl, "meColFirstName", false);
  const colLastName = useTimelineVar<boolean>(tl, "meColLastName", false);
  const colEmail = useTimelineVar<boolean>(tl, "meColEmail", true);
  const colPhone = useTimelineVar<boolean>(tl, "meColPhone", true);
  const colNextMeeting = useTimelineVar<boolean>(tl, "meColNextMeeting", true);
  const colLastMeeting = useTimelineVar<boolean>(tl, "meColLastMeeting", true);
  const colCreatedOn = useTimelineVar<boolean>(tl, "meColCreatedOn", false);
  const colCompany = useTimelineVar<boolean>(tl, "meColCompany", true);

  // Custom Job column & its 3-dots menu
  const jobColAdded = useTimelineVar<boolean>(tl, "meJobColumnAdded", false);
  const jobColMenuOpen = useTimelineVar<boolean>(tl, "meJobColumnMenuOpen", false);

  // Filter state
  const filterField = useTimelineVar<string>(tl, "meFilterField", "Email");
  const filterCondition = useTimelineVar<string>(tl, "meFilterCondition", "contains");
  const filterValue = useTimelineVar<string>(tl, "meFilterValue", "design");
  const filterApplied = useTimelineVar<boolean>(tl, "meFilterApplied", false);
  const filterFieldDropdownOpen = useTimelineVar<boolean>(tl, "meFilterFieldDropdownOpen", false);
  const filterCondDropdownOpen = useTimelineVar<boolean>(tl, "meFilterCondDropdownOpen", false);

  // Active filter chip
  const activeChip = useTimelineVar<string>(tl, "meActiveChip", "all");

  // Determine current dataset
  let currentList: Contact[] = [];
  if (tab === "my-contacts") {
    currentList = myContacts;
  } else if (tab === "organization") {
    currentList = ORGANIZATION_CONTACTS;
  } else {
    currentList = INVITEE_CONTACTS;
  }

  // Apply Filter if active
  if (tab === "invitees" && filterApplied && filterValue) {
    const val = filterValue.toLowerCase();
    currentList = currentList.filter(
      (c) =>
        c.email.toLowerCase().includes(val) ||
        c.name.toLowerCase().includes(val) ||
        (c.company && c.company.toLowerCase().includes(val))
    );
  }

  // Apply Search if active
  if (search.trim()) {
    const query = search.toLowerCase().trim();
    currentList = currentList.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        (c.company && c.company.toLowerCase().includes(query)) ||
        (c.jobTitle && c.jobTitle.toLowerCase().includes(query))
    );
  }

  const avatarColors = [
    "bg-emerald-100 text-emerald-800",
    "bg-sky-100 text-sky-800",
    "bg-purple-100 text-purple-800",
    "bg-amber-100 text-amber-800",
    "bg-rose-100 text-rose-800",
    "bg-indigo-100 text-indigo-800",
  ];

  return (
    <div data-tl="me-contacts-view" className="max-w-6xl mx-auto space-y-4 select-none pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Contacts</h1>

        <div className="flex items-center gap-3">
          {/* Export CSV Icon Button */}
          <div className="relative">
            <button
              type="button"
              data-tl="me-contacts-export-btn"
              onMouseEnter={() => tl.setVar("meExportTooltipOpen", true)}
              onMouseLeave={() => tl.setVar("meExportTooltipOpen", false)}
              onClick={() => {
                tl.setVar(
                  "meContactsBanner",
                  "Contacts export started. Your CSV will download shortly."
                );
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-xs transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>

            {exportTooltip && (
              <div
                data-tl="me-contacts-export-tooltip"
                className="absolute right-0 top-11 z-30 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[11px] font-medium text-white shadow-md animate-fadeIn"
              >
                Export CSV
              </div>
            )}
          </div>

          {/* Settings Gear Icon Button */}
          <button
            type="button"
            data-tl="me-contacts-settings-btn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* + Add contact Button & Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="me-contacts-add-btn"
              onClick={() => tl.setVar("meAddContactMenuOpen", !addMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add contact</span>
              <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {addMenuOpen && (
              <div
                data-tl="me-contacts-add-menu"
                className="absolute right-0 z-30 mt-1 w-44 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg animate-fadeIn"
              >
                <button
                  type="button"
                  data-tl="me-contacts-add-manually"
                  onClick={() => {
                    tl.setVar("meAddContactMenuOpen", false);
                    tl.setVar("meAddContactModalOpen", true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Add manually</span>
                </button>
                <button
                  type="button"
                  data-tl="me-contacts-upload-csv"
                  onClick={() => {
                    tl.setVar("meAddContactMenuOpen", false);
                    tl.setVar("meUploadCsvModalOpen", true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload CSV</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 text-xs font-semibold">
        <button
          type="button"
          data-tl="me-contacts-tab-my"
          onClick={() => {
            tl.setVar("meContactsTab", "my-contacts");
            tl.setVar("meContactsSearch", "");
          }}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            tab === "my-contacts"
              ? "border-[#7014D9] text-gray-900 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          My Contacts
        </button>

        <button
          type="button"
          data-tl="me-contacts-tab-org"
          onClick={() => {
            tl.setVar("meContactsTab", "organization");
            tl.setVar("meContactsSearch", "");
          }}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            tab === "organization"
              ? "border-[#7014D9] text-gray-900 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Organization
        </button>

        <button
          type="button"
          data-tl="me-contacts-tab-invitees"
          onClick={() => {
            tl.setVar("meContactsTab", "invitees");
            tl.setVar("meContactsSearch", "");
          }}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            tab === "invitees"
              ? "border-[#7014D9] text-gray-900 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Invitees
        </button>
      </div>

      {/* Control Bar: Search + Show Columns + Filter */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative w-64">
          <svg className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            data-tl="me-contacts-search-input"
            value={search}
            onChange={(e) => tl.setVar("meContactsSearch", e.target.value)}
            placeholder="Search by name and email"
            className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-7 text-xs text-gray-800 placeholder:text-gray-400 shadow-xs focus:border-[#7014D9] focus:outline-none"
          />
          {search && (
            <button
              type="button"
              data-tl="me-contacts-search-clear"
              onClick={() => tl.setVar("meContactsSearch", "")}
              className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Show Columns Popover */}
        <div className="relative">
          <button
            type="button"
            data-tl="me-contacts-columns-btn"
            onClick={() => {
              tl.setVar("meShowColumnsOpen", !showColumnsOpen);
              tl.setVar("meFilterOpen", false);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Show columns</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={showColumnsOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>

          {showColumnsOpen && (
            <div
              data-tl="me-contacts-columns-popover"
              className="absolute z-30 mt-1 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl animate-fadeIn space-y-1 text-xs"
            >
              {[
                { key: "meColFirstName", label: "First name", checked: colFirstName },
                { key: "meColLastName", label: "Last name", checked: colLastName },
                { key: "meColEmail", label: "Email", checked: colEmail },
                { key: "meColPhone", label: "Phone number", checked: colPhone },
                { key: "meColNextMeeting", label: "Next meeting date", checked: colNextMeeting },
                { key: "meColLastMeeting", label: "Last meeting date", checked: colLastMeeting },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  data-tl={`me-col-check-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => tl.setVar(item.key, !item.checked)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-gray-700 hover:bg-gray-50"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      item.checked
                        ? "border-[#7014D9] bg-[#7014D9] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {item.checked && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Disabled items */}
              <div className="flex w-full items-center justify-between px-2.5 py-1.5 text-gray-300 cursor-not-allowed">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 rounded-sm border border-gray-200 bg-gray-50" />
                  <span>First email date</span>
                </div>
                <span className="text-gray-400 text-[10px]">&#9432;</span>
              </div>
              <div className="flex w-full items-center justify-between px-2.5 py-1.5 text-gray-300 cursor-not-allowed">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 rounded-sm border border-gray-200 bg-gray-50" />
                  <span>Last email date</span>
                </div>
                <span className="text-gray-400 text-[10px]">&#9432;</span>
              </div>

              <button
                type="button"
                data-tl="me-col-check-created-on"
                onClick={() => tl.setVar("meColCreatedOn", !colCreatedOn)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-gray-700 hover:bg-gray-50"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                    colCreatedOn
                      ? "border-[#7014D9] bg-[#7014D9] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {colCreatedOn && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span>Created on</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Popover */}
        <div className="relative">
          <button
            type="button"
            data-tl="me-contacts-filter-btn"
            onClick={() => {
              tl.setVar("meFilterOpen", !filterOpen);
              tl.setVar("meShowColumnsOpen", false);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-xs hover:bg-gray-50"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filter</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={filterOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>

          {filterOpen && (
            <div
              data-tl="me-contacts-filter-popover"
              className="absolute z-30 mt-1 w-96 rounded-xl border border-gray-200 bg-white p-4 shadow-xl animate-fadeIn space-y-3"
            >
              <span className="block text-[11px] font-semibold text-gray-500 uppercase">Where</span>

              <div className="flex items-center gap-2">
                {/* Field select */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    data-tl="me-filter-field-select"
                    onClick={() => tl.setVar("meFilterFieldDropdownOpen", !filterFieldDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-2.5 py-1.5 text-xs text-gray-800"
                  >
                    <span>{filterField}</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {filterFieldDropdownOpen && (
                    <div
                      data-tl="me-filter-field-menu"
                      className="absolute z-40 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-xs"
                    >
                      {["Email", "Last name", "Phone number", "Next meeting date", "Company"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => {
                            tl.setVar("meFilterField", f);
                            tl.setVar("meFilterFieldDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-50"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Condition select */}
                <div className="relative w-28">
                  <button
                    type="button"
                    data-tl="me-filter-condition-select"
                    onClick={() => tl.setVar("meFilterCondDropdownOpen", !filterCondDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 px-2.5 py-1.5 text-xs text-gray-800"
                  >
                    <span>{filterCondition}</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {filterCondDropdownOpen && (
                    <div
                      data-tl="me-filter-condition-menu"
                      className="absolute z-40 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-xs"
                    >
                      {["contains", "equals", "starts with"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            tl.setVar("meFilterCondition", c);
                            tl.setVar("meFilterCondDropdownOpen", false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-50"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Value input */}
                <input
                  type="text"
                  data-tl="me-filter-value-input"
                  value={filterValue}
                  onChange={(e) => tl.setVar("meFilterValue", e.target.value)}
                  placeholder="Enter value"
                  className="w-28 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:border-[#7014D9] focus:outline-none"
                />

                {/* Trash button */}
                <button
                  type="button"
                  data-tl="me-filter-trash-btn"
                  onClick={() => {
                    tl.setVar("meFilterApplied", false);
                    tl.setVar("meFilterValue", "");
                    tl.setVar("meFilterOpen", false);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="text-xs font-semibold text-[#7014D9] hover:underline"
                >
                  + Add condition
                </button>

                <button
                  type="button"
                  data-tl="me-filter-apply-btn"
                  onClick={() => {
                    tl.setVar("meFilterApplied", true);
                    tl.setVar("meFilterOpen", false);
                  }}
                  className="rounded-lg bg-[#7014D9] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {[
          { id: "all", label: "All contacts" },
          { id: "new", label: "New contacts" },
          { id: "no-activity", label: "No activity in next 30d" },
          { id: "no-meetings", label: "No meetings in next 30d" },
        ].map((chip) => {
          const isSelected = activeChip === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              data-tl={`me-filter-chip-${chip.id}`}
              onClick={() => tl.setVar("meActiveChip", chip.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0 ${
                isSelected
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>{chip.label}</span>
            </button>
          );
        })}

        <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        <button
          type="button"
          data-tl="me-contacts-add-list-btn"
          className="text-xs font-semibold text-[#7014D9] hover:underline shrink-0 ml-1"
        >
          + Add list
        </button>
      </div>

      {/* Inline Green Banner */}
      {banner && (
        <div
          data-tl="me-contacts-banner"
          className="rounded-lg bg-[#E6F4EA] border border-emerald-200 px-4 py-2.5 text-xs font-medium text-[#137333] flex items-center justify-between animate-fadeIn"
        >
          <span>{banner}</span>
          <button
            type="button"
            onClick={() => tl.setVar("meContactsBanner", null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Table */}
      <div
        data-tl="me-contacts-table"
        className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-[#F9FAFB] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-3 w-8">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-1 cursor-pointer">
                  <span>Name</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </th>
              {colFirstName && <th className="py-3 px-4">First name</th>}
              {colLastName && <th className="py-3 px-4">Last name</th>}
              {colEmail && <th className="py-3 px-4">Email</th>}
              {colPhone && <th className="py-3 px-4">Phone number</th>}
              {colNextMeeting && <th className="py-3 px-4">Next meeting date</th>}
              {colLastMeeting && <th className="py-3 px-4">Last meeting date</th>}
              {colCompany && <th className="py-3 px-4">Company</th>}
              {colCreatedOn && <th className="py-3 px-4">Created on</th>}

              {/* Job Custom Column */}
              {jobColAdded && (
                <th className="py-3 px-4 relative">
                  <div className="flex items-center justify-between">
                    <span>Job</span>
                    <button
                      type="button"
                      data-tl="me-job-col-dots"
                      onClick={() => tl.setVar("meJobColumnMenuOpen", !jobColMenuOpen)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01" />
                      </svg>
                    </button>
                  </div>

                  {jobColMenuOpen && (
                    <div
                      data-tl="me-job-col-menu"
                      className="absolute right-2 top-9 z-40 w-44 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl text-xs normal-case tracking-normal"
                    >
                      <button
                        type="button"
                        data-tl="me-job-menu-sort-asc"
                        onClick={() => tl.setVar("meJobColumnMenuOpen", false)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                      >
                        <span>&uarr;</span>
                        <span>Sort ascending</span>
                      </button>
                      <button
                        type="button"
                        data-tl="me-job-menu-sort-desc"
                        onClick={() => tl.setVar("meJobColumnMenuOpen", false)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                      >
                        <span>&darr;</span>
                        <span>Sort descending</span>
                      </button>
                      <button
                        type="button"
                        data-tl="me-job-menu-hide"
                        onClick={() => {
                          tl.setVar("meJobColumnAdded", false);
                          tl.setVar("meJobColumnMenuOpen", false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                        <span>Hide column</span>
                      </button>
                      <button
                        type="button"
                        data-tl="me-job-menu-delete"
                        onClick={() => {
                          tl.setVar("meJobColumnMenuOpen", false);
                          tl.setVar("meDeleteColumnModalOpen", true);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 font-medium"
                      >
                        <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete field</span>
                      </button>
                    </div>
                  )}
                </th>
              )}

              {/* Add column header button */}
              <th className="py-3 px-3 w-10 text-center">
                <button
                  type="button"
                  data-tl="me-contacts-add-column-header-btn"
                  onClick={() => tl.setVar("meCustomFieldDrawerOpen", true)}
                  className="flex h-5 w-5 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 mx-auto"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {currentList.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-500">
                  <div data-tl="me-contacts-empty" className="space-y-1">
                    <p className="font-medium text-gray-600">
                      No contacts yet. Add one manually or upload a CSV.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentList.map((contact, idx) => {
                const color = avatarColors[idx % avatarColors.length];
                const initial = contact.avatarInitial || contact.name.slice(0, 1).toUpperCase();
                return (
                  <tr key={contact.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${color}`}
                        >
                          {initial}
                        </span>
                        <span className="font-semibold text-gray-900">{contact.name}</span>
                      </div>
                    </td>
                    {colFirstName && <td className="py-3 px-4 text-gray-700">{contact.firstName}</td>}
                    {colLastName && <td className="py-3 px-4 text-gray-700">{contact.lastName}</td>}
                    {colEmail && <td className="py-3 px-4 text-gray-700">{contact.email}</td>}
                    {colPhone && (
                      <td className="py-3 px-4 text-gray-700">{contact.phone || "—"}</td>
                    )}
                    {colNextMeeting && (
                      <td className="py-3 px-4 text-gray-700">{contact.nextMeetingDate || "—"}</td>
                    )}
                    {colLastMeeting && (
                      <td className="py-3 px-4 text-gray-700">{contact.lastMeetingDate || "—"}</td>
                    )}
                    {colCompany && (
                      <td className="py-3 px-4 text-gray-700">{contact.company || "—"}</td>
                    )}
                    {colCreatedOn && <td className="py-3 px-4 text-gray-500">10/11/2026</td>}

                    {jobColAdded && (
                      <td className="py-3 px-4 text-gray-700">
                        {contact.customJob || contact.jobTitle || "—"}
                      </td>
                    )}

                    <td className="py-3 px-3" />
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
        <div className="flex items-center gap-2">
          <span>Items per page</span>
          <div className="rounded border border-gray-200 bg-white px-2 py-1 flex items-center gap-1.5 shadow-2xs">
            <span>25</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div>
          {currentList.length === 0 ? (
            <span>No contacts</span>
          ) : (
            <span>Showing 1 - {currentList.length} of {currentList.length}</span>
          )}
        </div>
      </div>
    </div>
  );
}
