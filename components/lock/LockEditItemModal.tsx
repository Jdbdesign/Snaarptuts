"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  X,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { type Vault, INITIAL_VAULTS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockEditItemModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "lockEditModalOpen", false);
  const itemId = useTimelineVar<string | null>(tl, "lockEditItemId", null);
  const activeTab = useTimelineVar<"details" | "advanced">(tl, "lockEditTab", "details");

  const title = useTimelineVar<string>(tl, "lockEditTitle", "Google");
  const websiteUrl = useTimelineVar<string>(tl, "lockEditUrl", "www.google.com");
  const username = useTimelineVar<string>(tl, "lockEditUsername", "jane@example.com");
  const password = useTimelineVar<string>(tl, "lockEditPassword", "••••••••••••");
  const notes = useTimelineVar<string>(tl, "lockEditNotes", "Just for personal use");

  const vaults = useTimelineVar<Vault[]>(tl, "lockVaults", INITIAL_VAULTS);
  const selectedVaultId = useTimelineVar<string>(tl, "lockSelectedVaultId", "personal-lock");

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("lockEditModalOpen", false);
  };

  const handleSave = () => {
    const targetVault = vaults.find((v) => v.id === selectedVaultId) || vaults[0];
    if (!targetVault) return;

    tl.setVar(
      "lockVaults",
      vaults.map((v) =>
        v.id === targetVault.id
          ? {
              ...v,
              items: v.items.map((it) =>
                it.id === itemId
                  ? {
                      ...it,
                      title,
                      subtitle: websiteUrl || username || it.subtitle,
                      websiteUrl,
                      username,
                      password,
                      notes,
                    }
                  : it
              ),
            }
          : v
      )
    );

    tl.setVar("lockEditModalOpen", false);
    tl.setVar("lockToast", "Item updated");
  };

  const handleRemove = () => {
    const targetVault = vaults.find((v) => v.id === selectedVaultId) || vaults[0];
    if (!targetVault) return;

    tl.setVar(
      "lockVaults",
      vaults.map((v) =>
        v.id === targetVault.id
          ? {
              ...v,
              itemCount: Math.max(0, v.items.length - 1),
              items: v.items.filter((it) => it.id !== itemId),
            }
          : v
      )
    );

    tl.setVar("lockEditModalOpen", false);
    tl.setVar("lockToast", "Item removed");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs animate-in fade-in duration-100 p-4"
      data-tl="edit-item-modal-backdrop"
    >
      <div
        className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        data-tl="edit-item-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100" data-tl="edit-modal-header">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="p-1 -ml-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              data-tl="btn-edit-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-[16px] font-bold text-gray-900 line-clamp-1" data-tl="edit-modal-title">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-transparent -mb-3 pb-3">
              <button
                type="button"
                onClick={() => tl.setVar("lockEditTab", "details")}
                className={`text-[12px] font-medium pb-1.5 transition-colors ${
                  activeTab === "details"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                data-tl="tab-edit-details"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => tl.setVar("lockEditTab", "advanced")}
                className={`text-[12px] font-medium pb-1.5 transition-colors ${
                  activeTab === "advanced"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                data-tl="tab-edit-advanced"
              >
                Advanced
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              data-tl="btn-close-edit-modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 text-[13px]" data-tl="edit-modal-body">
          {activeTab === "details" ? (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Login Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => tl.setVar("lockEditTitle", e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-edit-title"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => tl.setVar("lockEditUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 pr-9 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-edit-url"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => tl.setVar("lockEditUsername", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 pr-9 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-edit-username"
                  />
                  <button
                    type="button"
                    onClick={() => tl.setVar("lockToast", "Copied to clipboard")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    title="Copy username"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => tl.setVar("lockEditPassword", e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 pr-16 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-edit-password"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => tl.setVar("lockToast", "Copied to clipboard")}
                      className="hover:text-gray-600"
                      title="Copy password"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => tl.setVar("lockEditNotes", e.target.value)}
                  placeholder="Notes..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 resize-none"
                  data-tl="input-edit-notes"
                />
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-gray-400 text-[12px]">
              No advanced options configured for this credential.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 border-t border-gray-100" data-tl="edit-modal-footer">
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            data-tl="btn-edit-remove"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              data-tl="btn-edit-cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-[13px] font-medium text-white bg-[#5147C9] hover:bg-[#4338CA] rounded-lg shadow-2xs transition-colors"
              data-tl="btn-edit-save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
