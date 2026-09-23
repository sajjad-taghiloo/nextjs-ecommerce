"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Something went wrong
      </h1>

      <p className="mt-3 text-gray-500">
        We couldn't load the products.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded bg-black px-5 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}