"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ShieldCheck,
  Filter,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  INITIAL_AUDIT_LOGS,
  AUDIT_LOG_ACTIONS,
  AUDIT_LOG_ENTITIES,
  type AuditLogAction,
  type AuditLogEntity,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksAuditLogsView({ tl }: Props) {
  const filterAction = useTimelineVar<AuditLogAction>(tl, "booksAuditFilterAction", "All Actions");
  const filterEntity = useTimelineVar<AuditLogEntity>(tl, "booksAuditFilterEntity", "All Entities");
  const isActionMenuOpen = useTimelineVar<boolean>(tl, "booksAuditActionDropdownOpen", false);
  const isEntityMenuOpen = useTimelineVar<boolean>(tl, "booksAuditEntityDropdownOpen", false);
  const isLoading = useTimelineVar<boolean>(tl, "booksAuditLoading", false);
  const page = useTimelineVar<number>(tl, "booksAuditPage", 1);

  // Filter logs
  const filteredLogs = INITIAL_AUDIT_LOGS.filter((log) => {
    if (filterAction !== "All Actions" && log.action !== filterAction) return false;
    if (filterEntity !== "All Entities") {
      const matchKey = filterEntity.toLowerCase().replace(/\s+/g, "");
      const entityStr = log.entity.toLowerCase().replace(/[\s_]+/g, "");
      if (!entityStr.includes(matchKey)) return false;
    }
    return true;
  });

  const pageSize = 20;
  const totalCount = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize);
  const displayStart = totalCount === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(startIndex + pageSize, totalCount);

  const getActionBadge = (action: string) => {
    switch (action) {
      case "DELETE":
        return "bg-red-50 text-red-600 border border-red-100";
      case "CREATE":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "UPDATE":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "LOGIN":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      case "STATUS CHANGE":
        return "bg-purple-50 text-purple-700 border border-purple-100";
      case "DEACTIVATE":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto" data-scroller="true">
      <div className="w-full max-w-7xl mx-auto px-8 py-8">
        {/* Page Title Row */}
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-gray-900" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
        </div>

        {/* Outer White Card */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
          {/* Filters Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-600">Filters:</span>
            </div>

            {/* Action Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-filter-action"
                onClick={() => {
                  tl.setVar("booksAuditActionDropdownOpen", !isActionMenuOpen);
                  tl.setVar("booksAuditEntityDropdownOpen", false);
                }}
                className={`flex items-center justify-between gap-2.5 rounded-xl border bg-white px-3.5 py-1.5 text-sm font-normal text-gray-800 transition-colors cursor-pointer min-w-[130px] ${
                  isActionMenuOpen
                    ? "border-purple-600 ring-2 ring-purple-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{filterAction}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isActionMenuOpen && (
                <div
                  data-tl="menu-filter-actions"
                  className="absolute top-full left-0 mt-1 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-40 animate-in fade-in-50 zoom-in-95 duration-100"
                >
                  {AUDIT_LOG_ACTIONS.map((action) => {
                    const isSelected = filterAction === action;
                    const slug = action === "All Actions" ? "all" : action.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={action}
                        type="button"
                        data-tl={`option-action-${slug}`}
                        onClick={() => {
                          tl.setVar("booksAuditFilterAction", action);
                          tl.setVar("booksAuditActionDropdownOpen", false);
                          tl.setVar("booksAuditPage", 1);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-purple-100/60 font-semibold text-purple-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-700" />}
                          {!isSelected && <span className="w-3.5" />}
                          {action}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Entity Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-filter-entity"
                onClick={() => {
                  tl.setVar("booksAuditEntityDropdownOpen", !isEntityMenuOpen);
                  tl.setVar("booksAuditActionDropdownOpen", false);
                }}
                className={`flex items-center justify-between gap-2.5 rounded-xl border bg-white px-3.5 py-1.5 text-sm font-normal text-gray-800 transition-colors cursor-pointer min-w-[130px] ${
                  isEntityMenuOpen
                    ? "border-purple-600 ring-2 ring-purple-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{filterEntity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isEntityMenuOpen && (
                <div
                  data-tl="menu-filter-entities"
                  className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-40 animate-in fade-in-50 zoom-in-95 duration-100"
                >
                  {AUDIT_LOG_ENTITIES.map((entity) => {
                    const isSelected = filterEntity === entity;
                    const slug = entity === "All Entities" ? "all" : entity.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={entity}
                        type="button"
                        data-tl={`option-entity-${slug}`}
                        onClick={() => {
                          tl.setVar("booksAuditFilterEntity", entity);
                          tl.setVar("booksAuditEntityDropdownOpen", false);
                          tl.setVar("booksAuditPage", 1);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-purple-100/60 font-semibold text-purple-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-700" />}
                          {!isSelected && <span className="w-3.5" />}
                          {entity}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-medium text-gray-400">
                  <th className="pb-3 pl-1 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Entity</th>
                  <th className="pb-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Skeleton loader state matching video
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="border-b border-gray-50/70 py-3.5">
                      <td className="py-3.5 pl-1">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-36" />
                      </td>
                      <td className="py-3.5">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-32" />
                      </td>
                      <td className="py-3.5">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-14" />
                      </td>
                      <td className="py-3.5">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-28" />
                      </td>
                      <td className="py-3.5">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-64" />
                      </td>
                    </tr>
                  ))
                ) : paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-gray-400">
                      No audit logs found matching your filters.
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log) => (
                    <tr
                      key={log.id}
                      data-tl={`row-audit-${log.id}`}
                      className="border-b border-gray-50 text-xs text-gray-700 hover:bg-gray-50/40 transition-colors"
                    >
                      <td className="py-3.5 pl-1 font-mono text-gray-800 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3.5 font-mono text-gray-600 whitespace-nowrap">
                        {log.user}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider ${getActionBadge(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 text-gray-700 whitespace-nowrap">
                        {log.entity}
                      </td>
                      <td className="py-3.5 text-gray-900 font-normal">
                        {log.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination Bar */}
          <div className="flex items-center justify-between pt-5 mt-3 border-t border-gray-100 text-xs text-gray-500">
            <div>
              Showing {displayStart}-{displayEnd} of {totalCount}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-tl="btn-audit-prev"
                disabled={currentPage <= 1}
                onClick={() => tl.setVar("booksAuditPage", Math.max(1, currentPage - 1))}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  currentPage <= 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Previous
              </button>
              <button
                type="button"
                data-tl="btn-audit-next"
                disabled={currentPage >= totalPages}
                onClick={() => tl.setVar("booksAuditPage", currentPage + 1)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  currentPage >= totalPages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
