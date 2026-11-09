import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  LOCK_URLS,
  type LockPage,
  INITIAL_DEVICES,
  INITIAL_VAULTS,
  INITIAL_ORGANIZATIONS,
} from "./lock-data";

export const LOCK_END_HOLD_MS = 1500;
export const LOCK_FADE_MS = 400;

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__lockStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
    await tl.wait(150);
    await tl.click(sel);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "lock-step");
    console.error(
      `[Lock Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__lockStepEnded", true);
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
  if (tl.getVar<boolean>("__lockStepEnded", false)) return;
  const { msPerChar = 50 } = opts;
  tl.highlight(sel);
  for (let i = 1; i <= text.length; i++) {
    if (tl.getVar<boolean>("__lockStepEnded", false)) break;
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
  if (tl.getVar<boolean>("__lockStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 600, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** The clean step ending with hold and fade. */
export async function finishLock(
  tl: Timeline,
  _totalDurationMs?: number,
  holdMs = LOCK_END_HOLD_MS
) {
  if (holdMs > 0) {
    await tl.wait(holdMs);
  }
  tl.setVar("fade", true);
  await tl.wait(LOCK_FADE_MS);
}

/**
 * Resets Snaarp Lock scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginLock(
  tl: Timeline,
  url: string = LOCK_URLS.dashboard,
  page: LockPage = "dashboard",
  cursor: [number, number] = [0.45, 0.35],
  stepNum?: number
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("lockView", page);
  tl.setVar("fade", false);
  tl.setVar("__lockStepEnded", false);
  if (stepNum) tl.setVar("__sceneId", `lock-step${stepNum}`);

  // Devices state
  tl.setVar("lockDevices", [...INITIAL_DEVICES]);

  // Vaults state
  tl.setVar("lockVaults", JSON.parse(JSON.stringify(INITIAL_VAULTS)));
  tl.setVar("lockSelectedVaultId", "social-vault");
  tl.setVar("lockCreatingVault", false);
  tl.setVar("lockCreateVaultName", "");
  tl.setVar("lockDeleteConfirmId", null);

  // Vault items filter & search
  tl.setVar("lockItemsFilter", "all");
  tl.setVar("lockItemsSearch", "");

  // Modals state
  tl.setVar("lockAddModalOpen", false);
  tl.setVar("lockAddModalType", "login");
  tl.setVar("lockEditModalOpen", false);
  tl.setVar("lockEditItemId", null);
  tl.setVar("lockEditTab", "details");

  // Generator state
  tl.setVar("lockGenMode", "password"); // "password" | "passphrase"
  tl.setVar("lockGenLength", 16);
  tl.setVar("lockGenWords", 4);
  tl.setVar("lockGenSeparator", "-");
  tl.setVar("lockGenUpper", true);
  tl.setVar("lockGenLower", true);
  tl.setVar("lockGenNumbers", true);
  tl.setVar("lockGenSymbols", true);
  tl.setVar("lockGenResult", "");
  tl.setVar("lockGenCopied", false);

  // Toast
  tl.setVar("lockToast", null);

  // Organizations state
  tl.setVar("lockOrgs", JSON.parse(JSON.stringify(INITIAL_ORGANIZATIONS)));
  tl.setVar("lockActiveOrgId", "org-acme-studio");
  tl.setVar("lockCreateOrgOpen", false);
  tl.setVar("lockCreateOrgName", "");
  tl.setVar("lockOrgDetailLoading", false);
  tl.setVar("lockInviteOpen", false);
  tl.setVar("lockInviteEmail", "");
  tl.setVar("lockInviteRole", "Member");
  tl.setVar("lockMemberCount", 1);
  tl.setVar("lockMemberRole", "Member");
  tl.setVar("lockRoleDropdownOpen", false);
  tl.setVar("lockTransferModalOpen", false);
  tl.setVar("lockTransferTooltip", false);

  // Import state
  tl.setVar("lockFileChooserOpen", false);
  tl.setVar("lockFileChosen", false);
  tl.setVar("lockImportProgress", 0);
  tl.setVar("lockImportComplete", false);
}

/** Scroll helper for containers marked with data-lock-scroll=true. */
export async function scrollView(tl: Timeline, top: number, ms = 1000) {
  await tl.waitForElement("[data-lock-scroll=true]");
  await tl.scrollPanelTo("[data-lock-scroll=true]", top, ms);
}
