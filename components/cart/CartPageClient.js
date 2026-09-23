"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPageClient() {
  const items = useCartStore((state) => state.items);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-zinc-50">
        <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="text-6xl">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-zinc-500">
            You haven't added any products to your cart yet.
          </p>

          <Link
            href="/product"
            className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Shopping Cart
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
            Your Cart
          </h1>

          <p className="mt-3 text-zinc-500">
            {totalQuantity}{" "}
            {totalQuantity === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-zinc-200 bg-white px-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          <CartSummary
            totalQuantity={totalQuantity}
            subtotal={subtotal}
          />
        </div>
      </section>
    </main>
  );
}