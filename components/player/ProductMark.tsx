import { Icon, ProductLogo } from "@/components/icons";
import type { Tutorial } from "@/tutorials/types";

export function ProductMark({ tutorial, size }: { tutorial: Tutorial; size: number }) {
  return tutorial.product.logo ? (
    <ProductLogo name={tutorial.product.logo} size={size} className="rounded-[9px]" />
  ) : (
    <span className="flex shrink-0 items-center justify-center text-brand" style={{ width: size, height: size }}>
      <Icon name="logoMark" size={size} />
    </span>
  );
}
