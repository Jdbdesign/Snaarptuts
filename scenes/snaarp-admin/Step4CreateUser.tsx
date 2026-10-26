"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 4: starts with the dialog open and every field filled except the password. */

export function Step4CreateUser({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="create-details" />;
}
