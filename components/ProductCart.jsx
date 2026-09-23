import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-zinc-50 p-8">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-10 transition duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
          ⭐ {product.rating.rate}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {product.category}
        </p>

        <Link
  href={`/product/${product.id}`}
  className="block"
>
  <h2 className="line-clamp-2 min-h-[3.5rem] text-base font-semibold leading-7 text-zinc-900 transition-colors group-hover:text-zinc-600">
    {product.title}
  </h2>
</Link>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-400">
              Price
            </p>

            <p className="mt-1 text-xl font-bold text-zinc-900">
              ${product.price}
            </p>
          </div>

          <span className="text-xs text-zinc-400">
            {product.rating.count} reviews
          </span>
        </div>

        {/* Action */}
            <AddToCartButton product={product} />
      </div>
    </article>
  );
}