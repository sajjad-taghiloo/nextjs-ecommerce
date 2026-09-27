import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    // دریافت اطلاعات ارسال‌شده از Client
    const body = await request.json();

    // استخراج اطلاعات کاربر
    const { name, email, password } = body;

    // Hash کردن Password
    const passwordHash = await bcrypt.hash(password, 10);

    // ذخیره کاربر در Database
    const result = await pool.query(
      `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, role, created_at
      `,
      [name, email, passwordHash]
    );

    // ارسال نتیجه به Client
    return Response.json(
      {
        success: true,
        user: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Registration failed",
      },
      { status: 500 }
    );
  }
}