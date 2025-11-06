
import { AdminSidebar } from "@/components/admin/admin-header"
import { CategoryForm } from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Add New Category</h1>
        <CategoryForm />
      </main>
    </div>
  )
}
