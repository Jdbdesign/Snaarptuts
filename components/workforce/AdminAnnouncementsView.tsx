"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ADMIN_ANNOUNCEMENTS_INITIAL,
  ADMIN_ANNOUNCEMENT_NEW,
} from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function AdminAnnouncementsView({ tl }: Props) {
  const isCreateModalOpen = useTimelineVar(tl, "wfCreateAnnouncementModalOpen", false);
  const isCreated = useTimelineVar(tl, "wfAnnouncementCreated", false);
  const titleText = useTimelineVar(tl, "wfAnnouncementTitleText", "");
  const contentText = useTimelineVar(tl, "wfAnnouncementContentText", "");
  const isBannerChecked = useTimelineVar(tl, "wfAnnouncementBannerChecked", false);
  const ctaText = useTimelineVar(tl, "wfAnnouncementCtaText", "");

  const announcements = isCreated
    ? [ADMIN_ANNOUNCEMENT_NEW, ...ADMIN_ANNOUNCEMENTS_INITIAL]
    : ADMIN_ANNOUNCEMENTS_INITIAL;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 data-tl="announcements-admin-heading" className="text-xl font-bold text-[#111827]">
            Announcements
          </h2>
          <p data-tl="announcements-admin-sub" className="text-xs text-[#6B7280] mt-0.5">
            Broadcast company-wide or targeted messages
          </p>
        </div>
        <button
          type="button"
          data-tl="btn-new-announcement"
          onClick={() => tl.setVar("wfCreateAnnouncementModalOpen", true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Icon name="plus" size={14} />
          <span>+ New Announcement</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Published At</th>
              <th className="py-3 px-4">Expires At</th>
              <th className="py-3 px-4">Display as Banner</th>
              <th className="py-3 px-4">Target</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
            {announcements.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[#111827]">{a.title}</div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5 max-w-md truncate">
                    {a.content}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#6B7280]">{a.publishedAt}</td>
                <td className="py-3.5 px-4 text-[#6B7280]">{a.expiresAt}</td>
                <td className="py-3.5 px-4">
                  {a.isBanner ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3E8FF] text-[#7014D9]">
                      Active Banner
                    </span>
                  ) : (
                    <span className="text-[#9CA3AF] text-[11px]">No</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-[#4B5563]">{a.target}</td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    type="button"
                    className="p-1 rounded-md text-[#6B7280] hover:text-[#7014D9] hover:bg-gray-100 transition-colors"
                  >
                    <Icon name="pencil" size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-md text-[#6B7280] hover:text-[#EF4444] hover:bg-gray-100 transition-colors"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE ANNOUNCEMENT MODAL (Step 102) */}
      {isCreateModalOpen && (
        <div
          data-tl="modal-create-announcement"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#111827]">
                Create Announcement
              </h3>
              <button
                type="button"
                onClick={() => tl.setVar("wfCreateAnnouncementModalOpen", false)}
                className="text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="input-announcement-title"
                  value={titleText}
                  placeholder="e.g. New day"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] focus:ring-1 focus:ring-[#7014D9]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Message / Content *
                </label>
                <textarea
                  readOnly
                  data-tl="textarea-announcement-content"
                  rows={3}
                  value={contentText}
                  placeholder="e.g. This is a brand new day"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] resize-none"
                />
              </div>

              {/* Display as Banner toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5FF] border border-[#F3E8FF]">
                <div>
                  <span className="font-semibold text-xs text-[#111827] block">Display as Banner</span>
                  <span className="text-[11px] text-[#6B7280]">Show announcement across the top of the application</span>
                </div>
                <button
                  type="button"
                  data-tl="toggle-announcement-banner"
                  onClick={() => tl.setVar("wfAnnouncementBannerChecked", !isBannerChecked)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isBannerChecked ? "bg-[#7014D9]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isBannerChecked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* CTA text */}
              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  CTA Button Text (Optional)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="input-announcement-cta"
                  value={ctaText}
                  placeholder="e.g. NEW DAY"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                    Published At
                  </label>
                  <input
                    type="text"
                    readOnly
                    data-tl="input-announcement-date"
                    value="30/10/2026"
                    className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2 text-[11px] text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      data-tl="checkbox-announcement-email"
                      className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <span>Send email notification</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                data-tl="btn-cancel-announcement"
                onClick={() => tl.setVar("wfCreateAnnouncementModalOpen", false)}
                className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-submit-announcement"
                onClick={() => {
                  tl.setVar("wfAnnouncementCreated", true);
                  tl.setVar("wfAnnouncementBanner", true);
                  tl.setVar("wfNewAnnouncementNotif", true);
                  tl.setVar("wfCreateAnnouncementModalOpen", false);
                }}
                className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8] transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
