import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdminProductsList } from "@/components/admin/admin-products-list"

export default async function AdminProductsPage() {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      variants: true,
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">Products Management</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>

          <AdminProductsList products={products} />
        </div>
      </main>
    </div>
  )
}
