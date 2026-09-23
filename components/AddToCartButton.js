"use client";

import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="mt-5 w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-[0.98]"
    >
      Add to Cart
    </button>
  );
}