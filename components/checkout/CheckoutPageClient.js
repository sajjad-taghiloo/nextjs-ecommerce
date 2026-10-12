
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPageClient({ user }) {
  const items = useCartStore((state) => state.items);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  if (!hasHydrated) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-zinc-500">
            Loading your order...
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-16">
        <section className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-zinc-500">
            Add products before proceeding to checkout.
          </p>

          <Link
            href="/product"
            className="mt-6 inline-block rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Review Your Order
        </h1>

        <p className="mt-2 text-zinc-500">
          Check your details and products before continuing.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold">
                Customer Information
              </h2>

              <p className="mt-4">{user.name}</p>
              <p className="mt-1 text-sm text-zinc-500">
                {user.email}
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold">
                Order Items ({totalQuantity})
              </h2>

              <div className="mt-5 divide-y divide-zinc-200">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-medium">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/cart"
                className="mt-4 inline-block text-sm text-zinc-600 underline underline-offset-4 hover:text-black"
              >
                Edit Cart
              </Link>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">
                  Items ({totalQuantity})
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-zinc-500">
                  Shipping
                </span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-zinc-200 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-xl bg-zinc-300 py-3 text-sm font-semibold text-zinc-600"
            >
              Payment Coming Soon
            </button>

            <p className="mt-3 text-xs leading-5 text-zinc-500">
              Payment and order creation are not implemented yet.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
