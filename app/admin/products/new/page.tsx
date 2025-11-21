import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"

import { ProductForm } from "@/components/admin/product-form"
import { AdminSidebar } from "@/components/admin/admin-header"

export default async function NewProductPage() {
  // const admin = await isAdmin()

  // if (!admin) {
  //   redirect("/")
  // }

  return (
    <div className="flex min-h-screen flex-col">
     <AdminSidebar />

      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="container max-w-4xl py-8 mx-10">
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
