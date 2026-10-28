/** All copy and limits for the rail search. Components read from here; nothing is hard-coded in them. */
export const RAIL_SEARCH = {
  /** Small title above the product switcher; also its accessible label. */
  productLabel: "Pick a product to learn",
  placeholder: "Search products, modules",
  label: "Search products and modules",
  clear: "Clear search",
  /** Tooltip and label of the search icon shown in the frame while the step list is collapsed. */
  open: "Search products and modules",
  productsHeading: "Products",
  modulesHeading: "Modules",
  maxProducts: 6,
  maxModules: 10,
  debounceMs: 60,
  /** Last line of a module result, for example "Snaarp Doc · eSignature · Step 41". The group is left out when a tutorial has none. */
  moduleMeta: (m: { product: string; group?: string; step: number }) =>
    [m.product, m.group, `Step ${m.step}`].filter(Boolean).join(" · "),
  showMore: (hidden: number) => `Show ${hidden} more`,
  noResults: (query: string) => `No results for \u201c${query}\u201d`,
  hint: (examples: string[]) => `Try a product name, like ${examples.join(" or ")}.`,
  /** Read out by screen readers each time the results change. */
  announce: (products: number, modules: number) => {
    if (products + modules === 0) return "No results";
    const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? "" : "s"}`;
    return `${plural(products, "product")} and ${plural(modules, "module")} found`;
  },
} as const;
