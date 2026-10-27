"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 17: starts on the "users" state (see MailAdminStage). */

export function Step17Forwarding({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
