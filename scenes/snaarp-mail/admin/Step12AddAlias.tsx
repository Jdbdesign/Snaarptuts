"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 12: starts on the "users" state (see MailAdminStage). */

export function Step12AddAlias({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
