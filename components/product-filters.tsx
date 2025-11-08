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

type FilterOptions = {
  sizes: string[]
  colors: string[]
  fabrics: string[]
}

type ProductFiltersProps = {
  onFilterChange: (filters: any) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [categories, setCategories] = useState<Category[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sizes: [],
    colors: [],
    fabrics: [],
  })
  const [selectedFilters, setSelectedFilters] = useState({
    categoryId: "",
    sizes: [] as string[],
    colors: [] as string[],
    fabrics: [] as string[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, filtersRes] = await Promise.all([
          fetch("/api/admin/categories"),
          fetch("/api/products/filters"),
        ])

        const categoriesData = await categoriesRes.json()
        const filtersData = await filtersRes.json()

        if (categoriesData.success) {
          setCategories(categoriesData.categories)
        }

        if (filtersData.success) {
          setFilterOptions(filtersData.filters)
        }
      } catch (error) {
        console.error(" Failed to fetch filter data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    onFilterChange({
      ...selectedFilters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }, [selectedFilters, priceRange, onFilterChange])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      categoryId: prev.categoryId === categoryId ? "" : categoryId,
    }))
  }

  const handleArrayFilterChange = (type: "sizes" | "colors" | "fabrics", value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter((item) => item !== value) : [...prev[type], value],
    }))
  }

  const handleReset = () => {
    setSelectedFilters({
      categoryId: "",
      sizes: [],
      colors: [],
      fabrics: [],
    })
    setPriceRange([0, 5000])
  }

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading filters...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedFilters.categoryId === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
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
          {filterOptions.sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedFilters.sizes.includes(size)}
                onCheckedChange={() => handleArrayFilterChange("sizes", size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Color</h3>
        <div className="space-y-3">
          {filterOptions.colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedFilters.colors.includes(color)}
                onCheckedChange={() => handleArrayFilterChange("colors", color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-4">Fabric</h3>
        <div className="space-y-3">
          {filterOptions.fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox
                id={`fabric-${fabric}`}
                checked={selectedFilters.fabrics.includes(fabric)}
                onCheckedChange={() => handleArrayFilterChange("fabrics", fabric)}
              />
              <Label htmlFor={`fabric-${fabric}`} className="text-sm font-normal cursor-pointer">
                {fabric}
              </Label>
            </div>
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

      <Button variant="outline" className="w-full bg-transparent" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  )
}
