import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AdminProductsList({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <div className="aspect-[3/4] relative overflow-hidden bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg?height=400&width=300"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                Out of Stock
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold">₹{product.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{product.variants.length} variants</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href={`/admin/products/${product.id}`}>Edit Product</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
