"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 11: starts on the "org-design" state (see admin-seed.ts). */

export function Step11AddMember({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="org-design" />;
}
