import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { OrderDetails } from "@/components/orders/order-details"
import { OrderTimeline } from "@/components/orders/order-timeline"
import { OrderItems } from "@/components/orders/order-items"

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSession()

  if (!user) {
    redirect("/auth/login")
  }

  const order = await prisma.order.findUnique({
    where: { id: (await params).id },
    include: {
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

  if (!order || order.userId !== user.id) {
    redirect("/account")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl container py-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Order Details</h1>
            <p className="text-muted-foreground">Order #{order.orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <OrderTimeline order={order} />
              <OrderItems items={order.items} />
            </div>
            <div>
              <OrderDetails order={order} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
