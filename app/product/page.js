import { getProducts } from "@/lib/api/products";

import ProductCard from "../../components/ProductCart";
import ProductFilters from "../../components/ProductFilters";

export default async function ProductPage({ searchParams }) {
  const products = await getProducts();
  const categories = [
  ...new Set(products.map((product) => product.category))
];

  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";

 const filteredProducts = products.filter((product) => {
  const title = product.title.toLowerCase();
  const productCategory = product.category.toLowerCase();
  const searchValue = search.toLowerCase();
  const categoryValue = category.toLowerCase();

  const matchesSearch =
    title.includes(searchValue) ||
    productCategory.includes(searchValue);

  const matchesCategory =
    !categoryValue ||
    productCategory === categoryValue;

  return matchesSearch && matchesCategory;
});

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero */}
    

      {/* Products Section */}
      <section className="bg-[#0d0d0d]">

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">

          {/* Section Header */}
          <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Explore
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                Our Products
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-5 text-zinc-500 md:text-right">
              Find something that fits your style and discover
              products selected with attention to detail.
            </p>

          </div>

          {/* Search */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">

            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
                <span className="text-sm text-amber-400">
                  ⌕
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Find your product
                </p>

                <p className="text-[11px] text-zinc-500">
                  Search through our collection
                </p>
              </div>
            </div>

            <ProductFilters categories={categories} />

          </div>

          {/* Products Grid */}
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>

      </section>

    </main>
  );
}