import type { Timeline } from "@/lib/timeline";
import { DRIVE_URLS, type DrivePage } from "./drive-data";

// Re-export generic house helpers from sheets-timeline
export { pressOn, hoverOn, ring, endFade } from "@/components/sheets/sheets-timeline";

/**
 * Resets Snaarp Drive scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginDrive(
  tl: Timeline,
  url: string = DRIVE_URLS.dashboard,
  page: DrivePage = "home",
  cursor: [number, number] = [0.5, 0.42]
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("drivePage", page);
  tl.setVar("driveTopToggle", page === "photos" ? "photos" : "files");
  tl.setVar("driveActiveNav", page);

  // Home view
  tl.setVar("driveRecentFilter", "all");
  tl.setVar("driveFilterInputFocused", false);
  tl.setVar("driveHomeHasWorkspace", false);

  // Photos view
  tl.setVar("drivePhotosTab", "gallery");
  tl.setVar("drivePhotosLayoutOpen", false);
  tl.setVar("drivePhotosLayout", "river");
  tl.setVar("drivePhotosDensity", "roomy");
  tl.setVar("drivePhotosDateMode", "inline");
  tl.setVar("drivePhotosMonthOpen", false);
  tl.setVar("drivePhotosMonth", "Nov 2026");
  tl.setVar("drivePhotosLoading", false);

  // Files view
  tl.setVar("driveFilesViewMode", "list");
  tl.setVar("driveSortMenuOpen", false);
  tl.setVar("driveSortBy", "modified");
  tl.setVar("driveSortOrder", "newest");
  tl.setVar("driveViewMenuOpen", false);
  tl.setVar("driveDetailsOpen", false);
  tl.setVar("driveDetailsLoading", false);

  // Create / upload menu
  tl.setVar("driveCreateMenuOpen", false);

  // Part 2: Folder creation, uploads, editors, import
  tl.setVar("driveFolderName", "");
  tl.setVar("driveFolderColor", "");
  tl.setVar("driveFolderModalOpen", false);
  tl.setVar("driveHomeHasProjectFiles", false);
  tl.setVar("driveFolderProjectFilesAdded", false);
  tl.setVar("driveFolderBrandLogosAdded", false);
  tl.setVar("driveInsideBrandLogosFolder", false);
  tl.setVar("driveUploadToastOpen", false);
  tl.setVar("driveUploadToastExpanded", false);
  tl.setVar("driveUploadToastCompleted", false);
  tl.setVar("driveUploadToastCount", 1);
  tl.setVar("driveFileQuarterlyReportAdded", false);
  tl.setVar("driveFileMeetingNotesAdded", false);
  tl.setVar("driveFileSampleTxtAdded", false);
  tl.setVar("driveFilePickerOpen", false);
  tl.setVar("driveFolderPickerOpen", false);
  tl.setVar("driveMarkdownModalOpen", false);
  tl.setVar("driveMarkdownEditorOpen", false);
  tl.setVar("driveMarkdownSaved", false);
  tl.setVar("driveMarkdownSaving", false);
  tl.setVar("driveMarkdownDirty", false);
  tl.setVar("driveMarkdownContent", "");
  tl.setVar("driveTextModalOpen", false);
  tl.setVar("driveTextEditorOpen", false);
  tl.setVar("driveTextSaved", false);
  tl.setVar("driveTextSaving", false);
  tl.setVar("driveTextDirty", false);
  tl.setVar("driveTextContent", "");
  tl.setVar("driveImportModalOpen", false);

  // Meetings view
  tl.setVar("driveMeetingsRefreshing", false);

  // Shared view
  tl.setVar("driveSharedTab", "with-you");
  tl.setVar("driveSharedFilter", "all");
  tl.setVar("driveSharedLoading", false);

  // Trash & Favorites
  tl.setVar("driveTrashItemRestored", false);
  tl.setVar("driveFavoritesLoading", false);

  // Part 3: Item menus, sharing, moving, copying, colors
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Workspaces");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareConfirmOpen", false);
  tl.setVar("driveShareHasChip", false);
  tl.setVar("driveShareEmailVal", "");
  tl.setVar("driveLinkSettingsOpen", false);
  tl.setVar("driveDeleteModalOpen", false);
  tl.setVar("driveRenameModalOpen", false);
  tl.setVar("driveMoveModalOpen", false);
  tl.setVar("driveCopyModalOpen", false);
  tl.setVar("driveFolderColorModalOpen", false);
  tl.setVar("driveCopyLinkToastOpen", false);
  tl.setVar("driveMoveToastOpen", false);
  tl.setVar("driveCurrentBreadcrumb", []);
  tl.setVar("driveWorkspacesFolderColor", "#F59E0B");
  tl.setVar("driveFileSampleTxtTitle", "Sample.txt");
  tl.setVar("driveItemIsPinned", false);
  tl.setVar("driveItemIsFavorite", false);
  tl.setVar("driveFileSampleTxtMoved", false);
  tl.setVar("driveTreeExpandWorkspaces", false);
  tl.setVar("driveTreeExpandSocial", false);
  tl.setVar("driveIsMoving", false);
  tl.setVar("driveIsRenaming", false);
  tl.setVar("driveIsApplyingColor", false);

  // Fade
  tl.setVar("fade", false);
}

/**
 * Completes a step by hiding caption, triggering standard white fade,
 * and awaiting the remaining step duration.
 */
export async function finishDrive(tl: Timeline, totalDurationMs: number) {
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(totalDurationMs);
}
