"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 7: starts with Manage products open and the user's four products. */

export function Step7AddProduct({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="manage-four" />;
}
