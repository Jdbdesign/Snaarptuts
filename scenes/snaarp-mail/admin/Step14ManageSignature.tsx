"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 14: starts on the "users" state (see MailAdminStage). */

export function Step14ManageSignature({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="users" />;
}
