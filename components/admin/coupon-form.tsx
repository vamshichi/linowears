"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CouponFormProps {
  coupon?: any
}

export function CouponForm({ coupon }: CouponFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    discountType: coupon?.discountType || "PERCENTAGE",
    discountValue: coupon?.discountValue || "",
    minPurchase: coupon?.minPurchase || "",
    maxDiscount: coupon?.maxDiscount || "",
    usageLimit: coupon?.usageLimit || "",
    isActive: coupon?.isActive ?? true,
    validFrom: coupon?.validFrom
      ? new Date(coupon.validFrom).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    validUntil: coupon?.validUntil ? new Date(coupon.validUntil).toISOString().split("T")[0] : "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = coupon ? `/api/admin/coupons/${coupon.id}` : "/api/admin/coupons"
      const method = coupon ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          discountValue: Number.parseFloat(formData.discountValue as string),
          minPurchase: formData.minPurchase ? Number.parseFloat(formData.minPurchase as string) : null,
          maxDiscount: formData.maxDiscount ? Number.parseFloat(formData.maxDiscount as string) : null,
          usageLimit: formData.usageLimit ? Number.parseInt(formData.usageLimit as string) : null,
          validUntil: formData.validUntil || null,
        }),
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: `Coupon ${coupon ? "updated" : "created"} successfully`,
        })
        router.push("/admin/coupons")
      } else {
        throw new Error("Failed to save coupon")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save coupon",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setFormData({ ...formData, code })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Coupon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="code">Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="SUMMER2024"
                required
                className="font-mono"
              />
              <Button type="button" variant="outline" onClick={generateCode}>
                Generate
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discountType">Discount Type</Label>
              <Select
                value={formData.discountType}
                onValueChange={(value) => setFormData({ ...formData, discountType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="FIXED">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discountValue">
                Discount Value {formData.discountType === "PERCENTAGE" ? "(%)" : "(₹)"}
              </Label>
              <Input
                id="discountValue"
                type="number"
                step="0.01"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minPurchase">Minimum Purchase (₹)</Label>
              <Input
                id="minPurchase"
                type="number"
                step="0.01"
                value={formData.minPurchase}
                onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
              <Input
                id="maxDiscount"
                type="number"
                step="0.01"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
              placeholder="Leave empty for unlimited"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="validFrom">Valid From</Label>
              <Input
                id="validFrom"
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : coupon ? "Update" : "Create"} Coupon
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
