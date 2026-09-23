import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductById } from "@/lib/api/products";
import ProductQuantitySelector from "@/components/ProductQuantitySelector";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    if (!product?.id) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-zinc-50">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/product"
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
          >
            ← Back to Products
          </Link>

          <div className="mt-8 grid gap-12 rounded-3xl border border-zinc-200 bg-white p-8 lg:grid-cols-2 lg:p-12">
            <div className="relative flex min-h-[450px] items-center justify-center overflow-hidden rounded-2xl bg-zinc-50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-16"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                {product.category}
              </p>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
                {product.title}
              </h1>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-sm text-zinc-500">
                  ⭐ {product.rating.rate}
                </span>

                <span className="text-sm text-zinc-400">
                  {product.rating.count} reviews
                </span>
              </div>

              <p className="mt-8 text-3xl font-bold text-zinc-900">
                ${product.price.toFixed(2)}
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                {product.description}
              </p>

              <ProductQuantitySelector product={product} />
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    notFound();
  }
}