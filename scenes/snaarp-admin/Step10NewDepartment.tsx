"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 10: starts on the "org" state (see admin-seed.ts). */

export function Step10NewDepartment({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="org" />;
}
