"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isActive: boolean
  _count?: {
    products: number
  }
}

export function CollectionManager() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/admin/collections")
      const data = await res.json()
      setCollections(data)
    } catch (error) {
      console.error("Failed to fetch collections:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCollection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return

    try {
      const res = await fetch(`/api/admin/collections/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCollections()
      }
    } catch (error) {
      console.error("Failed to delete collection:", error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collections.length === 0 ? (
        <Card className="p-8 text-center col-span-full">
          <p className="text-muted-foreground">No collections yet. Create your first collection.</p>
        </Card>
      ) : (
        collections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden">
            {collection.image && (
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">{collection.slug}</p>
                </div>
                <Badge variant={collection.isActive ? "default" : "secondary"}>
                  {collection.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              {collection.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
              )}
              {collection._count && (
                <p className="text-sm text-muted-foreground mb-4">{collection._count.products} products</p>
              )}
              <div className="flex gap-2">
                <Link href={`/admin/collections/${collection.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => deleteCollection(collection.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
