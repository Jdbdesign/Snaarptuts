"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

type Props = {
  tl: Timeline;
  onCancel?: () => void;
};

export function CycleCreationFormView({ tl, onCancel }: Props) {
  const overridesOpen = useTimelineVar(tl, "wfCycleOverridesOpen", false);
  const participants = useTimelineVar<"all" | "specific" | "departments">(
    tl,
    "wfCycleParticipants",
    "all"
  );
  const typeSelectOpen = useTimelineVar(tl, "wfCycleTypeSelectOpen", false);
  const cycleType = useTimelineVar(tl, "wfCycleType", "ANNUAL");
  const selfDueOpen = useTimelineVar(tl, "wfCycleSelfDueOpen", false);
  const fallbackSelectOpen = useTimelineVar(tl, "wfCycleFallbackSelectOpen", false);
  const questionsSelectOpen = useTimelineVar(tl, "wfCycleQuestionsSelectOpen", false);
  const workLocationOpen = useTimelineVar(tl, "wfWorkLocationSelectOpen", false);
  const repeatSelectOpen = useTimelineVar(tl, "wfRepeatSelectOpen", false);
  const reviewerSelectOpen = useTimelineVar(tl, "wfAppraisalReviewerSelectOpen", false);

  return (
    <div data-scroller className="flex flex-col gap-6 max-w-4xl mx-auto pb-24">
      {/* Top Bar with Back Pill */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-tl="btn-cycle-back"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <Icon name="arrowLeft" size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Create appraisal cycle</h1>
          <p className="text-xs text-[#6B7280]">Configure schedule, participants and review stages</p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="flex flex-col gap-6">
        {/* Basic Details Card */}
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-[#111827] border-b border-[#F3F4F6] pb-3">
            Cycle details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-cycle-name"
                placeholder="Q1 2026 Review"
                defaultValue="Q1 2026 Review"
                className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-[#374151] mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-cycle-type"
                onClick={() => tl.setVar("wfCycleTypeSelectOpen", !typeSelectOpen)}
                className={`w-full h-9 px-3 rounded-xl border text-xs text-left flex items-center justify-between bg-white ${
                  typeSelectOpen
                    ? "border-[#7014D9] ring-2 ring-purple-100"
                    : "border-[#D1D5DB] text-[#111827]"
                }`}
              >
                <span>{cycleType}</span>
                <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
              </button>

              {typeSelectOpen && (
                <div
                  data-tl="dropdown-cycle-type"
                  className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
                >
                  <div
                    data-tl="cycle-type-annual"
                    onClick={() => {
                      tl.setVar("wfCycleType", "ANNUAL");
                      tl.setVar("wfCycleTypeSelectOpen", false);
                    }}
                    className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    ANNUAL
                  </div>
                  <div
                    data-tl="cycle-type-probation"
                    onClick={() => {
                      tl.setVar("wfCycleType", "PROBATION");
                      tl.setVar("wfCycleTypeSelectOpen", false);
                    }}
                    className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    PROBATION
                  </div>
                  <div
                    data-tl="cycle-type-quarterly"
                    onClick={() => {
                      tl.setVar("wfCycleType", "QUARTERLY");
                      tl.setVar("wfCycleTypeSelectOpen", false);
                    }}
                    className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    QUARTERLY
                  </div>
                  <div
                    data-tl="cycle-type-half-yearly"
                    onClick={() => {
                      tl.setVar("wfCycleType", "HALF-YEARLY");
                      tl.setVar("wfCycleTypeSelectOpen", false);
                    }}
                    className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                  >
                    HALF-YEARLY
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-start-date"
                  placeholder="dd/mm/yyyy"
                  defaultValue="24/10/2026"
                  className="w-full h-9 pl-3 pr-9 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:border-[#7014D9] focus:outline-none"
                />
                <Icon
                  name="shCalendar"
                  size={15}
                  className="absolute right-3 top-2.5 text-[#9CA3AF] pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#374151] mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  data-tl="input-end-date"
                  placeholder="dd/mm/yyyy"
                  defaultValue="28/10/2026"
                  className="w-full h-9 pl-3 pr-9 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:border-[#7014D9] focus:outline-none"
                />
                <Icon
                  name="shCalendar"
                  size={15}
                  className="absolute right-3 top-2.5 text-[#9CA3AF] pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#374151] mb-2">
              Participants <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6 text-xs text-[#374151]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="participants"
                  data-tl="radio-all-employees"
                  checked={participants === "all"}
                  onChange={() => tl.setVar("wfCycleParticipants", "all")}
                  className="text-[#7014D9] focus:ring-[#7014D9]"
                />
                <span>All employees</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="participants"
                  data-tl="radio-specific-individuals"
                  checked={participants === "specific"}
                  onChange={() => tl.setVar("wfCycleParticipants", "specific")}
                  className="text-[#7014D9] focus:ring-[#7014D9]"
                />
                <span>Specific individuals</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="participants"
                  data-tl="radio-departments"
                  checked={participants === "departments"}
                  onChange={() => tl.setVar("wfCycleParticipants", "departments")}
                  className="text-[#7014D9] focus:ring-[#7014D9]"
                />
                <span>Departments</span>
              </label>
            </div>

            {/* Specific individuals subpanel */}
            {participants === "specific" && (
              <div className="mt-3 p-3.5 rounded-xl border border-[#E5E7EB] bg-gray-50 flex flex-col gap-2.5">
                <input
                  type="text"
                  data-tl="input-search-employees"
                  placeholder="Search employees..."
                  className="w-full h-8 px-3 rounded-lg border border-[#D1D5DB] text-xs bg-white"
                />
                <div className="flex items-center gap-4 text-[11px]">
                  <button type="button" data-tl="link-select-matching" className="text-[#7014D9] hover:underline font-medium">
                    Select matching employees
                  </button>
                  <button type="button" data-tl="link-clear-selection" className="text-[#6B7280] hover:underline font-medium">
                    Clear selection
                  </button>
                </div>
                <div className="flex flex-col gap-2 pt-1 border-t border-[#E5E7EB]">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" data-tl="checkbox-emp-alex" defaultChecked className="text-[#7014D9] rounded" />
                    <span className="font-medium text-[#111827]">Alex Morgan</span>
                    <span className="text-[#6B7280]">(alex.morgan@snaarp.com)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" data-tl="checkbox-emp-jordan" defaultChecked className="text-[#7014D9] rounded" />
                    <span className="font-medium text-[#111827]">Jordan Lee</span>
                    <span className="text-[#6B7280]">(jordan.lee@snaarp.com)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Departments subpanel */}
            {participants === "departments" && (
              <div className="mt-3 p-3.5 rounded-xl border border-[#E5E7EB] bg-gray-50 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" data-tl="checkbox-dept-eng" defaultChecked className="text-[#7014D9] rounded" />
                  <span className="font-medium text-[#111827]">Engineering</span>
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" data-tl="checkbox-dept-mkt" className="text-[#7014D9] rounded" />
                  <span className="font-medium text-[#111827]">Marketing</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Accordion 1: Reviewer overrides and workflow settings */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
          <button
            type="button"
            data-tl="accordion-overrides-btn"
            onClick={() => tl.setVar("wfCycleOverridesOpen", !overridesOpen)}
            className="w-full flex items-center justify-between p-4 text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
          >
            <span>Reviewer overrides and workflow settings</span>
            <Icon
              name="chevronDown"
              size={16}
              className={`text-[#6B7280] transition-transform ${overridesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {overridesOpen && (
            <div className="p-6 border-t border-[#F3F4F6] flex flex-col gap-6 bg-[#FAFBFD]">
              {/* Assignment filters and cycle scheduling */}
              <div data-tl="card-assignment-filters" className="p-5 rounded-xl border border-[#E5E7EB] bg-white flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-[#111827]">
                  Assignment filters and cycle scheduling
                </h3>

                <div>
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1.5">
                    Job roles (leave empty for all)
                  </label>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5">
                      <input type="checkbox" data-tl="cb-role-engineer" className="text-[#7014D9] rounded" />
                      <span>Engineer</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input type="checkbox" data-tl="cb-role-senior-engineer" className="text-[#7014D9] rounded" />
                      <span>Senior Engineer</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
                    Work locations (leave empty for all)
                  </label>
                  <button
                    type="button"
                    data-tl="accordion-work-location"
                    onClick={() => tl.setVar("wfWorkLocationSelectOpen", !workLocationOpen)}
                    className="text-xs text-[#7014D9] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Set an employee&apos;s appraisal work location</span>
                    <Icon name="chevronDown" size={12} />
                  </button>
                  {workLocationOpen && (
                    <div className="mt-2 p-3 rounded-lg border border-[#E5E7EB] bg-gray-50 flex items-center gap-3">
                      <span className="text-xs text-[#4B5563]">Employee:</span>
                      <select data-tl="select-work-location-emp" className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                        <option>Select employee</option>
                        <option>Alex Morgan</option>
                        <option>Jordan Lee</option>
                      </select>
                    </div>
                  )}
                  <p className="text-[11px] text-[#9CA3AF] mt-1.5">
                    Role and location filters narrow the selected participant scope. Work locations are appraisal settings, separate from home addresses.
                  </p>
                </div>

                <label className="flex items-center gap-2 text-xs text-[#374151]">
                  <input type="checkbox" data-tl="cb-carry-forward" className="text-[#7014D9] rounded" />
                  <span>Carry forward incomplete development actions</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
                      Automatic launch (your local time)
                    </label>
                    <input
                      type="text"
                      data-tl="input-auto-launch"
                      placeholder="dd/mm/yyyy --:--"
                      className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
                      Repeat after the previous cycle completes
                    </label>
                    <button
                      type="button"
                      data-tl="select-repeat"
                      onClick={() => tl.setVar("wfRepeatSelectOpen", !repeatSelectOpen)}
                      className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white flex items-center justify-between text-[#111827]"
                    >
                      <span>Do not repeat</span>
                      <Icon name="chevronDown" size={13} className="text-[#6B7280]" />
                    </button>
                    {repeatSelectOpen && (
                      <div data-tl="dropdown-repeat" className="absolute left-0 top-14 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs">
                        {["Do not repeat", "Monthly", "Quarterly", "Every six months", "Annually"].map((r, i) => (
                          <div
                            key={r}
                            data-tl={i === 0 ? "repeat-opt-none" : `repeat-opt-${i}`}
                            onClick={() => tl.setVar("wfRepeatSelectOpen", false)}
                            className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-[#9CA3AF]">
                  Scheduled launches run within five minutes and validate the template and reviewers. Failed launches stay in draft for correction. Pausing keeps the original dates.
                </p>
              </div>

              {/* Peer feedback and approval chain */}
              <div data-tl="card-peer-feedback" className="p-5 rounded-xl border border-[#E5E7EB] bg-white flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-[#111827]">
                  Peer feedback and approval chain
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  Enable Peer / 360 feedback in the cycle stages to use these assignments. Peer feedback precedes manager review; the manager supplies the final proposed score.
                </p>

                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#374151]">
                    <input type="checkbox" data-tl="cb-anonymous-peer" defaultChecked className="text-[#7014D9] rounded" />
                    <span>Anonymous peer feedback</span>
                  </label>
                  <p className="text-[10px] text-[#9CA3AF] ml-5">
                    Anonymous feedback requires three reviewers. Employees see an aggregate after release; HR and managers can see individual responses. Named feedback shows individual responses after release.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
                      Employee being reviewed
                    </label>
                    <select data-tl="select-peer-employee" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                      <option>Select employee</option>
                      <option>Alex Morgan</option>
                      <option>Jordan Lee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4B5563] mb-1">
                      Applies to
                    </label>
                    <select data-tl="select-applies-to" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                      <option>All participants</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#6B7280]">
                    Employee-specific chains replace the shared chain. Additional approvers must differ from the employee and primary manager.
                  </span>
                  <button type="button" data-tl="btn-add-approval-step" className="text-xs font-semibold text-[#7014D9] hover:underline whitespace-nowrap">
                    + Add approval step
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="md:col-span-2 flex items-center gap-2">
                    <select data-tl="select-override-emp" className="w-1/2 h-8 px-2 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                      <option>Select employee</option>
                      <option>Alex Morgan</option>
                      <option>Jordan Lee</option>
                    </select>
                    <div className="relative w-1/2">
                      <button
                        type="button"
                        data-tl="select-appraisal-reviewer"
                        onClick={() => tl.setVar("wfAppraisalReviewerSelectOpen", !reviewerSelectOpen)}
                        className="w-full h-8 px-2 rounded-lg border border-[#D1D5DB] text-xs bg-white flex items-center justify-between text-[#111827]"
                      >
                        <span>Select reviewer</span>
                        <Icon name="chevronDown" size={12} className="text-[#6B7280]" />
                      </button>
                      {reviewerSelectOpen && (
                        <div data-tl="dropdown-appraisal-reviewer" className="absolute left-0 top-10 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs">
                          <div
                            onClick={() => tl.setVar("wfAppraisalReviewerSelectOpen", false)}
                            className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                          >
                            Select reviewer
                          </div>
                          <div
                            data-tl="reviewer-opt-sam"
                            onClick={() => tl.setVar("wfAppraisalReviewerSelectOpen", false)}
                            className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                          >
                            Sam Taylor
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tl="btn-add-reviewer-override"
                    className="h-8 px-3 rounded-lg border border-[#7014D9] text-[#7014D9] text-xs font-semibold hover:bg-purple-50"
                  >
                    Add reviewer override
                  </button>
                </div>

                <div data-tl="card-reminders" className="flex flex-col gap-2.5 pt-3 border-t border-[#F3F4F6]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#374151]">Days after release to submit an appeal</span>
                    <input
                      type="number"
                      data-tl="input-appeal-days"
                      defaultValue={14}
                      className="w-16 h-7 px-2 text-right rounded border border-[#D1D5DB] text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#374151]">Days to acknowledge released results</span>
                    <input
                      type="number"
                      data-tl="input-ack-days"
                      defaultValue={7}
                      className="w-16 h-7 px-2 text-right rounded border border-[#D1D5DB] text-xs"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#374151]">
                    <input type="checkbox" data-tl="cb-require-ack" className="text-[#7014D9] rounded" />
                    <span>Require employee objective acknowledgement before assessment submission</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#374151]">
                    <input type="checkbox" data-tl="cb-send-reminders" defaultChecked className="text-[#7014D9] rounded" />
                    <span>Send deadline reminders</span>
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#374151]">Remind this many days before the deadline</span>
                    <input
                      type="text"
                      data-tl="input-reminder-days"
                      defaultValue="7,3,1,0"
                      className="w-24 h-7 px-2 text-right rounded border border-[#D1D5DB] text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#374151]">Overdue reminder interval (days)</span>
                    <input
                      type="number"
                      data-tl="input-overdue-interval"
                      defaultValue={3}
                      className="w-16 h-7 px-2 text-right rounded border border-[#D1D5DB] text-xs"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#374151]">
                    <input type="checkbox" data-tl="cb-email-notifications" className="text-[#7014D9] rounded" />
                    <span>Also send appraisal notifications by email</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Cycle summary */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
          <button
            type="button"
            data-tl="accordion-summary-btn"
            className="w-full flex items-center justify-between p-4 text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
          >
            <span>Cycle summary</span>
            <Icon name="chevronDown" size={16} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Review Stages Card */}
        <div data-tl="card-review-stages" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#111827] border-b border-[#F3F4F6] pb-3">
            Review stages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <label className="flex items-center gap-2">
              <input type="checkbox" data-tl="stage-self-review" defaultChecked className="text-[#7014D9] rounded" />
              <span className="font-medium text-[#111827]">Self review</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" data-tl="stage-manager-review" defaultChecked className="text-[#7014D9] rounded" />
              <span className="font-medium text-[#111827]">Manager review</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" data-tl="stage-hr-approval" className="text-[#7014D9] rounded" />
              <span className="font-medium text-[#111827]">HR approval</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" data-tl="stage-peer-feedback" className="text-[#7014D9] rounded" />
              <span className="font-medium text-[#111827]">Peer / 360 feedback</span>
            </label>
          </div>

          <div className="relative pt-2">
            <label className="block text-xs font-medium text-[#4B5563] mb-1">
              Fallback reviewer for employees without a manager
            </label>
            <button
              type="button"
              data-tl="select-fallback-reviewer"
              onClick={() => tl.setVar("wfCycleFallbackSelectOpen", !fallbackSelectOpen)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-left bg-white flex items-center justify-between"
            >
              <span>Use employee&apos;s line manager</span>
              <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
            </button>
            {fallbackSelectOpen && (
              <div data-tl="dropdown-fallback-reviewer" className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs">
                <div
                  data-tl="fallback-opt-line-manager"
                  onClick={() => tl.setVar("wfCycleFallbackSelectOpen", false)}
                  className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                >
                  Use employee&apos;s line manager
                </div>
                <div
                  data-tl="fallback-opt-sam-taylor"
                  onClick={() => tl.setVar("wfCycleFallbackSelectOpen", false)}
                  className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                >
                  Sam Taylor (SUPER_ADMIN)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stage Deadlines Card */}
        <div data-tl="card-stage-deadlines" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#111827] border-b border-[#F3F4F6] pb-3">
            Stage deadlines (optional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-medium text-[#4B5563] mb-1">
                Self Review Due
              </label>
              <div
                data-tl="input-self-due"
                onClick={() => tl.setVar("wfCycleSelfDueOpen", !selfDueOpen)}
                className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] flex items-center justify-between bg-white cursor-pointer"
              >
                <span>30/10/2026</span>
                <Icon name="shCalendar" size={14} className="text-[#9CA3AF]" />
              </div>

              {/* Calendar popup */}
              {selfDueOpen && (
                <div
                  data-tl="calendar-self-due"
                  className="absolute left-0 top-16 z-40 w-64 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-xl text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-[#111827]">October 2026</span>
                    <div className="flex items-center gap-1">
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-[#6B7280]">
                        <Icon name="chevronLeft" size={12} />
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-[#6B7280]">
                        <Icon name="chevronRight" size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#9CA3AF] mb-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Dummy padding days */}
                    <span className="text-[#D1D5DB] py-1">28</span>
                    <span className="text-[#D1D5DB] py-1">29</span>
                    <span className="text-[#D1D5DB] py-1">30</span>
                    <span className="py-1">1</span>
                    <span className="py-1">2</span>
                    <span className="py-1">3</span>
                    <span className="py-1">4</span>
                    {/* Days 5..29 */}
                    {Array.from({ length: 25 }, (_, i) => (
                      <span key={i} className="py-1 text-[#374151]">
                        {i + 5}
                      </span>
                    ))}
                    {/* Day 30 highlighted */}
                    <span
                      data-tl="cal-day-30"
                      className="py-1 rounded-full bg-[#7014D9] text-white font-semibold cursor-pointer"
                    >
                      30
                    </span>
                    <span className="py-1 text-[#374151]">31</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6] text-[10px] text-[#7014D9] font-medium">
                    <button type="button" onClick={() => tl.setVar("wfCycleSelfDueOpen", false)}>Clear</button>
                    <button type="button" onClick={() => tl.setVar("wfCycleSelfDueOpen", false)}>Today</button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4B5563] mb-1">
                Manager Review Due
              </label>
              <div
                data-tl="input-manager-due"
                className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] flex items-center justify-between bg-white"
              >
                <span>dd/mm/yyyy</span>
                <Icon name="shCalendar" size={14} className="text-[#9CA3AF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Review Questions Card */}
        <div data-tl="card-review-questions" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-[#111827] border-b border-[#F3F4F6] pb-3">
            Review questions
          </h2>
          <label className="flex items-center gap-2 text-xs font-medium text-[#374151]">
            <input type="checkbox" data-tl="cb-create-questions" defaultChecked className="text-[#7014D9] rounded" />
            <span>Create questions for this cycle</span>
          </label>

          <div className="relative">
            <label className="block text-xs font-medium text-[#4B5563] mb-1">
              Select questions template
            </label>
            <button
              type="button"
              data-tl="select-questions-template"
              onClick={() => tl.setVar("wfCycleQuestionsSelectOpen", !questionsSelectOpen)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-left bg-white flex items-center justify-between text-[#111827]"
            >
              <span>Standard five-section appraisal (1-5 ratings)</span>
              <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
            </button>

            {questionsSelectOpen && (
              <div
                data-tl="dropdown-questions-template"
                className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
              >
                {[
                  { id: "standard", label: "Standard five-section appraisal (1-5 ratings)" },
                  { id: "360", label: "360 Performance Review" },
                  { id: "quarterly", label: "Quarterly Performance Review" },
                  { id: "annual", label: "Annual Employee Performance Review" },
                  { id: "leadership", label: "Leadership Performance Review" },
                  { id: "sales", label: "Sales Performance Review" },
                ].map((tmpl) => (
                  <div
                    key={tmpl.id}
                    data-tl={`template-opt-${tmpl.id}`}
                    onClick={() => tl.setVar("wfCycleQuestionsSelectOpen", false)}
                    className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-[#374151]"
                  >
                    {tmpl.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="btn-cycle-cancel"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-cycle-save-draft"
            className="px-4 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
          >
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
}
