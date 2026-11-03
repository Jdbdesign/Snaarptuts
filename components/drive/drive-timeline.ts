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

  // Meetings view
  tl.setVar("driveMeetingsRefreshing", false);

  // Shared view
  tl.setVar("driveSharedTab", "with-you");
  tl.setVar("driveSharedFilter", "all");
  tl.setVar("driveSharedLoading", false);

  // Trash & Favorites
  tl.setVar("driveTrashItemRestored", false);
  tl.setVar("driveFavoritesLoading", false);

  // Fade
  tl.setVar("fade", false);
}

/**
 * Completes a step by hiding caption, triggering standard white fade,
 * and awaiting the remaining step duration.
 */
export async function finishDrive(tl: Timeline, totalDurationMs: number) {
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(totalDurationMs);
}
