"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_ORG_CARDS, type OrgCardItem } from "./onecardx-data";
import { OcxCardIcon } from "./OneCardXIcons";

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
            className="text-xs text-[#6B7280] mt-1 max-w-xl leading-relaxed"
          >
            Build a business/ID card for Tech team and publish it to everyone.
            Members see it in their own business/ID card view and can make edits.
          </p>
        </div>

        <button
          type="button"
          data-tl="btn-new-org-card"
          onClick={onOpenNewCardModal}
          className="flex items-center gap-1.5 rounded-full bg-[#7014D9] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-2xs shrink-0 cursor-pointer"
        >
          <span className="text-sm leading-none font-normal">+</span>
          <span>New organization card</span>
        </button>
      </div>

      {/* 2. Stats Strip */}
      <div className="grid grid-cols-2 gap-4">
        <div
          data-tl="stat-total-cards"
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
            <OcxCardIcon width={18} height={18} />
          </div>
          <div>
            <div className="text-xl font-bold text-[#111827] leading-none">3</div>
            <div className="text-xs text-[#6B7280] font-normal mt-1">Cards</div>
          </div>
        </div>

        <div
          data-tl="stat-published-cards"
          className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs flex items-center gap-3.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-[#111827] leading-none">2</div>
            <div className="text-xs text-[#6B7280] font-normal mt-1">Published</div>
          </div>
        </div>
      </div>

      {/* 3. Organization Cards Container */}
      <div
        data-tl="org-cards-table-container"
        className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs"
      >
        <h2 className="text-base font-bold text-[#111827] mb-4">
          Organization cards
        </h2>

        <div className="space-y-3">
          {SAMPLE_ORG_CARDS.map((card: OrgCardItem) => {
            const isHovered = hoveredRow === card.id;
            const isDraft = card.status === "Draft";

            return (
              <div
                key={card.id}
                data-tl={`org-card-row-${card.id}`}
                onMouseEnter={() => tl.setVar("ocxHoveredRow", card.id)}
                onMouseLeave={() => tl.setVar("ocxHoveredRow", null)}
                className={`rounded-xl border border-gray-200 p-4 transition-all bg-white ${
                  isHovered ? "border-purple-300 shadow-2xs" : "hover:border-gray-300"
                }`}
              >
                {/* Top Info Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                      <OcxCardIcon width={16} height={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#111827]">
                        {card.name}
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {card.statusText}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#9CA3AF]">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[9px] font-semibold text-gray-600">
                          ST
                        </span>
                        <span>{card.meta}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Text (Top-Right) */}
                  <span
                    data-tl={`status-pill-${card.id}`}
                    className={`text-xs font-semibold ${
                      isDraft ? "text-[#6B7280]" : "text-[#16A34A]"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                {/* Bottom Actions Row */}
                <div className="mt-3 pt-3 border-t border-gray-100/70 flex items-center justify-between">
                  <div
                    data-tl={`row-actions-${card.id}`}
                    className="flex items-center gap-3"
                  >
                    <button
                      type="button"
                      data-tl={`btn-edit-design-${card.id}`}
                      className="text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
                    >
                      Edit design
                    </button>
                    <button
                      type="button"
                      data-tl={`btn-preview-${card.id}`}
                      className="text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      data-tl={`btn-limit-audience-${card.id}`}
                      className="text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
                    >
                      Limit audience
                    </button>
                    {isDraft ? (
                      <button
                        type="button"
                        data-tl={`btn-publish-toggle-${card.id}`}
                        className="rounded-full bg-[#F5EEFF] text-[#7014D9] px-3.5 py-1 text-xs font-semibold hover:bg-[#EBDDFF] transition-colors cursor-pointer"
                      >
                        Publish to everyone
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-tl={`btn-publish-toggle-${card.id}`}
                        className="text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
                      >
                        Unpublish
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    data-tl={`btn-delete-${card.id}`}
                    className="text-xs font-medium text-[#6B7280] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Delete
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
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-base font-bold text-[#111827]">
                New organization card
              </h3>
              <button
                type="button"
                data-tl="btn-close-modal-x"
                onClick={onCloseNewCardModal}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="py-2 space-y-1.5">
              <label className="block text-xs font-normal text-[#6B7280]">
                Card label (optional)
              </label>
              <input
                type="text"
                data-tl="input-card-label"
                placeholder="Tech team"
                value={cardLabel}
                onChange={(e) => tl.setVar("field:card-label", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
              />
              <p className="text-[11px] text-[#6B7280] leading-relaxed pt-1">
                Shown to members alongside the card. The card starts as a draft,
                so nobody sees it until you publish it.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                data-tl="btn-cancel-modal"
                onClick={onCloseNewCardModal}
                className="rounded-full border border-gray-300 px-5 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-create-card-editor"
                onClick={onCreateCardAndOpenEditor}
                className="rounded-full bg-[#7014D9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-2xs cursor-pointer"
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
