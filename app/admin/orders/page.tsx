import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"
import { AdminOrdersList } from "@/components/admin/admin-orders-list"
import { AdminSidebar } from "@/components/admin/admin-header"

export default async function AdminOrdersPage() {
  // const admin = await isAdmin()

  // if (!admin) {
  //   redirect("/")
  // }

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
     <AdminSidebar />

      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10">
        <div className="container py-8">
          <div className="mb-8 mx-10">
            <h1 className="font-serif text-3xl font-bold mb-2">Orders Management</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>
         <div className="mx-10">
          <AdminOrdersList orders={orders} />
          </div>
        </div>
      </main>
    </div>
  )
}
