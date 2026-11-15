"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Building2,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Globe2,
  Users2,
  HeartPulse,
  TrendingUp,
  Loader2,
  X,
} from "lucide-react";
import { ZEUS_COMPANIES, type ZeusCompany } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusCompaniesView({ tl }: Props) {
  const searching = useTimelineVar<boolean>(tl, "zeusCompaniesSearching", false);
  const searchResults = useTimelineVar<boolean>(tl, "zeusCompaniesResults", false);
  const filterTags = useTimelineVar<string[]>(tl, "zeusCompaniesFilterTags", []);
  const industryInput = useTimelineVar<string>(tl, "zeusCompaniesIndustryInput", "");
  const hideFilters = useTimelineVar<boolean>(tl, "zeusHideFilters", false);

  const [openSections, setOpenSections] = useState({
    name: true,
    industry: true,
    location: false,
    employees: true,
    revenue: true,
    founded: false,
  });

  const toggleSection = (sec: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleSelectCompany = (company: ZeusCompany) => {
    tl.setVar("zeusSelectedCompany", company);
    tl.setVar("zeusCompanyDrawerOpen", true);
  };

  const handleQuickStart = () => {
    tl.setVar("zeusCompaniesSearching", true);
    tl.setVar("zeusCompaniesFilterTags", ["SaaS", "Technology"]);
    setTimeout(() => {
      tl.setVar("zeusCompaniesSearching", false);
      tl.setVar("zeusCompaniesResults", true);
    }, 800);
  };

  const activeFiltersCount = filterTags.length + (industryInput ? 1 : 0);

  return (
    <div data-tl="zeus-companies-view" className="flex h-full w-full overflow-hidden bg-[#F6F6F8]">
      {/* 1. Left Filters Panel */}
      {!hideFilters && (
        <aside
          data-tl="zeus-companies-filters-panel"
          className="w-[280px] shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between h-full select-none z-10"
        >
          {/* Filters Header */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900">Filters</span>
              {activeFiltersCount > 0 && (
                <span
                  data-tl="companies-filters-count-badge"
                  className="bg-[#F5EEFF] text-[#7014D9] text-[11px] font-bold px-2 py-0.5 rounded-full"
                >
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              type="button"
              data-tl="btn-clear-company-filters"
              onClick={() => {
                tl.setVar("zeusCompaniesFilterTags", []);
                tl.setVar("zeusCompaniesIndustryInput", "");
              }}
              className="text-xs text-[#7014D9] font-semibold hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Scrollable Filters list */}
          <div data-tl="companies-filters-scroll" className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-xs">
            {/* Group: Company Name */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("name")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Company Name</span>
                {openSections.name ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.name && (
                <div className="mt-2">
                  <input
                    type="text"
                    data-tl="filter-company-name-input"
                    placeholder="Search by name or domain..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                  />
                </div>
              )}
            </div>

            {/* Group: Industry */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("industry")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Industry</span>
                {openSections.industry ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.industry && (
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    data-tl="filter-industry-input"
                    placeholder="Search industries..."
                    value={industryInput}
                    onChange={(e) => tl.setVar("zeusCompaniesIndustryInput", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                  />

                  {/* Active Industry Tags */}
                  {filterTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {filterTags.map((tag) => (
                        <span
                          key={tag}
                          data-tl={tag === "SaaS" ? "tag-saas" : tag === "Technology" ? "tag-technology" : `tag-${tag}`}
                          className="inline-flex items-center gap-1 bg-[#F5EEFF] border border-[#7014D9]/20 text-[#7014D9] text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          {tag}
                          <X
                            className="w-3 h-3 cursor-pointer hover:opacity-75"
                            onClick={() => {
                              tl.setVar(
                                "zeusCompaniesFilterTags",
                                filterTags.filter((t) => t !== tag)
                              );
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Checkboxes list */}
                  <div className="space-y-1.5 pt-1">
                    {["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail"].map((ind) => {
                      const checked = filterTags.includes(ind);
                      return (
                        <label key={ind} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              if (checked) {
                                tl.setVar(
                                  "zeusCompaniesFilterTags",
                                  filterTags.filter((t) => t !== ind)
                                );
                              } else {
                                tl.setVar("zeusCompaniesFilterTags", [...filterTags, ind]);
                              }
                            }}
                            className="rounded text-[#7014D9]"
                          />
                          <span>{ind}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Group: Location */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("location")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Location</span>
                {openSections.location ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.location && (
                <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                  {["United Kingdom", "Switzerland", "Germany", "France", "Netherlands", "Sweden"].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="checkbox" className="rounded text-[#7014D9]" />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Group: # Employees */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("employees")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span># Employees</span>
                {openSections.employees ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.employees && (
                <div className="mt-2 space-y-1.5">
                  {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="checkbox" className="rounded text-[#7014D9]" />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Group: Revenue */}
            <div className="border-b border-gray-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection("revenue")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Revenue</span>
                {openSections.revenue ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.revenue && (
                <div className="mt-2 space-y-1.5">
                  {["£0-£1M", "£1M-£10M", "£10M-£50M", "£50M-£100M", "£100M+"].map((rev) => (
                    <label key={rev} className="flex items-center gap-2 cursor-pointer text-gray-700">
                      <input type="checkbox" className="rounded text-[#7014D9]" />
                      <span>{rev}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Group: Founded Year */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("founded")}
                className="w-full flex items-center justify-between py-1 text-xs font-semibold text-gray-800"
              >
                <span>Founded Year</span>
                {openSections.founded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              {openSections.founded && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="e.g. 2015"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Search Button */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <button
              type="button"
              data-tl="btn-search-companies"
              onClick={() => {
                tl.setVar("zeusCompaniesSearching", true);
                setTimeout(() => {
                  tl.setVar("zeusCompaniesSearching", false);
                  tl.setVar("zeusCompaniesResults", true);
                }, 800);
              }}
              className="w-full bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Search Companies</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Toolbar Header */}
        <div className="h-12 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-hide-company-filters"
              onClick={() => tl.setVar("zeusHideFilters", !hideFilters)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium border border-gray-200 rounded-xl px-2.5 py-1 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{hideFilters ? "Show Filters" : "Hide Filters"}</span>
            </button>

            {searchResults && (
              <span data-tl="companies-total-count" className="text-xs font-bold text-gray-900">
                Total 175,203 results
              </span>
            )}
          </div>

          {/* Database / Web segmented toggle */}
          <div data-tl="companies-database-switch" className="bg-gray-100 p-0.5 rounded-xl flex items-center text-xs">
            <button
              type="button"
              className="px-3 py-1 rounded-lg font-semibold bg-gray-900 text-white shadow-xs"
            >
              Database
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-lg font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Web
            </button>
          </div>
        </div>

        {/* Content Body */}
        {searching ? (
          <div data-tl="companies-searching-spinner" className="flex-1 flex flex-col items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-[#7014D9] animate-spin" />
            <p className="text-xs font-semibold text-gray-600 mt-3">Searching companies...</p>
          </div>
        ) : !searchResults ? (
          /* Empty State Hero + Quick Start Cards */
          <div data-tl="companies-empty-state" className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center shadow-xs">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mt-4 tracking-tight">Discover companies</h1>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              Search millions of company profiles across industries, team sizes, and revenue.
            </p>

            {/* Quick Start Cards */}
            <div className="grid grid-cols-4 gap-4 mt-8 max-w-4xl w-full text-left">
              {/* Card 1: SaaS & Tech */}
              <div
                data-tl="card-companies-saas"
                onClick={handleQuickStart}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900">SaaS & Tech</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Software companies</p>
              </div>

              {/* Card 2: Mid-market */}
              <div
                data-tl="card-companies-midmarket"
                onClick={handleQuickStart}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users2 className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900">Mid-market</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">51-500 employees</p>
              </div>

              {/* Card 3: Healthcare */}
              <div
                data-tl="card-companies-healthcare"
                onClick={handleQuickStart}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900">Healthcare</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Health & biotech</p>
              </div>

              {/* Card 4: Revenue */}
              <div
                data-tl="card-companies-revenue"
                onClick={handleQuickStart}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900">£10M-£100M Revenue</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Growing companies</p>
              </div>
            </div>
          </div>
        ) : (
          /* Results Table */
          <div data-tl="companies-table-container" className="flex-1 flex flex-col h-full overflow-hidden">
            <div data-tl="companies-table-scroll" className="flex-1 overflow-y-auto">
              <table data-tl="companies-results-table" className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold text-gray-500 tracking-wider">
                    <th className="py-2.5 px-4 w-10">
                      <input type="checkbox" className="rounded text-[#7014D9]" />
                    </th>
                    <th className="py-2.5 px-4">COMPANY</th>
                    <th className="py-2.5 px-4">INDUSTRY</th>
                    <th className="py-2.5 px-4">LOCATION</th>
                    <th className="py-2.5 px-4">EMPLOYEES</th>
                    <th className="py-2.5 px-4">REVENUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {ZEUS_COMPANIES.slice(0, 25).map((comp, index) => {
                    const isBrightwave = comp.id === "comp-1";

                    return (
                      <tr
                        key={comp.id}
                        data-tl={isBrightwave ? "company-row-brightwave" : `company-row-${index}`}
                        onClick={() => handleSelectCompany(comp)}
                        className="hover:bg-[#F5EEFF]/40 cursor-pointer transition-colors group"
                      >
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-[#7014D9]" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {comp.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 group-hover:text-[#7014D9] transition-colors block">
                                {comp.name}
                              </span>
                              <span className="text-[11px] text-gray-400 block">{comp.domain}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-blue-600 font-medium hover:underline">
                            {comp.industry}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{comp.location}</td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{comp.employees}</td>
                        <td className="py-3 px-4 text-gray-900 font-semibold">{comp.revenue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pager Footer */}
            <div
              data-tl="companies-pager"
              className="h-12 px-6 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 shrink-0 select-none"
            >
              <span>Showing 1-25 of 175,203 companies</span>
              <div className="flex items-center gap-1">
                <button type="button" className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
                  Previous
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg bg-[#7014D9] text-white font-bold">
                  1
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button type="button" className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700">
                  4
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700">
                  5
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700">
                  6
                </button>
                <span className="px-1 text-gray-400">...</span>
                <button type="button" className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700">
                  7009
                </button>
                <button type="button" className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
