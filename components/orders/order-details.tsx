import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle } from "lucide-react"
import type { Order } from "@prisma/client"

export function OrderDetails({ order }: { order: Order }) {
  const subtotal = order.totalAmount / 1.18 // Remove tax
  const shipping = subtotal > 999 ? 0 : 99
  const tax = order.totalAmount - subtotal - shipping

  return (
    <div className="space-y-6">
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹{Math.round(subtotal).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax (GST 18%)</span>
              <span className="font-medium">₹{Math.round(tax).toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-xl">₹{order.totalAmount.toLocaleString()}</span>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-semibold mb-2">Shipping Address</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{order.shippingAddress}</p>
          </div>

          {order.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-semibold mb-2">Order Notes</p>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <HelpCircle className="mr-2 h-4 w-4" />
              Need Help?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
