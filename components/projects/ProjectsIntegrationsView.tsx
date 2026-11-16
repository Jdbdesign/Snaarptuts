"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ExternalLink,
  Plus,
  Search,
  Check,
  Copy,
  MessageSquare,
  GitBranch,
  Palette,
  BookOpen,
  HardDrive,
  CheckSquare,
  Zap,
  Calendar,
  BarChart,
  Gamepad2,
  Radio,
} from "lucide-react";
import {
  type IntegrationApp,
  type ApiKeyItem,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

function renderAppIcon(iconType: string) {
  switch (iconType) {
    case "slack":
      return <MessageSquare className="w-4 h-4 text-purple-600" />;
    case "github":
      return <GitBranch className="w-4 h-4 text-gray-800" />;
    case "figma":
      return <Palette className="w-4 h-4 text-pink-600" />;
    case "notion":
      return <BookOpen className="w-4 h-4 text-gray-700" />;
    case "gdrive":
      return <HardDrive className="w-4 h-4 text-amber-500" />;
    case "jira":
      return <CheckSquare className="w-4 h-4 text-blue-600" />;
    case "zapier":
      return <Zap className="w-4 h-4 text-orange-500" />;
    case "gcal":
      return <Calendar className="w-4 h-4 text-blue-500" />;
    case "datadog":
      return <BarChart className="w-4 h-4 text-purple-500" />;
    case "discord":
      return <Gamepad2 className="w-4 h-4 text-indigo-500" />;
    default:
      return <Radio className="w-4 h-4 text-gray-500" />;
  }
}

export function ProjectsIntegrationsView({ tl }: Props) {
  const apps = useTimelineVar<IntegrationApp[]>(tl, "integrationAppsList", []);
  const apiKeys = useTimelineVar<ApiKeyItem[]>(tl, "apiKeysList", []);
  const activeCategory = useTimelineVar<string>(tl, "appsActiveCategory", "All");
  const searchQuery = useTimelineVar<string>(tl, "appsSearchQuery", "");

  const categories = [
    "All",
    "Communication",
    "Development",
    "Productivity",
    "Design",
    "Analytics",
    "Storage",
  ];

  const connectedCount = apps.filter((a) => a.connected).length;

  const filteredApps = apps.filter((app) => {
    const matchesCat =
      activeCategory === "All" || app.category === activeCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCat && matchesSearch;
  });

  const handleToggleConnect = (app: IntegrationApp) => {
    const willConnect = !app.connected;
    tl.setVar(
      "integrationAppsList",
      apps.map((a) =>
        a.id === app.id
          ? {
              ...a,
              connected: willConnect,
              lastSynced: willConnect ? "11/16/2026, 5:14:42 PM" : undefined,
            }
          : a
      )
    );
    pushProjectsToast(
      tl,
      willConnect ? `${app.name} connected` : `${app.name} disconnected`,
      willConnect ? "success" : "info"
    );
  };

  const handleCopyKey = () => {
    pushProjectsToast(tl, "Copied", "success");
  };

  const handleOpenApiKeyModal = () => {
    tl.setVar("newApiKeyName", "");
    tl.setVar("isApiKeyModalOpen", true);
  };

  return (
    <div
      data-tl="projects-integrations-view"
      className="space-y-6 max-w-7xl mx-auto font-sans select-none pb-12"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1
          data-tl="integrations-page-title"
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          Integrations
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="integrations-api-docs-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            <span>API Docs</span>
          </button>
          <button
            type="button"
            data-tl="integrations-new-api-key-btn"
            onClick={handleOpenApiKeyModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New API Key</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Connected Apps */}
        <div
          data-tl="stat-connected-apps"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs"
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            CONNECTED APPS
          </span>
          <span className="text-2xl font-bold text-gray-900 mt-1 block">
            {connectedCount}
          </span>
        </div>

        {/* API Keys */}
        <div
          data-tl="stat-api-keys"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs"
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            API KEYS
          </span>
          <span className="text-2xl font-bold text-gray-900 mt-1 block">
            {apiKeys.length}
          </span>
        </div>

        {/* Active Webhooks */}
        <div
          data-tl="stat-active-webhooks"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs"
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            ACTIVE WEBHOOKS
          </span>
          <span className="text-2xl font-bold text-gray-900 mt-1 block">
            0
          </span>
        </div>

        {/* Sync Errors */}
        <div
          data-tl="stat-sync-errors"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs"
        >
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            SYNC ERRORS
          </span>
          <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 mt-1">
            <Check className="w-5 h-5 text-emerald-500 stroke-[3]" />
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: App Catalogue (left) + API Keys (right) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: App Catalogue */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2
                data-tl="catalogue-title"
                className="text-base font-bold text-gray-900"
              >
                App Catalogue
              </h2>
              <p className="text-xs text-gray-500">
                Connect your tools to supercharge your workflow
              </p>
            </div>

            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="apps-search-input"
                value={searchQuery}
                onChange={(e) => tl.setVar("appsSearchQuery", e.target.value)}
                placeholder="Search apps..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] placeholder-gray-400 text-gray-800 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            data-tl="app-category-filters"
            className="flex items-center gap-1.5 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-tl={`app-category-${cat.toLowerCase()}`}
                onClick={() => tl.setVar("appsActiveCategory", cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[#7014D9] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* App Cards Grid (3 columns) */}
          <div
            data-tl="apps-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredApps.map((app) => (
              <div
                key={app.id}
                data-tl={`app-card-${app.id}`}
                className="bg-white border border-gray-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow min-h-[170px]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                      {renderAppIcon(app.iconType)}
                    </div>
                    <span
                      data-tl={`app-badge-${app.id}`}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        app.connected
                          ? "bg-emerald-50 text-emerald-600 font-bold"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {app.connected ? "Connected" : "Available"}
                    </span>
                  </div>

                  <div>
                    <h3
                      data-tl={`app-name-${app.id}`}
                      className="font-bold text-sm text-gray-900"
                    >
                      {app.name}
                    </h3>
                    <p className="text-[11px] text-gray-400">{app.category}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                  {app.connected && app.lastSynced ? (
                    <span className="text-[10px] text-gray-400">
                      Synced {app.lastSynced}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    data-tl={`app-connect-btn-${app.id}`}
                    onClick={() => handleToggleConnect(app)}
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-colors ${
                      app.connected
                        ? "border border-gray-200 text-gray-800 hover:bg-gray-50"
                        : "bg-[#7014D9] hover:bg-[#5B0FB3] text-white shadow-2xs"
                    }`}
                  >
                    {app.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: API Keys panel */}
        <div
          data-tl="api-keys-sidebar-panel"
          className="w-full lg:w-72 shrink-0 space-y-4"
        >
          <div>
            <h2 className="text-base font-bold text-gray-900">API Keys</h2>
            <p className="text-xs text-gray-500">Manage programmatic access</p>
          </div>

          {apiKeys.length === 0 ? (
            <div
              data-tl="no-api-keys-state"
              className="bg-white border border-gray-200/90 rounded-2xl p-6 text-center text-xs text-gray-400 italic shadow-2xs"
            >
              No API keys yet
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  data-tl={`api-key-card-${key.id}`}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      data-tl={`api-key-name-${key.id}`}
                      className="font-bold text-xs text-gray-900"
                    >
                      {key.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {key.createdAt}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 font-mono text-[11px] text-gray-700">
                    <span data-tl={`api-key-masked-${key.id}`}>
                      {key.keyMasked}
                    </span>
                    <button
                      type="button"
                      data-tl={`api-key-copy-btn-${key.id}`}
                      onClick={handleCopyKey}
                      className="text-gray-400 hover:text-gray-700 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
