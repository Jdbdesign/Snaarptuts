import type { IconName } from "@/components/icons";

/** Items, groups and greyed-out flags of the eSignature menu. Edit here, not in ESignatureMenu.tsx. */

export type EsignItemId = "sign" | "request" | "history";

export type EsignMenuItem = {
  id: EsignItemId;
  label: string;
  icon: IconName;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
};

/** Groups are separated by a thin divider (the recording has one before Signature history). */
export const ESIGN_MENU: EsignMenuItem[][] = [
  [
    { id: "sign", label: "Sign document", icon: "edPen" },
    { id: "request", label: "Request signature", icon: "send" },
  ],
  [{ id: "history", label: "Signature history", icon: "esHistory", disabled: true }],
];
