"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { tutorials } from "@/tutorials";
import type { Tutorial } from "@/tutorials/types";
import { ProductMark } from "./ProductMark";
import { RailSearch } from "./RailSearch";

type Props = {
  tutorial: Tutorial;
  current: number;
  done: boolean[];
  playing: boolean;
  onSelect: (index: number) => void;
  onCollapse: () => void;
  /** Bumped by the player to ask for the search box to take focus (the "/" key, or the search icon while collapsed). */
  searchFocus: number;
};

export function Rail({ tutorial, current, done, playing, onSelect, onCollapse, searchFocus }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const doneCount = done.filter(Boolean).length;
  const dropdownOpen = menuOpen;

  // Keep the active step in view in a long list (a search result can jump to step 41 of 64).
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!list || !el) return;
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top < l.top) list.scrollTop -= l.top - r.top + 8;
    else if (r.bottom > l.bottom) list.scrollTop += r.bottom - l.bottom + 8;
  }, [current, playing, tutorial]);

  return (
    <aside className="flex h-full w-[clamp(260px,15vw,300px)] flex-col gap-3 rounded-[24px] border border-line bg-white p-3">
      <div className="flex justify-end">
        <button
          onClick={onCollapse}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#F4F4F6] px-3.5 text-[14px] font-medium text-[#4b5060] transition-colors hover:bg-[#ECECF1]"
        >
          <Icon name="sidebar" size={16} />
          Collapse
        </button>
      </div>

      <RailSearch tutorial={tutorial} focusSignal={searchFocus} onSelectStep={onSelect}>
        {/* Product switcher: the current product, with the full list of products as a dropdown. */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            className={`flex h-14 w-full items-center gap-2.5 rounded-[18px] border bg-white px-3 text-left transition-colors ${
              dropdownOpen ? "border-brand/40" : "border-[#E4D7F9]"
            }`}
          >
            <ProductMark tutorial={tutorial} size={32} />
            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-ink">{tutorial.product.name}</span>
            <span className="text-[12px] text-muted">
              {doneCount}/{tutorial.steps.length}
            </span>
            <Icon
              name="chevronDown"
              size={16}
              className={`text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 flex max-h-[min(60vh,420px)] flex-col gap-0.5 overflow-y-auto rounded-[18px] border border-line bg-white p-1.5 shadow-[0_18px_44px_-16px_rgba(17,17,17,0.3)]"
            >
              {tutorials.map((t) => {
                const active = t.product.id === tutorial.product.id;
                return (
                  <li key={t.product.id} role="option" aria-selected={active}>
                    <Link
                      href={`/tutorials/${t.product.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`flex h-11 items-center gap-2.5 rounded-[12px] px-2.5 text-[13px] font-medium ${
                        active ? "bg-brand-soft text-ink" : "text-[#2a2d36] hover:bg-[#F6F6F8]"
                      }`}
                    >
                      <ProductMark tutorial={t} size={24} />
                      <span className="min-w-0 flex-1 truncate">{t.product.name}</span>
                      <span className="text-[12px] text-muted">
                        {active ? doneCount : 0}/{t.steps.length}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* This product's own modules (steps). */}
        <ol ref={listRef} className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto rounded-[18px] border border-line p-2">
          {tutorial.steps.map((s, i) => {
            const built = !!s.scene;
            const isActive = built && playing && i === current;
            const isDone = done[i];
            return (
              <li key={s.id}>
                <button
                  disabled={!built}
                  onClick={() => onSelect(i)}
                  title={built ? s.title : `${s.title} — coming soon`}
                  aria-current={isActive ? "step" : undefined}
                  className={`flex min-h-11 w-full items-center gap-2.5 rounded-[12px] border px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                    isActive
                      ? "border-brand/40 bg-brand-soft font-medium text-ink"
                      : built
                        ? "border-transparent text-[#4b5060] hover:bg-[#F6F6F8]"
                        : "cursor-not-allowed border-transparent text-[#a4a8b3]"
                  }`}
                >
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                      isDone
                        ? "border-brand bg-brand text-white"
                        : isActive
                          ? "border-brand"
                          : built
                            ? "border-[#CFCFD8]"
                            : "border-dashed border-[#D8D8DF]"
                    }`}
                  >
                    {isDone && <Icon name="check" size={11} />}
                  </span>
                  <span className="min-w-0 flex-1">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </RailSearch>
    </aside>
  );
}
