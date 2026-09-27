"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------
  // Handle input changes
  // --------------------------------

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear field validation error
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    // Clear server error
    setServerErrors((previous) => ({
      ...previous,
      [name]: "",
      general: "",
    }));

    setSuccess("");
  }

  // --------------------------------
  // Client validation
  // --------------------------------

  function validateForm() {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Name
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must be at least 2 characters";
    }

    // Email
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email =
          "Please enter a valid email address";
      }
    }

    // Password
    if (!password) {
      newErrors.password =
        "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    return newErrors;
  }

  // --------------------------------
  // Submit
  // --------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setServerErrors({});
    setSuccess("");

    // Client validation
    const validationErrors =
      validateForm();

    setErrors(validationErrors);

    // Stop request if validation fails
    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      // -----------------------------
      // Server error
      // -----------------------------

      if (!response.ok) {
        if (response.status === 409) {
          setServerErrors({
            email:
              "Email is already registered",
          });

          return;
        }

        setServerErrors({
          general:
            data.error ||
            "Registration failed",
        });

        return;
      }

      // -----------------------------
      // Success
      // -----------------------------

      setSuccess(
        "Account created successfully!"
      );

      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error(error);

      setServerErrors({
        general:
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-16 text-white">
      <div className="mx-auto max-w-md">

        {/* Header */}

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-400">
            Create account
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Sign up to continue shopping with us.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
        >

          {/* Name */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

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

            {serverErrors.email && (
              <p className="mt-2 text-sm text-red-400">
                {serverErrors.email}
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
              placeholder="At least 8 characters"
              autoComplete="new-password"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* General Error */}

          {serverErrors.general && (
            <div className="rounded-xl border border-red-900 bg-red-950/30 px-4 py-3">
              <p className="text-sm text-red-400">
                {serverErrors.general}
              </p>
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="rounded-xl border border-green-900 bg-green-950/30 px-4 py-3">
              <p className="text-sm text-green-400">
                {success}
              </p>
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

          {/* Login */}

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}