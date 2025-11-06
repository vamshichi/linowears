import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdminProductsList } from "@/components/admin/admin-products-list"
import { AdminSidebar } from "@/components/admin/admin-header"

export default async function AdminProductsPage() {
  // const admin = await isAdmin()

  // if (!admin) {
  //   redirect("/")
  // }

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
      <AdminSidebar />

      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8 mx-10">
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
          <div className="mx-10">
          <AdminProductsList products={products} />
          </div>
        </div>
      </main>
    </div>
  )
}
