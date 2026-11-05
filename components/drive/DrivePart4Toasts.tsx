"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2, X } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DrivePart4Toasts({ tl }: Props) {
  const bulkMoveOpen = useTimelineVar(tl, "driveBulkMoveToastOpen", false);
  const bulkDeleteOpen = useTimelineVar(tl, "driveBulkDeleteToastOpen", false);
  const trashRestoredOpen = useTimelineVar(tl, "driveTrashRestoredToastOpen", false);
  const trashEmptiedOpen = useTimelineVar(tl, "driveTrashEmptiedToastOpen", false);
  const meetingsDownloadOpen = useTimelineVar(tl, "driveMeetingsDownloadedToastOpen", false);
  const sharedShortcutOpen = useTimelineVar(tl, "driveSharedShortcutToastOpen", false);
  const sharedHideOpen = useTimelineVar(tl, "driveSharedHideToastOpen", false);
  const sharedHideCount = useTimelineVar<number>(tl, "driveSharedHideCount", 2);
  const favoritesOpen = useTimelineVar(tl, "driveFavoritesToastOpen", false);
  const workspaceCreatedOpen = useTimelineVar(tl, "driveWorkspaceCreatedToastOpen", false);
  const inviteSuccessOpen = useTimelineVar(tl, "driveInviteSuccessToastOpen", false);
  const memberRoleOpen = useTimelineVar(tl, "driveMemberRoleToastOpen", false);
  const memberRemovedOpen = useTimelineVar(tl, "driveMemberRemovedToastOpen", false);
  const workspaceDeletedOpen = useTimelineVar(tl, "driveWorkspaceDeletedToastOpen", false);
  const workspaceFolderOpen = useTimelineVar(tl, "driveWorkspaceFolderToastOpen", false);
  const shareSuccessOpen = useTimelineVar(tl, "driveShareSuccessToastOpen", false);

  return (
    <>
      {/* 1. Bulk Move Toast */}
      {bulkMoveOpen && (
        <div
          data-tl="toast-bulk-move-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-medium text-[#111827]">
              &quot;payslip.pdf&quot; moved from &quot;My Files&quot; to &quot;Project Notes&quot;.
            </span>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-[#7014D9]">
              <button
                type="button"
                data-tl="btn-toast-go-to-folder"
                onClick={() => {
                  tl.setVar("driveBulkMoveToastOpen", false);
                  tl.setVar("driveInsideProjectNotesFolder", true);
                }}
                className="hover:underline cursor-pointer"
              >
                Go to folder
              </button>
              <button
                type="button"
                data-tl="btn-toast-undo-move"
                className="hover:underline cursor-pointer text-gray-500"
              >
                Undo
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => tl.setVar("driveBulkMoveToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 2. Bulk Delete Toast */}
      {bulkDeleteOpen && (
        <div
          data-tl="toast-bulk-delete-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            2 items moved to Recycle Bin.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveBulkDeleteToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 3. Trash Restored Toast */}
      {trashRestoredOpen && (
        <div
          data-tl="toast-trash-restored-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            1 item restored to My Files.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveTrashRestoredToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 4. Trash Emptied Toast */}
      {trashEmptiedOpen && (
        <div
          data-tl="toast-trash-emptied-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Trash emptied.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveTrashEmptiedToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 5. Meetings Downloaded Toast */}
      {meetingsDownloadOpen && (
        <div
          data-tl="toast-meeting-download-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Recording downloaded.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveMeetingsDownloadedToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 6. Shared Shortcut Toast */}
      {sharedShortcutOpen && (
        <div
          data-tl="toast-shared-shortcut-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Shortcut added to My Files.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveSharedShortcutToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 7. Shared Hide Toast */}
      {sharedHideOpen && (
        <div
          data-tl="toast-shared-hide-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            {sharedHideCount === 1 ? "1 item" : `${sharedHideCount} items`} hidden from Shared.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveSharedHideToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 8. Favorites Unstar Toast */}
      {favoritesOpen && (
        <div
          data-tl="toast-favorites-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Item removed from Favorites.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveFavoritesToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 9. Workspace Created Toast */}
      {workspaceCreatedOpen && (
        <div
          data-tl="toast-workspace-created-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Workspace &quot;Marketing Space&quot; created successfully.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveWorkspaceCreatedToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 10. Invite Members Success Toast */}
      {inviteSuccessOpen && (
        <div
          data-tl="toast-invite-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            2 members added to workspace.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveInviteSuccessToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 11. Member Role Updated Toast */}
      {memberRoleOpen && (
        <div
          data-tl="toast-member-role-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Member role updated.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveMemberRoleToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 12. Member Removed Toast */}
      {memberRemovedOpen && (
        <div
          data-tl="toast-member-removed-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Member removed from workspace.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveMemberRemovedToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 13. Workspace Deleted Toast */}
      {workspaceDeletedOpen && (
        <div
          data-tl="toast-workspace-deleted-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Workspace deleted successfully.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveWorkspaceDeletedToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}
      {/* 14. Workspace Folder Created Toast */}
      {workspaceFolderOpen && (
        <div
          data-tl="toast-ws-folder-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            Folder &quot;All videos&quot; created successfully.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveWorkspaceFolderToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 15. Share Success Toast */}
      {shareSuccessOpen && (
        <div
          data-tl="toast-share-success"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-xl font-['Poppins',sans-serif] text-[12.5px] animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
          <span className="font-medium text-[#111827]">
            File shared with alex.morgan@acme.example.
          </span>
          <button
            type="button"
            onClick={() => tl.setVar("driveShareSuccessToastOpen", false)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </>
  );
}
