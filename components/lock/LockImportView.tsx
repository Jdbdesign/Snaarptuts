"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import {
  Upload,
  Globe,
  Shield,
  Key,
  Compass,
} from "lucide-react";
import { LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockImportView({ tl }: Props) {
  const handleSelectSource = (id: string) => {
    if (id === "chrome") {
      tl.setVar("lockView", "chrome-import");
      tl.setUrl(LOCK_URLS.chromeImport);
    }
  };

  return (
    <div
      data-tl="lock-import-container"
      data-lock-scroll="true"
      className="flex-1 overflow-y-auto no-scrollbar p-8 bg-[#F8F9FA]"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1
            data-tl="import-header"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Import Passwords
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Migrate your passwords from another browser or password manager
          </p>
        </div>

        {/* Section label */}
        <div
          data-tl="import-source-sub"
          className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-800"
        >
          <Upload className="w-4 h-4 text-[#7C3AED]" />
          <span>Select source platform</span>
        </div>

        {/* 3x3 Grid */}
        <div
          data-tl="import-sources-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[560px]"
        >
          {/* 1. Google Chrome */}
          <div
            data-tl="card-import-chrome"
            onClick={() => handleSelectSource("chrome")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-[#0284C7]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Google Chrome
            </span>
          </div>

          {/* 2. Brave Browser */}
          <div
            data-tl="card-import-brave"
            onClick={() => handleSelectSource("brave")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FFEDD5] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#EA580C]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Brave Browser
            </span>
          </div>

          {/* 3. Mozilla Firefox */}
          <div
            data-tl="card-import-firefox"
            onClick={() => handleSelectSource("firefox")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FCE7F3] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-[#DB2777]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Mozilla Firefox
            </span>
          </div>

          {/* 4. Safari */}
          <div
            data-tl="card-import-safari"
            onClick={() => handleSelectSource("safari")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#0284C7]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Safari
            </span>
          </div>

          {/* 5. 1Password */}
          <div
            data-tl="card-import-1password"
            onClick={() => handleSelectSource("1password")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
              <Key className="w-4 h-4 text-[#2563EB]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              1Password
            </span>
          </div>

          {/* 6. Bitwarden */}
          <div
            data-tl="card-import-bitwarden"
            onClick={() => handleSelectSource("bitwarden")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E0E7FF] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Bitwarden
            </span>
          </div>

          {/* 7. Dashlane */}
          <div
            data-tl="card-import-dashlane"
            onClick={() => handleSelectSource("dashlane")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] flex items-center justify-center shrink-0">
              <Key className="w-4 h-4 text-[#16A34A]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Dashlane
            </span>
          </div>

          {/* 8. TrueKey */}
          <div
            data-tl="card-import-truekey"
            onClick={() => handleSelectSource("truekey")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#FCE7F3] flex items-center justify-center shrink-0">
              <Key className="w-4 h-4 text-[#BE185D]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              TrueKey
            </span>
          </div>

          {/* 9. Dell Password Manager */}
          <div
            data-tl="card-import-dell"
            onClick={() => handleSelectSource("dell")}
            className="bg-white border border-[#E5E7EB] hover:border-[#7C3AED]/50 hover:shadow-xs rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between h-[85px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#64748B]" />
            </div>
            <span className="text-xs font-semibold text-gray-900 leading-tight">
              Dell Password Manager
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
