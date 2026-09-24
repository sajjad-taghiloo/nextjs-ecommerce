"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters({ categories }) {

  const router = useRouter();

  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {

    const timeout = setTimeout(() => {

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`/product?${params.toString()}`);

    }, 300);

    return () => clearTimeout(timeout);

  }, [search]);


  function handleCategoryChange(category) {
  const params = new URLSearchParams(
    searchParams.toString()
  );

  if (category) {
    params.set("category", category);
  } else {
    params.delete("category");
  }

  router.replace(`/product?${params.toString()}`);
}

  return (

    <div className="space-y-6">

      {/* Search */}

      <div className="max-w-xl">

        <label
          htmlFor="product-search"
          className="mb-2 block text-sm font-medium text-zinc-700"
        >
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-zinc-400"
        />

      </div>


      {/* Categories */}

      <div>

        <p className="mb-3 text-sm font-medium text-zinc-700">
          Categories
        </p>

        <div className="flex flex-wrap gap-2">

         <button
            type="button"
            onClick={() => handleCategoryChange("")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            !currentCategory
            ? "bg-zinc-900 text-white"
            : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
>
  All
</button>

          {categories.map((category) => (

           <button
  key={category}
  type="button"
  onClick={() => handleCategoryChange(category)}
  className={`rounded-full px-4 py-2 text-sm transition ${
    currentCategory === category
      ? "bg-amber-800 font-medium text-white"
      : "border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50"
  }`}
>
  {category}
</button>

          ))}

        </div>

      </div>

    </div>

  );
}