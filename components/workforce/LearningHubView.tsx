"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { DocumentViewerModal } from "./DocumentViewerModal";
import { SAMPLE_LEARNING, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
};

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function LearningHubView({ tl }: Props) {
  const page = useTimelineVar<string>(tl, "wfPage", "learning");
  const tab = useTimelineVar<"hub" | "record">(tl, "wfLearningTab", "hub");
  const categoryOpen = useTimelineVar(tl, "wfLearningCategoryOpen", false);
  const loading = useTimelineVar(tl, "wfLearningLoading", false);

  // Course & lesson playback state
  const lessonState = useTimelineVar<"ready" | "playing" | "ended">(tl, "wfLessonState", "ready");
  const lessonSeconds = useTimelineVar(tl, "wfLessonSeconds", 0);
  const lessonSpinner = useTimelineVar(tl, "wfLessonSpinner", false);
  const lessonCompleted = useTimelineVar(tl, "wfLessonCompleted", false);
  const courseCompleted = useTimelineVar(tl, "wfCourseCompleted", false);

  // Modals & toasts
  const certModalOpen = useTimelineVar(tl, "wfCertificateViewerOpen", false);
  const certToast = useTimelineVar(tl, "wfCertificateToast", false);

  const isCoursePage = page === "learning-course";

  const handleOpenCategory = () => {
    tl.setVar("wfLearningCategoryOpen", true);
    tl.setUrl(URLS.learningCategory);
  };

  const handleBackFromCategory = () => {
    tl.setVar("wfLearningCategoryOpen", false);
    tl.setUrl(URLS.learning);
  };

  const handleOpenCourse = () => {
    tl.setVar("wfPage", "learning-course");
    tl.setUrl(URLS.learningCourse);
  };

  const handleBackToHub = () => {
    tl.setVar("wfPage", "learning");
    tl.setUrl(categoryOpen ? URLS.learningCategory : URLS.learning);
  };

  const handleDownloadCert = () => {
    tl.setVar("wfCertificateToast", true);
    tl.setVar("wfCertificateViewerOpen", true);
  };

  return (
    <div
      data-scroller="learning"
      className="flex-1 overflow-y-auto no-scrollbar bg-[#F6F6F8] p-8 relative"
    >
      {/* Toast: Certificate Downloaded */}
      {certToast && (
        <div
          data-tl="toast-certificate-downloaded"
          className="absolute top-6 right-8 z-[60] flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111827] text-white text-xs shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Icon name="check" size={12} />
          </div>
          <span className="font-medium">Certificate downloaded</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Back Pill (on Course or Category) */}
        {(isCoursePage || categoryOpen) && (
          <button
            type="button"
            data-tl={isCoursePage ? "course-back" : "cat-back"}
            onClick={isCoursePage ? handleBackToHub : handleBackFromCategory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#4B5563] bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Icon name="chevronLeft" size={14} />
            <span>Back</span>
            {categoryOpen && !isCoursePage && (
              <span className="font-semibold text-[#111827] ml-1">Engineering</span>
            )}
          </button>
        )}

        {/* =========================================================================
            VIEW 1: Course Detail & Lesson Player (Steps 49-52)
           ========================================================================= */}
        {isCoursePage ? (
          <div className="space-y-6">
            {/* Top Progress Card */}
            <div
              data-tl="course-progress-card"
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#111827]">
                    {SAMPLE_LEARNING.courseTitle}
                  </h1>
                  <span className="text-xs text-[#6B7280]">
                    {SAMPLE_LEARNING.docType}
                  </span>
                </div>
              </div>

              {/* Progress status string & bar */}
              <div className="space-y-2">
                <div className="text-xs text-[#4B5563]">
                  {courseCompleted
                    ? "Completed · 100% · 0 minutes tracked"
                    : SAMPLE_LEARNING.overdueText}
                </div>
                <div
                  data-tl="course-progress-bar"
                  className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full transition-all duration-500 ${
                      courseCompleted ? "w-full bg-emerald-500" : "w-0 bg-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* Course Completed Lilac Panel (Step 51 & 52) */}
              {courseCompleted && (
                <div
                  data-tl="course-completed-panel"
                  className="flex items-center justify-between p-4 rounded-xl bg-[#F3E8FF] border border-purple-200 animate-in fade-in duration-300"
                >
                  <div>
                    <div className="text-sm font-bold text-[#7014D9]">Course completed</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">
                      Your certificate is ready to download.
                    </div>
                  </div>

                  <button
                    type="button"
                    data-tl="btn-download-certificate"
                    onClick={handleDownloadCert}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#7014D9] text-xs font-semibold text-[#7014D9] bg-white hover:bg-purple-50 transition-colors shadow-sm cursor-pointer"
                  >
                    <Icon name="download" size={14} />
                    <span>Download certificate</span>
                  </button>
                </div>
              )}
            </div>

            {/* Lesson Module Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
              {/* Lesson Chip */}
              <div>
                <span
                  data-tl="chip-lesson-1"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    lessonCompleted || courseCompleted
                      ? "bg-purple-50 border-purple-300 text-[#7014D9]"
                      : "bg-purple-50/50 border-purple-200 text-[#7014D9]"
                  }`}
                >
                  {(lessonCompleted || courseCompleted) && <Icon name="check" size={13} />}
                  <span>1. Engineering course</span>
                </span>
              </div>

              {/* Lesson Title & Open Tab button */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#111827]">
                  {SAMPLE_LEARNING.courseTitle}
                </h2>
                <button
                  type="button"
                  data-tl="btn-open-tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-[#4B5563] hover:bg-gray-50 transition-colors"
                >
                  <Icon name="link" size={12} />
                  <span>Open in new tab</span>
                </button>
              </div>

              {/* Video Course Lesson Player */}
              <div
                data-tl="lesson-player"
                className="relative w-full aspect-video bg-[#0F172A] rounded-2xl overflow-hidden shadow-xl border border-gray-800 flex flex-col justify-between select-none"
              >
                {/* 1. Loading Spinner (Step 49 initial beat) */}
                {lessonSpinner && (
                  <div
                    data-tl="player-spinner"
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-[#7014D9] animate-spin" />
                    <span className="text-xs text-purple-200 font-medium mt-3">
                      Loading lesson...
                    </span>
                  </div>
                )}

                {/* 2. Title Card / Slides Canvas */}
                <div className="flex-1 relative flex items-center justify-center p-8 text-center">
                  {lessonState === "ready" && !lessonSpinner && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-medium">
                        Engineering course / Lesson 1
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">
                        Snaarp Engineering Standards
                      </h3>
                      <button
                        type="button"
                        data-tl="player-play-btn"
                        onClick={() => {
                          tl.setVar("wfLessonState", "playing");
                        }}
                        className="mt-2 w-16 h-16 rounded-full bg-[#7014D9] hover:bg-[#5B0FB3] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Icon name="play" size={26} className="ml-1" />
                      </button>
                    </div>
                  )}

                  {(lessonState === "playing" || lessonState === "ended") && (
                    <div className="w-full h-full flex flex-col items-center justify-center px-12 animate-in fade-in duration-300">
                      {lessonSeconds < 60 && (
                        <div className="space-y-4 max-w-lg">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                            Module 1 · Foundations
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            Why Engineering Standards Matter
                          </h3>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Consistent guidelines protect production stability, empower peer review,
                            and ensure seamless cross-team velocity across all Snaarp applications.
                          </p>
                        </div>
                      )}

                      {lessonSeconds >= 60 && lessonSeconds < 140 && (
                        <div className="space-y-4 max-w-lg">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                            Module 2 · Review Process
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            Peer Review & Verification Process
                          </h3>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Every pull request undergoes automated pipeline linting, end-to-end tests,
                            and mandatory verification from designated area specialists.
                          </p>
                        </div>
                      )}

                      {lessonSeconds >= 140 && (
                        <div className="space-y-4 max-w-lg">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                            Module 3 · Quality Checklist
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            Production Quality Checklist
                          </h3>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Verify responsive breakpoints, zero console warnings, accessible keyboard
                            navigation, and complete documentation sign-off before shipping.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Player Bottom Controls Bar */}
                <div className="h-12 bg-black/80 backdrop-blur-md px-5 flex items-center gap-4 text-white text-xs border-t border-white/10">
                  <button
                    type="button"
                    data-tl="player-play-control"
                    onClick={() => {
                      if (lessonState === "playing") {
                        tl.setVar("wfLessonState", "ended");
                      } else {
                        tl.setVar("wfLessonState", "playing");
                      }
                    }}
                    className="text-white hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    <Icon
                      name={lessonState === "playing" ? "pause" : "play"}
                      size={18}
                    />
                  </button>

                  <div
                    data-tl="player-time-display"
                    className="font-mono text-[11px] text-gray-300 select-none min-w-[70px]"
                  >
                    {formatClock(lessonSeconds)} / 3:00
                  </div>

                  {/* Seek Bar */}
                  <div
                    data-tl="player-seek-bar"
                    className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  >
                    <div
                      className="h-full bg-[#7014D9] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (lessonSeconds / 180) * 100)}%` }}
                    />
                  </div>

                  <button
                    type="button"
                    data-tl="player-mute"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon name="volumeMute" size={16} />
                  </button>

                  <button
                    type="button"
                    data-tl="player-fullscreen"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon name="edFullscreen" size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons Below Player */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    data-tl="btn-complete-lesson"
                    onClick={() => {
                      tl.setVar("wfLessonCompleted", true);
                    }}
                    className="text-xs font-semibold text-[#7014D9] hover:text-[#5B0FB3] transition-colors cursor-pointer"
                  >
                    Complete lesson
                  </button>
                </div>

                <button
                  type="button"
                  data-tl="btn-complete-course"
                  disabled={lessonSeconds < 180 && !lessonCompleted && !courseCompleted}
                  onClick={() => {
                    tl.setVar("wfCourseCompleted", true);
                    tl.setVar("wfLessonCompleted", true);
                    tl.setVar("wfUnreadCount", 2);
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    lessonSeconds >= 180 || lessonCompleted || courseCompleted
                      ? "bg-[#7014D9] hover:bg-[#5B0FB3] text-white cursor-pointer"
                      : "bg-[#F3E8FF] text-[#7014D9]/60 cursor-not-allowed border border-purple-200"
                  }`}
                >
                  <Icon name="check" size={16} />
                  <span>Complete course and get certificate</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
              VIEW 2: Learning Hub Overview & Record Tabs (Steps 48, 53)
             ========================================================================= */
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Learning Hub</h1>
            </div>

            {/* Tabs Row */}
            <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-semibold">
              <button
                type="button"
                data-tl="tab-learning-hub"
                onClick={() => {
                  tl.setVar("wfLearningTab", "hub");
                  tl.setUrl(URLS.learning);
                }}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                  tab === "hub"
                    ? "border-[#7014D9] text-[#7014D9]"
                    : "border-transparent text-gray-500 hover:text-[#111827]"
                }`}
              >
                Hub
              </button>
              <button
                type="button"
                data-tl="tab-learning-record"
                onClick={() => {
                  tl.setVar("wfLearningTab", "record");
                  tl.setUrl(URLS.learningRecord);
                }}
                className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                  tab === "record"
                    ? "border-[#7014D9] text-[#7014D9]"
                    : "border-transparent text-gray-500 hover:text-[#111827]"
                }`}
              >
                Learning Record
              </button>
            </div>

            {/* TAB: Hub Content */}
            {tab === "hub" && (
              <div className="space-y-8">
                {/* Category Open Header or Overview */}
                {categoryOpen ? (
                  <div className="space-y-4">
                    {loading ? (
                      <div
                        data-tl="learning-loading"
                        className="py-12 text-center text-xs text-[#7014D9] font-medium animate-pulse"
                      >
                        Loading courses...
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <h2 className="text-base font-bold text-[#111827]">Engineering</h2>
                          <div
                            data-tl="pagination-category"
                            className="flex items-center gap-3 text-xs text-gray-400"
                          >
                            <span className="text-gray-300 cursor-not-allowed">Previous</span>
                            <span className="font-semibold text-[#111827]">Page 1</span>
                            <span className="text-gray-300 cursor-not-allowed">Next</span>
                          </div>
                        </div>

                        {/* Course Card in Category */}
                        <div
                          data-tl="course-card-engineering"
                          onClick={handleOpenCourse}
                          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-[#7014D9]/40 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-[#111827]">
                              {SAMPLE_LEARNING.courseTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                              <span>{SAMPLE_LEARNING.category}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Icon name="clock" size={12} />
                                <span>{SAMPLE_LEARNING.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              published
                            </span>
                            <Icon name="chevronRight" size={16} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Section 1: Assigned Courses */}
                    <div data-tl="section-assigned-courses" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-[#111827]">Assigned Courses</h2>
                        <div
                          data-tl="pagination-assigned"
                          className="flex items-center gap-3 text-xs text-gray-400"
                        >
                          <span className="text-gray-300 cursor-not-allowed">Previous</span>
                          <span className="font-semibold text-[#111827]">Page 1</span>
                          <span className="text-gray-300 cursor-not-allowed">Next</span>
                        </div>
                      </div>

                      <div
                        data-tl="course-card-assigned"
                        onClick={handleOpenCourse}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-[#7014D9]/40 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-[#111827]">
                            {SAMPLE_LEARNING.courseTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                            <span>{SAMPLE_LEARNING.category}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Icon name="clock" size={12} />
                              <span>{SAMPLE_LEARNING.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            published
                          </span>
                          <Icon name="chevronRight" size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Categories to Explore */}
                    <div data-tl="section-categories" className="space-y-4">
                      <h2 className="text-base font-bold text-[#111827]">Categories to Explore</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Engineering Tile */}
                        <button
                          type="button"
                          data-tl="cat-tile-engineering"
                          onClick={handleOpenCategory}
                          className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#7014D9]/40 transition-all cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7014D9] flex items-center justify-center">
                              <Icon name="wfBook" size={20} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#111827] group-hover:text-[#7014D9] transition-colors">
                                Engineering
                              </div>
                              <div className="text-xs text-[#6B7280]">1 course</div>
                            </div>
                          </div>
                          <Icon name="chevronRight" size={16} className="text-gray-400" />
                        </button>

                        {/* Health Tile */}
                        <div
                          data-tl="cat-tile-health"
                          className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all text-left"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center">
                              <Icon name="wfBook" size={20} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#111827]">Health</div>
                              <div className="text-xs text-[#6B7280]">0 courses</div>
                            </div>
                          </div>
                          <Icon name="chevronRight" size={16} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB: Learning Record (Step 53) */}
            {tab === "record" && (
              <div className="space-y-6">
                {/* Tracked Learning Hours Card */}
                <div
                  data-tl="card-tracked-hours"
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7014D9] flex items-center justify-center">
                    <Icon name="clock" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280]">Tracked Learning Hours</div>
                    <div className="text-2xl font-bold text-[#111827]">0</div>
                  </div>
                </div>

                {/* Completed Courses Card */}
                <div
                  data-tl="card-completed-courses"
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4"
                >
                  <h3 className="text-sm font-bold text-[#111827]">Completed Courses</h3>

                  <div
                    data-tl="row-completed-course"
                    className="flex items-center justify-between pt-2 border-t border-gray-100"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-[#111827]">
                        {SAMPLE_LEARNING.courseTitle}
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        Engineering • Estimated course duration: {SAMPLE_LEARNING.durationHours} • Completed{" "}
                        {SAMPLE_LEARNING.completedDate}
                      </div>
                    </div>

                    <button
                      type="button"
                      data-tl="btn-record-download-cert"
                      onClick={handleDownloadCert}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-[#374151] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                    >
                      <Icon name="download" size={13} />
                      <span>Download certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <DocumentViewerModal
        isOpen={certModalOpen}
        onClose={() => tl.setVar("wfCertificateViewerOpen", false)}
        type="certificate"
      />
    </div>
  );
}
