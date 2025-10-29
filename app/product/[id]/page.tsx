import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          <ProductDetails productId={params.id} />
        </div>

        <div className="border-t border-border">
          <div className="container py-12">
            <ProductReviews productId={params.id} />
          </div>
        </div>

        <div className="border-t border-border bg-muted/30">
          <div className="container py-12">
            <RelatedProducts />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
