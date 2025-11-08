import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/elegant-cotton-linen-shirt-on-natural-background.jpg"
          alt="Sustainable cotton-linen fabric"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Sustainability</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">Fashion that respects our planet and its people</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6 text-foreground">Our Commitment</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At linowears, sustainability isn't just a buzzword—it's the foundation of everything we do. From the fields
            where our cotton and linen are grown to the moment your shirt arrives at your door, we're committed to
            minimizing our environmental impact and maximizing positive change.
          </p>
        </div>
      </section>

      {/* Natural Fabrics Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl text-center mb-12 text-foreground">Why Cotton & Linen?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg border">
                <h3 className="font-serif text-2xl mb-4">Natural & Biodegradable</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cotton and linen are 100% natural fibers that biodegrade completely, unlike synthetic materials that
                  can take hundreds of years to break down. When your linowears shirt eventually reaches the end of its
                  long life, it will return to the earth naturally.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>100% biodegradable natural fibers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>No microplastic pollution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Renewable and sustainable resources</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card p-8 rounded-lg border">
                <h3 className="font-serif text-2xl mb-4">Low Environmental Impact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Linen, in particular, is one of the most sustainable fabrics available. Flax (the plant linen comes
                  from) requires minimal water and pesticides to grow, and every part of the plant can be used, creating
                  zero waste.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Minimal water consumption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>No pesticides or fertilizers needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Carbon-negative crop cultivation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Practices */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-12 text-foreground">Sustainable Practices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Ethical Sourcing</h3>
              <p className="text-muted-foreground">
                We partner only with certified organic farms and fair-trade suppliers who share our values.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Minimal Packaging</h3>
              <p className="text-muted-foreground">
                Our packaging is 100% recyclable and made from post-consumer recycled materials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Circular Fashion</h3>
              <p className="text-muted-foreground">
                We offer repair services and encourage recycling to extend the life of every garment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-5xl font-bold mb-2">80%</div>
              <div className="opacity-90">Less water than conventional cotton</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="opacity-90">Organic & natural fibers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">0</div>
              <div className="opacity-90">Plastic in packaging</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="opacity-90">Years average garment lifespan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Guide */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-12 text-foreground">Caring for Your linowears Shirt</h2>
          <div className="bg-card p-8 rounded-lg border">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Proper care extends the life of your shirt and reduces environmental impact. Here's how to keep your
              linowears shirt looking beautiful for years:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Washing</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Wash in cold water (30°C or less)</li>
                  <li>• Use eco-friendly detergent</li>
                  <li>• Wash with similar colors</li>
                  <li>• Avoid bleach and harsh chemicals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Drying & Ironing</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Air dry when possible</li>
                  <li>• Low heat if using dryer</li>
                  <li>• Iron while slightly damp</li>
                  <li>• Steam to remove wrinkles naturally</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-6 text-foreground">Join the Movement</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every purchase supports sustainable fashion and ethical practices
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Shop Sustainable Collection</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
