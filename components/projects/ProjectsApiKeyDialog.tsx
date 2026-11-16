"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, KeyRound } from "lucide-react";
import type { ApiKeyItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsApiKeyDialog({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "isApiKeyModalOpen", false);
  const keyName = useTimelineVar<string>(tl, "newApiKeyName", "");
  const keysList = useTimelineVar<ApiKeyItem[]>(tl, "apiKeysList", []);

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("isApiKeyModalOpen", false);
  };

  const handleGenerate = () => {
    const finalName = keyName.trim() || "Production API";
    const newKey: ApiKeyItem = {
      id: "key-prod-1",
      name: finalName,
      keyMasked: "sk_live_••••••••••••3f9a",
      createdAt: "16/11/2026",
    };
    tl.setVar("apiKeysList", [
      ...keysList.filter((k) => k.id !== newKey.id),
      newKey,
    ]);
    tl.setVar("isApiKeyModalOpen", false);
    pushProjectsToast(tl, "API key generated", "success");
  };

  return (
    <div
      data-tl="create-api-key-dialog-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200"
    >
      <div
        data-tl="create-api-key-dialog"
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm p-6 space-y-4 relative"
      >
        <div className="flex items-center justify-between">
          <h3
            data-tl="create-api-key-title"
            className="text-base font-bold text-gray-900 tracking-tight"
          >
            Create API Key
          </h3>
          <button
            type="button"
            data-tl="create-api-key-close"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block text-[11px] font-bold text-gray-700 tracking-wider uppercase">
            Key Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            data-tl="api-key-name-input"
            value={keyName}
            onChange={(e) => tl.setVar("newApiKeyName", e.target.value)}
            placeholder="e.g. Production API"
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="create-api-key-cancel"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="create-api-key-submit"
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Generate Key</span>
          </button>
        </div>
      </div>
    </div>
  );
}
