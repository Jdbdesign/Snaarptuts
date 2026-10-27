"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 11: starts on the "users" state (see MailAdminStage). */

export function Step11BulkSignature({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
