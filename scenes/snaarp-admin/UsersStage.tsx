"use client";

import { useState } from "react";
import { AdminPanelLayout } from "@/components/admin-panel/AdminPanelLayout";
import { useNarrow } from "@/lib/useNarrow";
import type { SceneProps } from "@/tutorials/types";
import { ADMIN_AVATAR, COPY } from "./admin-data";
import { seedAdmin, type StartState } from "./admin-seed";
import { AdminToast } from "./users/AdminToast";
import { CreateUserDialog } from "./users/CreateUserDialog";
import { ManageProductsDialog } from "./users/ManageProductsDialog";
import { UsersPage } from "./users/UsersPage";

/** Same enlargement idea as the Snaarp Doc editor: on a phone the 1440px scene is shown 2.4x so text stays readable. */
const NARROW_ZOOM = 2.4;

/**
 * The shared stage of every Snaarp Admin step: the Admin Panel shell (rail, menu, top bar) with the Users page
 * and the two dialogs. Each step passes the state it starts in; the script then drives scene variables.
 */
export function UsersStage({ tl, start }: SceneProps & { start: StartState }) {
  useState(() => seedAdmin(tl, start));
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div data-scroller className="relative h-full w-full overflow-hidden">
        <div className="relative h-full w-full" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
          <AdminPanelLayout tl={tl} active="users" title={COPY.pageTitle} avatar={ADMIN_AVATAR} hideMenuOnNarrow>
            <UsersPage tl={tl} />
          </AdminPanelLayout>
          <CreateUserDialog tl={tl} />
          <ManageProductsDialog tl={tl} />
          <AdminToast tl={tl} />
        </div>
      </div>
    </div>
  );
}
