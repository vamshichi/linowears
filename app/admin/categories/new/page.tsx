
import { AdminSidebar } from "@/components/admin/admin-header"
import { CategoryForm } from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
      <AdminSidebar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Add New Category</h1>
        <CategoryForm />
      </main>
    </div>
  )
}
