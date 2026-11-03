"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DIRECTORY_USERS } from "./onecardx-data";

type Props = {
  tl: Timeline;
};

export function OneCardXUsersView({ tl }: Props) {
  const modalOpen = useTimelineVar(tl, "ocxUserImageModalOpen", false);
  const activeTab = useTimelineVar<"active" | "suspended">(tl, "ocxUsersTab", "active");
  const searchQuery = useTimelineVar(tl, "field:search-users", "");
  const imageUrl = useTimelineVar(
    tl,
    "field:user-image-url",
    "https://storage.snaarp.com/id-images/alex-morgan-sample.jpg"
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* 1. Header */}
      <div>
        <h1
          data-tl="users-heading"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Users
        </h1>
        <p
          data-tl="users-subtitle"
          className="text-xs text-gray-500 mt-1"
        >
          Manage the ID card image for people in your organization.
        </p>
      </div>

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          data-tl="stat-active-users"
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900 leading-none">17</div>
            <div className="text-xs text-gray-500 mt-1">Active Users</div>
          </div>
        </div>

        <div
          data-tl="stat-suspended-users"
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900 leading-none">28</div>
            <div className="text-xs text-gray-500 mt-1">Suspended Users</div>
          </div>
        </div>

        <div
          data-tl="stat-total-users"
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900 leading-none">45</div>
            <div className="text-xs text-gray-500 mt-1">Total Users</div>
          </div>
        </div>
      </div>

      {/* 3. Users Directory Table */}
      <div
        data-tl="users-directory-container"
        className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-base font-bold text-gray-900">Users Directory</h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="tab-active-users"
              onClick={() => tl.setVar("ocxUsersTab", "active")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === "active"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Active Users <span className="ml-1 text-[11px] font-normal">17</span>
            </button>
            <button
              type="button"
              data-tl="tab-suspended-users"
              onClick={() => tl.setVar("ocxUsersTab", "suspended")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === "suspended"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Suspended Users <span className="ml-1 text-[11px] font-normal">28</span>
            </button>
          </div>
        </div>

        {/* Search bar & Refresh */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth={2} />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} />
            </svg>
            <input
              type="text"
              data-tl="input-search-users"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => tl.setVar("field:search-users", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-9 pr-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:border-[#7014D9] focus:outline-hidden"
            />
          </div>

          <button
            type="button"
            data-tl="btn-refresh-users"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50/70 text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-2.5 px-4 font-semibold">User</th>
                <th className="py-2.5 px-4 font-semibold">Email</th>
                <th className="py-2.5 px-4 font-semibold">Department</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {DIRECTORY_USERS.map((user) => (
                <tr
                  key={user.id}
                  data-tl={`user-row-${user.id}`}
                  className="hover:bg-purple-50/30 transition-colors"
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-[#7014D9]">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{user.email}</td>
                  <td className="py-3 px-4 text-gray-500">{user.dept}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      data-tl={`btn-idcard-image-${user.id}`}
                      onClick={() => tl.setVar("ocxUserImageModalOpen", true)}
                      className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                    >
                      ID Card Image
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Modal: "ID Card Image" (Step 32) */}
      {modalOpen && (
        <div
          data-tl="user-image-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
        >
          <div
            data-tl="user-image-modal"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150 border border-gray-100 space-y-4"
          >
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">ID Card Image</h3>
              <button
                type="button"
                data-tl="btn-close-user-image-modal"
                onClick={() => tl.setVar("ocxUserImageModalOpen", false)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="text-xs font-semibold text-gray-800">Alex Morgan</div>

            {/* Upload Area */}
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-[11px] text-gray-400">
                No ID image
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  data-tl="btn-upload-user-image"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
                >
                  Upload image
                </button>
                <p className="text-[10px] text-gray-400 leading-tight">
                  JPEG, PNG, WebP or GIF. Max 5MB. Uploading replaces the current image.
                </p>
              </div>
            </div>

            {/* Or Paste URL */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-medium text-gray-700">
                Or paste an image URL
              </label>
              <input
                type="text"
                data-tl="input-user-image-url"
                value={imageUrl}
                onChange={(e) => tl.setVar("field:user-image-url", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs text-gray-800 focus:border-[#7014D9] focus:outline-hidden"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                data-tl="btn-cancel-user-image"
                onClick={() => tl.setVar("ocxUserImageModalOpen", false)}
                className="rounded-full border border-gray-300 px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-save-user-image"
                onClick={() => tl.setVar("ocxUserImageModalOpen", false)}
                className="rounded-full bg-[#7014D9] px-6 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-2xs cursor-pointer"
              >
                Save URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
