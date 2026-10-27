"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 13: starts on the "users" state (see MailAdminStage). */

export function Step13BulkAliases({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
