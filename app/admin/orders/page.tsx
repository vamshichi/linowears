import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminOrdersList } from "@/components/admin/admin-orders-list"

export default async function AdminOrdersPage() {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Orders Management</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>

          <AdminOrdersList orders={orders} />
        </div>
      </main>
    </div>
  )
}
