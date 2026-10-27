"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { MAIL_MENU, MAIL_USERS, type Group } from "./data";
import { ForwardingPage, MailboxView } from "./ForwardingAndMailbox";
import { AddMembersDialog, GroupDetail, GroupsList, GroupWizard } from "./GroupsPages";
import { MailUsersPage } from "./MailUsersPage";
import { AliasesDialog, BulkSignatureDialog, BulkUploadDialog, SignatureDialog } from "./UsersDialogs";

/** The state a Snaarp Mail admin step starts in. */
export type MailAdminStart =
  | "users" // User Management, 14 users, no dialog
  | "groups" // Group Management, no groups yet
  | "group-page" // the Support group exists, group page open, no members
  | "group-members" // the Support group has four members
  | "mailbox" // a mailbox with Compose
  | "forwarding"; // Email Forwarding, nothing selected

const NARROW_ZOOM = 2.2;
const SUPPORT: Group = { id: "support", name: "Support", description: "Support for tickets", email: "support@acme-studio.com", type: "Security Group", visibility: "Public", members: [] };

function seed(tl: Timeline, start: MailAdminStart) {
  const group = start === "group-page" || start === "group-members";
  tl.setVar("mUsers", MAIL_USERS);
  tl.setVar("sigSel", MAIL_USERS.map((u) => u.id));
  tl.setVar("groups", group ? [start === "group-members" ? { ...SUPPORT, members: ["jane", "alex", "sam", "priya"] } : SUPPORT] : []);
  tl.setVar("gPage", group ? "detail" : "list");
  tl.setVar("gId", "support");
  tl.setVar("gType", "Distribution List");
  tl.setVar("page", start === "groups" || group ? "groups" : start === "mailbox" ? "mailbox" : start === "forwarding" ? "forwarding" : "users");
}

/**
 * The shared stage of the Snaarp Mail admin steps (10-17): the owner portal shell (AdminLayout) with User
 * Management, Groups, Email Forwarding and a small mailbox. The page is the scene variable `page`.
 */
export function MailAdminStage({ tl, start }: SceneProps & { start: MailAdminStart }) {
  useState(() => seed(tl, start));
  const narrow = useNarrow();
  const page = useTimelineVar<string>(tl, "page", "users");
  const gPage = useTimelineVar<string>(tl, "gPage", "list");

  const go = (id: string) => {
    if (id === "user") tl.setVar("page", "users");
    else if (id === "groups") {
      tl.setVar("page", "groups");
      tl.setVar("gPage", "list");
    } else if (id === "forwarding") tl.setVar("page", "forwarding");
  };

  return (
    <div className="relative h-full w-full bg-white">
      <div data-scroller className="relative h-full w-full overflow-hidden">
        <div className="relative h-full w-full" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
          {page === "mailbox" ? (
            <MailboxView tl={tl} />
          ) : (
            <AdminLayout
              tl={tl}
              active={page === "users" ? "user" : page}
              menuItems={MAIL_MENU}
              onNavigate={go}
              compactOnNarrow
              overlay={
                <>
                  <BulkUploadDialog tl={tl} />
                  <BulkSignatureDialog tl={tl} />
                  <AliasesDialog tl={tl} />
                  <SignatureDialog tl={tl} />
                  <GroupWizard tl={tl} />
                  <AddMembersDialog tl={tl} />
                </>
              }
            >
              {narrow && (
                // The sidebar is hidden on a phone, so the three pages get a small switcher with the same hooks.
                <div className="mb-4 flex gap-2">
                  {MAIL_MENU.filter((m) => ["user", "groups", "forwarding"].includes(m.id)).map((m) => (
                    <button
                      key={m.id}
                      data-tl={`menu-${m.id}`}
                      onClick={() => go(m.id)}
                      className={`h-9 rounded-full px-4 text-[13px] font-medium transition-transform data-[pressed=true]:scale-95 ${
                        (page === "users" ? "user" : page) === m.id ? "bg-[#0E0E10] text-white" : "bg-white text-[#4b5060]"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              )}
              {page === "users" && <MailUsersPage tl={tl} />}
              {page === "groups" && (gPage === "detail" ? <GroupDetail tl={tl} /> : <GroupsList tl={tl} />)}
              {page === "forwarding" && <ForwardingPage tl={tl} />}
            </AdminLayout>
          )}
        </div>
      </div>
    </div>
  );
}
