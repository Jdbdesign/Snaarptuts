"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 8 (the last): starts with Manage products open and Snaarp Books already added. */

export function Step8Confirm({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="manage-five" />;
}
