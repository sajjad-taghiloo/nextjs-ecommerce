
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function PATCH(request) {
  try {
    // 1. بررسی ورود کاربر
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. خواندن اطلاعات ارسالی
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = body;

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      !currentPassword ||
      !newPassword
    ) {
      return Response.json(
        { success: false, error: "Both passwords are required" },
        { status: 400 }
      );
    }

    // 3. بررسی اعتبار رمز جدید
    if (newPassword.length < 8 || newPassword.length > 72) {
      return Response.json(
        {
          success: false,
          error: "New password must be between 8 and 72 characters",
        },
        { status: 400 }
      );
    }

    // 4. دریافت هش فعلی رمز از دیتابیس
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [user.id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

   
const newPasswordHash = await bcrypt.hash(newPassword, 10);

const client = await pool.connect();

try {
  await client.query("BEGIN");

  // ذخیره هش رمز جدید
  await client.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2",
    [newPasswordHash, user.id]
  );

  // باطل کردن تمام نشست‌های کاربر
  await client.query(
    "DELETE FROM sessions WHERE user_id = $1",
    [user.id]
  );

  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
}

// پاک کردن کوکی نشست فعلی
const cookieStore = await cookies();

cookieStore.set("session_token", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  expires: new Date(0),
});

return Response.json({
  success: true,
  message: "Password changed successfully",
});

  } catch (error) {
    console.error("Change password error:", error);

    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
