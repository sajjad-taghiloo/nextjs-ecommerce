import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    // دریافت اطلاعات از Client
    const body = await request.json();

    const {
      name,
      email,
      password,
    } = body;

    // -----------------------------
    // Required fields
    // -----------------------------

    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          error: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Clean data
    // -----------------------------

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // -----------------------------
    // Name validation
    // -----------------------------

    if (cleanName.length < 2) {
      return Response.json(
        {
          success: false,
          error: "Name must be at least 2 characters",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Email validation
    // -----------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Password validation
    // -----------------------------

    if (password.length < 8) {
      return Response.json(
        {
          success: false,
          error: "Password must be at least 8 characters",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Check existing user
    // -----------------------------

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [cleanEmail]
    );

    if (existingUser.rows.length > 0) {
      return Response.json(
        {
          success: false,
          error: "Email is already registered",
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    // -----------------------------
    // Create user
    // -----------------------------

    try {
      const result = await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password_hash
        )
        VALUES ($1, $2, $3)
        RETURNING
          id,
          name,
          email,
          role,
          created_at
        `,
        [
          cleanName,
          cleanEmail,
          passwordHash,
        ]
      );

      return Response.json(
        {
          success: true,
          user: result.rows[0],
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      // PostgreSQL UNIQUE violation
      if (error.code === "23505") {
        return Response.json(
          {
            success: false,
            error: "Email is already registered",
          },
          {
            status: 409,
          }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}