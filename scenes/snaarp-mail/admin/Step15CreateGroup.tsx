"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 15: starts on the "users" state (see MailAdminStage). */

export function Step15CreateGroup({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
