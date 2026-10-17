
"use client";

import { useState } from "react";

export default function ProfileForm({ user }) {
  const [name, setName] = useState(user.name ?? "");
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({ type: "", message: "" });

    const cleanName = name.trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
      setStatus({
        type: "error",
        message: "نام باید بین ۲ تا ۱۰۰ کاراکتر باشد.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: cleanName }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus({
          type: "error",
          message:
            response.status === 401
              ? "نشست شما منقضی شده است؛ دوباره وارد شوید."
              : data.error || "ذخیره اطلاعات ناموفق بود.",
        });
        return;
      }

      setName(data.user.name);

      setStatus({
        type: "success",
        message: "نام شما با موفقیت ذخیره شد.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#283650] bg-[#0B1426] shadow-xl shadow-black/10"
      dir="rtl"
    >
      <div className="border-b border-[#26334A] px-5 py-5 sm:px-7">
        <h2 className="text-lg font-bold text-[#F0F2F7]">
          ویرایش اطلاعات حساب
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#8996AC]">
          در این بخش می‌توانی نام نمایشی حساب خود را تغییر بدهی.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
        <div className="space-y-2">
          <label
            htmlFor="profile-name"
            className="block text-sm font-medium text-[#C4CCDA]"
          >
            نام و نام خانوادگی
          </label>

          <input
            id="profile-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-[#30415F] bg-[#080F20] px-4 py-3 text-sm text-[#E7EAF1] outline-none transition placeholder:text-[#64718A] focus:border-[#C6A45B] focus:ring-2 focus:ring-[#C6A45B]/15 disabled:opacity-60"
            placeholder="نام خود را وارد کن"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#8996AC]">
            آدرس ایمیل
          </label>
          <div
            dir="ltr"
            className="rounded-xl border border-[#263650] bg-[#101A2D] px-4 py-3 text-left text-sm text-[#8996AC]"
          >
            {user.email}
          </div>
          <p className="text-xs text-[#718098]">
            تغییر ایمیل در این بخش امکان‌پذیر نیست.
          </p>
        </div>

        {status.message && (
          <p
            role="status"
            aria-live="polite"
            className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
              status.type === "success"
                ? "border-emerald-800 bg-emerald-950/40 text-emerald-300"
                : "border-red-900 bg-red-950/40 text-red-300"
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || name.trim() === user.name}
            className="inline-flex items-center justify-center rounded-xl bg-[#C6A45B] px-5 py-3 text-sm font-bold text-[#080F20] transition hover:bg-[#D9BC78] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              setName(user.name ?? "");
              setStatus({ type: "", message: "" });
            }}
            className="rounded-xl border border-[#30415F] px-5 py-3 text-sm font-medium text-[#C4CCDA] transition hover:bg-[#17243A] disabled:opacity-50"
          >
            بازگردانی
          </button>
        </div>
      </form>
    </section>
  );
}
