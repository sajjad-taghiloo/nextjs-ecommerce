
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ProfileForm from "@/components/dashboard/ProfileForm";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const details = [
    { label: "نام کاربر", value: user.name },
    { label: "آدرس ایمیل", value: user.email },
    { label: "نوع حساب", value: user.role },
  ];

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border border-[#283650] bg-[#0B1426] shadow-xl shadow-black/10">
        <div className="flex items-center gap-4 border-b border-[#26334A] px-5 py-5 sm:px-7">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C6A45B]/25 bg-[#C6A45B]/[0.08] text-[#D9BC78]">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20v-1.5a7 7 0 0 1 14 0V20" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#F0F2F7]">
              اطلاعات حساب
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#8592A8]">
              اطلاعات پایه حساب کاربری شما
            </p>
          </div>
        </div>

        <ProfileForm user={user} />
        <ChangePasswordForm />

        <div className="grid gap-px bg-[#26334A] sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="min-w-0 bg-[#0B1426] px-5 py-5 sm:px-7"
            >
              <p className="text-xs font-medium text-[#8996AC]">
                {item.label}
              </p>
              <p className="mt-2 break-words text-sm font-semibold text-[#E7EAF1]">
                {item.value}
              </p>
            </div>
          ))}

          <div className="bg-[#0B1426] px-5 py-5 sm:col-span-2 sm:px-7">
            <p className="text-xs font-medium text-[#8996AC]">
              وضعیت حساب
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C6A45B]/25 bg-[#C6A45B]/[0.07] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9BC78]" />
              <span className="text-xs font-semibold text-[#D9BC78]">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-[#263650] bg-gradient-to-l from-[#101C32] to-[#0B1426] p-5 sm:p-6">
        <div className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-[#C6A45B]/[0.045] blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C6A45B]/20 bg-[#C6A45B]/[0.07] text-[#D9BC78]">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
            </svg>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#E5C77F]">
              فضای اختصاصی شما
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#9BA8BD]">
              در ادامه، تاریخچه سفارش‌ها، مجموع خریدها و ابزارهای مدیریت حساب را به این داشبورد اضافه خواهیم کرد.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
