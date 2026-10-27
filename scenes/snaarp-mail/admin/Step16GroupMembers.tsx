"use client";

import type { SceneProps } from "@/tutorials/types";
import { MailAdminStage } from "./MailAdminStage";

/* Snaarp Mail admin, step 16: starts on the "group-page" state (see MailAdminStage). */

export function Step16GroupMembers({ tl }: SceneProps) {
  return <MailAdminStage tl={tl} start="group-page" />;
}
