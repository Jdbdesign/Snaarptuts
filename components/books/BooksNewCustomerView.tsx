"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ChevronDown,
  Plus,
  X,
  RotateCw,
} from "lucide-react";
import {
  type CustomerItem,
  type ContactPerson,
  COUNTRY_CODES,
  UK_REGIONS,
  SALUTATIONS,
  PAYMENT_TERMS,
  TAX_RATES,
  BOOKS_URLS,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksNewCustomerView({ tl }: Props) {
  // Global form variables driven by timeline or local fallback
  const custType = useTimelineVar<"business" | "individual">(
    tl,
    "booksNewCustomerType",
    "business"
  );
  const activeTab = useTimelineVar<
    "other" | "address" | "contact" | "custom" | "reporting" | "remarks"
  >(tl, "booksNewCustomerTab", "other");

  // Form field states
  const salutation = useTimelineVar<string>(tl, "booksCustSalutation", "Mr.");
  const firstName = useTimelineVar<string>(tl, "booksCustFirstName", "");
  const lastName = useTimelineVar<string>(tl, "booksCustLastName", "");
  const companyName = useTimelineVar<string>(tl, "booksCustCompanyName", "");
  const displayName = useTimelineVar<string>(tl, "booksCustDisplayName", "");
  const email = useTimelineVar<string>(tl, "booksCustEmail", "");
  const workPhoneCode = useTimelineVar<string>(tl, "booksCustWorkPhoneCode", "+44");
  const workPhone = useTimelineVar<string>(tl, "booksCustWorkPhone", "");
  const mobilePhoneCode = useTimelineVar<string>(tl, "booksCustMobilePhoneCode", "+44");
  const mobilePhone = useTimelineVar<string>(tl, "booksCustMobilePhone", "");
  const language = useTimelineVar<string>(tl, "booksCustLanguage", "English");

  // Other Details
  const taxRate = useTimelineVar<string>(tl, "booksCustTaxRate", "");
  const companyId = useTimelineVar<string>(tl, "booksCustCompanyId", "");
  const currency = useTimelineVar<string>(tl, "booksCustCurrency", "GBP - British Pound");
  const accountsReceivable = useTimelineVar<string>(tl, "booksCustAccountsReceivable", "");
  const openingBalance = useTimelineVar<string>(tl, "booksCustOpeningBalance", "");
  const paymentTerms = useTimelineVar<string>(tl, "booksCustPaymentTerms", "Due on Receipt");
  const portalAccess = useTimelineVar<boolean>(tl, "booksCustPortalAccess", false);

  // Address tab fields
  const billingAttention = useTimelineVar<string>(tl, "booksBillingAttention", "");
  const billingCountry = useTimelineVar<string>(tl, "booksBillingCountry", "Select country");
  const billingStreet1 = useTimelineVar<string>(tl, "booksBillingStreet1", "");
  const billingStreet2 = useTimelineVar<string>(tl, "booksBillingStreet2", "");
  const billingCity = useTimelineVar<string>(tl, "booksBillingCity", "");
  const billingState = useTimelineVar<string>(tl, "booksBillingState", "Select state");
  const billingZip = useTimelineVar<string>(tl, "booksBillingZip", "");
  const billingPhone = useTimelineVar<string>(tl, "booksBillingPhone", "");

  const shippingAttention = useTimelineVar<string>(tl, "booksShippingAttention", "");
  const shippingCountry = useTimelineVar<string>(tl, "booksShippingCountry", "Select country");
  const shippingStreet1 = useTimelineVar<string>(tl, "booksShippingStreet1", "");
  const shippingStreet2 = useTimelineVar<string>(tl, "booksShippingStreet2", "");
  const shippingCity = useTimelineVar<string>(tl, "booksShippingCity", "");
  const shippingState = useTimelineVar<string>(tl, "booksShippingState", "Select state");
  const shippingZip = useTimelineVar<string>(tl, "booksShippingZip", "");
  const shippingPhone = useTimelineVar<string>(tl, "booksShippingPhone", "");

  // Contact Persons
  const contactPersons = useTimelineVar<ContactPerson[]>(
    tl,
    "booksCustContactPersons",
    [
      {
        id: "cp-1",
        salutation: "Mr.",
        firstName: "",
        lastName: "",
        email: "",
        workPhoneCode: "+44",
        workPhone: "",
        mobileCode: "+44",
        mobile: "",
      },
    ]
  );

  // UI Dropdowns state
  const isSalutationOpen = useTimelineVar<boolean>(tl, "booksSalutationOpen", false);
  const isPhoneCodeOpen = useTimelineVar<boolean>(tl, "booksPhoneCodeOpen", false);
  const phoneSearchQuery = useTimelineVar<string>(tl, "booksPhoneCodeSearch", "");
  const isTaxOpen = useTimelineVar<boolean>(tl, "booksTaxDropdownOpen", false);
  const isPaymentTermsOpen = useTimelineVar<boolean>(tl, "booksPaymentTermsOpen", false);
  const isAccountsReceivableOpen = useTimelineVar<boolean>(tl, "booksAccountsReceivableOpen", false);

  const isBillingCountryOpen = useTimelineVar<boolean>(tl, "booksBillingCountryOpen", false);
  const billingCountrySearch = useTimelineVar<string>(tl, "booksBillingCountrySearch", "");
  const isBillingStateOpen = useTimelineVar<boolean>(tl, "booksBillingStateOpen", false);
  const billingStateSearch = useTimelineVar<string>(tl, "booksBillingStateSearch", "");

  const isSaving = useTimelineVar<boolean>(tl, "booksCustomerSaving", false);

  const handleCopyBillingAddress = () => {
    tl.setVar("booksShippingAttention", billingAttention);
    tl.setVar("booksShippingCountry", billingCountry);
    tl.setVar("booksShippingStreet1", billingStreet1);
    tl.setVar("booksShippingStreet2", billingStreet2);
    tl.setVar("booksShippingCity", billingCity);
    tl.setVar("booksShippingState", billingState);
    tl.setVar("booksShippingZip", billingZip);
    tl.setVar("booksShippingPhone", billingPhone);
  };

  const handleSave = () => {
    tl.setVar("booksCustomerSaving", true);
    setTimeout(() => {
      tl.setVar("booksCustomerSaving", false);
      const newCust: CustomerItem = {
        id: `cust-${Date.now()}`,
        type: custType,
        salutation,
        firstName,
        lastName,
        companyName: custType === "business" ? companyName : undefined,
        displayName: displayName || (custType === "business" ? companyName : `${firstName} ${lastName}`.trim()),
        email,
        phoneCode: workPhoneCode,
        phone: workPhone || mobilePhone,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      const current = tl.getVar<CustomerItem[]>("booksCustomers", []);
      tl.setVar("booksCustomers", [newCust, ...current]);
      tl.setVar("booksToastMessage", "Customer created successfully.");
      tl.setVar("booksToastOpen", true);
      tl.setVar("booksView", "customers");
      tl.setUrl(BOOKS_URLS.customers);
    }, 700);
  };

  return (
    <div
      data-tl="new-customer-view"
      className="flex flex-1 flex-col h-full bg-white overflow-y-auto px-8 py-6 select-none"
    >
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <button
          type="button"
          data-tl="btn-back-to-customers"
          onClick={() => {
            tl.setVar("booksView", "customers");
            tl.setUrl(BOOKS_URLS.customers);
          }}
          className="hover:text-gray-900 cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>← Back</span>
        </button>
        <span>|</span>
        <span>⌂ &gt; Customers &gt; New</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
        New Customer
      </h1>

      {/* Main Form Body */}
      <div className="mt-6 max-w-4xl space-y-5">
        {/* Customer Type */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 text-gray-700 font-medium">Customer Type</span>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                data-tl="radio-type-business"
                name="customerType"
                checked={custType === "business"}
                onChange={() => tl.setVar("booksNewCustomerType", "business")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
              />
              <span className="text-gray-800">Business</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                data-tl="radio-type-individual"
                name="customerType"
                checked={custType === "individual"}
                onChange={() => tl.setVar("booksNewCustomerType", "individual")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
              />
              <span className="text-gray-800">Individual</span>
            </label>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 text-gray-700 font-medium">Primary Contact</span>
          <div className="flex items-center gap-3 flex-1">
            {/* Salutation */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-primary-salutation"
                onClick={() => tl.setVar("booksSalutationOpen", !isSalutationOpen)}
                className="flex h-10 w-24 items-center justify-between rounded-xl border border-gray-300 bg-white px-3 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
              >
                <span>{salutation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {isSalutationOpen && (
                <div
                  data-tl="dropdown-salutation"
                  className="absolute left-0 top-[calc(100%+4px)] z-30 w-24 rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
                >
                  {SALUTATIONS.map((sal) => (
                    <button
                      key={sal}
                      type="button"
                      data-tl={`opt-salutation-${sal.replace('.', '').toLowerCase()}`}
                      onClick={() => {
                        tl.setVar("booksCustSalutation", sal);
                        tl.setVar("booksSalutationOpen", false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                    >
                      {sal}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* First Name */}
            <input
              type="text"
              data-tl="input-primary-first-name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => tl.setVar("booksCustFirstName", e.target.value)}
              className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
            />

            {/* Last Name */}
            <input
              type="text"
              data-tl="input-primary-last-name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => tl.setVar("booksCustLastName", e.target.value)}
              className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        </div>

        {/* Company Name (only if Business) */}
        {custType === "business" && (
          <div className="flex items-center gap-8 text-xs">
            <span className="w-36 text-gray-700 font-medium">Company Name</span>
            <input
              type="text"
              data-tl="input-company-name"
              placeholder=""
              value={companyName}
              onChange={(e) => {
                tl.setVar("booksCustCompanyName", e.target.value);
                if (!displayName || displayName === companyName) {
                  tl.setVar("booksCustDisplayName", e.target.value);
                }
              }}
              className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        )}

        {/* Display Name* */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 font-medium text-red-600">Display Name*</span>
          <input
            type="text"
            data-tl="input-display-name"
            placeholder=""
            value={displayName}
            onChange={(e) => tl.setVar("booksCustDisplayName", e.target.value)}
            className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Email Address */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 text-gray-700 font-medium">Email Address</span>
          <input
            type="email"
            data-tl="input-customer-email"
            placeholder=""
            value={email}
            onChange={(e) => tl.setVar("booksCustEmail", e.target.value)}
            className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 text-gray-700 font-medium">Phone</span>
          <div className="flex items-center gap-4 flex-1">
            {/* Work Phone */}
            <div className="flex items-center gap-2 flex-1">
              <div className="relative">
                <button
                  type="button"
                  data-tl="btn-work-phone-code"
                  onClick={() => tl.setVar("booksPhoneCodeOpen", !isPhoneCodeOpen)}
                  className="flex h-10 items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[85px] justify-between"
                >
                  <span>GB {workPhoneCode}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {isPhoneCodeOpen && (
                  <div
                    data-tl="dropdown-phone-code"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                  >
                    <div className="relative mb-2">
                      <input
                        type="text"
                        data-tl="input-country-search"
                        placeholder="Search country or code..."
                        value={phoneSearchQuery}
                        onChange={(e) => tl.setVar("booksPhoneCodeSearch", e.target.value)}
                        className="h-8 w-full rounded-lg border border-gray-300 px-2.5 text-xs focus:outline-none focus:border-[#7014D9]"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-0.5">
                      {COUNTRY_CODES.filter((c) => {
                        if (!phoneSearchQuery.trim()) return true;
                        const q = phoneSearchQuery.toLowerCase();
                        return (
                          c.name.toLowerCase().includes(q) ||
                          c.code.includes(q) ||
                          c.iso.toLowerCase().includes(q)
                        );
                      }).map((c) => (
                        <button
                          key={c.iso}
                          type="button"
                          data-tl={`country-opt-${c.iso.toLowerCase()}`}
                          onClick={() => {
                            tl.setVar("booksCustWorkPhoneCode", c.code);
                            tl.setVar("booksPhoneCodeOpen", false);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 text-left text-xs rounded hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                        >
                          <span className="truncate">
                            <span className="font-semibold text-gray-500 mr-1.5">
                              {c.iso}
                            </span>
                            {c.name}
                          </span>
                          <span className="text-gray-500 shrink-0 font-mono text-[11px]">
                            {c.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="text"
                data-tl="input-work-phone"
                placeholder="Work Phone"
                value={workPhone}
                onChange={(e) => tl.setVar("booksCustWorkPhone", e.target.value)}
                className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            {/* Mobile Phone */}
            <div className="flex items-center gap-2 flex-1">
              <button
                type="button"
                data-tl="btn-mobile-phone-code"
                className="flex h-10 items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-2.5 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer min-w-[85px] justify-between"
              >
                <span>GB {mobilePhoneCode}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              <input
                type="text"
                data-tl="input-mobile-phone"
                placeholder="Mobile"
                value={mobilePhone}
                onChange={(e) => tl.setVar("booksCustMobilePhone", e.target.value)}
                className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 placeholder:text-gray-400 focus:border-[#7014D9] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Customer Language */}
        <div className="flex items-center gap-8 text-xs">
          <span className="w-36 text-gray-700 font-medium">Customer Language</span>
          <div className="relative flex-1">
            <button
              type="button"
              data-tl="select-customer-language"
              className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
            >
              <span>{language}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="pt-4 border-b border-gray-200">
          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              type="button"
              data-tl="tab-other-details"
              onClick={() => tl.setVar("booksNewCustomerTab", "other")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "other"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Other Details
            </button>
            <button
              type="button"
              data-tl="tab-address"
              onClick={() => tl.setVar("booksNewCustomerTab", "address")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "address"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Address
            </button>
            <button
              type="button"
              data-tl="tab-contact-persons"
              onClick={() => tl.setVar("booksNewCustomerTab", "contact")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "contact"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Contact Persons
            </button>
            <button
              type="button"
              data-tl="tab-custom-fields"
              onClick={() => tl.setVar("booksNewCustomerTab", "custom")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "custom"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Custom Fields
            </button>
            <button
              type="button"
              data-tl="tab-reporting-tags"
              onClick={() => tl.setVar("booksNewCustomerTab", "reporting")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "reporting"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Reporting Tags
            </button>
            <button
              type="button"
              data-tl="tab-remarks"
              onClick={() => tl.setVar("booksNewCustomerTab", "remarks")}
              className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === "remarks"
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Remarks
            </button>
          </div>
        </div>

        {/* TAB 1: OTHER DETAILS */}
        {activeTab === "other" && (
          <div data-tl="tab-content-other" className="space-y-4 pt-2">
            {/* Tax Rate */}
            <div className="flex items-start gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium pt-2.5">Tax Rate</span>
              <div className="flex-1 space-y-1">
                <div className="relative">
                  <button
                    type="button"
                    data-tl="select-tax-rate"
                    onClick={() => tl.setVar("booksTaxDropdownOpen", !isTaxOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                  >
                    <span>{taxRate || "Select a tax rate..."}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {isTaxOpen && (
                    <div
                      data-tl="dropdown-tax-rate"
                      className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
                    >
                      {TAX_RATES.map((tr) => (
                        <button
                          key={tr}
                          type="button"
                          data-tl={`tax-opt-${tr.includes("Standard") ? "standard" : "other"}`}
                          onClick={() => {
                            tl.setVar("booksCustTaxRate", tr);
                            tl.setVar("booksTaxDropdownOpen", false);
                          }}
                          className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                        >
                          {tr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-500">
                  To associate more than one tax, you need to create a tax group in Settings.
                </p>
              </div>
            </div>

            {/* Company ID */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Company ID</span>
              <input
                type="text"
                data-tl="input-company-id"
                placeholder=""
                value={companyId}
                onChange={(e) => tl.setVar("booksCustCompanyId", e.target.value)}
                className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
              />
            </div>

            {/* Currency */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Currency</span>
              <div className="relative flex-1">
                <button
                  type="button"
                  data-tl="select-currency"
                  className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Accounts Receivable */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Accounts Receivable</span>
              <div className="relative flex-1">
                <button
                  type="button"
                  data-tl="select-accounts-receivable"
                  onClick={() =>
                    tl.setVar(
                      "booksAccountsReceivableOpen",
                      !isAccountsReceivableOpen
                    )
                  }
                  className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{accountsReceivable || "Select an account"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isAccountsReceivableOpen && (
                  <div className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      data-tl="opt-ar-default"
                      onClick={() => {
                        tl.setVar("booksCustAccountsReceivable", "Accounts Receivable");
                        tl.setVar("booksAccountsReceivableOpen", false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                    >
                      Accounts Receivable
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Balance */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Opening Balance</span>
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-2.5 text-xs text-gray-500 font-medium">
                  GBP
                </div>
                <input
                  type="text"
                  data-tl="input-opening-balance"
                  placeholder=""
                  value={openingBalance}
                  onChange={(e) => tl.setVar("booksCustOpeningBalance", e.target.value)}
                  className="h-10 w-full pl-12 pr-3.5 rounded-xl border border-gray-300 bg-white text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Terms */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Payment Terms</span>
              <div className="relative flex-1">
                <button
                  type="button"
                  data-tl="select-payment-terms"
                  onClick={() => tl.setVar("booksPaymentTermsOpen", !isPaymentTermsOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                >
                  <span>{paymentTerms}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {isPaymentTermsOpen && (
                  <div
                    data-tl="dropdown-payment-terms"
                    className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {PAYMENT_TERMS.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        data-tl={`pt-opt-${pt.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => {
                          tl.setVar("booksCustPaymentTerms", pt);
                          tl.setVar("booksPaymentTermsOpen", false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-gray-700 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Portal Access */}
            <div className="flex items-center gap-8 text-xs">
              <span className="w-36 text-gray-700 font-medium">Enable Portal?</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  data-tl="chk-portal-access"
                  checked={portalAccess}
                  onChange={(e) => tl.setVar("booksCustPortalAccess", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-gray-800">
                  Allow portal access for this customer
                </span>
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: ADDRESS */}
        {activeTab === "address" && (
          <div data-tl="tab-content-address" className="space-y-6 pt-2">
            <div className="grid grid-cols-2 gap-8">
              {/* BILLING ADDRESS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-900">
                    Billing Address
                  </h3>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Attention
                  </label>
                  <input
                    type="text"
                    data-tl="input-billing-attention"
                    value={billingAttention}
                    onChange={(e) => tl.setVar("booksBillingAttention", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Country/Region
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      data-tl="select-billing-country"
                      onClick={() =>
                        tl.setVar("booksBillingCountryOpen", !isBillingCountryOpen)
                      }
                      className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                    >
                      <span>{billingCountry}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>

                    {isBillingCountryOpen && (
                      <div
                        data-tl="dropdown-billing-country"
                        className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                      >
                        <input
                          type="text"
                          data-tl="input-billing-country-search"
                          placeholder="Search..."
                          value={billingCountrySearch}
                          onChange={(e) =>
                            tl.setVar("booksBillingCountrySearch", e.target.value)
                          }
                          className="h-8 w-full rounded-lg border border-gray-300 px-2.5 text-xs mb-2 focus:outline-none focus:border-[#7014D9]"
                        />
                        <div className="max-h-40 overflow-y-auto space-y-0.5">
                          {COUNTRY_CODES.filter((c) => {
                            if (!billingCountrySearch.trim()) return true;
                            return c.name
                              .toLowerCase()
                              .includes(billingCountrySearch.toLowerCase());
                          }).map((c) => (
                            <button
                              key={c.iso}
                              type="button"
                              data-tl={`country-billing-opt-${c.iso.toLowerCase()}`}
                              onClick={() => {
                                tl.setVar(
                                  "booksBillingCountry",
                                  `${c.iso} ${c.name}`
                                );
                                tl.setVar("booksBillingCountryOpen", false);
                              }}
                              className="w-full px-2.5 py-1.5 text-left text-xs rounded hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                            >
                              {c.iso} {c.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    data-tl="input-billing-street1"
                    placeholder="Street 1"
                    value={billingStreet1}
                    onChange={(e) => tl.setVar("booksBillingStreet1", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 mb-2 focus:border-[#7014D9] focus:outline-none"
                  />
                  <input
                    type="text"
                    data-tl="input-billing-street2"
                    placeholder="Street 2"
                    value={billingStreet2}
                    onChange={(e) => tl.setVar("booksBillingStreet2", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    data-tl="input-billing-city"
                    value={billingCity}
                    onChange={(e) => tl.setVar("booksBillingCity", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    State
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      data-tl="select-billing-state"
                      onClick={() =>
                        tl.setVar("booksBillingStateOpen", !isBillingStateOpen)
                      }
                      className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                    >
                      <span>{billingState}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </button>

                    {isBillingStateOpen && (
                      <div
                        data-tl="dropdown-billing-state"
                        className="absolute left-0 top-[calc(100%+4px)] z-30 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                      >
                        <input
                          type="text"
                          data-tl="input-billing-state-search"
                          placeholder="Search..."
                          value={billingStateSearch}
                          onChange={(e) =>
                            tl.setVar("booksBillingStateSearch", e.target.value)
                          }
                          className="h-8 w-full rounded-lg border border-gray-300 px-2.5 text-xs mb-2 focus:outline-none focus:border-[#7014D9]"
                        />
                        <div className="max-h-40 overflow-y-auto space-y-0.5">
                          {UK_REGIONS.filter((r) => {
                            if (!billingStateSearch.trim()) return true;
                            return r
                              .toLowerCase()
                              .includes(billingStateSearch.toLowerCase());
                          }).map((r) => (
                            <button
                              key={r}
                              type="button"
                              data-tl={`state-billing-opt-${r.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={() => {
                                tl.setVar("booksBillingState", r);
                                tl.setVar("booksBillingStateOpen", false);
                              }}
                              className="w-full px-2.5 py-1.5 text-left text-xs rounded hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    data-tl="input-billing-zip"
                    value={billingZip}
                    onChange={(e) => tl.setVar("booksBillingZip", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    data-tl="input-billing-phone"
                    value={billingPhone}
                    onChange={(e) => tl.setVar("booksBillingPhone", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              {/* SHIPPING ADDRESS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-900">
                    Shipping Address
                  </h3>
                  <button
                    type="button"
                    data-tl="btn-copy-billing-address"
                    onClick={handleCopyBillingAddress}
                    className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Copy billing address
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Attention
                  </label>
                  <input
                    type="text"
                    data-tl="input-shipping-attention"
                    value={shippingAttention}
                    onChange={(e) => tl.setVar("booksShippingAttention", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Country/Region
                  </label>
                  <button
                    type="button"
                    data-tl="select-shipping-country"
                    className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                  >
                    <span>{shippingCountry}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    data-tl="input-shipping-street1"
                    placeholder="Street 1"
                    value={shippingStreet1}
                    onChange={(e) => tl.setVar("booksShippingStreet1", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 mb-2 focus:border-[#7014D9] focus:outline-none"
                  />
                  <input
                    type="text"
                    data-tl="input-shipping-street2"
                    placeholder="Street 2"
                    value={shippingStreet2}
                    onChange={(e) => tl.setVar("booksShippingStreet2", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    data-tl="input-shipping-city"
                    value={shippingCity}
                    onChange={(e) => tl.setVar("booksShippingCity", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    State
                  </label>
                  <button
                    type="button"
                    data-tl="select-shipping-state"
                    className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-800 hover:bg-gray-50 focus:border-[#7014D9] cursor-pointer"
                  >
                    <span>{shippingState}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    data-tl="input-shipping-zip"
                    value={shippingZip}
                    onChange={(e) => tl.setVar("booksShippingZip", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    data-tl="input-shipping-phone"
                    value={shippingPhone}
                    onChange={(e) => tl.setVar("booksShippingPhone", e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-xs text-gray-900 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Note box */}
            <div
              data-tl="address-note-box"
              className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900"
            >
              <p className="font-semibold mb-1">Note:</p>
              <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed">
                <li>
                  Add and manage additional addresses from this Customers and Vendors details section.
                </li>
                <li>
                  You can customise how customers&apos; addresses are displayed in transaction PDFs. To do this, go to Settings &gt; Preferences &gt; Customers and Vendors, and navigate to the Address Format sections.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT PERSONS */}
        {activeTab === "contact" && (
          <div data-tl="tab-content-contact" className="space-y-4 pt-2">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table
                data-tl="table-contact-persons"
                className="w-full text-left text-xs"
              >
                <thead className="bg-[#FAF9FC] border-b border-gray-200 font-medium text-gray-600">
                  <tr>
                    <th className="px-3 py-3">SALUTATION</th>
                    <th className="px-3 py-3">FIRST NAME</th>
                    <th className="px-3 py-3">LAST NAME</th>
                    <th className="px-3 py-3">EMAIL ADDRESS</th>
                    <th className="px-3 py-3">WORK PHONE</th>
                    <th className="px-3 py-3">MOBILE</th>
                    <th className="px-2 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contactPersons.map((cp, idx) => (
                    <tr key={cp.id} data-tl={`row-contact-${idx + 1}`}>
                      <td className="px-3 py-2">
                        <select
                          data-tl={`contact-salutation-${idx + 1}`}
                          value={cp.salutation}
                          onChange={(e) => {
                            const updated = [...contactPersons];
                            updated[idx].salutation = e.target.value;
                            tl.setVar("booksCustContactPersons", updated);
                          }}
                          className="h-9 rounded-lg border border-gray-300 px-2 text-xs text-gray-800 focus:outline-none"
                        >
                          {SALUTATIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          data-tl={`contact-first-name-${idx + 1}`}
                          value={cp.firstName}
                          onChange={(e) => {
                            const updated = [...contactPersons];
                            updated[idx].firstName = e.target.value;
                            tl.setVar("booksCustContactPersons", updated);
                          }}
                          className="h-9 w-28 rounded-lg border border-gray-300 px-2.5 text-xs text-gray-900 focus:outline-none"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          data-tl={`contact-last-name-${idx + 1}`}
                          value={cp.lastName}
                          onChange={(e) => {
                            const updated = [...contactPersons];
                            updated[idx].lastName = e.target.value;
                            tl.setVar("booksCustContactPersons", updated);
                          }}
                          className="h-9 w-28 rounded-lg border border-gray-300 px-2.5 text-xs text-gray-900 focus:outline-none"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="email"
                          data-tl={`contact-email-${idx + 1}`}
                          value={cp.email}
                          onChange={(e) => {
                            const updated = [...contactPersons];
                            updated[idx].email = e.target.value;
                            tl.setVar("booksCustContactPersons", updated);
                          }}
                          className="h-9 w-40 rounded-lg border border-gray-300 px-2.5 text-xs text-gray-900 focus:outline-none"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-gray-500 font-mono">
                            {cp.workPhoneCode}
                          </span>
                          <input
                            type="text"
                            data-tl={`contact-work-phone-${idx + 1}`}
                            placeholder="Work Phone"
                            value={cp.workPhone}
                            onChange={(e) => {
                              const updated = [...contactPersons];
                              updated[idx].workPhone = e.target.value;
                              tl.setVar("booksCustContactPersons", updated);
                            }}
                            className="h-9 w-28 rounded-lg border border-gray-300 px-2 text-xs text-gray-900 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-gray-500 font-mono">
                            {cp.mobileCode}
                          </span>
                          <input
                            type="text"
                            data-tl={`contact-mobile-${idx + 1}`}
                            placeholder="Mobile"
                            value={cp.mobile}
                            onChange={(e) => {
                              const updated = [...contactPersons];
                              updated[idx].mobile = e.target.value;
                              tl.setVar("booksCustContactPersons", updated);
                            }}
                            className="h-9 w-28 rounded-lg border border-gray-300 px-2 text-xs text-gray-900 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center">
                        {contactPersons.length > 1 && (
                          <button
                            type="button"
                            data-tl={`btn-remove-contact-${idx + 1}`}
                            onClick={() => {
                              const updated = contactPersons.filter((_, i) => i !== idx);
                              tl.setVar("booksCustContactPersons", updated);
                            }}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                            title="Remove contact person"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
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
                const updated: ContactPerson[] = [
                  ...contactPersons,
                  {
                    id: `cp-${Date.now()}`,
                    salutation: "Mr.",
                    firstName: "",
                    lastName: "",
                    email: "",
                    workPhoneCode: "+44",
                    workPhone: "",
                    mobileCode: "+44",
                    mobile: "",
                  },
                ];
                tl.setVar("booksCustContactPersons", updated);
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Contact Person</span>
            </button>
          </div>
        )}

        {/* TAB 4, 5, 6: PLACEHOLDERS (Safe, no crash) */}
        {(activeTab === "custom" ||
          activeTab === "reporting" ||
          activeTab === "remarks") && (
          <div className="py-8 text-center text-xs text-gray-400">
            No fields defined.
          </div>
        )}

        {/* Bottom Action Buttons */}
        <div className="pt-6 flex items-center gap-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="btn-save-customer"
            disabled={isSaving}
            onClick={handleSave}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-medium text-white hover:bg-blue-700 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>

          <button
            type="button"
            data-tl="btn-cancel-customer"
            onClick={() => {
              tl.setVar("booksView", "customers");
              tl.setUrl(BOOKS_URLS.customers);
            }}
            className="flex h-10 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
