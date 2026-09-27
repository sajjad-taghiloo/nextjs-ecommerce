import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#080808] text-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-zinc-900">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">

          {/* Hero Content */}

          <div className="relative z-10">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              New Collection
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Designed for
              <span className="block text-zinc-500">
                those who
              </span>
              <span className="block text-amber-400">
                value more.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Discover a carefully selected collection of products
              designed around quality, simplicity and a modern lifestyle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Explore Collection
                <span className="ml-3 text-lg">→</span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-zinc-800 px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
              >
                Our Story
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-zinc-900 pt-8">

              <div>
                <p className="text-2xl font-semibold">500+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold">4.9/5</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  Customer Rating
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                  Support
                </p>
              </div>

            </div>
          </div>

          {/* Hero Visual */}

          <div className="relative hidden lg:block">

            <div className="relative mx-auto aspect-square max-w-[520px]">

              <div className="absolute inset-10 rounded-full border border-zinc-800" />

              <div className="absolute inset-20 rounded-full border border-zinc-900" />

              <div className="absolute inset-32 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-950 to-black shadow-[0_0_100px_rgba(245,158,11,0.12)]" />

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="text-center">

                  <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                    Curated
                  </p>

                  <p className="mt-3 text-5xl font-light tracking-tight">
                    ESSENTIAL
                  </p>

                  <p className="mt-2 text-sm text-amber-400">
                    Premium Collection
                  </p>

                </div>

              </div>

              {/* Floating Cards */}

              <div className="absolute left-0 top-1/4 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-5 py-4 shadow-2xl backdrop-blur">
                <p className="text-xs text-zinc-500">
                  Quality
                </p>
                <p className="mt-1 text-sm font-medium">
                  Carefully Selected
                </p>
              </div>

              <div className="absolute bottom-1/4 right-0 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-5 py-4 shadow-2xl backdrop-blur">
                <p className="text-xs text-zinc-500">
                  Experience
                </p>
                <p className="mt-1 text-sm font-medium">
                  Made Simple
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= TRUST BAR ================= */}

      <section className="border-b border-zinc-900 bg-zinc-950">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-900 sm:grid-cols-4">

          <div className="px-6 py-8 text-center">
            <p className="text-sm font-medium">
              Premium Quality
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Selected products
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-sm font-medium">
              Secure Payment
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Safe & protected
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-sm font-medium">
              Fast Delivery
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Delivered with care
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-sm font-medium">
              Easy Returns
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Simple & transparent
            </p>
          </div>

        </div>
      </section>


      {/* ================= FEATURED ================= */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Discover
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore our collection
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
              Everything you need, carefully selected and presented
              with a focus on quality and simplicity.
            </p>
          </div>

          <Link
            href="/product"
            className="text-sm text-zinc-300 underline underline-offset-8 transition hover:text-amber-400"
          >
            View all products →
          </Link>

        </div>


        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Card 1 */}

          <Link
            href="/product"
            className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition duration-500 hover:-translate-y-1 hover:border-zinc-700"
          >
            <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950">

              <div className="text-center transition duration-500 group-hover:scale-110">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Category
                </p>

                <p className="mt-3 text-3xl font-light">
                  Electronics
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-lg font-medium">
                  Modern Technology
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Explore collection
                </p>
              </div>

              <span className="text-xl text-zinc-500 transition group-hover:text-amber-400">
                →
              </span>

            </div>
          </Link>


          {/* Card 2 */}

          <Link
            href="/product"
            className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition duration-500 hover:-translate-y-1 hover:border-zinc-700"
          >

            <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-950/40 to-zinc-950">

              <div className="text-center transition duration-500 group-hover:scale-110">

                <p className="text-xs uppercase tracking-[0.3em] text-amber-500/70">
                  Category
                </p>

                <p className="mt-3 text-3xl font-light">
                  Lifestyle
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-lg font-medium">
                  Everyday Essentials
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Explore collection
                </p>
              </div>

              <span className="text-xl text-zinc-500 transition group-hover:text-amber-400">
                →
              </span>

            </div>

          </Link>


          {/* Card 3 */}

          <Link
            href="/product"
            className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 p-8 transition duration-500 hover:-translate-y-1 hover:border-zinc-700"
          >

            <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">

              <div className="text-center transition duration-500 group-hover:scale-110">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Category
                </p>

                <p className="mt-3 text-3xl font-light">
                  Essentials
                </p>

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-lg font-medium">
                  Curated Selection
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Explore collection
                </p>
              </div>

              <span className="text-xl text-zinc-500 transition group-hover:text-amber-400">
                →
              </span>

            </div>

          </Link>

        </div>
      </section>


      {/* ================= STORY ================= */}

      <section className="border-y border-zinc-900 bg-zinc-950">

        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Our Philosophy
            </p>

            <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-tight">
              Less noise.
              <br />
              More of what matters.
            </h2>

          </div>

          <div className="max-w-xl">

            <p className="text-lg leading-8 text-zinc-400">
              We believe great products don't need to be complicated.
              That's why our collection focuses on thoughtful design,
              reliable quality and an experience that feels effortless.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-sm font-medium text-white transition hover:text-amber-400"
            >
              Learn more about us
              <span className="ml-3">→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 px-8 py-16 text-center sm:px-16">

          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Start Exploring
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Find something you'll love.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500">
              Explore our collection and discover products
              selected for quality, design and everyday value.
            </p>

            <Link
              href="/product"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Shop Now
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}