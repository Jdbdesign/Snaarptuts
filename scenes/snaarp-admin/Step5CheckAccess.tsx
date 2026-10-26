"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 5: starts on the Users page with the new user in the directory. */

export function Step5CheckAccess({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="created" />;
}
