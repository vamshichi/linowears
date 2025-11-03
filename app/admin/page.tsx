export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentOrders } from "@/components/admin/recent-orders"



export default async function AdminDashboard() {
  // const admin = await isAdmin()

  // if (!admin) {
  //   redirect("/")
  // }

  // Fetch dashboard stats
  const [totalOrders, totalRevenue, totalProducts, totalCustomers] = await Promise.all([
  prisma.order.count(),
  prisma.order.aggregate({ _sum: { totalAmount: true } }),
  prisma.product.count(),
  prisma.user.count(),
])


 const recentOrders = await prisma.order.findMany({
  take: 10,
  orderBy: { createdAt: "desc" },
  include: {
    user: true,
    items: { include: { product: true } },
  },
})


  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Linowares Admin Panel</p>
          </div>

          <AdminStats
            totalOrders={totalOrders}
            totalRevenue={totalRevenue._sum.totalAmount || 0}
            totalProducts={totalProducts}
            totalCustomers={totalCustomers}
          />

          <div className="mt-8">
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </main>
    </div>
  )
}
