"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, ListFilter, Users, Sparkles } from "lucide-react";
import type { ZeusList } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusCreateListModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusCreateListModalOpen", false);
  const listName = useTimelineVar<string>(tl, "zeusNewListName", "");
  const listType = useTimelineVar<"Static" | "Dynamic">(tl, "zeusNewListType", "Static");
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!listName.trim()) return;

    const newList: ZeusList = {
      id: `list-${Date.now()}`,
      name: listName.trim(),
      type: listType,
      membersCount: 0,
      date: "15/11/2026",
      contacts: [],
    };

    tl.setVar("zeusLists", [newList, ...lists]);
    tl.setVar("zeusSelectedListId", newList.id);
    tl.setVar("zeusCreateListModalOpen", false);
    tl.setVar("zeusToast", {
      text: "List created",
      subtext: `"${listName.trim()}" is ready to use`,
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  return (
    <div
      data-tl="create-list-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150 select-none"
      onClick={() => tl.setVar("zeusCreateListModalOpen", false)}
    >
      <div
        data-tl="create-list-modal"
        className="w-[480px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
              <ListFilter className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Create New List</h3>
          </div>
          <button
            type="button"
            data-tl="btn-close-create-list"
            onClick={() => tl.setVar("zeusCreateListModalOpen", false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Name Input */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-gray-700 mb-1">List Name</label>
          <input
            type="text"
            data-tl="input-new-list-name"
            placeholder="e.g. Hot Leads Q4"
            value={listName}
            onChange={(e) => tl.setVar("zeusNewListName", e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        {/* List Type Options */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-gray-700 mb-2">List Type</label>
          <div className="grid grid-cols-2 gap-3">
            {/* Static Card */}
            <div
              data-tl="card-list-type-static"
              onClick={() => tl.setVar("zeusNewListType", "Static")}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                listType === "Static"
                  ? "border-[#7014D9] bg-[#F5EEFF]/40 shadow-xs"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users
                  className={`w-4 h-4 ${listType === "Static" ? "text-[#7014D9]" : "text-gray-500"}`}
                />
                <span className="text-xs font-bold text-gray-900">Static</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Manually add and remove members as needed
              </p>
            </div>

            {/* Dynamic Card */}
            <div
              data-tl="card-list-type-dynamic"
              onClick={() => tl.setVar("zeusNewListType", "Dynamic")}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                listType === "Dynamic"
                  ? "border-[#7014D9] bg-[#F5EEFF]/40 shadow-xs"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-4 h-4 ${listType === "Dynamic" ? "text-[#7014D9]" : "text-gray-500"}`}
                />
                <span className="text-xs font-bold text-gray-900">Dynamic</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Auto-updates whenever contacts match criteria
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-create-list"
            onClick={() => tl.setVar("zeusCreateListModalOpen", false)}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-create-list"
            onClick={handleCreate}
            disabled={!listName.trim()}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-colors ${
              listName.trim()
                ? "bg-[#7014D9] hover:bg-[#5B0FB3] text-white shadow-xs cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
}
