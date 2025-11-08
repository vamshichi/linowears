"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface RelatedProduct {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  images: string[]
  averageRating: number
  reviewCount: number
}

export function RelatedProducts({ productId }: { productId: string }) {
  const [products, setProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/related`)
        if (!response.ok) throw new Error("Failed to fetch related products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error(" Error fetching related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [productId])

  if (loading) {
    return (
      <div>
        <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const displayPrice = product.salePrice || product.price
          const mainImage = product.images[0] || "/placeholder.svg?height=600&width=450"

          return (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  {product.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.averageRating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">₹{displayPrice.toLocaleString()}</p>
                    {product.salePrice && (
                      <p className="text-sm text-muted-foreground line-through">₹{product.price.toLocaleString()}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
