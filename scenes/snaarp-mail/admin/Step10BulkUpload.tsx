"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 10: starts on the "users" state (see MailAdminStage). */

export function Step10BulkUpload({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
