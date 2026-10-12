
import Link from "next/link";
import CartButton from "./CartButton";
import LogoutButton from "./LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-950"
        >
          My Store
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm text-zinc-600 transition hover:text-zinc-950"
            >
              Home
            </Link>

            <Link
              href="/product"
              className="text-sm text-zinc-600 transition hover:text-zinc-950"
            >
              Products
            </Link>

            <Link
              href="/about"
              className="text-sm text-zinc-600 transition hover:text-zinc-950"
            >
              About
            </Link>

            <Link
              href="/contactus"
              className="text-sm text-zinc-600 transition hover:text-zinc-950"
            >
              Contact
            </Link>
          </div>

          <CartButton />

         {user ? (
  <div className="flex items-center gap-4">
    <Link
      href="/dashboard"
      className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
    >
      داشبورد
    </Link>

    <span className="text-sm font-medium text-zinc-800">
      {user.name}
    </span>

    <LogoutButton />
  </div>
) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
              >
                ورود
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                ثبت‌نام
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
