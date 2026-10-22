/** Round radio. Selected = purple ring with a purple dot. */
export function Radio({ selected, size = 16 }: { selected: boolean; size?: number }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white transition-colors duration-150 ${
        selected ? "border-brand" : "border-[#C9CDD6]"
      }`}
      style={{ width: size, height: size }}
    >
      {selected && <span className="rounded-full bg-brand" style={{ width: size - 8, height: size - 8 }} />}
    </span>
  );
}
