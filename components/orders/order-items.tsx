import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WriteReviewDialog } from "@/components/reviews/write-review-dialog"

export function OrderItems({ items }: { items: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
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
                <Link
                  href={`/product/${item.productId}`}
                  className="font-semibold hover:text-primary transition-colors"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.color} • Size {item.size} • Qty: {item.quantity}
                </p>
                <p className="font-semibold mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <WriteReviewDialog productId={item.productId} productName={item.product.name} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
