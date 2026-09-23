import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-50 px-6">
      <section className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
          Product Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-zinc-500">
          The product you are looking for does not exist or is no longer
          available.
        </p>

        <Link
          href="/product"
          className="mt-8 inline-block rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Back to Products
        </Link>
      </section>
    </main>
  );
}