export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react"
import { CategoryManager } from "@/components/admin/category-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-header"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="flex items-center justify-between mb-8 my-10 mx-10">
          <div className="">
            <h1 className="font-serif text-4xl mb-2">Categories</h1>
            <p className="text-muted-foreground">Manage product categories and hierarchies</p>
          </div>
          <Link href="/admin/categories/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </Link>
        </div>

        <div className="mx-10">
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryManager />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
