import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { OrdersList } from "@/components/orders/orders-list"

export default async function OrdersPage() {
  const user = await getSession()

  if (!user) {
    redirect("/auth/login")
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          <h1 className="font-serif text-3xl font-bold mb-8">My Orders</h1>
          <OrdersList orders={orders} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
