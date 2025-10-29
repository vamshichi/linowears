import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      variants: true,
    },
  })

  if (!product) {
    redirect("/admin/products")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container max-w-4xl py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Edit Product</h1>
            <p className="text-muted-foreground">Update product information</p>
          </div>

          <ProductForm product={product} />
        </div>
      </main>
    </div>
  )
}
