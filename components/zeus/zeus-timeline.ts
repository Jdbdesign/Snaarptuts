import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  ZEUS_URLS,
  type ZeusView,
  INITIAL_LISTS,
  type ZeusList,
  type ZeusContact,
  type ZeusCompany,
  type ZeusExport,
  type ZeusApiKey,
  type ZeusWebhook,
} from "./zeus-data";

export const ZEUS_END_HOLD_MS = 1500;
export const ZEUS_FADE_MS = 400;

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__zeusStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
    await tl.wait(150);
    await tl.click(sel);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "zeus-step");
    console.error(
      `[Zeus Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__zeusStepEnded", true);
    tl.hideCaption();
    tl.clearHighlight();
    tl.setVar("fade", true);
  }
}

/**
 * Types text character by character into a timeline variable while focused on sel.
 */
export async function typeIntoVar(
  tl: Timeline,
  sel: string,
  varName: string,
  text: string,
  opts: { msPerChar?: number } = {}
) {
  if (tl.getVar<boolean>("__zeusStepEnded", false)) return;
  const { msPerChar = 45 } = opts;
  tl.highlight(sel);
  for (let i = 1; i <= text.length; i++) {
    if (tl.getVar<boolean>("__zeusStepEnded", false)) break;
    tl.setVar(varName, text.slice(0, i));
    await tl.wait(msPerChar);
  }
  tl.setVar(varName, text);
  await tl.wait(100);
  tl.clearHighlight();
}

/** Move onto an element and hover it, without clicking. */
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__zeusStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 600, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** Smoothly scroll an element with data-tl */
export async function scrollView(
  tl: Timeline,
  sel: string,
  scrollTop: number,
  ms = 600
) {
  if (tl.getVar<boolean>("__zeusStepEnded", false)) return;
  try {
    await tl.scrollPanelTo(sel, scrollTop, ms);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** The clean step ending with hold and fade. */
export async function finishZeus(
  tl: Timeline,
  _totalDurationMs?: number,
  holdMs = ZEUS_END_HOLD_MS
) {
  if (holdMs > 0) {
    await tl.wait(holdMs);
  }
  tl.setVar("fade", true);
  await tl.wait(ZEUS_FADE_MS);
}

/**
 * Resets Zeus scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginZeus(
  tl: Timeline,
  url: string = ZEUS_URLS.people,
  page: ZeusView = "people",
  cursor: [number, number] = [0.45, 0.35],
  stepNum?: number
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("zeusView", page);
  tl.setVar("fade", false);
  tl.setVar("__zeusStepEnded", false);
  if (stepNum) tl.setVar("__sceneId", `zeus-step${stepNum}`);

  // Credits counter: 99 initial, 98 after find email (step 5), 97 after contact reveal (step 6),
  // 96 after step 14 first reveal, 95 after step 14 second reveal & steps 15-17
  const defaultCredits =
    stepNum && stepNum >= 15 ? 95 :
    stepNum && stepNum >= 7 ? 97 :
    stepNum === 6 ? 98 :
    stepNum === 5 ? 99 :
    99;
  tl.setVar("zeusCredits", defaultCredits);

  // People view state
  tl.setVar("zeusActiveTab", "database"); // "database" | "find-email"
  tl.setVar("zeusSearching", false);
  tl.setVar("zeusSearchResults", false);
  tl.setVar("zeusHideFilters", false);
  tl.setVar("zeusSavedCount", 0);
  tl.setVar("zeusRevealedContactIds", [] as string[]);

  // Filters
  tl.setVar("zeusFilterKeyword", "");
  tl.setVar("zeusFilterListsOpen", false);
  tl.setVar("zeusFilterEmailStatus", "any"); // "any" | "has-email"
  tl.setVar("zeusFilterSeniority", []);
  tl.setVar("zeusFilterDepartmentHover", null);

  // Email finder
  tl.setVar("zeusEmailFinderName", "");
  tl.setVar("zeusEmailFinderDomain", "");
  tl.setVar("zeusEmailFinderResult", null);

  // Contact Drawer
  tl.setVar("zeusDrawerOpen", false);
  tl.setVar("zeusSelectedContact", null as ZeusContact | null);
  tl.setVar("zeusContactRevealed", false);
  tl.setVar("zeusRevealing", false);
  tl.setVar("zeusAddToListDropdownOpen", false);

  // Companies view state
  tl.setVar("zeusCompaniesSearching", false);
  tl.setVar("zeusCompaniesResults", false);
  tl.setVar("zeusCompaniesFilterTags", [] as string[]);
  tl.setVar("zeusCompaniesIndustryInput", "");
  tl.setVar("zeusSelectedCompany", null as ZeusCompany | null);
  tl.setVar("zeusCompanyDrawerOpen", false);

  // Save Search Modal & Saved Searches
  tl.setVar("zeusSaveSearchModalOpen", false);
  tl.setVar("zeusSavedSearchName", "");
  tl.setVar("zeusSavedSearches", [] as string[]);
  tl.setVar("zeusSavedSearchesDropdownOpen", false);

  // Lists state
  const initialLists: ZeusList[] = JSON.parse(JSON.stringify(INITIAL_LISTS));
  tl.setVar("zeusLists", initialLists);
  tl.setVar("zeusSelectedListId", initialLists[0]?.id || "list-1");
  tl.setVar("zeusCreateListModalOpen", false);
  tl.setVar("zeusNewListName", "");
  tl.setVar("zeusNewListType", "Static" as "Static" | "Dynamic");
  tl.setVar("zeusEditListModalOpen", false);
  tl.setVar("zeusEditListName", "");
  tl.setVar("zeusListToEdit", null as ZeusList | null);
  tl.setVar("zeusDeleteListModalOpen", false);
  tl.setVar("zeusListToDelete", null as ZeusList | null);
  tl.setVar("zeusDeleting", false);

  // Exports state
  tl.setVar("zeusSelectedExportListId", null as string | null);
  tl.setVar("zeusExportStarted", false);
  tl.setVar("zeusRecentExports", [] as ZeusExport[]);

  // Integrations state
  tl.setVar("zeusApiKeys", [] as ZeusApiKey[]);
  tl.setVar("zeusCreateApiKeyOpen", false);
  tl.setVar("zeusNewApiKeyName", "");
  tl.setVar("zeusWebhooks", [] as ZeusWebhook[]);
  tl.setVar("zeusCreateWebhookOpen", false);
  tl.setVar("zeusNewWebhookName", "");
  tl.setVar("zeusNewWebhookUrl", "");
  tl.setVar("zeusNewWebhookEvents", [] as string[]);

  // Toasts
  tl.setVar("zeusToast", null as { text: string; subtext?: string } | null);
}
