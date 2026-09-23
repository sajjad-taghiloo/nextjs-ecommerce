"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const itemTotal = item.price * item.quantity;

  return (
    <article className="flex gap-5 border-b border-zinc-200 py-6">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="112px"
          className="object-contain p-4"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {item.category}
          </p>

          <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-zinc-900">
            {item.title}
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center rounded-lg border border-zinc-200">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-9 w-9 items-center justify-center text-lg text-zinc-600 transition hover:bg-zinc-100"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              −
            </button>

            <span className="flex h-9 min-w-10 items-center justify-center border-x border-zinc-200 text-sm font-medium">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="flex h-9 w-9 items-center justify-center text-lg text-zinc-600 transition hover:bg-zinc-100"
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-xs font-medium text-red-500 transition hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-zinc-400">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>

        <p className="mt-1 text-lg font-bold text-zinc-900">
          ${itemTotal.toFixed(2)}
        </p>
      </div>
    </article>
  );
}