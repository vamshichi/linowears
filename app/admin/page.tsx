

import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminSidebar } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentOrders } from "@/components/admin/recent-orders"

export default async function AdminDashboard() {
  // default safe values
  let totalOrders = 0
  let totalRevenue = 0 // number (not object) — normalized below
  let totalProducts = 0
  let totalCustomers = 0
  let recentOrders: any[] = []

  try {
    // fetch counts & revenue
    const [orders, revenueAggregate, products, customers] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.product.count(),
      prisma.user.count(),
    ])

    totalOrders = orders
    // revenueAggregate._sum.totalAmount can be number | null — normalize to 0
    totalRevenue = (revenueAggregate._sum.totalAmount ?? 0) as number
    totalProducts = products
    totalCustomers = customers

    recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        items: { include: { product: true } },
      },
    })
  } catch (error) {
    // log the error, but don't crash the page
    console.error("[ADMIN DASHBOARD ERROR]", error)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminSidebar />

      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="mx-auto max-w-7xl container py-8">
          <div className="mb-8 mx-10">
            <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Linowares Admin Panel</p>
          </div>
          <div className="mx-10">
            <AdminStats
              totalOrders={totalOrders}
              totalRevenue={totalRevenue}
              totalProducts={totalProducts}
              totalCustomers={totalCustomers}
            />
          </div>
          <div className="mt-8 mx-10">
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </main>
    </div>
  )
}


