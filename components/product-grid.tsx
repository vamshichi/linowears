import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { WishlistButton } from "@/components/wishlist/wishlist-button"

const products = [
  {
    id: 1,
    name: "Classic White Linen Shirt",
    price: 2499,
    comparePrice: 3499,
    rating: 4.5,
    reviews: 128,
    image: "white-linen-shirt-product",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Navy Blue Cotton Blend",
    price: 2799,
    rating: 4.8,
    reviews: 95,
    image: "navy-blue-shirt-product",
    badge: "New",
  },
  {
    id: 3,
    name: "Beige Summer Casual",
    price: 2299,
    rating: 4.6,
    reviews: 76,
    image: "beige-shirt-product",
  },
  {
    id: 4,
    name: "Olive Green Formal",
    price: 2999,
    comparePrice: 3999,
    rating: 4.7,
    reviews: 112,
    image: "olive-green-shirt-product",
  },
  {
    id: 5,
    name: "Light Blue Oxford",
    price: 2599,
    rating: 4.4,
    reviews: 89,
    image: "light-blue-shirt-product",
    badge: "Trending",
  },
  {
    id: 6,
    name: "Charcoal Grey Premium",
    price: 3299,
    rating: 4.9,
    reviews: 145,
    image: "charcoal-grey-shirt-product",
  },
  {
    id: 7,
    name: "Cream Textured Linen",
    price: 2399,
    rating: 4.5,
    reviews: 67,
    image: "cream-linen-shirt-product",
  },
  {
    id: 8,
    name: "Black Formal Blend",
    price: 2899,
    comparePrice: 3699,
    rating: 4.6,
    reviews: 103,
    image: "black-shirt-product",
    badge: "Sale",
  },
]

export function ProductGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{products.length} products</p>
        <select className="text-sm border border-border rounded-lg px-3 py-2 bg-background">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
          <option>Best Rating</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="absolute top-3 right-3 z-10">
              <WishlistButton productId={product.id.toString()} />
            </div>
            <Link href={`/product/${product.id}`}>
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  {product.badge && (
                    <Badge
                      className="absolute top-3 left-3 z-10"
                      variant={product.badge === "Sale" ? "destructive" : "default"}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Image
                    src={`/${product.image}.jpg?height=600&width=450&query=${product.image} on white background product photography no model`}
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
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
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
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
