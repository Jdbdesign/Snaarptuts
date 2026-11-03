import type { Timeline } from "@/lib/timeline";
import { URLS } from "./onecardx-data";

// Re-export generic house helpers from sheets-timeline
export { pressOn, hoverOn, ring, endFade } from "@/components/sheets/sheets-timeline";

export type OneCardXPage =
  | "home"
  | "orgCards"
  | "editor"
  | "cardDetail"
  | "memberView"
  | "idCards"
  | "users"
  | "backgrounds"
  | "emailSignatures"
  | "mail"
  | "contacts"
  | "analytics";

/**
 * Resets OneCardX scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginOneCardX(
  tl: Timeline,
  url: string = URLS.home,
  page: OneCardXPage = "home",
  cursor: [number, number] = [0.5, 0.42]
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("ocxPage", page);
  tl.setVar("ocxOpenPopover", null);
  tl.setVar("ocxNewCardModalOpen", false);
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", false);
  tl.setVar("ocxPhotoModalOpen", false);
  tl.setVar("ocxPhotoChooserOpen", false);
  tl.setVar("ocxPhotoUploading", false);
  tl.setVar("ocxAccentColor", "#7014D9");
  tl.setVar("ocxFont", "Poppins (Default)");
  tl.setVar("ocxLogoAdded", false);
  tl.setVar("ocxLogoModalOpen", false);
  tl.setVar("ocxBadgeAdded", false);
  tl.setVar("ocxBadgeModalOpen", false);
  tl.setVar("ocxUseOwnNameChecked", false);
  tl.setVar("ocxFirstName", "");
  tl.setVar("ocxLastName", "");
  tl.setVar("ocxFieldWebsite", false);
  tl.setVar("ocxFieldInstagram", false);
  tl.setVar("ocxFieldEmail", false);
  tl.setVar("ocxSavingCard", false);
  tl.setVar("ocxLinkCopied", false);
  tl.setVar("ocxPublicPreviewOpen", false);
  tl.setVar("ocxHoveredRow", null);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigCardDropdownOpen", false);
  tl.setVar("ocxSigStyle", 3);
  tl.setVar("ocxSigApp", "Gmail");
  tl.setVar("ocxSigOs", "Web");
  tl.setVar("ocxSigCopied", false);
  tl.setVar("ocxMailSubpage", "inbox");
  tl.setVar("ocxMailQuickSettingsOpen", false);
  tl.setVar("ocxMailSettingsTab", "signature");
  tl.setVar("ocxMailSigPasted", false);
  tl.setVar("ocxMailSigSaved", false);
  tl.setVar("ocxMailComposeOpen", false);
  tl.setVar("ocxContactsSubpage", "list");
  tl.setVar("ocxContactDrawerOpen", false);
  tl.setVar("ocxContactPhoto", false);
  tl.setVar("ocxContactLogo", false);
  tl.setVar("ocxContactPhotoPickerOpen", false);
  tl.setVar("ocxContactLogoPickerOpen", false);
  tl.setVar("ocxContactFirstName", "");
  tl.setVar("ocxContactLastName", "");
  tl.setVar("ocxContactPhone", "");
  tl.setVar("ocxContactPhoneType", "mobile");
  tl.setVar("ocxContactEmail1", "");
  tl.setVar("ocxContactEmail1Type", "work");
  tl.setVar("ocxContactEmail2", "");
  tl.setVar("ocxContactEmail2Type", "work");
  tl.setVar("ocxContactEmail2Added", false);
  tl.setVar("ocxContactMoreOptions", false);
  tl.setVar("ocxContactPrefix", "");
  tl.setVar("ocxContactMiddleName", "");
  tl.setVar("ocxContactAccreditations", "");
  tl.setVar("ocxContactPronouns", "");
  tl.setVar("ocxContactPronounsOpen", false);
  tl.setVar("ocxContactCompany", "");
  tl.setVar("ocxContactTitle", "");
  tl.setVar("ocxContactDepartment", "");
  tl.setVar("ocxContactFieldCategory", null);
  tl.setVar("ocxContactFieldWebsite", "");
  tl.setVar("ocxContactFieldSpotify", "");
  tl.setVar("ocxContactSaved", false);
  tl.setVar("ocxContactDrawerScrollY", 0);
  tl.setVar("ocxContactTagInput", "");
  tl.setVar("ocxContactTags", []);
  tl.setVar("ocxContactNoteText", "");
  tl.setVar("ocxAnalyticsScrollY", 0);
  tl.setVar("ocxAnalyticsHeatmapTooltip", null);
  tl.setVar("ocxAnalyticsHoveredRow", null);
  tl.setVar("ocxBugModalOpen", false);
  tl.setVar("ocxBugCategoryOpen", false);
  tl.setVar("ocxBugCategory", "Bug");
  tl.setVar("fade", false);
}

/**
 * Completes a step by hiding caption, triggering standard white fade,
 * and awaiting the remaining step duration.
 */
export async function finishOneCardX(tl: Timeline, totalDurationMs: number) {
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(totalDurationMs);
}
