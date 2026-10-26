"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 2: starts with the Create user dialog open and empty. */

export function Step2Details({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="create-empty" />;
}
