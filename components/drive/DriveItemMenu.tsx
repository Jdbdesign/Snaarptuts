"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  FolderOpen,
  Share2,
  Link,
  UserPlus,
  Trash2,
  Download,
  Pencil,
  Move,
  Copy,
  Palette,
  Star,
  Pin,
  Info,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function DriveItemMenu({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "driveItemMenuOpen", false);
  const itemType = useTimelineVar<"folder" | "file">(tl, "driveItemMenuType", "folder");
  const itemName = useTimelineVar<string>(tl, "driveItemMenuName", "Workspaces");
  const isFavorite = useTimelineVar(tl, "driveItemIsFavorite", false);
  const triggerSel = useTimelineVar<string>(tl, "driveItemMenuTrigger", "");
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 140, left: 450 });

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const menuEl = menuRef.current;
      const shellEl =
        menuEl?.closest<HTMLElement>("[data-tl=drive-shell]") ??
        document.querySelector<HTMLElement>("[data-tl=drive-shell]");
      if (!shellEl) return;

      let target: HTMLElement | null = null;
      if (triggerSel) {
        target = shellEl.querySelector<HTMLElement>(triggerSel);
      }

      if (!target) {
        if (itemName === "Client Files") {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-client-files]");
        } else if (itemName === "Workspaces") {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-workspaces]");
        } else if (itemName === "Brand Logos") {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-brand-logos]");
        } else if (itemName === "All videos") {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-all-videos]");
        } else if (itemName === "Social media Resources") {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-social]");
        } else if (itemName.includes("Sample")) {
          target = shellEl.querySelector<HTMLElement>(
            "[data-tl=btn-tile-menu-sample-notes], [data-tl=btn-tile-menu-sample-txt]"
          );
        } else if (itemName.includes("Q3 report")) {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-q3report]");
        } else if (itemName.includes("Launch video")) {
          target = shellEl.querySelector<HTMLElement>("[data-tl=btn-tile-menu-launch-video]");
        }
      }

      if (!target) {
        target = shellEl.querySelector<HTMLElement>(
          "[data-hover] [data-tl^=btn-tile-menu], [data-tl^=btn-tile-menu]"
        );
      }

      if (!target) return;

      const shellRect = shellEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scale = shellRect.width / 1440;

      const targetRight = (targetRect.right - shellRect.left) / scale;
      const targetTop = (targetRect.top - shellRect.top) / scale;
      const targetBottom = (targetRect.bottom - shellRect.top) / scale;
      const stageWidth = 1440;
      const stageHeight = shellRect.height / scale;

      const menuWidth = menuEl?.offsetWidth || 208;
      const menuHeight = menuEl?.offsetHeight || (itemType === "folder" ? 385 : 340);

      // Align right edge of menu to right edge of button
      let left = targetRight - menuWidth;
      left = Math.max(8, Math.min(left, stageWidth - menuWidth - 8));

      // Align top edge 4px below button
      let top = targetBottom + 4;
      if (top + menuHeight > stageHeight - 16) {
        // Flip upward if not enough room below
        top = targetTop - menuHeight - 4;
      }
      if (top < 8) {
        top = Math.max(8, stageHeight - menuHeight - 16);
      }

      setCoords({ top: Math.round(top), left: Math.round(left) });
    };

    updatePosition();
    const raf = requestAnimationFrame(updatePosition);

    const scroller = document.querySelector<HTMLElement>("[data-tl=drive-main-content]");
    scroller?.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      scroller?.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerSel, itemName, itemType]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      data-tl="drive-item-menu"
      style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
      className="absolute z-50 w-52 rounded-2xl border border-gray-200 bg-white py-1.5 shadow-xl text-[12.5px] font-['Poppins',sans-serif] text-[#111827] select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Open */}
      <button
        type="button"
        data-tl="item-menu-open"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          if (itemName === "Workspaces") {
            tl.setVar("driveCurrentBreadcrumb", ["Workspaces"]);
          }
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <FolderOpen size={15} className="text-gray-500" />
        <span>Open</span>
      </button>

      {/* Share */}
      <button
        type="button"
        data-tl="item-menu-share"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveShareModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Share2 size={15} className="text-gray-500" />
        <span>Share</span>
      </button>

      {/* Copy link */}
      <button
        type="button"
        data-tl="item-menu-copy-link"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveCopyLinkToastOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Link size={15} className="text-gray-500" />
        <span>Copy link</span>
      </button>

      {/* Manage access */}
      <button
        type="button"
        data-tl="item-menu-manage-access"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveShareModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <UserPlus size={15} className="text-gray-500" />
        <span>Manage access</span>
      </button>

      <div className="my-1 border-t border-gray-100" />

      {/* Delete (Red) */}
      <button
        type="button"
        data-tl="item-menu-delete"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveDeleteModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-red-50 text-left text-red-600 cursor-pointer"
      >
        <Trash2 size={15} className="text-red-500" />
        <span>Delete</span>
      </button>

      {/* Download (File only) */}
      {itemType === "file" && (
        <button
          type="button"
          data-tl="item-menu-download"
          onClick={() => tl.setVar("driveItemMenuOpen", false)}
          className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
        >
          <Download size={15} className="text-gray-500" />
          <span>Download</span>
        </button>
      )}

      {/* Rename */}
      <button
        type="button"
        data-tl="item-menu-rename"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveRenameModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Pencil size={15} className="text-gray-500" />
        <span>Rename</span>
      </button>

      {/* Move to */}
      <button
        type="button"
        data-tl="item-menu-move-to"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveMoveModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Move size={15} className="text-gray-500" />
        <span>Move to</span>
      </button>

      {/* Copy to */}
      <button
        type="button"
        data-tl="item-menu-copy-to"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveCopyModalOpen", true);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Copy size={15} className="text-gray-500" />
        <span>Copy to</span>
      </button>

      {/* Folder color (Folder only) */}
      {itemType === "folder" && (
        <>
          <div className="my-1 border-t border-gray-100" />
          <button
            type="button"
            data-tl="item-menu-folder-color"
            onClick={() => {
              tl.setVar("driveItemMenuOpen", false);
              tl.setVar("driveFolderColorModalOpen", true);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
          >
            <Palette size={15} className="text-gray-500" />
            <span>Folder color</span>
          </button>
        </>
      )}

      <div className="my-1 border-t border-gray-100" />

      {/* Add / Remove from favorites */}
      <button
        type="button"
        data-tl="item-menu-add-favorites"
        onClick={() => {
          tl.setVar("driveItemIsFavorite", !isFavorite);
          tl.setVar("driveItemMenuOpen", false);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Star
          size={15}
          className={isFavorite ? "text-amber-500 fill-amber-500" : "text-gray-500"}
        />
        <span>{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
      </button>

      {/* Pin to top */}
      <button
        type="button"
        data-tl="item-menu-pin-to-top"
        onClick={() => {
          tl.setVar("driveItemIsPinned", true);
          tl.setVar("driveItemMenuOpen", false);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Pin size={15} className="text-gray-500" />
        <span>Pin to top</span>
      </button>

      {/* Details */}
      <button
        type="button"
        data-tl="item-menu-details"
        onClick={() => {
          tl.setVar("driveItemMenuOpen", false);
          tl.setVar("driveDetailsOpen", true);
          tl.setVar("driveDetailsItem", itemName);
        }}
        className="flex w-full items-center gap-2.5 px-3.5 py-1.5 hover:bg-gray-50 text-left cursor-pointer"
      >
        <Info size={15} className="text-gray-500" />
        <span>Details</span>
      </button>
    </div>
  );
}
