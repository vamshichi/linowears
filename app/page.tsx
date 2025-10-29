import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, Shirt, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"

const iconMap: Record<string, any> = {
  Leaf,
  Shirt,
  Star,
}

async function getHomepageContent() {
  try {
    const [heroSection, features, featuredProducts] = await Promise.all([
      prisma.heroSection.findFirst({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.feature.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        take: 3,
      }),
      prisma.product.findMany({
        where: { featured: true, inStock: true },
        take: 4,
        orderBy: { createdAt: "desc" },
      }),
    ])

    return { heroSection, features, featuredProducts }
  } catch (error) {
    console.error("[v0] Error fetching homepage content:", error)
    return { heroSection: null, features: [], featuredProducts: [] }
  }
}

export default async function HomePage() {
  const { heroSection, features, featuredProducts } = await getHomepageContent()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
          <Image
            src={heroSection?.image || "/elegant-cotton-linen-shirt-on-natural-background.jpg"}
            alt="Premium cotton-linen shirt"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
          <div className="relative z-10 container text-center text-white">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">
              {heroSection?.title || "Timeless Elegance, Natural Comfort"}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-balance max-w-2xl mx-auto text-white/90">
              {heroSection?.subtitle ||
                "Discover our premium cotton-linen shirt collection. Sustainable, breathable, and crafted for the modern wardrobe."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href={heroSection?.ctaLink || "/shop"}>
                  {heroSection?.ctaText || "Shop Collection"} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {heroSection?.secondaryCtaText && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Link href={heroSection?.secondaryCtaLink || "/custom-fit"}>{heroSection.secondaryCtaText}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Leaf
                return (
                  <Card key={feature.id} className="border-none shadow-none bg-transparent">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our handpicked selection of premium cotton-linen shirts
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0
                ? featuredProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group">
                      <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                          <Image
                            src={product.images[0] || "/placeholder.svg?height=600&width=450"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.fabric}</p>
                          <p className="font-semibold">₹{product.price.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                : // Fallback to placeholder products if no featured products
                  [1, 2, 3, 4].map((i) => (
                    <Link key={i} href={`/shop`} className="group">
                      <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                          <Image
                            src={`/cotton-linen-shirt-style-.jpg?height=600&width=450&query=cotton linen shirt style ${i}`}
                            alt={`Product ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            Classic Linen Shirt
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">Cotton-Linen Blend</p>
                          <p className="font-semibold">₹2,499</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/shop">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Get exclusive access to new collections, styling tips, and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
