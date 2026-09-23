"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function ProductQuantitySelector({ product }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      currentQuantity + 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="mt-8 max-w-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-xl border border-zinc-200 bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="flex h-12 w-12 items-center justify-center text-xl text-zinc-600 transition hover:bg-zinc-100"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="flex h-12 min-w-14 items-center justify-center border-x border-zinc-200 text-sm font-semibold text-zinc-900">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="flex h-12 w-12 items-center justify-center text-xl text-zinc-600 transition hover:bg-zinc-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-[0.98]"
      >
        Add {quantity} to Cart
      </button>
    </div>
  );
}