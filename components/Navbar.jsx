import Link from "next/link";
import CartButton from "./CartButton";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}



     