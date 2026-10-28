"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { clearPendingJump, setPendingJump } from "@/lib/pending-jump";
import { buildSearchIndex, search, type ModuleHit, type ProductHit, type Range } from "@/lib/search-index";
import { tutorials } from "@/tutorials";
import type { Tutorial } from "@/tutorials/types";
import { ProductMark } from "./ProductMark";
import { RAIL_SEARCH as COPY } from "./rail-search-data";

// Built once from the tutorial configs, so every product and step is searchable without a separate list.
const INDEX = buildSearchIndex(tutorials);

type OptionBody =
  | { key: string; kind: "product"; hit: ProductHit }
  | { key: string; kind: "module"; hit: ModuleHit }
  | { key: string; kind: "more"; group: "products" | "modules"; hidden: number };
type Option = OptionBody & { id: string };

type Props = {
  /** The tutorial that is open now. */
  tutorial: Tutorial;
  /** Bumped by the player to ask for the box to take focus. */
  focusSignal: number;
  /** Jump to a step of the open tutorial. */
  onSelectStep: (index: number) => void;
  /** The normal rail content (product card and step list). It stays mounted, and unchanged, under the results. */
  children: ReactNode;
};

function Highlight({ text, ranges }: { text: string; ranges: Range[] }) {
  if (ranges.length === 0) return <>{text}</>;
  const parts: ReactNode[] = [];
  let at = 0;
  ranges.forEach(([start, end], i) => {
    if (start > at) parts.push(text.slice(at, start));
    parts.push(
      <mark key={i} className="bg-transparent font-semibold text-brand">
        {text.slice(start, end)}
      </mark>,
    );
    at = end;
  });
  if (at < text.length) parts.push(text.slice(at));
  return <>{parts}</>;
}

const firstBuilt = (t: Tutorial) => Math.max(0, t.steps.findIndex((s) => s.scene));

