import { Icon } from "@/components/icons";

/** Shown on the stage for a product whose steps are all still to be built. */
export function ComingSoon({ name, count }: { name: string; count: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon name="sparkle" size={26} />
      </span>
      <h2 className="text-[22px] font-bold leading-8 text-ink">{name} tutorials are coming soon</h2>
      <p className="max-w-[360px] text-[14px] leading-6 text-muted">
        {count} modules are planned. They will appear here, one by one, as they are built.
      </p>
    </div>
  );
}
