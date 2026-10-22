import { Icon } from "@/components/icons";

/** Small square checkbox. Checked = dark fill with a white tick. */
export function Checkbox({ checked, size = 16 }: { checked: boolean; size?: number }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-150 ${
        checked ? "border-[#111] bg-[#111] text-white" : "border-[#C9CDD6] bg-white"
      }`}
      style={{ width: size, height: size }}
    >
      {checked && <Icon name="check" size={size - 5} />}
    </span>
  );
}
