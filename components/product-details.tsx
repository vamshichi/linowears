"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Share2, Truck, RefreshCw, Shield, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Product360Viewer } from "@/components/product/product-360-viewer"
import { WishlistButton } from "@/components/wishlist/wishlist-button"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductData {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  images: string[]
  averageRating: number
  totalReviews: number
  availableSizes: string[]
  availableColors: string[]
  stock: number
  isFeatured: boolean
  metaTitle: string | null
  metaDesc: string | null
  attributes: any
}

export function ProductDetails({ productId }: { productId: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (!response.ok) throw new Error("Failed to fetch product")
        const data = await response.json()
        setProduct(data)

        // Set default selections
        if (data.availableSizes.length > 0) setSelectedSize(data.availableSizes[0])
        if (data.availableColors.length > 0) setSelectedColor(data.availableColors[0])
      } catch (error) {
        console.error(" Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = async () => {
    setAddingToCart(true)
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
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
      console.error(" Add to cart error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const displayPrice = product.salePrice || product.price

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div>
        <Product360Viewer productName={product.name} productColor={selectedColor} />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          {product.isFeatured && <Badge className="mb-3">Bestseller</Badge>}
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.averageRating) ? "fill-accent text-accent" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating} ({product.totalReviews} reviews)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold">₹{displayPrice.toLocaleString()}</p>
            {product.salePrice && (
              <>
                <p className="text-xl text-muted-foreground line-through">₹{product.price.toLocaleString()}</p>
                <Badge variant="destructive">{discountPercent}% OFF</Badge>
              </>
            )}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Size Selection */}
        {product.availableSizes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="font-semibold">Size</Label>
              <Button variant="link" className="h-auto p-0 text-sm">
                Size Guide
              </Button>
            </div>
            <div className="flex gap-2">
              {product.availableSizes.map((size) => (
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
        )}

        {/* Color Selection */}
        {product.availableColors.length > 0 && (
          <div>
            <Label className="font-semibold mb-3 block">Color: {selectedColor}</Label>
            <div className="flex gap-3">
              {product.availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                    selectedColor === color
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <Label className="font-semibold mb-3 block">Quantity</Label>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
            <span className="text-sm text-muted-foreground ml-2">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={addingToCart || product.stock === 0}>
            {addingToCart ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : product.stock === 0 ? (
              "Out of Stock"
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
        {product.attributes && (
          <div className="pt-6 border-t border-border space-y-4">
            {product.attributes.fabric && (
              <div>
                <h3 className="font-semibold mb-2">Fabric & Care</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.attributes.fabric.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.attributes.features && (
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {product.attributes.features.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