export function RailSearch({ tutorial, focusSignal, onSelectStep, children }: Props) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [query, setQuery] = useState("");
  const [settled, setSettled] = useState(""); // the query results are computed from (debounced)
  const [focused, setFocused] = useState(false);
  const [showAll, setShowAll] = useState({ products: false, modules: false });
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const open = focused && query.trim() !== "";
  const results = useMemo(() => search(INDEX, settled), [settled]);

  const options = useMemo<Option[]>(() => {
    const out: Option[] = [];
    const add = (o: OptionBody) => out.push({ ...o, id: `${uid}-opt-${out.length}` });
    const { products, modules } = results;
    const pLimit = showAll.products ? products.length : COPY.maxProducts;
    const mLimit = showAll.modules ? modules.length : COPY.maxModules;
    products.slice(0, pLimit).forEach((hit) => add({ key: hit.key, kind: "product", hit }));
    if (products.length > pLimit) add({ key: "more:products", kind: "more", group: "products", hidden: products.length - pLimit });
    modules.slice(0, mLimit).forEach((hit) => add({ key: hit.key, kind: "module", hit }));
    if (modules.length > mLimit) add({ key: "more:modules", kind: "more", group: "modules", hidden: modules.length - mLimit });
    return out;
  }, [results, showAll, uid]);

  const active = options.find((o) => o.key === activeKey) ?? options[0];

  // Take focus when the player asks (the "/" key, or the search icon while the rail is collapsed).
  useEffect(() => {
    if (focusSignal === 0) return;
    inputRef.current?.focus({ preventScroll: true });
    inputRef.current?.select();
  }, [focusSignal]);

  // Keep the highlighted result visible inside the panel, without scrolling anything else.
  useEffect(() => {
    const panel = panelRef.current;
    const el = active && panel?.querySelector<HTMLElement>(`[id="${active.id}"]`);
    if (!panel || !el) return;
    const p = panel.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top < p.top) panel.scrollTop -= p.top - r.top + 40; // leaves room for the group heading
    else if (r.bottom > p.bottom) panel.scrollTop += r.bottom - p.bottom + 8;
  }, [active]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (value: string) => {
    setQuery(value);
    clearTimeout(timer.current);
    // The first letter (and clearing the box) answers at once; later letters wait a moment so fast typing stays calm.
    if (settled.trim() === "" || value.trim() === "") {
      setSettled(value);
      setShowAll({ products: false, modules: false });
      setActiveKey(null);
    } else {
      timer.current = setTimeout(() => {
        setSettled(value);
        setShowAll({ products: false, modules: false });
        setActiveKey(null);
      }, COPY.debounceMs);
    }
  };

  const reset = () => {
    clearTimeout(timer.current);
    setQuery("");
    setSettled("");
    setShowAll({ products: false, modules: false });
    setActiveKey(null);
  };

  const choose = (o: Option) => {
    if (o.kind === "more") {
      const list = o.group === "products" ? results.products : results.modules;
      const limit = o.group === "products" ? COPY.maxProducts : COPY.maxModules;
      setShowAll((s) => ({ ...s, [o.group]: true }));
      setActiveKey(list[limit]?.key ?? null);
      return;
    }
    const { productId } = o.hit;
    const target = tutorials.find((t) => t.product.id === productId)!;
    const step = o.kind === "module" ? o.hit.stepIndex : firstBuilt(target);
    if (productId === tutorial.product.id) {
      onSelectStep(step);
    } else {
      // The other product opens in a fresh player; the slot tells it which step to start on.
      if (o.kind === "module") setPendingJump(productId, step);
      else clearPendingJump();
      router.push(`/tutorials/${productId}`);
    }
    reset();
    inputRef.current?.blur(); // so Space pauses the tutorial again
  };

  const move = (delta: number) => {
    if (options.length === 0) return;
    const i = options.findIndex((o) => o === active);
    setActiveKey(options[(i + delta + options.length) % options.length].key);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!open) return;
      e.preventDefault();
      move(e.key === "ArrowDown" ? 1 : -1);
    } else if (e.key === "Enter") {
      if (open && active) {
        e.preventDefault();
        choose(active);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      reset();
      inputRef.current?.blur();
    }
  };

  const hasOptions = options.length > 0;
  const pCount = results.products.length;
  const mCount = results.modules.length;
  const productOptions = options.filter((o) => o.kind === "product" || (o.kind === "more" && o.group === "products"));
  const moduleOptions = options.filter((o) => o.kind === "module" || (o.kind === "more" && o.group === "modules"));
  const examples = tutorials.slice(0, 2).map((t) => t.product.name);

  const renderOption = (o: Option) => {
    const isActive = o === active;
    const base = `flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-[12px] px-2.5 py-1.5 text-left text-[13px] ${
      isActive ? "bg-brand-soft" : ""
    }`;
    const common = {
      id: o.id,
      role: "option" as const,
      "aria-selected": isActive,
      onMouseMove: () => active !== o && setActiveKey(o.key),
      onClick: () => choose(o),
    };
    if (o.kind === "more") {
      return (
        <div key={o.key} {...common} className={`${base} font-medium text-brand`}>
          {COPY.showMore(o.hidden)}
        </div>
      );
    }
    const t = tutorials.find((x) => x.product.id === o.hit.productId)!;
    if (o.kind === "product") {
      return (
        <div key={o.key} {...common} className={`${base} font-medium text-[#2a2d36]`}>
          <ProductMark tutorial={t} size={24} />
          <span className="min-w-0 flex-1 truncate">
            <Highlight text={o.hit.name} ranges={o.hit.nameRanges} />
          </span>
        </div>
      );
    }
    const { hit } = o;
    return (
      <div key={o.key} {...common} className={`${base} items-start`}>
        <span className="mt-0.5 shrink-0">
          <ProductMark tutorial={t} size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug text-ink">
            <Highlight text={hit.title} ranges={hit.titleRanges} />
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-muted">
            <Highlight text={hit.productName} ranges={hit.productRanges} />
            {hit.group && (
              <>
                {" · "}
                <Highlight text={hit.group} ranges={hit.groupRanges} />
              </>
            )}
            {` · Step ${hit.stepNumber}`}
          </span>
        </span>
      </div>
    );
  };

  const heading = (id: string, label: string) => (
    <div id={id} className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
      {label}
    </div>
  );

  return (
    <>
      <label className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#F6F6F8] px-3.5 text-muted focus-within:ring-2 focus-within:ring-brand/30">
        <Icon name="search" size={16} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={COPY.placeholder}
          aria-label={COPY.label}
          role="combobox"
          aria-expanded={open && hasOptions}
          aria-controls={hasOptions ? listId : undefined}
          aria-activedescendant={open && active ? active.id : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="w-full min-w-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
        />
        {query && (
          <button
            type="button"
            aria-label={COPY.clear}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              reset();
              inputRef.current?.focus();
            }}
            className="-mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-[#ECECF1] hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </label>

      <div role="status" aria-live="polite" className="sr-only">
        {open ? COPY.announce(pCount, mCount) : ""}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col" inert={open} aria-hidden={open || undefined}>
          {children}
        </div>

        {open && (
          <div
            ref={panelRef}
            onMouseDown={(e) => e.preventDefault()} // keep focus in the box while a result is clicked
            className="tl-pop-in absolute inset-0 z-30 overflow-y-auto overscroll-contain rounded-none border border-line bg-white p-1.5 shadow-[0_18px_44px_-16px_rgba(17,17,17,0.3)]"
          >
            {hasOptions ? (
              <div id={listId} role="listbox" aria-label={COPY.label}>
                {productOptions.length > 0 && (
                  <div role="group" aria-labelledby={`${uid}-h-products`}>
                    {heading(`${uid}-h-products`, COPY.productsHeading)}
                    {productOptions.map(renderOption)}
                  </div>
                )}
                {moduleOptions.length > 0 && (
                  <div role="group" aria-labelledby={`${uid}-h-modules`}>
                    {heading(`${uid}-h-modules`, COPY.modulesHeading)}
                    {moduleOptions.map(renderOption)}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-3 py-5 text-center">
                <p className="break-words text-[13px] font-medium text-ink">{COPY.noResults(settled.trim())}</p>
                <p className="mt-1 text-[12px] leading-snug text-muted">{COPY.hint(examples)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
