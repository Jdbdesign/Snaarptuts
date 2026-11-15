"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { ZeusList } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusDeleteListModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusDeleteListModalOpen", false);
  const listToDelete = useTimelineVar<ZeusList | null>(tl, "zeusListToDelete", null);
  const deleting = useTimelineVar<boolean>(tl, "zeusDeleting", false);
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);

  if (!isOpen || !listToDelete) return null;

  const handleDelete = () => {
    const remaining = lists.filter((l) => l.id !== listToDelete.id);
    tl.setVar("zeusLists", remaining);
    tl.setVar("zeusSelectedListId", remaining[0]?.id ?? null);
    tl.setVar("zeusDeleteListModalOpen", false);
    tl.setVar("zeusToast", {
      text: "List deleted",
    });
  };

  return (
    <div
      data-tl="delete-list-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150 select-none"
      onClick={() => tl.setVar("zeusDeleteListModalOpen", false)}
    >
      <div
        data-tl="delete-list-modal"
        className="w-[460px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Delete List</h3>
            <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-gray-900">&ldquo;{listToDelete.name}&rdquo;</span>?
          This will remove all members from the list.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-delete-list"
            onClick={() => tl.setVar("zeusDeleteListModalOpen", false)}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-delete-list"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            {deleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete List</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
