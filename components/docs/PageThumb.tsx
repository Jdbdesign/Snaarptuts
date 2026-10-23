/*
 * A generic white page thumbnail: a small heading and tiny grey lines. It stands in for a real
 * template preview, so the cards need no screenshots. `kind` only changes the line pattern.
 */

type Row = "title" | "head" | "line" | "short" | "gap";

const PATTERNS: Record<string, { center: boolean; rows: Row[] }> = {
  resume: { center: false, rows: ["title", "short", "gap", "head", "line", "line", "short", "gap", "head", "line", "line", "line", "gap", "head", "line", "short"] },
  letter: { center: false, rows: ["short", "short", "short", "gap", "line", "line", "line", "line", "line", "gap", "line", "line", "line", "line", "short", "gap", "short"] },
  proposal: { center: true, rows: ["title", "short", "gap", "head", "line", "line", "gap", "head", "line", "line", "line", "gap", "head", "line", "line", "gap", "head", "line", "short"] },
  flyer: { center: true, rows: ["gap", "title", "short", "gap", "gap", "head", "short", "short", "short", "gap", "head", "short", "short", "gap", "head", "short"] },
  report: { center: true, rows: ["title", "short", "short", "gap", "head", "line", "line", "gap", "head", "line", "line", "line", "gap", "head", "line", "line", "gap", "head", "short"] },
  invoice: { center: false, rows: ["title", "gap", "short", "short", "gap", "line", "line", "line", "line", "gap", "short", "short", "gap", "line", "short"] },
  notes: { center: false, rows: ["title", "short", "gap", "head", "line", "short", "gap", "head", "line", "line", "short", "gap", "head", "line", "short"] },
};

const WIDTH: Record<Row, string> = { title: "46%", head: "34%", line: "92%", short: "58%", gap: "0%" };

export function PageThumb({ kind = "resume", className = "" }: { kind?: string; className?: string }) {
  const p = PATTERNS[kind] ?? PATTERNS.resume;
  return (
    <div
      aria-hidden
      className={`flex w-full flex-col overflow-hidden rounded-[3px] border border-[#E7E8EC] bg-white px-[11%] pt-[11%] shadow-[0_1px_2px_rgba(17,17,17,0.04)] ${p.center ? "items-center" : "items-start"} ${className}`}
      style={{ aspectRatio: "0.78" }}
    >
      {p.rows.map((r, i) =>
        r === "gap" ? (
          <span key={i} className="block h-[5px] shrink-0" />
        ) : (
          <span
            key={i}
            className={`mb-[3px] block shrink-0 rounded-full ${r === "title" ? "h-[2.5px] bg-[#3A3F4A]" : r === "head" ? "h-[2px] bg-[#5A9FA9]" : "h-[1.3px] bg-[#D6D9DF]"}`}
            style={{ width: WIDTH[r] }}
          />
        ),
      )}
    </div>
  );
}
