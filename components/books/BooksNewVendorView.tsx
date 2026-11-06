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
import { ArrowLeft, Home, ChevronRight, X, Plus } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksNewVendorView({ tl }: Props) {
  const currentTab = useTimelineVar<string>(tl, "booksNewVendorTab", "other");
  const salutation = useTimelineVar<string>(tl, "booksNewVendorSalutation", "");
  const firstName = useTimelineVar<string>(tl, "booksNewVendorFirstName", "");
  const lastName = useTimelineVar<string>(tl, "booksNewVendorLastName", "");
  const companyName = useTimelineVar<string>(tl, "booksNewVendorCompanyName", "");
  const displayName = useTimelineVar<string>(tl, "booksNewVendorDisplayName", "");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const email = useTimelineVar<string>(tl, "booksNewVendorEmail", "");
  const workPhone = useTimelineVar<string>(tl, "booksNewVendorWorkPhone", "");
  const mobile = useTimelineVar<string>(tl, "booksNewVendorMobile", "");
  const language = useTimelineVar<string>(tl, "booksNewVendorLanguage", "English");

  // Other Details tab
  const taxRate = useTimelineVar<string>(tl, "booksNewVendorTaxRate", "Select a Tax");
  const companyId = useTimelineVar<string>(tl, "booksNewVendorCompanyId", "");
  const currency = "GBP- British Pound";
  const accountsPayable = useTimelineVar<string>(tl, "booksNewVendorAccountsPayable", "Select an account");
  const openingBalance = useTimelineVar<string>(tl, "booksNewVendorOpeningBalance", "");
  const paymentTerms = useTimelineVar<string>(tl, "booksNewVendorPaymentTerms", "Due on Receipt");
  const enablePortal = useTimelineVar<boolean>(tl, "booksNewVendorEnablePortal", false);

  // Address tab
  const [attention, setAttention] = useState("");
  const country = useTimelineVar<string>(tl, "booksNewVendorCountry", "");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const address = useTimelineVar<string>(tl, "booksNewVendorAddress", "");
  const [street2, setStreet2] = useState("");
  const city = useTimelineVar<string>(tl, "booksNewVendorCity", "");
  const state = useTimelineVar<string>(tl, "booksNewVendorState", "Aberdeen");
  const zip = useTimelineVar<string>(tl, "booksNewVendorZip", "");
  const addressPhone = useTimelineVar<string>(tl, "booksNewVendorAddressPhone", "");
  const fax = useTimelineVar<string>(tl, "booksNewVendorFax", "");

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
              <select
                data-tl="select-vendor-salutation"
                value={salutation}
                onChange={(e) => {
                  tl.setVar("booksNewVendorSalutation", e.target.value);
                }}
                className="w-28 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <option value="">Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Miss">Miss</option>
                <option value="Dr.">Dr.</option>
              </select>
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
                <div className="flex items-center gap-1 px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-700 shrink-0">
                  <span>GB +44</span>
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
                <select
                  data-tl="select-vendor-tax-rate"
                  value={taxRate}
                  onChange={(e) => {
                    tl.setVar("booksNewVendorTaxRate", e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
                >
                  <option value="Select a Tax">Select a Tax</option>
                  <option value="No Tax">No Tax</option>
                  <option value="VAT Standard (20%)">VAT Standard (20%)</option>
                </select>
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
              <select
                data-tl="select-vendor-accounts-payable"
                value={accountsPayable}
                onChange={(e) => {
                  tl.setVar("booksNewVendorAccountsPayable", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <option value="Select an account">Select an account</option>
                <option value="Accounts Payable">Accounts Payable</option>
              </select>
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
              <select
                data-tl="select-vendor-new-payment-terms"
                value={paymentTerms}
                onChange={(e) => {
                  tl.setVar("booksNewVendorPaymentTerms", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
              </select>
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
                onChange={(e) => setStreet2(e.target.value)}
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
              <select
                data-tl="select-vendor-state"
                value={state}
                onChange={(e) => {
                  tl.setVar("booksNewVendorState", e.target.value);
                }}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#7014D9] cursor-pointer"
              >
                <option value="Aberdeen">Aberdeen</option>
                <option value="Greater London">Greater London</option>
                <option value="West Yorkshire">West Yorkshire</option>
              </select>
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
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          data-tl={`input-cp-first-name-${idx}`}
                          value={cp.firstName}
                          onChange={(e) => {
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
                          value={cp.lastName}
                          onChange={(e) => {
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
                          value={cp.email}
                          onChange={(e) => {
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
                            value={cp.workPhone}
                            onChange={(e) => {
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
                            value={cp.mobile}
                            onChange={(e) => {
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
