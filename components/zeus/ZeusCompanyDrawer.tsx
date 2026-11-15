"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  ExternalLink,
} from "lucide-react";
import type { ZeusCompany } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusCompanyDrawer({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusCompanyDrawerOpen", false);
  const company = useTimelineVar<ZeusCompany | null>(tl, "zeusSelectedCompany", null);

  if (!isOpen || !company) return null;

  const people = company.people || [
    { name: "Lukas Weber", title: "Managing Director" },
    { name: "Sophie Keller", title: "Head of Engineering" },
    { name: "Marc Steiner", title: "Product Lead" },
  ];

  return (
    <div
      data-tl="zeus-company-drawer-overlay"
      className="fixed inset-0 z-40 flex justify-end bg-black/25 backdrop-blur-[1px] animate-in fade-in duration-200"
      onClick={() => tl.setVar("zeusCompanyDrawerOpen", false)}
    >
      <div
        data-tl="zeus-company-drawer"
        className="w-full max-w-[420px] h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              data-tl="btn-close-company-drawer"
              onClick={() => tl.setVar("zeusCompanyDrawerOpen", false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Company Details Header */}
          <div className="flex flex-col items-center text-center mt-2">
            <div className="w-16 h-16 rounded-2xl bg-[#F5EEFF] text-[#7014D9] font-bold text-2xl flex items-center justify-center shadow-xs">
              {company.name.charAt(0)}
            </div>
            <h2
              data-tl="drawer-company-name"
              className="text-xl font-bold text-gray-900 mt-3 tracking-tight"
            >
              {company.name}
            </h2>
            <p
              data-tl="drawer-company-domain"
              className="text-xs text-gray-500 font-medium mt-0.5"
            >
              {company.domain}
            </p>
          </div>

          {/* 4 Detail Cards in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {/* Card 1: Industry */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Industry
              </span>
              <p className="text-xs font-semibold text-gray-900 truncate" title={company.industry}>
                {company.industry}
              </p>
            </div>

            {/* Card 2: Employees */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Employees
              </span>
              <p className="text-xs font-semibold text-gray-900">
                {company.employees}
              </p>
            </div>

            {/* Card 3: Location */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Location
              </span>
              <p className="text-xs font-semibold text-gray-900 truncate" title={company.location}>
                {company.location}
              </p>
            </div>

            {/* Card 4: Website */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Website
              </span>
              <a
                href={company.website || `https://${company.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 truncate"
              >
                <span className="truncate">{company.domain}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* View on LinkedIn Link */}
          <div className="mt-4">
            <button
              type="button"
              data-tl="btn-drawer-company-linkedin"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>View on LinkedIn</span>
            </button>
          </div>

          {/* Section: People at Company */}
          <div className="mt-8 border-t border-gray-100 pt-5">
            <h3 className="text-xs font-bold text-gray-900 mb-3">
              People at {company.name}
            </h3>

            <div className="space-y-2.5">
              {people.map((person, index) => (
                <div
                  key={index}
                  data-tl={`company-person-${index}`}
                  className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-[#F5EEFF]/40 border border-gray-100 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#7014D9] transition-colors">
                        {person.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">{person.title}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-blue-600 font-medium group-hover:underline">
                    View
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="pt-4 text-center text-[11px] text-gray-400">
          Verified company data powered by Zeus
        </div>
      </div>
    </div>
  );
}
