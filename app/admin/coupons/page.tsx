import { Suspense } from "react"

import { CouponManager } from "@/components/admin/coupon-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-header"

export default function CouponsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10 mt-10">
        <div className="flex items-center justify-between mb-8">
          <div className="mx-10">
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
        <div className="mx-10">
        <Suspense fallback={<div>Loading coupons...</div>}>
          <CouponManager />
        </Suspense>
        </div>
      </main>
    </div>
  )
}
