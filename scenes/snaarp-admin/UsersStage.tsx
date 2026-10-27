"use client";

import { useState } from "react";
import { AdminPanelLayout } from "@/components/admin-panel/AdminPanelLayout";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { ADMIN_AVATAR, COPY } from "./admin-data";
import { seedAdmin, type StartState } from "./admin-seed";
import { PEOPLE_COPY } from "./people-data";
import { AdminToast } from "./users/AdminToast";
import { BulkUsersDialog } from "./users/BulkUsersDialog";
import { CreateUserDialog } from "./users/CreateUserDialog";
import { NewDepartmentDialog } from "./users/NewDepartmentDialog";
import { OrganizationPage } from "./users/OrganizationPage";
import { UsersPage } from "./users/UsersPage";

/** Same enlargement idea as the Snaarp Doc editor: on a phone the 1440px scene is shown 2.4x so text stays readable. */
const NARROW_ZOOM = 2.4;

/**
 * The shared stage of every Snaarp Admin step: the Admin Panel shell (rail, menu, top bar) with the Users page,
 * the Organization page and the dialogs. Each step passes the state it starts in; the script then drives scene
 * variables (`page` = "users" | "organization" is switched by the menu).
 */
export function UsersStage({ tl, start }: SceneProps & { start: StartState }) {
  useState(() => seedAdmin(tl, start));
  const narrow = useNarrow();
  const page = useTimelineVar<string>(tl, "page", "users");

  return (
    <div className="relative h-full w-full bg-white">
      <div data-scroller className="relative h-full w-full overflow-hidden">
        <div className="relative h-full w-full" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
          <AdminPanelLayout
            tl={tl}
            active={page}
            title={page === "organization" ? PEOPLE_COPY.org.title : COPY.pageTitle}
            avatar={ADMIN_AVATAR}
            hideMenuOnNarrow
            onNavigate={(id) => {
              if (id === "users" || id === "organization") {
                tl.setVar("page", id);
                tl.setVar("rowMenu", null);
                tl.setVar("filterMenu", "");
              }
            }}
          >
            {narrow && (
              // The menu column is hidden on a phone, so the two pages get a small switcher with the same hooks.
              <div className="mb-4 flex gap-2">
                {(["users", "organization"] as const).map((id) => (
                  <button
                    key={id}
                    data-tl={`panel-menu-${id}`}
                    onClick={() => tl.setVar("page", id)}
                    className={`h-9 rounded-full px-4 text-[13px] font-medium transition-transform data-[pressed=true]:scale-95 ${
                      page === id ? "bg-[#F0E3FF] text-brand" : "bg-white text-[#4b5060]"
                    }`}
                  >
                    {id === "users" ? COPY.pageTitle : PEOPLE_COPY.org.title}
                  </button>
                ))}
              </div>
            )}
            {page === "organization" ? <OrganizationPage tl={tl} /> : <UsersPage tl={tl} />}
          </AdminPanelLayout>
          <CreateUserDialog tl={tl} />
          <BulkUsersDialog tl={tl} />
          <NewDepartmentDialog tl={tl} />
          <AdminToast tl={tl} />
        </div>
      </div>
    </div>
  );
}
