"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function ShopPage() {
  const [filters, setFilters] = useState({})

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl container py-8">
            <h1 className="font-serif text-4xl font-bold mb-2">Shop All</h1>
            <p className="text-muted-foreground">Discover our complete collection of premium cotton-linen shirts</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProductFilters onFilterChange={setFilters} />
            </aside>
            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
