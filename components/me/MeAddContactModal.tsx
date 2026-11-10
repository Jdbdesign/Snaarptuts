"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  type Contact,
  SAMPLE_JORDAN_LEE,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeAddContactModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meAddContactModalOpen", false);

  const firstName = useTimelineVar<string>(tl, "meAddContactFirstName", "");
  const lastName = useTimelineVar<string>(tl, "meAddContactLastName", "");
  const email = useTimelineVar<string>(tl, "meAddContactEmail", "");
  const phone = useTimelineVar<string>(tl, "meAddContactPhone", "");
  const company = useTimelineVar<string>(tl, "meAddContactCompany", "");
  const jobTitle = useTimelineVar<string>(tl, "meAddContactJob", "");
  const location = useTimelineVar<string>(tl, "meAddContactLocation", "");
  const linkedin = useTimelineVar<string>(tl, "meAddContactLinkedin", "");

  if (!isOpen) return null;

  return (
    <div
      data-tl="me-add-contact-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fadeIn select-none p-4"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">Add contact</h2>
          <button
            type="button"
            data-tl="me-add-contact-close"
            onClick={() => tl.setVar("meAddContactModalOpen", false)}
            className="rounded p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="me-add-contact-first-name"
                value={firstName}
                onChange={(e) => tl.setVar("meAddContactFirstName", e.target.value)}
                placeholder="e.g. Jordan"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Last name</label>
              <input
                type="text"
                data-tl="me-add-contact-last-name"
                value={lastName}
                onChange={(e) => tl.setVar("meAddContactLastName", e.target.value)}
                placeholder="e.g. Lee"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              data-tl="me-add-contact-email"
              value={email}
              onChange={(e) => tl.setVar("meAddContactEmail", e.target.value)}
              placeholder="e.g. jordan.lee@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              data-tl="me-add-contact-phone"
              value={phone}
              onChange={(e) => tl.setVar("meAddContactPhone", e.target.value)}
              placeholder="e.g. +44 7700 900123"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                data-tl="me-add-contact-company"
                value={company}
                onChange={(e) => tl.setVar("meAddContactCompany", e.target.value)}
                placeholder="e.g. Acme Studio"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Job title</label>
              <input
                type="text"
                data-tl="me-add-contact-job"
                value={jobTitle}
                onChange={(e) => tl.setVar("meAddContactJob", e.target.value)}
                placeholder="e.g. CEO"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              data-tl="me-add-contact-location"
              value={location}
              onChange={(e) => tl.setVar("meAddContactLocation", e.target.value)}
              placeholder="e.g. London, United Kingdom"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="text"
              data-tl="me-add-contact-linkedin"
              value={linkedin}
              onChange={(e) => tl.setVar("meAddContactLinkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3">
          <button
            type="button"
            data-tl="me-add-contact-cancel"
            onClick={() => tl.setVar("meAddContactModalOpen", false)}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            data-tl="me-add-contact-submit"
            onClick={() => {
              const current = tl.getVar<Contact[]>("meMyContacts", []);
              const newContact: Contact = {
                ...SAMPLE_JORDAN_LEE,
                firstName: firstName || SAMPLE_JORDAN_LEE.firstName,
                lastName: lastName || SAMPLE_JORDAN_LEE.lastName,
                name: `${firstName || SAMPLE_JORDAN_LEE.firstName} ${lastName || SAMPLE_JORDAN_LEE.lastName}`.trim(),
                email: email || SAMPLE_JORDAN_LEE.email,
                phone: phone || SAMPLE_JORDAN_LEE.phone,
                company: company || SAMPLE_JORDAN_LEE.company,
                jobTitle: jobTitle || SAMPLE_JORDAN_LEE.jobTitle,
                location: location || SAMPLE_JORDAN_LEE.location,
              };
              tl.setVar("meMyContacts", [newContact, ...current]);
              tl.setVar("meAddContactModalOpen", false);
              tl.setVar("meContactsBanner", `${newContact.name} was added.`);
            }}
            className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5b10b0] transition-colors shadow-xs"
          >
            Add contact
          </button>
        </div>
      </div>
    </div>
  );
}
