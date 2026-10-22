import { ProxyLabel, Triangle } from "@/components/cloudflare/parts";
import { DOMAIN } from "../dns-data";
import { DNS, EXISTING_ROWS, FORM_KINDS, type CfRow } from "../cloudflare-data";

/** Column widths in design px: wide screens, and the enlarged narrow layout (no TTL column room to spare). */
const GRID = {
  wide: "grid-cols-[96px_minmax(0,250px)_minmax(0,1fr)_176px_84px_96px]",
  narrow: "grid-cols-[56px_minmax(0,108px)_minmax(0,1fr)_96px_44px_52px]",
};

/** The DNS records table: the zone's existing rows, then the rows added while the tutorial plays. */
export function RecordsTable({ added, narrow }: { added: CfRow[]; narrow: boolean }) {
  const grid = narrow ? GRID.narrow : GRID.wide;
  const c = DNS.columns;

  return (
    <div className="mt-4 text-[14px]">
      <div className={`grid ${grid} items-center gap-x-3 bg-[#F2F2F2] px-4 py-[9px] font-semibold text-[#444]`}>
        <span>{c.type}</span>
        <span>{c.name}</span>
        <span>{c.content}</span>
        <span>{c.proxy}</span>
        <span>{c.ttl}</span>
        <span className="text-right">{c.actions}</span>
      </div>
      {EXISTING_ROWS.map((r, i) => (
        <Row key={`old-${i}`} row={r} grid={grid} narrow={narrow} />
      ))}
      <div data-tl="new-rows" className="rounded-[4px]">
        {added.map((r, i) => (
          <Row key={`new-${i}`} row={r} grid={grid} narrow={narrow} fresh data-tl={`new-row-${i}`} />
        ))}
      </div>
    </div>
  );
}

function Row({ row, grid, narrow, fresh, ...rest }: { row: CfRow; grid: string; narrow: boolean; fresh?: boolean; "data-tl"?: string }) {
  const proxable = !!FORM_KINDS[row.type]?.proxy;

  return (
    <div
      {...rest}
      className={`grid ${grid} items-center gap-x-3 border-b border-[#E6E6E6] px-4 text-[#333] ${narrow ? "min-h-[52px] py-2" : "h-[44px]"} ${fresh ? "cf-row-new" : ""}`}
    >
      <span>{row.type}</span>
      <span className="truncate">{row.name === "@" ? DOMAIN : row.name}</span>
      <span className="flex min-w-0 items-center justify-between gap-3">
        <span className="truncate">{row.value}</span>
        {row.priority && (
          <span
            data-tl="priority-tag"
            className="shrink-0 rounded-[3px] border border-[#A79BE6] bg-[#EFEBFC] px-1.5 text-[12px] leading-[18px] text-[#3B2A9A]"
          >
            {row.priority}
          </span>
        )}
      </span>
      <span className="truncate">
        <ProxyLabel proxied={row.proxied} showCloud={proxable} />
      </span>
      <span>{DNS.ttl}</span>
      <span className="flex items-center justify-end gap-1 text-[#1B5FB5]">
        {DNS.edit}
        <Triangle dir="right" size={4} />
      </span>
    </div>
  );
}
