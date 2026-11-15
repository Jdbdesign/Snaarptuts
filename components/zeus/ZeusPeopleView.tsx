"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Users,
  Code2,
  TrendingUp,
  Globe2,
  Lock,
  Copy,
  Mail,
  Loader2,
} from "lucide-react";
import {
  SAMPLE_CONTACTS,
  CEO_CONTACT_ELENA,
  CEO_CONTACT_RAVI,
  type ZeusContact,
} from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusPeopleView({ tl }: Props) {
  const activeTab = useTimelineVar<"database" | "find-email">(tl, "zeusActiveTab", "database");
  const searching = useTimelineVar<boolean>(tl, "zeusSearching", false);
  const searchResults = useTimelineVar<boolean>(tl, "zeusSearchResults", false);
  const hideFilters = useTimelineVar<boolean>(tl, "zeusHideFilters", false);
  const contactRevealed = useTimelineVar<boolean>(tl, "zeusContactRevealed", false);
  const revealedContacts = useTimelineVar<string[]>(tl, "zeusRevealedContactIds", []);
  const sceneId = useTimelineVar<string>(tl, "__sceneId", "");
  const isStep14 = sceneId.includes("step14") || tl.getVar<boolean>("zeusIsStep14", false);

  // Filters state
  const keyword = useTimelineVar<string>(tl, "zeusFilterKeyword", "");
  const emailStatus = useTimelineVar<string>(tl, "zeusFilterEmailStatus", "any");
  const seniority = useTimelineVar<string[]>(tl, "zeusFilterSeniority", []);
  const listsOpen = useTimelineVar<boolean>(tl, "zeusFilterListsOpen", false);

  // Email finder state
  const finderName = useTimelineVar<string>(tl, "zeusEmailFinderName", "");
  const finderDomain = useTimelineVar<string>(tl, "zeusEmailFinderDomain", "");
  const finderResult = useTimelineVar<string | null>(tl, "zeusEmailFinderResult", null);

  // Saved searches state
  const savedSearches = useTimelineVar<string[]>(tl, "zeusSavedSearches", []);
  const savedSearchesOpen = useTimelineVar<boolean>(tl, "zeusSavedSearchesDropdownOpen", false);

  // Local collapsible filter groups state
  const [openSections, setOpenSections] = useState({
    keyword: true,
    name: false,
    lists: true,
    email: true,
    titles: false,
    company: false,
    seniority: true,
    department: true,
    location: false,
    employees: false,
  });

  const toggleSection = (sec: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleSelectContact = (contact: ZeusContact) => {
    tl.setVar("zeusSelectedContact", contact);
    tl.setVar("zeusDrawerOpen", true);
  };

  const handleQuickStart = () => {
    tl.setVar("zeusSearching", true);
    setTimeout(() => {
      tl.setVar("zeusSearching", false);
      tl.setVar("zeusSearchResults", true);
    }, 800);
  };

  const activeFiltersCount = (keyword ? 1 : 0) + (emailStatus === "has-email" ? 1 : 0) + seniority.length;

  return (
    <div data-tl="zeus-people-view" className="flex h-full w-full overflow-hidden bg-[#F6F6F8]">
      {/* 1. Left Filters Panel (only visible if not hidden) */}
      {!hideFilters && (
        <aside
          data-tl="zeus-filters-panel"
          className="w-[280px] shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between h-full select-none z-10"
        >
          {/* Filters Header */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900">Filters</span>
              {activeFiltersCount > 0 && (
                <span
                  data-tl="filters-count-badge"
                  className="bg-[#F5EEFF] text-[#7014D9] text-[11px] font-bold px-2 py-0.5 rounded-full"
                >
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              type="button"
              data-tl="btn-clear-filters"
              onClick={() => {
                tl.setVar("zeusFilterKeyword", "");
                tl.setVar("zeusFilterEmailStatus", "any");
                tl.setVar("zeusFilterSeniority", []);
              }}
              className="text-xs text-[#7014D9] font-semibold hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Scrollable Filters list */}
          <div data-tl="filters-scroll-area" className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-xs">
            {/* Group: Keyword */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("keyword")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Keyword</span>
                {openSections.keyword ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.keyword && (
                <div className="mt-2 space-y-1">
                  <div className="relative">
                    <input
                      type="text"
                      data-tl="filter-keyword-input"
                      placeholder="Search across all fields..."
                      value={keyword}
                      onChange={(e) => tl.setVar("zeusFilterKeyword", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">Searches name, title, and email</p>
                </div>
              )}
            </div>

            {/* Group: Name */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("name")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Name</span>
                {openSections.name ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.name && (
                <div className="mt-2">
                  <input
                    type="text"
                    data-tl="filter-name-input"
                    placeholder="Search by name..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                  />
                </div>
              )}
            </div>

            {/* Group: Lists */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                data-tl="filter-lists-toggle"
                onClick={() => tl.setVar("zeusFilterListsOpen", !listsOpen)}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Lists</span>
                {listsOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {listsOpen && (
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="checkbox" className="rounded text-[#7014D9] focus:ring-[#7014D9]" />
                    <span>Tech CEO</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="checkbox" className="rounded text-[#7014D9] focus:ring-[#7014D9]" />
                    <span>New Leads</span>
                  </label>
                </div>
              )}
            </div>

            {/* Group: Email Status */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("email")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Email Status</span>
                {openSections.email ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.email && (
                <div className="mt-2 space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="radio"
                      name="email-status"
                      checked={emailStatus === "any"}
                      onChange={() => tl.setVar("zeusFilterEmailStatus", "any")}
                      className="text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>Any</span>
                  </label>
                  <label
                    data-tl="filter-has-email-radio"
                    className="flex items-center gap-2 cursor-pointer text-gray-700"
                    onClick={() => tl.setVar("zeusFilterEmailStatus", "has-email")}
                  >
                    <input
                      type="radio"
                      name="email-status"
                      checked={emailStatus === "has-email"}
                      readOnly
                      className="text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>Has email</span>
                  </label>
                </div>
              )}
            </div>

            {/* Group: Seniority */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("seniority")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <div className="flex items-center gap-1.5">
                  <span>Seniority</span>
                  {seniority.length > 0 && (
                    <span className="text-[10px] text-[#7014D9] font-bold">({seniority.length})</span>
                  )}
                </div>
                {openSections.seniority ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>

              {/* Chips under Seniority if any selected */}
              {seniority.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
                  {seniority.map((s) => (
                    <span
                      key={s}
                      className="bg-[#F5EEFF] text-[#7014D9] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {openSections.seniority && (
                <div className="mt-2 space-y-1.5">
                  <label
                    data-tl="filter-seniority-csuite"
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => {
                      const next = seniority.includes("C-Suite")
                        ? seniority.filter((x) => x !== "C-Suite")
                        : [...seniority, "C-Suite"];
                      tl.setVar("zeusFilterSeniority", next);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seniority.includes("C-Suite")}
                      readOnly
                      className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>C-Suite</span>
                  </label>

                  <label
                    data-tl="filter-seniority-vp"
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => {
                      const next = seniority.includes("VP")
                        ? seniority.filter((x) => x !== "VP")
                        : [...seniority, "VP"];
                      tl.setVar("zeusFilterSeniority", next);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seniority.includes("VP")}
                      readOnly
                      className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>VP</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={seniority.includes("Director")}
                      readOnly
                      className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>Director</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={seniority.includes("Manager")}
                      readOnly
                      className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>Manager</span>
                  </label>
                </div>
              )}
            </div>

            {/* Group: Department */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("department")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Department</span>
                {openSections.department ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.department && (
                <div className="mt-2 space-y-1.5 text-gray-700">
                  <div
                    data-tl="filter-dept-item"
                    className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-xs"
                  >
                    Engineering & Technical
                  </div>
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-xs">
                    Sales & Business Dev
                  </div>
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-xs">
                    Marketing & Growth
                  </div>
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-xs">
                    Finance & Legal
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Search People Button */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <button
              type="button"
              data-tl="btn-search-people"
              onClick={() => {
                tl.setVar("zeusSearching", true);
                setTimeout(() => {
                  tl.setVar("zeusSearching", false);
                  tl.setVar("zeusSearchResults", true);
                }, 800);
              }}
              className="w-full bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-white" />
              <span>Search People</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">
              Enter or ⌘J from anywhere
            </p>
          </div>
        </aside>
      )}

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Toolbar */}
        <div
          data-tl="zeus-toolbar"
          className="h-12 shrink-0 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10"
        >
          {/* Left toolbar tabs & controls */}
          <div className="flex items-center gap-5">
            {searchResults ? (
              <div className="flex items-center gap-4 text-xs">
                <span
                  data-tl="tab-total-results"
                  className="font-bold text-gray-900 border-b-2 border-gray-900 py-3.5"
                >
                  {isStep14
                    ? "Total 203"
                    : seniority.length > 0 || keyword
                    ? "Total 4,218,500"
                    : "Total 89,187,648"}
                </span>
                <span className="text-gray-400 py-3.5 cursor-pointer hover:text-gray-600">Saved 0</span>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-xs">
                <span className="font-semibold text-gray-500 py-3.5">Saved 0</span>
              </div>
            )}

            <button
              type="button"
              data-tl="btn-hide-filters"
              onClick={() => tl.setVar("zeusHideFilters", !hideFilters)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>{hideFilters ? "Show Filters" : "Hide Filters"}</span>
            </button>
          </div>

          {/* Center segmented switch: Database vs Find Email */}
          <div
            data-tl="zeus-mode-switch"
            className="flex items-center bg-gray-100 p-1 rounded-xl"
          >
            <button
              type="button"
              data-tl="tab-switch-database"
              onClick={() => tl.setVar("zeusActiveTab", "database")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "database"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Database
            </button>
            <button
              type="button"
              data-tl="tab-switch-find-email"
              onClick={() => tl.setVar("zeusActiveTab", "find-email")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "find-email"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Find Email
            </button>
          </div>

          {/* Right toolbar actions */}
          <div className="flex items-center gap-2 relative">
            {/* Saved Searches dropdown trigger if searches exist */}
            {savedSearches.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  data-tl="btn-saved-searches"
                  onClick={() => tl.setVar("zeusSavedSearchesDropdownOpen", !savedSearchesOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5EEFF] border border-[#7014D9]/20 text-[#7014D9] text-xs font-bold hover:bg-[#ECE0FC] transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-[#7014D9]" />
                  <span>Saved Searches ({savedSearches.length})</span>
                </button>

                {/* Dropdown Menu */}
                {savedSearchesOpen && (
                  <div
                    data-tl="saved-searches-dropdown"
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40 text-xs"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Your Saved Searches
                    </div>
                    {savedSearches.map((s) => (
                      <button
                        key={s}
                        type="button"
                        data-tl="saved-search-item"
                        onClick={() => {
                          tl.setVar("zeusSavedSearchesDropdownOpen", false);
                          tl.setVar("zeusSearching", true);
                          setTimeout(() => {
                            tl.setVar("zeusSearching", false);
                            tl.setVar("zeusSearchResults", true);
                          }, 800);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-gray-800 font-medium"
                      >
                        <span>{s}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Save search button */}
            <button
              type="button"
              data-tl="btn-save-search"
              onClick={() => tl.setVar("zeusSaveSearchModalOpen", true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-gray-500" />
              <span>Save search</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Find Email View */}
        {activeTab === "find-email" && (
          <div data-tl="find-email-view" className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
              <h2 className="text-base font-bold text-gray-900">Email Finder</h2>
              <p className="text-xs text-gray-500 mt-1">
                Find anyone&apos;s email address. Enter their name and domain.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    data-tl="input-finder-name"
                    placeholder="e.g. John Smith or John Michael Smith"
                    value={finderName}
                    onChange={(e) => tl.setVar("zeusEmailFinderName", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company Domain</label>
                  <input
                    type="text"
                    data-tl="input-finder-domain"
                    placeholder="e.g. google.com"
                    value={finderDomain}
                    onChange={(e) => tl.setVar("zeusEmailFinderDomain", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                  />
                </div>

                <button
                  type="button"
                  data-tl="btn-submit-find-email"
                  onClick={() => {
                    tl.setVar("zeusEmailFinderResult", "jordan.lee@example.com");
                    tl.setVar("zeusCredits", 98);
                  }}
                  disabled={!finderName || !finderDomain}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                    finderName && finderDomain
                      ? "bg-[#7014D9] hover:bg-[#5B0FB3] text-white shadow-xs cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Email</span>
                </button>
              </div>

              {/* Result card if found */}
              {finderResult && (
                <div
                  data-tl="finder-result-card"
                  className="mt-6 border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 flex items-center justify-between animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        data-tl="finder-email-text"
                        className="font-mono text-xs font-bold text-gray-900 block"
                      >
                        {finderResult}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">Verified email address</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-medium">1 credit used</span>
                    <button
                      type="button"
                      data-tl="btn-copy-finder-email"
                      className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Mode 2: Database View */}
        {activeTab === "database" && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {searching ? (
              /* Loading State */
              <div
                data-tl="searching-spinner"
                className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500"
              >
                <Loader2 className="w-8 h-8 animate-spin text-[#7014D9]" />
                <span className="text-xs font-semibold mt-3 text-gray-700">Searching contacts...</span>
              </div>
            ) : !searchResults ? (
              /* Empty State Hero + Quick Start Cards */
              <div
                data-tl="zeus-empty-hero"
                className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F5EEFF] flex items-center justify-center shadow-xs">
                  <Search className="w-7 h-7 text-[#7014D9]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mt-4 tracking-tight">
                  Find your next leads
                </h1>
                <p className="text-xs text-gray-500 mt-1.5 max-w-md">
                  Search millions of verified contacts by name, title, company, location, and more.
                </p>

                {/* 4 Quick Start Cards */}
                <div className="grid grid-cols-4 gap-4 mt-10 max-w-4xl w-full text-left">
                  {/* Card 1: C-Suite */}
                  <div
                    data-tl="card-c-suite"
                    onClick={() => handleQuickStart()}
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900">C-Suite Executives</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">CEOs, CTOs, CFOs</p>
                  </div>

                  {/* Card 2: VP Engineering */}
                  <div
                    data-tl="card-vp-eng"
                    onClick={() => handleQuickStart()}
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900">VP Engineering</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Tech decision makers</p>
                  </div>

                  {/* Card 3: Sales Leaders */}
                  <div
                    data-tl="card-sales"
                    onClick={() => handleQuickStart()}
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900">Sales Leaders</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Directors & Managers</p>
                  </div>

                  {/* Card 4: SaaS & Tech */}
                  <div
                    data-tl="card-saas"
                    onClick={() => handleQuickStart()}
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900">SaaS & Tech</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">Technology companies</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Table */
              <div data-tl="zeus-results-table-container" className="flex-1 flex flex-col h-full overflow-hidden">
                <div data-tl="zeus-table-scroll" className="flex-1 overflow-y-auto">
                  <table data-tl="zeus-results-table" className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold text-gray-500 tracking-wider">
                        <th className="py-2.5 px-4 w-10">
                          <input type="checkbox" className="rounded text-[#7014D9]" />
                        </th>
                        <th className="py-2.5 px-4">NAME</th>
                        <th className="py-2.5 px-4">TITLE</th>
                        <th className="py-2.5 px-4">COMPANY</th>
                        <th className="py-2.5 px-4">EMAIL</th>
                        <th className="py-2.5 px-4">PHONE</th>
                        <th className="py-2.5 px-4">LOCATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {(isStep14
                        ? [CEO_CONTACT_ELENA, CEO_CONTACT_RAVI, ...SAMPLE_CONTACTS.slice(0, 23)]
                        : SAMPLE_CONTACTS.slice(0, 25)
                      ).map((contact, index) => {
                        const isJordan = contact.id === "c-1";
                        const isElena = contact.id === "c-ceo-1";
                        const isRavi = contact.id === "c-ceo-2";
                        const showRevealed =
                          revealedContacts.includes(contact.id) ||
                          (isJordan && contactRevealed);

                        const rowTl = isElena
                          ? "contact-row-elena-marsh"
                          : isRavi
                          ? "contact-row-ravi-menon"
                          : isJordan
                          ? "contact-row-jordan-lee"
                          : `contact-row-${index}`;

                        return (
                          <tr
                            key={contact.id}
                            data-tl={rowTl}
                            onClick={() => handleSelectContact(contact)}
                            className="hover:bg-[#F5EEFF]/40 cursor-pointer transition-colors group"
                          >
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <input type="checkbox" className="rounded text-[#7014D9]" />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 ${contact.avatarBg}`}
                                >
                                  {contact.initials}
                                </div>
                                <span className="font-bold text-gray-900 group-hover:text-[#7014D9] transition-colors">
                                  {contact.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-700">{contact.title}</td>
                            <td className="py-3 px-4">
                              <span className="text-blue-600 font-medium hover:underline">
                                {contact.company}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px]">
                              {showRevealed ? (
                                <span className="text-emerald-700 font-medium">
                                  {contact.revealedEmail}
                                </span>
                              ) : (
                                <span className="text-gray-400 flex items-center gap-1.5">
                                  <Lock className="w-3 h-3 text-gray-300" />
                                  <span>{contact.maskedEmail}</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-400">{contact.phone}</td>
                            <td className="py-3 px-4 text-gray-600">{contact.location}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pager */}
                <div
                  data-tl="zeus-table-pager"
                  className="h-12 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-xs text-gray-600 shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      1-25 of {seniority.length > 0 || keyword ? "4,218,500" : "89,187,648"}
                    </span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                      <span>Show 25</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled
                      className="px-2.5 py-1 text-gray-400 rounded hover:bg-gray-100 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 bg-[#F5EEFF] text-[#7014D9] font-bold rounded"
                    >
                      1
                    </button>
                    <button type="button" className="px-2.5 py-1 text-gray-600 rounded hover:bg-gray-100">
                      2
                    </button>
                    <button type="button" className="px-2.5 py-1 text-gray-600 rounded hover:bg-gray-100">
                      3
                    </button>
                    <span className="px-1 text-gray-400">...</span>
                    <button type="button" className="px-2.5 py-1 text-gray-600 rounded hover:bg-gray-100">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
