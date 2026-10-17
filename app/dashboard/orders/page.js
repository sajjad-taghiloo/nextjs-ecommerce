"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price) || 0);

const formatDate = (date) =>
  new Date(date).toLocaleString("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const statusLabels = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  processing: "در حال پردازش",
  shipped: "ارسال‌شده",
  completed: "تکمیل‌شده",
  cancelled: "لغوشده",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders", {
          signal: controller.signal,
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "دریافت سفارش‌ها ناموفق بود.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "خطایی رخ داده است.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => controller.abort();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#F9FAFB",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 28 }}>
          سفارش‌های من
        </h1>

        {loading && <p>در حال دریافت سفارش‌ها...</p>}

        {!loading && error && (
          <p style={{ color: "#F87171" }}>{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <p style={{ color: "#9CA3AF" }}>
            هنوز سفارشی ثبت نکرده‌اید.
          </p>
        )}

        {!loading && !error && (
          <div style={{ display: "grid", gap: 18 }}>
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                style={{
                  display: "block",
                  padding: 24,
                  borderRadius: 14,
                  background: "#111827",
                  border: "1px solid #374151",
                  color: "#F9FAFB",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: 18, margin: "0 0 12px" }}>
                      سفارش #{order.id}
                    </h2>

                    <p style={{ color: "#9CA3AF", margin: "0 0 8px" }}>
                      {formatDate(order.createdAt)}
                    </p>

                    <p style={{ color: "#9CA3AF", margin: 0 }}>
                      {order.items?.length || 0} محصول
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        display: "block",
                        color: "#D4AF37",
                        fontSize: 20,
                        marginBottom: 10,
                      }}
                    >
                      {formatPrice(order.totalAmount)}
                    </strong>

                    <span style={{ fontSize: 14 }}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    color: "#D4AF37",
                    margin: "20px 0 0",
                    fontSize: 14,
                  }}
                >
                  مشاهده جزئیات ←
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}