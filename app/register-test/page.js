"use client";

export default function RegisterTestPage() {
  async function handleRegister() {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ali Test",
        email: "ali-test-2@example.com",
        password: "temporary-password",
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <main className="p-10">
      <h1 className="mb-5 text-2xl font-bold">
        Register API Test
      </h1>

      <button
        onClick={handleRegister}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Test Register
      </button>
    </main>
  );
}