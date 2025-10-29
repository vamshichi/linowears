import { Suspense } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { CouponManager } from "@/components/admin/coupon-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CouponsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl mb-2">Coupons</h1>
            <p className="text-muted-foreground">Manage discount codes and promotions</p>
          </div>
          <Link href="/admin/coupons/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Coupon
            </Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading coupons...</div>}>
          <CouponManager />
        </Suspense>
      </main>
    </div>
  )
}
