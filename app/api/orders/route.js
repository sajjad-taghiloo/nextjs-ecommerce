
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { getProductById } from "@/lib/api/products";

export async function POST(request) {
  try {
    // 1. احراز هویت کاربر
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

    // 2. خواندن و اعتبارسنجی بدنه درخواست
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

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      body.items.length > 50
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid order items",
        },
        { status: 400 }
      );
    }

    // 3. اعتبارسنجی شناسه و تعداد محصولات
    const quantities = new Map();

    for (const item of body.items) {
      if (
        !Number.isSafeInteger(item?.id) ||
        item.id <= 0 ||
        !Number.isSafeInteger(item?.quantity) ||
        item.quantity <= 0 ||
        item.quantity > 100
      ) {
        return Response.json(
          {
            success: false,
            error: "Invalid product ID or quantity",
          },
          { status: 400 }
        );
      }

      const newQuantity =
        (quantities.get(item.id) ?? 0) + item.quantity;

      if (newQuantity > 100) {
        return Response.json(
          {
            success: false,
            error: "Maximum quantity per product is 100",
          },
          { status: 400 }
        );
      }

      quantities.set(item.id, newQuantity);
    }

    // 4. دریافت اطلاعات معتبر محصولات از سرور
    const products = await Promise.all(
      [...quantities.entries()].map(async ([id, quantity]) => {
        const product = await getProductById(id);

        if (
          !product ||
          product.id !== id ||
          typeof product.title !== "string" ||
          typeof product.price !== "number" ||
          !Number.isFinite(product.price) ||
          product.price < 0
        ) {
          throw new Error("Invalid product data");
        }

        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image:
            typeof product.image === "string"
              ? product.image
              : null,
          quantity,
        };
      })
    );

    // 5. محاسبه مبلغ فقط با قیمت‌های دریافت‌شده از سرور
    const total = products.reduce(
      (sum, product) =>
        sum + Math.round(product.price * 100) * product.quantity,
      0
    );

    if (!Number.isSafeInteger(total)) {
      return Response.json(
        {
          success: false,
          error: "Order total is invalid",
        },
        { status: 400 }
      );
    }

    // 6. ثبت سفارش و اقلام آن در یک تراکنش
    const client = await pool.connect();

    let order;

    try {
      await client.query("BEGIN");

      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status)
         VALUES ($1, $2, 'pending')
         RETURNING id, total_amount, status, created_at`,
        [user.id, (total / 100).toFixed(2)]
      );

      order = orderResult.rows[0];

      for (const product of products) {
        await client.query(
          `INSERT INTO order_items
             (order_id, product_id, product_title,
              product_price, quantity, product_image)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            order.id,
            product.id,
            product.title,
            product.price.toFixed(2),
            product.quantity,
            product.image,
          ]
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    // 7. پاسخ موفق
    return Response.json(
      {
        success: true,
        message: "Order created successfully",
        order: {
          id: order.id,
          totalAmount: order.total_amount,
          status: order.status,
          createdAt: order.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    return Response.json(
      {
        success: false,
        error: "Unable to create order",
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // 1. Identify the authenticated user
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

    // 2. Fetch only this user's orders
    const ordersResult = await pool.query(
      `
      SELECT id, total_amount, status, created_at, updated_at
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC, id DESC
      `,
      [user.id]
    );

    const orders = ordersResult.rows;

    // 3. Return an empty list when there are no orders
    if (orders.length === 0) {
      return Response.json({
        success: true,
        orders: [],
      });
    }

    // 4. Fetch items belonging to these orders
    const orderIds = orders.map((order) => order.id);

    const itemsResult = await pool.query(
      `
      SELECT
        id,
        order_id,
        product_id,
        product_title,
        product_price,
        quantity,
        product_image
      FROM order_items
      WHERE order_id = ANY($1::bigint[])
      ORDER BY id ASC
      `,
      [orderIds]
    );

    // 5. Group items by order ID
    const itemsByOrder = new Map();

    for (const item of itemsResult.rows) {
      const key = String(item.order_id);

      if (!itemsByOrder.has(key)) {
        itemsByOrder.set(key, []);
      }

      itemsByOrder.get(key).push({
        id: item.id,
        productId: item.product_id,
        title: item.product_title,
        price: item.product_price,
        quantity: item.quantity,
        image: item.product_image,
      });
    }

    // 6. Attach items to each order
    const result = orders.map((order) => ({
      id: order.id,
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items: itemsByOrder.get(String(order.id)) ?? [],
    }));

    return Response.json({
      success: true,
      orders: result,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return Response.json(
      {
        success: false,
        error: "Unable to retrieve orders",
      },
      { status: 500 }
    );
  }
}
