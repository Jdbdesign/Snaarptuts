import type { Timeline } from "@/lib/timeline";
import { DEFAULT_DEPARTMENT, NEW_USER } from "./admin-data";
import { NEW_DEPARTMENT, PEOPLE, SAM, START_DEPARTMENTS, type Department, type Person } from "./people-data";

/** The state a step starts in. Each step is playable alone, so each one names where it begins. */
export type StartState =
  | "users" // Users page, 38 active users, dialogs closed
  | "create-empty" // Create user dialog open, nothing typed
  | "create-names" // dialog open, email, names and username typed
  | "create-details" // dialog open, everything but the password filled in
  | "created" // the new user is in the Users Directory (steps 1-4 only)
  | "org" // Organization page, All members
  | "org-design" // Organization page, the Design department exists and is empty
  | "users-design"; // Users page, the Design department has two members

export const DESIGN_DEPARTMENT: Department = { id: "design", ...NEW_DEPARTMENT };
/** The two people who already sit in Design when step 12 starts (step 11 has just moved the first one in). */
export const DESIGN_MEMBERS = ["ada", "mia"];

/** Put the scene variables in the state before anything renders. Call once, from a scene's useState initialiser. */
export function seedAdmin(tl: Timeline, start: StartState) {
  const names = start === "create-names" || start === "create-details";
  const details = start === "create-details";
  const created = start === "created";
  const design = start === "org-design" || start === "users-design";

  const people: Person[] = PEOPLE.map((p) => (start === "users-design" && DESIGN_MEMBERS.includes(p.id) ? { ...p, dept: "Design" } : p));
  tl.setVar("users", created ? [SAM, ...people] : people);
  tl.setVar("depts", design ? [...START_DEPARTMENTS, DESIGN_DEPARTMENT] : START_DEPARTMENTS);
  tl.setVar("page", start.startsWith("org") ? "organization" : "users");
  tl.setVar("orgFilter", start === "org-design" ? "design" : "");
  tl.setVar("dialog", start.startsWith("create-") ? "create" : "");
  tl.setVar("created", created);

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
