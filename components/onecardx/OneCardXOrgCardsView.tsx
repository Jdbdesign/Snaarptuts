"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_ORG_CARDS, type OrgCardItem } from "./onecardx-data";

type Props = {
  tl: Timeline;
  onOpenNewCardModal?: () => void;
  onCloseNewCardModal?: () => void;
  onCreateCardAndOpenEditor?: () => void;
};

export function OneCardXOrgCardsView({
  tl,
  onOpenNewCardModal,
  onCloseNewCardModal,
  onCreateCardAndOpenEditor,
}: Props) {
  const modalOpen = useTimelineVar(tl, "ocxNewCardModalOpen", false);
  const cardLabel = useTimelineVar(tl, "field:card-label", "");
  const hoveredRow = useTimelineVar<string | null>(tl, "ocxHoveredRow", null);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1
            data-tl="org-cards-heading"
            className="text-2xl font-bold tracking-tight text-[#111827]"
          >
            Create organization card
          </h1>
          <p
            data-tl="org-cards-subtitle"
            className="text-xs text-[#6B7280] mt-1 max-w-2xl leading-relaxed"
          >
            Build a business/ID card for Tech team and publish it to everyone.
            Members see it in their own business/ID card view and can make edits.
          </p>
        </div>

        <button
          type="button"
          data-tl="btn-new-org-card"
          onClick={onOpenNewCardModal}
          className="flex items-center gap-2 rounded-xl bg-[#7014D9] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-sm shrink-0 cursor-pointer"
        >
          <Icon name="plus" size={15} />
          <span>New organization card</span>
        </button>
      </div>

      {/* 2. Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          data-tl="stat-total-cards"
          className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-2xs"
        >
          <p className="text-xs text-[#6B7280] font-medium">Total Cards</p>
          <p className="text-xl font-bold text-[#111827] mt-1">3 Cards</p>
        </div>
        <div
          data-tl="stat-published-cards"
          className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-2xs"
        >
          <p className="text-xs text-[#6B7280] font-medium">Published</p>
          <p className="text-xl font-bold text-[#059669] mt-1">2 Published</p>
        </div>
      </div>

      {/* 3. Organization Cards Table */}
      <div
        data-tl="org-cards-table-container"
        className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden"
      >
        <div className="border-b border-[#F3F4F6] px-5 py-3.5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111827]">Organization cards</h2>
          <span className="text-xs text-[#6B7280]">3 total</span>
        </div>

        <div className="divide-y divide-[#F3F4F6]">
          {SAMPLE_ORG_CARDS.map((card: OrgCardItem) => {
            const isHovered = hoveredRow === card.id;
            return (
              <div
                key={card.id}
                data-tl={`org-card-row-${card.id}`}
                onMouseEnter={() => tl.setVar("ocxHoveredRow", card.id)}
                onMouseLeave={() => tl.setVar("ocxHoveredRow", null)}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 transition-colors ${
                  isHovered ? "bg-purple-50/30" : "hover:bg-gray-50/50"
                }`}
              >
                {/* Left Card Info */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-[#7014D9] font-bold text-sm">
                    {card.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#111827]">
                        {card.name}
                      </span>
                      <span
                        data-tl={`status-pill-${card.id}`}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          card.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] mt-0.5">{card.statusText}</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">{card.meta}</p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div
                  data-tl={`row-actions-${card.id}`}
                  className="mt-3 sm:mt-0 flex items-center gap-1.5 self-end sm:self-center"
                >
                  <button
                    type="button"
                    data-tl={`btn-edit-design-${card.id}`}
                    className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50"
                  >
                    Edit design
                  </button>
                  <button
                    type="button"
                    data-tl={`btn-preview-${card.id}`}
                    className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50"
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    data-tl={`btn-limit-audience-${card.id}`}
                    className="rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50"
                  >
                    Limit audience
                  </button>
                  <button
                    type="button"
                    data-tl={`btn-publish-toggle-${card.id}`}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                      card.status === "Draft"
                        ? "bg-[#7014D9] text-white hover:bg-[#5E10B8]"
                        : "border border-[#E5E7EB] bg-white text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    {card.status === "Draft" ? "Publish to everyone" : "Unpublish"}
                  </button>
                  <button
                    type="button"
                    data-tl={`btn-delete-${card.id}`}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Modal: "New organization card" (Step 5 & 6) */}
      {modalOpen && (
        <div
          data-tl="new-card-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
        >
          <div
            data-tl="new-card-modal"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150 border border-gray-100"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-semibold text-[#111827]">
                New organization card
              </h3>
              <button
                type="button"
                data-tl="btn-close-modal-x"
                onClick={onCloseNewCardModal}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Card label (optional)
                </label>
                <input
                  type="text"
                  data-tl="input-card-label"
                  placeholder="Tech team"
                  value={cardLabel}
                  onChange={(e) => tl.setVar("field:card-label", e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-[#111827] focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 focus:outline-hidden"
                />
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Shown to members alongside the card. The card starts as a draft,
                so nobody sees it until you publish it.
              </p>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                data-tl="btn-cancel-modal"
                onClick={onCloseNewCardModal}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-create-card-editor"
                onClick={onCreateCardAndOpenEditor}
                className="rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-xs"
              >
                Create card and open editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
