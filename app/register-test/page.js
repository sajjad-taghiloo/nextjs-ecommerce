"use client";

import { useState } from "react";

export default function RegisterTestPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Ali Test",
          email: "ali-test-3@example.com",
          password: "temporary-password",
        }),
      });

      const data = await response.json();

      setResult({
        status: response.status,
        data,
      });
    } catch (error) {
      console.error(error);

      setResult({
        status: "NETWORK ERROR",
        data: {
          success: false,
          error: "Could not connect to server",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-5 text-2xl font-bold">
        Register API Test
      </h1>

      <button
        type="button"
        onClick={handleRegister}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Registering..." : "Test Register"}
      </button>

      {result && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">
            API Response
          </h2>

          <p className="mb-3">
            Status:{" "}
            <strong>{result.status}</strong>
          </p>

          <pre className="rounded-lg bg-zinc-100 p-5 text-sm">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}