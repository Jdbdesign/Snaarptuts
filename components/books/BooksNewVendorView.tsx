"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  INITIAL_VENDORS,
  type VendorItem,
  type VendorContactPerson,
} from "./books-data";
import { ArrowLeft, Home, ChevronRight, ChevronDown, X, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewVendorView({ tl }: Props) {
  const currentTab = useTimelineVar<string>(tl, "booksNewVendorTab", "other");
  const salutation = useTimelineVar<string>(tl, "booksNewVendorSalutation", "");
  const isSalutationOpen = useTimelineVar<boolean>(tl, "booksNewVendorSalutationOpen", false);
  const firstName = useTimelineVar<string>(tl, "booksNewVendorFirstName", "");
  const lastName = useTimelineVar<string>(tl, "booksNewVendorLastName", "");
  const companyName = useTimelineVar<string>(tl, "booksNewVendorCompanyName", "");
  const displayName = useTimelineVar<string>(tl, "booksNewVendorDisplayName", "");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const email = useTimelineVar<string>(tl, "booksNewVendorEmail", "");
  const workPhone = useTimelineVar<string>(tl, "booksNewVendorWorkPhone", "");
  const mobile = useTimelineVar<string>(tl, "booksNewVendorMobile", "");
  const isPhoneCountryOpen = useTimelineVar<boolean>(tl, "booksNewVendorPhoneCountryOpen", false);
  const language = useTimelineVar<string>(tl, "booksNewVendorLanguage", "English");

  // Other Details tab
  const taxRate = useTimelineVar<string>(tl, "booksNewVendorTaxRate", "Select a Tax");
  const isTaxRateOpen = useTimelineVar<boolean>(tl, "booksNewVendorTaxRateOpen", false);
  const companyId = useTimelineVar<string>(tl, "booksNewVendorCompanyId", "");
  const currency = "GBP- British Pound";
  const accountsPayable = useTimelineVar<string>(tl, "booksNewVendorAccountsPayable", "Select an account");
  const isAccountsPayableOpen = useTimelineVar<boolean>(tl, "booksNewVendorAccountsPayableOpen", false);
  const openingBalance = useTimelineVar<string>(tl, "booksNewVendorOpeningBalance", "");
  const paymentTerms = useTimelineVar<string>(tl, "booksNewVendorPaymentTerms", "Due on Receipt");
  const isPaymentTermsOpen = useTimelineVar<boolean>(tl, "booksNewVendorPaymentTermsOpen", false);
  const enablePortal = useTimelineVar<boolean>(tl, "booksNewVendorEnablePortal", false);

  // Address tab
  const [attention, setAttention] = useState("");
  const country = useTimelineVar<string>(tl, "booksNewVendorCountry", "");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const address = useTimelineVar<string>(tl, "booksNewVendorAddress", "");
  const street2 = useTimelineVar<string>(tl, "booksNewVendorStreet2", "");
  const city = useTimelineVar<string>(tl, "booksNewVendorCity", "");
  const state = useTimelineVar<string>(tl, "booksNewVendorState", "Aberdeen");
  const isStateOpen = useTimelineVar<boolean>(tl, "booksNewVendorStateOpen", false);
  const zip = useTimelineVar<string>(tl, "booksNewVendorZip", "");
  const addressPhone = useTimelineVar<string>(tl, "booksNewVendorAddressPhone", "");
  const fax = useTimelineVar<string>(tl, "booksNewVendorFax", "");

  // Contact Persons tab
  const isCpSalutationOpen = useTimelineVar<boolean>(tl, "booksNewVendorCpSalutationOpen", false);
  const cpSalutation = useTimelineVar<string>(tl, "booksCpSalutation", "Mr.");
  const cpFirstName = useTimelineVar<string>(tl, "booksCpFirstName", "");
  const cpLastName = useTimelineVar<string>(tl, "booksCpLastName", "");
  const cpEmail = useTimelineVar<string>(tl, "booksCpEmail", "");
  const cpWorkPhone = useTimelineVar<string>(tl, "booksCpWorkPhone", "");
  const cpMobile = useTimelineVar<string>(tl, "booksCpMobile", "");

  // Contact Persons tab
  const [contactPersons, setContactPersons] = useState<VendorContactPerson[]>([
    {
      id: "cp-0",
      salutation: "Mr.",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
    },
  ]);

  const handleBack = () => {
    tl.setVar("booksView", "vendors");
    tl.setUrl(BOOKS_URLS.vendors);
  };

  const handleSave = () => {
    const finalName = displayName || companyName || `${firstName} ${lastName}`.trim() || "Harbour Logistics Ltd";
    const newVendor: VendorItem = {
      id: "vend-harbour",
      name: finalName,
      email: email || "daniel@example.com",
      phone: workPhone ? `+44 ${workPhone}` : "+44 20 7946 0812",
      paymentTerms: paymentTerms || "Net 30",
      status: "Active",
      salutation: salutation || "Mr.",
      firstName: firstName || "Daniel",
      lastName: lastName || "Brooks",
      companyName: companyName || "Harbour Logistics Ltd",
      displayName: finalName,
      workPhone: workPhone || "20 7946 0812",
      mobile: mobile || "7700 900543",
      language,
      taxRate: taxRate === "Select a Tax" ? "VAT Standard (20%)" : taxRate,
      companyId: companyId || "HL-2026",
      currency,
      accountsPayable: accountsPayable === "Select an account" ? "Accounts Payable" : accountsPayable,
      openingBalance: openingBalance || "1000",
      enablePortal,
      attention,
      country: country || "United Kingdom",
      address: address || "10 Acme Street",
      street2,
      city: city || "London",
      state: state || "Aberdeen",
      zipCode: zip || "EC1A 1AA",
      fax: fax || "020 7946 0999",
      taxIdentification: "GB 123 4567 89",
      notes: "Logistics and warehousing partner",
      contactPersons,
    };

    const currentVendors = tl.getVar<VendorItem[]>("booksVendors", INITIAL_VENDORS);
    tl.setVar("booksVendors", [newVendor, ...currentVendors]);
    tl.setVar("booksToastText", "Vendor created successfully");
    tl.setVar("booksToastOpen", true);
    tl.setVar("booksView", "vendors");
    tl.setUrl(BOOKS_URLS.vendors);
  };

  return (
    <div
      data-tl="books-new-vendor-view"
      data-scroller="true"
      className="flex-1 overflow-y-auto bg-white p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            type="button"
            data-tl="btn-back-to-vendors"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>|</span>
          <Home className="w-3.5 h-3.5 text-gray-400" />
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span>Vendors</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-medium">New</span>
        </div>

        {/* Title */}
        <h1
          data-tl="title-new-vendor"
          className="text-xl font-bold text-gray-900 pt-1"
        >
          New Vendor
        </h1>

        {/* Form Main Grid */}
        <div className="space-y-4 pt-2">
          {/* Primary Contact */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Primary Contact
            </label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-vendor-salutation"
                  onClick={() => tl.setVar("booksNewVendorSalutationOpen", !isSalutationOpen)}
                  className="w-28 flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{salutation || "Salutation"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isSalutationOpen && (
                  <div
                    data-tl="dropdown-vendor-salutation"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "Mr.", id: "mr" },
                      { label: "Mrs.", id: "mrs" },
                      { label: "Ms.", id: "ms" },
                      { label: "Miss", id: "miss" },
                      { label: "Dr.", id: "dr" },
                    ].map((sal) => (
                      <button
                        key={sal.id}
                        type="button"
                        data-tl={`opt-salutation-${sal.id}`}
                        onClick={() => {
                          tl.setVar("booksNewVendorSalutation", sal.label);
                          tl.setVar("booksNewVendorSalutationOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          salutation === sal.label
                            ? "text-[#7014D9] font-medium bg-purple-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {sal.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                data-tl="input-vendor-first-name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  tl.setVar("booksNewVendorFirstName", e.target.value);
                }}
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
              <input
                type="text"
                data-tl="input-vendor-last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  tl.setVar("booksNewVendorLastName", e.target.value);
                }}
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              data-tl="input-vendor-company-name"
              value={companyName}
              onChange={(e) => {
                tl.setVar("booksNewVendorCompanyName", e.target.value);
                if (e.target.value) {
                  setShowSuggestion(true);
                }
              }}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          {/* Display Name* */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4 relative">
            <label className="text-xs font-medium text-gray-700">
              Display Name<span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <input
                type="text"
                data-tl="input-vendor-display-name"
                placeholder="Select or type to add"
                value={displayName}
                onFocus={() => {
                  if (companyName) setShowSuggestion(true);
                }}
                onChange={(e) => {
                  tl.setVar("booksNewVendorDisplayName", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />

              {/* Suggestion Bubble */}
              {(showSuggestion || (Boolean(companyName) && !displayName)) && (
                <div
                  data-tl="bubble-vendor-display-name-suggestion"
                  onClick={() => {
                    const chosen = companyName || "Harbour Logistics Ltd";
                    tl.setVar("booksNewVendorDisplayName", chosen);
                    setShowSuggestion(false);
                  }}
                  className="absolute left-0 -bottom-8 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#374151] text-white text-xs rounded-md shadow-md cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <span>{companyName || "Harbour Logistics Ltd"}</span>
                  <X
                    className="w-3.5 h-3.5 text-gray-400 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSuggestion(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              data-tl="input-vendor-email-address"
              value={email}
              onChange={(e) => {
                tl.setVar("booksNewVendorEmail", e.target.value);
              }}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
            />
          </div>

          {/* Phone (Work and Mobile) */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4">
            <label className="text-xs font-medium text-gray-700">Phone</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    data-tl="btn-vendor-phone-country"
                    onClick={() => tl.setVar("booksNewVendorPhoneCountryOpen", !isPhoneCountryOpen)}
                    className="flex items-center gap-1 px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0 cursor-pointer"
                  >
                    <span>GB +44</span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>
                  {isPhoneCountryOpen && (
                    <div
                      data-tl="dropdown-vendor-phone-country"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      <button
                        type="button"
                        data-tl="opt-country-gb"
                        onClick={() => tl.setVar("booksNewVendorPhoneCountryOpen", false)}
                        className="w-full px-3 py-1.5 text-left text-xs text-[#2563EB] font-medium bg-[#EFF6FF] cursor-pointer"
                      >
                        GB +44
                      </button>
                      <button
                        type="button"
                        data-tl="opt-country-us"
                        onClick={() => tl.setVar("booksNewVendorPhoneCountryOpen", false)}
                        className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        US +1
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  data-tl="input-vendor-work-phone"
                  placeholder="Work Phone"
                  value={workPhone}
                  onChange={(e) => {
                    tl.setVar("booksNewVendorWorkPhone", e.target.value);
                  }}
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex items-center gap-1 px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0">
                  <span>GB +44</span>
                </div>
                <input
                  type="text"
                  data-tl="input-vendor-mobile"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => {
                    tl.setVar("booksNewVendorMobile", e.target.value);
                  }}
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>
          </div>

          {/* Vendor Language */}
          <div className="grid grid-cols-[180px_1fr] items-center gap-4">
            <label className="text-xs font-medium text-gray-700">
              Vendor Language
            </label>
            <select
              data-tl="select-vendor-language"
              value={language}
              onChange={(e) => tl.setVar("booksNewVendorLanguage", e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="border-b border-gray-200 pt-4">
          <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
            <button
              type="button"
              data-tl="tab-vendor-other-details"
              onClick={() => tl.setVar("booksNewVendorTab", "other")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "other"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Other Details
            </button>
            <button
              type="button"
              data-tl="tab-vendor-address"
              onClick={() => tl.setVar("booksNewVendorTab", "address")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "address"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Address
            </button>
            <button
              type="button"
              data-tl="tab-vendor-contact-persons"
              onClick={() => tl.setVar("booksNewVendorTab", "contacts")}
              className={`pb-3 transition-colors cursor-pointer ${
                currentTab === "contacts"
                  ? "border-b-2 border-[#2563EB] text-[#2563EB] font-semibold"
                  : "hover:text-gray-700"
              }`}
            >
              Contact Persons
            </button>
            <button
              type="button"
              data-tl="tab-vendor-custom-fields"
              className="pb-3 text-gray-400 cursor-not-allowed"
            >
              Custom Fields
            </button>
            <button
              type="button"
              data-tl="tab-vendor-reporting-tags"
              className="pb-3 text-gray-400 cursor-not-allowed"
            >
              Reporting Tags
            </button>
            <button
              type="button"
              data-tl="tab-vendor-remarks"
              className="pb-3 text-gray-400 cursor-not-allowed"
            >
              Remarks
            </button>
          </div>
        </div>

        {/* Tab 1: Other Details */}
        {currentTab === "other" && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-[180px_1fr] items-start gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Tax Rate
                </label>
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-vendor-tax-rate"
                    onClick={() => tl.setVar("booksNewVendorTaxRateOpen", !isTaxRateOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
                  >
                    <span>{taxRate}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {isTaxRateOpen && (
                    <div
                      data-tl="dropdown-vendor-tax-rate"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      <button
                        type="button"
                        data-tl="opt-tax-select"
                        onClick={() => {
                          tl.setVar("booksNewVendorTaxRate", "Select a Tax");
                          tl.setVar("booksNewVendorTaxRateOpen", false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Select a Tax
                      </button>
                      <button
                        type="button"
                        data-tl="opt-tax-no-tax"
                        onClick={() => {
                          tl.setVar("booksNewVendorTaxRate", "No Tax");
                          tl.setVar("booksNewVendorTaxRateOpen", false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        No Tax
                      </button>
                      <button
                        type="button"
                        data-tl="opt-tax-vat-20"
                        onClick={() => {
                          tl.setVar("booksNewVendorTaxRate", "VAT Standard (20%)");
                          tl.setVar("booksNewVendorTaxRateOpen", false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs text-[#7014D9] font-medium bg-purple-50 cursor-pointer"
                      >
                        VAT Standard (20%)
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">
                  To associate more than one tax, you need to create a tax group in Settings.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Company ID
              </label>
              <input
                type="text"
                data-tl="input-vendor-company-id"
                value={companyId}
                onChange={(e) => {
                  tl.setVar("booksNewVendorCompanyId", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Currency
              </label>
              <select
                disabled
                value={currency}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none"
              >
                <option value="GBP- British Pound">GBP- British Pound</option>
              </select>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Accounts Payable
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-vendor-accounts-payable"
                  onClick={() => tl.setVar("booksNewVendorAccountsPayableOpen", !isAccountsPayableOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{accountsPayable}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isAccountsPayableOpen && (
                  <div
                    data-tl="dropdown-vendor-accounts-payable"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    <button
                      type="button"
                      data-tl="opt-ap-select"
                      onClick={() => {
                        tl.setVar("booksNewVendorAccountsPayable", "Select an account");
                        tl.setVar("booksNewVendorAccountsPayableOpen", false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Select an account
                    </button>
                    <button
                      type="button"
                      data-tl="opt-ap-accounts-payable"
                      onClick={() => {
                        tl.setVar("booksNewVendorAccountsPayable", "Accounts Payable");
                        tl.setVar("booksNewVendorAccountsPayableOpen", false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-[#7014D9] font-medium bg-purple-50 cursor-pointer"
                    >
                      Accounts Payable
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Opening Balance
              </label>
              <input
                type="text"
                data-tl="input-vendor-opening-balance"
                placeholder="0.00"
                value={openingBalance}
                onChange={(e) => {
                  tl.setVar("booksNewVendorOpeningBalance", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Payment Terms
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-vendor-new-payment-terms"
                  onClick={() => tl.setVar("booksNewVendorPaymentTermsOpen", !isPaymentTermsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{paymentTerms}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isPaymentTermsOpen && (
                  <div
                    data-tl="dropdown-vendor-new-payment-terms"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "Due on Receipt", id: "due-on-receipt" },
                      { label: "Net 15", id: "net15" },
                      { label: "Net 30", id: "net30" },
                      { label: "Net 45", id: "net45" },
                      { label: "Net 60", id: "net60" },
                    ].map((term) => (
                      <button
                        key={term.id}
                        type="button"
                        data-tl={`opt-terms-${term.id}`}
                        onClick={() => {
                          tl.setVar("booksNewVendorPaymentTerms", term.label);
                          tl.setVar("booksNewVendorPaymentTermsOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          paymentTerms === term.label
                            ? "text-[#7014D9] font-medium bg-purple-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {term.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Enable Portal?
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  data-tl="check-vendor-enable-portal"
                  checked={enablePortal}
                  onChange={(e) => {
                    tl.setVar("booksNewVendorEnablePortal", e.target.checked);
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>Allow portal access for this vendor</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="text-xs text-[#2563EB] hover:underline"
              >
                Add more details
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Address */}
        {currentTab === "address" && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Attention
              </label>
              <input
                type="text"
                data-tl="input-vendor-attention"
                value={attention}
                onChange={(e) => setAttention(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4 relative">
              <label className="text-xs font-medium text-gray-700">
                Country/Region
              </label>
              <div className="relative w-full">
                <button
                  type="button"
                  data-tl="select-vendor-country"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{country ? `GB ${country}` : "Select Country/Region"}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-90" />
                </button>

                {countryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-2">
                    <input
                      type="text"
                      data-tl="input-country-search"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-[#2563EB]"
                    />
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      <div
                        data-tl="country-opt-uk"
                        onClick={() => {
                          tl.setVar("booksNewVendorCountry", "United Kingdom");
                          setCountryDropdownOpen(false);
                        }}
                        className="px-2.5 py-1.5 text-xs hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded cursor-pointer"
                      >
                        GB United Kingdom
                      </div>
                      <div
                        onClick={() => {
                          setCountryDropdownOpen(false);
                        }}
                        className="px-2.5 py-1.5 text-xs hover:bg-gray-100 rounded cursor-pointer"
                      >
                        US United States
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Address
              </label>
              <textarea
                rows={2}
                data-tl="input-vendor-street"
                value={address}
                onChange={(e) => {
                  tl.setVar("booksNewVendorAddress", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] resize-none"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Street 2
              </label>
              <textarea
                rows={2}
                data-tl="input-vendor-street2"
                value={street2}
                onChange={(e) => tl.setVar("booksNewVendorStreet2", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] resize-none"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                data-tl="input-vendor-city"
                value={city}
                onChange={(e) => {
                  tl.setVar("booksNewVendorCity", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                State
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-vendor-state"
                  onClick={() => tl.setVar("booksNewVendorStateOpen", !isStateOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-left focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{state}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isStateOpen && (
                  <div
                    data-tl="dropdown-vendor-state"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {[
                      { label: "Aberdeen", id: "aberdeen" },
                      { label: "Greater London", id: "greater-london" },
                      { label: "West Yorkshire", id: "west-yorkshire" },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        data-tl={`opt-state-${st.id}`}
                        onClick={() => {
                          tl.setVar("booksNewVendorState", st.label);
                          tl.setVar("booksNewVendorStateOpen", false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs cursor-pointer ${
                          state === st.label
                            ? "text-[#7014D9] font-medium bg-purple-50"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                data-tl="input-vendor-zip"
                value={zip}
                onChange={(e) => {
                  tl.setVar("booksNewVendorZip", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Phone
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0">
                  <span>GB +44</span>
                </div>
                <input
                  type="text"
                  data-tl="input-vendor-address-phone"
                  value={addressPhone}
                  onChange={(e) => {
                    tl.setVar("booksNewVendorAddressPhone", e.target.value);
                  }}
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <label className="text-xs font-medium text-gray-700">
                Fax Number
              </label>
              <input
                type="text"
                data-tl="input-vendor-fax"
                value={fax}
                onChange={(e) => {
                  tl.setVar("booksNewVendorFax", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9]"
              />
            </div>

            {/* Yellow Note Box */}
            <div className="mt-6 rounded-lg bg-[#FEFCE8] border border-[#FEF08A] p-4 text-xs text-[#854D0E] space-y-1">
              <div className="font-semibold text-[#713F12]">Note:</div>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                <li>Add and manage additional addresses from the Vendor details section.</li>
                <li>You can customise how vendor addresses are displayed in transaction PDFs from Settings &gt; Preferences &gt; Vendors.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Contact Persons */}
        {currentTab === "contacts" && (
          <div className="space-y-4 pt-2">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] border-b border-gray-200 text-gray-500 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">SALUTATION</th>
                    <th className="py-2.5 px-3">FIRST NAME</th>
                    <th className="py-2.5 px-3">LAST NAME</th>
                    <th className="py-2.5 px-3">EMAIL ADDRESS</th>
                    <th className="py-2.5 px-3">WORK PHONE</th>
                    <th className="py-2.5 px-3">MOBILE</th>
                    <th className="py-2.5 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contactPersons.map((cp, idx) => (
                    <tr key={cp.id}>
                      <td className="p-2">
                        {idx === 0 ? (
                          <div className="relative">
                            <button
                              type="button"
                              data-tl="select-cp-salutation-0"
                              onClick={() => tl.setVar("booksNewVendorCpSalutationOpen", !isCpSalutationOpen)}
                              className="w-full flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB] cursor-pointer"
                            >
                              <span>{cpSalutation || "Salutation"}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </button>

                            {isCpSalutationOpen && (
                              <div
                                data-tl="dropdown-cp-salutation-0"
                                className="absolute left-0 top-[calc(100%+4px)] z-30 w-24 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                              >
                                {[
                                  { label: "Mr.", id: "mr" },
                                  { label: "Mrs.", id: "mrs" },
                                  { label: "Ms.", id: "ms" },
                                ].map((sal) => (
                                  <button
                                    key={sal.id}
                                    type="button"
                                    data-tl={`opt-cp-salutation-${sal.id}`}
                                    onClick={() => {
                                      tl.setVar("booksCpSalutation", sal.label);
                                      tl.setVar("booksNewVendorCpSalutationOpen", false);
                                    }}
                                    className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] cursor-pointer"
                                  >
                                    {sal.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <select
                            data-tl={`input-cp-salutation-${idx}`}
                            value={cp.salutation}
                            onChange={(e) => {
                              const updated = [...contactPersons];
                              updated[idx].salutation = e.target.value;
                              setContactPersons(updated);
                            }}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          >
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                          </select>
                        )}
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          data-tl={`input-cp-first-name-${idx}`}
                          value={idx === 0 ? cpFirstName : cp.firstName}
                          onChange={(e) => {
                            if (idx === 0) tl.setVar("booksCpFirstName", e.target.value);
                            const updated = [...contactPersons];
                            updated[idx].firstName = e.target.value;
                            setContactPersons(updated);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          data-tl={`input-cp-last-name-${idx}`}
                          value={idx === 0 ? cpLastName : cp.lastName}
                          onChange={(e) => {
                            if (idx === 0) tl.setVar("booksCpLastName", e.target.value);
                            const updated = [...contactPersons];
                            updated[idx].lastName = e.target.value;
                            setContactPersons(updated);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="email"
                          data-tl={`input-cp-email-${idx}`}
                          value={idx === 0 ? cpEmail : cp.email}
                          onChange={(e) => {
                            if (idx === 0) tl.setVar("booksCpEmail", e.target.value);
                            const updated = [...contactPersons];
                            updated[idx].email = e.target.value;
                            setContactPersons(updated);
                          }}
                          className="w-full px-2 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <span className="text-[10px] bg-gray-100 border border-gray-200 px-1 py-1 rounded text-gray-500">
                            +44
                          </span>
                          <input
                            type="text"
                            data-tl={`input-cp-work-phone-${idx}`}
                            value={idx === 0 ? cpWorkPhone : cp.workPhone}
                            onChange={(e) => {
                              if (idx === 0) tl.setVar("booksCpWorkPhone", e.target.value);
                              const updated = [...contactPersons];
                              updated[idx].workPhone = e.target.value;
                              setContactPersons(updated);
                            }}
                            className="w-24 px-1.5 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <span className="text-[10px] bg-gray-100 border border-gray-200 px-1 py-1 rounded text-gray-500">
                            +44
                          </span>
                          <input
                            type="text"
                            data-tl={`input-cp-mobile-${idx}`}
                            value={idx === 0 ? cpMobile : cp.mobile}
                            onChange={(e) => {
                              if (idx === 0) tl.setVar("booksCpMobile", e.target.value);
                              const updated = [...contactPersons];
                              updated[idx].mobile = e.target.value;
                              setContactPersons(updated);
                            }}
                            className="w-24 px-1.5 py-1.5 border border-gray-200 rounded bg-white text-xs focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          data-tl={`btn-remove-cp-${idx}`}
                          onClick={() => {
                            if (contactPersons.length > 1) {
                              setContactPersons(contactPersons.filter((_, i) => i !== idx));
                            }
                          }}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              data-tl="btn-add-contact-person"
              onClick={() => {
                setContactPersons([
                  ...contactPersons,
                  {
                    id: `cp-${contactPersons.length}`,
                    salutation: "Mr.",
                    firstName: "",
                    lastName: "",
                    email: "",
                    workPhone: "",
                    mobile: "",
                  },
                ]);
              }}
              className="flex items-center gap-1.5 text-xs text-[#2563EB] hover:underline pt-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Contact Person</span>
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-save-vendor"
            onClick={handleSave}
            className="px-6 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            Save
          </button>
          <button
            type="button"
            data-tl="btn-cancel-new-vendor"
            onClick={handleBack}
            className="px-5 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
