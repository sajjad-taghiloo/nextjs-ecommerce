"use client";

import Link from "next/link";

export default function CartSummary({
  totalQuantity,
  subtotal,
}) {
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-zinc-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Items
          </span>

          <span className="font-medium text-zinc-900">
            {totalQuantity}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Subtotal
          </span>

          <span className="font-medium text-zinc-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">
            Shipping
          </span>

          <span className="font-medium text-zinc-900">
            Free
          </span>
        </div>

        <div className="border-t border-zinc-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-900">
              Total
            </span>

            <span className="text-xl font-bold text-zinc-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-xl bg-zinc-900 py-3 text-center text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}