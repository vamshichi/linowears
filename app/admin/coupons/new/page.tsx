import { AdminHeader } from "@/components/admin/admin-header"
import { CouponForm } from "@/components/admin/coupon-form"

export default function NewCouponPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Create New Coupon</h1>
        <CouponForm />
      </main>
    </div>
  )
}
