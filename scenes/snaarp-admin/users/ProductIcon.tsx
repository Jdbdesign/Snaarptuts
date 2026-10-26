import { Icon, ProductLogo } from "@/components/icons";
import type { Product } from "../admin-data";

/** A product's logo, or a glyph on a lilac tile when it has no logo yet. */
export function ProductIcon({ product, size = 20 }: { product: Product; size?: number }) {
  if (product.logo) return <ProductLogo name={product.logo} size={size} className="shrink-0 rounded-[6px]" />;
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[6px] bg-[#EFE3FF] text-brand"
      style={{ width: size, height: size }}
    >
      <Icon name={product.icon ?? "layers"} size={Math.round(size * 0.65)} />
    </span>
  );
}
