"use client";

import { AdminPanelLayout } from "@/components/admin-panel/AdminPanelLayout";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBackToWorkforce?: () => void;
};

export function AdminPanelEmbedView({ tl, onBackToWorkforce }: Props) {
  const handleBack = () => {
    if (onBackToWorkforce) {
      onBackToWorkforce();
    } else {
      tl.setVar("wfPage", "reports");
      tl.setUrl(URLS.reports);
    }
  };

  return (
    <AdminPanelLayout
      tl={tl}
      active="dashboard"
      title="Admin Dashboard"
      avatar="S"
    >
      <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
        {/* Top return banner */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FAF5FF] text-[#7014D9]">
              <Icon name="adminSquare" size={20} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Admin Dashboard
              </h2>
              <p className="text-xs text-[#6B7280]">
                Your organization at a glance
              </p>
            </div>
          </div>
          <button
            type="button"
            data-tl="btn-back-to-workforce"
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Icon name="arrowLeft" size={14} />
            <span>Back to Snaarp Workforce</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            data-tl="card-total-users"
            className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs"
          >
            <div className="flex items-center justify-between text-[#6B7280] mb-2">
              <span className="text-xs font-semibold">Total Users</span>
              <Icon name="users" size={18} className="text-[#7014D9]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">3</div>
            <p className="text-[11px] text-[#059669] mt-1 font-medium">3 active seats assigned</p>
          </div>

          <div
            data-tl="card-active-users"
            className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs"
          >
            <div className="flex items-center justify-between text-[#6B7280] mb-2">
              <span className="text-xs font-semibold">Active Users</span>
              <Icon name="check" size={18} className="text-[#10B981]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">3</div>
            <p className="text-[11px] text-[#059669] mt-1 font-medium">100% activity rate</p>
          </div>

          <div
            data-tl="card-total-admins"
            className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs"
          >
            <div className="flex items-center justify-between text-[#6B7280] mb-2">
              <span className="text-xs font-semibold">Administrators</span>
              <Icon name="shield" size={18} className="text-[#3B82F6]" />
            </div>
            <div className="text-3xl font-bold text-[#111827]">2</div>
            <p className="text-[11px] text-[#4B5563] mt-1 font-medium">Super admin access enabled</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#111827] mb-3">Quick Actions</h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-quick-manage-users"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-50 text-xs font-semibold text-[#374151] transition-colors"
            >
              <Icon name="users" size={14} className="text-[#6B7280]" />
              <span>Manage Users</span>
            </button>
            <button
              type="button"
              data-tl="btn-quick-org"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-50 text-xs font-semibold text-[#374151] transition-colors"
            >
              <Icon name="building" size={14} className="text-[#6B7280]" />
              <span>Organization</span>
            </button>
          </div>
        </div>
      </div>
    </AdminPanelLayout>
  );
}
