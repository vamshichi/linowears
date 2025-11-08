
import { AdminSidebar } from "@/components/admin/admin-header"
import { CouponForm } from "@/components/admin/coupon-form"

export default function NewCouponPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
      <div className="mx-auto max-w-7xl container py-8">
        <div className="mb-8 mx-10">
        <h1 className="font-serif text-4xl mb-8">Create New Coupon</h1>
        <CouponForm />
        </div>
      </div>
      </main>
    </div>
  )
}
