import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

const statusVariant = {
  PENDING: "secondary" as const,
  CONFIRMED: "secondary" as const,
  PROCESSING: "secondary" as const,
  SHIPPED: "default" as const,
  DELIVERED: "default" as const,
  CANCELLED: "destructive" as const,
  REFUNDED: "destructive" as const,
}

export function OrdersList({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="font-serif text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
        <Button asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-lg">₹{order.totalAmount.toLocaleString()}</p>
                </div>
                <Button asChild>
                  <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {order.items.slice(0, 4).map((item: any) => (
                <div key={item.id} className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg?height=80&width=64"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="w-16 h-20 flex-shrink-0 rounded bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                  +{order.items.length - 4}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
