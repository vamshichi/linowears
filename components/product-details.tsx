"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Share2, Truck, RefreshCw, Shield, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Product360Viewer } from "@/components/product/product-360-viewer"
import { WishlistButton } from "@/components/wishlist/wishlist-button"

export function ProductDetails({ productId }: { productId: string }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("White")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Blue", hex: "#4A90E2" },
  ]

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "1",
          size: selectedSize,
          color: selectedColor,
          quantity,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/cart")
      } else {
        if (response.status === 401) {
          router.push("/auth/login")
        } else {
          alert(data.error || "Failed to add to cart")
        }
      }
    } catch (error) {
      console.error("[v0] Add to cart error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div>
        <Product360Viewer productName="Classic Linen Shirt" productColor={selectedColor} />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Badge className="mb-3">Bestseller</Badge>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Classic White Linen Shirt</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.8 (128 reviews)</span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold">₹2,499</p>
            <p className="text-xl text-muted-foreground line-through">₹3,499</p>
            <Badge variant="destructive">30% OFF</Badge>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          Experience timeless elegance with our Classic White Linen Shirt. Crafted from premium cotton-linen blend, this
          shirt offers exceptional breathability and comfort. Perfect for both casual and semi-formal occasions.
        </p>

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="font-semibold">Size</Label>
            <Button variant="link" className="h-auto p-0 text-sm">
              Size Guide
            </Button>
          </div>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-colors ${
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="font-semibold mb-3 block">Color: {selectedColor}</Label>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-12 h-12 rounded-full border-2 transition-colors ${
                  selectedColor === color.name ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <Label className="font-semibold mb-3 block">Quantity</Label>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
          <WishlistButton productId={productId} size="lg" />
          <Button size="lg" variant="outline" className="aspect-square p-0 bg-transparent">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
          <Card className="border-none shadow-none bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders above ₹999</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-muted/50">
            <CardContent className="p-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% secure checkout</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="pt-6 border-t border-border space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Fabric & Care</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 60% Cotton, 40% Linen blend</li>
              <li>• Machine wash cold, tumble dry low</li>
              <li>• Iron on medium heat if needed</li>
              <li>• Do not bleach</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Breathable and lightweight fabric</li>
              <li>• Classic collar with button-down front</li>
              <li>• Long sleeves with button cuffs</li>
              <li>• Curved hem for versatile styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
