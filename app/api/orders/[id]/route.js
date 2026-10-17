import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "لطفاً وارد حساب کاربری شوید." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const orderId = Number(id);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        { success: false, message: "شناسه سفارش نامعتبر است." },
        { status: 400 }
      );
    }

    const orderResult = await pool.query(
      `SELECT id, user_id, total_amount, status, created_at, updated_at
       FROM orders
       WHERE id = $1 AND user_id = $2
       LIMIT 1`,
      [orderId, user.id]
    );

    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    const order = orderResult.rows[0];

    const itemsResult = await pool.query(
      `SELECT
         id,
         product_id AS "productId",
         product_title AS title,
         product_price AS price,
         quantity,
         product_image AS image,
         created_at AS "createdAt"
       FROM order_items
       WHERE order_id = $1
       ORDER BY id ASC`,
      [orderId]
    );

    return NextResponse.json({
      success: true,
      order: {
        id: String(order.id),
        totalAmount: order.total_amount,
        status: order.status,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        items: itemsResult.rows,
      },
    });
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "خطا در دریافت سفارش." },
      { status: 500 }
    );
  }
}