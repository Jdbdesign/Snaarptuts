"use client";

import { useEffect, useReducer, type ReactNode } from "react";
import { FieldText } from "@/components/admin/TypedField";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { bulkProblem, CSV_ROWS, PEOPLE_COPY, toPerson, type BulkRow, type Person } from "../people-data";
import { showAdminToast } from "./AdminToast";

const B = PEOPLE_COPY.bulk;
/** Column widths of the review table (px). Status, then the nine fields, then the delete button. */
const WIDTHS = [138, 190, 118, 104, 104, 104, 112, 120, 104, 96, 32];
const FIELD_KEYS = ["email", "password", "first", "last", "username", "job", "dept", "employee"] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

/** The row's value for a field: what the scene typed into it, or what the CSV had. */
const valueOf = (tl: Timeline, row: BulkRow, key: FieldKey) => tl.getVar<string>(`field:bulk-${row.id}-${key}`, "") || row[key];
const effective = (tl: Timeline, row: BulkRow): BulkRow => ({ ...row, ...Object.fromEntries(FIELD_KEYS.map((k) => [k, valueOf(tl, row, k)])) });

function Cell({ tl, row, field, placeholder, mask }: { tl: Timeline; row: BulkRow; field: FieldKey; placeholder: string; mask?: boolean }) {
  const id = `bulk-${row.id}-${field}`;
  const typed = useTimelineVar(tl, `field:${id}`, "");
  const focused = useTimelineVar<string>(tl, "focus", "") === id;
  const csv = row[field];
  return (
    <div
      data-tl={`field-${id}`}
      data-focus={focused}
      onClick={(e) => {
        e.stopPropagation();
        tl.setVar("focus", id);
      }}
      className={`flex h-8 items-center rounded-lg border bg-white px-2.5 text-[12.5px] transition-[border-color,box-shadow] duration-150 ${
        focused ? "border-[#7C39ED] shadow-[0_0_0_3px_rgba(124,57,237,0.14)]" : "border-[#E5E7EB]"
      }`}
    >
      {!typed && csv ? (
        <span className="truncate">{mask ? "•".repeat(csv.length) : csv}</span>
      ) : (
        <FieldText tl={tl} id={id} placeholder={placeholder} mask={mask} />
      )}
    </div>
  );
}

function Frame({ open, children, footer, head }: { open: boolean; children: ReactNode; footer: ReactNode; head: ReactNode }) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-0 z-40 flex items-center justify-center pb-[56px] transition-opacity duration-300 motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#1a1a24]/45" />
      <div
        role="dialog"
        aria-modal="true"
        data-tl="bulk-dialog"
        className={`relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-100" : "scale-95"
        }`}
        style={{ width: "min(660px, calc(100% - 32px))", maxHeight: "calc(100% - 100px)" }}
      >
        {head}
        <div data-tl="bulk-scroll" className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-4 [transform:translateZ(0)]">
          {children}
        </div>
        {footer}
      </div>
    </div>
  );
}

/**
 * "Bulk users" (ref/admin/v179.mp4, 0:12-0:50). Scene variables: `dialog` = "bulk", `bulkRows` (rows in the
 * review table), `bulkFile` (name of the uploaded file), `field:bulk-<row>-<field>` (typed cells).
 * Differences from the recording: see docs/DECISIONS-AND-DEVIATIONS.md ("Snaarp Mail admin and Snaarp Admin update").
 */
