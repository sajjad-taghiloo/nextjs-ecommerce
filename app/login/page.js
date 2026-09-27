"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  }

  function validateForm() {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email =
          "Please enter a valid email address";
      }
    }

    if (!password) {
      newErrors.password =
        "Password is required";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setServerError("");

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(
          data.error || "Login failed"
        );

        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      setServerError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-16 text-white">
      <div className="mx-auto max-w-md">

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-400">
            Welcome back
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Login to your account
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
        >

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Server Error */}

          {serverError && (
            <div className="rounded-xl border border-red-900 bg-red-950/30 px-4 py-3">
              <p className="text-sm text-red-400">
                {serverError}
              </p>
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}

          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}

            <Link
              href="/register"
              className="text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              Create account
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}