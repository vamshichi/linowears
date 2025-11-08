import { Suspense } from "react"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { WishlistGrid } from "@/components/wishlist/wishlist-grid"

export default async function WishlistPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login?redirect=/account/wishlist")
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl container px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">My Wishlist</h1>
        <Suspense fallback={<div>Loading wishlist...</div>}>
          <WishlistGrid />
        </Suspense>
      </main>
    </div>
  )
}
