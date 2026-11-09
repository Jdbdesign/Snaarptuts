"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  RefreshCw,
  Lock,
  Shield,
  Smartphone,
  Clock,
  ArrowUpRight,
  Monitor,
  Wand2,
  Copy,
  Check,
} from "lucide-react";
import { LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockDashboardView({ tl }: Props) {
  const genMode = useTimelineVar<string>(tl, "lockGenMode", "password");
  const genLength = useTimelineVar<number>(tl, "lockGenLength", 16);
  const genWords = useTimelineVar<number>(tl, "lockGenWords", 4);
  const genSeparator = useTimelineVar<string>(tl, "lockGenSeparator", "-");
  const genUpper = useTimelineVar<boolean>(tl, "lockGenUpper", true);
  const genLower = useTimelineVar<boolean>(tl, "lockGenLower", true);
  const genNumbers = useTimelineVar<boolean>(tl, "lockGenNumbers", true);
  const genSymbols = useTimelineVar<boolean>(tl, "lockGenSymbols", true);
  const genResult = useTimelineVar<string>(tl, "lockGenResult", "");
  const genCopied = useTimelineVar<boolean>(tl, "lockGenCopied", false);

  const handleOpenDevices = () => {
    tl.setVar("lockView", "devices");
    tl.setUrl(LOCK_URLS.devices);
  };

  const handleOpenVaults = () => {
    tl.setVar("lockView", "vaults");
    tl.setUrl(LOCK_URLS.vaults);
  };

  const handleCopy = () => {
    tl.setVar("lockGenCopied", true);
    tl.setVar("lockToast", "Copied to clipboard");
  };

  return (
    <div
      data-tl="lock-dashboard-page"
      data-lock-scroll="true"
      className="flex-1 overflow-y-auto no-scrollbar p-8 select-none"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              data-tl="dash-header-title"
              className="text-2xl font-bold text-gray-900 tracking-tight"
            >
              Dashboard
            </h1>
            <p
              data-tl="dash-header-subtitle"
              className="text-xs text-gray-500 mt-0.5"
            >
              Overview of your password vault security
            </p>
          </div>

          {/* Synced Badge */}
          <div
            data-tl="badge-synced"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin-reverse" />
            <span>Synced</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {/* Card 1: Total Vaults */}
          <div
            data-tl="stat-card-vaults"
            className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between h-[105px] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex items-center text-[11px] font-semibold text-emerald-600 gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+100%</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">1</div>
              <div className="text-[11px] font-medium text-gray-500 mt-1">Total Vaults</div>
            </div>
          </div>

          {/* Card 2: Secured Items */}
          <div
            data-tl="stat-card-items"
            className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between h-[105px] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#64748B] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex items-center text-[11px] font-semibold text-emerald-600 gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+100%</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">2</div>
              <div className="text-[11px] font-medium text-gray-500 mt-1">Secured Items</div>
            </div>
          </div>

          {/* Card 3: Active Devices */}
          <div
            data-tl="stat-card-devices"
            className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between h-[105px] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="flex items-center text-[11px] font-semibold text-emerald-600 gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+100%</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">1</div>
              <div className="text-[11px] font-medium text-gray-500 mt-1">Active Devices</div>
            </div>
          </div>

          {/* Card 4: Last Sync */}
          <div
            data-tl="stat-card-sync"
            className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between h-[105px] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">02:17 PM</div>
              <div className="text-[11px] font-medium text-gray-500 mt-1">Last Sync</div>
            </div>
          </div>
        </div>

        {/* Lower 2-column layout */}
        <div className="grid grid-cols-12 gap-5">
          {/* Left Column: Connected Devices & Recent Vaults */}
          <div className="col-span-5 flex flex-col gap-5">
            {/* Connected Devices */}
            <div
              data-tl="card-connected-devices"
              className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center">
                    <Monitor className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900">Connected Devices</h3>
                </div>
                <button
                  type="button"
                  data-tl="btn-manage-devices"
                  onClick={handleOpenDevices}
                  className="text-xs text-[#7C3AED] hover:underline font-semibold cursor-pointer"
                >
                  Manage &rarr;
                </button>
              </div>

              {/* One Row */}
              <div
                data-tl="row-device-chrome"
                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">Chrome</span>
                    <span className="text-[10px] text-gray-500">Windows &bull; 02:13 PM</span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Recent Vaults */}
            <div
              data-tl="card-recent-vaults"
              className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900">Recent Vaults</h3>
                </div>
                <button
                  type="button"
                  data-tl="link-view-all-vaults"
                  onClick={handleOpenVaults}
                  className="text-xs text-[#7C3AED] hover:underline font-semibold cursor-pointer"
                >
                  View all &rarr;
                </button>
              </div>

              {/* Social Vault Row */}
              <div
                data-tl="row-recent-vault-social"
                className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-100/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#7C3AED]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Social Vault</span>
                </div>
                <span className="text-[10px] font-medium bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full">
                  2 items
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Password Generator */}
          <div
            data-tl="card-password-generator"
            className="col-span-7 bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center">
                  <Wand2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900">Password Generator</h3>
              </div>

              {/* Segmented Toggle */}
              <div className="flex bg-[#F3F4F6] p-1 rounded-lg mb-4 text-xs font-medium">
                <button
                  type="button"
                  data-tl="tab-gen-password"
                  onClick={() => tl.setVar("lockGenMode", "password")}
                  className={`flex-1 py-1.5 rounded-md text-center cursor-pointer transition-all ${
                    genMode === "password"
                      ? "bg-white text-[#7C3AED] font-semibold shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  data-tl="tab-gen-passphrase"
                  onClick={() => tl.setVar("lockGenMode", "passphrase")}
                  className={`flex-1 py-1.5 rounded-md text-center cursor-pointer transition-all ${
                    genMode === "passphrase"
                      ? "bg-white text-[#7C3AED] font-semibold shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Passphrase
                </button>
              </div>

              {/* Mode: Password */}
              {genMode === "password" && (
                <div className="flex flex-col gap-3.5">
                  {/* Length Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">Length</span>
                      <span
                        data-tl="val-gen-length"
                        className="font-bold text-[#7C3AED]"
                      >
                        {genLength}
                      </span>
                    </div>
                    <input
                      type="range"
                      data-tl="slider-gen-length"
                      min={8}
                      max={64}
                      value={genLength}
                      onChange={(e) => tl.setVar("lockGenLength", Number(e.target.value))}
                      className="w-full accent-[#7C3AED] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* 4 Checkbox options */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      data-tl="chk-gen-uppercase"
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={genUpper}
                        onChange={(e) => tl.setVar("lockGenUpper", e.target.checked)}
                        className="rounded accent-[#7C3AED] w-4 h-4 cursor-pointer"
                      />
                      <span>Uppercase (A-Z)</span>
                    </label>

                    <label
                      data-tl="chk-gen-lowercase"
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={genLower}
                        onChange={(e) => tl.setVar("lockGenLower", e.target.checked)}
                        className="rounded accent-[#7C3AED] w-4 h-4 cursor-pointer"
                      />
                      <span>Lowercase (a-z)</span>
                    </label>

                    <label
                      data-tl="chk-gen-numbers"
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={genNumbers}
                        onChange={(e) => tl.setVar("lockGenNumbers", e.target.checked)}
                        className="rounded accent-[#7C3AED] w-4 h-4 cursor-pointer"
                      />
                      <span>Numbers (0-9)</span>
                    </label>

                    <label
                      data-tl="check-gen-symbols"
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={genSymbols}
                        onChange={(e) => tl.setVar("lockGenSymbols", e.target.checked)}
                        className="rounded accent-[#7C3AED] w-4 h-4 cursor-pointer"
                      />
                      <span>Symbols (!@#$)</span>
                    </label>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    data-tl="btn-generate-password"
                    onClick={() => {
                      tl.setVar("lockGenResult", "kP9#mX2$vL8@qR4!");
                      tl.setVar("lockGenCopied", false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer mt-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>

                  {/* Result Box */}
                  {genResult && (
                    <div
                      data-tl="box-gen-result"
                      className="flex items-center justify-between bg-[#F3F4F6] border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-800"
                    >
                      <span className="truncate">{genResult}</span>
                      <button
                        type="button"
                        data-tl="btn-copy-generated"
                        onClick={() => handleCopy()}
                        className="text-gray-500 hover:text-gray-800 p-1 cursor-pointer"
                      >
                        {genCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mode: Passphrase */}
              {genMode === "passphrase" && (
                <div className="flex flex-col gap-3.5">
                  {/* Words Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-600 font-medium">Words</span>
                      <span
                        data-tl="val-gen-words"
                        className="font-bold text-[#7C3AED]"
                      >
                        {genWords}
                      </span>
                    </div>
                    <input
                      type="range"
                      data-tl="slider-gen-words"
                      min={3}
                      max={10}
                      value={genWords}
                      onChange={(e) => tl.setVar("lockGenWords", Number(e.target.value))}
                      className="w-full accent-[#7C3AED] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Separator Input */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Separator</span>
                    <input
                      type="text"
                      data-tl="input-gen-separator"
                      value={genSeparator}
                      onChange={(e) => tl.setVar("lockGenSeparator", e.target.value)}
                      className="w-12 h-7 text-center font-mono border border-gray-300 rounded text-xs bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    data-tl="btn-generate-passphrase"
                    onClick={() => {
                      const sep = genSeparator || "-";
                      tl.setVar("lockGenResult", `best${sep}announce${sep}burger${sep}cancel`);
                      tl.setVar("lockGenCopied", false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer mt-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>

                  {/* Result Box */}
                  {genResult && (
                    <div
                      data-tl="box-gen-passphrase-result"
                      className="flex items-center justify-between bg-[#F3F4F6] border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-800"
                    >
                      <span className="truncate">{genResult}</span>
                      <button
                        type="button"
                        data-tl="btn-copy-gen-result"
                        onClick={() => handleCopy()}
                        className="text-gray-500 hover:text-gray-800 p-1 cursor-pointer"
                      >
                        {genCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
