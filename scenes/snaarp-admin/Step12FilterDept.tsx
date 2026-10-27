"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 12: starts on the "users-design" state (see admin-seed.ts). */

export function Step12FilterDept({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="users-design" />;
}
