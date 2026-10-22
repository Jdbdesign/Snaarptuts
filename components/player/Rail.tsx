"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import { tutorials } from "@/tutorials";
import type { Tutorial } from "@/tutorials/types";

type Props = {
  tutorial: Tutorial;
  current: number;
  done: boolean[];
  playing: boolean;
  onSelect: (index: number) => void;
  onCollapse: () => void;
};

function ProductMark({ tutorial, size }: { tutorial: Tutorial; size: number }) {
  return tutorial.product.logo ? (
    <ProductLogo name={tutorial.product.logo} size={size} className="rounded-[9px]" />
  ) : (
    <span className="flex shrink-0 items-center justify-center text-brand" style={{ width: size, height: size }}>
      <Icon name="logoMark" size={size} />
    </span>
  );
}

export function Rail({ tutorial, current, done, playing, onSelect, onCollapse }: Props) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const q = query.trim().toLowerCase();
  const products = tutorials.filter((t) => t.product.name.toLowerCase().includes(q));
  const doneCount = done.filter(Boolean).length;
  const dropdownOpen = menuOpen || q.length > 0;

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

      <label className="flex h-10 items-center gap-2 rounded-full bg-[#F6F6F8] px-3.5 text-muted focus-within:ring-2 focus-within:ring-brand/30">
        <Icon name="search" size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="w-full min-w-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
        />
      </label>

      {/* Product switcher: the current product, with the full list of products as a dropdown. */}
      <div className="relative shrink-0">
        <button
          onClick={() => {
            setQuery("");
            setMenuOpen((o) => !o);
          }}
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
            {products.length === 0 && <li className="px-3 py-3 text-[13px] text-muted">No products found.</li>}
            {products.map((t) => {
              const active = t.product.id === tutorial.product.id;
              return (
                <li key={t.product.id} role="option" aria-selected={active}>
                  <Link
                    href={`/tutorials/${t.product.id}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setQuery("");
                    }}
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
      <ol className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto rounded-[18px] border border-line p-2">
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
                className={`flex h-11 w-full items-center gap-2.5 rounded-[12px] border px-2.5 text-left text-[13px] transition-colors ${
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
                <span className="min-w-0 flex-1 truncate">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
