"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export function CustomFitForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    chest: "",
    waist: "",
    shoulder: "",
    sleeveLength: "",
    shirtLength: "",
    neck: "",
    notes: "",
    isDefault: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/measurements/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          chest: Number.parseFloat(formData.chest),
          waist: Number.parseFloat(formData.waist),
          shoulder: Number.parseFloat(formData.shoulder),
          sleeveLength: Number.parseFloat(formData.sleeveLength),
          shirtLength: Number.parseFloat(formData.shirtLength),
          neck: Number.parseFloat(formData.neck),
          notes: formData.notes || null,
          isDefault: formData.isDefault,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to save measurements")
      }

      // Reset form
      setFormData({
        name: "",
        chest: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        shirtLength: "",
        neck: "",
        notes: "",
        isDefault: false,
      })

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save measurements")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Measurements</CardTitle>
        <CardDescription>Save your measurements for future custom orders</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Profile Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Regular Fit, Slim Fit"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chest">Chest (inches) *</Label>
              <Input
                id="chest"
                type="number"
                step="0.5"
                placeholder="e.g., 40"
                value={formData.chest}
                onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waist">Waist (inches) *</Label>
              <Input
                id="waist"
                type="number"
                step="0.5"
                placeholder="e.g., 34"
                value={formData.waist}
                onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shoulder">Shoulder (inches) *</Label>
              <Input
                id="shoulder"
                type="number"
                step="0.5"
                placeholder="e.g., 18"
                value={formData.shoulder}
                onChange={(e) => setFormData({ ...formData, shoulder: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleeveLength">Sleeve Length (inches) *</Label>
              <Input
                id="sleeveLength"
                type="number"
                step="0.5"
                placeholder="e.g., 34"
                value={formData.sleeveLength}
                onChange={(e) => setFormData({ ...formData, sleeveLength: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shirtLength">Shirt Length (inches) *</Label>
              <Input
                id="shirtLength"
                type="number"
                step="0.5"
                placeholder="e.g., 30"
                value={formData.shirtLength}
                onChange={(e) => setFormData({ ...formData, shirtLength: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neck">Neck (inches) *</Label>
              <Input
                id="neck"
                type="number"
                step="0.5"
                placeholder="e.g., 16"
                value={formData.neck}
                onChange={(e) => setFormData({ ...formData, neck: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked as boolean })}
            />
            <Label htmlFor="isDefault" className="cursor-pointer">
              Set as default measurement profile
            </Label>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Measurements"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
