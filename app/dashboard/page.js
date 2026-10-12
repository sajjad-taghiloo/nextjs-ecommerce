
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm text-amber-600">
          MY ACCOUNT
        </p>

        <h1 className="text-3xl font-bold text-zinc-950">
          داشبورد کاربری
        </h1>

        <p className="mt-3 text-zinc-600">
          به حساب کاربری خود خوش آمدی، {user.name}.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-zinc-950">
          اطلاعات حساب
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-zinc-500">نام</p>
            <p className="mt-1 font-medium text-zinc-900">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">ایمیل</p>
            <p className="mt-1 font-medium text-zinc-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">نوع حساب</p>
            <p className="mt-1 font-medium text-zinc-900">
              {user.role}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
