"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_CONTACT_DETAILS, SAMPLE_EMPLOYEE } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function ProfileView({ tl, onBack }: Props) {
  const phone = useTimelineVar(tl, "field:contact-phone", SAMPLE_CONTACT_DETAILS.phone);
  const personalEmail = useTimelineVar(tl, "field:personal-email", SAMPLE_CONTACT_DETAILS.personalEmail);
  const address = useTimelineVar(tl, "field:address-line", SAMPLE_CONTACT_DETAILS.address);
  const city = useTimelineVar(tl, "field:city", SAMPLE_CONTACT_DETAILS.city);
  const postcode = useTimelineVar(tl, "field:postcode", SAMPLE_CONTACT_DETAILS.postcode);
  const emergencyName = useTimelineVar(tl, "field:emergency-name", SAMPLE_CONTACT_DETAILS.emergencyName);
  const emergencyPhone = useTimelineVar(tl, "field:emergency-phone", SAMPLE_CONTACT_DETAILS.emergencyPhone);

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-20">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="btn-back-profile"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-semibold hover:bg-[#E9D5FF] transition-colors"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 data-tl="profile-heading" className="text-xl font-bold text-[#111827]">
          My Profile
        </h2>
      </div>

      {/* 1. Personal and employment details card */}
      <section
        data-tl="card-employment-details"
        className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5"
      >
        <div>
          <h3 className="text-sm font-bold text-[#111827]">Personal and employment details</h3>
          <p className="text-xs text-[#6B7280] mt-1">
            Contact HR to correct your name or employment details.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-[#6B7280] block mb-1">Name</span>
            <span data-tl="emp-field-name" className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.name}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Work email</span>
            <span data-tl="emp-field-email" className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.email}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Employee ID</span>
            <span data-tl="emp-field-id" className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.id}</span>
          </div>

          <div>
            <span className="text-[#6B7280] block mb-1">Date of birth</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.dob}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Job title</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.jobTitle}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Department</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.department}</span>
          </div>

          <div>
            <span className="text-[#6B7280] block mb-1">Manager</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.manager}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Manager email</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.managerEmail}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Start date</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.startDate}</span>
          </div>

          <div>
            <span className="text-[#6B7280] block mb-1">Status</span>
            <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-[#16A34A] border border-green-200">
              {SAMPLE_EMPLOYEE.status}
            </span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Employment type</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.employmentType}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Contract type</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.contractType}</span>
          </div>

          <div>
            <span className="text-[#6B7280] block mb-1">Weekly hours</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.weeklyHours}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block mb-1">Shift</span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.shift}</span>
          </div>
        </div>
      </section>

      {/* 2. Edit contact details card */}
      <section
        data-tl="card-contact-details"
        className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5"
      >
        <div>
          <h3 className="text-sm font-bold text-[#111827]">Edit contact details</h3>
          <p className="text-xs text-[#6B7280] mt-1">
            These details belong to your Workforce employee record.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Contact phone</label>
            <input
              type="text"
              data-tl="field-contact-phone"
              value={phone}
              onChange={(e) => tl.setVar("field:contact-phone", e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Personal email</label>
            <input
              type="email"
              data-tl="field-personal-email"
              value={personalEmail}
              onChange={(e) => tl.setVar("field:personal-email", e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Address line</label>
            <input
              type="text"
              data-tl="field-address-line"
              value={address}
              onChange={(e) => tl.setVar("field:address-line", e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">City</label>
              <input
                type="text"
                data-tl="field-city"
                value={city}
                onChange={(e) => tl.setVar("field:city", e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
              />
            </div>
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Postcode</label>
              <input
                type="text"
                data-tl="field-postcode"
                value={postcode}
                onChange={(e) => tl.setVar("field:postcode", e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Emergency contact name</label>
            <input
              type="text"
              data-tl="field-emergency-name"
              value={emergencyName}
              onChange={(e) => tl.setVar("field:emergency-name", e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Emergency contact phone</label>
            <input
              type="text"
              data-tl="field-emergency-phone"
              value={emergencyPhone}
              onChange={(e) => tl.setVar("field:emergency-phone", e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs text-[#111827] focus:outline-none focus:border-[#7014D9]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#F3F4F6]">
          <button
            type="button"
            data-tl="btn-save-contact"
            onClick={() => {
              tl.toast("Contact details updated");
              tl.setVar("wfContactSaved", true);
            }}
            className="px-5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5B0FB3] transition-colors shadow-sm"
          >
            Save changes
          </button>
        </div>
      </section>
    </div>
  );
}
