import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { AdminSidebar } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  })

  if (!product) {
    redirect("/admin/products")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="container max-w-4xl py-8">
          <div className="mb-8 mx-10">
            <h1 className="font-serif text-3xl font-bold mb-2">Edit Product</h1>
            <p className="text-muted-foreground">Update product information</p>
          </div>
          <ProductForm product={product} />
        </div>
      </main>
    </div>
  )
}
