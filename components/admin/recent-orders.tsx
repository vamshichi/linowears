import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const statusVariant = {
  PENDING: "secondary" as const,
  CONFIRMED: "secondary" as const,
  PROCESSING: "secondary" as const,
  SHIPPED: "default" as const,
  DELIVERED: "default" as const,
  CANCELLED: "destructive" as const,
  REFUNDED: "destructive" as const,
}

export function RecentOrders({ orders }: { orders: any[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">#{order.orderNumber}</p>
                  <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>{order.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{order.user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                <Button variant="ghost" size="sm" asChild className="mt-2">
                  <Link href={`/admin/orders/${order.id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
