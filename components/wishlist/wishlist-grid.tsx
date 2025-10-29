"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    images: string[]
    inStock: boolean
  }
  createdAt: string
}

export function WishlistGrid() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist")
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error("Failed to fetch wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (itemId: string) => {
    try {
      const res = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setItems(items.filter((item) => item.id !== itemId))
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      })
    }
  }

  const addToCart = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      })

      if (res.ok) {
        toast({
          title: "Added to cart",
          description: "Item has been added to your cart",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  if (loading) return <div>Loading...</div>

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="font-serif text-2xl mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Save items you love to your wishlist</p>
        <Link href="/shop">
          <Button>Browse Products</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden group">
          <Link href={`/product/${item.product.slug}`}>
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/product/${item.product.slug}`}>
              <h3 className="font-medium mb-2 hover:text-primary transition-colors">{item.product.name}</h3>
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">₹{item.product.price}</span>
              {item.product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">₹{item.product.comparePrice}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => addToCart(item.product.id)}
                disabled={!item.product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {item.product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
