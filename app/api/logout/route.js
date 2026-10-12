
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get("session_token")?.value;

    if (sessionToken) {
      await pool.query(
        `
        DELETE FROM sessions
        WHERE token = $1
        `,
        [sessionToken]
      );
    }

    cookieStore.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return Response.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return Response.json(
      {
        success: false,
        error: "Logout failed",
      },
      { status: 500 }
    );
  }
}
