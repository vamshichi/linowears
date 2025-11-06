import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ unwrap once

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: { where: { isDeleted: false } },
        reviews: {
          include: {
            user: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        _count: { select: { reviews: true } },
      },
    })

    if (!product || product.isDeleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const reviews = product.reviews ?? []
    const variants = product.variants ?? []

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
          reviews.length
        : 0

    const sizes = [
      ...new Set(variants.map((v: { size: string | null }) => v.size).filter(Boolean)),
    ]
    const colors = [
      ...new Set(variants.map((v: { color: string | null }) => v.color).filter(Boolean)),
    ]

    return NextResponse.json({
      ...product,
      averageRating: Number(avgRating.toFixed(1)),
      totalReviews: product._count?.reviews ?? 0,
      availableSizes: sizes,
      availableColors: colors,
    })
  } catch (error) {
    console.error("[GET /api/products/:id] Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
