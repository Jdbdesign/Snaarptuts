"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  X,
  Key,
  FileText,
  CreditCard,
  UserCheck,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { type Vault, type VaultItem, INITIAL_VAULTS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockAddItemModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "lockAddModalOpen", false);
  const itemType = useTimelineVar<"login" | "note" | "card" | "identity">(
    tl,
    "lockAddModalType",
    "login"
  );
  const vaults = useTimelineVar<Vault[]>(tl, "lockVaults", INITIAL_VAULTS);
  const selectedVaultId = useTimelineVar<string>(tl, "lockSelectedVaultId", "personal-lock");

  // Form values in timeline
  const title = useTimelineVar<string>(tl, "lockAddTitle", "");
  const websiteUrl = useTimelineVar<string>(tl, "lockAddUrl", "");
  const username = useTimelineVar<string>(tl, "lockAddUsername", "");
  const password = useTimelineVar<string>(tl, "lockAddPassword", "");
  const notes = useTimelineVar<string>(tl, "lockAddNotes", "");
  const content = useTimelineVar<string>(tl, "lockAddContent", "");
  const cardName = useTimelineVar<string>(tl, "lockAddCardName", "");
  const cardholder = useTimelineVar<string>(tl, "lockAddCardholder", "");
  const cardNumber = useTimelineVar<string>(tl, "lockAddCardNumber", "");
  const month = useTimelineVar<string>(tl, "lockAddMonth", "");
  const year = useTimelineVar<string>(tl, "lockAddYear", "");
  const cvv = useTimelineVar<string>(tl, "lockAddCvv", "");
  const idName = useTimelineVar<string>(tl, "lockAddIdName", "");
  const firstName = useTimelineVar<string>(tl, "lockAddFirstName", "");
  const lastName = useTimelineVar<string>(tl, "lockAddLastName", "");
  const email = useTimelineVar<string>(tl, "lockAddEmail", "");
  const phone = useTimelineVar<string>(tl, "lockAddPhone", "");
  const address = useTimelineVar<string>(tl, "lockAddAddress", "");

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("lockAddModalOpen", false);
  };

  const handleSetType = (t: "login" | "note" | "card" | "identity") => {
    tl.setVar("lockAddModalType", t);
  };

  const handleSave = () => {
    const targetVault = vaults.find((v) => v.id === selectedVaultId) || vaults[0];
    if (!targetVault) return;

    let finalTitle = "";
    let finalSubtitle = "";

    if (itemType === "login") {
      finalTitle = title || "Google";
      finalSubtitle = websiteUrl || "www.google.com";
    } else if (itemType === "note") {
      finalTitle = title || "Certification Passwords";
      finalSubtitle = (content || "Keep the API keys safe").slice(0, 30);
    } else if (itemType === "card") {
      finalTitle = cardName || title || "Mastercard";
      finalSubtitle = cardholder || "Jane Doe";
    } else {
      finalTitle = idName || title || "Voter Card";
      finalSubtitle = `${firstName || "Jane"} ${lastName || "Doe"}`.trim();
    }

    const newItem: VaultItem = {
      id: `item-${Date.now()}`,
      type: itemType,
      title: finalTitle,
      subtitle: finalSubtitle,
      websiteUrl,
      username,
      password,
      notes,
      content,
      cardholder,
      cardNumber,
      month,
      year,
      cvv,
      firstName,
      lastName,
      email,
      phone,
      address,
    };

    tl.setVar(
      "lockVaults",
      vaults.map((v) =>
        v.id === targetVault.id
          ? {
              ...v,
              itemCount: v.items.length + 1,
              items: [...v.items, newItem],
            }
          : v
      )
    );

    // Reset inputs
    tl.setVar("lockAddTitle", "");
    tl.setVar("lockAddUrl", "");
    tl.setVar("lockAddUsername", "");
    tl.setVar("lockAddPassword", "");
    tl.setVar("lockAddNotes", "");
    tl.setVar("lockAddContent", "");
    tl.setVar("lockAddCardName", "");
    tl.setVar("lockAddCardholder", "");
    tl.setVar("lockAddCardNumber", "");
    tl.setVar("lockAddMonth", "");
    tl.setVar("lockAddYear", "");
    tl.setVar("lockAddCvv", "");
    tl.setVar("lockAddIdName", "");
    tl.setVar("lockAddFirstName", "");
    tl.setVar("lockAddLastName", "");
    tl.setVar("lockAddEmail", "");
    tl.setVar("lockAddPhone", "");
    tl.setVar("lockAddAddress", "");

    tl.setVar("lockAddModalOpen", false);
    tl.setVar("lockToast", "Item saved to vault");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs animate-in fade-in duration-100 p-4"
      data-tl="add-item-modal-backdrop"
    >
      <div
        className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        data-tl="add-item-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100" data-tl="add-item-header">
          <div>
            <h2 className="text-[16px] font-bold text-gray-900" data-tl="add-item-title">
              Add New Item
            </h2>
            <p className="text-[12px] text-gray-500 mt-0.5" data-tl="add-item-subtitle">
              Save new credentials to your vault
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            data-tl="btn-close-add-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-[13px]" data-tl="add-item-body">
          {/* Type Picker Tabs */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Credential Type
            </label>
            <div className="grid grid-cols-4 gap-2" data-tl="add-item-type-picker">
              <button
                type="button"
                onClick={() => handleSetType("login")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  itemType === "login"
                    ? "border-purple-600 bg-purple-50 text-purple-700 font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                data-tl="tab-type-login"
              >
                <Key className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetType("note")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  itemType === "note"
                    ? "border-purple-600 bg-purple-50 text-purple-700 font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                data-tl="tab-type-note"
              >
                <FileText className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Note</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetType("card")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  itemType === "card"
                    ? "border-purple-600 bg-purple-50 text-purple-700 font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                data-tl="tab-type-card"
              >
                <CreditCard className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Card</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetType("identity")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  itemType === "identity"
                    ? "border-purple-600 bg-purple-50 text-purple-700 font-medium"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
                data-tl="tab-type-identity"
              >
                <UserCheck className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Identity</span>
              </button>
            </div>
          </div>

          {/* Conditional Form Fields */}
          {itemType === "login" && (
            <div className="space-y-3" data-tl="form-login-fields">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Login Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => tl.setVar("lockAddTitle", e.target.value)}
                  placeholder="e.g. Google, Netflix, Bank..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-login-title"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={websiteUrl}
                  onChange={(e) => tl.setVar("lockAddUrl", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-login-url"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Username / Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => tl.setVar("lockAddUsername", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-login-username"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => tl.setVar("lockAddPassword", e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 pr-9 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    data-tl="btn-toggle-login-pass"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => tl.setVar("lockAddNotes", e.target.value)}
                  placeholder="Additional notes (optional)"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 resize-none"
                  data-tl="input-login-notes"
                />
              </div>
            </div>
          )}

          {itemType === "note" && (
            <div className="space-y-3" data-tl="form-note-fields">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => tl.setVar("lockAddTitle", e.target.value)}
                  placeholder="e.g. WiFi Password, Server Key..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-note-title"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Note Content
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => tl.setVar("lockAddContent", e.target.value)}
                  placeholder="Your secure note..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 resize-none"
                  data-tl="input-note-content"
                />
              </div>
            </div>
          )}

          {itemType === "card" && (
            <div className="space-y-3" data-tl="form-card-fields">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Card Name
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => tl.setVar("lockAddCardName", e.target.value)}
                  placeholder="e.g. Personal Visa, Corporate Card..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-card-title"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholder}
                  onChange={(e) => tl.setVar("lockAddCardholder", e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-card-holder"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => tl.setVar("lockAddCardNumber", e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-card-number"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Month
                  </label>
                  <input
                    type="text"
                    value={month}
                    onChange={(e) => tl.setVar("lockAddMonth", e.target.value)}
                    placeholder="MM"
                    maxLength={2}
                    className="w-full px-2.5 py-2 text-[13px] text-center bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-card-month"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => tl.setVar("lockAddYear", e.target.value)}
                    placeholder="YYYY"
                    maxLength={4}
                    className="w-full px-2.5 py-2 text-[13px] text-center bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-card-year"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => tl.setVar("lockAddCvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-2.5 py-2 text-[13px] text-center bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-card-cvv"
                  />
                </div>
              </div>
            </div>
          )}

          {itemType === "identity" && (
            <div className="space-y-3" data-tl="form-identity-fields">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Identity Name
                </label>
                <input
                  type="text"
                  value={idName}
                  onChange={(e) => tl.setVar("lockAddIdName", e.target.value)}
                  placeholder="e.g. Passport, Driver License..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-id-title"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => tl.setVar("lockAddFirstName", e.target.value)}
                    placeholder="Jane"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-id-first-name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => tl.setVar("lockAddLastName", e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                    data-tl="input-id-last-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => tl.setVar("lockAddEmail", e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-id-email"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => tl.setVar("lockAddPhone", e.target.value)}
                  placeholder="+44 7700 900123"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  data-tl="input-id-phone"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => tl.setVar("lockAddAddress", e.target.value)}
                  placeholder="123 Main St, London, UK"
                  className="w-full px-3 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 resize-none"
                  data-tl="input-id-address"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 border-t border-gray-100" data-tl="add-item-footer">
          <button
            type="button"
            onClick={handleClose}
            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            data-tl="btn-modal-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors"
            data-tl="btn-modal-save"
          >
            <Save className="w-4 h-4" />
            <span>Save to Vault</span>
          </button>
        </div>
      </div>
    </div>
  );
}
