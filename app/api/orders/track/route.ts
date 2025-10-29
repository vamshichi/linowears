import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNumber, email } = body

    if (!orderNumber || !email) {
      return NextResponse.json({ success: false, error: "Order number and email are required" }, { status: 400 })
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: orderNumber.toUpperCase(),
        user: {
          email: email.toLowerCase(),
        },
      },
    })

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("[v0] Track order error:", error)
    return NextResponse.json({ success: false, error: "Failed to track order" }, { status: 500 })
  }
}
