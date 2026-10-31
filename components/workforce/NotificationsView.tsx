"use client";

import type { Timeline } from "@/lib/timeline";
import { Icon } from "@/components/icons";
import { FULL_NOTIFICATIONS_LIST, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function NotificationsView({ tl }: Props) {
  const handleBack = () => {
    tl.setVar("wfPage", "learning");
    tl.setVar("wfLearningTab", "record");
    tl.setUrl(URLS.learningRecord);
  };

  return (
    <div
      data-scroller="notifications-page"
      className="flex-1 overflow-y-auto no-scrollbar bg-[#F6F6F8] p-8"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back button */}
        <button
          type="button"
          data-tl="notif-back"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4B5563] bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>

        {/* Heading & Action buttons */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#111827]">Notifications</h1>

          <div className="flex items-center gap-3">
            {/* Clear All */}
            <button
              type="button"
              data-tl="btn-clear-all"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#EF4444] hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
            >
              <Icon name="trash" size={14} className="text-[#EF4444]" />
              <span>Clear all</span>
            </button>

            {/* Mark all as read */}
            <button
              type="button"
              data-tl="btn-mark-all-read"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#111827] hover:bg-black transition-colors shadow-sm cursor-pointer"
            >
              <Icon name="check" size={14} />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>

        {/* Scrollable List of Notifications */}
        <div
          data-tl="notifications-list-container"
          className="space-y-3 pb-8"
        >
          {FULL_NOTIFICATIONS_LIST.map((item, idx) => {
            const isTop = idx === 0;
            const isPolicy = item.id === "notif-7";
            const isAttendance = item.id === "notif-10";

            let itemTl = `notif-item-${idx + 1}`;
            if (isPolicy) itemTl = "notif-item-policy";
            if (isAttendance) itemTl = "notif-item-attendance";

            return (
              <div
                key={item.id}
                data-tl={itemTl}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md hover:border-gray-300 transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  {/* Top Link or Tag */}
                  {item.linkText && (
                    <button
                      type="button"
                      data-tl={
                        isTop
                          ? "notif-link-course"
                          : isPolicy
                          ? "notif-link-policy"
                          : `notif-link-${idx}`
                      }
                      className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                    >
                      {item.linkText}
                    </button>
                  )}

                  {item.tag && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-purple-50 text-[#7014D9] border border-purple-200">
                      {item.tag}
                    </span>
                  )}

                  {/* Title & Detail */}
                  <div className="text-xs font-bold text-[#111827]">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#6B7280] leading-relaxed">
                    {item.detail}
                  </div>

                  {/* Timestamp */}
                  <div className="text-[11px] text-[#9CA3AF] pt-0.5">
                    {item.time}
                  </div>
                </div>

                {/* Right Action (Bin Icon) */}
                <button
                  type="button"
                  data-tl={idx === 0 ? "btn-notif-delete" : `btn-notif-delete-${idx}`}
                  title="Delete notification"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Icon name="trash" size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
