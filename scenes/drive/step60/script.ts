import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP60_DURATION_MS = 9500;

export async function runStep60(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.15, 0.48]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openFavorites);
  await hoverOn(tl, "[data-tl=nav-favorites]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-favorites]");
  tl.setVar("drivePage", "favorites");
  tl.setVar("driveActiveNav", "favorites");
  tl.setUrl(DRIVE_URLS.favorites);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.previewItem);
  await hoverOn(tl, "[data-tl=link-fav-item-2]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=link-fav-item-2]");
  tl.setVar("driveFavoritesPreviewItem", "Meeting notes.docx");

  await tl.at(4800);
  tl.showCaption(CAPTIONS.closePreview);
  await hoverOn(tl, "[data-tl=btn-fav-preview-close]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-fav-preview-close]");
  tl.setVar("driveFavoritesPreviewItem", "");

  await tl.at(6800);
  tl.showCaption(CAPTIONS.unstarItem);
  await hoverOn(tl, "[data-tl=btn-unstar-item-2]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-unstar-item-2]");
  tl.setVar("driveFavoritesUnstarredId", "fav-2");
  tl.setVar("driveFavoritesToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP60_DURATION_MS);
}
