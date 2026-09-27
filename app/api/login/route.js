import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    console.log("LOGIN BODY:", {
      email,
      hasPassword: !!password,
    });

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    console.log("CLEAN EMAIL:", cleanEmail);

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        role
      FROM users
      WHERE email = $1
      `,
      [cleanEmail]
    );

    console.log(
      "USER FOUND:",
      result.rows.length
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    console.log("USER:", {
      id: user.id,
      email: user.email,
      role: user.role,
      hasPasswordHash: !!user.password_hash,
    });

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log(
      "PASSWORD VALID:",
      passwordIsValid
    );

    if (!passwordIsValid) {
      return Response.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const sessionToken =
      crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    console.log("CREATING SESSION...");

    await pool.query(
      `
      INSERT INTO sessions (
        user_id,
        token,
        expires_at
      )
      VALUES ($1, $2, $3)
      `,
      [
        user.id,
        sessionToken,
        expiresAt,
      ]
    );

    console.log("SESSION CREATED");

    const cookieStore = await cookies();

    cookieStore.set(
      "session_token",
      sessionToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      }
    );

    console.log("COOKIE CREATED");

    return Response.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json(
      {
        success: false,
        error: "Login failed",
      },
      { status: 500 }
    );
  }
}