import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

import { AdminOrderDetails } from "@/components/admin/admin-order-details"
import { AdminSidebar } from "@/components/admin/admin-header"

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  // const admin = await isAdmin()

  // if (!admin) {
  //   redirect("/")
  // }

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
      <AdminSidebar />

      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="container py-8">
          <AdminOrderDetails order={order} />
        </div>
      </main>
    </div>
  )
}
