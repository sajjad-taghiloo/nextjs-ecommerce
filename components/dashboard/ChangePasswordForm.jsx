
"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (newPassword.length < 8 || newPassword.length > 72) {
      setStatus({
        type: "error",
        message: "رمز جدید باید بین ۸ تا ۷۲ کاراکتر باشد.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({
        type: "error",
        message: "تکرار رمز جدید با رمز واردشده مطابقت ندارد.",
      });
      return;
    }

    if (currentPassword === newPassword) {
      setStatus({
        type: "error",
        message: "رمز جدید باید با رمز فعلی متفاوت باشد.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus({
          type: "error",
          message:
            response.status === 401
              ? "نشست شما منقضی شده است؛ دوباره وارد شوید."
              : response.status === 400 &&
                  data.error === "Current password is incorrect"
                ? "رمز فعلی اشتباه است."
                : data.error || "تغییر رمز عبور ناموفق بود.",
        });
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setStatus({
        type: "success",
        message: "رمز عبور با موفقیت تغییر کرد.",
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

  const inputClass =
    "w-full rounded-xl border border-[#30415F] bg-[#080F20] px-4 py-3 text-sm text-[#E7EAF1] outline-none transition placeholder:text-[#64718A] focus:border-[#C6A45B] focus:ring-2 focus:ring-[#C6A45B]/15 disabled:opacity-60";

  return (
    <section
      dir="rtl"
      className="overflow-hidden rounded-2xl border border-[#283650] bg-[#0B1426] shadow-xl shadow-black/10"
    >
      <div className="border-b border-[#26334A] px-5 py-5 sm:px-7">
        <h2 className="text-lg font-bold text-[#F0F2F7]">
          تغییر رمز عبور
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#8996AC]">
          برای امنیت حساب، ابتدا رمز فعلی و سپس رمز جدید را وارد کن.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
        <div className="space-y-2">
          <label
            htmlFor="current-password"
            className="block text-sm font-medium text-[#C4CCDA]"
          >
            رمز عبور فعلی
          </label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="رمز فعلی را وارد کن"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-[#C4CCDA]"
          >
            رمز عبور جدید
          </label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="حداقل ۸ کاراکتر"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-[#C4CCDA]"
          >
            تکرار رمز عبور جدید
          </label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="رمز جدید را دوباره وارد کن"
          />
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

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          }
          className="inline-flex items-center justify-center rounded-xl bg-[#C6A45B] px-5 py-3 text-sm font-bold text-[#080F20] transition hover:bg-[#D9BC78] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "در حال ذخیره..." : "تغییر رمز عبور"}
        </button>
      </form>
    </section>
  );
}
