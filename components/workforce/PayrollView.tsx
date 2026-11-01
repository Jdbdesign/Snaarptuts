"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  EMPLOYEE_SALARIES_DATA,
  RECENT_TRANSFERS_DATA,
  SALARY_COMPONENTS_DATA,
  TAX_BRACKETS_DATA,
} from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function PayrollView({ tl }: Props) {
  const currentTab = useTimelineVar<string>(tl, "wfPayrollTab", "salary-components");
  const subview = useTimelineVar<string>(tl, "wfPayrollSubview", "main");
  const addCompModalOpen = useTimelineVar(tl, "wfAddComponentModalOpen", false);
  const assignSalaryModalOpen = useTimelineVar(tl, "wfAssignSalaryModalOpen", false);
  const assignSalaryCompAdded = useTimelineVar(tl, "wfAssignSalaryComponentAdded", false);
  const payrunPaid = useTimelineVar(tl, "wfPayrunPaid", false);
  const createPayRunOpen = useTimelineVar(tl, "wfCreatePayRunOpen", false);
  const payRunSelectedEmployees = useTimelineVar<string[]>(tl, "wfPayRunSelectedEmployees", ["alex-morgan"]);
  const payRunStatus = useTimelineVar<string>(tl, "wfPayRunStatus", "PROCESSING");
  const advanceMenuOpenId = useTimelineVar<string | null>(tl, "wfAdvanceMenuOpenId", null);
  const advancePolicyModalOpen = useTimelineVar(tl, "wfAdvancePolicyModalOpen", false);
  const importSalariesModalOpen = useTimelineVar(tl, "wfImportSalariesModalOpen", false);
  const importPayrollFile = useTimelineVar<string | null>(tl, "wfImportPayrollFile", null);
  const payrollTransferModalOpen = useTimelineVar(tl, "wfPayrollTransferModalOpen", false);
  const transferConfirmed = useTimelineVar(tl, "wfTransferConfirmed", false);
  const transferToast = useTimelineVar(tl, "wfTransferToast", false);
  const taxEmployee = useTimelineVar<string | null>(tl, "wfTaxEmployee", null);
  const taxAdjustOpen = useTimelineVar(tl, "wfTaxAdjustOpen", false);
  const taxCalculated = useTimelineVar(tl, "wfTaxCalculated", false);
  const pensionEmployee = useTimelineVar<string | null>(tl, "wfPensionEmployee", null);
  const pensionCalculated = useTimelineVar(tl, "wfPensionCalculated", false);

  // Local state for interactive employee list in assign salary modal
  const [empDropdownOpen, setEmpDropdownOpen] = useState(false);
  const [compSelectOpen, setCompSelectOpen] = useState(false);
  const [payRunEmpPickerOpen, setPayRunEmpPickerOpen] = useState(false);
  const [filePickerOpen, setFilePickerOpen] = useState(false);

  const TABS_ROW1 = [
    { id: "salary-components", label: "Salary Components" },
    { id: "employee-salaries", label: "Employee Salaries" },
    { id: "pay-runs", label: "Pay Runs" },
    { id: "payslips", label: "Payslips" },
    { id: "salary-advances", label: "Salary advances" },
    { id: "import-export", label: "Import / Export" },
    { id: "tax-calculator", label: "Tax calculator" },
    { id: "pension-calculator", label: "Pension calculator" },
  ];

  // If viewing employee-style "My requests" under salary advances
  if (subview === "my-requests") {
    return (
      <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-16">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-my-requests-back"
            onClick={() => tl.setVar("wfPayrollSubview", "main")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Icon name="arrowLeft" size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Salary advances</h1>
            <p className="text-xs text-[#6B7280]">View your submitted advance requests</p>
          </div>
        </div>

        {/* Limit card */}
        <div data-tl="card-my-advance-limit" className="p-5 rounded-2xl border border-purple-200 bg-[#FAF5FF] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B7280]">Request limit:</span>
            <span className="text-lg font-bold text-[#7014D9] ml-2">£4,166.66</span>
            <p className="text-xs text-[#6B7280] mt-0.5">Up to 3 instalments · Monthly salary</p>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Pending", "Approved", "Rejected", "Cancelled"].map((s) => (
            <div key={s} className="p-4 rounded-xl border border-[#E5E7EB] bg-white text-center">
              <span className="text-xs text-[#6B7280]">{s}</span>
              <span className="text-lg font-bold text-[#111827] block mt-1">0</span>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div data-tl="my-advances-empty-state" className="p-12 text-center rounded-2xl border border-[#E5E7EB] bg-white text-xs text-[#6B7280]">
          No salary advance requests found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-payroll-back"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Icon name="arrowLeft" size={16} />
          </button>
          <div>
            <h1 data-tl="payroll-heading" className="text-xl font-bold text-[#111827]">
              Payroll
            </h1>
            <p className="text-xs text-[#6B7280]">
              Manage salary structures, pay runs, tax calculations and pension compliance
            </p>
          </div>
        </div>

        {/* Default payroll currency select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Default payroll currency</span>
          <select
            data-tl="select-default-currency"
            defaultValue="GBP"
            className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs font-semibold bg-white text-[#111827] focus:border-[#7014D9]"
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <button
            type="button"
            data-tl="btn-save-currency"
            disabled
            className="px-3 py-1.5 rounded-lg bg-purple-200 text-purple-700 text-xs font-semibold opacity-70 cursor-not-allowed"
          >
            Save currency
          </button>
        </div>
      </div>

      {/* 3 Header Stat Cards */}
      <div data-tl="payroll-stat-cards" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
          <span className="text-xs text-[#6B7280] font-medium">Total Payroll Cost</span>
          <span data-tl="stat-payroll-cost" className="text-xl font-bold text-[#111827] block mt-1 font-mono">
            {payrunPaid ? "£5,219.00" : "£0.00"}
          </span>
        </div>
        <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
          <span className="text-xs text-[#6B7280] font-medium">Average Annual Salary</span>
          <span data-tl="stat-avg-salary" className="text-xl font-bold text-[#111827] block mt-1 font-mono">
            £36,000.00
          </span>
        </div>
        <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
          <span className="text-xs text-[#6B7280] font-medium">Active Employees</span>
          <span data-tl="stat-active-employees" className="text-xl font-bold text-[#111827] block mt-1">
            2
          </span>
        </div>
      </div>

      {/* Tabs Rows */}
      <div data-tl="payroll-tabs-row" className="flex flex-col border-b border-[#E5E7EB]">
        {/* Row 1 */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {TABS_ROW1.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-tl={`tab-${tab.id}`}
                onClick={() => tl.setVar("wfPayrollTab", tab.id)}
                className={`px-3.5 py-2.5 text-xs font-medium transition-all relative whitespace-nowrap ${
                  isActive
                    ? "text-[#7014D9] font-semibold border-b-2 border-[#7014D9]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Row 2: Tax & Pension settings */}
        <div className="flex items-center pt-1 pb-1">
          <button
            type="button"
            data-tl="tab-tax-pension-settings"
            onClick={() => tl.setVar("wfPayrollTab", "tax-pension-settings")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              currentTab === "tax-pension-settings"
                ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                : "text-[#6B7280] hover:bg-gray-100"
            }`}
          >
            Tax &amp; Pension settings
          </button>
        </div>
      </div>

      {/* TAB 1: Salary Components */}
      {currentTab === "salary-components" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#111827]">Salary Components</h2>
            <button
              type="button"
              data-tl="btn-add-component"
              onClick={() => tl.setVar("wfAddComponentModalOpen", true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
            >
              <Icon name="plus" size={14} />
              <span>Add Component</span>
            </button>
          </div>

          <div data-tl="salary-components-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Calculation</th>
                  <th className="py-3 px-4 text-center">Taxable</th>
                  <th className="py-3 px-4 text-center">Recurring</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SALARY_COMPONENTS_DATA.map((c, i) => (
                  <tr key={c.id} className="hover:bg-gray-50/70">
                    <td className="py-3 px-4 font-medium">{c.name}</td>
                    <td className="py-3 px-4">
                      <span
                        data-tl={`pill-earning-${i + 1}`}
                        className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#4B5563]">{c.calculation}</td>
                    <td className="py-3 px-4 text-center">
                      {c.taxable ? (
                        <span data-tl={`tick-taxable-${i + 1}`} className="inline-flex text-emerald-600 font-bold">✓</span>
                      ) : (
                        <span data-tl={`cross-taxable-${i + 1}`} className="inline-flex text-rose-500 font-bold">✕</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span data-tl={`tick-recurring-${i + 1}`} className="inline-flex text-emerald-600 font-bold">✓</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          data-tl={`btn-edit-comp-${i + 1}`}
                          className="p-1 rounded text-[#4B5563] hover:bg-gray-100"
                        >
                          <Icon name="pencil" size={14} />
                        </button>
                        <button
                          type="button"
                          data-tl={`btn-delete-comp-${i + 1}`}
                          className="p-1 rounded text-red-600 hover:bg-red-50"
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Employee Salaries */}
      {currentTab === "employee-salaries" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#111827]">Employee Salaries</h2>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                data-tl="btn-import-salaries-tab"
                onClick={() => tl.setVar("wfPayrollTab", "import-export")}
                className="px-3 py-1.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50"
              >
                Import
              </button>
              <button
                type="button"
                data-tl="btn-assign-salary"
                onClick={() => tl.setVar("wfAssignSalaryModalOpen", true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
              >
                <Icon name="plus" size={14} />
                <span>Assign Salary</span>
              </button>
            </div>
          </div>

          <div data-tl="employee-salaries-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                <tr>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-4">Salary</th>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4">Pay Frequency</th>
                  <th className="py-3 px-4">Effective From</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {EMPLOYEE_SALARIES_DATA.map((es, idx) => (
                  <tr
                    key={es.id}
                    data-tl={idx === 0 ? "salary-row-alex" : "salary-row-jordan"}
                    className="hover:bg-gray-50/70"
                  >
                    <td className="py-3 px-4 font-medium text-[#111827]">{es.name}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-semibold text-[#111827] block">
                        {es.monthlySalary}
                      </span>
                      <span className="text-[10px] text-[#6B7280] font-mono">
                        {es.annualSalary}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#4B5563]">{es.currency}</td>
                    <td className="py-3 px-4 text-[#4B5563]">{es.payFrequency}</td>
                    <td className="py-3 px-4 text-[#4B5563]">{es.effectiveFrom}</td>
                    <td className="py-3 px-4">
                      <span
                        data-tl={`pill-salary-active-${idx + 1}`}
                        className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        {es.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-xs">
                        <button
                          type="button"
                          data-tl={`btn-edit-salary-${idx + 1}`}
                          className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Icon name="pencil" size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          data-tl={`btn-delete-salary-${idx + 1}`}
                          className="text-red-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Icon name="trash" size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Pay Runs */}
      {currentTab === "pay-runs" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select
                data-tl="select-payrun-status-filter"
                className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white"
              >
                <option>All Statuses</option>
              </select>
            </div>
            <button
              type="button"
              data-tl="btn-create-payrun"
              onClick={() => tl.setVar("wfCreatePayRunOpen", true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
            >
              <Icon name="plus" size={14} />
              <span>Create Pay Run</span>
            </button>
          </div>

          {/* Inline Create Pay Run Card */}
          {createPayRunOpen && (
            <div data-tl="card-create-payrun" className="p-5 rounded-2xl border border-purple-200 bg-[#FAF5FF] flex flex-col gap-4">
              <h3 className="text-xs font-bold text-[#7014D9]">Create New Pay Run</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Month</label>
                  <select data-tl="select-payrun-month" defaultValue="October" className="w-full h-8 px-2 rounded-lg border border-[#D1D5DB] bg-white">
                    <option>October</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Year</label>
                  <select data-tl="select-payrun-year" defaultValue="2026" className="w-full h-8 px-2 rounded-lg border border-[#D1D5DB] bg-white">
                    <option>2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Payment Date</label>
                  <input
                    type="text"
                    data-tl="input-payrun-date"
                    defaultValue="30/10/2026"
                    className="w-full h-8 px-2 rounded-lg border border-[#D1D5DB] bg-white"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Employees</label>
                  <button
                    type="button"
                    data-tl="btn-payrun-employees-picker"
                    onClick={() => setPayRunEmpPickerOpen(!payRunEmpPickerOpen)}
                    className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] bg-white flex items-center justify-between text-[#111827]"
                  >
                    <span>
                      {payRunSelectedEmployees.length === 2
                        ? "2 employees selected"
                        : "1 employee selected"}
                    </span>
                    <Icon name="users" size={13} className="text-[#6B7280]" />
                  </button>

                  {/* Employees Picker Dropdown */}
                  {payRunEmpPickerOpen && (
                    <div className="absolute left-0 top-14 z-30 w-64 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-lg text-xs flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full h-7 px-2 rounded border border-[#D1D5DB]"
                      />
                      <div className="flex items-center gap-3 text-[11px]">
                        <button type="button" className="text-[#7014D9] hover:underline font-medium">Select All</button>
                        <button type="button" className="text-[#6B7280] hover:underline font-medium">Clear</button>
                      </div>
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-[#F3F4F6]">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            data-tl="cb-payrun-alex"
                            checked={payRunSelectedEmployees.includes("alex-morgan")}
                            onChange={() => {}}
                            className="rounded text-[#7014D9]"
                          />
                          <span>Alex Morgan</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            data-tl="cb-payrun-jordan"
                            checked={payRunSelectedEmployees.includes("jordan-lee")}
                            onChange={() => {
                              tl.setVar("wfPayRunSelectedEmployees", ["alex-morgan", "jordan-lee"]);
                            }}
                            className="rounded text-[#7014D9]"
                          />
                          <span>Jordan Lee</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            data-tl="cb-payrun-sam"
                            className="rounded text-[#7014D9]"
                          />
                          <span>Sam Taylor</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  data-tl="btn-submit-create-payrun"
                  onClick={() => {
                    tl.setVar("wfCreatePayRunOpen", false);
                    tl.setVar("wfPayrunPaid", false);
                    tl.setVar("wfPayRunStatus", "PROCESSING");
                    tl.toast("Pay run created and processed! Check Payslips tab.");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] shadow-sm"
                >
                  Create Pay Run
                </button>
              </div>
            </div>
          )}

          {/* Pay Runs Table */}
          <div data-tl="payruns-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                <tr>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total Net</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                <tr data-tl="payrun-row-1" className="hover:bg-gray-50/70">
                  <td className="py-3 px-4 font-medium">
                    <span data-tl="payrun-period-link" className="text-[#7014D9] hover:underline cursor-pointer">
                      October 2026
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">2026-10-30</td>
                  <td className="py-3 px-4">
                    <span
                      data-tl={payRunStatus === "PAID" ? "pill-payrun-paid" : "pill-payrun-processing"}
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        payRunStatus === "PAID"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {payRunStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold" data-tl="payrun-total-net">
                    £5,219.00
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        data-tl="btn-complete-payrun"
                        disabled={payRunStatus === "PAID"}
                        onClick={() => {
                          tl.setVar("wfPayRunStatus", "PAID");
                          tl.setVar("wfPayrunPaid", true);
                          tl.toast("Pay run marked as paid");
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          payRunStatus === "PAID"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#7014D9] text-white hover:bg-[#5E11B8]"
                        }`}
                      >
                        <Icon name="check" size={12} />
                        <span>Complete</span>
                      </button>
                      <button
                        type="button"
                        data-tl="btn-cancel-payrun"
                        disabled={payRunStatus === "PAID"}
                        className={`px-2 py-1 rounded-md border text-[11px] ${
                          payRunStatus === "PAID"
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        data-tl="btn-delete-payrun"
                        disabled={payRunStatus === "PAID"}
                        className={`px-2 py-1 rounded-md border text-[11px] ${
                          payRunStatus === "PAID"
                            ? "border-red-200 text-red-300 cursor-not-allowed"
                            : "border-red-300 text-red-600 hover:bg-red-50"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Payslips */}
      {currentTab === "payslips" && (
        <div className="flex flex-col gap-4">
          {!payrunPaid ? (
            <div data-tl="box-payslips-info" className="p-4 rounded-2xl border border-blue-200 bg-blue-50/70 text-xs text-blue-900 flex flex-col gap-1">
              <span className="font-semibold">No payslips generated yet</span>
              <p className="text-blue-700">
                Payslips are automatically generated when you process a Pay Run. Go to the Pay Runs tab, create a pay run for a period, add employees, then click &apos;Process&apos; to generate payslips.
              </p>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  data-tl="input-filter-pay-period"
                  placeholder="Filter by pay period (e.g. 2026-01)"
                  defaultValue="2026-10"
                  className="h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white"
                />
                <input
                  type="text"
                  data-tl="input-search-employee-id"
                  placeholder="Search by employee ID"
                  className="h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white"
                />
              </div>

              {/* Payslips Table */}
              <div data-tl="payslips-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Pay Period</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Generated At</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                    <tr data-tl="payslip-row-alex" className="hover:bg-gray-50/70">
                      <td className="py-3 px-4 font-medium">Alex Morgan</td>
                      <td className="py-3 px-4 text-[#4B5563]">2026-10</td>
                      <td className="py-3 px-4">
                        <span data-tl="pill-payslip-generated-1" className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          GENERATED
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">30/10/2026</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            data-tl="btn-download-payslip-1"
                            className="text-[#7014D9] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Icon name="download" size={13} />
                            <span>Download</span>
                          </button>
                          <button
                            type="button"
                            data-tl="btn-delete-payslip-1"
                            className="text-red-600 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Icon name="trash" size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr data-tl="payslip-row-jordan" className="hover:bg-gray-50/70">
                      <td className="py-3 px-4 font-medium">Jordan Lee</td>
                      <td className="py-3 px-4 text-[#4B5563]">2026-10</td>
                      <td className="py-3 px-4">
                        <span data-tl="pill-payslip-generated-2" className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          GENERATED
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">30/10/2026</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            data-tl="btn-download-payslip-2"
                            className="text-[#7014D9] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Icon name="download" size={13} />
                            <span>Download</span>
                          </button>
                          <button
                            type="button"
                            data-tl="btn-delete-payslip-2"
                            className="text-red-600 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Icon name="trash" size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 5: Salary advances (admin) */}
      {currentTab === "salary-advances" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">Salary advances</h2>
              <p className="text-xs text-[#6B7280]">Review requests and manage eligibility</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-tl="btn-my-requests"
                onClick={() => tl.setVar("wfPayrollSubview", "my-requests")}
                className="px-3 py-1.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50"
              >
                My requests
              </button>
              <button
                type="button"
                data-tl="btn-advance-policy"
                onClick={() => tl.setVar("wfAdvancePolicyModalOpen", true)}
                className="px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] shadow-sm"
              >
                Advance policy
              </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div data-tl="advance-admin-stats" className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Pending", count: 0 },
              { label: "Approved - not paid", count: 1 },
              { label: "Rejected", count: 0 },
              { label: "Cancelled", count: 0 },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl border border-[#E5E7EB] bg-white text-center shadow-2xs">
                <span className="text-xs text-[#6B7280]">{s.label}</span>
                <span className="text-lg font-bold text-[#111827] block mt-1">{s.count}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              data-tl="input-search-advance"
              placeholder="Search employee..."
              className="h-8 px-3 rounded-lg border border-[#D1D5DB] text-xs bg-white w-64"
            />
            <select data-tl="select-advance-status" className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
              <option>All statuses</option>
            </select>
          </div>

          {/* Table */}
          <div data-tl="advance-admin-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Requested</th>
                  <th className="py-3 px-4">Instalments</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                <tr data-tl="advance-row-alex" className="hover:bg-gray-50/70">
                  <td className="py-3 px-4 font-medium">Alex Morgan</td>
                  <td className="py-3 px-4 font-mono font-semibold">
                    <span data-tl="advance-amount-link" className="text-[#7014D9] hover:underline cursor-pointer">
                      £700.00
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">22/10/2026</td>
                  <td className="py-3 px-4 text-[#4B5563]">2</td>
                  <td className="py-3 px-4">
                    <span data-tl="pill-advance-approved-not-paid" className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      Approved - not paid
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      type="button"
                      data-tl="btn-advance-row-actions"
                      onClick={() =>
                        tl.setVar("wfAdvanceMenuOpenId", advanceMenuOpenId ? null : "alex")
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Icon name="dots" size={16} />
                    </button>

                    {advanceMenuOpenId === "alex" && (
                      <div className="absolute right-4 top-10 z-30 w-36 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs">
                        <button
                          type="button"
                          data-tl="menu-item-view-details"
                          onClick={() => tl.setVar("wfAdvanceMenuOpenId", null)}
                          className="w-full px-3 py-1.5 text-left text-[#111827] hover:bg-gray-100"
                        >
                          View details
                        </button>
                        <button
                          type="button"
                          data-tl="menu-item-cancel-request"
                          onClick={() => tl.setVar("wfAdvanceMenuOpenId", null)}
                          className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50"
                        >
                          Cancel request
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Import / Export */}
      {currentTab === "import-export" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">Import and export</h2>
              <p className="text-xs text-[#6B7280]">Upload salaries, review changes and download payroll files.</p>
            </div>
            <button
              type="button"
              data-tl="btn-import-salaries"
              onClick={() => tl.setVar("wfImportSalariesModalOpen", true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] shadow-sm"
            >
              <Icon name="upload" size={14} />
              <span>Import salaries</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Import template */}
            <div data-tl="card-import-template" className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold text-[#111827]">Import template</h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  Replace the example row with your employees. Amounts are annual; earning components must total the annual salary.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  data-tl="btn-excel-template"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50"
                >
                  <Icon name="download" size={13} />
                  <span>Excel template</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-csv-template"
                  onClick={() => tl.toast("Template downloaded")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50"
                >
                  <Icon name="download" size={13} />
                  <span>CSV template</span>
                </button>
              </div>
            </div>

            {/* Card 2: Export payroll */}
            <div data-tl="card-export-payroll" className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold text-[#111827]">Export payroll</h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <select data-tl="select-export-config" defaultValue="Salary configurations" className="h-8 px-2 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                    <option>Salary configurations</option>
                  </select>
                  <select data-tl="select-export-format" defaultValue="Excel" className="h-8 px-2 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-2">
                  History includes completed and paid payroll runs in their original currencies.
                </p>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  data-tl="btn-start-export"
                  className="px-3.5 py-1.5 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8]"
                >
                  Start export
                </button>
              </div>
            </div>
          </div>

          {/* Recent transfers */}
          <div data-tl="section-recent-transfers" className="flex flex-col gap-3">
            <div>
              <h3 className="text-xs font-semibold text-[#111827]">Recent transfers</h3>
              <p className="text-xs text-[#6B7280]">Download files and row reports within 7 days.</p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                  {RECENT_TRANSFERS_DATA.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-4 text-[#4B5563]">{t.created}</td>
                      <td className="py-3 px-4 font-medium">{t.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-[#4B5563]"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{t.progress}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          data-tl={idx === 0 ? "btn-view-details-transfer-1" : undefined}
                          className="px-2.5 py-1 rounded-md border border-[#D1D5DB] text-[11px] font-medium text-[#4B5563] hover:bg-gray-50"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Tax calculator */}
      {currentTab === "tax-calculator" && (
        <div className="flex flex-col gap-5">
          <h2 data-tl="tax-calc-heading" className="text-base font-semibold text-[#111827]">
            Tax calculator
          </h2>

          <div data-tl="card-tax-calc" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">Employee</label>
                <select
                  data-tl="select-tax-employee"
                  value={taxEmployee || "Select an employee"}
                  onChange={(e) => tl.setVar("wfTaxEmployee", e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white text-[#111827]"
                >
                  <option>Select an employee</option>
                  <option value="Alex Morgan (GBP)">Alex Morgan (GBP)</option>
                  <option value="Jordan Lee (GBP)">Jordan Lee (GBP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">Calculation date</label>
                <input
                  type="text"
                  data-tl="input-tax-date"
                  defaultValue="30/10/2026"
                  className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white text-[#111827]"
                />
              </div>
            </div>

            {/* Salary breakdown block (when Alex selected) */}
            {taxEmployee === "Alex Morgan (GBP)" && (
              <div data-tl="block-tax-salary-breakdown" className="p-4 rounded-xl border border-purple-200 bg-[#FAF5FF] flex flex-col gap-2">
                <span className="font-semibold text-xs text-[#7014D9]">
                  £48,000.00 per year / £4,000.00 per pay period (Monthly)
                </span>
                <table className="w-full text-left text-xs mt-1">
                  <thead className="text-[#6B7280] border-b border-purple-200">
                    <tr>
                      <th className="pb-1">Component</th>
                      <th className="pb-1">Annual amount</th>
                      <th className="pb-1">Tax treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium text-[#111827]">Basic salary</td>
                      <td className="py-1 font-mono">£48,000.00</td>
                      <td className="py-1 text-[#4B5563]">Taxable earning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Collapsible Adjust calculation */}
            <div className="border-t border-[#F3F4F6] pt-3">
              <button
                type="button"
                data-tl="accordion-adjust-tax"
                onClick={() => tl.setVar("wfTaxAdjustOpen", !taxAdjustOpen)}
                className="text-xs text-[#7014D9] font-medium flex items-center gap-1 hover:underline"
              >
                <span>Adjust calculation</span>
                <Icon name="chevronDown" size={12} className={taxAdjustOpen ? "rotate-180" : ""} />
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                data-tl="btn-calculate-tax"
                onClick={() => tl.setVar("wfTaxCalculated", true)}
                className="px-4 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] shadow-sm"
              >
                Calculate tax
              </button>
            </div>
          </div>

          {/* Results cards */}
          {taxCalculated && (
            <div data-tl="tax-results-cards" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div data-tl="card-tax-annual" className="p-5 rounded-2xl border border-purple-200 bg-[#FAF5FF] shadow-2xs">
                <span className="text-xs text-[#6B7280]">Annual tax</span>
                <span className="text-xl font-bold text-[#7014D9] block mt-1 font-mono">
                  £7,086.00
                </span>
              </div>
              <div data-tl="card-tax-pay-period" className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-xs text-[#6B7280]">Tax per pay period</span>
                <span className="text-xl font-bold text-[#111827] block mt-1 font-mono">
                  £590.50
                </span>
              </div>
              <div data-tl="card-tax-additional" className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-xs text-[#6B7280]">Additional contribution per pay period</span>
                <span className="text-xl font-bold text-[#111827] block mt-1 font-mono">
                  £0.00
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 8: Pension calculator */}
      {currentTab === "pension-calculator" && (
        <div className="flex flex-col gap-5">
          <h2 data-tl="pension-calc-heading" className="text-base font-semibold text-[#111827]">
            Pension calculator
          </h2>

          <div data-tl="card-pension-calc" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">Employee</label>
                <select
                  data-tl="select-pension-employee"
                  value={pensionEmployee || "Select an employee"}
                  onChange={(e) => tl.setVar("wfPensionEmployee", e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white text-[#111827] focus:border-[#7014D9]"
                >
                  <option>Select an employee</option>
                  <option value="Alex Morgan (GBP)">Alex Morgan (GBP)</option>
                  <option value="Jordan Lee (GBP)">Jordan Lee (GBP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4B5563] mb-1">Calculation date</label>
                <input
                  type="text"
                  data-tl="input-pension-date"
                  defaultValue="30/10/2026"
                  className="w-full h-9 px-3 rounded-xl border border-[#D1D5DB] text-xs bg-white text-[#111827]"
                />
              </div>
            </div>

            {/* Salary breakdown */}
            <div data-tl="block-pension-salary-breakdown" className="p-4 rounded-xl border border-purple-200 bg-[#FAF5FF] flex flex-col gap-2">
              <span className="font-semibold text-xs text-[#7014D9]">
                £48,000.00 per year / £4,000.00 per pay period (Monthly)
              </span>
              <table className="w-full text-left text-xs mt-1">
                <thead className="text-[#6B7280] border-b border-purple-200">
                  <tr>
                    <th className="pb-1">Component</th>
                    <th className="pb-1">Annual amount</th>
                    <th className="pb-1">Pension treatment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 font-medium text-[#111827]">Basic salary</td>
                    <td className="py-1 font-mono">£48,000.00</td>
                    <td className="py-1 text-[#4B5563]">Included</td>
                  </tr>
                </tbody>
              </table>
              <span className="text-[11px] text-[#6B7280] mt-1">
                Employee 8% / Employer 10%
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                data-tl="btn-calculate-pension"
                onClick={() => tl.setVar("wfPensionCalculated", true)}
                className="px-4 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] shadow-sm"
              >
                Calculate pension
              </button>
            </div>
          </div>

          {/* Results cards */}
          {pensionCalculated && (
            <div data-tl="pension-results-cards" className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div data-tl="card-pension-emp-period" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-[11px] text-[#6B7280]">Employee per pay period</span>
                <span className="text-base font-bold text-[#111827] block mt-1 font-mono">
                  £320.00
                </span>
              </div>
              <div data-tl="card-pension-empr-period" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-[11px] text-[#6B7280]">Employer per pay period</span>
                <span className="text-base font-bold text-[#111827] block mt-1 font-mono">
                  £400.00
                </span>
              </div>
              <div data-tl="card-pension-emp-annual" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-[11px] text-[#6B7280]">Annual employee</span>
                <span className="text-base font-bold text-[#111827] block mt-1 font-mono">
                  £3,840.00
                </span>
              </div>
              <div data-tl="card-pension-empr-annual" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
                <span className="text-[11px] text-[#6B7280]">Annual employer</span>
                <span className="text-base font-bold text-[#111827] block mt-1 font-mono">
                  £4,800.00
                </span>
              </div>
              <div data-tl="card-pension-total-period" className="p-4 rounded-2xl border border-purple-200 bg-[#FAF5FF] shadow-2xs">
                <span className="text-[11px] text-[#7014D9] font-semibold">Total per pay period</span>
                <span className="text-base font-bold text-[#7014D9] block mt-1 font-mono">
                  £720.00
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 9: Tax & Pension settings */}
      {currentTab === "tax-pension-settings" && (
        <div data-scroller className="flex flex-col gap-6">
          <div data-tl="settings-intro" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs text-[#4B5563] shadow-2xs">
            <span className="font-semibold text-[#111827] block mb-0.5">One shared template for your organisation.</span>
            Set the brackets, reliefs and contributions that apply to your employees.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Currency</label>
              <select data-tl="select-settings-currency" defaultValue="GBP" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                <option>GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Effective from</label>
              <input type="text" defaultValue="01/01/2026" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#4B5563] mb-1">Effective to</label>
              <input type="text" defaultValue="31/12/2026" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white" />
            </div>
          </div>

          {/* Card: Income tax brackets */}
          <div data-tl="card-tax-brackets" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4">
            <div>
              <h3 className="text-xs font-semibold text-[#111827]">Income tax brackets</h3>
              <p className="text-[11px] text-[#6B7280]">
                Annual taxable earnings in GBP. Each rate applies only to earnings within that bracket.
              </p>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="text-[#6B7280] border-b border-[#F3F4F6]">
                <tr>
                  <th className="pb-2">Upper limit</th>
                  <th className="pb-2">Tax rate (%)</th>
                  <th className="pb-2 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {TAX_BRACKETS_DATA.map((b, i) => (
                  <tr key={b.id}>
                    <td className="py-2">
                      <input
                        type="text"
                        data-tl={`input-bracket-limit-${i + 1}`}
                        defaultValue={b.upperLimit}
                        className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs w-36 focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9]"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        defaultValue={b.rate}
                        className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs w-24"
                      />
                    </td>
                    <td className="py-2 text-right">
                      <button type="button" className="text-red-500 hover:text-red-700">✕</button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2 font-medium text-[#4B5563]">Final bracket: Above 125,140</td>
                  <td className="py-2">
                    <input
                      type="text"
                      data-tl="bracket-final-rate"
                      defaultValue="45"
                      className="h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs w-24"
                    />
                  </td>
                  <td className="py-2 text-right"></td>
                </tr>
              </tbody>
            </table>

            <div>
              <button type="button" data-tl="btn-add-bracket" className="text-xs font-semibold text-[#7014D9] hover:underline">
                + Add bracket
              </button>
            </div>
          </div>

          {/* Card: Allowances and reliefs */}
          <div data-tl="card-allowances" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#111827]">Allowances and reliefs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Annual personal allowance</label>
                <input type="text" data-tl="input-personal-allowance" defaultValue="0" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Annual earnings exempt from income tax</label>
                <input type="text" defaultValue="0" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Housing / rent relief (%)</label>
                <input type="text" defaultValue="0" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Maximum annual housing / rent relief</label>
                <input type="text" defaultValue="0" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-[#374151] pt-1">
              <input type="checkbox" className="text-[#7014D9] rounded" />
              <span>Reduce the personal allowance at higher earnings</span>
            </label>
          </div>

          {/* Card: Pension contributions */}
          <div data-tl="card-pension-contributions" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#111827]">Pension contributions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Employee contribution (%)</label>
                <input type="text" data-tl="input-pension-emp-rate" defaultValue="8" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
              <div>
                <label className="block text-[11px] text-[#4B5563] mb-1">Employer contribution (%)</label>
                <input type="text" data-tl="input-pension-empr-rate" defaultValue="10" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-[#4B5563] mb-1">Pensionable earnings</label>
              <select defaultValue="All earning components" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                <option>All earning components</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-[#4B5563] mb-1">Pension tax relief method</label>
              <select defaultValue="No relief deducted from the employee contribution" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] text-xs bg-white">
                <option>No relief deducted from the employee contribution</option>
              </select>
            </div>
          </div>

          {/* Card: Salary components */}
          <div data-tl="card-tax-components" className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-3">
            <div>
              <h3 className="text-xs font-semibold text-[#111827]">Salary components</h3>
              <p className="text-[11px] text-[#6B7280]">These selections apply to every employee using the template.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" data-tl="cb-comp-basic-taxable" defaultChecked className="text-[#7014D9] rounded" />
                <span>Basic salary (Taxable)</span>
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" data-tl="cb-comp-housing-taxable" className="text-[#7014D9] rounded" />
                <span>Housing (Taxable)</span>
              </label>
            </div>
            <div>
              <button type="button" data-tl="btn-use-comp-tax-settings" className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50">
                Use pay component tax settings
              </button>
            </div>
          </div>

          {/* Collapsible Earnings limits */}
          <div data-tl="accordion-earnings-limits" className="p-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs font-medium text-[#4B5563] flex items-center justify-between">
            <span>Earnings limits and additional employee contributions</span>
            <Icon name="chevronDown" size={14} />
          </div>

          {/* Reason for change */}
          <div>
            <label className="block text-xs font-medium text-[#4B5563] mb-1">Reason for change</label>
            <textarea
              data-tl="textarea-reason-change"
              rows={2}
              placeholder="Explain the background for template updates..."
              className="w-full p-2.5 rounded-xl border border-[#D1D5DB] text-xs focus:border-[#7014D9] focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* MODAL 1: Add Salary Component (Step 65) */}
      {addCompModalOpen && (
        <div data-tl="modal-add-component" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
              <h3 className="font-bold text-sm text-[#111827]">Add Salary Component</h3>
              <button
                type="button"
                data-tl="btn-close-add-comp"
                onClick={() => tl.setVar("wfAddComponentModalOpen", false)}
                className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <div>
                <label className="block font-medium text-[#374151] mb-1">Name *</label>
                <input
                  type="text"
                  data-tl="input-comp-name"
                  placeholder="e.g. Basic Salary"
                  className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Type *</label>
                <select data-tl="select-comp-type" defaultValue="Earning" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] bg-white">
                  <option value="Earning">Earning</option>
                  <option value="Deduction">Deduction</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Calculation Type *</label>
                <select data-tl="select-calc-type" defaultValue="Flat" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] bg-white">
                  <option value="Flat">Flat</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" data-tl="cb-comp-taxable" className="rounded text-[#7014D9]" />
                  <span>Taxable</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" data-tl="cb-comp-recurring" defaultChecked className="rounded text-[#7014D9]" />
                  <span>Recurring</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3F4F6]">
              <button
                type="button"
                data-tl="btn-cancel-add-comp"
                onClick={() => tl.setVar("wfAddComponentModalOpen", false)}
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-create-add-comp"
                className="px-3.5 py-1.5 rounded-lg bg-[#7014D9] text-white text-xs font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Assign Salary (Step 67) */}
      {assignSalaryModalOpen && (
        <div data-tl="modal-assign-salary" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-xl max-h-[85vh] rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6] shrink-0">
              <h3 className="font-bold text-sm text-[#111827]">Assign Salary</h3>
              <button
                type="button"
                data-tl="btn-close-assign-salary"
                onClick={() => tl.setVar("wfAssignSalaryModalOpen", false)}
                className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div data-scroller="assign-salary-body" className="p-6 overflow-y-auto flex flex-col gap-4 text-xs">
              {/* Employee picker */}
              <div className="relative">
                <label className="block font-medium text-[#374151] mb-1">Employee *</label>
                <button
                  type="button"
                  data-tl="btn-select-employees-collapse"
                  onClick={() => setEmpDropdownOpen(!empDropdownOpen)}
                  className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB] bg-white flex items-center justify-between text-[#4B5563]"
                >
                  <span>Select employees</span>
                  <Icon name="chevronDown" size={13} />
                </button>
                {empDropdownOpen && (
                  <div className="mt-1 p-3 rounded-xl border border-[#E5E7EB] bg-gray-50 flex flex-col gap-2">
                    <input type="text" data-tl="input-search-salary-emp" placeholder="Search name or email" className="w-full h-7 px-2 rounded border border-[#D1D5DB] bg-white text-xs" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" data-tl="cb-select-all-active" className="rounded text-[#7014D9]" />
                      <span className="font-semibold text-[#111827]">Select all active employees (2)</span>
                    </label>
                    <label className="flex items-center gap-2 pl-2">
                      <input type="checkbox" data-tl="cb-emp-alex" defaultChecked className="rounded text-[#7014D9]" />
                      <span>Alex Morgan (alex.morgan@snaarp.com)</span>
                    </label>
                    <label className="flex items-center gap-2 pl-2">
                      <input type="checkbox" data-tl="cb-emp-jordan" className="rounded text-[#7014D9]" />
                      <span>Jordan Lee (jordan.lee@snaarp.com)</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Salary per month *</label>
                  <input type="text" data-tl="input-salary-per-month" placeholder="e.g. 4000" defaultValue="4000" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]" />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Currency *</label>
                  <select data-tl="select-salary-currency" defaultValue="GBP" className="w-full h-8 px-2.5 rounded-lg border border-[#7014D9] bg-white text-[#111827]">
                    <option value="GBP">GBP - British Pound</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1">
                <span data-tl="text-annual-salary" className="font-semibold text-[#7014D9]">
                  Annual salary: £48,000.00
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Pay Frequency *</label>
                  <select data-tl="select-pay-frequency" defaultValue="Monthly" className="w-full h-8 px-2.5 rounded-lg border border-[#7014D9] ring-2 ring-purple-100 bg-white">
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Effective From *</label>
                  <input type="text" data-tl="input-salary-effective" defaultValue="24/10/2026" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]" />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Remarks</label>
                <input type="text" data-tl="input-salary-remarks" placeholder="Optional notes" className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]" />
              </div>

              {/* Bank Details */}
              <div data-tl="card-salary-bank-details" className="p-4 rounded-xl border border-[#E5E7EB] bg-gray-50 flex flex-col gap-2.5">
                <span className="font-bold text-xs text-[#111827]">Bank Details</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#4B5563] mb-1">Bank Name</label>
                    <select data-tl="select-bank-name" defaultValue="Sample Bank" className="w-full h-7 px-2 rounded border border-[#D1D5DB] bg-white text-xs">
                      <option>Sample Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#4B5563] mb-1">Account Number</label>
                    <input type="text" data-tl="input-bank-account-num" placeholder="10-digit account number" defaultValue="12345678" className="w-full h-7 px-2 rounded border border-[#D1D5DB] text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#4B5563] mb-1">Account Name</label>
                    <input type="text" data-tl="input-bank-account-name" readOnly value="Auto-resolved" className="w-full h-7 px-2 rounded border border-[#E5E7EB] bg-gray-100 text-xs text-[#6B7280]" />
                  </div>
                </div>
              </div>

              {/* Component Breakdown */}
              <div data-tl="card-component-breakdown" className="p-4 rounded-xl border border-[#E5E7EB] bg-gray-50 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#111827]">Component Breakdown (per month) *</span>
                  <button
                    type="button"
                    data-tl="btn-add-salary-component"
                    onClick={() => tl.setVar("wfAssignSalaryComponentAdded", true)}
                    className="text-xs font-semibold text-[#7014D9] hover:underline"
                  >
                    + Add Component
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <select data-tl="select-comp-row-1" defaultValue="Basic salary (earning)" className="w-1/2 h-7 px-2 rounded border border-[#D1D5DB] bg-white text-xs">
                    <option>Basic salary (earning)</option>
                  </select>
                  <input type="text" data-tl="input-comp-amount-1" defaultValue="4000" className="w-1/2 h-7 px-2 rounded border border-[#D1D5DB] text-xs" />
                  <button type="button" data-tl="btn-remove-comp-1" className="text-red-500">✕</button>
                </div>

                {assignSalaryCompAdded && (
                  <div className="flex items-center gap-2 relative">
                    <button
                      type="button"
                      data-tl="select-comp-row-2"
                      onClick={() => setCompSelectOpen(!compSelectOpen)}
                      className="w-1/2 h-7 px-2 rounded border border-[#D1D5DB] bg-white text-xs flex items-center justify-between"
                    >
                      <span>Housing (earning)</span>
                      <Icon name="chevronDown" size={11} />
                    </button>
                    {compSelectOpen && (
                      <div className="absolute left-0 top-8 z-30 w-1/2 rounded border border-[#E5E7EB] bg-white py-1 shadow text-xs">
                        <div className="px-2 py-1 hover:bg-purple-50 cursor-pointer">Select component</div>
                        <div className="px-2 py-1 hover:bg-purple-50 cursor-pointer">Basic salary (earning)</div>
                        <div data-tl="opt-comp-housing" className="px-2 py-1 hover:bg-purple-50 text-[#7014D9] font-medium cursor-pointer">Housing (earning)</div>
                      </div>
                    )}
                    <input type="text" defaultValue="0" className="w-1/2 h-7 px-2 rounded border border-[#D1D5DB] text-xs" />
                    <button type="button" className="text-red-500">✕</button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-[#F3F4F6] shrink-0 bg-gray-50/50">
              <button
                type="button"
                data-tl="btn-cancel-assign-salary"
                onClick={() => tl.setVar("wfAssignSalaryModalOpen", false)}
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-submit-assign-salary"
                className="px-3.5 py-1.5 rounded-lg bg-[#7014D9] text-white text-xs font-semibold"
              >
                Assign Salary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Advance Policy (Step 71) */}
      {advancePolicyModalOpen && (
        <div data-tl="modal-advance-policy" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
              <h3 className="font-bold text-sm text-[#111827]">Salary advance policy</h3>
              <button
                type="button"
                data-tl="btn-close-advance-policy"
                onClick={() => tl.setVar("wfAdvancePolicyModalOpen", false)}
                className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <label className="flex items-center gap-2 font-medium">
                <input type="checkbox" data-tl="cb-enable-advances" defaultChecked className="rounded text-[#7014D9]" />
                <span>Enable salary advance requests</span>
              </label>

              <div>
                <label className="block text-[#4B5563] mb-1">Maximum percentage of gross pay per salary period</label>
                <input type="number" data-tl="input-max-gross-pct" defaultValue={50} className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]" />
              </div>

              <div>
                <label className="block text-[#4B5563] mb-1">Maximum instalments</label>
                <input type="number" data-tl="input-max-instalments" defaultValue={3} className="w-full h-8 px-2.5 rounded-lg border border-[#D1D5DB]" />
              </div>

              <div>
                <label className="block text-[#4B5563] mb-1">Minimum service (days)</label>
                <input
                  type="number"
                  data-tl="input-min-service"
                  defaultValue={0}
                  className="w-full h-8 px-2.5 rounded-lg border border-[#7014D9] ring-2 ring-purple-100"
                />
              </div>

              <p className="text-[11px] text-[#9CA3AF]">
                Approved requests remain unpaid. These settings do not create payroll deductions.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3F4F6]">
              <button
                type="button"
                data-tl="btn-cancel-advance-policy"
                onClick={() => tl.setVar("wfAdvancePolicyModalOpen", false)}
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-save-advance-policy"
                className="px-3.5 py-1.5 rounded-lg bg-[#7014D9] text-white text-xs font-semibold"
              >
                Save policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Import Salaries (Step 73) */}
      {importSalariesModalOpen && (
        <div data-tl="modal-import-salaries" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
              <h3 className="font-bold text-sm text-[#111827]">Import employee salaries</h3>
              <button
                type="button"
                data-tl="btn-close-import-salaries"
                onClick={() => tl.setVar("wfImportSalariesModalOpen", false)}
                className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <p className="text-[11px] text-[#6B7280]">
                CSV or Excel (.xlsx), up to 2 MB and 2,000 rows. Only active employees in this organisation can be imported.
              </p>

              {/* File picker simulation */}
              <div className="relative">
                <button
                  type="button"
                  data-tl="input-file-import"
                  onClick={() => setFilePickerOpen(!filePickerOpen)}
                  className="w-full h-9 px-3 rounded-lg border border-[#D1D5DB] text-xs flex items-center justify-between bg-white text-left text-[#374151]"
                >
                  <span>{importPayrollFile || "Choose File  No file chosen"}</span>
                  <Icon name="docFile" size={14} className="text-[#6B7280]" />
                </button>

                {filePickerOpen && (
                  <div data-tl="picker-file-list" className="absolute left-0 top-11 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-lg text-xs">
                    <div
                      data-tl="file-option-csv"
                      onClick={() => {
                        tl.setVar("wfImportPayrollFile", "payroll-template.csv");
                        setFilePickerOpen(false);
                      }}
                      className="p-2 rounded-lg hover:bg-purple-50 text-[#7014D9] font-medium cursor-pointer flex items-center gap-2"
                    >
                      <Icon name="csvFile" size={14} />
                      <span>payroll-template.csv</span>
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" data-tl="cb-include-existing" className="rounded text-[#7014D9]" />
                <span>Include existing salaries for replacement review</span>
              </label>

              <p className="text-[11px] text-[#9CA3AF]">
                Existing salaries are skipped by default. Uploading prepares a preview; salaries are saved only after confirmation.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F3F4F6]">
              <button
                type="button"
                data-tl="btn-cancel-import-salaries"
                onClick={() => tl.setVar("wfImportSalariesModalOpen", false)}
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-upload-validate"
                disabled={!importPayrollFile}
                onClick={() => {
                  tl.setVar("wfImportSalariesModalOpen", false);
                  tl.setVar("wfPayrollTransferModalOpen", true);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                  importPayrollFile
                    ? "bg-[#7014D9] text-white hover:bg-[#5E11B8]"
                    : "bg-purple-200 text-purple-700 cursor-not-allowed"
                }`}
              >
                Upload and validate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Payroll Transfer Preview (Step 73) */}
      {payrollTransferModalOpen && (
        <div data-tl="modal-payroll-transfer" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
              <div>
                <h3 className="font-bold text-sm text-[#111827]">Payroll transfer</h3>
                <span className="text-[11px] text-[#6B7280]">Ready for review · ready: 2</span>
              </div>
              <span className="text-xs font-semibold text-[#7014D9]">2 / 2</span>
            </div>

            <div className="p-6 flex flex-col gap-4 text-xs overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                  <tr>
                    <th className="py-2 px-3">Row</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Changes / reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-[#374151]">
                  <tr>
                    <td className="py-2 px-3 font-mono">2</td>
                    <td className="py-2 px-3 font-medium text-[#111827]">alex.morgan@snaarp.com</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        CREATE
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[11px] text-[#6B7280]">
                      4000 GBP / Monthly; 2026-10-24 / Sample Bank - 12345678 ALEX MORGAN / &gt; Component changes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">3</td>
                    <td className="py-2 px-3 font-medium text-[#111827]">jordan.lee@snaarp.com</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        CREATE
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[11px] text-[#6B7280]">
                      2000 GBP / Monthly; 2026-10-24 / Sample Bank - 87654321 JORDAN LEE / &gt; Component changes
                    </td>
                  </tr>
                </tbody>
              </table>

              <label className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  data-tl="cb-confirm-transfer"
                  checked={transferConfirmed}
                  onChange={(e) => tl.setVar("wfTransferConfirmed", e.target.checked)}
                  className="rounded text-[#7014D9]"
                />
                <span className="text-xs font-medium text-[#111827]">
                  I have reviewed these rows and confirm importing valid salaries.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-[#F3F4F6] bg-gray-50/50">
              <button
                type="button"
                data-tl="btn-download-row-report"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
              >
                Download row report
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-tl="btn-cancel-transfer"
                  onClick={() => tl.setVar("wfPayrollTransferModalOpen", false)}
                  className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] text-xs text-[#4B5563]"
                >
                  Cancel transfer
                </button>
                <button
                  type="button"
                  data-tl="btn-confirm-import"
                  disabled={!transferConfirmed}
                  onClick={() => {
                    tl.setVar("wfPayrollTransferModalOpen", false);
                    tl.setVar("wfTransferToast", true);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                    transferConfirmed
                      ? "bg-[#7014D9] text-white hover:bg-[#5E11B8]"
                      : "bg-purple-200 text-purple-700 cursor-not-allowed"
                  }`}
                >
                  Confirm import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast / corner card: Payroll transfer completed (Step 73) */}
      {transferToast && (
        <div
          data-tl="card-transfer-completed"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl bg-[#111827] text-white shadow-xl text-xs animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
            <Icon name="check" size={14} />
          </div>
          <div>
            <span className="font-semibold block">Payroll transfer</span>
            <span className="text-[11px] text-gray-300">Completed · 2 / 2 · View results</span>
          </div>
        </div>
      )}
    </div>
  );
}
