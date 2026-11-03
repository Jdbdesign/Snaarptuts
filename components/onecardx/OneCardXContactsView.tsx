"use client";

import { useEffect, useRef } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Search,
  Plus,
  Users,
  X,
  ChevronDown,
  Star,
  Pencil,
  Trash2,
  ArrowLeft,
  Building,
} from "lucide-react";
import { SAMPLE_CONTACT } from "./onecardx-data";

type Props = {
  tl: Timeline;
};

const FIELD_CATEGORIES = [
  { id: "most-popular", label: "Most Popular" },
  { id: "social", label: "Social" },
  { id: "communication", label: "Communication" },
  { id: "conferencing", label: "Conferencing" },
  { id: "payment", label: "Payment" },
  { id: "video", label: "Video" },
  { id: "music", label: "Music" },
  { id: "design", label: "Design" },
  { id: "gaming", label: "Gaming" },
  { id: "other", label: "Other" },
];

export function OneCardXContactsView({ tl }: Props) {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const subpage = useTimelineVar<"list" | "detail">(tl, "ocxContactsSubpage", "list");
  const isDrawerOpen = useTimelineVar(tl, "ocxContactDrawerOpen", false);
  const isSaved = useTimelineVar(tl, "ocxContactSaved", false);

  // Drawer form variables
  const hasPhoto = useTimelineVar(tl, "ocxContactPhoto", false);
  const hasLogo = useTimelineVar(tl, "ocxContactLogo", false);
  const photoPickerOpen = useTimelineVar(tl, "ocxContactPhotoPickerOpen", false);
  const logoPickerOpen = useTimelineVar(tl, "ocxContactLogoPickerOpen", false);
  const typedFirstName = useTimelineVar(tl, "field:first-name", "");
  const baseFirstName = useTimelineVar(tl, "ocxContactFirstName", "");
  const firstName = typedFirstName || baseFirstName;

  const typedLastName = useTimelineVar(tl, "field:last-name", "");
  const baseLastName = useTimelineVar(tl, "ocxContactLastName", "");
  const lastName = typedLastName || baseLastName;

  const typedPhone = useTimelineVar(tl, "field:phone", "");
  const basePhone = useTimelineVar(tl, "ocxContactPhone", "");
  const phone = typedPhone || basePhone;

  const phoneType = useTimelineVar(tl, "ocxContactPhoneType", "mobile");

  const typedEmail1 = useTimelineVar(tl, "field:email-1", "");
  const baseEmail1 = useTimelineVar(tl, "ocxContactEmail1", "");
  const email1 = typedEmail1 || baseEmail1;

  const email1Type = useTimelineVar(tl, "ocxContactEmail1Type", "work");

  const typedEmail2 = useTimelineVar(tl, "field:email-2", "");
  const baseEmail2 = useTimelineVar(tl, "ocxContactEmail2", "");
  const email2 = typedEmail2 || baseEmail2;

  const email2Type = useTimelineVar(tl, "ocxContactEmail2Type", "work");
  const email2Added = useTimelineVar(tl, "ocxContactEmail2Added", false);
  const moreOptions = useTimelineVar(tl, "ocxContactMoreOptions", false);

  const typedPrefix = useTimelineVar(tl, "field:prefix", "");
  const basePrefix = useTimelineVar(tl, "ocxContactPrefix", "");
  const prefix = typedPrefix || basePrefix;

  const typedMiddleName = useTimelineVar(tl, "field:middle-name", "");
  const baseMiddleName = useTimelineVar(tl, "ocxContactMiddleName", "");
  const middleName = typedMiddleName || baseMiddleName;

  const typedAccreditations = useTimelineVar(tl, "field:accreditations", "");
  const baseAccreditations = useTimelineVar(tl, "ocxContactAccreditations", "");
  const accreditations = typedAccreditations || baseAccreditations;

  const pronouns = useTimelineVar(tl, "ocxContactPronouns", "");
  const pronounsOpen = useTimelineVar(tl, "ocxContactPronounsOpen", false);

  const typedCompany = useTimelineVar(tl, "field:company", "");
  const baseCompany = useTimelineVar(tl, "ocxContactCompany", "");
  const company = typedCompany || baseCompany;

  const typedTitle = useTimelineVar(tl, "field:title", "");
  const baseTitle = useTimelineVar(tl, "ocxContactTitle", "");
  const title = typedTitle || baseTitle;

  const typedDepartment = useTimelineVar(tl, "field:department", "");
  const baseDepartment = useTimelineVar(tl, "ocxContactDepartment", "");
  const department = typedDepartment || baseDepartment;

  const fieldCategory = useTimelineVar<string | null>(tl, "ocxContactFieldCategory", null);
  const websiteField = useTimelineVar(tl, "ocxContactFieldWebsite", "");
  const spotifyField = useTimelineVar(tl, "ocxContactFieldSpotify", "");
  const drawerScrollY = useTimelineVar(tl, "ocxContactDrawerScrollY", 0);

  useEffect(() => {
    if (drawerBodyRef.current) {
      drawerBodyRef.current.scrollTop = drawerScrollY;
    }
  }, [drawerScrollY]);

  // Details subpage variables
  const typedTag = useTimelineVar(tl, "field:tag", "");
  const baseTag = useTimelineVar(tl, "ocxContactTagInput", "");
  const tagInput = typedTag || baseTag;
  const tags = useTimelineVar<string[]>(tl, "ocxContactTags", []);
  const noteText = useTimelineVar(tl, "ocxContactNoteText", "");

  const canSave = firstName.trim().length > 0;

  // 1. DETAIL SUBPAGE VIEW
  if (subpage === "detail") {
    return (
      <div
        data-tl="contacts-detail-page"
        className="h-full w-full overflow-y-auto bg-[#F8F9FA] p-6 font-['Poppins',sans-serif]"
      >
        {/* Back Button */}
        <button
          type="button"
          data-tl="btn-back-to-contacts"
          onClick={() => {
            tl.setUrl("identity.snaarp.com/contacts");
            tl.setVar("ocxContactsSubpage", "list");
          }}
          className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-[#111827] hover:text-[#7014D9] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Contacts</span>
        </button>

        <div className="grid grid-cols-12 gap-5">
          {/* Left Column (8 cols) */}
          <div className="col-span-8 space-y-4">
            {/* Contact Header & Details Card */}
            <div
              data-tl="card-contact-details"
              className="rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs"
            >
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-[19px] font-semibold text-[#111827]">
                    {SAMPLE_CONTACT.name}
                  </h2>
                  <Star size={17} className="text-[#9CA3AF] cursor-pointer hover:text-amber-400" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-tl="btn-contact-edit"
                    className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] px-3.5 py-1.5 text-[12.5px] font-medium text-[#374151] hover:bg-gray-50 transition-colors"
                  >
                    <Pencil size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    data-tl="btn-contact-delete"
                    className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-1.5 text-[12.5px] font-medium text-[#DC2626] hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* 3-Column Info Grid */}
              <div className="grid grid-cols-3 gap-y-3 pt-4 text-[13px]">
                <div>
                  <span className="text-[#6B7280]">Company: </span>
                  <span className="font-medium text-[#111827]">{SAMPLE_CONTACT.company}</span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Job Title: </span>
                  <span className="font-medium text-[#111827]">{SAMPLE_CONTACT.title}</span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Email: </span>
                  <span className="font-medium text-[#111827]">{SAMPLE_CONTACT.emailPersonal}</span>
                </div>

                <div>
                  <span className="text-[#6B7280]">Phone: </span>
                  <span className="font-medium text-[#111827]">{SAMPLE_CONTACT.phone}</span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Website: </span>
                  <span className="font-medium text-[#7014D9] underline truncate block">
                    https://{SAMPLE_CONTACT.website}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Address: </span>
                  <span className="font-medium text-[#111827]">-</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#6B7280]">Source: </span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11.5px] font-medium text-gray-700">
                    {SAMPLE_CONTACT.source}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280]">Added: </span>
                  <span className="font-medium text-[#111827]">{SAMPLE_CONTACT.addedDate}</span>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            <div
              data-tl="card-contact-tags"
              className="rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs"
            >
              <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Tags</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    data-tl="input-new-tag"
                    value={tagInput}
                    onChange={() => {}}
                    placeholder="New tag"
                    className="w-48 rounded-xl border border-[#E5E7EB] px-3 py-1.5 pr-8 text-[12.5px] text-[#111827] focus:border-[#7014D9] focus:outline-none"
                  />
                  <button
                    type="button"
                    data-tl="btn-add-tag"
                    onClick={() => {
                      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                        tl.setVar("ocxContactTags", [...tags, tagInput.trim()]);
                        tl.setVar("ocxContactTagInput", "");
                      }
                    }}
                    className="absolute right-1.5 flex h-6 w-6 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Render Tag Chips */}
                {tags.map((tag) => (
                  <span
                    key={tag}
                    data-tl={`tag-chip-${tag.toLowerCase()}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#F3E8FF] px-2.5 py-1 text-[12px] font-medium text-[#7014D9]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        tl.setVar(
                          "ocxContactTags",
                          tags.filter((t) => t !== tag)
                        )
                      }
                      className="hover:text-purple-900"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Notes Card */}
            <div
              data-tl="card-contact-notes"
              className="rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs"
            >
              <h3 className="text-[14px] font-semibold text-[#111827] mb-3">Notes</h3>
              <textarea
                data-tl="textarea-notes"
                value={noteText}
                onChange={() => {}}
                placeholder="Add a note..."
                rows={3}
                className="w-full resize-none rounded-xl border border-[#E5E7EB] p-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
              />
              <div className="mt-2.5 flex items-center justify-between">
                <button
                  type="button"
                  data-tl="btn-add-note"
                  className="rounded-xl bg-gray-100 px-4 py-1.5 text-[12.5px] font-medium text-gray-500 cursor-pointer hover:bg-gray-200"
                >
                  Add Note
                </button>
                <span className="text-[12px] text-[#9CA3AF]">No notes yet</span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) - Activity Timeline */}
          <div className="col-span-4">
            <div
              data-tl="card-contact-timeline"
              className="rounded-2xl border border-[#EBECEF] bg-white p-5 shadow-2xs h-full"
            >
              <h3 className="text-[14px] font-semibold text-[#111827] mb-3">
                Activity Timeline
              </h3>
              <p className="text-[12.5px] text-[#9CA3AF]">No activity yet</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN LIST VIEW (Empty or with 1 Contact)
  return (
    <div
      data-tl="contacts-container"
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#F8F9FA] font-['Poppins',sans-serif]"
    >
      {/* Top Search & Action Bar */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#EBECEF] bg-white">
        <div className="relative flex items-center w-80">
          <Search size={16} className="absolute left-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            data-tl="input-search-contacts"
            placeholder={isSaved ? "Search 1 contacts" : "Search 0 contacts"}
            className="w-full rounded-xl border border-[#E5E7EB] bg-white py-2 pl-9 pr-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] shadow-2xs focus:border-[#7014D9] focus:outline-none"
            readOnly
          />
        </div>

        <button
          type="button"
          data-tl="btn-top-add-contact"
          onClick={() => tl.setVar("ocxContactDrawerOpen", true)}
          className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-[13px] font-medium text-white shadow-xs hover:bg-[#5b0fb3] transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isSaved ? (
          /* Empty State */
          <div
            data-tl="contacts-empty-state"
            className="flex h-[420px] w-full flex-col items-center justify-center rounded-2xl border border-[#EBECEF] bg-white p-8 text-center shadow-2xs"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7014D9]">
              <Users size={32} strokeWidth={1.7} />
            </div>
            <h3 className="text-[17px] font-semibold text-[#111827]">
              Add another contact!
            </h3>
            <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-[#6B7280]">
              Start building your network. Add contacts manually, scan business cards,
              or import them from your phone.
            </p>
            <button
              type="button"
              data-tl="btn-empty-add-contact"
              onClick={() => tl.setVar("ocxContactDrawerOpen", true)}
              className="mt-5 flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-xs hover:bg-[#5b0fb3] transition-colors cursor-pointer"
            >
              <span>Add Contact</span>
            </button>
          </div>
        ) : (
          /* Contacts Table */
          <div
            data-tl="contacts-table-container"
            className="overflow-hidden rounded-2xl border border-[#EBECEF] bg-white shadow-2xs"
          >
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#F3F4F6] bg-white text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  <th className="py-3 px-4 w-10">
                    <input type="checkbox" className="rounded" readOnly />
                  </th>
                  <th className="py-3 px-4">NAME ⇕</th>
                  <th className="py-3 px-4">JOB TITLE ⇕</th>
                  <th className="py-3 px-4">COMPANY ⇕</th>
                  <th className="py-3 px-4">TAGS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                <tr
                  data-tl="contact-row-alex-morgan"
                  onClick={() => {
                    tl.setUrl("identity.snaarp.com/contacts/f98616ee-af2c-40ca-b9d9-a7c3d2722e26");
                    tl.setVar("ocxContactsSubpage", "detail");
                  }}
                  className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" readOnly />
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#111827]">
                    {SAMPLE_CONTACT.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#4B5563]">
                    {SAMPLE_CONTACT.title}
                  </td>
                  <td className="py-3.5 px-4 text-[#4B5563]">
                    {SAMPLE_CONTACT.company}
                  </td>
                  <td className="py-3.5 px-4">
                    {tags.length > 0 ? (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-[11px] text-purple-700">
                        {tags[0]}
                      </span>
                    ) : (
                      <span className="text-[#9CA3AF]">-</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. ADD CONTACT DRAWER */}
      {isDrawerOpen && (
        <div
          data-tl="drawer-add-contact-backdrop"
          onClick={() => tl.setVar("ocxContactDrawerOpen", false)}
          className="absolute inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
        >
          <div
            data-tl="drawer-add-contact"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 flex w-[410px] flex-col bg-white shadow-2xl transition-transform"
          >
            {/* Drawer Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#F3F4F6] px-5">
              <h2 className="text-[16px] font-semibold text-[#111827]">
                Add contact
              </h2>
              <button
                type="button"
                data-tl="btn-drawer-close-x"
                onClick={() => tl.setVar("ocxContactDrawerOpen", false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div
              ref={drawerBodyRef}
              data-tl="drawer-scroll-body"
              className="flex-1 overflow-y-auto p-5 space-y-5"
            >
              {/* Photo & Logo circles */}
              <div className="flex items-center gap-6 pt-1">
                {/* Photo Circle */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    data-tl="circle-upload-photo"
                    onClick={() => tl.setVar("ocxContactPhotoPickerOpen", true)}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-[#7014D9] bg-gray-50 overflow-hidden cursor-pointer transition-colors"
                  >
                    {hasPhoto ? (
                      <div className="flex h-full w-full items-center justify-center bg-[#2B2D32] text-white text-[18px] font-bold">
                        AM
                      </div>
                    ) : (
                      <Plus size={18} className="text-gray-400" />
                    )}
                  </button>
                  <span className="mt-1 text-[11px] text-[#6B7280]">Photo</span>
                </div>

                {/* Logo Circle */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    data-tl="circle-upload-logo"
                    onClick={() => tl.setVar("ocxContactLogoPickerOpen", true)}
                    className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-[#7014D9] bg-gray-50 overflow-hidden cursor-pointer transition-colors"
                  >
                    {hasLogo ? (
                      <div className="flex h-full w-full items-center justify-center bg-[#7014D9] text-white">
                        <Building size={16} />
                      </div>
                    ) : (
                      <Plus size={16} className="text-gray-400" />
                    )}
                  </button>
                  <span className="mt-1 text-[11px] text-[#6B7280]">Logo</span>
                </div>
              </div>

              {/* Sample Photo Picker Modal */}
              {photoPickerOpen && (
                <div
                  data-tl="modal-photo-picker"
                  className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11.5px] font-semibold text-[#111827]">
                      Choose a sample portrait:
                    </span>
                    <button
                      type="button"
                      onClick={() => tl.setVar("ocxContactPhotoPickerOpen", false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    data-tl="sample-photo-alex"
                    onClick={() => {
                      tl.setVar("ocxContactPhoto", true);
                      tl.setVar("ocxContactPhotoPickerOpen", false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-2 hover:border-[#7014D9] transition-colors cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2B2D32] text-white text-[12px] font-bold">
                      AM
                    </div>
                    <div className="text-left text-[12px]">
                      <p className="font-medium text-[#111827]">Alex Morgan</p>
                      <p className="text-[10px] text-gray-500">Portrait.png (128 KB)</p>
                    </div>
                  </button>
                </div>
              )}

              {/* Sample Logo Picker Modal */}
              {logoPickerOpen && (
                <div
                  data-tl="modal-logo-picker"
                  className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11.5px] font-semibold text-[#111827]">
                      Choose a sample company logo:
                    </span>
                    <button
                      type="button"
                      onClick={() => tl.setVar("ocxContactLogoPickerOpen", false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    data-tl="sample-logo-acme"
                    onClick={() => {
                      tl.setVar("ocxContactLogo", true);
                      tl.setVar("ocxContactLogoPickerOpen", false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-2 hover:border-[#7014D9] transition-colors cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7014D9] text-white">
                      <Building size={16} />
                    </div>
                    <div className="text-left text-[12px]">
                      <p className="font-medium text-[#111827]">Acme Ltd Logo</p>
                      <p className="text-[10px] text-gray-500">Logo.png (64 KB)</p>
                    </div>
                  </button>
                </div>
              )}

              {/* CONTACT INFO Header */}
              <div className="text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                CONTACT INFO
              </div>

              {/* First Name & Last Name */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    data-tl="input-first-name"
                    value={firstName}
                    onChange={() => {}}
                    placeholder="First name"
                    className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    data-tl="input-last-name"
                    value={lastName}
                    onChange={() => {}}
                    placeholder="Last name"
                    className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[12px] font-medium text-[#374151] mb-1">
                  Phone
                </label>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] px-2.5 py-2 text-[12px] text-[#374151] shrink-0">
                    <span>GB +44</span>
                    <ChevronDown size={13} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    data-tl="input-phone"
                    value={phone}
                    onChange={() => {}}
                    placeholder="Phone number"
                    className="flex-1 min-w-0 rounded-xl border border-[#E5E7EB] px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                  <div
                    data-tl="dropdown-phone-type"
                    className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] px-2 py-2 text-[12px] text-[#374151] shrink-0 cursor-pointer"
                  >
                    <span>{phoneType}</span>
                    <ChevronDown size={13} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="ext."
                    className="w-12 rounded-xl border border-[#E5E7EB] px-2 py-2 text-[12px] text-[#111827] placeholder:text-[#9CA3AF]"
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  data-tl="btn-add-phone"
                  className="mt-1.5 text-[12px] font-medium text-[#7014D9] hover:underline cursor-pointer"
                >
                  + add phone
                </button>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-medium text-[#374151] mb-1">
                  Email
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      data-tl="input-email-1"
                      value={email1}
                      onChange={() => {}}
                      placeholder="Email address"
                      className="flex-1 min-w-0 rounded-xl border border-[#E5E7EB] px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                    />
                    <div
                      data-tl="dropdown-email-1-type"
                      className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] px-2.5 py-2 text-[12px] text-[#374151] shrink-0 cursor-pointer"
                    >
                      <span>{email1Type}</span>
                      <ChevronDown size={13} className="text-gray-400" />
                    </div>
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {email2Added && (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        data-tl="input-email-2"
                        value={email2}
                        onChange={() => {}}
                        placeholder="Email address"
                        className="flex-1 min-w-0 rounded-xl border border-[#E5E7EB] px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                      />
                      <div
                        data-tl="dropdown-email-2-type"
                        className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] px-2.5 py-2 text-[12px] text-[#374151] shrink-0 cursor-pointer"
                      >
                        <span>{email2Type}</span>
                        <ChevronDown size={13} className="text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxContactEmail2Added", false)}
                        className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  data-tl="btn-add-email"
                  onClick={() => tl.setVar("ocxContactEmail2Added", true)}
                  className="mt-1.5 text-[12px] font-medium text-[#7014D9] hover:underline cursor-pointer"
                >
                  + add email
                </button>
              </div>

              {/* More options toggle */}
              <div>
                <button
                  type="button"
                  data-tl="btn-more-options"
                  onClick={() => tl.setVar("ocxContactMoreOptions", !moreOptions)}
                  className="text-[12.5px] font-medium text-[#7014D9] hover:underline cursor-pointer"
                >
                  {moreOptions
                    ? "- Less options"
                    : "+ More options (prefix, suffix, pronouns...)"}
                </button>

                {moreOptions && (
                  <div className="mt-3 space-y-3 rounded-xl bg-gray-50/80 p-3 border border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-[#374151] mb-1">
                          Prefix
                        </label>
                        <input
                          type="text"
                          data-tl="input-prefix"
                          value={prefix}
                          onChange={() => {}}
                          placeholder="Dr., Mr., Mrs."
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827] focus:border-[#7014D9] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#374151] mb-1">
                          Suffix
                        </label>
                        <input
                          type="text"
                          data-tl="input-suffix"
                          placeholder="Jr., Sr., III"
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827]"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#374151] mb-1">
                        Middle name
                      </label>
                      <input
                        type="text"
                        data-tl="input-middle-name"
                        value={middleName}
                        onChange={() => {}}
                        placeholder="Middle name"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827] focus:border-[#7014D9] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#374151] mb-1">
                        Accreditations
                      </label>
                      <input
                        type="text"
                        data-tl="input-accreditations"
                        value={accreditations}
                        onChange={() => {}}
                        placeholder="MBA, PhD, CPA"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827] focus:border-[#7014D9] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#374151] mb-1">
                        Preferred name
                      </label>
                      <input
                        type="text"
                        placeholder="Nickname or preferred name"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827]"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#374151] mb-1">
                        Maiden name
                      </label>
                      <input
                        type="text"
                        placeholder="Maiden name"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827]"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#374151] mb-1">
                        Pronouns
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          data-tl="select-pronouns"
                          onClick={() => tl.setVar("ocxContactPronounsOpen", !pronounsOpen)}
                          className="flex w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-[12px] text-[#111827] cursor-pointer"
                        >
                          <span>{pronouns || "Select pronouns"}</span>
                          <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {pronounsOpen && (
                          <div
                            data-tl="dropdown-pronouns-menu"
                            className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg z-20"
                          >
                            {["he/him", "she/her", "they/them", "other"].map((p) => (
                              <div
                                key={p}
                                data-tl={`option-pronoun-${p.replace("/", "-")}`}
                                onClick={() => {
                                  tl.setVar("ocxContactPronouns", p);
                                  tl.setVar("ocxContactPronounsOpen", false);
                                }}
                                className="px-3 py-1.5 text-[12px] hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                              >
                                {p}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* WORK INFO Header */}
              <div className="text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase pt-2">
                WORK INFO
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    data-tl="input-company"
                    value={company}
                    onChange={() => {}}
                    placeholder="Company name"
                    className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    data-tl="input-title"
                    value={title}
                    onChange={() => {}}
                    placeholder="Job title"
                    className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    data-tl="input-department"
                    value={department}
                    onChange={() => {}}
                    placeholder="Department"
                    className="w-full rounded-xl border border-[#E5E7EB] px-3.5 py-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#374151] mb-1">
                    Associated Card
                  </label>
                  <div
                    data-tl="select-associated-card"
                    className="flex w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-[13px] text-[#9CA3AF] cursor-pointer"
                  >
                    <span>Select a card</span>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* FIELDS Section */}
              <div className="pt-2">
                <div className="text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase mb-2">
                  FIELDS
                </div>

                {/* Added Fields */}
                <div className="space-y-2 mb-3">
                  {websiteField && (
                    <div
                      data-tl="field-row-website"
                      className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] p-1.5 bg-white"
                    >
                      <span className="rounded-lg bg-[#F3E8FF] px-2 py-1 text-[11px] font-semibold text-[#7014D9]">
                        Website
                      </span>
                      <input
                        type="text"
                        data-tl="input-field-website"
                        value={websiteField}
                        onChange={() => {}}
                        className="flex-1 text-[12.5px] text-[#111827] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxContactFieldWebsite", "")}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {spotifyField && (
                    <div
                      data-tl="field-row-spotify"
                      className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] p-1.5 bg-white"
                    >
                      <span className="rounded-lg bg-[#F3E8FF] px-2 py-1 text-[11px] font-semibold text-[#7014D9]">
                        Spotify
                      </span>
                      <input
                        type="text"
                        data-tl="input-field-spotify"
                        value={spotifyField}
                        onChange={() => {}}
                        className="flex-1 text-[12.5px] text-[#111827] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxContactFieldSpotify", "")}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Subcategory View: Most Popular */}
                {fieldCategory === "most-popular" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#111827]">
                      <span>Most Popular</span>
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxContactFieldCategory", null)}
                        className="text-[11px] font-normal text-gray-500 hover:underline cursor-pointer"
                      >
                        ← Back
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        data-tl="btn-field-website"
                        onClick={() => {
                          tl.setVar("ocxContactFieldWebsite", "www.acme.example");
                          tl.setVar("ocxContactFieldCategory", null);
                        }}
                        className="rounded-lg bg-[#F3E8FF] px-2.5 py-1 text-[11.5px] font-medium text-[#7014D9] hover:bg-purple-200 cursor-pointer"
                      >
                        + Website
                      </button>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + Link
                      </span>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + Instagram
                      </span>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + LinkedIn
                      </span>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + Facebook
                      </span>
                    </div>
                  </div>
                ) : fieldCategory === "music" ? (
                  /* Subcategory View: Music */
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#111827]">
                      <span>Music</span>
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxContactFieldCategory", null)}
                        className="text-[11px] font-normal text-gray-500 hover:underline cursor-pointer"
                      >
                        ← Back
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        data-tl="btn-field-spotify"
                        onClick={() => {
                          tl.setVar("ocxContactFieldSpotify", "www.spotify.com/music");
                          tl.setVar("ocxContactFieldCategory", null);
                        }}
                        className="rounded-lg bg-[#F3E8FF] px-2.5 py-1 text-[11.5px] font-medium text-[#7014D9] hover:bg-purple-200 cursor-pointer"
                      >
                        + Spotify
                      </button>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + Apple Music
                      </span>
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11.5px] text-gray-600">
                        + SoundCloud
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Main Category Chips */
                  <div className="flex flex-wrap gap-1.5">
                    {FIELD_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        data-tl={`chip-category-${cat.id}`}
                        onClick={() => tl.setVar("ocxContactFieldCategory", cat.id)}
                        className="rounded-xl border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-[#374151] hover:border-[#7014D9] hover:text-[#7014D9] transition-colors cursor-pointer"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer (Sticky) */}
            <div className="flex h-16 shrink-0 items-center justify-end gap-2.5 border-t border-[#F3F4F6] px-5">
              <button
                type="button"
                data-tl="btn-drawer-cancel"
                onClick={() => tl.setVar("ocxContactDrawerOpen", false)}
                className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-drawer-save-contact"
                disabled={!canSave}
                onClick={() => {
                  if (canSave) {
                    tl.setVar("ocxContactDrawerOpen", false);
                    tl.setVar("ocxContactSaved", true);
                  }
                }}
                className={`rounded-xl px-5 py-2 text-[13px] font-medium text-white shadow-xs transition-colors ${
                  canSave
                    ? "bg-[#7014D9] hover:bg-[#5b0fb3] cursor-pointer"
                    : "bg-[#C4B5FD] cursor-not-allowed opacity-70"
                }`}
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
