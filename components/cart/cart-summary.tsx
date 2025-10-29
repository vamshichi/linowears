import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function CartSummary({ total, itemCount }: { total: number; itemCount: number }) {
  const shipping = total > 999 ? 0 : 99
  const tax = Math.round(total * 0.18) // 18% GST
  const finalTotal = total + shipping + tax

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
            <span className="font-medium">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax (GST 18%)</span>
            <span className="font-medium">₹{tax.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">₹{finalTotal.toLocaleString()}</span>
        </div>

        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        {total < 999 && (
          <p className="text-xs text-center text-muted-foreground">
            Add ₹{(999 - total).toLocaleString()} more for FREE shipping
          </p>
        )}

        <Separator />

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>✓ Secure checkout</p>
          <p>✓ 30-day easy returns</p>
          <p>✓ 100% authentic products</p>
        </div>
      </CardContent>
    </Card>
  )
}
