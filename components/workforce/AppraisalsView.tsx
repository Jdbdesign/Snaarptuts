"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { SAMPLE_APPRAISALS, SAMPLE_EMPLOYEE, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
  onOpenReview?: (id: string) => void;
  onViewResult?: (id: string) => void;
};

export function AppraisalsView({
  tl,
  onBack,
  onOpenReview,
  onViewResult,
}: Props) {
  const activeTab = useTimelineVar<"my-reviews" | "assigned-reviews">(
    tl,
    "wfAppraisalsTab",
    "my-reviews"
  );

  return (
    <div
      data-scroller="appraisals"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-6"
    >
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          data-tl="appraisals-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Heading */}
      <div>
        <h1
          data-tl="appraisals-heading"
          className="text-xl font-bold text-[#111827]"
        >
          My Appraisals
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Complete your appraisals and track assigned reviews
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-medium">
        <button
          type="button"
          data-tl="appraisals-tab-my"
          onClick={() => {
            tl.setVar("wfAppraisalsTab", "my-reviews");
            tl.setUrl(URLS.performance);
          }}
          className={`pb-3 transition-colors ${
            activeTab === "my-reviews"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          My Reviews
        </button>
        <button
          type="button"
          data-tl="appraisals-tab-assigned"
          onClick={() => {
            tl.setVar("wfAppraisalsTab", "assigned-reviews");
            tl.setUrl(URLS.performanceAssigned);
          }}
          className={`pb-3 transition-colors ${
            activeTab === "assigned-reviews"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Assigned Reviews
        </button>
      </div>

      {/* TAB 1: My Reviews */}
      {activeTab === "my-reviews" && (
        <div className="space-y-6">
          {/* 5 Stat cards */}
          <div
            data-tl="appraisals-stat-cards"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            <div
              data-tl="stat-in-progress"
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <span className="text-[11px] font-medium text-[#6B7280]">
                In progress
              </span>
              <div className="mt-1 text-2xl font-bold text-[#7014D9]">1</div>
            </div>

            <div
              data-tl="stat-awaiting-release"
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <span className="text-[11px] font-medium text-[#6B7280]">
                Awaiting release
              </span>
              <div className="mt-1 text-2xl font-bold text-[#7014D9]">0</div>
            </div>

            <div
              data-tl="stat-awaiting-ack"
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <span className="text-[11px] font-medium text-[#6B7280]">
                Awaiting acknowledgement
              </span>
              <div className="mt-1 text-2xl font-bold text-[#7014D9]">2</div>
            </div>

            <div
              data-tl="stat-acknowledged"
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <span className="text-[11px] font-medium text-[#6B7280]">
                Acknowledged
              </span>
              <div className="mt-1 text-2xl font-bold text-[#7014D9]">1</div>
            </div>

            <div
              data-tl="stat-overdue"
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              <span className="text-[11px] font-medium text-[#6B7280]">
                Overdue
              </span>
              <div className="mt-1 text-2xl font-bold text-[#7014D9]">1</div>
            </div>
          </div>

          {/* Filter row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs text-[#6B7280]">
              <span>Review status: All reviews</span>
              <Icon name="chevronDown" size={14} />
            </div>
            <span className="text-xs text-[#6B7280] font-medium">
              4 review(s)
            </span>
          </div>

          {/* Reviews table */}
          <div
            data-tl="appraisals-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">Cycle</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Self Rating</th>
                  <th className="py-3 px-4">Manager Rating</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_APPRAISALS.reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">
                      {rev.cycle}
                    </td>
                    <td className="py-3.5 px-4">
                      {rev.status === "COMPLETED" ? (
                        <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                          COMPLETED
                        </span>
                      ) : (
                        <span className="text-xs text-[#6B7280] font-medium">
                          {rev.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{rev.selfRating}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{rev.managerRating}</td>
                    <td className="py-3.5 px-4 font-medium">{rev.result}</td>
                    <td className="py-3.5 px-4 text-right">
                      {rev.id === "rev-1" && (
                        <button
                          type="button"
                          data-tl="review-action-open-q4"
                          onClick={() => onOpenReview?.("rev-1")}
                          className="rounded-lg border border-[#7014D9] bg-white px-3 py-1 text-xs font-semibold text-[#7014D9] hover:bg-purple-50 transition-colors"
                        >
                          Open review
                        </button>
                      )}
                      {rev.id === "rev-2" && (
                        <button
                          type="button"
                          data-tl="review-action-view-2027"
                          onClick={() => onViewResult?.("rev-2")}
                          className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
                        >
                          View and acknowledge
                        </button>
                      )}
                      {rev.id === "rev-3" && (
                        <button
                          type="button"
                          data-tl="review-action-view-2026"
                          className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
                        >
                          View result
                        </button>
                      )}
                      {rev.id === "rev-4" && (
                        <button
                          type="button"
                          data-tl="review-action-view-q2"
                          className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
                        >
                          View and acknowledge
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Assigned Reviews */}
      {activeTab === "assigned-reviews" && (
        <div
          data-tl="assigned-reviews-card"
          className="rounded-xl border border-[#E5E7EB] bg-white p-12 text-center shadow-sm space-y-2"
        >
          <h2 className="text-base font-bold text-[#111827]">
            Assigned reviews and approvals
          </h2>
          <p className="text-xs text-[#6B7280]">No reviews assigned to you.</p>
        </div>
      )}
    </div>
  );
}

/**
 * Detailed Review Form (Steps 41 & 42)
 */
export function ReviewFormView({
  tl,
  onBack,
}: {
  tl: Timeline;
  onBack?: () => void;
}) {
  const objectivesOpen = useTimelineVar(tl, "wfReviewObjectivesOpen", false);
  const answers = useTimelineVar<Record<number, string>>(
    tl,
    "wfReviewAnswers",
    {}
  );
  const skills = useTimelineVar(tl, "wfReviewSkills", "");
  const comments = useTimelineVar(tl, "wfReviewComments", "");
  const submitting = useTimelineVar(tl, "wfReviewSubmitting", false);
  const activeSelect = useTimelineVar<number | null>(
    tl,
    "wfActiveReviewSelect",
    null
  );

  const answeredCount = Object.keys(answers).length + (skills.trim() ? 1 : 0);

  return (
    <div
      data-scroller="review-form"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-5"
    >
      {/* Top back pill */}
      <div>
        <button
          type="button"
          data-tl="review-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Header card */}
      <div
        data-tl="review-header-card"
        className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
      >
        <div>
          <h1 className="text-lg font-bold text-[#111827]">Q4 cycle</h1>
          <span className="text-xs font-medium text-[#6B7280]">SELF stage</span>
        </div>
        <button
          type="button"
          data-tl="review-back-reviews-pill"
          onClick={onBack}
          className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50"
        >
          Back to reviews
        </button>
      </div>

      {/* Agreed objectives accordion */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-sm">
        <button
          type="button"
          data-tl="review-objectives-toggle"
          onClick={() => tl.setVar("wfReviewObjectivesOpen", !objectivesOpen)}
          className="flex w-full items-center justify-between p-4 text-xs font-bold text-[#111827] hover:bg-gray-50 transition-colors"
        >
          <span>
            {objectivesOpen ? "▼ Agreed objectives" : "▶ Agreed objectives"}
          </span>
          <span className="text-[11px] font-normal text-[#6B7280]">
            Click to {objectivesOpen ? "collapse" : "expand"}
          </span>
        </button>

        {objectivesOpen && (
          <div
            data-tl="review-objectives-content"
            className="border-t border-[#F3F4F6] p-4 bg-gray-50/50 space-y-3"
          >
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 text-xs font-medium text-[#111827]">
              Appraisal for Alex
            </div>
            <button
              type="button"
              data-tl="review-ack-obj-btn"
              className="rounded-lg border border-[#7014D9] bg-white px-3 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-purple-50"
            >
              Acknowledge objectives
            </button>
          </div>
        )}
      </div>

      {/* Stage info line */}
      <div
        data-tl="review-stage-line"
        className="text-xs text-[#6B7280]"
      >
        Current stage: <span className="font-semibold text-[#111827]">SELF</span> · Due 28 Oct 2026 (overdue). Submitted answers are locked.
      </div>

      {/* Info strip */}
      <div
        data-tl="review-info-strip"
        className="flex items-center justify-between rounded-xl border border-[#86EFAC] bg-[#DCFCE7]/60 p-4 text-xs font-semibold text-[#166534]"
      >
        <div>Employee: {SAMPLE_EMPLOYEE.name}</div>
        <div>Goal completion: 0%</div>
        <div>Questions: 17</div>
      </div>

      {/* Counter & preview link */}
      <div className="flex items-center justify-between text-xs">
        <span
          data-tl="review-answers-count"
          className="font-bold text-[#111827]"
        >
          Required answers: {answeredCount}/17
        </span>
        <button
          type="button"
          data-tl="review-preview-score"
          className="text-[#7014D9] font-medium hover:underline"
        >
          Preview score
        </button>
      </div>

      {/* 16 Questions List */}
      <div className="space-y-4">
        {SAMPLE_APPRAISALS.reviewQuestions.map((q, idx) => {
          const qNum = idx + 1;
          const currentAnswer = answers[qNum] || "";
          const isDropdownOpen = activeSelect === qNum;

          return (
            <div
              key={qNum}
              data-tl={`review-q-${qNum}`}
              className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm space-y-2 text-xs"
            >
              <label className="block font-semibold text-[#111827]">
                {qNum}. {q} *
              </label>

              <div className="relative max-w-sm">
                <button
                  type="button"
                  data-tl={`review-select-${qNum}`}
                  onClick={() =>
                    tl.setVar(
                      "wfActiveReviewSelect",
                      isDropdownOpen ? null : qNum
                    )
                  }
                  className={`flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-xs transition-all ${
                    isDropdownOpen
                      ? "border-[#7014D9] ring-2 ring-purple-100"
                      : "border-[#D1D5DB]"
                  } ${currentAnswer ? "text-[#111827] font-medium" : "text-[#9CA3AF]"}`}
                >
                  <span>{currentAnswer || "Select rating"}</span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </button>

                {isDropdownOpen && (
                  <div
                    data-tl={`review-menu-${qNum}`}
                    className="absolute left-0 mt-1 w-full rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-xl z-30 text-xs"
                  >
                    {SAMPLE_APPRAISALS.ratingOptions.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        data-tl={`review-opt-${qNum}-${optIdx + 1}`}
                        onClick={() => {
                          const updated = { ...answers, [qNum]: opt };
                          tl.setVar("wfReviewAnswers", updated);
                          tl.setVar("wfActiveReviewSelect", null);
                        }}
                        className="px-3 py-1.5 cursor-pointer hover:bg-purple-50 text-[#374151] hover:text-[#7014D9]"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Textarea 1: Skills */}
        <div
          data-tl="review-skills-box"
          className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm space-y-2 text-xs"
        >
          <label className="block font-semibold text-[#111827]">
            17. What skills should the employee develop during the next review
            period? *
          </label>
          <textarea
            rows={3}
            data-tl="review-skills-textarea"
            value={skills}
            onChange={(e) => tl.setVar("wfReviewSkills", e.target.value)}
            placeholder="Enter skills..."
            className="w-full rounded-lg border border-[#D1D5DB] bg-white p-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        {/* Textarea 2: Additional comments */}
        <div
          data-tl="review-comments-box"
          className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm space-y-2 text-xs"
        >
          <label className="block font-semibold text-[#111827]">
            Additional comments
          </label>
          <textarea
            rows={3}
            data-tl="review-comments-textarea"
            value={comments}
            onChange={(e) => tl.setVar("wfReviewComments", e.target.value)}
            placeholder="Add comments..."
            className="w-full rounded-lg border border-[#D1D5DB] bg-white p-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            data-tl="review-save-draft"
            className="rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors shadow-sm"
          >
            Save draft
          </button>
          <button
            type="button"
            data-tl="review-submit-btn"
            disabled={submitting}
            onClick={() => {
              tl.setVar("wfReviewSubmitting", true);
              setTimeout(() => {
                tl.setVar("wfReviewSubmitting", false);
                tl.setVar("wfPage", "performance");
                tl.setUrl(URLS.performance);
              }, 1000);
            }}
            className={`rounded-lg px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors ${
              submitting
                ? "bg-[#C4B5FD] text-[#4C1D95]"
                : "bg-[#7014D9] hover:bg-[#5B0FB3]"
            }`}
          >
            {submitting ? "Submitting..." : "Submit review"}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Result & Acknowledgement View (Step 44)
 */
export function ReviewResultView({
  _tl,
  onBack,
}: {
  _tl?: Timeline;
  onBack?: () => void;
}) {
  return (
    <div
      data-scroller="review-result"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-5"
    >
      {/* Top back pill */}
      <div>
        <button
          type="button"
          data-tl="result-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Header card */}
      <div
        data-tl="result-header-card"
        className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
      >
        <div>
          <h1 className="text-lg font-bold text-[#111827]">
            2027 Appraisal cycle
          </h1>
          <span className="text-xs font-medium text-[#6B7280]">
            COMPLETED stage
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="result-appeal-btn"
            className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50"
          >
            Appeal result
          </button>
          <button
            type="button"
            data-tl="result-back-reviews-pill"
            onClick={onBack}
            className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50"
          >
            Back to reviews
          </button>
        </div>
      </div>

      {/* Overall rating strip */}
      <div
        data-tl="result-overall-strip"
        className="rounded-xl border border-[#E5E7EB] bg-gray-100 p-3 text-xs font-semibold text-[#374151]"
      >
        Overall rating: <span className="text-[#111827]">Outstanding</span>
      </div>

      {/* Agreed objectives & PDF */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-[#6B7280]">
          <span className="font-semibold text-[#111827]">▶ Agreed objectives</span>
          <span>Objectives acknowledged 26/10/2026</span>
        </div>
        <button
          type="button"
          data-tl="result-download-pdf"
          className="text-[#7014D9] font-medium hover:underline"
        >
          Download appraisal PDF
        </button>
      </div>

      {/* Acknowledge card */}
      <div
        data-tl="result-ack-card"
        className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-3 text-xs"
      >
        <h2 className="font-bold text-[#111827]">Acknowledge your result</h2>
        <p className="text-[#6B7280]">
          Acknowledgement records that you have read the result. You can add your response below.
        </p>
        <div>
          <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
            Your response (optional)
          </label>
          <textarea
            rows={2}
            readOnly
            className="w-full rounded-lg border border-[#D1D5DB] bg-white p-2.5 outline-none resize-none text-[#111827]"
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" readOnly className="rounded text-[#7014D9]" />
            <span className="text-[#374151]">I have read my appraisal result</span>
          </label>
          <button
            type="button"
            disabled
            className="rounded-lg bg-[#DDD6FE] px-4 py-2 text-xs font-semibold text-[#7014D9] cursor-not-allowed"
          >
            Acknowledge result
          </button>
        </div>
      </div>

      {/* Note line */}
      <div className="text-xs text-[#6B7280]">
        This review is awaiting its assigned reviewer or has been completed. You have no editable stage at present.
      </div>

      {/* Released result card */}
      <div
        data-tl="result-released-card"
        className="rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] p-4 text-xs space-y-1"
      >
        <div className="font-bold text-base text-[#7014D9]">
          Released result: 4.23 / 5
        </div>
        <div className="text-[#6B7280] text-[11px]">
          Released 26/10/2026, 3:29:40 PM
        </div>
      </div>

      {/* Review cards section */}
      <div className="space-y-4">
        {/* SELF review card */}
        <div
          data-tl="result-self-card"
          className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-3 text-xs"
        >
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-2">
            <div className="font-bold text-[#111827]">
              SELF review submitted / {SAMPLE_EMPLOYEE.name}
            </div>
            <span className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]">
              Rating: 2.80
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 divide-y divide-[#F3F4F6]">
            <div className="py-1">
              <span className="text-[#6B7280]">Overall Performance: </span>
              <span className="font-semibold text-[#111827]">3</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Quality of Work: </span>
              <span className="font-semibold text-[#111827]">4</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Teamwork &amp; Collaboration: </span>
              <span className="font-semibold text-[#111827]">4</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Ownership &amp; Accountability: </span>
              <span className="font-semibold text-[#111827]">3</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Communication: </span>
              <span className="font-semibold text-[#111827]">3</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Additional Comments: </span>
              <span className="font-semibold text-[#111827]">&ldquo;Steady progress&rdquo;</span>
            </div>
          </div>
        </div>

        {/* MANAGER review card */}
        <div
          data-tl="result-manager-card"
          className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm space-y-3 text-xs"
        >
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-2">
            <div className="font-bold text-[#111827]">
              MANAGER review submitted / Sam Taylor
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 divide-y divide-[#F3F4F6]">
            <div className="py-1">
              <span className="text-[#6B7280]">Overall Performance: </span>
              <span className="font-semibold text-[#111827]">5</span>
            </div>
            <div className="py-1">
              <span className="text-[#6B7280]">Quality of Work: </span>
              <span className="font-semibold text-[#111827]">4</span>
            </div>
            <div className="col-span-2 py-1">
              <span className="text-[#6B7280]">Additional Comments: </span>
              <span className="font-semibold text-[#111827]">&ldquo;Excellent quarter&rdquo;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
