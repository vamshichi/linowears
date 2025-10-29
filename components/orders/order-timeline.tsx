import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Package, Truck, Home } from "lucide-react"
import type { Order, OrderStatus } from "@prisma/client"

const statusConfig = {
  PENDING: { label: "Order Placed", icon: Circle, color: "text-muted-foreground" },
  CONFIRMED: { label: "Confirmed", icon: CheckCircle2, color: "text-blue-500" },
  PROCESSING: { label: "Processing", icon: Package, color: "text-amber-500" },
  SHIPPED: { label: "Shipped", icon: Truck, color: "text-indigo-500" },
  DELIVERED: { label: "Delivered", icon: Home, color: "text-green-500" },
  CANCELLED: { label: "Cancelled", icon: Circle, color: "text-destructive" },
  REFUNDED: { label: "Refunded", icon: Circle, color: "text-destructive" },
}

const statusOrder: OrderStatus[] = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"]

export function OrderTimeline({ order }: { order: Order }) {
  const currentStatusIndex = statusOrder.indexOf(order.status)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order Status</CardTitle>
          <Badge
            variant={
              order.status === "DELIVERED"
                ? "default"
                : order.status === "CANCELLED" || order.status === "REFUNDED"
                  ? "destructive"
                  : "secondary"
            }
          >
            {statusConfig[order.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {statusOrder.map((status, index) => {
            const config = statusConfig[status]
            const Icon = config.icon
            const isCompleted = index <= currentStatusIndex
            const isCurrent = index === currentStatusIndex

            return (
              <div key={status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < statusOrder.length - 1 && (
                    <div className={`w-0.5 h-12 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className={`font-semibold ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                    {config.label}
                  </p>
                  {isCurrent && order.trackingNumber && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Tracking: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
