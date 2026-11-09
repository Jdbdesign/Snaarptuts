"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  Search,
  Plus,
  LayoutGrid,
  Key,
  FileText,
  CreditCard,
  UserCheck,
} from "lucide-react";
import {
  type Vault,
  type VaultItem,
  type ItemType,
  INITIAL_VAULTS,
  LOCK_URLS,
} from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockVaultItemsView({ tl }: Props) {
  const vaults = useTimelineVar<Vault[]>(tl, "lockVaults", INITIAL_VAULTS);
  const selectedVaultId = useTimelineVar<string>(tl, "lockSelectedVaultId", "social-vault");
  const activeFilter = useTimelineVar<ItemType>(tl, "lockItemsFilter", "all");
  const searchQuery = useTimelineVar<string>(tl, "lockItemsSearch", "");

  const vault = vaults.find((v) => v.id === selectedVaultId) || vaults[0];

  const handleBack = () => {
    tl.setVar("lockView", "vaults");
    tl.setUrl(LOCK_URLS.vaults);
  };

  const handleOpenAddModal = (type: "login" | "note" | "card" | "identity" = "login") => {
    tl.setVar("lockAddModalType", type);
    tl.setVar("lockAddModalOpen", true);
  };

  const handleOpenEdit = (item: VaultItem) => {
    tl.setVar("lockEditItemId", item.id);
    tl.setVar("lockEditTitle", item.title);
    tl.setVar("lockEditUrl", item.websiteUrl || "www.google.com");
    tl.setVar("lockEditUsername", item.username || "jane@example.com");
    tl.setVar("lockEditPassword", item.password || "••••••••••••");
    tl.setVar("lockEditNotes", item.notes || "Just for personal use");
    tl.setVar("lockEditModalOpen", true);
  };

  if (!vault) return null;

  const loginCount = vault.items.filter((i) => i.type === "login").length;
  const noteCount = vault.items.filter((i) => i.type === "note").length;
  const cardCount = vault.items.filter((i) => i.type === "card").length;
  const identityCount = vault.items.filter((i) => i.type === "identity").length;

  const filteredItems = vault.items.filter((item) => {
    if (activeFilter !== "all" && item.type !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        (item.username && item.username.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filterTabs: Array<{ id: ItemType; label: string; count: number; icon: React.ReactNode }> = [
    { id: "all", label: "All", count: vault.items.length, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "login", label: "Login", count: loginCount, icon: <Key className="w-3.5 h-3.5" /> },
    { id: "note", label: "Secure Note", count: noteCount, icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "card", label: "Credit Card", count: cardCount, icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: "identity", label: "Identity", count: identityCount, icon: <UserCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className="flex-1 p-8 overflow-y-auto no-scrollbar select-none"
      data-tl="vault-items-root"
      data-lock-scroll="true"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {/* Top Bar with Back, Title, Search and Add */}
        <div className="flex items-center justify-between" data-tl="vault-items-header">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Vaults"
              data-tl="btn-vault-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900 tracking-tight" data-tl="vault-items-title">
                {vault.name}
              </h1>
              <p className="text-[12px] text-gray-500" data-tl="vault-items-count">
                {vault.items.length} total {vault.items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => tl.setVar("lockItemsSearch", e.target.value)}
                placeholder="Search items..."
                className="pl-9 pr-3.5 py-1.5 w-56 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                data-tl="input-items-search"
              />
            </div>

            <button
              type="button"
              onClick={() => handleOpenAddModal("login")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors"
              data-tl="btn-add-item"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Item</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2" data-tl="chips-item-types">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => tl.setVar("lockItemsFilter", tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-white text-gray-600 border border-gray-200/90 hover:bg-gray-50 hover:text-gray-900"
                }`}
                data-tl={`filter-chip-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                    isActive ? "bg-purple-700 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vault Items Grid / Empty State */}
        {vault.items.length === 0 ? (
          <div
            className="mt-12 mx-auto max-w-sm flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl shadow-xs text-center"
            data-tl="empty-vault-card"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-1" data-tl="empty-vault-title">
              No items yet
            </h3>
            <p className="text-[13px] text-gray-500 mb-6" data-tl="empty-vault-subtitle">
              Add your first credential to this vault.
            </p>
            <button
              type="button"
              onClick={() => handleOpenAddModal("login")}
              className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors"
              data-tl="btn-add-first-item"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add First Item</span>
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
            No items match this filter or search query.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-tl="items-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenEdit(item)}
                className="group flex flex-col bg-white border border-gray-200/90 rounded-xl overflow-hidden shadow-2xs hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all"
                data-tl={`item-card-${item.id}`}
                data-item-title={item.title}
              >
                {/* Top Tile / Icon Banner */}
                <div
                  className="h-28 bg-gray-50/80 border-b border-gray-100 flex items-center justify-center relative group-hover:bg-purple-50/50 transition-colors"
                  data-tl={`item-tile-${item.id}`}
                >
                  {item.type === "login" ? (
                    item.title.toLowerCase().includes("google") ? (
                      <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center">
                        <span className="text-[18px] font-bold text-blue-500">G</span>
                      </div>
                    ) : item.title.toLowerCase().includes("github") ? (
                      <div className="w-11 h-11 rounded-xl bg-gray-900 shadow-2xs flex items-center justify-center text-white">
                        <span className="text-[14px] font-bold">GH</span>
                      </div>
                    ) : item.title.toLowerCase().includes("netflix") ? (
                      <div className="w-11 h-11 rounded-xl bg-red-600 shadow-2xs flex items-center justify-center text-white font-bold text-[18px]">
                        N
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                        <Key className="w-5 h-5" />
                      </div>
                    )
                  ) : item.type === "note" ? (
                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                  ) : item.type === "card" ? (
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Bottom Info Details */}
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <div
                      className="text-[13px] font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1"
                      data-tl={`item-title-${item.id}`}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-[11px] text-gray-500 truncate mt-0.5"
                      data-tl={`item-subtitle-${item.id}`}
                    >
                      {item.subtitle || item.username || item.websiteUrl || "—"}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 capitalize"
                      data-tl={`item-badge-${item.id}`}
                    >
                      {item.type === "login"
                        ? "Login"
                        : item.type === "note"
                        ? "Secure Note"
                        : item.type === "card"
                        ? "Credit Card"
                        : "Identity"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
