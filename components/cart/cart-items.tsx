"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CartItems({ items }: { items: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const updateQuantity = async (itemId: string, quantity: number) => {
    setLoading(itemId)
    try {
      await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      })
      router.refresh()
    } catch (error) {
      console.error(" Failed to update cart:", error)
    } finally {
      setLoading(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setLoading(itemId)
    try {
      await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      })
      router.refresh()
    } catch (error) {
      console.error(" Failed to remove item:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item.product.images[0] || "/placeholder.svg?height=128&width=96"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.color} • Size {item.size}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={loading === item.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={loading === item.id}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={loading === item.id}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
