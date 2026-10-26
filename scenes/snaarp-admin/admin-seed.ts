import type { Timeline } from "@/lib/timeline";
import { DEFAULT_DEPARTMENT, NEW_USER, PRODUCT_TO_ADD, START_PRODUCTS } from "./admin-data";

/** The state a step starts in. Each step is playable alone, so each one names where it begins. */
export type StartState =
  | "users" // Users page before the new user exists, dialogs closed
  | "create-empty" // Create user dialog open, nothing typed
  | "create-names" // dialog open, email, names and username typed
  | "create-details" // dialog open, everything but the password filled in
  | "created" // the new user is in the Users Directory
  | "manage-four" // Manage products open, the user's four products
  | "manage-five"; // Manage products open, Snaarp Books already added

/** Put the scene variables in the state before anything renders. Call once, from a scene's useState initialiser. */
export function seedAdmin(tl: Timeline, start: StartState) {
  const names = start === "create-names" || start === "create-details";
  const details = start === "create-details";
  const created = start === "created" || start === "manage-four" || start === "manage-five";

  tl.setVar("dialog", start.startsWith("create") ? "create" : start.startsWith("manage") ? "manage" : "");
  tl.setVar("created", created);
  tl.setVar("userProducts", start === "manage-five" ? [...START_PRODUCTS, PRODUCT_TO_ADD] : START_PRODUCTS);

  if (names) {
    tl.setVar("field:email", NEW_USER.email);
    tl.setVar("field:first", NEW_USER.first);
    tl.setVar("field:last", NEW_USER.last);
    tl.setVar("field:username", NEW_USER.username);
  }
  if (details) {
    tl.setVar("field:job", NEW_USER.job);
    tl.setVar("field:employee", NEW_USER.employee);
    tl.setVar("dept", NEW_USER.department);
  } else {
    tl.setVar("dept", DEFAULT_DEPARTMENT);
  }
  tl.setVar("dialogRole", NEW_USER.role);
}
