"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Lock, Plus, X, Package, Clock, Pencil, Trash2 } from "lucide-react";
import { type Vault, INITIAL_VAULTS, LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockVaultsView({ tl }: Props) {
  const vaults = useTimelineVar<Vault[]>(tl, "lockVaults", INITIAL_VAULTS);
  const isCreating = useTimelineVar<boolean>(tl, "lockCreatingVault", false);
  const createVaultName = useTimelineVar<string>(tl, "lockCreateVaultName", "");
  const deleteConfirmId = useTimelineVar<string | null>(tl, "lockDeleteConfirmId", null);

  const vaultToDelete = vaults.find((v) => v.id === deleteConfirmId);

  const handleStartCreate = () => {
    tl.setVar("lockCreatingVault", true);
  };

  const handleCancelCreate = () => {
    tl.setVar("lockCreatingVault", false);
    tl.setVar("lockCreateVaultName", "");
  };

  const handleSubmitCreate = () => {
    const name = createVaultName.trim() || "Personal Lock";
    const newVault: Vault = {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      itemCount: 0,
      date: "Today",
      items: [],
    };
    tl.setVar("lockVaults", [...vaults, newVault]);
    tl.setVar("lockCreatingVault", false);
    tl.setVar("lockCreateVaultName", "");
    tl.setVar("lockToast", "Vault created successfully");
  };

  const handleSelectVault = (vaultId: string) => {
    tl.setVar("lockSelectedVaultId", vaultId);
    tl.setVar("lockView", "vault-items");
    tl.setUrl(`${LOCK_URLS.vaults}/${vaultId}`);
  };

  const handleDeleteVaultClick = (vaultId: string) => {
    tl.setVar("lockDeleteConfirmId", vaultId);
  };

  const handleCancelDelete = () => {
    tl.setVar("lockDeleteConfirmId", null);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      tl.setVar(
        "lockVaults",
        vaults.filter((v) => v.id !== deleteConfirmId)
      );
      tl.setVar("lockDeleteConfirmId", null);
      tl.setVar("lockToast", "Vault deleted");
    }
  };

  return (
    <div
      className="flex-1 p-8 overflow-y-auto no-scrollbar select-none"
      data-tl="vaults-view-root"
      data-lock-scroll="true"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-start justify-between" data-tl="vaults-header">
          <div>
            <h1 className="text-[20px] font-bold text-gray-900 tracking-tight" data-tl="vaults-title">
              Vaults
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5" data-tl="vaults-subtitle">
              Organize and manage your credential vaults
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors"
            data-tl="btn-new-vault"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Vault</span>
          </button>
        </div>

        {/* Inline Create Vault Box */}
        {isCreating && (
          <div
            className="p-5 max-w-xl bg-white border border-gray-200 rounded-xl shadow-xs animate-in fade-in duration-150"
            data-tl="box-create-vault"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-semibold text-gray-900" data-tl="label-create-vault">
                  Create New Vault
                </span>
              </div>
              <button
                type="button"
                onClick={handleCancelCreate}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
                data-tl="btn-cancel-create-vault"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={createVaultName}
                onChange={(e) => tl.setVar("lockCreateVaultName", e.target.value)}
                placeholder="Enter vault name..."
                className="flex-1 px-3.5 py-2 text-[13px] bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                autoFocus
                data-tl="input-new-vault-name"
              />
              <button
                type="button"
                onClick={handleSubmitCreate}
                className="px-4 py-2 text-[13px] font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-2xs transition-colors"
                data-tl="btn-submit-create-vault"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Vaults Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" data-tl="vaults-grid">
          {vaults.map((vault) => {
            const cardTl = vault.id === "imported-from-chrome" ? "vault-card-chrome" : `vault-card-${vault.id}`;
            return (
              <div
                key={vault.id}
                onClick={() => handleSelectVault(vault.id)}
                className="group flex flex-col justify-between p-4.5 bg-white border border-gray-200/90 rounded-xl shadow-2xs hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all min-h-[165px]"
                data-tl={cardTl}
              >
              <div>
                {/* Tile Icon */}
                <div
                  className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3 group-hover:bg-purple-100 transition-colors"
                  data-tl={`vault-icon-${vault.id}`}
                >
                  <Lock className="w-4 h-4" />
                </div>

                {/* Title */}
                <div
                  className="text-[14px] font-semibold text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight line-clamp-1"
                  data-tl={`vault-name-${vault.id}`}
                >
                  {vault.name}
                </div>

                {/* Metadata */}
                <div className="flex flex-col gap-1 mt-2 text-[12px] text-gray-500">
                  <div className="flex items-center gap-1.5" data-tl={`vault-items-count-${vault.id}`}>
                    <Package className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      {vault.itemCount} {vault.itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400" data-tl={`vault-date-${vault.id}`}>
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{vault.date}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div
                className="flex items-center justify-between pt-2.5 mt-3 border-t border-gray-100 text-[11px]"
                onClick={(e) => e.stopPropagation()}
                data-tl={`vault-actions-${vault.id}`}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-colors"
                  data-tl={`btn-rename-${vault.id}`}
                >
                  <Pencil className="w-3 h-3" />
                  <span>Rename</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteVaultClick(vault.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors"
                  data-tl={`btn-delete-${vault.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && vaultToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs animate-in fade-in duration-100"
          data-tl="delete-vault-modal-backdrop"
        >
          <div
            className="w-[420px] bg-white rounded-2xl p-6 shadow-xl border border-gray-200 animate-in zoom-in-95 duration-150"
            data-tl="delete-vault-modal"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[17px] font-bold text-gray-900" data-tl="delete-vault-title">
                Delete Vault
              </h3>
              <button
                type="button"
                onClick={handleCancelDelete}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
                data-tl="btn-close-delete-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13px] text-gray-600 mb-6" data-tl="delete-vault-message">
              This will permanently delete this vault and all items in it. Are you sure?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                data-tl="btn-cancel-delete-vault"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-[13px] font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-2xs transition-colors"
                data-tl="btn-confirm-delete-vault"
              >
                Delete Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
