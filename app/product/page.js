import { getProducts } from "@/lib/api/products";
import ProductCard from "../../components/ProductCart";

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Our collection
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
            Products
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500">
            Explore our collection of carefully selected products.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}