"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";

/*
 * The Snaarp Mail onboarding frame: a dark progress sidebar on the left, a white content area on the right.
 * Steps 3-9 of the Mail tutorial reuse it and only change `active`. Sidebar items are edited here.
 */

export const ONBOARDING_ITEMS = [
  { id: "organization", label: "Organization", icon: "orgChart" },
  { id: "domain", label: "Domain", icon: "globe" },
  { id: "dns", label: "DNS", icon: "database" },
  { id: "users", label: "Users Inbox", icon: "userPlus" },
  { id: "done", label: "Set up completed", icon: "circleTick" },
] as const satisfies readonly { id: string; label: string; icon: IconName }[];

export type OnboardingItemId = (typeof ONBOARDING_ITEMS)[number]["id"];

type Props = {
  /** The current item. It and every item before it are drawn white; later ones are dim. */
  active: OnboardingItemId;
  children: ReactNode;
  /** Drawn over the whole shell (sidebar included), e.g. a Modal. Kept inside the scene root so scripts can find its elements. */
  overlay?: ReactNode;
};

const ACTIVE = "#FFFFFF";
const DIM = "#4B5159";
const DIM_LABEL = "#5E646D";

export function OnboardingShell({ active, children, overlay }: Props) {
  const narrow = useNarrow();
  const activeIndex = ONBOARDING_ITEMS.findIndex((i) => i.id === active);

  return (
    <div data-scroller className={`relative flex h-full w-full overflow-hidden bg-white ${narrow ? "flex-col" : ""}`}>
      {narrow ? <TopRow activeIndex={activeIndex} /> : <Sidebar activeIndex={activeIndex} />}
      <div data-tl="content-panel" className="no-scrollbar relative min-h-0 min-w-0 flex-1 overflow-y-auto bg-white">
        {children}
      </div>
      {overlay}
    </div>
  );
}

function Sidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <aside className="relative h-full w-[238px] shrink-0 overflow-hidden" style={{ background: "#0D1218" }}>
      <Pattern />
      <ol className="relative px-6 pt-[66px]">
        {ONBOARDING_ITEMS.map((item, i) => {
          const on = i <= activeIndex;
          return (
            <li key={item.id} data-tl={`onb-${item.id}`} data-on={on} className="relative flex h-[115px] items-start">
              <Icon name={item.icon} size={36} style={{ color: on ? ACTIVE : DIM }} className="shrink-0 transition-colors duration-300" />
              <span
                className={`ml-[17px] mt-[8px] text-[13px] leading-5 transition-colors duration-300 ${on ? "font-semibold" : "font-medium"}`}
                style={{ color: on ? ACTIVE : DIM_LABEL }}
              >
                {item.label}
              </span>
              {i < ONBOARDING_ITEMS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[17px] top-[55px] h-[38px] w-[1.5px] rounded-full"
                  style={{ background: i < activeIndex ? "#6B717A" : "#2F353D" }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

/** Under 900px the sidebar becomes a slim row of the five icons across the top. */
function TopRow({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative flex h-[120px] shrink-0 items-center justify-around overflow-hidden px-6" style={{ background: "#0D1218" }}>
      {ONBOARDING_ITEMS.map((item, i) => (
        <Icon
          key={item.id}
          name={item.icon}
          size={56}
          style={{ color: i <= activeIndex ? ACTIVE : DIM }}
          aria-label={item.label}
        />
      ))}
    </div>
  );
}

/** Faint low-poly pattern behind the sidebar. Decorative only. */
function Pattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 238 693" preserveAspectRatio="xMidYMid slice">
      <rect width="238" height="693" fill="#0D1218" />
      <polygon points="0,0 238,0 120,170" fill="#101620" />
      <polygon points="0,0 120,170 0,300" fill="#0B1016" />
      <polygon points="238,0 238,260 120,170" fill="#0F141C" />
      <polygon points="0,300 120,170 238,260 150,430" fill="#0C1117" />
      <polygon points="0,300 150,430 0,560" fill="#10151D" />
      <polygon points="238,260 238,520 150,430" fill="#0B1015" />
      <polygon points="0,560 150,430 238,520 238,693 60,693" fill="#0E131B" />
    </svg>
  );
}
