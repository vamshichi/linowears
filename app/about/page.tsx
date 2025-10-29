import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/elegant-cotton-linen-shirt-on-natural-background.jpg"
          alt="Linowares craftsmanship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Crafting timeless cotton-linen shirts with passion and precision
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6 text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Linowares, we believe that clothing should be more than just fabric—it should be an experience. Our
            mission is to create premium cotton-linen shirts that combine timeless elegance with modern comfort, all
            while respecting our planet and the people who make our products possible.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every shirt we create is a testament to our commitment to quality, sustainability, and the art of slow
            fashion. We're not just making clothes; we're crafting pieces that will become cherished parts of your
            wardrobe for years to come.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl text-center mb-12 text-foreground">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We source only the finest cotton and linen, ensuring every shirt meets our exacting standards of
                excellence.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                Our commitment to the environment guides every decision, from fabric selection to packaging.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl mb-3">Fair Practice</h3>
              <p className="text-muted-foreground">
                We ensure fair wages and safe working conditions for everyone involved in creating our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="font-serif text-4xl mb-6 text-foreground">The Art of Craftsmanship</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each Linowares shirt is the result of meticulous attention to detail and decades of textile expertise. Our
              master craftsmen combine traditional techniques with modern innovation to create shirts that are both
              beautiful and durable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              From the first cut of fabric to the final stitch, every step is carefully monitored to ensure perfection.
              We believe that true quality cannot be rushed, which is why we take the time to get every detail right.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our custom fit service takes this commitment even further, offering you a shirt that's tailored precisely
              to your measurements—because we believe everyone deserves clothing that fits perfectly.
            </p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image src="/cotton-linen-shirt-style-.jpg" alt="Craftsmanship detail" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-6">Experience the Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover why thousands of customers trust Linowares for their wardrobe essentials
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/custom-fit">Custom Fit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
