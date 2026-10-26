"use client";

import type { SceneProps } from "@/tutorials/types";
import { UsersStage } from "./UsersStage";

/* Snaarp Admin, step 3: starts with the dialog open and the email, names and username typed. */

export function Step3JobRole({ tl }: SceneProps) {
  return <UsersStage tl={tl} start="create-names" />;
}
