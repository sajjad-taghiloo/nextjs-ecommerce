
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import CheckoutPageClient from "@/components/checkout/CheckoutPageClient";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=%2Fcheckout");
  }

  return <CheckoutPageClient user={user} />;
}
