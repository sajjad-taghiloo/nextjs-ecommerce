
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "نمای کلی", href: "/dashboard", icon: "grid" },
  { label: "سفارش‌های من", href: "/dashboard/orders", icon: "package" },
  { label: "اطلاعات حساب", href: "/dashboard/profile", icon: "user" },
  { label: "آدرس‌های من", href: "/dashboard/addresses", icon: "map" },
  { label: "علاقه‌مندی‌ها", href: "/dashboard/wishlist", icon: "heart" },
];

function Icon({ name }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "grid":
      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "package":
      return <svg {...props}><path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z" /><path d="m3.5 8 8.5 5 8.5-5M12 13v8M7.5 5.5l9 5" /></svg>;
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="3.5" /><path d="M5 20v-1.5a7 7 0 0 1 14 0V20" /></svg>;
    case "map":
      return <svg {...props}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15m6-12v15" /></svg>;
    case "heart":
      return <svg {...props}><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" /></svg>;
    default:
      return null;
  }
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 overflow-hidden rounded-2xl border border-[#283650] bg-[#080F20] text-[#E8EAF0] shadow-2xl shadow-black/20 lg:sticky lg:top-6 lg:w-72">
      <div className="border-b border-[#283650] bg-gradient-to-br from-[#111D35] to-[#080F20] px-6 py-7">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C6A45B]/30 bg-[#C6A45B]/10 text-[#D9BC78]">
          <Icon name="user" />
        </div>

        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#D9BC78]">
          MY ACCOUNT
        </p>

        <h2 className="mt-2 text-xl font-bold text-white">
          حساب کاربری
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#8F9BB0]">
          مدیریت حساب و تجربه خرید شما
        </p>
      </div>

      <nav
        aria-label="منوی حساب کاربری"
        className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:gap-1.5 lg:p-4"
      >
        {links.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-all duration-200 ${
                active
                  ? "border-[#C6A45B]/25 bg-[#C6A45B]/10 font-semibold text-[#E5C77F]"
                  : "border-transparent text-[#A8B2C4] hover:border-[#293751] hover:bg-[#121D33] hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute bottom-2 right-0 top-2 w-[3px] rounded-l-full bg-[#D9BC78]" />
              )}

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-[#C6A45B]/10 text-[#E5C77F]"
                    : "bg-[#131E33] text-[#9BA9BE] group-hover:text-[#D9BC78]"
                }`}
              >
                <Icon name={link.icon} />
              </span>

              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden px-4 pb-4 lg:block">
        <div className="rounded-xl border border-[#26334B] bg-[#0D172A] p-4">
          <p className="text-xs font-semibold text-[#D9BC78]">
            فضای اختصاصی شما
          </p>
          <p className="mt-2 text-xs leading-6 text-[#8996AB]">
            حساب و خریدهای خود را در محیطی یکپارچه مدیریت کنید.
          </p>
        </div>
      </div>

      <div className="h-px bg-gradient-to-l from-transparent via-[#C6A45B]/40 to-transparent" />
    </aside>
  );
}
