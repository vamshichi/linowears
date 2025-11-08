import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSession } from "@/lib/auth"
import { getOrCreateCart, calculateCartTotal } from "@/lib/cart"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default async function CartPage() {
  const user = await getSession()

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="mx-auto max-w-7xl text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="font-serif text-2xl font-bold">Sign in to view your cart</h2>
            <p className="text-muted-foreground">Please sign in to add items to your cart</p>
            <Button asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const cart = await getOrCreateCart(user.id)
  const total = calculateCartTotal(cart.items)

  if (cart.items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="font-serif text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl container py-8">
          <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems items={cart.items} />
            </div>
            <div>
              <CartSummary total={total} itemCount={cart.items.length} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
