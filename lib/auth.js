import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return null;
    }

    const result = await pool.query(
      `
      SELECT
        users.id,
        users.name,
        users.email,
        users.role
      FROM sessions
      INNER JOIN users
        ON sessions.user_id = users.id
      WHERE sessions.token = $1
        AND sessions.expires_at > NOW()
      `,
      [sessionToken]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
}



export async function requireApiUser() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        user: null,
        response: Response.json(
          {
            success: false,
            error: "Authentication required",
          },
          { status: 401 }
        ),
      };
    }

    return {
      user,
      response: null,
    };
  } catch (error) {
    console.error("API authentication error:", error);

    return {
      user: null,
      response: Response.json(
        {
          success: false,
          error: "Internal server error",
        },
        { status: 500 }
      ),
    };
  }
}
