"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 1: starts on the Users page; the script opens the Create user dialog. */

export function Step1OpenCreate({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="users" />;
}
