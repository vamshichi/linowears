"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isActive: boolean
  parentId: string | null
  children?: Category[]
  _count?: {
    products: number
  }
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCategories()
      }
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const renderCategory = (category: Category, level = 0) => (
    <div key={category.id} className={`${level > 0 ? "ml-8" : ""}`}>
      <Card className="p-4 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {level > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {category.image && (
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.slug}</p>
            </div>
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "Active" : "Inactive"}
            </Badge>
            {category._count && (
              <span className="text-sm text-muted-foreground">{category._count.products} products</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/categories/${category.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => deleteCategory(category.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      {category.children?.map((child) => renderCategory(child, level + 1))}
    </div>
  )

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-2">
      {categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No categories yet. Create your first category.</p>
        </Card>
      ) : (
        categories.map((category) => renderCategory(category))
      )}
    </div>
  )
}
