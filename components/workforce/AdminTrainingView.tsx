"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ADMIN_TRAINING_DATA } from "./workforce-data";

export type AdminTrainingSubpage = "dashboard" | "courses" | "categories" | "assignments";

type Props = {
  tl: Timeline;
  subpage?: AdminTrainingSubpage;
};

export function AdminTrainingView({ tl, subpage = "dashboard" }: Props) {
  const currentSub = useTimelineVar<AdminTrainingSubpage>(tl, "wfTrainingSub", subpage);

  // Modals and Drawers state
  const isCreateCourseDrawerOpen = useTimelineVar(tl, "wfCreateCourseDrawerOpen", false);
  const isLessonsModalOpen = useTimelineVar(tl, "wfLessonsModalOpen", false);
  const isCreateCatModalOpen = useTimelineVar(tl, "wfCreateCategoryModalOpen", false);
  const isProgressModalOpen = useTimelineVar(tl, "wfViewProgressModalOpen", false);
  const isAssignDrawerOpen = useTimelineVar(tl, "wfAssignCourseDrawerOpen", false);

  // Form field states
  const courseTitle = useTimelineVar(tl, "wfCourseTitleText", "");
  const courseDesc = useTimelineVar(tl, "wfCourseDescText", "");
  const catName = useTimelineVar(tl, "wfCategoryNameText", "");
  const selectedEmployeeAlex = useTimelineVar(tl, "wfAssignSelectedAlex", false);

  const { stats, courses, categories, assignments, sampleProgress } = ADMIN_TRAINING_DATA;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* 1. TRAINING DASHBOARD (Step 109) */}
      {currentSub === "dashboard" && (
        <div className="flex flex-col gap-6">
          <div>
            <h2 data-tl="training-heading-dashboard" className="text-xl font-bold text-[#111827]">
              Training Dashboard
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Learning & development overview across the organization
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              data-tl="card-stat-courses"
              className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D8B4FE] transition-colors"
            >
              <div className="flex items-center justify-between text-[#6B7280] mb-2">
                <span className="text-xs font-semibold">Total Courses</span>
                <Icon name="wfGraduation" size={18} className="text-[#7014D9]" />
              </div>
              <div className="text-2xl font-bold text-[#111827]">{stats.totalCourses}</div>
              <p className="text-[11px] text-[#059669] mt-1 font-medium">3 published library courses</p>
            </div>

            <div
              data-tl="card-stat-learners"
              className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D8B4FE] transition-colors"
            >
              <div className="flex items-center justify-between text-[#6B7280] mb-2">
                <span className="text-xs font-semibold">Active Learners</span>
                <Icon name="users" size={18} className="text-[#3B82F6]" />
              </div>
              <div className="text-2xl font-bold text-[#111827]">{stats.activeLearners}</div>
              <p className="text-[11px] text-[#4B5563] mt-1 font-medium">All active employees enrolled</p>
            </div>

            <div
              data-tl="card-stat-completion"
              className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D8B4FE] transition-colors"
            >
              <div className="flex items-center justify-between text-[#6B7280] mb-2">
                <span className="text-xs font-semibold">Completion Rate</span>
                <Icon name="check" size={18} className="text-[#10B981]" />
              </div>
              <div className="text-2xl font-bold text-[#111827]">{stats.completionRate}</div>
              <p className="text-[11px] text-[#059669] mt-1 font-medium">+12% vs last month</p>
            </div>

            <div
              data-tl="card-stat-overdue"
              className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D8B4FE] transition-colors"
            >
              <div className="flex items-center justify-between text-[#6B7280] mb-2">
                <span className="text-xs font-semibold">Overdue Assignments</span>
                <Icon name="clock" size={18} className="text-[#EF4444]" />
              </div>
              <div className="text-2xl font-bold text-[#111827]">{stats.overdueAssignments}</div>
              <p className="text-[11px] text-[#EF4444] mt-1 font-medium">Requires reminder notification</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. COURSES LIST (Steps 110, 111, 112) */}
      {currentSub === "courses" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 data-tl="training-heading-courses" className="text-xl font-bold text-[#111827]">
                Courses
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Manage organization training library and syllabi
              </p>
            </div>
            <button
              type="button"
              data-tl="btn-create-course"
              onClick={() => tl.setVar("wfCreateCourseDrawerOpen", true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>+ Create Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((c) => (
              <div
                key={c.id}
                data-tl={c.id === "course-eng" ? "course-card-engineering" : undefined}
                className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-xs flex flex-col justify-between hover:border-[#D8B4FE] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3E8FF] text-[#7014D9]">
                      {c.category}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">{c.duration}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#111827]">{c.title}</h3>
                  <p className="text-xs text-[#6B7280] mt-1.5 line-clamp-2">
                    {c.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">{c.lessonsCount} lessons</span>
                  <span className="text-[#059669] font-medium">{c.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CREATE COURSE DRAWER (Step 111) */}
          {isCreateCourseDrawerOpen && (
            <div
              data-tl="drawer-create-course"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-[#E5E7EB] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-5">
                  <h3 className="text-base font-bold text-[#111827]">Create Course</h3>
                  <button
                    type="button"
                    onClick={() => tl.setVar("wfCreateCourseDrawerOpen", false)}
                    className="text-[#9CA3AF] hover:text-[#111827]"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      readOnly
                      data-tl="input-course-title"
                      value={courseTitle}
                      placeholder="e.g. Engineering Fundamentals"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Description *
                    </label>
                    <textarea
                      readOnly
                      data-tl="textarea-course-desc"
                      rows={3}
                      value={courseDesc}
                      placeholder="Core engineering practices and workflow guidelines."
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Category *
                    </label>
                    <div
                      data-tl="select-course-category"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] flex items-center justify-between"
                    >
                      <span>Engineering</span>
                      <Icon name="chevronDown" size={14} className="text-[#9CA3AF]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      readOnly
                      data-tl="input-course-duration"
                      value="45 mins"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      data-tl="btn-manage-lessons"
                      onClick={() => tl.setVar("wfLessonsModalOpen", true)}
                      className="w-full py-2.5 px-4 rounded-lg border border-[#7014D9] text-[#7014D9] hover:bg-[#FAF5FF] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Icon name="docFile" size={14} />
                      <span>Manage Lessons & Assessment</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  data-tl="btn-cancel-create-course"
                  onClick={() => tl.setVar("wfCreateCourseDrawerOpen", false)}
                  className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-save-course"
                  className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8]"
                >
                  Publish Course
                </button>
              </div>
            </div>
          )}

          {/* LESSONS AND ASSESSMENT MODAL (Step 112) */}
          {isLessonsModalOpen && (
            <div
              data-tl="modal-lessons-assessment"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
            >
              <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
                  <h3 className="text-base font-bold text-[#111827]">
                    Manage Course Content
                  </h3>
                  <button
                    type="button"
                    onClick={() => tl.setVar("wfLessonsModalOpen", false)}
                    className="text-[#9CA3AF] hover:text-[#111827]"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#111827]">Syllabus Lessons</h4>
                      <button
                        type="button"
                        data-tl="btn-add-lesson"
                        className="text-[#7014D9] font-semibold text-[11px] hover:underline"
                      >
                        + Add Lesson
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-medium text-[#111827]">1. Introduction to Acme Stack</span>
                        <span className="text-[10px] text-[#6B7280]">10 mins</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-medium text-[#111827]">2. Git & Code Review Practices</span>
                        <span className="text-[10px] text-[#6B7280]">15 mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F3F4F6]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#111827]">Assessment & Quiz</h4>
                      <button
                        type="button"
                        data-tl="btn-add-question"
                        className="text-[#7014D9] font-semibold text-[11px] hover:underline"
                      >
                        + Add Question
                      </button>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#7014D9]">End-of-Course Knowledge Check</p>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">Passing score requirement: 80%</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#7014D9] border border-[#D8B4FE]">
                        4 Questions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    data-tl="btn-close-lessons-modal"
                    onClick={() => tl.setVar("wfLessonsModalOpen", false)}
                    className="px-4 py-2 rounded-lg bg-[#111827] text-white text-xs font-semibold hover:bg-black"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CATEGORIES (Steps 113, 114) */}
      {currentSub === "categories" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 data-tl="training-heading-categories" className="text-xl font-bold text-[#111827]">
                Course Categories
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Organize curriculum and departmental learning tracks
              </p>
            </div>
            <button
              type="button"
              data-tl="btn-create-category"
              onClick={() => tl.setVar("wfCreateCategoryModalOpen", true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>+ Create Category</span>
            </button>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Total Courses</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">{cat.name}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{cat.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F3E8FF] text-[#7014D9]">
                        {cat.coursesCount} course(s)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button type="button" className="p-1 text-[#6B7280] hover:text-[#7014D9]">
                        <Icon name="pencil" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CREATE CATEGORY MODAL (Step 114) */}
          {isCreateCatModalOpen && (
            <div
              data-tl="modal-create-category"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
            >
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
                  <h3 className="text-base font-bold text-[#111827]">Create Category</h3>
                  <button
                    type="button"
                    onClick={() => tl.setVar("wfCreateCategoryModalOpen", false)}
                    className="text-[#9CA3AF] hover:text-[#111827]"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      readOnly
                      data-tl="input-category-name"
                      value={catName}
                      placeholder="e.g. Engineering"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Description
                    </label>
                    <textarea
                      readOnly
                      data-tl="input-category-desc"
                      rows={3}
                      value="Technical skills, architecture standards, and workflow practices"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#4B5563] resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2.5">
                  <button
                    type="button"
                    data-tl="btn-cancel-category"
                    onClick={() => tl.setVar("wfCreateCategoryModalOpen", false)}
                    className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-tl="btn-save-category"
                    onClick={() => tl.setVar("wfCreateCategoryModalOpen", false)}
                    className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8]"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ASSIGNMENTS (Steps 115, 116, 117) */}
      {currentSub === "assignments" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 data-tl="training-heading-assignments" className="text-xl font-bold text-[#111827]">
                Assignments
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Track employee course progress and certification deadlines
              </p>
            </div>
            <button
              type="button"
              data-tl="btn-assign-course"
              onClick={() => tl.setVar("wfAssignCourseDrawerOpen", true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>+ Assign Course</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E5E7EB] shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] font-medium">Status:</span>
              <div
                data-tl="filter-assignment-status"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white font-medium text-[#111827] flex items-center gap-2"
              >
                <span>All Statuses</span>
                <Icon name="chevronDown" size={13} className="text-[#9CA3AF]" />
              </div>
            </div>

            <div className="flex items-center gap-2 ml-3">
              <span className="text-[#6B7280] font-medium">Department:</span>
              <div
                data-tl="filter-assignment-dept"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white font-medium text-[#111827] flex items-center gap-2"
              >
                <span>All Departments</span>
                <Icon name="chevronDown" size={13} className="text-[#9CA3AF]" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {assignments.map((asg) => (
                  <tr key={asg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold">{asg.employee}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{asg.course}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          asg.status === "Completed"
                            ? "bg-[#D1FAE5] text-[#065F46]"
                            : asg.status === "Overdue"
                            ? "bg-[#FEE2E2] text-[#991B1B]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {asg.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{asg.dueDate}</td>
                    <td className="py-3.5 px-4 font-medium">{asg.score}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        data-tl={
                          asg.employee === "Jordan Lee"
                            ? "btn-view-progress-jordan"
                            : "btn-view-progress-alex"
                        }
                        onClick={() => tl.setVar("wfViewProgressModalOpen", true)}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[#7014D9] hover:bg-[#FAF5FF] font-medium transition-colors"
                      >
                        View Progress
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VIEW PROGRESS MODAL (Step 116) */}
          {isProgressModalOpen && (
            <div
              data-tl="modal-view-progress"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
            >
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#7014D9] uppercase tracking-wider">
                      Assignment Progress
                    </span>
                    <h3 className="text-base font-bold text-[#111827]">
                      {sampleProgress.employee}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#065F46]">
                    {sampleProgress.status}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]">
                    <div>
                      <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold block">Course</span>
                      <span className="font-semibold text-[#111827]">{sampleProgress.course}</span>
                    </div>
                    <div>
                      <span className="text-[#9CA3AF] text-[10px] uppercase font-semibold block">Completed On</span>
                      <span className="font-semibold text-[#111827]">{sampleProgress.completionDate}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#111827] mb-2">Modules Checklist</h4>
                    <div className="space-y-2">
                      {sampleProgress.modules.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <span className="font-medium text-[#374151]">{m.title}</span>
                          <span className="text-[#059669] flex items-center gap-1 font-semibold text-[11px]">
                            <Icon name="check" size={13} />
                            Done
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between">
                    <span className="font-semibold text-[#7014D9]">Final Quiz Score</span>
                    <span className="font-bold text-sm text-[#7014D9]">{sampleProgress.score} (Passed)</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    data-tl="btn-close-progress-modal"
                    onClick={() => tl.setVar("wfViewProgressModalOpen", false)}
                    className="px-4 py-2 rounded-lg bg-[#111827] text-white text-xs font-semibold hover:bg-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ASSIGN COURSE DRAWER (Step 117) */}
          {isAssignDrawerOpen && (
            <div
              data-tl="drawer-assign-course"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-[#E5E7EB] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-5">
                  <h3 className="text-base font-bold text-[#111827]">Assign Course</h3>
                  <button
                    type="button"
                    onClick={() => tl.setVar("wfAssignCourseDrawerOpen", false)}
                    className="text-[#9CA3AF] hover:text-[#111827]"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Course *
                    </label>
                    <div
                      data-tl="select-assign-course"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] flex items-center justify-between"
                    >
                      <span>Engineering Fundamentals</span>
                      <Icon name="chevronDown" size={14} className="text-[#9CA3AF]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-[#374151]">
                        Select Employees *
                      </label>
                      <span
                        data-tl="badge-selected-count"
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3E8FF] text-[#7014D9]"
                      >
                        {selectedEmployeeAlex ? "1 employee selected" : "0 selected"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-[#E5E7EB] divide-y divide-[#F3F4F6] p-1 bg-[#F9FAFB]">
                      <div
                        data-tl="checkbox-employee-alex"
                        onClick={() => tl.setVar("wfAssignSelectedAlex", !selectedEmployeeAlex)}
                        className="p-2.5 flex items-center justify-between hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold text-[#111827]">Alex Morgan</p>
                          <p className="text-[10px] text-[#6B7280]">Engineering · EMP-0001</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedEmployeeAlex}
                          readOnly
                          className="rounded text-[#7014D9] focus:ring-[#7014D9]"
                        />
                      </div>
                      <div
                        data-tl="checkbox-employee-jordan"
                        className="p-2.5 flex items-center justify-between hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold text-[#111827]">Jordan Lee</p>
                          <p className="text-[10px] text-[#6B7280]">Engineering · EMP-0002</p>
                        </div>
                        <input type="checkbox" readOnly className="rounded text-[#7014D9]" />
                      </div>
                      <div
                        data-tl="checkbox-employee-casey"
                        className="p-2.5 flex items-center justify-between hover:bg-white rounded-lg transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold text-[#111827]">Casey Brown</p>
                          <p className="text-[10px] text-[#6B7280]">Unassigned · EMP-0003</p>
                        </div>
                        <input type="checkbox" readOnly className="rounded text-[#7014D9]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                      Due Date *
                    </label>
                    <input
                      type="text"
                      readOnly
                      data-tl="input-assign-due-date"
                      value="15/11/2026"
                      className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-[#7014D9]"
                    />
                    <span className="text-[11px] text-[#374151] font-medium">
                      Mandatory completion requirement
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  onClick={() => tl.setVar("wfAssignCourseDrawerOpen", false)}
                  className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-submit-assign-course"
                  className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8]"
                >
                  Assign Course
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
