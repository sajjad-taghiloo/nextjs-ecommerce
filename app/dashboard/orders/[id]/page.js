"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const controller = new AbortController();

    async function fetchOrder() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/orders/${orderId}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "دریافت سفارش ناموفق بود.");
        }

        setOrder(data.order);
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

    fetchOrder();

    return () => controller.abort();
  }, [orderId]);

  const cardStyle = {
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: 14,
    padding: 24,
  };

  if (loading) {
    return (
      <main style={{ padding: 32, color: "#fff" }}>
        در حال دریافت اطلاعات سفارش...
      </main>
    );
  }

  if (error || !order) {
    return (
      <main
        style={{
          padding: 32,
          color: "#fff",
          background: "#030712",
          minHeight: "100vh",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ color: "#F87171" }}>خطا در نمایش سفارش</h2>
          <p>{error || "سفارش پیدا نشد."}</p>

          <Link
            href="/dashboard/orders"
            style={{ color: "#D4AF37" }}
          >
            بازگشت به سفارش‌ها
          </Link>
        </div>
      </main>
    );
  }

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
        <Link
          href="/dashboard/orders"
          style={{
            color: "#D4AF37",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 24,
          }}
        >
          ← بازگشت به سفارش‌ها
        </Link>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>
            جزئیات سفارش #{order.id}
          </h1>

          <p style={{ color: "#9CA3AF", margin: 0 }}>
            ثبت سفارش: {formatDate(order.createdAt)}
          </p>
        </header>

        <section
          style={{
            ...cardStyle,
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p style={{ color: "#9CA3AF", marginTop: 0 }}>
              وضعیت سفارش
            </p>
            <strong>
              {statusLabels[order.status] || order.status}
            </strong>
          </div>

          <div>
            <p style={{ color: "#9CA3AF", marginTop: 0 }}>
              مبلغ کل
            </p>
            <strong style={{ color: "#D4AF37", fontSize: 22 }}>
              {formatPrice(order.totalAmount)}
            </strong>
          </div>
        </section>

        <section style={cardStyle}>
          <h2 style={{ fontSize: 20, marginTop: 0, marginBottom: 24 }}>
            محصولات سفارش
          </h2>

          {order.items?.length ? (
            <div style={{ display: "grid", gap: 20 }}>
              {order.items.map((item, index) => (
                <article
                  key={`${item.productId}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    paddingBottom: 20,
                    borderBottom:
                      index === order.items.length - 1
                        ? "none"
                        : "1px solid #374151",
                    flexWrap: "wrap",
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      width={90}
                      height={90}
                      style={{
                        objectFit: "contain",
                        background: "#fff",
                        borderRadius: 10,
                        padding: 8,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 90,
                        height: 90,
                        background: "#1F2937",
                        borderRadius: 10,
                      }}
                    />
                  )}

                  <div style={{ flex: 1, minWidth: 180 }}>
                    <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>
                      {item.title}
                    </h3>

                    <p style={{ color: "#9CA3AF", margin: 0 }}>
                      تعداد: {item.quantity}
                    </p>
                  </div>

                  <strong style={{ color: "#D4AF37" }}>
                    {formatPrice(
                      Number(item.price) * Number(item.quantity)
                    )}
                  </strong>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ color: "#9CA3AF" }}>
              محصولی برای این سفارش ثبت نشده است.
            </p>
          )}

          <div
            style={{
              borderTop: "1px solid #374151",
              paddingTop: 20,
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <strong>مبلغ نهایی</strong>
            <strong style={{ color: "#D4AF37", fontSize: 22 }}>
              {formatPrice(order.totalAmount)}
            </strong>
          </div>
        </section>
      </div>
    </main>
  );
}