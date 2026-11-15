"use client";

interface Props {
  enabled: boolean;
  onChange?: () => void;
  "data-tl"?: string;
  disabled?: boolean;
}

export function ZeusToggle({ enabled, onChange, "data-tl": dataTl, disabled = false }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      data-tl={dataTl}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-[#7014D9]" : "bg-[#E5E7EB]"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
