
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <main className="relative isolate min-h-[80vh] flex-1 overflow-hidden bg-[#070D19] text-[#E7EAF1]">
      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#142544]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-96 -z-10 h-[400px] w-[400px] rounded-full bg-[#C6A45B]/[0.035] blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        <header className="relative mb-7 overflow-hidden rounded-2xl border border-[#2B3A56] bg-gradient-to-l from-[#0C162A] via-[#101D35] to-[#172744] px-6 py-7 shadow-xl shadow-black/10 sm:px-9 sm:py-9">
          <div className="pointer-events-none absolute -left-10 -top-20 h-64 w-64 rounded-full border border-[#D9BC78]/10" />
          <div className="pointer-events-none absolute -left-1 -top-10 h-44 w-44 rounded-full border border-[#D9BC78]/10" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#D9BC78]" />
                <p className="text-[10px] font-semibold tracking-[0.3em] text-[#D9BC78]">
                  MY ACCOUNT
                </p>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                فضای کاربری شما
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#A4B0C4]">
                حساب، سفارش‌ها و اطلاعات شخصی خود را در یک مکان مدیریت کن.
              </p>
            </div>

            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#C6A45B]/25 bg-[#C6A45B]/[0.07] text-[#D9BC78] sm:flex">
              <IconPlaceholder />
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          <DashboardSidebar />

          <section className="min-w-0 flex-1">
            {children}
          </section>
        </div>

        <div className="mt-9 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#C6A45B]/30" />
          <p className="text-[9px] font-medium tracking-[0.22em] text-[#56647B]">
            YOUR ACCOUNT · YOUR EXPERIENCE
          </p>
          <span className="h-px w-8 bg-[#C6A45B]/30" />
        </div>
      </div>
    </main>
  );
}

function IconPlaceholder() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20v-1.5a7 7 0 0 1 14 0V20" />
    </svg>
  );
}
