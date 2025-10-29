"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag, Loader2 } from "lucide-react"

export function CheckoutSummary({ items, total }: { items: any[]; total: number }) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState("")

  const shipping = total > 999 ? 0 : 99
  const tax = Math.round(total * 0.18)

  const discount = appliedCoupon ? appliedCoupon.discount : 0
  const finalTotal = total + shipping + tax - discount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return

    setCouponLoading(true)
    setCouponError("")

    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, orderTotal: total }),
      })

      const data = await response.json()

      if (data.valid) {
        setAppliedCoupon(data.coupon)
        setCouponError("")
      } else {
        setCouponError(data.message || "Invalid coupon code")
        setAppliedCoupon(null)
      }
    } catch (error) {
      setCouponError("Failed to apply coupon")
      setAppliedCoupon(null)
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                <Image
                  src={item.product.images[0] || "/placeholder.svg?height=80&width=64"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.color} • {item.size} • Qty: {item.quantity}
                </p>
                <p className="text-sm font-semibold mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              disabled={!!appliedCoupon || couponLoading}
              className="flex-1"
            />
            {appliedCoupon ? (
              <Button variant="outline" onClick={handleRemoveCoupon} size="sm">
                Remove
              </Button>
            ) : (
              <Button onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()} size="sm">
                {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
              </Button>
            )}
          </div>
          {couponError && <p className="text-sm text-destructive">{couponError}</p>}
          {appliedCoupon && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Tag className="h-4 w-4" />
              <span>Coupon "{appliedCoupon.code}" applied!</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
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
          {discount > 0 && (
            <div className="flex items-center justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-medium">-₹{discount.toLocaleString()}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">₹{finalTotal.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
