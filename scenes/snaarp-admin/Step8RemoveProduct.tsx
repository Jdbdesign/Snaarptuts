"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 8: starts on the "users" state (see admin-seed.ts). */

export function Step8RemoveProduct({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="users" />;
}
