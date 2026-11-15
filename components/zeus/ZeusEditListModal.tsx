"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Edit2, X } from "lucide-react";
import type { ZeusList } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusEditListModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusEditListModalOpen", false);
  const listToEdit = useTimelineVar<ZeusList | null>(tl, "zeusListToEdit", null);
  const editListName = useTimelineVar<string>(tl, "zeusEditListName", "");
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);

  if (!isOpen || !listToEdit) return null;

  const displayName = editListName !== "" ? editListName : (listToEdit.name || "Priority Leads");

  const handleSave = () => {
    const finalName = displayName.trim() || "Priority Leads";
    const updatedLists = lists.map((l) =>
      l.id === listToEdit.id ? { ...l, name: finalName } : l
    );
    tl.setVar("zeusLists", updatedLists);
    tl.setVar("zeusEditListModalOpen", false);
    tl.setVar("zeusToast", {
      text: "List updated",
      subtext: `"${finalName}" saved successfully`,
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  return (
    <div
      data-tl="edit-list-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150 select-none"
      onClick={() => tl.setVar("zeusEditListModalOpen", false)}
    >
      <div
        data-tl="edit-list-modal"
        className="w-[460px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
              <Edit2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Edit List</h3>
          </div>
          <button
            type="button"
            data-tl="btn-close-edit-modal"
            onClick={() => tl.setVar("zeusEditListModalOpen", false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            List Name
          </label>
          <input
            type="text"
            data-tl="input-edit-list-name"
            value={displayName}
            onChange={(e) => {
              tl.setVar("zeusEditListName", e.target.value);
            }}
            placeholder="e.g. Priority Leads"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-edit-list"
            onClick={() => tl.setVar("zeusEditListModalOpen", false)}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-save-edit-list"
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
