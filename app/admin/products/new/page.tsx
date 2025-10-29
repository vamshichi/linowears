import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"

export default async function NewProductPage() {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container max-w-4xl py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Add New Product</h1>
            <p className="text-muted-foreground">Create a new product in your catalog</p>
          </div>

          <ProductForm />
        </div>
      </main>
    </div>
  )
}
