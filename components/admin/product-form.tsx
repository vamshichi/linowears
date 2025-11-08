"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductVariant {
  size: string
  color: string
  sku: string
  stock: number
}

interface ProductFormData {
  name: string
  description: string
  price: string | number
  comparePrice: string | number
  categoryId: string
  brand: string
  tags: string
  metaTitle: string
  metaDescription: string
  attributes: Record<string, string>
  fabric: string
  fabricCare: string
  inStock: boolean
  featured: boolean
  images: string[]
  collectionIds: string[]
}

interface Category {
  id: string
  name: string
}

interface Collection {
  id: string
  name: string
}

interface ProductFormProps {
  product?: any
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [collections, setCollections] = useState<Collection[]>([])

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    comparePrice: product?.comparePrice || "",
    categoryId: product?.categoryId || "",
    brand: product?.brand || "",
    tags: product?.tags?.join(", ") || "",
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    attributes: product?.attributes || {},
    fabric: product?.fabric || "Cotton-Linen Blend",
    fabricCare: product?.fabricCare || "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    images: product?.images || [""],
    collectionIds: product?.collections?.map((c: any) => c.id) || [],
  })

  const [variants, setVariants] = useState<ProductVariant[]>(
    product?.variants || [{ size: "M", color: "White", sku: "", stock: 0 }],
  )

  useEffect(() => {
    fetchCategories()
    fetchCollections()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(flattenCategories(data))
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/admin/collections")
      const data = await res.json()
      setCollections(data)
    } catch (error) {
      console.error("Failed to fetch collections:", error)
    }
  }

  const flattenCategories = (cats: any[]): Category[] => {
    const result: Category[] = []
    const flatten = (items: any[], level = 0) => {
      items.forEach((item) => {
        result.push({ id: item.id, name: "  ".repeat(level) + item.name })
        if (item.children) {
          flatten(item.children, level + 1)
        }
      })
    }
    flatten(cats)
    return result
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products/create"

      const response = await fetch(url, {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price as string),
          comparePrice: formData.comparePrice ? Number.parseFloat(formData.comparePrice as string) : null,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          images: formData.images.filter((img: string) => img.trim() !== ""),
          variants,
        }),
      })

      if (!response.ok) throw new Error("Failed to save product")

      toast({
        title: "Success",
        description: `Product ${product ? "updated" : "created"} successfully`,
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_: string, i: number) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const addVariant = () => {
    setVariants([...variants, { size: "M", color: "White", sku: "", stock: 0 }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_: ProductVariant, i: number) => i !== index))
  }

  const updateVariant = (index: number, field: string, value: string | number) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="comparePrice">Compare Price (₹)</Label>
              <Input
                id="comparePrice"
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g., linowears"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fabric">Fabric</Label>
              <Input
                id="fabric"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="casual, summer, breathable"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fabricCare">Fabric Care Instructions</Label>
            <Textarea
              id="fabricCare"
              value={formData.fabricCare}
              onChange={(e) => setFormData({ ...formData, fabricCare: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, inStock: checked })}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO & Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              placeholder="Leave empty to use product name"
            />
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              placeholder="SEO description for search engines"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.images.map((image: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input value={image} onChange={(e) => updateImage(index, e.target.value)} placeholder="Image URL" />
              {formData.images.length > 1 && (
                <Button type="button" variant="outline" size="icon" onClick={() => removeImage(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addImage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant: ProductVariant, index: number) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-end">
              <div>
                <Label>Size</Label>
                <Input
                  value={variant.size}
                  onChange={(e) => updateVariant(index, "size", e.target.value)}
                  placeholder="M"
                />
              </div>
              <div>
                <Label>Color</Label>
                <Input
                  value={variant.color}
                  onChange={(e) => updateVariant(index, "color", e.target.value)}
                  placeholder="White"
                />
              </div>
              <div>
                <Label>SKU</Label>
                <Input
                  value={variant.sku}
                  onChange={(e) => updateVariant(index, "sku", e.target.value)}
                  placeholder="WH-M-001"
                />
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value) || 0)}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeVariant(index)}
                disabled={variants.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addVariant}>
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
