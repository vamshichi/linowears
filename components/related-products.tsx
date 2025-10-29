import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const relatedProducts = [
  {
    id: 2,
    name: "Navy Blue Cotton Blend",
    price: 2799,
    rating: 4.8,
    image: "navy-blue-cotton-linen-shirt",
  },
  {
    id: 3,
    name: "Beige Summer Casual",
    price: 2299,
    rating: 4.6,
    image: "beige-casual-cotton-linen-shirt",
  },
  {
    id: 5,
    name: "Light Blue Oxford",
    price: 2599,
    rating: 4.4,
    image: "light-blue-oxford-cotton-shirt",
  },
  {
    id: 7,
    name: "Cream Textured Linen",
    price: 2399,
    rating: 4.5,
    image: "cream-textured-linen-shirt",
  },
]

export function RelatedProducts() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
              <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                <Image
                  src={`/${product.image}.jpg?height=600&width=450&query=${product.image}`}
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
                </div>
                <p className="font-semibold">₹{product.price.toLocaleString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
