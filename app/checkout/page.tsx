import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSession } from "@/lib/auth"
import { getOrCreateCart, calculateCartTotal } from "@/lib/cart"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { CheckoutSummary } from "@/components/checkout/checkout-summary"

export default async function CheckoutPage() {
  const user = await getSession()

  if (!user) {
    redirect("/auth/login")
  }

  const cart = await getOrCreateCart(user.id)

  if (cart.items.length === 0) {
    redirect("/cart")
  }

  const total = calculateCartTotal(cart.items)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm user={user} />
            </div>
            <div>
              <CheckoutSummary items={cart.items} total={total} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
