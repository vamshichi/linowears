import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminOrderDetails } from "@/components/admin/admin-order-details"

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/")
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!order) {
    redirect("/admin/orders")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <AdminOrderDetails order={order} />
        </div>
      </main>
    </div>
  )
}
