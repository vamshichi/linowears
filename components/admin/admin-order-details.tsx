"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

const statusVariant = {
  PENDING: "secondary" as const,
  CONFIRMED: "secondary" as const,
  PROCESSING: "secondary" as const,
  SHIPPED: "default" as const,
  DELIVERED: "default" as const,
  CANCELLED: "destructive" as const,
  REFUNDED: "destructive" as const,
}

export function AdminOrderDetails({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "")
  const [loading, setLoading] = useState(false)

  const handleUpdateOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          status,
          trackingNumber,
        }),
      })

      if (response.ok) {
        router.refresh()
        alert("Order updated successfully")
      } else {
        alert("Failed to update order")
      }
    } catch (error) {
      console.error("[v0] Update order error:", error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Order #{order.orderNumber}</h1>
          <p className="text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge variant={statusVariant[order.status as keyof typeof statusVariant]} className="text-base px-4 py-2">
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg?height=96&width=80"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.color} • Size {item.size} • Qty: {item.quantity}
                      </p>
                      <p className="font-semibold mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{order.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">{order.user.phone || "Not provided"}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                <p className="text-sm whitespace-pre-line">{order.shippingAddress}</p>
              </div>
              {order.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Order Notes</p>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Order Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tracking Number</Label>
                <Input
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>

              <Button className="w-full" onClick={handleUpdateOrder} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Order"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{Math.round(order.totalAmount / 1.18).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span className="font-medium">
                    ₹{Math.round(order.totalAmount - order.totalAmount / 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
