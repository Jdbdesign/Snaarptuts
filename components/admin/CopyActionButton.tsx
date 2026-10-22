import { Icon } from "@/components/icons";

type Props = { id: string; label?: string; onClick?: () => void };

/** Solid blue "Copy" button with a copy icon. A script can click it with [data-tl=btn-<id>]. */
export function CopyActionButton({ id, label = "Copy", onClick }: Props) {
  return (
    <button
      data-tl={`btn-${id}`}
      onClick={onClick}
      className="flex h-[38px] shrink-0 items-center gap-1.5 rounded-lg bg-[#2F5BE0] px-4 text-[13px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
    >
      <Icon name="copy" size={14} />
      {label}
    </button>
  );
}
