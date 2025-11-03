import { AdminHeader } from "@/components/admin/admin-header"
import { CategoryForm } from "@/components/admin/category-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"



export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
const category = await prisma.category.findUnique({
  where: { id: params.id },
  select: {
    id: true,
    name: true,
    slug: true,
    // description?: true,
    // image: true,
    // isActive: true,
    parentId: true,
  },
})


  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Edit Category</h1>
        <CategoryForm category={category} />
      </main>
    </div>
  )
}
