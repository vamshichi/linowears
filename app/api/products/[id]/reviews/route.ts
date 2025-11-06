import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ unwrap once

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const [reviews, total, ratingBreakdown] = await Promise.all([
      prisma.review.findMany({
        where: { productId: id },
        include: {
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { productId: id } }),
      prisma.review.groupBy({
        by: ["rating"],
        where: { productId: id },
        _count: { rating: true },
      }),
    ])

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
          reviews.length
        : 0

    const breakdown = [5, 4, 3, 2, 1].map((rating) => {
      const found = ratingBreakdown.find((r) => r.rating === rating)
      return { rating, count: found?._count?.rating ?? 0 }
    })

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      averageRating: Number(avgRating.toFixed(1)),
      totalReviews: total,
      ratingBreakdown: breakdown,
    })
  } catch (error) {
    console.error("[GET /api/products/[id]/reviews] Error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
