"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

type Category = {
  id: string
  name: string
  slug: string
}

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories")
        const data = await response.json()
        if (data.success) {
          setCategories(data.categories)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No categories available</p>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Size</h3>
        <div className="space-y-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox id={size} />
              <Label htmlFor={size} className="text-sm font-normal cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Color</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            { name: "White", color: "#FFFFFF" },
            { name: "Beige", color: "#F5F5DC" },
            { name: "Blue", color: "#4A90E2" },
            { name: "Green", color: "#7CB342" },
            { name: "Black", color: "#000000" },
          ].map((color) => (
            <button
              key={color.name}
              className="w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-4" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Fabric</h3>
        <div className="space-y-3">
          {["100% Cotton", "Cotton-Linen Blend", "Pure Linen"].map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox id={fabric} />
              <Label htmlFor={fabric} className="text-sm font-normal cursor-pointer">
                {fabric}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent">
        Reset Filters
      </Button>
    </div>
  )
}
