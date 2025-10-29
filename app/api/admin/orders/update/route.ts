import { type NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin()

    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, status, trackingNumber } = body

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Update order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(trackingNumber && { trackingNumber }),
        statusHistory: {
          create: {
            status,
            note: `Order status updated to ${status}`,
          },
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Update order error:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
