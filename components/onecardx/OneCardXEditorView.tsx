"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ACCENT_COLORS,
  CARD_DESIGNS,
  SAMPLE_PORTRAITS,
  SAMPLE_LOGOS,
} from "./onecardx-data";

type Props = {
  tl: Timeline;
  onSaveCard?: () => void;
};

export function OneCardXEditorView({ tl, onSaveCard }: Props) {
  // State from timeline
  const activeTab = useTimelineVar<"card" | "display" | "information" | "fields">(
    tl,
    "ocxActiveTab",
    "card"
  );
  const cardType = useTimelineVar<"id-card" | "business">(tl, "ocxCardType", "id-card");
  const design = useTimelineVar(tl, "ocxDesign", "classic");
  const photoAdded = useTimelineVar(tl, "ocxPhotoAdded", false);
  const photoModalOpen = useTimelineVar(tl, "ocxPhotoModalOpen", false);
  const photoChooserOpen = useTimelineVar(tl, "ocxPhotoChooserOpen", false);
  const photoUploading = useTimelineVar(tl, "ocxPhotoUploading", false);
  const accentColor = useTimelineVar(tl, "ocxAccentColor", "#7014D9");
  const font = useTimelineVar(tl, "ocxFont", "Poppins (Default)");
  const logoAdded = useTimelineVar(tl, "ocxLogoAdded", false);
  const logoModalOpen = useTimelineVar(tl, "ocxLogoModalOpen", false);
  const badgeAdded = useTimelineVar(tl, "ocxBadgeAdded", false);
  const badgeModalOpen = useTimelineVar(tl, "ocxBadgeModalOpen", false);
  const useOwnNameChecked = useTimelineVar(tl, "ocxUseOwnNameChecked", false);
  const firstName = useTimelineVar(tl, "field:first-name", "");
  const lastName = useTimelineVar(tl, "field:last-name", "");
  const fieldWebsite = useTimelineVar(tl, "ocxFieldWebsite", false);
  const fieldInstagram = useTimelineVar(tl, "ocxFieldInstagram", false);
  const fieldEmail = useTimelineVar(tl, "ocxFieldEmail", false);
  const isSaving = useTimelineVar(tl, "ocxSavingCard", false);

  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : "Your Name";

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      {/* 1. Editor Header & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-3 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6B7280]">ID Cards</span>
          <span className="text-[#D1D5DB]">/</span>
          <span className="font-semibold text-[#111827]">Edit Card</span>
        </div>

        <button
          type="button"
          data-tl="btn-save-card"
          onClick={onSaveCard}
          disabled={isSaving}
          className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-semibold text-white transition-all shadow-xs cursor-pointer ${
            isSaving
              ? "bg-[#852EE6] cursor-wait"
              : "bg-[#7014D9] hover:bg-[#5E10B8]"
          }`}
        >
          {isSaving ? (
            <>
              <div
                data-tl="saving-indicator"
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>

      {/* 2. Main Two-Column Layout (Left Form, Right Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Pane (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
          {/* Form Tabs Header */}
          <div className="flex border-b border-[#F3F4F6] px-3 pt-2 bg-gray-50/50 rounded-t-2xl">
            <button
              type="button"
              data-tl="tab-card"
              onClick={() => tl.setVar("ocxActiveTab", "card")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "card"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Card
            </button>
            <button
              type="button"
              data-tl="tab-display"
              onClick={() => tl.setVar("ocxActiveTab", "display")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "display"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Display
            </button>
            <button
              type="button"
              data-tl="tab-information"
              onClick={() => tl.setVar("ocxActiveTab", "information")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "information"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Information
            </button>
            <button
              type="button"
              data-tl="tab-fields"
              onClick={() => tl.setVar("ocxActiveTab", "fields")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "fields"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Fields
            </button>
          </div>

          {/* Form Tab Content */}
          <div className="p-6">
            {/* A. CARD TAB */}
            {activeTab === "card" && (
              <div data-tl="tab-content-card" className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">Card Type</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Select the purpose and layout structure for this card.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Option 1: ID Card */}
                  <div
                    data-tl="card-type-id-card"
                    onClick={() => tl.setVar("ocxCardType", "id-card")}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      cardType === "id-card"
                        ? "border-[#7014D9] bg-purple-50/20 ring-1 ring-[#7014D9]"
                        : "border-[#E5E7EB] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs text-[#111827]">
                        ID Card
                      </span>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          cardType === "id-card"
                            ? "border-[#7014D9] bg-[#7014D9]"
                            : "border-gray-300"
                        }`}
                      >
                        {cardType === "id-card" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Name, photo, email, phone, and direct social links for
                      workplace identification.
                    </p>
                  </div>

                  {/* Option 2: Business Card */}
                  <div
                    data-tl="card-type-business"
                    onClick={() => tl.setVar("ocxCardType", "business")}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      cardType === "business"
                        ? "border-[#7014D9] bg-purple-50/20 ring-1 ring-[#7014D9]"
                        : "border-[#E5E7EB] hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs text-[#111827]">
                        Business
                      </span>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          cardType === "business"
                            ? "border-[#7014D9] bg-[#7014D9]"
                            : "border-gray-300"
                        }`}
                      >
                        {cardType === "business" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Profile, about me, business address, and multi-channel
                      networking links.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* B. DISPLAY TAB */}
            {activeTab === "display" && (
              <div data-tl="tab-content-display" className="space-y-4">
                {/* 1. Design Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">Design</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Pick a visual template for the card layout.
                  </p>
                  <div
                    data-tl="design-grid"
                    className="grid grid-cols-3 gap-2.5 pt-2.5"
                  >
                    {CARD_DESIGNS.map((d) => {
                      const isSelected = design === d.id;
                      return (
                        <div
                          key={d.id}
                          data-tl={`design-${d.id}`}
                          onClick={() => tl.setVar("ocxDesign", d.id)}
                          className={`rounded-xl border p-2.5 cursor-pointer text-center transition-all ${
                            isSelected
                              ? "border-[#7014D9] bg-purple-50/30 ring-1 ring-[#7014D9]"
                              : "border-[#E5E7EB] hover:border-gray-300"
                          }`}
                        >
                          <div className="h-9 w-full rounded-lg bg-gray-100 flex items-center justify-center mb-1 overflow-hidden">
                            <div
                              className="h-full w-full"
                              style={{
                                background:
                                  d.id === "purple"
                                    ? "#7014D9"
                                    : d.id === "midnight"
                                    ? "#1F2937"
                                    : d.id === "blend"
                                    ? "linear-gradient(135deg, #7014D9 0%, #2563EB 100%)"
                                    : "linear-gradient(180deg, #7014D9 40%, #FFFFFF 40%)",
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#111827] block truncate">
                            {d.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Profile Photo */}
                <div className="border-t border-gray-100 pt-3.5">
                  <h3 className="text-sm font-semibold text-[#111827]">
                    Profile Photo
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Add an avatar or portrait image for this card.
                  </p>

                  <div className="mt-2.5 flex items-center gap-4">
                    {photoAdded ? (
                      <div
                        data-tl="user-images-row"
                        className="flex items-center gap-3"
                      >
                        <div className="h-12 w-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-purple-100">
                          AM
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#111827]">
                            Alex Morgan (Portrait)
                          </p>
                          <button
                            type="button"
                            data-tl="btn-update-id-image"
                            onClick={() => tl.setVar("ocxPhotoModalOpen", true)}
                            className="text-xs text-[#7014D9] hover:underline font-medium mt-0.5"
                          >
                            Update ID image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        data-tl="btn-add-photo"
                        onClick={() => tl.setVar("ocxPhotoModalOpen", true)}
                        className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-xs font-medium text-[#374151] hover:border-[#7014D9] hover:text-[#7014D9] transition-colors"
                      >
                        <Icon name="plus" size={14} />
                        <span>Add Photo or Video</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Colors & Font */}
                <div className="border-t border-gray-100 pt-3.5 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827]">
                      Accent Color
                    </h3>
                    <div
                      data-tl="accent-colors-row"
                      className="flex items-center gap-1.5 mt-2"
                    >
                      {ACCENT_COLORS.map((c) => {
                        const isSelected = accentColor === c.hex;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            data-tl={`swatch-${c.id}`}
                            onClick={() => tl.setVar("ocxAccentColor", c.hex)}
                            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-purple-100/60 ring-2 ring-[#7014D9]"
                                : "hover:bg-gray-100"
                            }`}
                            title={c.name}
                          >
                            <span
                              className="h-5 w-5 rounded-full shadow-2xs"
                              style={{ backgroundColor: c.hex }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#111827]">Font</h3>
                    <div className="mt-1.5 max-w-xs">
                      <select
                        data-tl="select-font"
                        value={font}
                        onChange={(e) => tl.setVar("ocxFont", e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
                      >
                        <option value="Poppins (Default)">Poppins (Default)</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Logo & Badge */}
                <div className="border-t border-gray-100 pt-5 flex items-center gap-4">
                  {/* Logo Button */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#111827] mb-1.5">
                      Company Logo
                    </h4>
                    {logoAdded ? (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-[#7014D9] text-white flex items-center justify-center font-bold text-xs">
                          A
                        </div>
                        <button
                          type="button"
                          data-tl="btn-remove-logo"
                          onClick={() => tl.setVar("ocxLogoAdded", false)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        data-tl="btn-add-logo"
                        onClick={() => tl.setVar("ocxLogoModalOpen", true)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-gray-50"
                      >
                        <Icon name="plus" size={13} />
                        <span>Add Logo</span>
                      </button>
                    )}
                  </div>

                  {/* Badge Button */}
                  <div>
                    <h4 className="text-xs font-semibold text-[#111827] mb-1.5">
                      Badge <span className="text-[10px] text-[#7014D9] font-bold">[PRO]</span>
                    </h4>
                    {badgeAdded ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                          <Icon name="check" size={10} /> Verified
                        </span>
                        <button
                          type="button"
                          data-tl="btn-remove-badge"
                          onClick={() => tl.setVar("ocxBadgeAdded", false)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        data-tl="btn-add-badge"
                        onClick={() => tl.setVar("ocxBadgeModalOpen", true)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-gray-50"
                      >
                        <Icon name="plus" size={13} />
                        <span>Add Badge</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* C. INFORMATION TAB */}
            {activeTab === "information" && (
              <div data-tl="tab-content-information" className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">
                    ID Card — ID card details emphasized
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Configure names and job titles for members.
                  </p>
                </div>

                {/* Use own name checkbox */}
                <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-3.5">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      data-tl="checkbox-own-name"
                      checked={useOwnNameChecked}
                      onChange={(e) =>
                        tl.setVar("ocxUseOwnNameChecked", e.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#7014D9] focus:ring-[#7014D9]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#111827]">
                        Use each person&apos;s own name
                      </span>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">
                        When enabled, the card automatically inherits each employee&apos;s
                        profile identity in their view.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Personal Section */}
                <div
                  className={`space-y-3 transition-opacity ${
                    useOwnNameChecked ? "opacity-40 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#374151] uppercase tracking-wider">
                      Personal
                    </h4>
                    <button
                      type="button"
                      data-tl="link-select-profile"
                      className="text-xs font-semibold text-[#7014D9] hover:underline"
                    >
                      Select from profile
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        data-tl="input-first-name"
                        placeholder="Alex"
                        value={firstName}
                        onChange={(e) => tl.setVar("field:first-name", e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827] focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        data-tl="input-last-name"
                        placeholder="Morgan"
                        value={lastName}
                        onChange={(e) => tl.setVar("field:last-name", e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827] focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Section */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#374151] uppercase tracking-wider">
                    Work (Optional)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        data-tl="input-work-title"
                        defaultValue="Software Engineer"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B5563] mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        data-tl="input-work-company"
                        defaultValue="Acme Ltd"
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* D. FIELDS TAB */}
            {activeTab === "fields" && (
              <div data-tl="tab-content-fields" className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-[#111827]">Contact Fields</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Click any field to add it to your team&apos;s digital card.
                  </p>
                </div>

                {/* Search Box */}
                <div>
                  <input
                    type="text"
                    data-tl="input-search-fields"
                    placeholder="Search contact methods..."
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827] focus:border-[#7014D9]"
                  />
                </div>

                {/* Added Fields Inputs */}
                {(fieldWebsite || fieldInstagram || fieldEmail) && (
                  <div
                    data-tl="added-fields-container"
                    className="rounded-xl border border-purple-100 bg-purple-50/20 p-3.5 space-y-3"
                  >
                    <h4 className="text-xs font-bold text-[#7014D9] uppercase tracking-wider">
                      Added Fields
                    </h4>

                    {fieldWebsite && (
                      <div
                        data-tl="field-row-website"
                        className="flex items-center gap-2"
                      >
                        <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Icon name="globe" size={14} />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Website"
                          className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs text-[#111827]"
                        />
                      </div>
                    )}

                    {fieldInstagram && (
                      <div
                        data-tl="field-row-instagram"
                        className="flex items-center gap-2"
                      >
                        <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Icon name="edCamera" size={14} />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Instagram"
                          className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs text-[#111827]"
                        />
                      </div>
                    )}

                    {fieldEmail && (
                      <div
                        data-tl="field-row-email"
                        className="flex items-center gap-2"
                      >
                        <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Icon name="mail" size={14} />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs text-[#111827]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Additional Fields Chips */}
                <div>
                  <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Additional Fields (Click to add)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      data-tl="chip-website"
                      onClick={() => tl.setVar("ocxFieldWebsite", true)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                        fieldWebsite
                          ? "bg-purple-100 text-[#7014D9] border-[#7014D9]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon name="globe" size={12} />
                      <span>Website</span>
                    </button>

                    <button
                      type="button"
                      data-tl="chip-instagram"
                      onClick={() => tl.setVar("ocxFieldInstagram", true)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                        fieldInstagram
                          ? "bg-purple-100 text-[#7014D9] border-[#7014D9]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon name="edCamera" size={12} />
                      <span>Instagram</span>
                    </button>

                    <button
                      type="button"
                      data-tl="chip-email"
                      onClick={() => tl.setVar("ocxFieldEmail", true)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                        fieldEmail
                          ? "bg-purple-100 text-[#7014D9] border-[#7014D9]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon name="mail" size={12} />
                      <span>Email</span>
                    </button>

                    <button
                      type="button"
                      data-tl="chip-phone"
                      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    >
                      <Icon name="chat" size={12} />
                      <span>Phone</span>
                    </button>

                    <button
                      type="button"
                      data-tl="chip-linkedin"
                      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    >
                      <Icon name="edShare" size={12} />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Card Live Preview Pane (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-semibold text-[#6B7280]">Live Preview</span>
            <span className="text-[11px] text-[#9CA3AF]">Interactive card view</span>
          </div>

          {/* The Physical Digital Card Mockup */}
          <div
            data-tl="card-live-preview"
            className="w-full max-w-[340px] rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden relative"
          >
            {/* Header Accent Wave */}
            <div
              className="h-28 w-full relative transition-colors duration-300"
              style={{ backgroundColor: accentColor }}
            >
              {logoAdded && (
                <div className="absolute top-3 right-3 h-7 w-7 rounded-md bg-white/90 text-[#7014D9] flex items-center justify-center font-bold text-xs shadow-xs">
                  A
                </div>
              )}
            </div>

            {/* Avatar Circle */}
            <div className="relative px-5 pb-5">
              <div className="absolute -top-10 left-5">
                {photoAdded ? (
                  <div className="h-20 w-20 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">
                    AM
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center border-4 border-white shadow-md">
                    <Icon name="user" size={32} />
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="pt-12">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-base text-[#111827]">
                    {fullName}
                  </h4>
                  {badgeAdded && (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                      <Icon name="check" size={10} />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                  Software Engineer · Acme Ltd
                </p>

                {/* Dynamic Contact Action Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                  <div className="rounded-xl bg-purple-50 p-2 text-center text-xs font-semibold text-[#7014D9]">
                    Save Contact
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {fieldWebsite && (
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700">
                        <Icon name="globe" size={13} className="text-[#7014D9]" />
                        <span className="text-[11px] truncate">acme-studio.com</span>
                      </div>
                    )}
                    {fieldInstagram && (
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700">
                        <Icon name="edCamera" size={13} className="text-[#7014D9]" />
                        <span className="text-[11px] truncate">@alexmorgan</span>
                      </div>
                    )}
                    {fieldEmail && (
                      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700">
                        <Icon name="mail" size={13} className="text-[#7014D9]" />
                        <span className="text-[11px] truncate">alex.morgan@acme.com</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* QR Code footer stamp */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <span>identity.snaarp.com</span>
                  <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-[8px]">
                    QR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODALS */}
      {/* Modal A: Add Photo Or Video (Step 9) */}
      {photoModalOpen && (
        <div
          data-tl="modal-add-photo-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
        >
          <div
            data-tl="modal-add-photo"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-semibold text-[#111827]">
                Add Photo Or Video
              </h3>
              <button
                type="button"
                data-tl="btn-cancel-photo-x"
                onClick={() => tl.setVar("ocxPhotoModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="py-4 text-center">
              {photoChooserOpen ? (
                /* In-app file chooser sheet (replaces Windows OS file dialog) */
                <div
                  data-tl="in-app-file-chooser"
                  className="rounded-xl border border-purple-200 bg-purple-50/40 p-4 text-left space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#7014D9]">
                      Select Sample Portrait
                    </span>
                    <span className="text-[10px] text-gray-500">In-app Picker</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {SAMPLE_PORTRAITS.map((p) => (
                      <div
                        key={p.id}
                        data-tl={`picker-photo-${p.id}`}
                        onClick={() => {
                          tl.setVar("ocxPhotoAdded", true);
                          tl.setVar("ocxPhotoChooserOpen", false);
                        }}
                        className="flex flex-col items-center p-2 rounded-lg bg-white border border-gray-200 hover:border-[#7014D9] cursor-pointer transition-colors"
                      >
                        <div
                          className="h-10 w-10 rounded-full text-white flex items-center justify-center font-bold text-xs mb-1"
                          style={{ backgroundColor: p.color }}
                        >
                          {p.initials}
                        </div>
                        <span className="text-[9px] font-medium text-gray-700 text-center truncate w-full">
                          {p.name.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : photoAdded ? (
                <div className="py-2 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xl mb-2 shadow-sm">
                    AM
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    Alex Morgan (Formal)
                  </span>
                  <button
                    type="button"
                    data-tl="btn-remove-selected-photo"
                    onClick={() => tl.setVar("ocxPhotoAdded", false)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-purple-50 text-[#7014D9] flex items-center justify-center mb-2">
                    <Icon name="edImage" size={20} />
                  </div>
                  <p className="text-xs font-medium text-gray-700">
                    Upload an image or video or drag and drop, or paste it here
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    The maximum file size is 20MB
                  </p>
                  <button
                    type="button"
                    data-tl="btn-choose-file"
                    onClick={() => tl.setVar("ocxPhotoChooserOpen", true)}
                    className="mt-4 rounded-xl border border-gray-300 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs"
                  >
                    Choose File
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
              <button
                type="button"
                data-tl="btn-cancel-photo-modal"
                onClick={() => tl.setVar("ocxPhotoModalOpen", false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-add-media"
                onClick={() => {
                  tl.setVar("ocxPhotoUploading", false);
                  tl.setVar("ocxPhotoModalOpen", false);
                }}
                disabled={!photoAdded || photoUploading}
                className="rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] disabled:opacity-50"
              >
                {photoUploading ? "Uploading..." : "Add Media"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal B: Add Logo (Step 11) */}
      {logoModalOpen && (
        <div
          data-tl="modal-add-logo-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
        >
          <div
            data-tl="modal-add-logo"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-semibold text-[#111827]">Add Logo</h3>
              <button
                type="button"
                data-tl="btn-cancel-logo-x"
                onClick={() => tl.setVar("ocxLogoModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="py-4 text-center">
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-purple-50 text-[#7014D9] flex items-center justify-center mb-2">
                  <Icon name="p360" size={20} />
                </div>
                <p className="text-xs font-medium text-gray-700">Upload A Logo</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Recommended Size: 512 x 512 pixels · 20MB max file size
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {SAMPLE_LOGOS.map((logo) => (
                    <button
                      key={logo.id}
                      type="button"
                      data-tl={`btn-choose-logo-${logo.id}`}
                      onClick={() => {
                        tl.setVar("ocxLogoAdded", true);
                        tl.setVar("ocxLogoModalOpen", false);
                      }}
                      className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-purple-100"
                    >
                      {logo.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
              <button
                type="button"
                data-tl="btn-cancel-logo-modal"
                onClick={() => tl.setVar("ocxLogoModalOpen", false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal C: Add Badge (Step 12) */}
      {badgeModalOpen && (
        <div
          data-tl="modal-add-badge-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
        >
          <div
            data-tl="modal-add-badge"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-semibold text-[#111827]">
                Add Badge <span className="text-xs text-[#7014D9]">[PRO]</span>
              </h3>
              <button
                type="button"
                data-tl="btn-cancel-badge-x"
                onClick={() => tl.setVar("ocxBadgeModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-gray-600">
                Choose a verification or role badge to display on this card.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-tl="btn-badge-verified"
                  onClick={() => {
                    tl.setVar("ocxBadgeAdded", true);
                    tl.setVar("ocxBadgeModalOpen", false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 hover:border-[#7014D9] hover:bg-purple-50/30 text-left transition-colors"
                >
                  <span className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Icon name="check" size={12} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Verified</p>
                    <p className="text-[10px] text-gray-500">Official company ID</p>
                  </div>
                </button>

                <button
                  type="button"
                  data-tl="btn-badge-staff"
                  onClick={() => {
                    tl.setVar("ocxBadgeAdded", true);
                    tl.setVar("ocxBadgeModalOpen", false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 hover:border-[#7014D9] hover:bg-purple-50/30 text-left transition-colors"
                >
                  <span className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Icon name="p360" size={12} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Staff</p>
                    <p className="text-[10px] text-gray-500">Internal employee</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-gray-100 pt-3">
              <button
                type="button"
                data-tl="btn-cancel-badge-modal"
                onClick={() => tl.setVar("ocxBadgeModalOpen", false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
