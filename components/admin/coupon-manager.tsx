"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Coupon {
  id: string
  code: string
  discountType: string
  discountValue: number
  minPurchase: number | null
  maxDiscount: number | null
  usageLimit: number | null
  usedCount: number
  isActive: boolean
  validFrom: string
  validUntil: string | null
}

export function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons")
      const data = await res.json()
      setCoupons(data)
    } catch (error) {
      console.error("Failed to fetch coupons:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return

    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCoupons()
        toast({
          title: "Coupon deleted",
          description: "The coupon has been deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete coupon",
        variant: "destructive",
      })
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied",
      description: "Coupon code copied to clipboard",
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {coupons.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No coupons yet. Create your first coupon.</p>
        </Card>
      ) : (
        coupons.map((coupon) => (
          <Card key={coupon.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-mono text-xl font-bold">{coupon.code}</h3>
                  <Button variant="ghost" size="sm" onClick={() => copyCode(coupon.code)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Badge variant={coupon.isActive ? "default" : "secondary"}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Discount</p>
                    <p className="font-medium">
                      {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                    </p>
                  </div>
                  {coupon.minPurchase && (
                    <div>
                      <p className="text-muted-foreground">Min Purchase</p>
                      <p className="font-medium">₹{coupon.minPurchase}</p>
                    </div>
                  )}
                  {coupon.maxDiscount && (
                    <div>
                      <p className="text-muted-foreground">Max Discount</p>
                      <p className="font-medium">₹{coupon.maxDiscount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Usage</p>
                    <p className="font-medium">
                      {coupon.usedCount} / {coupon.usageLimit || "∞"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valid Until</p>
                    <p className="font-medium">
                      {coupon.validUntil ? new Date(coupon.validUntil).toLocaleDateString() : "No expiry"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/coupons/${coupon.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => deleteCoupon(coupon.id)}>
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
