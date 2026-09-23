"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartButton() {
  const items = useCartStore((state) => state.items);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
    >
      <span className="text-xl">🛒</span>

      <span>Cart</span>

      {totalQuantity > 0 && (
        <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}