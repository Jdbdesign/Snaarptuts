/** Copy and sample values of the ShareDialog. Edit here, not in ShareDialog.tsx. */

export type RoleId = "viewer" | "commenter" | "editor";
export type AccessId = "restricted" | "link";

export const SHARE = {
  title: (docTitle: string) => `Share \u201C${docTitle}\u201D`,
  inputPlaceholder: "Add people and groups",
  peopleLabel: "People with access",
  owner: "Owner",
  you: "(you)",
  person: { name: "Jane Doe", email: "jane@acme-studio.com", initial: "J" },
  accessLabel: "General access",
  copyLink: "Copy link",
  done: "Done",
  roleHeader: "ROLE",
  access: {
    restricted: { label: "Restricted", hint: "Only people with access can open with the link" },
    link: { label: "Anyone with the link", hint: (verb: string) => `Anyone on the internet with the link can ${verb}` },
  },
  /** "Anyone with the link" options are inferred (the recording cuts that moment). */
  accessOptions: ["restricted", "link"] as AccessId[],
  roles: [
    { id: "viewer", label: "Viewer", verb: "view" },
    { id: "commenter", label: "Commenter", verb: "comment" },
    { id: "editor", label: "Editor", verb: "edit" },
  ] as { id: RoleId; label: string; verb: string }[],
};
