"use client";

import { FieldText } from "@/components/admin/TypedField";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DEPT_COLORS, PEOPLE_COPY, type Department } from "../people-data";
import { AdminDialog } from "./AdminDialog";
import { showAdminToast } from "./AdminToast";

const N = PEOPLE_COPY.newDept;
const FIELD =
  "flex h-[40px] items-center rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-[14px] transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#7C39ED] data-[focus=true]:shadow-[0_0_0_3px_rgba(124,57,237,0.14)]";

function Input({ tl, id, placeholder }: { tl: Timeline; id: string; placeholder: string }) {
  const focused = useTimelineVar<string>(tl, "focus", "") === id;
  return (
    <div data-tl={`field-${id}`} data-focus={focused} onClick={() => tl.setVar("focus", id)} className={FIELD}>
      <FieldText tl={tl} id={id} placeholder={placeholder} />
    </div>
  );
}

/** "New Department" on the Organization page. Scene variables: `dialog` = "newdept", `deptColor`, `field:deptname`, `field:deptdesc`. */
export function NewDepartmentDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "newdept";
  const color = useTimelineVar(tl, "deptColor", DEPT_COLORS[0]);
  const name = useTimelineVar<string>(tl, "field:deptname", "");
  const description = useTimelineVar<string>(tl, "field:deptdesc", "");

  const close = () => {
    tl.setVar("dialog", "");
    tl.setVar("focus", "");
  };

  return (
    <AdminDialog
      open={open}
      width={380}
      title={N.title}
      hook="newdept-dialog"
      scrollId="newdept-scroll"
      closeHook="newdept-close"
      onClose={close}
      footer={
        <>
          <button
            data-tl="btn-newdept-cancel"
            onClick={close}
            className="h-[38px] rounded-full border border-[#E5E7EB] bg-white px-5 text-[13.5px] font-medium transition-transform data-[pressed=true]:scale-95"
          >
            {N.cancel}
          </button>
          <button
            data-tl="btn-newdept-create"
            onClick={() => {
              if (!name.trim()) return;
              const dept: Department = { id: name.trim().toLowerCase().replace(/\s+/g, "-"), name: name.trim(), description, color };
              tl.setVar("depts", [...tl.getVar<Department[]>("depts", []), dept]);
              tl.setVar("orgFilter", dept.id);
              tl.setVar("field:deptname", "");
              tl.setVar("field:deptdesc", "");
              close();
              showAdminToast(tl, PEOPLE_COPY.org.deptToast(dept.name));
            }}
            className="h-[38px] rounded-full bg-brand px-5 text-[13.5px] font-semibold text-white transition-transform data-[pressed=true]:scale-95"
          >
            {N.create}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-1">
        <div>
          <p className="mb-1.5 text-[13px] font-semibold">{N.name}</p>
          <Input tl={tl} id="deptname" placeholder={N.namePlaceholder} />
        </div>
        <div>
          <p className="mb-1.5 text-[13px] font-semibold">{N.description}</p>
          <Input tl={tl} id="deptdesc" placeholder={N.descriptionPlaceholder} />
        </div>
        <div>
          <p className="mb-2 text-[13px] font-semibold">{N.color}</p>
          <div className="flex gap-2.5" data-tl="newdept-colors">
            {DEPT_COLORS.map((c, i) => (
              <button
                key={c}
                data-tl={`newdept-color-${i}`}
                aria-label={`Colour ${i + 1}`}
                onClick={() => tl.setVar("deptColor", c)}
                className={`h-6 w-6 rounded-full ring-offset-2 transition-transform data-[pressed=true]:scale-90 ${color === c ? "ring-2" : ""}`}
                style={{ background: c, ["--tw-ring-color" as string]: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminDialog>
  );
}
