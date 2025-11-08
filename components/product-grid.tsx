"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { WishlistButton } from "@/components/wishlist/wishlist-button"

type Product = {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number | null
  images: string[]
  rating: number
  reviewCount: number
  featured: boolean
  tags: string[]
}

type ProductGridProps = {
  filters?: {
    categoryId?: string
    minPrice?: number
    maxPrice?: number
    sizes?: string[]
    colors?: string[]
    fabrics?: string[]
    search?: string
  }
}

export function ProductGrid({ filters }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters?.categoryId) params.append("categoryId", filters.categoryId)
        if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString())
        if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString())
        if (filters?.sizes?.length) params.append("sizes", filters.sizes.join(","))
        if (filters?.colors?.length) params.append("colors", filters.colors.join(","))
        if (filters?.fabrics?.length) params.append("fabrics", filters.fabrics.join(","))
        if (filters?.search) params.append("search", filters.search)
        params.append("sortBy", sortBy)

        const response = await fetch(`/api/products?${params.toString()}`)
        const data = await response.json()

        if (data.success) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error(" Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, sortBy])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{products.length} products</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-2 bg-background"
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="absolute top-3 right-3 z-10">
                <WishlistButton productId={product.id} />
              </div>
              <Link href={`/product/${product.id}`}>
                <div className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                  <div className="aspect-[3/3] relative overflow-hidden bg-muted">
                    {product.featured && <Badge className="absolute top-3 left-3 z-10">Bestseller</Badge>}
                    {product.tags.includes("new") && (
                      <Badge className="absolute top-3 left-3 z-10" variant="secondary">
                        New
                      </Badge>
                    )}
                    {product.comparePrice && (
                      <Badge className="absolute top-3 left-3 z-10" variant="destructive">
                        Sale
                      </Badge>
                    )}
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=600&width=450"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">₹{product.price.toLocaleString()}</p>
                      {product.comparePrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ₹{product.comparePrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
