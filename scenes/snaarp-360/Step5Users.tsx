"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPanelLayout } from "@/components/admin-panel/AdminPanelLayout";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { LoadingScreen } from "./step3/LoadingScreen";
import { ProductsHome } from "./step3/ProductsHome";
import { PRODUCT_TILES } from "./step3/step3-data";
import { DomainsPage } from "./step4/DomainsPage";
import { AddUserModal } from "./step5/AddUserModal";
import { AdminPanelDashboard } from "./step5/AdminPanelDashboard";
import { AdminPanelUsers } from "./step5/AdminPanelUsers";
import { UserLogin } from "./step5/UserLogin";
import { UserManagement } from "./step5/UserManagement";

export type Step5Screen = "owner" | "login" | "products" | "loading" | "panel";

/** The only product a new admin user has: Project. */
const NEW_USER_TILES = PRODUCT_TILES.filter((t) => t.id === "project");

/** Put the scene variables in the state step 4 ended in, before anything renders. */
function seedFromStep4(tl: Timeline) {
  tl.setVar("domainAdded", true);
  tl.setVar("verified", true);
  tl.setVar("tab", "domains");
}

/**
 * Step 5 — Add your first user. Starts on the verified domain list step 4 ended on, then plays:
 * owner portal (domains, User Management, Add User) -> user login -> products home ->
 * Admin Panel (dashboard, Users).
 */
export function Step5Users({ tl }: SceneProps) {
  useState(() => seedFromStep4(tl));
  const screen = useTimelineVar<Step5Screen>(tl, "screen", "owner");
  const fade = useTimelineVar(tl, "fade", false);

  return (
    <div className="relative h-full w-full bg-white">
      <div data-scroller className="relative h-full w-full overflow-hidden">
        {screen === "owner" && <OwnerPortal tl={tl} />}
        {screen === "login" && <UserLogin tl={tl} />}
        {screen === "products" && <ProductsHome tl={tl} avatar="S" tiles={NEW_USER_TILES} />}
        {screen === "loading" && <LoadingScreen label={null} />}
        {screen === "panel" && <AdminPanel tl={tl} />}
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/** Owner portal: the verified domain list (carried over from step 4), then User Management. */
function OwnerPortal({ tl }: { tl: Timeline }) {
  const page = useTimelineVar<"domains" | "users">(tl, "page", "domains");

  return (
    <AdminLayout
      tl={tl}
      active={page === "users" ? "user" : "domains"}
      onNavigate={(id) => {
        if (id === "user") tl.setVar("page", "users");
      }}
      overlay={<AddUserModal tl={tl} />}
    >
      {page === "users" ? <UserManagement tl={tl} /> : <DomainsPage tl={tl} instant />}
    </AdminLayout>
  );
}

/** Admin Panel for the new admin: a different layout from the owner portal. */
function AdminPanel({ tl }: { tl: Timeline }) {
  const page = useTimelineVar<"dashboard" | "users">(tl, "ppage", "dashboard");

  return (
    <AdminPanelLayout
      tl={tl}
      active={page}
      title={page === "users" ? "Users" : "Dashboard"}
      onNavigate={(id) => {
        if (id === "users") tl.setVar("ppage", "users");
      }}
    >
      {page === "users" ? <AdminPanelUsers /> : <AdminPanelDashboard />}
    </AdminPanelLayout>
  );
}
