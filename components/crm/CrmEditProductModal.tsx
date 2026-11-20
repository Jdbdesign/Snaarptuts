"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Package } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function CrmEditProductModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "crm:isEditProductOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="crm-edit-product-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-in fade-in duration-150"
    >
      <div
        data-tl="crm-edit-product-modal"
        className="w-full max-w-[560px] overflow-hidden rounded-[20px] bg-white shadow-2xl animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECECF1] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3ECFC] text-[#7C3AED]">
              <Package size={18} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#111111]">
                Edit Product
              </h2>
              <p className="text-[12px] text-[#6B7280]">
                Update product catalogue attributes
              </p>
            </div>
          </div>
          <button
            type="button"
            data-tl="crm-edit-product-cancel"
            onClick={() => tl.setVar("crm:isEditProductOpen", false)}
            className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body pre-filled for Lock: Password Manager */}
        <div className="space-y-4 p-6 text-[13px]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Product Name
              </label>
              <input
                type="text"
                readOnly
                defaultValue="Lock: Password Manager"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                SKU
              </label>
              <input
                type="text"
                readOnly
                defaultValue="LOCK-01"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Category
              </label>
              <select
                disabled
                defaultValue="Security"
                className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 text-[#111111] focus:outline-none"
              >
                <option>Security</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Price
              </label>
              <input
                type="text"
                readOnly
                defaultValue="4.99"
                className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#374151]">
                Currency
              </label>
              <select
                disabled
                defaultValue="GBP"
                className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3 py-2 text-[#111111] focus:outline-none"
              >
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-[#374151]">
              Description
            </label>
            <textarea
              rows={3}
              readOnly
              defaultValue="Vaulted company password manager."
              className="w-full rounded-xl border border-[#D1D5DB] px-3.5 py-2 text-[#111111] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="edit-product-active"
              defaultChecked
              readOnly
              className="h-4 w-4 rounded accent-[#7C3AED]"
            />
            <label
              htmlFor="edit-product-active"
              className="text-[12.5px] font-medium text-[#374151]"
            >
              Active and available for proposals & email templates
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#ECECF1] bg-[#F9FAFB] px-6 py-3.5">
          <button
            type="button"
            data-tl="crm-edit-product-cancel"
            onClick={() => tl.setVar("crm:isEditProductOpen", false)}
            className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => tl.setVar("crm:isEditProductOpen", false)}
            className="rounded-xl bg-[#7C3AED] px-5 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
