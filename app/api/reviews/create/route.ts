import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { addLoyaltyPoints } from "@/lib/loyalty"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, title, comment, images } = body

    if (!productId || !rating || !comment) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if user purchased this product
    const orderItems = await prisma.orderItem.findMany({
      where: { productId },
      include: { order: true },
    })

    const hasPurchased = orderItems.some(
      (item) => item.order.userId === session.id && item.order.status === "DELIVERED"
    )

    // Create review
    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.id,
        rating,
        title: title || null,
        comment,
        images: images || [],
        verified: hasPurchased,
      },
    })

    // Award loyalty points
    await addLoyaltyPoints(session.id, 50, "Product review")

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error("Create review error:", error)
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 })
  }
}
