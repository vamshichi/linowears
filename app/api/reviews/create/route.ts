import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { addLoyaltyPoints } from "@/lib/loyalty"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, title, comment, images } = body

    if (!productId || !rating || !comment) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if user has purchased this product
    const orderItems = await prisma.orderItem.findMany({
      where: { productId },
      include: {
        order: true,
      },
    })

    const hasPurchased = orderItems.some(
      (item) => item.order.userId === session.userId && item.order.status === "delivered",
    )

    // Create review
    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.userId,
        rating,
        title: title || null,
        comment,
        images: images || [],
        verifiedPurchase: hasPurchased,
      },
    })

    // Award loyalty points for review
    await addLoyaltyPoints(session.userId, 50, "Product review", undefined)

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error("[v0] Create review error:", error)
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 })
  }
}
