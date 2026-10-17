
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function PATCH(request) {
  try {
    // 1. Identify the authenticated user from the session
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    // 2. Read request body
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "Invalid request body",
        },
        { status: 400 }
      );
    }

    // 3. Validate and clean the name
    if (typeof body.name !== "string") {
      return Response.json(
        {
          success: false,
          error: "Name must be a string",
        },
        { status: 400 }
      );
    }

    const name = body.name.trim();

    if (name.length < 2 || name.length > 100) {
      return Response.json(
        {
          success: false,
          error: "Name must be between 2 and 100 characters",
        },
        { status: 400 }
      );
    }

    // 4. Update only the authenticated user's name
    const result = await pool.query(
      `
      UPDATE users
      SET name = $1
      WHERE id = $2
      RETURNING id, name, email, role
      `,
      [name, user.id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // 5. Return updated public user data
    return Response.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return Response.json(
      {
        success: false,
        error: "Profile update failed",
      },
      { status: 500 }
    );
  }
}
