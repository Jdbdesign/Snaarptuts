"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  toast: { text: string; subtext?: string } | null;
}

export function ZeusToast({ toast }: Props) {
  if (!toast) return null;

  return (
    <div
      data-tl="zeus-toast"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toast.text}</span>
      {toast.subtext && <span className="text-gray-400">{toast.subtext}</span>}
    </div>
  );
}
