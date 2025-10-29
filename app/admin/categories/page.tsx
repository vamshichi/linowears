import { Suspense } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { CategoryManager } from "@/components/admin/category-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
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
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryManager />
        </Suspense>
      </main>
    </div>
  )
}