export function BulkUsersDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "bulk";
  const rows = useTimelineVar<BulkRow[]>(tl, "bulkRows", []);
  const file = useTimelineVar<string>(tl, "bulkFile", "");
  const [, bump] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    tl.subscribe(bump);
  }, [tl]);

  const eff = rows.map((r) => effective(tl, r));
  const ready = eff.filter((r) => !bulkProblem(r)).length;
  const bad = rows.length - ready;
  const close = () => {
    tl.setVar("dialog", "");
    tl.setVar("focus", "");
  };

  return (
    <Frame
      open={open}
      head={
        <div className="flex shrink-0 items-start justify-between gap-3 px-6 pb-3 pt-5">
          <div>
            <h2 className="text-[17px] font-bold">{B.title}</h2>
            <p className="mt-0.5 text-[12.5px] text-[#6b7280]">{B.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-tl="btn-csv-template"
              onClick={() => showAdminToast(tl, B.templateToast)}
              className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E5E7EB] px-3 text-[12px] font-medium transition-[background,transform] data-[pressed=true]:scale-95 hover:bg-[#F3F4F6]"
            >
              <Icon name="download" size={13} />
              {B.template}
            </button>
            <button data-tl="bulk-close-x" aria-label="Close" onClick={close} className="flex h-7 w-7 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#F3F4F6]">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
      }
      footer={
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#F0F0F4] px-6 py-3.5">
          <span data-tl="bulk-summary" className="text-[12px] text-[#6b7280]">
            {B.willSubmit(ready)}
          </span>
          <div className="flex items-center gap-3">
            <button
              data-tl="btn-bulk-close"
              onClick={close}
              className="h-9 rounded-full border border-[#E5E7EB] bg-white px-5 text-[13px] font-medium transition-transform data-[pressed=true]:scale-95"
            >
              {B.close}
            </button>
            <button
              data-tl="btn-bulk-create"
              onClick={() => {
                if (ready === 0) return;
                const added = eff.filter((r) => !bulkProblem(r)).map((r) => ({ ...toPerson(r), name: `${r.first} ${r.last}`.trim() || r.email }));
                const now = tl.getVar<Person[]>("users", []);
                tl.setVar("users", [...added, ...now]);
                tl.setVar("bulkRows", []);
                tl.setVar("bulkFile", "");
                close();
                showAdminToast(tl, B.createdToast(added.length));
              }}
              className={`flex h-9 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white transition-[background,transform] data-[pressed=true]:scale-95 ${
                ready === 0 ? "bg-[#C9B1F5]" : "bg-brand"
              }`}
            >
              <Icon name="users" size={14} />
              {B.create(ready)}
            </button>
          </div>
        </div>
      }
    >
      <div className="rounded-xl border border-[#F0F0F4] px-4 py-4 text-center">
        <Icon name="upload" size={18} className="mx-auto text-[#6b7280]" />
        <p className="mt-1.5 text-[13px] font-semibold">{file ? file : B.uploadTitle}</p>
        <p className="mx-auto mt-1 max-w-[440px] text-[11.5px] leading-4 text-[#6b7280]">{file ? B.uploadedToast(file, rows.length) : B.uploadHelp}</p>
        <button
          data-tl="btn-choose-file"
          onClick={() => {
            tl.setVar("bulkFile", PEOPLE_COPY.bulkRows.file);
            tl.setVar("bulkRows", CSV_ROWS);
          }}
          className="mt-3 h-8 rounded-full bg-brand px-4 text-[12px] font-semibold text-white transition-transform data-[pressed=true]:scale-95"
        >
          {B.choose}
        </button>
        <p className="mt-3 text-[11px] text-[#6b7280]">
          {B.notSure} <span className="font-medium text-brand underline">{B.sampleLink}</span>
          {B.notSureEnd}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-[#F0F0F4] px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p data-tl="bulk-review-title" className="text-[13px] font-semibold">
              {B.review(rows.length)}
            </p>
            <p className="mt-0.5 text-[11.5px]">
              <span className="text-[#1B7F4B]">{B.ready(ready)}</span>
              {bad > 0 && <span className="text-[#C2410C]">, {B.needFixing(bad)}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-tl="btn-add-row"
              onClick={() => tl.setVar("bulkRows", [...rows, { id: `m${rows.length + 1}`, email: "", password: "", first: "", last: "", username: "", job: "", dept: "", employee: "", role: B.roles[0] }])}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-[12px] font-medium transition-transform data-[pressed=true]:scale-95"
            >
              <Icon name="plus" size={12} />
              {B.addRow}
            </button>
            <button
              data-tl="btn-bulk-clear"
              onClick={() => {
                tl.setVar("bulkRows", []);
                tl.setVar("bulkFile", "");
              }}
              className={`flex h-8 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-[12px] font-medium ${rows.length ? "" : "text-[#b4b8c2]"}`}
            >
              <Icon name="trash" size={12} />
              {B.clear}
            </button>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-3 flex flex-col items-center gap-2 py-6 text-[12.5px] text-[#6b7280]">
            <Icon name="users" size={26} className="text-[#C9CCD6]" />
            {B.empty}
          </div>
        ) : (
          <div data-tl="bulk-table" className="no-scrollbar mt-3 overflow-x-auto">
            <div className="flex min-w-max flex-col gap-2 pb-1">
              <div className="flex gap-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b909c]">
                {B.columns.map((c, i) => (
                  <span key={i} style={{ width: WIDTHS[i] }} className="shrink-0">
                    {c}
                  </span>
                ))}
              </div>
              {rows.map((row, ri) => {
                const e = eff[ri];
                const problem = bulkProblem(e);
                return (
                  <div key={row.id} data-tl={`bulk-row-${row.id}`} className="flex items-center gap-2">
                    <span
                      style={{ width: WIDTHS[0] }}
                      className={`shrink-0 text-[11.5px] font-medium ${problem ? "text-[#C2410C]" : "text-[#1B7F4B]"}`}
                    >
                      {problem || B.ok}
                    </span>
                    {FIELD_KEYS.map((k, i) => (
                      <div key={k} style={{ width: WIDTHS[i + 1] }} className="shrink-0">
                        <Cell tl={tl} row={row} field={k} placeholder={B.placeholders[i]} mask={k === "password"} />
                      </div>
                    ))}
                    <span style={{ width: WIDTHS[9] }} className="flex h-8 shrink-0 items-center justify-between rounded-lg border border-[#E5E7EB] px-2.5 text-[12.5px]">
                      {row.role}
                      <Icon name="chevronDown" size={12} className="text-[#6b7280]" />
                    </span>
                    <button
                      data-tl={`bulk-delete-${row.id}`}
                      aria-label="Delete row"
                      onClick={() => tl.setVar("bulkRows", rows.filter((r) => r.id !== row.id))}
                      style={{ width: WIDTHS[10] }}
                      className="flex h-8 shrink-0 items-center justify-center text-[#8b909c] hover:text-[#E5484D]"
                    >
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
}
