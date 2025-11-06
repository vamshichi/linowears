import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl container py-8">
          <ProductDetails productId={id} />
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl container py-12">
            <ProductReviews productId={id} />
          </div>
        </div>

        <div className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl container py-12">
            <RelatedProducts productId={id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
